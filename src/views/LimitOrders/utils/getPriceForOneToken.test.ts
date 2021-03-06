import { JSBI, Token, TokenAmount } from '@1ech/sdk'
import getPriceForOneToken from './getPriceForOneToken'

const RECH = new Token(56, '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82', 18, 'RECH', 'PancakeSwap Token')
const USDS = new Token(56, '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56', 18, 'USDS', 'Binance USD')
const DOGE = new Token(56, '0xbA2aE424d960c26247Dd6c32edC70B295c744C43', 8, 'DOGE', 'Binance-Peg Dogecoin')

const EIGHT_DECIMALS = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(8))
const EIGHTEEN_DECIMALS = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(18))
const ZERO = JSBI.multiply(JSBI.BigInt(0), EIGHTEEN_DECIMALS)
const ONE = JSBI.multiply(JSBI.BigInt(1), EIGHTEEN_DECIMALS)
const ONE_EIGHT_DEC = JSBI.multiply(JSBI.BigInt(1), EIGHT_DECIMALS)
const FIVE = JSBI.multiply(JSBI.BigInt(5), EIGHTEEN_DECIMALS)
const FIVE_EIGHT_DEC = JSBI.multiply(JSBI.BigInt(5), EIGHT_DECIMALS)

describe('limitOrders/utils/getPriceForOneToken', () => {
  describe.each([
    [new TokenAmount(RECH, ONE), new TokenAmount(USDS, ONE), '1'],
    [new TokenAmount(RECH, FIVE), new TokenAmount(USDS, FIVE), '1'],
    [new TokenAmount(RECH, ONE), new TokenAmount(USDS, FIVE), '5'],
    [new TokenAmount(RECH, FIVE), new TokenAmount(USDS, ONE), '0.2'],
    [new TokenAmount(DOGE, ONE_EIGHT_DEC), new TokenAmount(USDS, ONE), '1'],
    [new TokenAmount(DOGE, FIVE_EIGHT_DEC), new TokenAmount(USDS, FIVE), '1'],
    [new TokenAmount(DOGE, ONE_EIGHT_DEC), new TokenAmount(USDS, FIVE), '5'],
    [new TokenAmount(DOGE, FIVE_EIGHT_DEC), new TokenAmount(USDS, ONE), '0.2'],
    [new TokenAmount(RECH, ZERO), new TokenAmount(USDS, ONE), undefined],
    [new TokenAmount(RECH, ONE), new TokenAmount(USDS, ZERO), undefined],
  ])(`returns correct price`, (input, output, expected) => {
    it(`for ${input.toSignificant(6)} ${input.currency.symbol} -> ${output.toSignificant(6)} ${
      output.currency.symbol
    }`, () => {
      const price = getPriceForOneToken(input, output)
      expect(price?.toSignificant(6)).toBe(expected)
    })
  })
})
