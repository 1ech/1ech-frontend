import type { Signer } from '@ethersproject/abstract-signer'
import type { Provider } from '@ethersproject/providers'
import { Contract } from '@ethersproject/contracts'
import { simpleRpcProvider } from 'utils/providers'
import poolsConfig from 'config/constants/pools'
import { PoolCategory } from 'config/constants/types'
import tokens from 'config/constants/tokens'

// Addresses
import {
  getAddress,
  getPancakeProfileAddress,
  getPancakeBunniesAddress,
  getBunnyFactoryAddress,
  getBunnySpecialAddress,
  getLotteryV2Address,
  getMasterChiefAddress,
  getMasterChiefV1Address,
  getPointCenterIfoAddress,
  getClaimRefundAddress,
  getTradingCompetitionAddressEaster,
  getEasterNftAddress,
  getRechVaultAddress,
  getMulticallAddress,
  getBunnySpecialRechVaultAddress,
  getBunnySpecialPredictionAddress,
  getBunnySpecialLotteryAddress,
  getFarmAuctionAddress,
  getAnniversaryAchievement,
  getNftMarketAddress,
  getNftSaleAddress,
  getPancakeSquadAddress,
  getTradingCompetitionAddressFanToken,
  getTradingCompetitionAddressMobox,
  getTradingCompetitionAddressMoD,
  getBunnySpecialXmasAddress,
  getGalaxyNFTClaimingAddress,
} from 'utils/addressHelpers'

// ABI
import profileABI from 'config/abi/pancakeProfile.json'
import pancakeBunniesAbi from 'config/abi/pancakeBunnies.json'
import bunnyFactoryAbi from 'config/abi/bunnyFactory.json'
import bunnySpecialAbi from 'config/abi/bunnySpecial.json'
import erc20Abi from 'config/abi/erc20.json'
import erc721Abi from 'config/abi/erc721.json'
import lpTokenAbi from 'config/abi/lpToken.json'
import rechAbi from 'config/abi/rech.json'
import ifoV1Abi from 'config/abi/ifoV1.json'
import ifoV2Abi from 'config/abi/ifoV2.json'
import pointCenterIfo from 'config/abi/pointCenterIfo.json'
import lotteryV2Abi from 'config/abi/lotteryV2.json'
import masterChief from 'config/abi/masterchief.json'
import masterChiefV1 from 'config/abi/masterchiefV1.json'
import genTakeda from 'config/abi/genTakeda.json'
import genTakedaV2 from 'config/abi/genTakedaV2.json'
import genTakedaEch from 'config/abi/genTakedaEch.json'
import claimRefundAbi from 'config/abi/claimRefund.json'
import tradingCompetitionEasterAbi from 'config/abi/tradingCompetitionEaster.json'
import tradingCompetitionFanTokenAbi from 'config/abi/tradingCompetitionFanToken.json'
import tradingCompetitionMoboxAbi from 'config/abi/tradingCompetitionMobox.json'
import tradingCompetitionMoDAbi from 'config/abi/tradingCompetitionMoD.json'
import easterNftAbi from 'config/abi/easterNft.json'
import rechVaultV2Abi from 'config/abi/rechVaultV2.json'
import predictionsAbi from 'config/abi/predictions.json'
import chainlinkOracleAbi from 'config/abi/chainlinkOracle.json'
import MultiCallAbi from 'config/abi/Multicall.json'
import bunnySpecialRechVaultAbi from 'config/abi/bunnySpecialRechVault.json'
import bunnySpecialPredictionAbi from 'config/abi/bunnySpecialPrediction.json'
import bunnySpecialLotteryAbi from 'config/abi/bunnySpecialLottery.json'
import bunnySpecialXmasAbi from 'config/abi/bunnySpecialXmas.json'
import farmAuctionAbi from 'config/abi/farmAuction.json'
import anniversaryAchievementAbi from 'config/abi/anniversaryAchievement.json'
import galaxyNFTClaimingAbi from 'config/abi/galaxyNFTClaiming.json'
import nftMarketAbi from 'config/abi/nftMarket.json'
import nftSaleAbi from 'config/abi/nftSale.json'
import pancakeSquadAbi from 'config/abi/pancakeSquad.json'
import erc721CollectionAbi from 'config/abi/erc721collection.json'

