import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styled from 'styled-components';

const boatIcon = new L.Icon({
    iconUrl: '/boat-icon.png',
    iconSize: [15, 15],  // Reduced icon size
    iconAnchor: [7, 7],
    popupAnchor: [0, -10],
});

const otherBoatIcon = new L.Icon({
    iconUrl: '/other-boat-icon.png',  // New icon for other boats
    iconSize: [25, 25],
    iconAnchor: [7, 7],
    popupAnchor: [0, -10],
});

const LegendContainer = styled.div`
    background: rgba(255, 255, 255, 0.8);
    padding: 10px;
    border-radius: 5px;
    position: absolute;
    bottom: 20px;
    left: 20px;
    z-index: 1000;
`;

const LegendItem = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 5px;

    img {
        margin-right: 5px;
    }
`;

const BoatMap = ({ location, otherLocations }) => {
    const { latitude, longitude } = location;

    return (
        <div style={{ position: 'relative' }}>
            <MapContainer center={[latitude, longitude]} zoom={10} style={{ height: '400px', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[latitude, longitude]} icon={boatIcon}>
                    <Popup>
                        Boat Location: {latitude}, {longitude}
                    </Popup>
                </Marker>
                {otherLocations.map((loc, index) => (
                    <Marker key={index} position={[loc.latitude, loc.longitude]} icon={otherBoatIcon}>
                        <Popup>
                            Other Boat Location: {loc.latitude}, {loc.longitude}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
            <LegendContainer>
                <LegendItem>
                    <img src="/boat-icon.png" alt="Boat" width={15} height={15} />
                    <span>Main Boat</span>
                </LegendItem>
                <LegendItem>
                    <img src="/other-boat-icon.png" alt="Other Boat" width={25} height={25} />
                    <span>Other Boats</span>
                </LegendItem>
            </LegendContainer>
        </div>
    );
};

export default BoatMap;
