import { createContext, useState, useEffect, useContext } from 'react';

const BASE_URL = 'http://localhost:8000';

const CitiesContext = createContext();

function CitiesProvider({ children }) {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentCity, setCurrentCity] = useState({});
  
    useEffect(() => {
      const fetchCities = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(`${BASE_URL}/cities`);
          const data = await response.json();
          setCities(data);
          console.log(data);
        } catch (error) {
          console.error('Error fetching cities:', error);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchCities();
    }, []);

    async function getCity(id){
        try {
            setIsLoading(true);
            const response = await fetch(`${BASE_URL}/cities/${id}`);
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setCurrentCity(data);
            console.log(data);
        } catch (error) {
            console.error('Error fetching cities:', error);
        } finally {
            setIsLoading(false);
        }
    }

    return <CitiesContext.Provider value={{ cities, isLoading, currentCity, getCity }}>{children}</CitiesContext.Provider>;
}

function useCities() {
    const context = useContext(CitiesContext);
    if (!context) {
        throw new Error('useCities must be used within a CitiesProvider');
    }
    return context;
}

export { CitiesProvider, useCities };