import masterchiefABIV1 from 'config/abi/masterchiefV1.json'
import chunk from 'lodash/chunk'
import { multicallv2 } from 'utils/multicall'
import { SerializedFarmConfig } from '../../config/constants/types'
import { SerializedFarm } from '../types'
import { getMasterChiefV1Address } from '../../utils/addressHelpers'
import { getMasterchiefV1Contract } from '../../utils/contractHelpers'

const masterChiefAddress = getMasterChiefV1Address()
const masterChiefContract = getMasterchiefV1Contract()

export const fetchMasterChiefFarmPoolLength = async () => {
  const poolLength = await masterChiefContract.poolLength()
  return poolLength
}

const masterChiefFarmCalls = (farm: SerializedFarm) => {
  const { v1pid } = farm
  return v1pid || v1pid === 0
    ? [
        {
          address: masterChiefAddress,
          name: 'poolInfo',
          params: [v1pid],
        },
        {
          address: masterChiefAddress,
          name: 'totalAllocPoint',
        },
      ]
    : [null, null]
}

export const fetchMasterChiefData = async (farms: SerializedFarmConfig[]): Promise<any[]> => {
  const masterChiefCalls = farms.map((farm) => masterChiefFarmCalls(farm))
  const chunkSize = masterChiefCalls.flat().length / farms.length
  const masterChiefAggregatedCalls = masterChiefCalls
    .filter((masterChiefCall) => masterChiefCall[0] !== null && masterChiefCall[1] !== null)
    .flat()
  const masterChiefMultiCallResult = await multicallv2(masterchiefABIV1, masterChiefAggregatedCalls)
  const masterChiefChunkedResultRaw = chunk(masterChiefMultiCallResult, chunkSize)
  let masterChiefChunkedResultCounter = 0
  return masterChiefCalls.map((masterChiefCall) => {
    if (masterChiefCall[0] === null && masterChiefCall[1] === null) {
      return [null, null]
    }
    const data = masterChiefChunkedResultRaw[masterChiefChunkedResultCounter]
    masterChiefChunkedResultCounter++
    return data
  })
}
