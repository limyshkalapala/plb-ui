// Header.js
import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import styled from 'styled-components';

const HeaderContainer = styled(AppBar)`
    background: linear-gradient(135deg, #0099cc, #003366);
    box-shadow: none;  // Remove default shadow for a cleaner look
`;

const Logo = styled.img`
    width: 50px;
    height: auto;
    margin-right: 16px;
`;

const Header = () => {
    return (
        <HeaderContainer position="static">
            <Toolbar>
                <Logo src="/logo.png" alt="Company Logo" />
                <Box>
                    <Typography variant="h6" component="div" color="inherit">
                        Brad's Dashboard
                    </Typography>
                    <Typography variant="h4" component="div" color="inherit">
                        Daku Tech Board
                    </Typography>
                </Box>
            </Toolbar>
        </HeaderContainer>
    );
};

export default Header;
