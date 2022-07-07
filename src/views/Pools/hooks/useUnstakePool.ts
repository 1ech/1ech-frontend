import { useCallback } from 'react'
import { parseUnits } from '@ethersproject/units'
import { useGenTakeda } from 'hooks/useContract'
import getGasPrice from 'utils/getGasPrice'

const takedaUnstake = (genTakedaContract: any, amount: string, decimals: number) => {
  const gasPrice = getGasPrice()
  const units = parseUnits(amount, decimals)

  return genTakedaContract.withdraw(units.toString(), {
    gasPrice,
  })
}

const takedaEmergencyUnstake = (genTakedaContract: any) => {
  const gasPrice = getGasPrice()
  return genTakedaContract.emergencyWithdraw({ gasPrice })
}

const useUnstakePool = (takedaId: number, enableEmergencyWithdraw = false) => {
  const genTakedaContract = useGenTakeda(takedaId)

  const handleUnstake = useCallback(
    async (amount: string, decimals: number) => {
      if (enableEmergencyWithdraw) {
        return takedaEmergencyUnstake(genTakedaContract)
      }

      return takedaUnstake(genTakedaContract, amount, decimals)
    },
    [enableEmergencyWithdraw, genTakedaContract],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstakePool
