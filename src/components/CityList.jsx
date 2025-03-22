import React from 'react'
import styles from './CityList.module.css'
import CityItem from './CityItem'
import Spinner from './Spinner'

export default function CityList({ cities, isLoading }) {
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
