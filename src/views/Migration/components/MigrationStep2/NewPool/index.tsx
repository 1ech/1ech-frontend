import React, { useEffect, useMemo } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useRechVault, usePoolsWithVault } from 'state/pools/hooks'
import { useFastRefreshEffect } from 'hooks/useRefreshEffect'
import { useAppDispatch } from 'state'
import {
  fetchCakePoolUserDataAsync,
  fetchRechVaultFees,
  fetchRechVaultPublicData,
  fetchRechVaultUserData,
  fetchCakePoolPublicDataAsync,
} from 'state/pools'
import PoolsTable from './PoolTable'

const NewPool: React.FC = () => {
  const { account } = useWeb3React()
  const { pools } = usePoolsWithVault()
  const rechVault = useRechVault()

  const stakedOnlyOpenPools = useMemo(
    () => pools.filter((pool) => pool.userData && pool.sousId === 0 && !pool.isFinished),
    [pools],
  )

  const userDataReady: boolean = !account || (!!account && !rechVault.userData?.isLoading)

  const dispatch = useAppDispatch()

  useFastRefreshEffect(() => {
    dispatch(fetchRechVaultPublicData())
    dispatch(fetchCakePoolPublicDataAsync())
    if (account) {
      dispatch(fetchRechVaultUserData({ account }))
      dispatch(fetchCakePoolUserDataAsync(account))
    }
  }, [account, dispatch])

  useEffect(() => {
    dispatch(fetchRechVaultFees())
  }, [dispatch])

  return <PoolsTable pools={stakedOnlyOpenPools} account={account} userDataReady={userDataReady} />
}

export default NewPool
