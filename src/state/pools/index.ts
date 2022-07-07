import { createAsyncThunk, createSlice, PayloadAction, isAnyOf } from '@reduxjs/toolkit'
import BigNumber from 'bignumber.js'
import poolsConfig from 'config/constants/pools'
import {
  PoolsState,
  SerializedPool,
  SerializedVaultFees,
  SerializedRechVault,
  SerializedLockedVaultUser,
} from 'state/types'
import { getPoolApr } from 'utils/apr'
import { BIG_ZERO } from 'utils/bigNumber'
import rechAbi from 'config/abi/rech.json'
import { getRechVaultAddress } from 'utils/addressHelpers'
import { multicallv2 } from 'utils/multicall'
import tokens from 'config/constants/tokens'
import { getBalanceNumber } from 'utils/formatBalance'
import { simpleRpcProvider } from 'utils/providers'
import priceHelperLpsConfig from 'config/constants/priceHelperLps'
import fetchFarms from '../farms/fetchFarms'
import getFarmsPrices from '../farms/getFarmsPrices'
import {
  fetchPoolsBlockLimits,
  fetchPoolsProfileRequirement,
  fetchPoolsStakingLimits,
  fetchPoolsTotalStaking,
} from './fetchPools'
import {
  fetchPoolsAllowance,
  fetchUserBalances,
  fetchUserPendingRewards,
  fetchUserStakeBalances,
} from './fetchPoolsUser'
import { fetchPublicVaultData, fetchVaultFees } from './fetchVaultPublic'
import fetchVaultUser from './fetchVaultUser'
import { getTokenPricesFromFarm } from './helpers'
import { resetUserState } from '../global/actions'

export const initialPoolVaultState = Object.freeze({
  totalShares: null,
  totalLockedAmount: null,
  pricePerFullShare: null,
  totalRechInVault: null,
  fees: {
    performanceFee: null,
    withdrawalFee: null,
    withdrawalFeePeriod: null,
  },
  userData: {
    isLoading: true,
    userShares: null,
    rechAtLastUserAction: null,
    lastDepositedTime: null,
    lastUserActionTime: null,
    credit: null,
    locked: null,
    lockStartTime: null,
    lockEndTime: null,
    userBoostedShare: null,
    lockedAmount: null,
    currentOverdueFee: null,
    currentPerformanceFee: null,
  },
  creditStartBlock: null,
})

const initialState: PoolsState = {
  data: [...poolsConfig],
  userDataLoaded: false,
  rechVault: initialPoolVaultState,
}

const rechVaultAddress = getRechVaultAddress()

export const fetchRechPoolPublicDataAsync = () => async (dispatch, getState) => {
  const farmsData = getState().farms.data
  const prices = getTokenPricesFromFarm(farmsData)

  const rechPool = poolsConfig.filter((p) => p.takedaId === 0)[0]

  const stakingTokenAddress = rechPool.stakingToken.address ? rechPool.stakingToken.address.toLowerCase() : null
  const stakingTokenPrice = stakingTokenAddress ? prices[stakingTokenAddress] : 0

  const earningTokenAddress = rechPool.earningToken.address ? rechPool.earningToken.address.toLowerCase() : null
  const earningTokenPrice = earningTokenAddress ? prices[earningTokenAddress] : 0

  dispatch(
    setPoolPublicData({
      takedaId: 0,
      data: {
        stakingTokenPrice,
        earningTokenPrice,
      },
    }),
  )
}

export const fetchRechPoolUserDataAsync = (account: string) => async (dispatch) => {
  const allowanceCall = {
    address: tokens.rech.address,
    name: 'allowance',
    params: [account, rechVaultAddress],
  }
  const balanceOfCall = {
    address: tokens.rech.address,
    name: 'balanceOf',
    params: [account],
  }
  const rechContractCalls = [allowanceCall, balanceOfCall]
  const [[allowance], [stakingTokenBalance]] = await multicallv2(rechAbi, rechContractCalls)

  dispatch(
    setPoolUserData({
      takedaId: 0,
      data: {
        allowance: new BigNumber(allowance.toString()).toJSON(),
        stakingTokenBalance: new BigNumber(stakingTokenBalance.toString()).toJSON(),
      },
    }),
  )
}

