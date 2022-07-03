import poolsConfig from 'config/constants/pools'
import sousChefABI from 'config/abi/sousChef.json'
import erc20ABI from 'config/abi/erc20.json'
import multicall from 'utils/multicall'
import { getAddress } from 'utils/addressHelpers'
import { simpleRpcProvider } from 'utils/providers'
import BigNumber from 'bignumber.js'
import uniq from 'lodash/uniq'

// Pool 0, Rech / Rech is a different kind of contract (master chef)
// ECH pools use the native ECH token (wrapping ? unwrapping is done at the contract level)
const nonEchPools = poolsConfig.filter((pool) => pool.stakingToken.symbol !== 'ECH')
const echPools = poolsConfig.filter((pool) => pool.stakingToken.symbol === 'ECH')
const nonMasterPools = poolsConfig.filter((pool) => pool.sousId !== 0)

export const fetchPoolsAllowance = async (account) => {
  const calls = nonEchPools.map((pool) => ({
    address: pool.stakingToken.address,
    name: 'allowance',
    params: [account, getAddress(pool.contractAddress)],
  }))

  const allowances = await multicall(erc20ABI, calls)
  return nonEchPools.reduce(
    (acc, pool, index) => ({ ...acc, [pool.sousId]: new BigNumber(allowances[index]).toJSON() }),
    {},
  )
}

export const fetchUserBalances = async (account) => {
  // Non ECH pools
  const tokens = uniq(nonEchPools.map((pool) => pool.stakingToken.address))
  const calls = tokens.map((token) => ({
    address: token,
    name: 'balanceOf',
    params: [account],
  }))
  const tokenBalancesRaw = await multicall(erc20ABI, calls)
  const tokenBalances = tokens.reduce((acc, token, index) => ({ ...acc, [token]: tokenBalancesRaw[index] }), {})
  const poolTokenBalances = nonEchPools.reduce(
    (acc, pool) => ({
      ...acc,
      ...(tokenBalances[pool.stakingToken.address] && {
        [pool.sousId]: new BigNumber(tokenBalances[pool.stakingToken.address]).toJSON(),
      }),
    }),
    {},
  )

  // ECH pools
  const echBalance = await simpleRpcProvider.getBalance(account)
  const echBalances = echPools.reduce(
    (acc, pool) => ({ ...acc, [pool.sousId]: new BigNumber(echBalance.toString()).toJSON() }),
    {},
  )

  return { ...poolTokenBalances, ...echBalances }
}

export const fetchUserStakeBalances = async (account) => {
  const calls = nonMasterPools.map((p) => ({
    address: getAddress(p.contractAddress),
    name: 'userInfo',
    params: [account],
  }))
  const userInfo = await multicall(sousChefABI, calls)
  return nonMasterPools.reduce(
    (acc, pool, index) => ({
      ...acc,
      [pool.sousId]: new BigNumber(userInfo[index].amount._hex).toJSON(),
    }),
    {},
  )
}

export const fetchUserPendingRewards = async (account) => {
  const calls = nonMasterPools.map((p) => ({
    address: getAddress(p.contractAddress),
    name: 'pendingReward',
    params: [account],
  }))
  const res = await multicall(sousChefABI, calls)
  return nonMasterPools.reduce(
    (acc, pool, index) => ({
      ...acc,
      [pool.sousId]: new BigNumber(res[index]).toJSON(),
    }),
    {},
  )
}
