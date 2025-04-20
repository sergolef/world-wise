import React from 'react'
import styles from './CityList.module.css'
import CityItem from './CityItem'
import Spinner from './Spinner'
import { useCities } from '../context/CitiesContext'
import Message from './Message'

export default function CityList() {
    const {cities, isLoading} = useCities();
    if (isLoading) {
        return <Spinner /> ;
    }
    if (cities.length === 0) {
        return <Message message="Add your first city to the map" />;
    }

  return (
    <ul className={styles.cityList}>
        {cities.map((city) => (
          <CityItem key={city.id} city={city} />))}
    </ul>
  )
}
