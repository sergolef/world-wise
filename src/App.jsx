import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from './pages/AppLayout';
import Login from './pages/Login';
import CityList from './components/CityList';
import CountryList from './components/CountryList';
import City from './components/City';

//tset commit
const BASE_URL = 'http://localhost:8000';

export default function App() {
  const [cities, setCities] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);


  React.useEffect(() => {
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


  return (
   
    
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Homepage/>} />
        <Route path="product" element={<Product />}/>
        <Route path="pricing" element={<Pricing/>} />
        <Route path="/login" element={<Login />} />
        <Route path="app" element={<AppLayout/>}>
          <Route index element={<CityList cities={cities} isLoading={isLoading}/>} />
          <Route path="cities" element={<CityList cities={cities} isLoading={isLoading}/>} />
          <Route path="cities/:id" element={<City />} />
          {/* <Route path="countries/:countryId" element={<p>Country Details</p>} /> */}
          <Route path="countries" element={<CountryList cities={cities} />} />
          <Route path="form" element={<p>Form</p>} />
        </Route>
        <Route path="*" element={<PageNotFound/>} />
      </Routes>
    </BrowserRouter>
    
  )
}