// Types
import type {
  ChainlinkOracle,
  FarmAuction,
  Predictions,
  AnniversaryAchievement,
  IfoV1,
  IfoV2,
  Erc20,
  Erc721,
  Rech,
  BunnyFactory,
  PancakeBunnies,
  PancakeProfile,
  LotteryV2,
  Masterchief,
  MasterchiefV1,
  GenTakeda,
  GenTakedaV2,
  BunnySpecial,
  LpToken,
  ClaimRefund,
  TradingCompetitionEaster,
  TradingCompetitionFanToken,
  EasterNft,
  Multicall,
  BunnySpecialRechVault,
  BunnySpecialPrediction,
  BunnySpecialLottery,
  GalaxyNFTClaiming,
  NftMarket,
  NftSale,
  PancakeSquad,
  Erc721collection,
  PointCenterIfo,
  RechVaultV2,
  TradingCompetitionMobox,
  TradingCompetitionMoD,
} from 'config/abi/types'

export const getContract = (abi: any, address: string, signer?: Signer | Provider) => {
  const signerOrProvider = signer ?? simpleRpcProvider
  return new Contract(address, abi, signerOrProvider)
}

export const getErc20Contract = (address: string, signer?: Signer | Provider) => {
  return getContract(erc20Abi, address, signer) as Erc20
}
export const getErc721Contract = (address: string, signer?: Signer | Provider) => {
  return getContract(erc721Abi, address, signer) as Erc721
}
export const getLpContract = (address: string, signer?: Signer | Provider) => {
  return getContract(lpTokenAbi, address, signer) as LpToken
}
export const getIfoV1Contract = (address: string, signer?: Signer | Provider) => {
  return getContract(ifoV1Abi, address, signer) as IfoV1
}
export const getIfoV2Contract = (address: string, signer?: Signer | Provider) => {
  return getContract(ifoV2Abi, address, signer) as IfoV2
}
export const getGentakedaContract = (id: number, signer?: Signer | Provider) => {
  const config = poolsConfig.find((pool) => pool.takedaId === id)
  const abi = config.poolCategory === PoolCategory.BINANCE ? genTakedaEch : genTakeda
  return getContract(abi, getAddress(config.contractAddress), signer) as GenTakeda
}
export const getGentakedaV2Contract = (id: number, signer?: Signer | Provider) => {
  const config = poolsConfig.find((pool) => pool.takedaId === id)
  return getContract(genTakedaV2, getAddress(config.contractAddress), signer) as GenTakedaV2
}

export const getPointCenterIfoContract = (signer?: Signer | Provider) => {
  return getContract(pointCenterIfo, getPointCenterIfoAddress(), signer) as PointCenterIfo
}
export const getRechContract = (signer?: Signer | Provider) => {
  return getContract(rechAbi, tokens.rech.address, signer) as Rech
}
export const getProfileContract = (signer?: Signer | Provider) => {
  return getContract(profileABI, getPancakeProfileAddress(), signer) as PancakeProfile
}
export const getPancakeBunniesContract = (signer?: Signer | Provider) => {
  return getContract(pancakeBunniesAbi, getPancakeBunniesAddress(), signer) as PancakeBunnies
}
export const getBunnyFactoryContract = (signer?: Signer | Provider) => {
  return getContract(bunnyFactoryAbi, getBunnyFactoryAddress(), signer) as BunnyFactory
}
export const getBunnySpecialContract = (signer?: Signer | Provider) => {
  return getContract(bunnySpecialAbi, getBunnySpecialAddress(), signer) as BunnySpecial
}
export const getLotteryV2Contract = (signer?: Signer | Provider) => {
  return getContract(lotteryV2Abi, getLotteryV2Address(), signer) as LotteryV2
}
export const getMasterchiefContract = (signer?: Signer | Provider) => {
  return getContract(masterChief, getMasterChiefAddress(), signer) as Masterchief
}
export const getMasterchiefV1Contract = (signer?: Signer | Provider) => {
  return getContract(masterChiefV1, getMasterChiefV1Address(), signer) as MasterchiefV1
}
export const getClaimRefundContract = (signer?: Signer | Provider) => {
  return getContract(claimRefundAbi, getClaimRefundAddress(), signer) as ClaimRefund
}
export const getTradingCompetitionContractEaster = (signer?: Signer | Provider) => {
  return getContract(
    tradingCompetitionEasterAbi,
    getTradingCompetitionAddressEaster(),
    signer,
  ) as TradingCompetitionEaster
}

