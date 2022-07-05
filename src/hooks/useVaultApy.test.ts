import { renderHook } from '@testing-library/react-hooks'
import { FixedNumber } from '@ethersproject/bignumber'
import { createSWRWrapper } from 'testUtils'
import * as PoolHooks from 'state/pools/hooks'
import BigNumber from 'bignumber.js'
import { useVaultApy } from './useVaultApy'

describe('useVaultApy', () => {
  const mockUseRechVault = jest.spyOn(PoolHooks, 'useRechVault')

  it.each([
    [
      {
        totalShares: new BigNumber('125327628384770000000000000'),
        pricePerFullShare: new BigNumber('1736860000000000000'),
        emission: FixedNumber.from('105000000000000000000000000'),
      },
      {
        flexibleApy: '47.271974190831774174',
        lockedApy: '1012.9708755178237323',
      },
    ],
  ])('should get correct vault apy', (cases, want) => {
    mockUseRechVault.mockReturnValue({
      totalShares: cases.totalShares,
      pricePerFullShare: cases.pricePerFullShare,
    })
    const { result } = renderHook(
      () => {
        const { flexibleApy, getLockedApy, lockedApy } = useVaultApy()
        return {
          flexibleApy,
          getLockedApy,
          lockedApy,
        }
      },
      {
        wrapper: createSWRWrapper({
          'masterChief-total-rech-pool-emission': cases.emission,
        }),
      },
    )

    expect(result.current.flexibleApy).toEqual(want.flexibleApy)
    expect(result.current.lockedApy).toEqual(want.lockedApy)
  })
})
