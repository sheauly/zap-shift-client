import React, { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const position = [23.6850, 90.3563]

const customIcom = new L.Icon({
    iconUrl: 'http://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
})

// Helper compnent to move map
function FlyToDistrict({ coords }) {
    const map = useMap();
    if (coords) {
        map.flyTo(coords, 14, { duration: 1.5 });
    }
}
const BangladeshMap = ({ warehousesCenter }) => {

    const [searchText, setSearchText] = useState("");
    const [activeCoords, setActiveCoords] = useState(null);
    const [activeDistrict, setActiveDistrict] = useState(null);

    const handleSearch = (e) => {
        e.preventDefault();
        const district = warehousesCenter.find(d =>
            d.district.toLowerCase().includes(searchText.toLowerCase())
        )
        if (district) {
            setActiveCoords([district.latitude, district.longitude]);
            setActiveDistrict(district.district)
            
        }
    }
    return (
        <div className="h-[800px] rounded-lg overflow-hidden shadow-lg relative">
           
            {/* Search Box + Button */}
            <form onSubmit={handleSearch} className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[1000] w-full max-w-md bg-amber-100 px-4 flex gap-2">
                <input
                    type="text"
                    placeholder="Search District..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="border px-3 py-2 rounded w-64"
                   
                />
                <button
                    type='submit'
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >Google</button>
                </form>
            {/* mapContainer */}
            <MapContainer
                center={position} 
                zoom={8}
                scrollWheelZoom={false}
               className='h-full w-full z-0'
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <FlyToDistrict coords={activeCoords}/>
                {
                    warehousesCenter.map((center, index) => <Marker
                        key={index}
                        position={[center.latitude, center.longitude]}
                        icon={customIcom}>
                        <Popup autoOpen={center.district === activeDistrict}>
                            <strong>{center.district}</strong><br />
                            {center.covered_area.join(', ')}
                        </Popup>
                    </Marker>)
           }
            </MapContainer>
        </div>
        
   
    );
};

export default BangladeshMap;