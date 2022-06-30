import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { ArrowForwardIcon, Button, Flex, Heading, Skeleton, Text } from '@pancakeswap/uikit'
import { NextLinkFromReactRouter } from 'components/NextLink'
import { useTranslation } from 'contexts/Localization'
import { formatLocalisedCompactNumber } from 'utils/formatBalance'
import useIntersectionObserver from 'hooks/useIntersectionObserver'
import { getTotalWon } from 'state/predictions/helpers'
import { useECHBusdPrice } from 'hooks/useBUSDPrice'
import { multiplyPriceByAmount } from 'utils/prices'
import useSWR from 'swr'
import { SLOW_INTERVAL } from 'config/constants'

const StyledLink = styled(NextLinkFromReactRouter)`
  width: 100%;
`

const PredictionCardHeader: React.FC<{ preText: string; echWon: number }> = ({ preText, echWon }) => {
  const echBusdPrice = useECHBusdPrice()
  const echWonInUsd = multiplyPriceByAmount(echBusdPrice, echWon)

  const localisedEchUsdString = formatLocalisedCompactNumber(echWonInUsd)

  return (
    <Heading color="#280D5F" my="8px" scale="xl" bold>
      {preText}
      {localisedEchUsdString}
    </Heading>
  )
}

const PredictionCardContent = () => {
  const { t } = useTranslation()
  const { observerRef, isIntersecting } = useIntersectionObserver()
  const [loadData, setLoadData] = useState(false)
  const { data: echWon = 0 } = useSWR(loadData ? ['prediction', 'echWon'] : null, getTotalWon, {
    refreshInterval: SLOW_INTERVAL,
  })

  const echWonText = t('$%echWonInUsd% in ECH won so far', { echWonInUsd: '#placeholder#' })
  const [pretext, wonSoFar] = echWonText.split('#placeholder#')

  useEffect(() => {
    if (isIntersecting) {
      setLoadData(true)
    }
  }, [isIntersecting])

  return (
    <>
      <Flex flexDirection="column" mt="48px">
        <Text color="#280D5F" bold fontSize="16px">
          {t('Prediction')}
        </Text>
        {echWon ? (
          <PredictionCardHeader preText={pretext} echWon={echWon} />
        ) : (
          <>
            <Skeleton width={230} height={40} my="8px" />
            <div ref={observerRef} />
          </>
        )}
        <Text color="#280D5F" mb="24px" bold fontSize="16px">
          {wonSoFar}
        </Text>
        <Text color="#280D5F" mb="40px">
          {t('Will ECH price rise or fall? guess correctly to win!')}
        </Text>
      </Flex>
      <Flex alignItems="center" justifyContent="center">
        <StyledLink to="/prediction" id="homepage-prediction-cta">
          <Button width="100%">
            <Text bold color="invertedContrast">
              {t('Play')}
            </Text>
            <ArrowForwardIcon ml="4px" color="invertedContrast" />
          </Button>
        </StyledLink>
      </Flex>
    </>
  )
}

export default PredictionCardContent
