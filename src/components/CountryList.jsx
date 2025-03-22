import React from 'react'
import styles from './CountryList.module.css'
import CountryItem from './CountryItem'
import Spinner from './Spinner'
import Message from './Message'

export default function CountryList({ cities, isLoading }) {
    if (isLoading) {
        return <Spinner /> ;
    }
    if (cities.length === 0) {
        return <Message message="Add your first country to the map" />;
    }

    const countries = cities.reduce((arr, city) => {
      if (!arr.map((el) => el.country).includes(city.country)) {
        return [...arr, { country: city.country, emoji: city.emoji }];
      }else {
        return arr;
      }
    }, []);

  return (
    <ul className={styles.countryList}>
        {countries.map((country) => (
          <CountryItem key={country.country} country={country} />))}
    </ul>
  )
}
