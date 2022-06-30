import { Flex, UserMenuItem, WarningIcon } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import { useGetEchBalance } from 'hooks/useTokenBalance'
import { FetchStatus } from 'config/constants/types'
import { LOW_ECH_BALANCE } from './WalletModal'

interface WalletUserMenuItemProps {
  isWrongNetwork: boolean
  onPresentWalletModal: () => void
}

const WalletUserMenuItem: React.FC<WalletUserMenuItemProps> = ({ isWrongNetwork, onPresentWalletModal }) => {
  const { t } = useTranslation()
  const { balance, fetchStatus } = useGetEchBalance()
  const hasLowEchBalance = fetchStatus === FetchStatus.Fetched && balance.lte(LOW_ECH_BALANCE)

  return (
    <UserMenuItem as="button" onClick={onPresentWalletModal}>
      <Flex alignItems="center" justifyContent="space-between" width="100%">
        {t('Wallet')}
        {hasLowEchBalance && !isWrongNetwork && <WarningIcon color="warning" width="24px" />}
        {isWrongNetwork && <WarningIcon color="failure" width="24px" />}
      </Flex>
    </UserMenuItem>
  )
}

export default WalletUserMenuItem
