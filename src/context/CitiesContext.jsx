import { createContext, useState, useEffect, useContext, useReducer} from 'react';

const BASE_URL = 'http://localhost:8000';

const CitiesContext = createContext();

const initialState = {
    cities: [],
    isLoading: false,
    currentCity: {},
};


function reducer(state, action) {
    switch (action.type) {
        case 'cities/loading':
            return {
                ...state,
                isLoading: true,
            };
            
        case 'cities/loaded':
            return {
                ...state,
                isLoading: false,
                cities: action.payload,
            };
        case 'city/loaded':
            return {
                ...state,
                isLoading: false,
                currentCity: action.payload,
            };
        case 'cities/created':
            return {
                ...state,
                isLoading: false,
                cities: [...state.cities, action.payload],
                currentCity: action.payload,
            };
        case 'cities/deleted':
            return {
                ...state,
                isLoading: false,
                cities: state.cities.filter((city) => city.id !== action.payload),
                currentCity: {},
            };
        case 'rejected':
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        default:
            throw new Error(`Unknown action type: ${action.type}`);
    }
}

function CitiesProvider({ children }) {
const [{cities, isLoading, currentCity}, dispatch] = useReducer(reducer, initialState);

    // const [cities, setCities] = useState([]);
    // const [isLoading, setIsLoading] = useState(true);
    // const [currentCity, setCurrentCity] = useState({});
  
    useEffect(() => {
      const fetchCities = async () => {
        dispatch({ type: 'cities/loading' });
        try {
          const response = await fetch(`${BASE_URL}/cities`);
          const data = await response.json();
          
          dispatch({ type: 'cities/loaded', payload: data });
          console.log(data);
        } catch (error) {
            dispatch({ type: 'rejected', payload: error });
          console.error('Error fetching cities:', error);
        } 
      };
  
      fetchCities();
    }, []);

    async function getCity(id){

        if(Number(id)===currentCity) return;

        
        dispatch({ type: 'cities/loading' });
        try {
            const response = await fetch(`${BASE_URL}/cities/${id}`);
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            const data = await response.json();
            dispatch({ type: 'city/loaded', payload: data });
            console.log(data);
        } catch (error) {
            console.error('Error fetching cities:', error);
            dispatch({ type: 'rejected', payload: error });
        } 
    }

    async function deleteCity(id) {
        dispatch({ type: 'cities/loading' });
        try {
            const response = await fetch(`${BASE_URL}/cities/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            dispatch({ type: 'cities/deleted', payload: id });
        } catch (error) {
            dispatch({ type: 'rejected', payload: error });
            console.error('Error deleting city:', error);
        }
    }


    async function createCity(newCity) {
        dispatch({ type: 'cities/loading' });
        try {
        
            const response = await fetch(`${BASE_URL}/cities`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCity),
            });
            // if (!response.ok) {
            //     throw new Error('Network response was not ok');
            // }
            const data = await response.json();
            //setCities((prevCities) => [...prevCities, data]);
            dispatch({ type: 'cities/created', payload: data });
        } catch (error) {
            dispatch({ type: 'rejected', payload: error });
            console.error('Error adding city:', error);
        } 
    }

    return <CitiesContext.Provider value={{ 
        cities, 
        isLoading, 
        currentCity, 
        getCity,
        createCity,
        deleteCity 
    }}>{children}</CitiesContext.Provider>;
}

function useCities() {
    const context = useContext(CitiesContext);
    if (!context) {
        throw new Error('useCities must be used within a CitiesProvider');
    }
    return context;
}

export { CitiesProvider, useCities };