import { useCallback } from 'react'
import { BIG_ZERO } from 'utils/bigNumber'
import getGasPrice from 'utils/getGasPrice'
import { useGenTakeda } from 'hooks/useContract'
import { DEFAULT_GAS_LIMIT } from 'config'

const options = {
  gasLimit: DEFAULT_GAS_LIMIT,
}

const harvestPool = async (genTakedaContract) => {
  const gasPrice = getGasPrice()
  return genTakedaContract.deposit('0', { ...options, gasPrice })
}

const harvestPoolEch = async (genTakedaContract) => {
  const gasPrice = getGasPrice()
  return genTakedaContract.deposit({ ...options, value: BIG_ZERO, gasPrice })
}

const useHarvestPool = (takedaId, isUsingEch = false) => {
  const genTakedaContract = useGenTakeda(takedaId)

  const handleHarvest = useCallback(async () => {
    if (isUsingEch) {
      return harvestPoolEch(genTakedaContract)
    }

    return harvestPool(genTakedaContract)
  }, [isUsingEch, genTakedaContract])

  return { onReward: handleHarvest }
}

export default useHarvestPool
