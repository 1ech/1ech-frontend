import { Currency, currencyEquals, JSBI, Price } from '@1ech/sdk'
import tokens from 'config/constants/tokens'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useMemo } from 'react'
import { multiplyPriceByAmount } from 'utils/prices'
import { wrappedCurrency } from '../utils/wrappedCurrency'
import { PairState, usePairs } from './usePairs'

const { wech: WECH, usds } = tokens

/**
 * Returns the price in USDS of the input currency
 * @param currency currency to compute the USDS price of
 */
export default function useUSDSPrice(currency?: Currency): Price | undefined {
  const { chainId } = useActiveWeb3React()
  const wrapped = wrappedCurrency(currency, chainId)
  const tokenPairs: [Currency | undefined, Currency | undefined][] = useMemo(
    () => [
      [chainId && wrapped && currencyEquals(WECH, wrapped) ? undefined : currency, chainId ? WECH : undefined],
      [wrapped?.equals(usds) ? undefined : wrapped, usds],
      [chainId ? WECH : undefined, usds],
    ],
    [chainId, currency, wrapped],
  )
  const [[echPairState, echPair], [usdsPairState, usdsPair], [usdsEchPairState, usdsEchPair]] = usePairs(tokenPairs)

  return useMemo(() => {
    if (!currency || !wrapped || !chainId) {
      return undefined
    }
    // handle wech/ech
    if (wrapped.equals(WECH)) {
      if (usdsPair) {
        const price = usdsPair.priceOf(WECH)
        return new Price(currency, usds, price.denominator, price.numerator)
      }
      return undefined
    }
    // handle usds
    if (wrapped.equals(usds)) {
      return new Price(usds, usds, '1', '1')
    }

    const echPairECHAmount = echPair?.reserveOf(WECH)
    const echPairECHUSDSValue: JSBI =
      echPairECHAmount && usdsEchPair ? usdsEchPair.priceOf(WECH).quote(echPairECHAmount).raw : JSBI.BigInt(0)

    // all other tokens
    // first try the usds pair
    if (usdsPairState === PairState.EXISTS && usdsPair && usdsPair.reserveOf(usds).greaterThan(echPairECHUSDSValue)) {
      const price = usdsPair.priceOf(wrapped)
      return new Price(currency, usds, price.denominator, price.numerator)
    }
    if (echPairState === PairState.EXISTS && echPair && usdsEchPairState === PairState.EXISTS && usdsEchPair) {
      if (usdsEchPair.reserveOf(usds).greaterThan('0') && echPair.reserveOf(WECH).greaterThan('0')) {
        const echUsdsPrice = usdsEchPair.priceOf(usds)
        const currencyEchPrice = echPair.priceOf(WECH)
        const usdsPrice = echUsdsPrice.multiply(currencyEchPrice).invert()
        return new Price(currency, usds, usdsPrice.denominator, usdsPrice.numerator)
      }
    }

    return undefined
  }, [chainId, currency, echPair, echPairState, usdsEchPair, usdsEchPairState, usdsPair, usdsPairState, wrapped])
}

export const useRechUsdsPrice = (): Price | undefined => {
  const rechUsdsPrice = useUSDSPrice(tokens.rech)
  return rechUsdsPrice
}

export const useUSDSCurrencyAmount = (currency: Currency, amount: number): number | undefined => {
  const { chainId } = useActiveWeb3React()
  const usdsPrice = useUSDSPrice(currency)
  const wrapped = wrappedCurrency(currency, chainId)
  if (usdsPrice) {
    return multiplyPriceByAmount(usdsPrice, amount, wrapped.decimals)
  }
  return undefined
}

export const useUSDSCakeAmount = (amount: number): number | undefined => {
  const rechUsdsPrice = useRechUsdsPrice()
  if (rechUsdsPrice) {
    return multiplyPriceByAmount(rechUsdsPrice, amount)
  }
  return undefined
}

export const useECHUsdsPrice = (): Price | undefined => {
  const echUsdsPrice = useUSDSPrice(tokens.wech)
  return echUsdsPrice
}
