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
import { CitiesProvider } from './context/CitiesContext';


export default function App() {
  return (
    <CitiesProvider>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<Homepage/>} />
          <Route path="product" element={<Product />}/>
          <Route path="pricing" element={<Pricing/>} />
          <Route path="/login" element={<Login />} />
          <Route path="app" element={<AppLayout/>}>
            <Route index element={<CityList/>} />
            <Route path="cities" element={<CityList />} />
            <Route path="cities/:id" element={<City />} />
            {/* <Route path="countries/:countryId" element={<p>Country Details</p>} /> */}
            <Route path="countries" element={<CountryList/>} />
            <Route path="form" element={<p>Form</p>} />
          </Route>
          <Route path="*" element={<PageNotFound/>} />
        </Routes>
      </BrowserRouter>
    </CitiesProvider>
  )
}
