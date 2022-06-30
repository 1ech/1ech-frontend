import { useCallback } from 'react'
import { BIG_ZERO } from 'utils/bigNumber'
import getGasPrice from 'utils/getGasPrice'
import { useSousChef } from 'hooks/useContract'
import { DEFAULT_GAS_LIMIT } from 'config'

const options = {
  gasLimit: DEFAULT_GAS_LIMIT,
}

const harvestPool = async (sousChefContract) => {
  const gasPrice = getGasPrice()
  return sousChefContract.deposit('0', { ...options, gasPrice })
}

const harvestPoolEch = async (sousChefContract) => {
  const gasPrice = getGasPrice()
  return sousChefContract.deposit({ ...options, value: BIG_ZERO, gasPrice })
}

const useHarvestPool = (sousId, isUsingEch = false) => {
  const sousChefContract = useSousChef(sousId)

  const handleHarvest = useCallback(async () => {
    if (isUsingEch) {
      return harvestPoolEch(sousChefContract)
    }

    return harvestPool(sousChefContract)
  }, [isUsingEch, sousChefContract])

  return { onReward: handleHarvest }
}

export default useHarvestPool
