import "./App.css";
import React, { useState } from "react";
import Header from "./Header/Header";
import Map from "./Components/Map";
import LiveData from "./Components/LiveData";
import Newsletter from "./Components/Newsletter";
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import About from "../pages/About";
import Footer from "./Footer/Footer";


export default function App() {
  const [lati, setLat] = useState("27.85");
  const [long, setLon] = useState("81.949997");
  const [mapCenter, setMapCenter] = useState({ lat: 26.85, lng: 80.95});

  const handleSearch = (query) => {
    if (query.trim() === '') {
      // If search query is empty, set default center coordinates
      setMapCenter({ lat: 26.85, lng: 80.95 });
    } else {
      // Fetch coordinates based on the search query using OpenStreetMap Nominatim API
      fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(data => {
          if (data.length > 0) {
            // Extract coordinates from the response (using the first result)
            const { lat, lon } = data[0];
            setMapCenter({ lat: parseFloat(lat), lng: parseFloat(lon) })
            console.log(mapCenter)
            ; // Update map center with the fetched coordinates
          } else {
            console.error('No results found for the search query');
          }
        })
        .catch(error => console.error('Error fetching coordinates:', error));
    }
  };
  function coordinatesChangeHandler(coordinates) {
    const latitude = coordinates.latitude;
    const longitude = coordinates.longitude;
    setLat(latitude);
    setLon(longitude);
    console.log(coordinates);
  }
  return (
    // <div className="App">
      
    //   <Header onSearch={handleSearch} />
    //   <Map changeCoordi={coordinatesChangeHandler} center = {mapCenter} className="map" />
      
     

    //   <Newsletter />
    // </div>
    <BrowserRouter>
    <Header onSearch={handleSearch} />
      <Routes>
        <Route path = "/" element = {<Map changeCoordi={coordinatesChangeHandler} center = {mapCenter} className="map" />}/>
        
        
        <Route path = "/About" element = {<About />}/>
      </Routes>
      <Newsletter />
      <Footer/>
    </BrowserRouter>
  )
}