export const fetchPoolsPublicDataAsync = (currentBlockNumber: number) => async (dispatch, getState) => {
  try {
    const [blockLimits, totalStakings, profileRequirements, currentBlock] = await Promise.all([
      fetchPoolsBlockLimits(),
      fetchPoolsTotalStaking(),
      fetchPoolsProfileRequirement(),
      currentBlockNumber ? Promise.resolve(currentBlockNumber) : simpleRpcProvider.getBlockNumber(),
    ])

    const activePriceHelperLpsConfig = priceHelperLpsConfig.filter((priceHelperLpConfig) => {
      return (
        poolsConfig
          .filter((pool) => pool.earningToken.address.toLowerCase() === priceHelperLpConfig.token.address.toLowerCase())
          .filter((pool) => {
            const poolBlockLimit = blockLimits.find((blockLimit) => blockLimit.takedaId === pool.takedaId)
            if (poolBlockLimit) {
              return poolBlockLimit.endBlock > currentBlock
            }
            return false
          }).length > 0
      )
    })
    const poolsWithDifferentFarmToken =
      activePriceHelperLpsConfig.length > 0 ? await fetchFarms(priceHelperLpsConfig) : []
    const farmsData = getState().farms.data
    const echUsdsFarm =
      activePriceHelperLpsConfig.length > 0
        ? farmsData.find((farm) => farm.token.symbol === 'USDS' && farm.quoteToken.symbol === 'WECH')
        : null
    const farmsWithPricesOfDifferentTokenPools = echUsdsFarm
      ? getFarmsPrices([echUsdsFarm, ...poolsWithDifferentFarmToken])
      : []

    const prices = getTokenPricesFromFarm([...farmsData, ...farmsWithPricesOfDifferentTokenPools])

    const liveData = poolsConfig.map((pool) => {
      const blockLimit = blockLimits.find((entry) => entry.takedaId === pool.takedaId)
      const totalStaking = totalStakings.find((entry) => entry.takedaId === pool.takedaId)
      const isPoolEndBlockExceeded = currentBlock > 0 && blockLimit ? currentBlock > Number(blockLimit.endBlock) : false
      const isPoolFinished = pool.isFinished || isPoolEndBlockExceeded

      const stakingTokenAddress = pool.stakingToken.address ? pool.stakingToken.address.toLowerCase() : null
      const stakingTokenPrice = stakingTokenAddress ? prices[stakingTokenAddress] : 0

      const earningTokenAddress = pool.earningToken.address ? pool.earningToken.address.toLowerCase() : null
      const earningTokenPrice = earningTokenAddress ? prices[earningTokenAddress] : 0
      const apr = !isPoolFinished
        ? getPoolApr(
            stakingTokenPrice,
            earningTokenPrice,
            getBalanceNumber(new BigNumber(totalStaking.totalStaked), pool.stakingToken.decimals),
            parseFloat(pool.tokenPerBlock),
          )
        : 0

      const profileRequirement = profileRequirements[pool.takedaId] ? profileRequirements[pool.takedaId] : undefined

      return {
        ...blockLimit,
        ...totalStaking,
        profileRequirement,
        stakingTokenPrice,
        earningTokenPrice,
        apr,
        isFinished: isPoolFinished,
      }
    })

    dispatch(setPoolsPublicData(liveData))
  } catch (error) {
    console.error('[Pools Action] error when getting public data', error)
  }
}

export const fetchPoolsStakingLimitsAsync = () => async (dispatch, getState) => {
  const poolsWithStakingLimit = getState()
    .pools.data.filter(({ stakingLimit }) => stakingLimit !== null && stakingLimit !== undefined)
    .map((pool) => pool.takedaId)

  try {
    const stakingLimits = await fetchPoolsStakingLimits(poolsWithStakingLimit)

    const stakingLimitData = poolsConfig.map((pool) => {
      if (poolsWithStakingLimit.includes(pool.takedaId)) {
        return { takedaId: pool.takedaId }
      }
      const { stakingLimit, numberBlocksForUserLimit } = stakingLimits[pool.takedaId] || {
        stakingLimit: BIG_ZERO,
        numberBlocksForUserLimit: 0,
      }
      return {
        takedaId: pool.takedaId,
        stakingLimit: stakingLimit.toJSON(),
        numberBlocksForUserLimit,
      }
    })

    dispatch(setPoolsPublicData(stakingLimitData))
  } catch (error) {
    console.error('[Pools Action] error when getting staking limits', error)
  }
}

export const fetchPoolsUserDataAsync = createAsyncThunk<
  { takedaId: number; allowance: any; stakingTokenBalance: any; stakedBalance: any; pendingReward: any }[],
  string
>('pool/fetchPoolsUserData', async (account, { rejectWithValue }) => {
  try {
    const [allowances, stakingTokenBalances, stakedBalances, pendingRewards] = await Promise.all([
      fetchPoolsAllowance(account),
      fetchUserBalances(account),
      fetchUserStakeBalances(account),
      fetchUserPendingRewards(account),
    ])

    const userData = poolsConfig.map((pool) => ({
      takedaId: pool.takedaId,
      allowance: allowances[pool.takedaId],
      stakingTokenBalance: stakingTokenBalances[pool.takedaId],
      stakedBalance: stakedBalances[pool.takedaId],
      pendingReward: pendingRewards[pool.takedaId],
    }))
    return userData
  } catch (e) {
    return rejectWithValue(e)
  }
})

export const updateUserAllowance = createAsyncThunk<
  { takedaId: number; field: string; value: any },
  { takedaId: number; account: string }
>('pool/updateUserAllowance', async ({ takedaId, account }) => {
  const allowances = await fetchPoolsAllowance(account)
  return { takedaId, field: 'allowance', value: allowances[takedaId] }
})

export const updateUserBalance = createAsyncThunk<
  { takedaId: number; field: string; value: any },
  { takedaId: number; account: string }
