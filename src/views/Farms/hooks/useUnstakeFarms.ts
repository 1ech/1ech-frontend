import { useCallback } from 'react'
import { unstakeFarm } from 'utils/calls'
import { useMasterchief } from 'hooks/useContract'

const useUnstakeFarms = (pid: number) => {
  const masterChiefContract = useMasterchief()

  const handleUnstake = useCallback(
    async (amount: string) => {
      return unstakeFarm(masterChiefContract, pid, amount)
    },
    [masterChiefContract, pid],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstakeFarms
