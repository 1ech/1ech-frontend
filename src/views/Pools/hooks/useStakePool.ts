import { useCallback } from 'react'
import BigNumber from 'bignumber.js'
import { DEFAULT_TOKEN_DECIMAL, DEFAULT_GAS_LIMIT } from 'config'
import { getFullDecimalMultiplier } from 'utils/getFullDecimalMultiplier'
import { useSousChef } from 'hooks/useContract'
import getGasPrice from 'utils/getGasPrice'

const options = {
  gasLimit: DEFAULT_GAS_LIMIT,
}

const sousStake = async (sousChefContract, amount, decimals = 18) => {
  const gasPrice = getGasPrice()
  return sousChefContract.deposit(new BigNumber(amount).times(getFullDecimalMultiplier(decimals)).toString(), {
    ...options,
    gasPrice,
  })
}

const sousStakeEch = async (sousChefContract, amount) => {
  const gasPrice = getGasPrice()
  return sousChefContract.deposit(new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString(), {
    ...options,
    gasPrice,
  })
}

const useStakePool = (sousId: number, isUsingEch = false) => {
  const sousChefContract = useSousChef(sousId)

  const handleStake = useCallback(
    async (amount: string, decimals: number) => {
      if (isUsingEch) {
        return sousStakeEch(sousChefContract, amount)
      }
      return sousStake(sousChefContract, amount, decimals)
    },
    [isUsingEch, sousChefContract],
  )

  return { onStake: handleStake }
}

export default useStakePool