>('pool/updateUserBalance', async ({ takedaId, account }) => {
  const tokenBalances = await fetchUserBalances(account)
  return { takedaId, field: 'stakingTokenBalance', value: tokenBalances[takedaId] }
})

export const updateUserStakedBalance = createAsyncThunk<
  { takedaId: number; field: string; value: any },
  { takedaId: number; account: string }
>('pool/updateUserStakedBalance', async ({ takedaId, account }) => {
  const stakedBalances = await fetchUserStakeBalances(account)
  return { takedaId, field: 'stakedBalance', value: stakedBalances[takedaId] }
})

export const updateUserPendingReward = createAsyncThunk<
  { takedaId: number; field: string; value: any },
  { takedaId: number; account: string }
>('pool/updateUserPendingReward', async ({ takedaId, account }) => {
  const pendingRewards = await fetchUserPendingRewards(account)
  return { takedaId, field: 'pendingReward', value: pendingRewards[takedaId] }
})

export const fetchRechVaultPublicData = createAsyncThunk<SerializedRechVault>('rechVault/fetchPublicData', async () => {
  const publicVaultInfo = await fetchPublicVaultData()
  return publicVaultInfo
})

export const fetchRechVaultFees = createAsyncThunk<SerializedVaultFees>('rechVault/fetchFees', async () => {
  const vaultFees = await fetchVaultFees()
  return vaultFees
})

export const fetchRechVaultUserData = createAsyncThunk<SerializedLockedVaultUser, { account: string }>(
  'rechVault/fetchUser',
  async ({ account }) => {
    const userData = await fetchVaultUser(account)
    return userData
  },
)

export const PoolsSlice = createSlice({
  name: 'Pools',
  initialState,
  reducers: {
    setPoolPublicData: (state, action) => {
      const { takedaId } = action.payload
      const poolIndex = state.data.findIndex((pool) => pool.takedaId === takedaId)
      state.data[poolIndex] = {
        ...state.data[poolIndex],
        ...action.payload.data,
      }
    },
    setPoolUserData: (state, action) => {
      const { takedaId } = action.payload
      state.data = state.data.map((pool) => {
        if (pool.takedaId === takedaId) {
          return { ...pool, userDataLoaded: true, userData: action.payload.data }
        }
        return pool
      })
    },
    setPoolsPublicData: (state, action) => {
      const livePoolsData: SerializedPool[] = action.payload
      state.data = state.data.map((pool) => {
        const livePoolData = livePoolsData.find((entry) => entry.takedaId === pool.takedaId)
        return { ...pool, ...livePoolData }
      })
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetUserState, (state) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      state.data = state.data.map(({ userData, ...pool }) => {
        return { ...pool }
      })
      state.userDataLoaded = false
      state.rechVault = { ...state.rechVault, userData: initialPoolVaultState.userData }
    })
    builder.addCase(
      fetchPoolsUserDataAsync.fulfilled,
      (
        state,
        action: PayloadAction<
          { takedaId: number; allowance: any; stakingTokenBalance: any; stakedBalance: any; pendingReward: any }[]
        >,
      ) => {
        const userData = action.payload
        state.data = state.data.map((pool) => {
          const userPoolData = userData.find((entry) => entry.takedaId === pool.takedaId)
          return { ...pool, userDataLoaded: true, userData: userPoolData }
        })
        state.userDataLoaded = true
      },
    )
    builder.addCase(fetchPoolsUserDataAsync.rejected, (state, action) => {
      console.error('[Pools Action] Error fetching pool user data', action.payload)
    })
    // Vault public data that updates frequently
    builder.addCase(fetchRechVaultPublicData.fulfilled, (state, action: PayloadAction<SerializedRechVault>) => {
      state.rechVault = { ...state.rechVault, ...action.payload }
    })
    // Vault fees
    builder.addCase(fetchRechVaultFees.fulfilled, (state, action: PayloadAction<SerializedVaultFees>) => {
      const fees = action.payload
      state.rechVault = { ...state.rechVault, fees }
    })
    // Vault user data
    builder.addCase(fetchRechVaultUserData.fulfilled, (state, action: PayloadAction<SerializedLockedVaultUser>) => {
      const userData = action.payload
      userData.isLoading = false
      state.rechVault = { ...state.rechVault, userData }
    })
    builder.addMatcher(
      isAnyOf(
        updateUserAllowance.fulfilled,
        updateUserBalance.fulfilled,
        updateUserStakedBalance.fulfilled,
        updateUserPendingReward.fulfilled,
      ),
      (state, action: PayloadAction<{ takedaId: number; field: string; value: any }>) => {
        const { field, value, takedaId } = action.payload
        const index = state.data.findIndex((p) => p.takedaId === takedaId)

        if (index >= 0) {
          state.data[index] = { ...state.data[index], userData: { ...state.data[index].userData, [field]: value } }
        }
      },
    )
  },
})

// Actions
export const { setPoolsPublicData, setPoolPublicData, setPoolUserData } = PoolsSlice.actions

export default PoolsSlice.reducer
