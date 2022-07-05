import BigNumber from 'bignumber.js'
import { BIG_ONE, BIG_ZERO } from 'utils/bigNumber'
import { filterFarmsByQuoteToken } from 'utils/farmsPriceHelpers'
import { SerializedFarm } from 'state/types'
import tokens from 'config/constants/tokens'

const getFarmFromTokenSymbol = (
  farms: SerializedFarm[],
  tokenSymbol: string,
  preferredQuoteTokens?: string[],
): SerializedFarm => {
  const farmsWithTokenSymbol = farms.filter((farm) => farm.token.symbol === tokenSymbol)
  const filteredFarm = filterFarmsByQuoteToken(farmsWithTokenSymbol, preferredQuoteTokens)
  return filteredFarm
}

const getFarmBaseTokenPrice = (
  farm: SerializedFarm,
  quoteTokenFarm: SerializedFarm,
  echPriceUsds: BigNumber,
): BigNumber => {
  const hasTokenPriceVsQuote = Boolean(farm.tokenPriceVsQuote)

  if (farm.quoteToken.symbol === tokens.usds.symbol) {
    return hasTokenPriceVsQuote ? new BigNumber(farm.tokenPriceVsQuote) : BIG_ZERO
  }

  if (farm.quoteToken.symbol === tokens.wech.symbol) {
    return hasTokenPriceVsQuote ? echPriceUsds.times(farm.tokenPriceVsQuote) : BIG_ZERO
  }

  // We can only calculate profits without a quoteTokenFarm for USDS/ECH farms
  if (!quoteTokenFarm) {
    return BIG_ZERO
  }

  // Possible alternative farm quoteTokens:
  // UST (i.e. MIR-UST), pBTC (i.e. PNT-pBTC), BTCB (i.e. bBADGER-BTCB), ETH (i.e. SUSHI-ETH)
  // If the farm's quote token isn't USDS or WECH, we then use the quote token, of the original farm's quote token
  // i.e. for farm PNT - pBTC we use the pBTC farm's quote token - ECH, (pBTC - ECH)
  // from the ECH - pBTC price, we can calculate the PNT - USDS price
  if (quoteTokenFarm.quoteToken.symbol === tokens.wech.symbol) {
    const quoteTokenInUsds = echPriceUsds.times(quoteTokenFarm.tokenPriceVsQuote)
    return hasTokenPriceVsQuote && quoteTokenInUsds
      ? new BigNumber(farm.tokenPriceVsQuote).times(quoteTokenInUsds)
      : BIG_ZERO
  }

  if (quoteTokenFarm.quoteToken.symbol === tokens.usds.symbol) {
    const quoteTokenInUsds = quoteTokenFarm.tokenPriceVsQuote
    return hasTokenPriceVsQuote && quoteTokenInUsds
      ? new BigNumber(farm.tokenPriceVsQuote).times(quoteTokenInUsds)
      : BIG_ZERO
  }

  // Catch in case token does not have immediate or once-removed USDS/WECH quoteToken
  return BIG_ZERO
}

const getFarmQuoteTokenPrice = (
  farm: SerializedFarm,
  quoteTokenFarm: SerializedFarm,
  echPriceUsds: BigNumber,
): BigNumber => {
  if (farm.quoteToken.symbol === 'USDS') {
    return BIG_ONE
  }

  if (farm.quoteToken.symbol === 'WECH') {
    return echPriceUsds
  }

  if (!quoteTokenFarm) {
    return BIG_ZERO
  }

  if (quoteTokenFarm.quoteToken.symbol === 'WECH') {
    return quoteTokenFarm.tokenPriceVsQuote ? echPriceUsds.times(quoteTokenFarm.tokenPriceVsQuote) : BIG_ZERO
  }

  if (quoteTokenFarm.quoteToken.symbol === 'USDS') {
    return quoteTokenFarm.tokenPriceVsQuote ? new BigNumber(quoteTokenFarm.tokenPriceVsQuote) : BIG_ZERO
  }

  return BIG_ZERO
}

const getFarmsPrices = (farms: SerializedFarm[]) => {
  const echUsdsFarm = farms.find((farm) => farm.token.symbol === 'USDS' && farm.quoteToken.symbol === 'WECH')
  const echPriceUsds = echUsdsFarm.tokenPriceVsQuote ? BIG_ONE.div(echUsdsFarm.tokenPriceVsQuote) : BIG_ZERO
  const farmsWithPrices = farms.map((farm) => {
    const quoteTokenFarm = getFarmFromTokenSymbol(farms, farm.quoteToken.symbol)
    const tokenPriceUsds = getFarmBaseTokenPrice(farm, quoteTokenFarm, echPriceUsds)
    const quoteTokenPriceUsds = getFarmQuoteTokenPrice(farm, quoteTokenFarm, echPriceUsds)

    return {
      ...farm,
      tokenPriceUsds: tokenPriceUsds.toJSON(),
      quoteTokenPriceUsds: quoteTokenPriceUsds.toJSON(),
    }
  })

  return farmsWithPrices
}

export default getFarmsPrices
