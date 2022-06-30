import { Currency, currencyEquals, ETHER, WETH } from '@1ech/sdk'
import { useMemo } from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useTranslation } from 'contexts/Localization'
import tryParseAmount from 'utils/tryParseAmount'
import { useTransactionAdder } from '../state/transactions/hooks'
import { useCurrencyBalance } from '../state/wallet/hooks'
import { useWECHContract } from './useContract'
import { useCallWithGasPrice } from './useCallWithGasPrice'

export enum WrapType {
  NOT_APPLICABLE,
  WRAP,
  UNWRAP,
}

const NOT_APPLICABLE = { wrapType: WrapType.NOT_APPLICABLE }
/**
 * Given the selected input and output currency, return a wrap callback
 * @param inputCurrency the selected input currency
 * @param outputCurrency the selected output currency
 * @param typedValue the user input value
 */
export default function useWrapCallback(
  inputCurrency: Currency | undefined,
  outputCurrency: Currency | undefined,
  typedValue: string | undefined,
): { wrapType: WrapType; execute?: undefined | (() => Promise<void>); inputError?: string } {
  const { t } = useTranslation()
  const { chainId, account } = useActiveWeb3React()
  const { callWithGasPrice } = useCallWithGasPrice()
  const wechContract = useWECHContract()
  const balance = useCurrencyBalance(account ?? undefined, inputCurrency)
  // we can always parse the amount typed as the input currency, since wrapping is 1:1
  const inputAmount = useMemo(() => tryParseAmount(typedValue, inputCurrency), [inputCurrency, typedValue])
  const addTransaction = useTransactionAdder()

  return useMemo(() => {
    if (!wechContract || !chainId || !inputCurrency || !outputCurrency) return NOT_APPLICABLE

    const sufficientBalance = inputAmount && balance && !balance.lessThan(inputAmount)

    if (inputCurrency === ETHER && currencyEquals(WETH[chainId], outputCurrency)) {
      return {
        wrapType: WrapType.WRAP,
        execute:
          sufficientBalance && inputAmount
            ? async () => {
                try {
                  const txReceipt = await callWithGasPrice(wechContract, 'deposit', undefined, {
                    value: `0x${inputAmount.raw.toString(16)}`,
                  })
                  addTransaction(txReceipt, {
                    summary: `Wrap ${inputAmount.toSignificant(6)} ECH to WECH`,
                    type: 'wrap',
                  })
                } catch (error) {
                  console.error('Could not deposit', error)
                }
              }
            : undefined,
        inputError: sufficientBalance ? undefined : t('Insufficient ECH balance'),
      }
    }
    if (currencyEquals(WETH[chainId], inputCurrency) && outputCurrency === ETHER) {
      return {
        wrapType: WrapType.UNWRAP,
        execute:
          sufficientBalance && inputAmount
            ? async () => {
                try {
                  const txReceipt = await callWithGasPrice(wechContract, 'withdraw', [
                    `0x${inputAmount.raw.toString(16)}`,
                  ])
                  addTransaction(txReceipt, { summary: `Unwrap ${inputAmount.toSignificant(6)} WECH to ECH` })
                } catch (error) {
                  console.error('Could not withdraw', error)
                }
              }
            : undefined,
        inputError: sufficientBalance ? undefined : t('Insufficient WECH balance'),
      }
    }
    return NOT_APPLICABLE
  }, [wechContract, chainId, inputCurrency, outputCurrency, t, inputAmount, balance, addTransaction, callWithGasPrice])
}