export const getTradingCompetitionContractFanToken = (signer?: Signer | Provider) => {
  return getContract(
    tradingCompetitionFanTokenAbi,
    getTradingCompetitionAddressFanToken(),
    signer,
  ) as TradingCompetitionFanToken
}
export const getTradingCompetitionContractMobox = (signer?: Signer | Provider) => {
  return getContract(tradingCompetitionMoboxAbi, getTradingCompetitionAddressMobox(), signer) as TradingCompetitionMobox
}

export const getTradingCompetitionContractMoD = (signer?: Signer | Provider) => {
  return getContract(tradingCompetitionMoDAbi, getTradingCompetitionAddressMoD(), signer) as TradingCompetitionMoD
}

export const getEasterNftContract = (signer?: Signer | Provider) => {
  return getContract(easterNftAbi, getEasterNftAddress(), signer) as EasterNft
}
export const getRechVaultV2Contract = (signer?: Signer | Provider) => {
  return getContract(rechVaultV2Abi, getRechVaultAddress(), signer) as RechVaultV2
}

export const getPredictionsContract = (address: string, signer?: Signer | Provider) => {
  return getContract(predictionsAbi, address, signer) as Predictions
}

export const getChainlinkOracleContract = (address: string, signer?: Signer | Provider) => {
  return getContract(chainlinkOracleAbi, address, signer) as ChainlinkOracle
}
export const getMulticallContract = () => {
  return getContract(MultiCallAbi, getMulticallAddress(), simpleRpcProvider) as Multicall
}
export const getBunnySpecialRechVaultContract = (signer?: Signer | Provider) => {
  return getContract(bunnySpecialRechVaultAbi, getBunnySpecialRechVaultAddress(), signer) as BunnySpecialRechVault
}
export const getBunnySpecialPredictionContract = (signer?: Signer | Provider) => {
  return getContract(bunnySpecialPredictionAbi, getBunnySpecialPredictionAddress(), signer) as BunnySpecialPrediction
}
export const getBunnySpecialLotteryContract = (signer?: Signer | Provider) => {
  return getContract(bunnySpecialLotteryAbi, getBunnySpecialLotteryAddress(), signer) as BunnySpecialLottery
}
export const getBunnySpecialXmasContract = (signer?: Signer | Provider) => {
  return getContract(bunnySpecialXmasAbi, getBunnySpecialXmasAddress(), signer)
}
export const getFarmAuctionContract = (signer?: Signer | Provider) => {
  return getContract(farmAuctionAbi, getFarmAuctionAddress(), signer) as unknown as FarmAuction
}
export const getAnniversaryAchievementContract = (signer?: Signer | Provider) => {
  return getContract(anniversaryAchievementAbi, getAnniversaryAchievement(), signer) as AnniversaryAchievement
}
export const getGalaxyNTFClaimingContract = (signer?: Signer | Provider) => {
  return getContract(galaxyNFTClaimingAbi, getGalaxyNFTClaimingAddress(), signer) as GalaxyNFTClaiming
}

export const getNftMarketContract = (signer?: Signer | Provider) => {
  return getContract(nftMarketAbi, getNftMarketAddress(), signer) as NftMarket
}
export const getNftSaleContract = (signer?: Signer | Provider) => {
  return getContract(nftSaleAbi, getNftSaleAddress(), signer) as NftSale
}
export const getPancakeSquadContract = (signer?: Signer | Provider) => {
  return getContract(pancakeSquadAbi, getPancakeSquadAddress(), signer) as PancakeSquad
}
export const getErc721CollectionContract = (signer?: Signer | Provider, address?: string) => {
  return getContract(erc721CollectionAbi, address, signer) as Erc721collection
}
