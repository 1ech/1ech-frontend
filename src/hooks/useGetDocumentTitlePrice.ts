import { useEffect } from 'react'
import { useRechUsdsPrice } from 'hooks/useUSDSPrice'

const useGetDocumentTitlePrice = () => {
  const rechPriceUsds = useRechUsdsPrice()
  useEffect(() => {
    const rechPriceUsdsString = rechPriceUsds ? rechPriceUsds.toFixed(2) : ''
    document.title = `1ECH - ${rechPriceUsdsString}`
  }, [rechPriceUsds])
}
export default useGetDocumentTitlePrice
