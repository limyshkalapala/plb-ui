import React from 'react';
import { Card, CardContent, Typography, Grid, Chip, List, ListItem, ListItemText } from '@mui/material';
import styled from 'styled-components';

const DashboardContainer = styled.div`
    background: linear-gradient(135deg, #0099cc, #003366);
    padding: 20px;
    color: #cccccc;  // Text color for the dashboard container
`;

const StyledCard = styled(Card)`
    background-color: #001a33 !important;  // Force apply background color for testing
    color: #cccccc;  // Text color for the card
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.6);  // Add shadow for better contrast
`;

// Style for moisture level
const MoistureLevelTypography = styled(Typography)`
    color: ${props => props.level === 'High Moisture Level' ? 'red' : 'green'};  // Red for high, green for low
    font-weight: bold;
`;

const PLBDashboard = ({ plbData }) => {
    const { location, status, moistureLevel, contacts } = plbData;

    return (
        <DashboardContainer>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <StyledCard>
                        <CardContent>
                            <Typography variant="h5" component="div">Device Status</Typography>
                            <Chip label={status} color={status === 'online' ? 'success' : 'error'} />
                        </CardContent>
                    </StyledCard>
                </Grid>
                <Grid item xs={12} md={6}>
                    <StyledCard>
                        <CardContent>
                            <Typography variant="h5" component="div">Moisture Level</Typography>
                            <MoistureLevelTypography variant="body2" component="p" level={moistureLevel}>
                                {moistureLevel === 'High Moisture Level' ? 'High Moisture Level' : 'Low Moisture Level'}
                            </MoistureLevelTypography>
                        </CardContent>
                    </StyledCard>
                </Grid>
                <Grid item xs={12}>
                    <StyledCard>
                        <CardContent>
                            <Typography variant="h5" component="div">Contacts</Typography>
                            <List>
                                {contacts.map((contact, index) => (
                                    <ListItem key={index}>
                                        <ListItemText primary={contact.name} secondary={contact.email} />
                                    </ListItem>
                                ))}
                            </List>
                        </CardContent>
                    </StyledCard>
                </Grid>
            </Grid>
        </DashboardContainer>
    );
};

export default PLBDashboard;
