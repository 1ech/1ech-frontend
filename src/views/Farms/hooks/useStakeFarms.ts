import { useCallback } from 'react'
import { stakeFarm } from 'utils/calls'
import { useMasterchief } from 'hooks/useContract'

const useStakeFarms = (pid: number) => {
  const masterChiefContract = useMasterchief()

  const handleStake = useCallback(
    async (amount: string) => {
      return stakeFarm(masterChiefContract, pid, amount)
    },
    [masterChiefContract, pid],
  )

  return { onStake: handleStake }
}

export default useStakeFarms
