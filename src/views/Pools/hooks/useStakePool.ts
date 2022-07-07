import { useCallback } from 'react'
import BigNumber from 'bignumber.js'
import { DEFAULT_TOKEN_DECIMAL, DEFAULT_GAS_LIMIT } from 'config'
import { getFullDecimalMultiplier } from 'utils/getFullDecimalMultiplier'
import { useGenTakeda } from 'hooks/useContract'
import getGasPrice from 'utils/getGasPrice'

const options = {
  gasLimit: DEFAULT_GAS_LIMIT,
}

const takedaStake = async (genTakedaContract, amount, decimals = 18) => {
  const gasPrice = getGasPrice()
  return genTakedaContract.deposit(new BigNumber(amount).times(getFullDecimalMultiplier(decimals)).toString(), {
    ...options,
    gasPrice,
  })
}

const takedaStakeEch = async (genTakedaContract, amount) => {
  const gasPrice = getGasPrice()
  return genTakedaContract.deposit(new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString(), {
    ...options,
    gasPrice,
  })
}

const useStakePool = (takedaId: number, isUsingEch = false) => {
  const genTakedaContract = useGenTakeda(takedaId)

  const handleStake = useCallback(
    async (amount: string, decimals: number) => {
      if (isUsingEch) {
        return takedaStakeEch(genTakedaContract, amount)
      }
      return takedaStake(genTakedaContract, amount, decimals)
    },
    [isUsingEch, genTakedaContract],
  )

  return { onStake: handleStake }
}

export default useStakePool
