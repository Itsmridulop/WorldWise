import { useCity } from '../contexts/CityContext'

import styles from './style/CityList.module.css'
import CityItem from './CityItem'
import Spinner from './Spinner'
import Message from './Message'

function CityList() {
    const {cities, isLoading} = useCity()
    if (isLoading) return <Spinner />
    if(!cities.length) return <Message message='Add your first city by clicking on the map'/>
    return (
        <ul className={styles.cityList}>
            {cities.map(city => <CityItem key={city.id} city={city} />)}
        </ul>
    )
}

export default CityList
