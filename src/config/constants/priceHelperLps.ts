import tokens from './tokens'
import { SerializedFarmConfig } from './types'

const priceHelperLps: SerializedFarmConfig[] = [
  /**
   * These LPs are just used to help with price calculation for MasterChief LPs (farms.ts).
   * This list is added to the MasterChiefLps and passed to fetchFarm. The calls to get contract information about the token/quoteToken in the LP are still made.
   * The absence of a PID means the masterchief contract calls are skipped for this farm.
   * Prices are then fetched for all farms (masterchief + priceHelperLps).
   * Before storing to redux, farms without a PID are filtered out.
   */
  {
    pid: null,
    lpSymbol: 'ANKR-ECH LP',
    lpAddresses: {
      97: '',
      3000: '0x3147F98B8f9C53Acdf8F16332eaD12B592a1a4ae',
    },
    token: tokens.ankr,
    quoteToken: tokens.wech,
  },
  {
    pid: null,
    lpSymbol: 'ANTEX-USDS LP',
    lpAddresses: {
      97: '',
      3000: '0x4DcB7b3b0E8914DC0e6D366521604cD23E7991E1',
    },
    token: tokens.antex,
    quoteToken: tokens.usds,
  },
]

export default priceHelperLps
