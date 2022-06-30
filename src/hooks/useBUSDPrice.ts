import { Currency, currencyEquals, JSBI, Price } from '@1ech/sdk'
import tokens from 'config/constants/tokens'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useMemo } from 'react'
import { multiplyPriceByAmount } from 'utils/prices'
import { wrappedCurrency } from '../utils/wrappedCurrency'
import { PairState, usePairs } from './usePairs'

const { wech: WECH, busd } = tokens

/**
 * Returns the price in BUSD of the input currency
 * @param currency currency to compute the BUSD price of
 */
export default function useBUSDPrice(currency?: Currency): Price | undefined {
  const { chainId } = useActiveWeb3React()
  const wrapped = wrappedCurrency(currency, chainId)
  const tokenPairs: [Currency | undefined, Currency | undefined][] = useMemo(
    () => [
      [chainId && wrapped && currencyEquals(WECH, wrapped) ? undefined : currency, chainId ? WECH : undefined],
      [wrapped?.equals(busd) ? undefined : wrapped, busd],
      [chainId ? WECH : undefined, busd],
    ],
    [chainId, currency, wrapped],
  )
  const [[echPairState, echPair], [busdPairState, busdPair], [busdEchPairState, busdEchPair]] = usePairs(tokenPairs)

  return useMemo(() => {
    if (!currency || !wrapped || !chainId) {
      return undefined
    }
    // handle wech/ech
    if (wrapped.equals(WECH)) {
      if (busdPair) {
        const price = busdPair.priceOf(WECH)
        return new Price(currency, busd, price.denominator, price.numerator)
      }
      return undefined
    }
    // handle busd
    if (wrapped.equals(busd)) {
      return new Price(busd, busd, '1', '1')
    }

    const echPairECHAmount = echPair?.reserveOf(WECH)
    const echPairECHBUSDValue: JSBI =
      echPairECHAmount && busdEchPair ? busdEchPair.priceOf(WECH).quote(echPairECHAmount).raw : JSBI.BigInt(0)

    // all other tokens
    // first try the busd pair
    if (busdPairState === PairState.EXISTS && busdPair && busdPair.reserveOf(busd).greaterThan(echPairECHBUSDValue)) {
      const price = busdPair.priceOf(wrapped)
      return new Price(currency, busd, price.denominator, price.numerator)
    }
    if (echPairState === PairState.EXISTS && echPair && busdEchPairState === PairState.EXISTS && busdEchPair) {
      if (busdEchPair.reserveOf(busd).greaterThan('0') && echPair.reserveOf(WECH).greaterThan('0')) {
        const echBusdPrice = busdEchPair.priceOf(busd)
        const currencyEchPrice = echPair.priceOf(WECH)
        const busdPrice = echBusdPrice.multiply(currencyEchPrice).invert()
        return new Price(currency, busd, busdPrice.denominator, busdPrice.numerator)
      }
    }

    return undefined
  }, [chainId, currency, echPair, echPairState, busdEchPair, busdEchPairState, busdPair, busdPairState, wrapped])
}

export const useCakeBusdPrice = (): Price | undefined => {
  const cakeBusdPrice = useBUSDPrice(tokens.cake)
  return cakeBusdPrice
}

export const useBUSDCurrencyAmount = (currency: Currency, amount: number): number | undefined => {
  const { chainId } = useActiveWeb3React()
  const busdPrice = useBUSDPrice(currency)
  const wrapped = wrappedCurrency(currency, chainId)
  if (busdPrice) {
    return multiplyPriceByAmount(busdPrice, amount, wrapped.decimals)
  }
  return undefined
}

export const useBUSDCakeAmount = (amount: number): number | undefined => {
  const cakeBusdPrice = useCakeBusdPrice()
  if (cakeBusdPrice) {
    return multiplyPriceByAmount(cakeBusdPrice, amount)
  }
  return undefined
}

export const useECHBusdPrice = (): Price | undefined => {
  const echBusdPrice = useBUSDPrice(tokens.wech)
  return echBusdPrice
}
