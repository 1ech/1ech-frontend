import { useCallback } from 'react'
import { harvestFarm } from 'utils/calls'
import { useMasterchief } from 'hooks/useContract'

const useHarvestFarm = (farmPid: number) => {
  const masterChiefContract = useMasterchief()

  const handleHarvest = useCallback(async () => {
    return harvestFarm(masterChiefContract, farmPid)
  }, [farmPid, masterChiefContract])

  return { onReward: handleHarvest }
}

export default useHarvestFarm
