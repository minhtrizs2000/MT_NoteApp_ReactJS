import { Card, CardContent, List, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import NewFolder from './NewFolder';

export default function FolderList({folders}) {
    
    const {folderID} = useParams();

    const [activeFolderID, setActiveFolderID] = useState(folderID);

    return (
        <List 
            sx={{
                width: '100%',
                height: '100%',
                bgcolor: '#425F57',
                padding: '10px',
                textAlign: 'left',
                overflow: 'auto'
            }}
            subheader={
                <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Typography variant='h4' sx={{color: '#FFF', fontWeight: 'bold'}}>
                        Folders
                    </Typography>
                    <NewFolder/>
                </Box>
            }
        >
            {
                folders.map(({id,name})=>{
                    return (
                        <Link key={id} to={`folders/${id}`} style={{textDecoration: 'none'}} onClick={()=> setActiveFolderID(id)}>
                            <Card 
                                sx={{
                                    mb:'10px', 
                                    '&:after': {width: id === activeFolderID ? '100%' : '0', content: '""', display: 'block', height: '10px', bgcolor: '#425F57', transition: 'width .3s'} }}>
                                <CardContent sx={{ '&:last-child':{ pb: '10px' }, padding: '10px' }}>
                                    <Typography sx={{color: '#425F57', fontWeight: 'bold'}}>{name}</Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    )
                })
            }
        </List>
    )
}
