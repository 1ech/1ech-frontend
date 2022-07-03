import BigNumber from 'bignumber.js'
import { useTranslation } from 'contexts/Localization'
import { getBalanceAmount } from 'utils/formatBalance'

import { useMemo } from 'react'

export const useUserEnoughCakeValidator = (rechAmount: string, stakingTokenBalance: BigNumber) => {
  const { t } = useTranslation()
  const errorMessage = t('Insufficient RECH balance')

  const userNotEnoughCake = useMemo(() => {
    if (new BigNumber(rechAmount).gt(getBalanceAmount(stakingTokenBalance, 18))) return true
    return false
  }, [rechAmount, stakingTokenBalance])
  return { userNotEnoughCake, notEnoughErrorMessage: errorMessage }
}
