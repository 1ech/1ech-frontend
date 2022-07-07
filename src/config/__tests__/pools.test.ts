import { formatUnits } from '@ethersproject/units'
import pools from 'config/constants/pools'
import { getGentakedaContract, getGentakedaV2Contract } from 'utils/contractHelpers'

// Pool 0 is special (rech pool)
// Pool 78 is a broken pool, not used, and break the tests
const idsToRemove = [0, 78]
// Test only against the last 10 pools, for performance concern
const poolsToTest = pools.filter((pool) => !idsToRemove.includes(pool.takedaId)).slice(0, 10)

describe('Config pools', () => {
  it.each(pools.map((pool) => pool.takedaId))('Pool #%d has an unique takedaId', (takedaId) => {
    const duplicates = pools.filter((p) => takedaId === p.takedaId)
    expect(duplicates).toHaveLength(1)
  })
  it.each(pools.map((pool) => [pool.takedaId, pool.contractAddress]))(
    'Pool #%d has an unique contract address',
    (takedaId, contractAddress) => {
      const duplicates = pools.filter((p) => contractAddress[56] === p.contractAddress[56])
      expect(duplicates).toHaveLength(1)
    },
  )
  it.each(poolsToTest.filter((pool) => pool.earningToken.symbol !== 'ECH'))(
    'Pool %p has the correct earning token',
    async (pool) => {
      const contract = getGentakedaContract(pool.takedaId)
      const rewardTokenAddress = await contract.rewardToken()
      expect(rewardTokenAddress.toLowerCase()).toBe(pool.earningToken.address.toLowerCase())
    },
  )
  it.each(poolsToTest.filter((pool) => pool.stakingToken.symbol !== 'ECH'))(
    'Pool %p has the correct staking token',
    async (pool) => {
      let stakingTokenAddress = null
      try {
        const contract = getGentakedaV2Contract(pool.takedaId)
        stakingTokenAddress = await contract.stakedToken()
      } catch (error) {
        const contract = getGentakedaContract(pool.takedaId)
        stakingTokenAddress = await contract.tech()
      }

      expect(stakingTokenAddress.toLowerCase()).toBe(pool.stakingToken.address.toLowerCase())
    },
  )

  it.each(poolsToTest.filter((pool) => pool.stakingToken.symbol !== 'ECH'))(
    'Pool %p has the correct tokenPerBlock',
    async (pool) => {
      const contract = getGentakedaContract(pool.takedaId)
      const rewardPerBlock = await contract.rewardPerBlock()

      expect(String(parseFloat(formatUnits(rewardPerBlock, pool.earningToken.decimals)))).toBe(pool.tokenPerBlock)
    },
  )
})
