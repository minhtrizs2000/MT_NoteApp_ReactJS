import { Avatar, Grid, Menu, MenuItem, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthProvider';

export default function UserMenu() {
    const { user: {displayName, photoURL, auth} } = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = useState(null);
    
    const open = Boolean(anchorEl);

    const handleLogout = () => {
        auth.signOut();
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };

    return (
        <Grid container>
            <Grid item xs={12}>
                <Box sx={{display: 'flex', alignItems: 'center'}} onClick={handleClick}>
                    <Avatar alt='avatar' src={photoURL} sx={{width:32, height:32, borderRadius:'50%', margin:'0 5px'}}/>
                    <Typography>{displayName}</Typography>
                </Box>
                <Menu 
                    id='basic-menu'
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
            </Grid>
        </Grid>
    )
}
