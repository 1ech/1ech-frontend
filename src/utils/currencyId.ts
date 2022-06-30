import { Currency, ETHER, Token } from '@1ech/sdk'

export function currencyId(currency: Currency): string {
  if (currency === ETHER) return 'ECH'
  if (currency instanceof Token) return currency.address
  throw new Error('invalid currency')
}

export default currencyId
