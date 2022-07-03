import { createSelector } from '@reduxjs/toolkit'
import { State, VaultKey } from '../types'
import { transformPool, transformLockedVault } from './helpers'
import { initialPoolVaultState } from './index'

const selectPoolsData = (state: State) => state.pools.data
const selectPoolData = (sousId) => (state: State) => state.pools.data.find((p) => p.sousId === sousId)
const selectUserDataLoaded = (state: State) => state.pools.userDataLoaded
const selectVault = (key: VaultKey) => (state: State) => key ? state.pools[key] : initialPoolVaultState

export const makePoolWithUserDataLoadingSelector = (sousId) =>
  createSelector([selectPoolData(sousId), selectUserDataLoaded], (pool, userDataLoaded) => {
    return { pool: transformPool(pool), userDataLoaded }
  })

export const poolsWithUserDataLoadingSelector = createSelector(
  [selectPoolsData, selectUserDataLoaded],
  (pools, userDataLoaded) => {
    return { pools: pools.map(transformPool), userDataLoaded }
  },
)

export const makeVaultPoolByKey = (key) => createSelector([selectVault(key)], (vault) => transformLockedVault(vault))

export const poolsWithVaultSelector = createSelector(
  [poolsWithUserDataLoadingSelector, makeVaultPoolByKey(VaultKey.RechVault)],
  (poolsWithUserDataLoading, deserializedRechVault) => {
    const { pools, userDataLoaded } = poolsWithUserDataLoading
    const cakePool = pools.find((pool) => !pool.isFinished && pool.sousId === 0)
    const withoutCakePool = pools.filter((pool) => pool.sousId !== 0)

    const rechAutoVault = {
      ...cakePool,
      ...deserializedRechVault,
      vaultKey: VaultKey.RechVault,
      userData: { ...cakePool.userData, ...deserializedRechVault.userData },
    }

    const rechAutoVaultWithApr = {
      ...rechAutoVault,
    }
    return { pools: [rechAutoVaultWithApr, ...withoutCakePool], userDataLoaded }
  },
)
