import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

let email = "mcovarrubias@uc.cl";
let password = "18640729";
const infopay = {
  "type": "JOIN",
  "payload": {
    "authorization": `Basic ${btoa(`${email}:${password}`)}`
  }
}
const redIcon = new L.Icon({
    iconUrl:
      'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

const pinkIcon = new L.Icon({
    iconUrl:
      'https://www.clker.com/cliparts/d/3/R/P/q/e/hot-pink-home-icon-hi.png',
    iconSize: [25, 25],
    iconAnchor: [12, 25],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

const motoIcon = new L.Icon({
    iconUrl:
      'https://w7.pngwing.com/pngs/491/336/png-transparent-scooter-vespa-motorcycle-scooter-scooter-motorcycle-piaggio.png',
    iconSize: [25, 25],
    iconAnchor: [12, 25],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

function Mapa() {
    const [restaurants, setRestaurants] = useState([]);
    const [messages, setMessages] = useState([]);
    const [destinations, setDestinations] = useState([]);
    const [delivery, setDelivery] = useState([]);
    const [position, setPosition] = useState([]);
    const [users, setUsers] = useState([]);


  useEffect(() => {
    // Initialize the UI.
    
    const socket = new WebSocket("wss://tarea2-2023-1-dev-z2fqxmm2ja-uc.a.run.app/connect"); // replace with your server's URL
    socket.onopen = () => {
      console.log('WebSocket connection established.');
      socket.send(JSON.stringify(infopay));
      socket.addEventListener("message", ({ data })=> {
        const event = JSON.parse(data);
        console.log(event);
        
        if (event.type === "RESTAURANTS") {
          setRestaurants(event.payload);
          
        } else if (event.type === "DESTINATIONS") {
          setDestinations(event.payload);
        } else if (event.type === "DELIVERIES") {
          setDelivery(event.payload);
        } else if (event.type === "POSITION") {
          setPosition(event.payload);
        } else if (event.type === "USERS") {
            setUsers(event.payload);
            }
      });
    };

    socket.onmessage = (event) => {
        setMessages([...messages, event.data]);
      };
  
      socket.onclose = () => {
        console.log("WebSocket closed");
      };
  
      socket.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
  
      return () => {
        socket.close();
      };
  }, []); // empty dependency array ensures this effect only runs once

  return (
    <MapContainer center={[-33.35, -70.5]} zoom={13} scrollWheelZoom={true} style={{ height: '600px' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {restaurants.map((restaurant) => (
  // Check if latitude and longitude values are defined before creating marker
  (restaurant.position.lat && restaurant.position.long) &&
  <Marker key={restaurant.id} position={[restaurant.position.lat, restaurant.position.long]} icon={redIcon}>
    <Popup>
      <h3>{restaurant.name}</h3>
    </Popup>
  </Marker>
))}
{delivery.map((deli) => (
    users.map((user) => (
        // Check if latitude and longitude values are defined before creating marker
        position.position.lat && position.position.long && position.delivery_id === deli.id && user.id === deli.user_id &&
        <Marker key={deli.id} position={[position.position.lat, position.position.long]}  icon={motoIcon}>
          <Popup>
            <h3>{user.name}</h3>
          </Popup>
        </Marker>
      ))
))}


{destinations.map((destination) => (
  // Check if latitude and longitude values are defined before creating marker
  (destination.position.lat && destination.position.long) &&
  <Marker key={destination.id} position={[destination.position.lat, destination.position.long]}  icon={pinkIcon}>
    <Popup>
      <h3>{destination.name}</h3>
    </Popup>
  </Marker>
))}
    </MapContainer>


  );
}

export default Mapa;
