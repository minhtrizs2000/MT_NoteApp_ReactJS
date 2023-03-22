import { Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { Outlet, useLoaderData } from 'react-router-dom'
import FolderList from '../components/FolderList'
import PushNotification from '../components/PushNotification'
import UserMenu from '../components/UserMenu'

export default function Home() {

    const {folders} = useLoaderData();

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'right', padding: '20px', cursor: 'pointer'}}>
                <UserMenu/>
                <PushNotification />
            </Box>
            <Grid container sx={{ padding: '0', height:'100vh', width:'100%', boxShadow:' 0 0 15px 0 rgb(193 193 193 / 60%)' }}>
                <Grid item xs={2} sx={{ height: '100%' }}>
                    <FolderList folders={folders}/>
                </Grid>
                <Grid item xs={10} sx={{ height: '100%' }}>
                    <Outlet/>
                </Grid>
            </Grid>
        </>
    )
}
