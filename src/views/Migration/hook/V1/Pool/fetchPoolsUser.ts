import BigNumber from 'bignumber.js'
import { getMasterchiefV1Contract } from 'utils/contractHelpers'

export const fetchUserStakeBalances = async (account) => {
  // Rech / Rech pool
  const { amount: masterPoolAmount } = await getMasterchiefV1Contract().userInfo('0', account)
  return new BigNumber(masterPoolAmount.toString()).toJSON()
}

export const fetchUserPendingRewards = async (account) => {
  // Rech / Rech pool
  const pendingReward = await getMasterchiefV1Contract().pendingRech('0', account)
  return new BigNumber(pendingReward.toString()).toJSON()
}
