import React, { use } from 'react'
import styles from './Map.module.css'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MapContainer, TileLayer, useMap, Marker, Popup, useMapEvent } from 'react-leaflet'
import { useState } from 'react';
import { useCities } from '../context/CitiesContext';
import { useEffect } from 'react';
import useGeolocation from '../hooks/useGeolocation';
import Button from './Button';

export default function Map() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { cities } = useCities();
  const {isLoading: isLoadingPosition, position: geolocationPosition, getPosition } = useGeolocation();

  

  useEffect(() => {
    if (mapLat && mapLng) {
      setMapPosition([mapLat, mapLng]);
    }
  }
  , [mapLat, mapLng]);

  useEffect(() => {
    if (geolocationPosition) {
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
      setSearchParams({lat: geolocationPosition.lat, lng: geolocationPosition.lng});
    }
  }
  , [geolocationPosition]);


  useEffect(() => {
    if (geolocationPosition) {
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
      setSearchParams({lat: geolocationPosition.lat, lng: geolocationPosition.lng});
    }
  }


  return (
    <div className={styles.mapContainer} onClick={() => {
      
    }}>
      <Button type="position" onClick={getPosition} >{isLoadingPosition ? 'Loading...': 'Use your position'}</Button>
        <MapContainer className={styles.map} 
          center={mapPosition} zoom={6} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map ((city) => (
          <Marker key={city.id} position={[city.position.lat, city.position.lng]}>
            <Popup>
              <span>{city.emoji}</span>{city.cityName} <br /> {city.date}
            </Popup>
          </Marker>
        ))}
        <DetectClick />
        <ChangeCenter position={mapPosition}/>
      </MapContainer>
    </div>
  )
}


function ChangeCenter({position}){
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick(){
  const navigate = useNavigate();

 useMapEvent('click', (e) => {
   navigate("form?lat=" + e.latlng.lat + "&lng=" + e.latlng.lng);
 })
}