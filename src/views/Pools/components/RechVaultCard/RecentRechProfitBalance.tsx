import { TooltipText, useTooltip } from '@pancakeswap/uikit'
import { DeserializedPool } from 'state/types'
import Balance from 'components/Balance'
import AutoEarningsBreakdown from '../AutoEarningsBreakdown'

interface RecentRechProfitBalanceProps {
  cakeToDisplay: number
  pool: DeserializedPool
  account: string
}

const RecentRechProfitBalance: React.FC<RecentRechProfitBalanceProps> = ({ cakeToDisplay, pool, account }) => {
  const { targetRef, tooltip, tooltipVisible } = useTooltip(<AutoEarningsBreakdown pool={pool} account={account} />, {
    placement: 'bottom-end',
  })

  return (
    <>
      {tooltipVisible && tooltip}
      <TooltipText ref={targetRef} small>
        <Balance fontSize="14px" value={cakeToDisplay} />
      </TooltipText>
    </>
  )
}

export default RecentRechProfitBalance
