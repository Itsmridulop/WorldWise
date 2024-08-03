import { useSearchParams } from "react-router-dom";

export  function useUrlLocation() {
    const [searchPramas] = useSearchParams()
 
    const lat = searchPramas.get('lat')
    const lng = searchPramas.get('lng')

    return [lat, lng]
}
