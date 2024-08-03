// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
import "react-datepicker/dist/react-datepicker.css";

import { useEffect, useState } from "react";
import { useUrlLocation } from '../hooks/useUrlLocation.js'
import { useNavigate } from "react-router-dom";

import styles from "./style/Form.module.css";
import Button from "./Button";
import SpinnerFullPage from './SpinnerFullPage.jsx'
import Message from './Message'
import DatePicker from "react-datepicker";
import { useCity } from "../contexts/CityContext.jsx";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const navigate = useNavigate()
  const [latitude, longitude] = useUrlLocation()
  const { createCity, isLoading } = useCity()

  const [cityName, setCityName] = useState("");
  const [isLocationLoading, setIsLocationLoading] = useState(false)
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      if (!latitude && !longitude) return
      try {
        setIsLocationLoading(true)
        const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`)
        const data = await res.json()
        setCityName(data.city || "")
        setCountry(data.countryName || "")
        setEmoji(convertToEmoji(data.countryCode))
      } catch (error) {
        throw new Error('Unable to fetch data....')
      } finally {
        setIsLocationLoading(false)
      }
    }
    fetchData()
  }, [latitude, longitude])

  const handleSubmit = async e => {
    e.preventDefault()
    if(!cityName || !date) return
    await createCity({
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {
        lat: parseFloat(latitude),
        lng: parseFloat(longitude)
      }
    })
    navigate('/app')
  }

  if (isLocationLoading) return <SpinnerFullPage />
  if(!cityName || !date) return <Message message="Please select a valid city"/>
  if (!longitude && !latitude) return <Message message="Start by clicking on some where in the map." />

  return (
    <form className={`${styles.form} ${isLoading ? styles.loading : '' }`} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker id="date" selected={date} onChange={date => setDate(date)} />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type='primary'>Add</Button>
        <Button type='back' onClick={e => {
          e.preventDefault()
          navigate('/app/cities')
        }}>&larr; Back</Button>
      </div>
    </form>
  );
}

export default Form;