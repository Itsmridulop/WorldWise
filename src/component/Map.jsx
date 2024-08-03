import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent } from 'react-leaflet';
import { useCity } from '../contexts/CityContext'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGeoLocation } from '../hooks/useGeoLocation';

import styles from './style/Map.module.css'
import Button from './Button';
import User from './User';

function Map() {
  const [ mapPosition, setMapPosition ] = useState([40, 0])
  const { cities, currentCity } = useCity()
  const { position, isLoading, getGeoLocation } = useGeoLocation()

  useEffect(() => {
    if (currentCity.position) setMapPosition([currentCity.position.lat, currentCity.position.lng])
  }, [currentCity])

  useEffect(() => {
    if(position && !isLoading) setMapPosition([position.lat, position.lng])
  }, [position])
  return (
    <div className={styles.mapContainer}>
      {!position && <Button type='position' onClick={getGeoLocation} >
        {isLoading ? 'Loading....' : 'Use your current position' }
      </Button>}
      <User/>
      <MapContainer center={mapPosition} zoom={6} scrollWheelZoom={true} className={styles.map}>
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png" />
        {cities.map(city => <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
          <Popup>this is popup</Popup>
        </Marker>)}
        <ChangeCenter position={mapPosition} />
        <DetectClick/>
      </MapContainer>
    </div>
  )
}

function ChangeCenter({ position }) {
  const map = useMap()
  map.setView(position, 6)
  return null
}

function DetectClick() {
  const navigate = useNavigate()
  useMapEvent({
    click: e => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
    }
  })
  return null
}

export default Map
