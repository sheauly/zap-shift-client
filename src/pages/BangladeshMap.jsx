import React from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const position = [23.6850, 90.3563]

const customIcom = new L.Icon({
    iconUrl: 'http://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
})
const BangladeshMap = () => {

    return (
        <div className="h-[500px] rounded-lg overflow-hidden shadow-lg">
            <MapContainer
                center={position} 
                zoom={7}
                scrollWheelZoom={false}
               className='h-full w-full z-0'
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[23.8103, 90.4125]} icon={customIcom}> 
                    <Popup>we are available across Bangladesh</Popup>
                </Marker>
            </MapContainer>
        </div>
   
    );
};

export default BangladeshMap;