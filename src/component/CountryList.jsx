import CountryItem from './CountryIem'
import Spinner from './Spinner'
import Message from './Message'
import styles from './style/CountryList.module.css'
import { useCity } from '../contexts/CityContext'

function CountryList() {
    const {cities, isLoading} = useCity()
    if (isLoading) return <Spinner />
    if (!cities.length) return <Message message='Add your first city by clicking on the map' />
    const countries = cities.reduce((arr, cur) => {
        if(!arr.map(ele => ele.country).includes(cur.country)) return [...arr, {country: cur.country, emoji: cur.emoji, id: cur.id}]
        else return [...arr]
    },[])
    return (
        <ul className={styles.countryList}>
            {countries.map(country => <CountryItem  key={country.id} country={country}/>)}
        </ul>
    )
}

export default CountryList
