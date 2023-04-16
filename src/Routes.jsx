import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Mapa from './Mapa';

export default function RoutesFunction() {
    return (
    <div>
  
    <div>
        <Navbar />
    </div>
      <Routes>
        <Route path="/" element={<Mapa />} />
      </Routes>
    </div>
  
    );
  }

  