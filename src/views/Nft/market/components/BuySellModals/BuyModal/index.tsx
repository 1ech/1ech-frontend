import { useEffect, useState } from 'react'
import { InjectedModalProps } from '@pancakeswap/uikit'
import { MaxUint256, Zero } from '@ethersproject/constants'
import useTheme from 'hooks/useTheme'
import { useTranslation, TranslateFunction } from 'contexts/Localization'
import useTokenBalance, { useGetEchBalance } from 'hooks/useTokenBalance'
import { getBalanceNumber } from 'utils/formatBalance'
import { ethersToBigNumber } from 'utils/bigNumber'
import tokens from 'config/constants/tokens'
import { CHAIN_ID } from 'config/constants/networks'
import { ChainId } from '@1ech/sdk'
import { parseUnits, formatEther } from '@ethersproject/units'
import { useERC20, useNftMarketContract } from 'hooks/useContract'
import { useWeb3React } from '@web3-react/core'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import useApproveConfirmTransaction from 'hooks/useApproveConfirmTransaction'
import { requiresApproval } from 'utils/requiresApproval'
import useToast from 'hooks/useToast'
import { ToastDescriptionWithTx } from 'components/Toast'
import { NftToken } from 'state/nftMarket/types'
import { StyledModal } from './styles'
import ReviewStage from './ReviewStage'
import ConfirmStage from '../shared/ConfirmStage'
import ApproveAndConfirmStage from '../shared/ApproveAndConfirmStage'
import { PaymentCurrency, BuyingStage } from './types'
import TransactionConfirmed from '../shared/TransactionConfirmed'

const modalTitles = (t: TranslateFunction) => ({
  [BuyingStage.REVIEW]: t('Review'),
  [BuyingStage.APPROVE_AND_CONFIRM]: t('Back'),
  [BuyingStage.CONFIRM]: t('Back'),
  [BuyingStage.TX_CONFIRMED]: t('Transaction Confirmed'),
})

interface BuyModalProps extends InjectedModalProps {
  nftToBuy: NftToken
}

// NFT WECH in testnet contract is different
const wechAddress =
  CHAIN_ID === String(ChainId.MAINNET) ? tokens.wech.address : '0x094616f0bdfb0b526bd735bf66eca0ad254ca81f'

