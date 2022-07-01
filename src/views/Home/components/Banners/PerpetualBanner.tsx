import { ArrowForwardIcon, Button, Text, Link, useMatchBreakpointsContext } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'
import Image from 'next/image'
import { memo, useMemo } from 'react'
import styled from 'styled-components'
import { perpLangMap } from 'utils/getPerpetualLanguageCode'
import { perpetualImage, perpetualMobileImage } from './images'
import * as S from './Styled'

const RightWrapper = styled.div`
  position: absolute;
  right: 0;
  bottom: 0px;
  ${({ theme }) => theme.mediaQueries.sm} {
    bottom: 8.2px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    bottom: 9px;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    bottom: -2px;
  }
`
const Header = styled(S.StyledHeading)`
  font-size: 20px;
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 40px;
  }
`

const PerpetualBanner = () => {
  const {
    t,
    currentLanguage: { code },
  } = useTranslation()
  const { isDesktop } = useMatchBreakpointsContext()
  const perpetualUrl = useMemo(() => `https://perp.1ech.com/${perpLangMap(code)}/futures/BTCUSDT`, [code])

  return (
    <S.Wrapper>
      <S.Inner>
        <S.LeftWrapper>
          <S.StyledSubheading>{t('Perpetual Futures')}</S.StyledSubheading>
          <Header width={['160px', '160px', 'auto']}>{t('Up to 100× Leverage')}</Header>
          <Link href={perpetualUrl} external>
            <Button>
              <Text color="invertedContrast" bold fontSize="16px" mr="4px">
                {t('Trade Now')}
              </Text>
              <ArrowForwardIcon color="invertedContrast" />
            </Button>
          </Link>
        </S.LeftWrapper>
        <RightWrapper>
          {isDesktop ? (
            <Text color="invertedContrast" bold fontSize="16px" mr="4px">
              {}
            </Text>
          ) : (
            <Text color="invertedContrast" bold fontSize="16px" mr="4px">
              {}
            </Text>
          )}
        </RightWrapper>
      </S.Inner>
    </S.Wrapper>
  )
}

export default memo(PerpetualBanner)
