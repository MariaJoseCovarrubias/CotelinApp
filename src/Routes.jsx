import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Mapa from './Mapa';
import Chat from './Chat';

export default function RoutesFunction() {
    return (
    <div>
  
    <div>
        <Navbar />
    </div>
      <Routes>
        <Route path="/" element={<Mapa />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </div>
  
    );
  }

  