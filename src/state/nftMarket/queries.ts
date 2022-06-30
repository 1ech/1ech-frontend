export const getBaseNftFields = () => `
  tokenId
  metadataUrl
  currentAskPrice
  currentSeller
  latestTradedPriceInECH
  tradeVolumeECH
  totalTrades
  isTradable
  updatedAt
  otherId
  collection {
    id
  }
`

export const getBaseTransactionFields = () => `
  id
  block
  timestamp
  askPrice
  netPrice
  withECH
  buyer {
    id
  }
  seller {
    id
  }
`

export const getCollectionBaseFields = () => `
  id
  name
  symbol
  active
  totalTrades
  totalVolumeECH
  numberTokensListed
  creatorAddress
  tradingFee
  creatorFee
  whitelistChecker
`
