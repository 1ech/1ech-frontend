import { useState } from 'react'
import { Box, Flex, InjectedModalProps, Modal, Button, Spinner } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import useTheme from 'hooks/useTheme'
import useGetVotingPower from '../hooks/useGetVotingPower'
import DetailsView from './CastVoteModal/DetailsView'

interface VoteDetailsModalProps extends InjectedModalProps {
  block: number
}

const VoteDetailsModal: React.FC<VoteDetailsModalProps> = ({ block, onDismiss }) => {
  const { t } = useTranslation()
  const [modalIsOpen, setModalIsOpen] = useState(true)
  const {
    isLoading,
    total,
    rechAalance,
    rechVaultBalance,
    cakePoolBalance,
    poolsBalance,
    cakeEchLpBalance,
    ifoPoolBalance,
  } = useGetVotingPower(block, modalIsOpen)
  const { theme } = useTheme()

  const handleDismiss = () => {
    setModalIsOpen(false)
    onDismiss()
  }

  return (
    <Modal title={t('Voting Power')} onDismiss={handleDismiss} headerBackground={theme.colors.gradients.cardHeader}>
      <Box mb="24px" width="320px">
        {isLoading ? (
          <Flex height="450px" alignItems="center" justifyContent="center">
            <Spinner size={80} />
          </Flex>
        ) : (
          <>
            <DetailsView
              total={total}
              rechAalance={rechAalance}
              rechVaultBalance={rechVaultBalance}
              cakePoolBalance={cakePoolBalance}
              poolsBalance={poolsBalance}
              ifoPoolBalance={ifoPoolBalance}
              cakeEchLpBalance={cakeEchLpBalance}
              block={block}
            />
            <Button variant="secondary" onClick={onDismiss} width="100%" mt="16px">
              {t('Close')}
            </Button>
          </>
        )}
      </Box>
    </Modal>
  )
}

export default VoteDetailsModal
