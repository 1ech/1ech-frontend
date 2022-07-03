import BigNumber from 'bignumber.js'
import { Flex, Skeleton, Text } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { usePriceRechBusd } from 'state/farms/hooks'
import Balance from 'components/Balance'
import { getBalanceNumber, getFullDisplayBalance } from 'utils/formatBalance'

interface RewardBracketDetailProps {
  rechAmount: BigNumber
  rewardBracket?: number
  numberWinners?: string
  isBurn?: boolean
  isHistoricRound?: boolean
  isLoading?: boolean
}

const RewardBracketDetail: React.FC<RewardBracketDetailProps> = ({
  rewardBracket,
  rechAmount,
  numberWinners,
  isHistoricRound,
  isBurn,
  isLoading,
}) => {
  const { t } = useTranslation()
  const rechPriceBusd = usePriceRechBusd()

  const getRewardText = () => {
    const numberMatch = rewardBracket + 1
    if (isBurn) {
      return t('Burn')
    }
    if (rewardBracket === 5) {
      return t('Match all %numberMatch%', { numberMatch })
    }
    return t('Match first %numberMatch%', { numberMatch })
  }

  return (
    <Flex flexDirection="column">
      {isLoading ? (
        <Skeleton mb="4px" mt="8px" height={16} width={80} />
      ) : (
        <Text bold color={isBurn ? 'failure' : 'secondary'}>
          {getRewardText()}
        </Text>
      )}
      <>
        {isLoading || rechAmount.isNaN() ? (
          <Skeleton my="4px" mr="10px" height={20} width={110} />
        ) : (
          <Balance fontSize="20px" bold unit=" RECH" value={getBalanceNumber(rechAmount)} decimals={0} />
        )}
        {isLoading || rechAmount.isNaN() ? (
          <>
            <Skeleton mt="4px" mb="16px" height={12} width={70} />
          </>
        ) : (
          <Balance
            fontSize="12px"
            color="textSubtle"
            prefix="~$"
            value={getBalanceNumber(rechAmount.times(rechPriceBusd))}
            decimals={0}
          />
        )}
        {isHistoricRound && rechAmount && (
          <>
            {numberWinners !== '0' && (
              <Text fontSize="12px" color="textSubtle">
                {getFullDisplayBalance(rechAmount.div(parseInt(numberWinners, 10)), 18, 2)} RECH {t('each')}
              </Text>
            )}
            <Text fontSize="12px" color="textSubtle">
              {numberWinners} {t('Winning Tickets')}
            </Text>
          </>
        )}
      </>
    </Flex>
  )
}

export default RewardBracketDetail
