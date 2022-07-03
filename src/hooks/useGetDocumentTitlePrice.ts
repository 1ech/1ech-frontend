import { useEffect } from 'react'
import { useRechBusdPrice } from 'hooks/useBUSDPrice'

const useGetDocumentTitlePrice = () => {
  const rechPriceBusd = useRechBusdPrice()
  useEffect(() => {
    const rechPriceBusdString = rechPriceBusd ? rechPriceBusd.toFixed(2) : ''
    document.title = `1ECH - ${rechPriceBusdString}`
  }, [rechPriceBusd])
}
export default useGetDocumentTitlePrice
