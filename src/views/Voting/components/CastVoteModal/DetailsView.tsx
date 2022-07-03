import { Flex, LinkExternal, Text } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import styled from 'styled-components'
import { getBscScanLink } from 'utils'
import { formatNumber } from 'utils/formatBalance'
import { ModalInner, VotingBox } from './styles'

const StyledLinkExternal = styled(LinkExternal)`
  display: inline-flex;
  font-size: 14px;
  > svg {
    width: 14px;
  }
`

interface DetailsViewProps {
  total: number
  rechAalance?: number
  rechVaultBalance?: number
  cakePoolBalance?: number
  poolsBalance?: number
  cakeEchLpBalance?: number
  ifoPoolBalance?: number
  block: number
}

const DetailsView: React.FC<DetailsViewProps> = ({
  total,
  rechAalance,
  rechVaultBalance,
  cakePoolBalance,
  poolsBalance,
  cakeEchLpBalance,
  ifoPoolBalance,
  block,
}) => {
  const { t } = useTranslation()

  return (
    <ModalInner mb="0">
      <Text as="p" mb="24px" fontSize="14px" color="textSubtle">
        {t(
          'Your voting power is determined by the amount of RECH you held at the block detailed below. RECH held in other places does not contribute to your voting power.',
        )}
      </Text>
      <Text color="secondary" textTransform="uppercase" mb="4px" bold fontSize="14px">
        {t('Overview')}
      </Text>
      <VotingBox>
        <Text color="secondary">{t('Your Voting Power')}</Text>
        <Text bold fontSize="20px">
          {formatNumber(total, 0, 3)}
        </Text>
      </VotingBox>
      <Text color="secondary" textTransform="uppercase" mb="4px" bold fontSize="14px">
        {t('Your RECH held at block')}
        <StyledLinkExternal href={getBscScanLink(block, 'block')} ml="8px">
          {block}
        </StyledLinkExternal>
      </Text>
      {Number.isFinite(rechAalance) && (
        <Flex alignItems="center" justifyContent="space-between" mb="4px">
          <Text color="textSubtle" fontSize="16px">
            {t('Wallet')}
          </Text>
          <Text textAlign="right">{formatNumber(rechAalance, 0, 3)}</Text>
        </Flex>
      )}
      {Number.isFinite(cakePoolBalance) && (
        <Flex alignItems="center" justifyContent="space-between" mb="4px">
          <Text color="textSubtle" fontSize="16px">
            {t('RECH Pool')}
          </Text>
          <Text textAlign="right">{formatNumber(cakePoolBalance, 0, 3)}</Text>
        </Flex>
      )}
      {Number.isFinite(rechVaultBalance) && (
        <Flex alignItems="center" justifyContent="space-between" mb="4px">
          <Text color="textSubtle" fontSize="16px">
            {t('Auto RECH Pool')}
          </Text>
          <Text textAlign="right">{formatNumber(rechVaultBalance, 0, 3)}</Text>
        </Flex>
      )}
      {Number.isFinite(ifoPoolBalance) && (
        <Flex alignItems="center" justifyContent="space-between" mb="4px">
          <Text color="textSubtle" fontSize="16px">
            {t('IFO Pool')}
          </Text>
          <Text textAlign="right">{formatNumber(ifoPoolBalance, 0, 3)}</Text>
        </Flex>
      )}
      {Number.isFinite(poolsBalance) && (
        <Flex alignItems="center" justifyContent="space-between" mb="4px">
          <Text color="textSubtle" fontSize="16px">
            {t('Other Syrup Pools')}
          </Text>
          <Text textAlign="right">{formatNumber(poolsBalance, 0, 3)}</Text>
        </Flex>
      )}
      {Number.isFinite(cakeEchLpBalance) && (
        <Flex alignItems="center" justifyContent="space-between" mb="4px">
          <Text color="textSubtle" fontSize="16px">
            {t('RECH ECH LP')}
          </Text>
          <Text textAlign="right">{formatNumber(cakeEchLpBalance, 0, 3)}</Text>
        </Flex>
      )}
    </ModalInner>
  )
}

export default DetailsView
