import BigNumber from 'bignumber.js'
import { multicallv2 } from 'utils/multicall'
import rechVaultAbi from 'config/abi/rechVaultV2.json'
import { getRechVaultAddress } from 'utils/addressHelpers'
import { BIG_ZERO } from 'utils/bigNumber'
import { getRechContract } from 'utils/contractHelpers'

const rechVaultV2 = getRechVaultAddress()
const rechContract = getRechContract()
export const fetchPublicVaultData = async (rechVaultAddress = rechVaultV2) => {
  try {
    const calls = ['getPricePerFullShare', 'totalShares', 'totalLockedAmount'].map((method) => ({
      address: rechVaultAddress,
      name: method,
    }))

    const [[[sharePrice], [shares], totalLockedAmount], totalRechInVault] = await Promise.all([
      multicallv2(rechVaultAbi, calls, {
        requireSuccess: false,
      }),
      rechContract.balanceOf(rechVaultV2),
    ])

    const totalSharesAsBigNumber = shares ? new BigNumber(shares.toString()) : BIG_ZERO
    const totalLockedAmountAsBigNumber = totalLockedAmount ? new BigNumber(totalLockedAmount[0].toString()) : BIG_ZERO
    const sharePriceAsBigNumber = sharePrice ? new BigNumber(sharePrice.toString()) : BIG_ZERO
    return {
      totalShares: totalSharesAsBigNumber.toJSON(),
      totalLockedAmount: totalLockedAmountAsBigNumber.toJSON(),
      pricePerFullShare: sharePriceAsBigNumber.toJSON(),
      totalRechInVault: new BigNumber(totalRechInVault.toString()).toJSON(),
    }
  } catch (error) {
    return {
      totalShares: null,
      totalLockedAmount: null,
      pricePerFullShare: null,
      totalRechInVault: null,
    }
  }
}

export const fetchVaultFees = async (rechVaultAddress = rechVaultV2) => {
  try {
    const calls = ['performanceFee', 'withdrawFee', 'withdrawFeePeriod'].map((method) => ({
      address: rechVaultAddress,
      name: method,
    }))

    const [[performanceFee], [withdrawalFee], [withdrawalFeePeriod]] = await multicallv2(rechVaultAbi, calls)

    return {
      performanceFee: performanceFee.toNumber(),
      withdrawalFee: withdrawalFee.toNumber(),
      withdrawalFeePeriod: withdrawalFeePeriod.toNumber(),
    }
  } catch (error) {
    return {
      performanceFee: null,
      withdrawalFee: null,
      withdrawalFeePeriod: null,
    }
  }
}

export default fetchPublicVaultData
