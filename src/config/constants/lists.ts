const PANCAKE_EXTENDED = 'https://tokens.1ech.com/pancakeswap-extended.json'
const PANCAKE_TOP100 = 'https://tokens.1ech.com/pancakeswap-top-100.json'
const COINGECKO = 'https://tokens.1ech.com/coingecko.json'
const CMC = 'https://tokens.1ech.com/cmc.json'

// List of official tokens list
export const OFFICIAL_LISTS = [PANCAKE_EXTENDED, PANCAKE_TOP100]

export const UNSUPPORTED_LIST_URLS: string[] = []
export const WARNING_LIST_URLS: string[] = []

// lower index == higher priority for token import
export const DEFAULT_LIST_OF_LISTS: string[] = [
  PANCAKE_EXTENDED,
  PANCAKE_TOP100,
  CMC,
  COINGECKO,
  ...UNSUPPORTED_LIST_URLS, // need to load unsupported tokens as well
  ...WARNING_LIST_URLS,
]

// default lists to be 'active' aka searched across
export const DEFAULT_ACTIVE_LIST_URLS: string[] = []
