import { ContextApi } from 'contexts/Localization/types'
import BigNumber from 'bignumber.js'

export const getEarningsText = (
  numFarmsToCollect: number,
  hasCakePoolToCollect: boolean,
  earningsUsds: BigNumber,
  t: ContextApi['t'],
): string => {
  const data = {
    earningsUsds: earningsUsds.toString(),
    count: numFarmsToCollect,
  }

  let earningsText = t('%earningsUsds% to collect', data)

  if (numFarmsToCollect > 0 && hasCakePoolToCollect) {
    if (numFarmsToCollect > 1) {
      earningsText = t('%earningsUsds% to collect from %count% farms and RECH pool', data)
    } else {
      earningsText = t('%earningsUsds% to collect from %count% farm and RECH pool', data)
    }
  } else if (numFarmsToCollect > 0) {
    if (numFarmsToCollect > 1) {
      earningsText = t('%earningsUsds% to collect from %count% farms', data)
    } else {
      earningsText = t('%earningsUsds% to collect from %count% farm', data)
    }
  } else if (hasCakePoolToCollect) {
    earningsText = t('%earningsUsds% to collect from RECH pool', data)
  }

  return earningsText
}
