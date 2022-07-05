import masterchiefABI from 'config/abi/masterchief.json'
import chunk from 'lodash/chunk'
import { multicallv2 } from 'utils/multicall'
import { SerializedFarmConfig } from '../../config/constants/types'
import { SerializedFarm } from '../types'
import { getMasterChiefAddress } from '../../utils/addressHelpers'
import { getMasterchiefContract } from '../../utils/contractHelpers'

const masterChiefAddress = getMasterChiefAddress()
const masterChiefContract = getMasterchiefContract()

export const fetchMasterChiefFarmPoolLength = async () => {
  const poolLength = await masterChiefContract.poolLength()
  return poolLength
}

const masterChiefFarmCalls = (farm: SerializedFarm) => {
  const { pid } = farm
  return pid || pid === 0
    ? [
        {
          address: masterChiefAddress,
          name: 'poolInfo',
          params: [pid],
        },
        {
          address: masterChiefAddress,
          name: 'totalRegularAllocPoint',
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
  const masterChiefMultiCallResult = await multicallv2(masterchiefABI, masterChiefAggregatedCalls)
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
