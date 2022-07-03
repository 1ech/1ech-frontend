import BigNumber from 'bignumber.js'
import { convertSharesToRech } from 'views/Pools/helpers'
import { multicallv2 } from 'utils/multicall'
import rechVaultAbi from 'config/abi/rechVaultV2.json'
import { BIG_ZERO } from 'utils/bigNumber'

export const fetchPublicVaultData = async (rechVaultAddress: string) => {
  try {
    const calls = ['getPricePerFullShare', 'totalShares', 'totalLockedAmount'].map((method) => ({
      address: rechVaultAddress,
      name: method,
    }))
    const [[sharePrice], [shares], totalLockedAmount] = await multicallv2(rechVaultAbi, calls, {
      requireSuccess: false,
    })
    const totalSharesAsBigNumber = shares ? new BigNumber(shares.toString()) : BIG_ZERO
    const totalLockedAmountAsBigNumber = totalLockedAmount ? new BigNumber(totalLockedAmount[0].toString()) : BIG_ZERO
    const sharePriceAsBigNumber = sharePrice ? new BigNumber(sharePrice.toString()) : BIG_ZERO
    const totalRechInVaultEstimate = convertSharesToRech(totalSharesAsBigNumber, sharePriceAsBigNumber)

    return {
      totalShares: totalSharesAsBigNumber.toJSON(),
      totalLockedAmount: totalLockedAmountAsBigNumber.toJSON(),
      pricePerFullShare: sharePriceAsBigNumber.toJSON(),
      totalRechInVault: totalRechInVaultEstimate.rechAsBigNumber.toJSON(),
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
