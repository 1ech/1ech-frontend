import React from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { useTranslation } from 'contexts/Localization'
import { Flex, Heading, Text, useMatchBreakpointsContext } from '@pancakeswap/uikit'
import Balance from 'components/Balance'
import { ActionContainer, ActionContent, ActionTitles } from 'views/Pools/components/PoolsTable/ActionPanel/styles'
import { usePriceRechUsds } from 'state/farmsV1/hooks'
import { EarnedProps } from '../Cells/Earned'

const Container = styled(ActionContainer)`
  flex: 2;
  height: 100%;
`

const Earned: React.FC<EarnedProps> = ({ earnings }) => {
  const { t } = useTranslation()
  const { isMobile } = useMatchBreakpointsContext()

  const earningsBigNumber = new BigNumber(earnings)
  const rechPrice = usePriceRechUsds()
  let earningsUsds = 0
  let displayBalance = earnings.toLocaleString()

  // If user didn't connect wallet default balance will be 0
  if (!earningsBigNumber.isZero()) {
    earningsUsds = earningsBigNumber.multipliedBy(rechPrice).toNumber()
    displayBalance = earningsBigNumber.toFixed(3, BigNumber.ROUND_DOWN)
  }

  if (isMobile) {
    return (
      <Flex justifyContent="space-between">
        <Text>{`RECH ${t('Earned')}`}</Text>
        <Flex height="20px" alignItems="center">
          {Number(displayBalance) ? (
            <Balance fontSize="16px" value={Number(displayBalance)} />
          ) : (
            <Text fontSize="16px">0</Text>
          )}
        </Flex>
      </Flex>
    )
  }

  return (
    <Container>
      <ActionTitles>
        <Text bold textTransform="uppercase" color="secondary" fontSize="12px" pr="4px">
          {`RECH ${t('Earned')}`}
        </Text>
      </ActionTitles>
      <ActionContent>
        <div>
          <Heading color={earningsBigNumber.gt(0) ? 'text' : 'textDisabled'}>{displayBalance}</Heading>
          <Balance
            fontSize="12px"
            color={earningsUsds > 0 ? 'textSubtle' : 'textDisabled'}
            decimals={2}
            value={earningsUsds}
            unit=" USD"
            prefix="~"
          />
        </div>
      </ActionContent>
    </Container>
  )
}

export default Earned
