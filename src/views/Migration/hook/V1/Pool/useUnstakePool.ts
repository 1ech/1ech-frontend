import BigNumber from 'bignumber.js'
import { useCallback } from 'react'
import { DEFAULT_GAS_LIMIT, DEFAULT_TOKEN_DECIMAL } from 'config'
import { parseUnits } from '@ethersproject/units'
import { useMasterchiefV1, useGenTakeda } from 'hooks/useContract'
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
  const masterChiefV1Contract = useMasterchiefV1()
  const genTakedaContract = useGenTakeda(takedaId)

  const handleUnstake = useCallback(
    async (amount: string, decimals: number) => {
      if (takedaId === 0) {
        const gasPrice = getGasPrice()
        const value = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString()
        return masterChiefV1Contract.leaveStaking(value, { gasLimit: DEFAULT_GAS_LIMIT, gasPrice })
      }

      if (enableEmergencyWithdraw) {
        return takedaEmergencyUnstake(genTakedaContract)
      }

      return takedaUnstake(genTakedaContract, amount, decimals)
    },
    [enableEmergencyWithdraw, masterChiefV1Contract, genTakedaContract, takedaId],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstakePool
