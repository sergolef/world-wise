import React from 'react'
import styles from './CityItem.module.css'
import { Link } from 'react-router-dom'
import { useCities } from '../context/CitiesContext'
import { useNavigate } from 'react-router-dom';

function formatDate(dateString) {
  
  if (!dateString) return 'Invalid date';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

export default function CityItem({city}) {
  const {cityName, emoji, date, id, position} = city;
  const {currentCity, deleteCity} = useCities();
  const navigate = useNavigate();

  async function handleDeleteCity(e) {
    e.stopPropagation();
    e.preventDefault();
    console.log(id);
    if (window.confirm(`Are you sure you want to delete ${cityName}?`)) {
      // Call the delete function from context or props
       await deleteCity(id);
       navigate('/app/cities'); 
    }
  }
  return (
      <Link className={`${styles.cityItem} ${id === currentCity.id ? styles['cityItem--active'] : ''  }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}>
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn} onClick={(e) => handleDeleteCity(e)}>&times;</button>
      </Link>
  )
}
