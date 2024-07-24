import React, { useState } from 'react';
import BoatMap from './Components/BoatMap';
import PLBDashboard from './Components/PLBDashboard';
import { Container, Typography, Box } from '@mui/material';

const App = () => {
    const dummyPlbData = {
        location: {
            latitude: 44.647869,
            longitude: -63.563893
        },
        status: 'online',  
        moistureLevel: 20,  
        contacts: [
            { name: 'Emergency Contact 1', phone: '+1234567890' },
            { name: 'Personal Contact 1', phone: '+0987654321' }
        ]
    };

    // Dummy data for other locations around Halifax
    const otherLocations = [
        { latitude: 44.581550, longitude: -63.527853 },
        { latitude: 44.633245, longitude: -63.552274 },
    ];

    const [plbData, setPlbData] = useState(dummyPlbData);

    return (
        <Container>
            <Box display="flex" alignItems="center" mb={2}>
                <img
                    src="/logo.png"  
                    alt="Company Logo"
                    style={{ width: 50, height: 'auto', marginRight: 16 }}  // Adjust size and margin as needed
                />
                <Typography variant="h3" component="h1">
                    Daku Tech Board
                </Typography>
            </Box>
            <BoatMap location={plbData.location} otherLocations={otherLocations} width="60%" height="300px" />
            <PLBDashboard plbData={plbData} />
        </Container>
    );
};

export default App;
