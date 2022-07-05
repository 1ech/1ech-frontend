import { ReactText } from 'react'
import { getBalanceNumber } from 'utils/formatBalance'
import { easterPrizes, PrizesConfig } from 'config/constants/trading-competition/prizes'
import BigNumber from 'bignumber.js'
import useUSDSPrice, { useRechUsdsPrice } from 'hooks/useUSDSPrice'
import tokens from 'config/constants/tokens'
import { multiplyPriceByAmount } from 'utils/prices'

export const localiseTradingVolume = (value: number, decimals = 0) => {
  return value.toLocaleString('en-US', { maximumFractionDigits: decimals })
}

export const useCompetitionCakeRewards = (userCakeReward: ReactText) => {
  const rechAsBigNumber = new BigNumber(userCakeReward as string)
  const rechAalance = getBalanceNumber(rechAsBigNumber)
  const rechPriceUsds = useRechUsdsPrice()
  return {
    cakeReward: rechAalance,
    dollarValueOfCakeReward: multiplyPriceByAmount(rechPriceUsds, rechAalance),
  }
}

export const useFanTokenCompetitionRewards = ({
  userCakeRewards,
  userLazioRewards,
  userPortoRewards,
  userSantosRewards,
}: {
  userCakeRewards: ReactText
  userLazioRewards: ReactText
  userPortoRewards: ReactText
  userSantosRewards: ReactText
}) => {
  const lazioPriceUSDS = useUSDSPrice(tokens.lazio)
  const portoPriceUSDS = useUSDSPrice(tokens.porto)
  const santosPriceUSDS = useUSDSPrice(tokens.santos)
  const rechAsBigNumber = new BigNumber(userCakeRewards as string)
  const lazioAsBigNumber = new BigNumber(userLazioRewards as string)
  const portoAsBigNumber = new BigNumber(userPortoRewards as string)
  const santosAsBigNumber = new BigNumber(userSantosRewards as string)
  const rechAalance = getBalanceNumber(rechAsBigNumber)
  const lazioBalance = getBalanceNumber(lazioAsBigNumber, 8)
  const portoBalance = getBalanceNumber(portoAsBigNumber, 8)
  const santosBalance = getBalanceNumber(santosAsBigNumber, 8)
  const rechPriceUsds = useRechUsdsPrice()

  const dollarValueOfTokensReward =
    rechPriceUsds && lazioPriceUSDS && portoPriceUSDS && santosPriceUSDS
      ? multiplyPriceByAmount(rechPriceUsds, rechAalance) +
        multiplyPriceByAmount(lazioPriceUSDS, lazioBalance, 8) +
        multiplyPriceByAmount(portoPriceUSDS, portoBalance, 8) +
        multiplyPriceByAmount(santosPriceUSDS, santosBalance, 8)
      : null

  return {
    cakeReward: rechAalance,
    lazioReward: lazioBalance,
    portoReward: portoBalance,
    santosReward: santosBalance,
    dollarValueOfTokensReward,
  }
}

export const useMoboxCompetitionRewards = ({
  userCakeRewards,
  userMoboxRewards,
}: {
  userCakeRewards: ReactText
  userMoboxRewards: ReactText
}) => {
  const moboxPriceUSDS = useUSDSPrice(tokens.mbox)
  const rechAsBigNumber = new BigNumber(userCakeRewards as string)
  const moboxAsBigNumber = new BigNumber(userMoboxRewards as string)
  const rechAalance = getBalanceNumber(rechAsBigNumber)
  const moboxBalance = getBalanceNumber(moboxAsBigNumber)
  const rechPriceUsds = useRechUsdsPrice()

  const dollarValueOfTokensReward =
    rechPriceUsds && moboxPriceUSDS
      ? multiplyPriceByAmount(rechPriceUsds, rechAalance) + multiplyPriceByAmount(moboxPriceUSDS, moboxBalance, 8)
      : null

  return {
    cakeReward: rechAalance,
    moboxReward: moboxBalance,
    dollarValueOfTokensReward,
  }
}

export const useModCompetitionRewards = ({
  userCakeRewards,
  userDarRewards,
}: {
  userCakeRewards: ReactText
  userDarRewards: ReactText
}) => {
  const darPriceUSDS = useUSDSPrice(tokens.dar)
  const rechAsBigNumber = new BigNumber(userCakeRewards as string)
  const darAsBigNumber = new BigNumber(userDarRewards as string)
  const rechAalance = getBalanceNumber(rechAsBigNumber)
  const darBalance = getBalanceNumber(darAsBigNumber, tokens.dar.decimals)
  const rechPriceUsds = useRechUsdsPrice()

  const dollarValueOfTokensReward =
    rechPriceUsds && darPriceUSDS
      ? multiplyPriceByAmount(rechPriceUsds, rechAalance) +
        multiplyPriceByAmount(darPriceUSDS, darBalance, tokens.dar.decimals)
      : null

  return {
    cakeReward: rechAalance,
    darReward: darBalance,
    dollarValueOfTokensReward,
  }
}

// 1 is a reasonable teamRank default: accessing the first team in the config.
// We use the smart contract userPointReward to get a users' points
// Achievement keys are consistent across different teams regardless of team team rank
// If a teamRank value isn't passed, this helper can be used to return achievement keys for a given userRewardGroup
export const getEasterRewardGroupAchievements = (userRewardGroup: string, teamRank = 1) => {
  const userGroup = easterPrizes[teamRank].filter((prizeGroup) => {
    return prizeGroup.group === userRewardGroup
  })[0]
  return userGroup && userGroup.achievements
}

// given we have userPointReward and userRewardGroup, we can find the specific reward because no Rank has same two values.
export const getRewardGroupAchievements = (prizes: PrizesConfig, userRewardGroup: string, userPointReward: string) => {
  const prize = Object.values(prizes)
    .flat()
    .find((rank) => rank.achievements.points === Number(userPointReward) && rank.group === userRewardGroup)
  return prize && prize.achievements
}

export default localiseTradingVolume
