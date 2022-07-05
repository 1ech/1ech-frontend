import { Token, ChainId } from '@1ech/sdk'
import getLpAddress from 'utils/getLpAddress'

const CAKE_AS_STRING = '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82'
const USDS_AS_STRING = '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56'
const CAKE_AS_TOKEN = new Token(ChainId.MAINNET, CAKE_AS_STRING, 18)
const USDS_AS_TOKEN = new Token(ChainId.MAINNET, USDS_AS_STRING, 18)
const CAKE_USDS_LP = '0x804678fa97d91B974ec2af3c843270886528a9E6'

describe('getLpAddress', () => {
  it('returns correct LP address, both tokens are strings', () => {
    expect(getLpAddress(CAKE_AS_STRING, USDS_AS_STRING)).toBe(CAKE_USDS_LP)
  })
  it('returns correct LP address, token1 is string, token 2 is Token', () => {
    expect(getLpAddress(CAKE_AS_STRING, USDS_AS_TOKEN)).toBe(CAKE_USDS_LP)
  })
  it('returns correct LP address, both tokens are Token', () => {
    expect(getLpAddress(CAKE_AS_TOKEN, USDS_AS_TOKEN)).toBe(CAKE_USDS_LP)
  })
  it('returns null if any address is invalid', () => {
    expect(getLpAddress('123', '456')).toBe(null)
    expect(getLpAddress(undefined, undefined)).toBe(null)
    expect(getLpAddress(CAKE_AS_STRING, undefined)).toBe(null)
    expect(getLpAddress(undefined, USDS_AS_TOKEN)).toBe(null)
    expect(getLpAddress(CAKE_AS_STRING, '456')).toBe(null)
    expect(getLpAddress('123', USDS_AS_TOKEN)).toBe(null)
  })
})
