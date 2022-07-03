import { Flex, Text } from '@pancakeswap/uikit'
import { useWeb3React } from '@web3-react/core'
import { useTranslation } from 'contexts/Localization'
import { usePriceRechBusd } from 'state/farms/hooks'
import { useVaultPoolByKey } from 'state/pools/hooks'
import { DeserializedPool } from 'state/types'
import { getRechVaultEarnings } from 'views/Pools/helpers'
import RecentRechProfitBalance from './RecentRechProfitBalance'

const RecentRechProfitCountdownRow = ({ pool }: { pool: DeserializedPool }) => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const {
    pricePerFullShare,
    userData: { rechAtLastUserAction, userShares, currentOverdueFee, currentPerformanceFee },
  } = useVaultPoolByKey(pool.vaultKey)
  const rechPriceBusd = usePriceRechBusd()
  const { hasAutoEarnings, autoCakeToDisplay } = getRechVaultEarnings(
    account,
    rechAtLastUserAction,
    userShares,
    pricePerFullShare,
    rechPriceBusd.toNumber(),
    currentPerformanceFee.plus(currentOverdueFee),
  )

  if (!(userShares.gt(0) && account)) {
    return null
  }

  return (
    <Flex alignItems="center" justifyContent="space-between">
      <Text fontSize="14px">{`${t('Recent RECH profit')}:`}</Text>
      {hasAutoEarnings && <RecentRechProfitBalance cakeToDisplay={autoCakeToDisplay} pool={pool} account={account} />}
    </Flex>
  )
}

export default RecentRechProfitCountdownRow
