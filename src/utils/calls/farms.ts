import BigNumber from 'bignumber.js'
import { DEFAULT_GAS_LIMIT, DEFAULT_TOKEN_DECIMAL } from 'config'
import getGasPrice from 'utils/getGasPrice'

const options = {
  gasLimit: DEFAULT_GAS_LIMIT,
}

export const stakeFarm = async (masterChiefContract, pid, amount) => {
  const gasPrice = getGasPrice()
  const value = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString()

  return masterChiefContract.deposit(pid, value, { ...options, gasPrice })
}

export const unstakeFarm = async (masterChiefContract, pid, amount) => {
  const gasPrice = getGasPrice()
  const value = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString()

  return masterChiefContract.withdraw(pid, value, { ...options, gasPrice })
}

export const harvestFarm = async (masterChiefContract, pid) => {
  const gasPrice = getGasPrice()

  return masterChiefContract.deposit(pid, '0', { ...options, gasPrice })
}