const BuyModal: React.FC<BuyModalProps> = ({ nftToBuy, onDismiss }) => {
  const [stage, setStage] = useState(BuyingStage.REVIEW)
  const [confirmedTxHash, setConfirmedTxHash] = useState('')
  const [paymentCurrency, setPaymentCurrency] = useState<PaymentCurrency>(PaymentCurrency.ECH)
  const [isPaymentCurrentInitialized, setIsPaymentCurrentInitialized] = useState(false)
  const { theme } = useTheme()
  const { t } = useTranslation()
  const { callWithGasPrice } = useCallWithGasPrice()

  const { account } = useWeb3React()
  const wechContractReader = useERC20(wechAddress, false)
  const wechContractApprover = useERC20(wechAddress)
  const nftMarketContract = useNftMarketContract()

  const { toastSuccess } = useToast()

  const nftPriceWei = parseUnits(nftToBuy?.marketData?.currentAskPrice, 'ether')
  const nftPrice = parseFloat(nftToBuy?.marketData?.currentAskPrice)

  // ECH - returns ethers.BigNumber
  const { balance: echBalance, fetchStatus: echFetchStatus } = useGetEchBalance()
  const formattedEchBalance = parseFloat(formatEther(echBalance))
  // WECH - returns BigNumber
  const { balance: wechBalance, fetchStatus: wechFetchStatus } = useTokenBalance(wechAddress)
  const formattedWechBalance = getBalanceNumber(wechBalance)

  const walletBalance = paymentCurrency === PaymentCurrency.ECH ? formattedEchBalance : formattedWechBalance
  const walletFetchStatus = paymentCurrency === PaymentCurrency.ECH ? echFetchStatus : wechFetchStatus

  const notEnoughEchForPurchase =
    paymentCurrency === PaymentCurrency.ECH
      ? echBalance.lt(nftPriceWei)
      : wechBalance.lt(ethersToBigNumber(nftPriceWei))

  useEffect(() => {
    if (echBalance.lt(nftPriceWei) && wechBalance.gte(ethersToBigNumber(nftPriceWei)) && !isPaymentCurrentInitialized) {
      setPaymentCurrency(PaymentCurrency.WECH)
      setIsPaymentCurrentInitialized(true)
    }
  }, [echBalance, wechBalance, nftPriceWei, isPaymentCurrentInitialized])

  const { isApproving, isApproved, isConfirming, handleApprove, handleConfirm } = useApproveConfirmTransaction({
    onRequiresApproval: async () => {
      return requiresApproval(wechContractReader, account, nftMarketContract.address)
    },
    onApprove: () => {
      return callWithGasPrice(wechContractApprover, 'approve', [nftMarketContract.address, MaxUint256])
    },
    onApproveSuccess: async ({ receipt }) => {
      toastSuccess(
        t('Contract approved - you can now buy NFT with WECH!'),
        <ToastDescriptionWithTx txHash={receipt.transactionHash} />,
      )
    },
    onConfirm: () => {
      const payAmount = Number.isNaN(nftPrice) ? Zero : parseUnits(nftToBuy?.marketData?.currentAskPrice)
      if (paymentCurrency === PaymentCurrency.ECH) {
        return callWithGasPrice(nftMarketContract, 'buyTokenUsingECH', [nftToBuy.collectionAddress, nftToBuy.tokenId], {
          value: payAmount,
        })
      }
      return callWithGasPrice(nftMarketContract, 'buyTokenUsingWECH', [
        nftToBuy.collectionAddress,
        nftToBuy.tokenId,
        payAmount,
      ])
    },
    onSuccess: async ({ receipt }) => {
      setConfirmedTxHash(receipt.transactionHash)
      setStage(BuyingStage.TX_CONFIRMED)
      toastSuccess(
        t('Your NFT has been sent to your wallet'),
        <ToastDescriptionWithTx txHash={receipt.transactionHash} />,
      )
    },
  })

  const continueToNextStage = () => {
    if (paymentCurrency === PaymentCurrency.WECH && !isApproved) {
      setStage(BuyingStage.APPROVE_AND_CONFIRM)
    } else {
      setStage(BuyingStage.CONFIRM)
    }
  }

  const goBack = () => {
    setStage(BuyingStage.REVIEW)
  }

  const showBackButton = stage === BuyingStage.CONFIRM || stage === BuyingStage.APPROVE_AND_CONFIRM

  return (
    <StyledModal
      title={modalTitles(t)[stage]}
      stage={stage}
      onDismiss={onDismiss}
      onBack={showBackButton ? goBack : null}
      headerBackground={theme.colors.gradients.cardHeader}
    >
      {stage === BuyingStage.REVIEW && (
        <ReviewStage
          nftToBuy={nftToBuy}
          paymentCurrency={paymentCurrency}
          setPaymentCurrency={setPaymentCurrency}
          nftPrice={nftPrice}
          walletBalance={walletBalance}
          walletFetchStatus={walletFetchStatus}
          notEnoughEchForPurchase={notEnoughEchForPurchase}
          continueToNextStage={continueToNextStage}
        />
      )}
      {stage === BuyingStage.APPROVE_AND_CONFIRM && (
        <ApproveAndConfirmStage
          variant="buy"
          handleApprove={handleApprove}
          isApproved={isApproved}
          isApproving={isApproving}
          isConfirming={isConfirming}
          handleConfirm={handleConfirm}
        />
      )}
      {stage === BuyingStage.CONFIRM && <ConfirmStage isConfirming={isConfirming} handleConfirm={handleConfirm} />}
      {stage === BuyingStage.TX_CONFIRMED && <TransactionConfirmed txHash={confirmedTxHash} onDismiss={onDismiss} />}
    </StyledModal>
  )
}

export default BuyModal
