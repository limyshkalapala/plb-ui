// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BoatMap from './Components/BoatMap';
import PLBDashboard from './Components/PLBDashboard';
import { Container, Typography, Box } from '@mui/material';
import emailjs from 'emailjs-com';

const App = () => {
    const [plbData, setPlbData] = useState(null);
    const [lastEmailSent, setLastEmailSent] = useState(0);  // Timestamp of the last email sent

    useEffect(() => {
        // Function to fetch data
        const fetchData = () => {
            console.log('Fetching data from API...');
            axios.get('http://localhost:8080/deviceReadings')
                .then(response => {
                    console.log('API Response:', response.data);
                    const { lat, lng, moistureFlag } = response.data;
                    const moistureLevel = moistureFlag === 1 ? 'High Moisture Level' : 'Low Moisture Level';
                    
                    // Update state
                    setPlbData({
                        location: {
                            latitude: lat,
                            longitude: lng
                        },
                        status: 'online',
                        moistureLevel: moistureLevel,
                        contacts: [
                            { name: 'Emergency Contact 1', email: 'limysh310@gmail.com' },
                            { name: 'Personal Contact 1', email: 'abc@gmail.com' }
                        ]
                    });

                    // Log moisture level and decision to send email
                    console.log('Moisture Level:', moistureLevel);
                    if (moistureLevel === 'High Moisture Level') {
                        const currentTime = Date.now();
                        console.log('Current Time:', currentTime);
                        console.log('Last Email Sent Time:', lastEmailSent);
                        if (currentTime - lastEmailSent > 5 * 60 * 1000) {  // 5 minutes in milliseconds
                            console.log('Sending email...');
                            sendEmail(lat, lng);
                            setLastEmailSent(currentTime);
                        }
                    }
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        };

        // Fetch data initially
        fetchData();

        // Set up interval to fetch data every 2 seconds
        const intervalId = setInterval(fetchData, 2000);

        // Clear interval on component unmount
        return () => clearInterval(intervalId);
    }, [lastEmailSent]);  // Dependency array includes lastEmailSent

    // Function to send email
    const sendEmail = (lat, lng) => {
        emailjs.init('-mrjCOtrssM_xTycn'); // Initialize with your public API key

        const templateParams = {
            name: 'Brad',
            lat: lat,
            lng: lng
        };

        console.log('Sending email with parameters:', templateParams);

        emailjs.send('service_8dlky84', 'template_6560vgc', templateParams)
            .then((result) => {
                console.log('Email sent successfully:', result.text);
            }, (error) => {
                console.error('Error sending email:', error.text);
            });
    };

    // Provide default values while data is loading
    const defaultPlbData = {
        location: {
            latitude: 44.77,
            longitude: -63.690
        },
        status: 'online',
        moistureLevel: 'Low Moisture Level',
        contacts: [
            { name: 'Emergency Contact 1', email: 'limysh310@gmail.com' },
            { name: 'Personal Contact 1', email: 'abc@gmail.com' }
        ]
    };

    return (
        <Container>
            <Box
                display="flex"
                alignItems="center"
                mb={4}
                p={2}
                sx={{
                    backgroundColor: '#002F4F', // Dark ocean green background
                    color: '#ffffff', // White text color
                    borderBottom: '2px solid #004d40', // Even darker border for contrast
                    borderRadius: '0', // No border-radius to cover full width
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                    width: '100%', // Ensure header covers entire width
                    position: 'fixed', // Fix header position
                    top: 0,
                    left: 0,
                    zIndex: 1000 // Ensure header is on top of other content
                }}
            >
                <img
                    src="/logo.png"  // Ensure this path is correct
                    alt="Company Logo"
                    style={{ width: 50, height: 'auto', marginRight: 16 }}  // Adjust size and margin as needed
                />
                <Typography variant="h3" component="h1">
                    Brad's Dashboard
                </Typography>
            </Box>
            <Box mt={12}> {/* Adjusted margin-top to account for fixed header */}
                <BoatMap location={plbData ? plbData.location : defaultPlbData.location} otherLocations={[]} width="60%" height="300px" />
                <PLBDashboard plbData={plbData || defaultPlbData} />
            </Box>
        </Container>
    );
};

export default App;
