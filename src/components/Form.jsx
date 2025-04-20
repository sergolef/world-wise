// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import {  useState, useEffect } from "react";

import styles from "./Form.module.css";
import Batton from "./Button";
import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Message from "./Message";
import Spinner from "./Spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../context/CitiesContext";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const navigate = useNavigate();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingGeopos, setIsLoadingGeopos] = useState(false);

  const [lat,lng] = useUrlPosition();
  const [emoji, setEmoji] = useState("");
  const emojiFlag = convertToEmoji(country);
  const [errorMessage, setErrorMessage] = useState("");
  const {createCity, isLoading} = useCities();


  useEffect(() => {
    async function getCityData() {

      try {
        setIsLoadingGeopos(true);
        setErrorMessage("");
        const res = await fetch(
          `${BASE_URL}?latitude=${lat}&longitude=${lng}&localityLanguage=en`
        );
        const data = await res.json();
        console.log(data);
        setCityName(data.city || data.locality || data.principalSubdivision 
          || ""
        );
        setCountry(data.countryName || "");
        let countryCode = data.countryCode;
        if(!countryCode) {
          setErrorMessage("Country code not found");
          return;
        }
        setEmoji(convertToEmoji(data.countryCode));

      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoadingGeopos(false);
      }

  
    }
    getCityData();
  }, [lat, lng]);

  async function handleAddCity(e) {
    e.preventDefault();

    if(!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {
        lat,
        lng
      }
    };

    console.log(newCity);

    await createCity(newCity);
    navigate("/app/cities");
  }

  if(!lat || !lng) {
    return (
      <Message message="Please select a position on the map" />
    );
  }

  if(isLoadingGeopos) {
    return (
      <Spinner />
    );
  }

  if(errorMessage) {
    return (
      <Message message={errorMessage}/>
    );
  }
  
    return (
      <form className={`${styles.form} ${isLoading ? styles.loading : ""}`} 
        onSubmit={handleAddCity}>
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
          <DatePicker id="date" onChange={(date) => setDate(date)} 
            selected={date} 
            dateFormat="dd/MM/yyyy"/>
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
          <Batton type="primary" onClick={() => {}}>Add</Batton>
          <BackButton />
        </div>
      </form>
    );
  }
  
  

export default Form;
