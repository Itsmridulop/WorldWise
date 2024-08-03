import { Link } from 'react-router-dom';
import { useCity } from '../contexts/CityContext';
import styles from './style/CityItem.module.css'

const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(new Date(date));

function CityItem({ city }) {
    const {currentCity, deleteCity} = useCity()

    const handleClick = e => {
        e.preventDefault()
        deleteCity(city.id)
    }

    return (
        <li>
            <Link className={`${styles.cityItem} ${currentCity && currentCity.id === city.id ? styles['cityItem--active'] : '' }`} to={`${city.id}`}>
                <span className={styles.emoji}>{city.emoji}</span>
                <h3 className={styles.name}>{city.cityName}</h3>
                <time className={styles.date}>({formatDate(city.date)})</time>
                <button className={styles.deleteBtn} onClick={handleClick}>&times;</button>
            </Link>
        </li>
    )
}

export default CityItem
