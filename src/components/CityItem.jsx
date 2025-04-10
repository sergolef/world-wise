import React from 'react'
import styles from './CityItem.module.css'
import { Link } from 'react-router-dom'
import { useCities } from '../context/CitiesContext'

function formatDate(dateString) {
  
  if (!dateString) return 'Invalid date';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}
export default function CityItem({city}) {
  const {cityName, emoji, date, id, position} = city;
  const {currentCity} = useCities();
  return (
      <Link className={`${styles.cityItem} ${id === currentCity.id ? styles['cityItem--active'] : ''  }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}>
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
  )
}
