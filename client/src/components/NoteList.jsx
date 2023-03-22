import { Card, CardContent, Grid, IconButton, List, Tooltip, Typography } from '@mui/material'
import { Box } from '@mui/system';
import React, { useState } from 'react'
import { Link, Outlet, useLoaderData, useParams } from 'react-router-dom';
import NewNote from './NewNote';
import moment from 'moment';

export default function NoteList() {

    const { folder } = useLoaderData();
    const {noteID} = useParams();

    const [activeNoteID, setActiveNoteID] = useState(noteID);

    return (
        <Grid container height='100%'>
            <Grid item xs={2} 
                sx={{
                    width: '100%',
                    height: '100%',
                    bgcolor: '#749F82',
                    padding: '10px',
                    textAlign: 'left',
                    overflow: 'auto'
                }}>
                <List
                subheader={
                    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Typography variant='h4' sx={{ color: '#FFF', fontWeight: 'bold'}}>
                            Notes
                        </Typography>
                        <NewNote />
                    </Box>
                }
                >
                    {
                        folder.notes.map(({id, content, updatedAt})=>{
                            return <Link
                                        key={id}
                                        to={`note/${id}`}
                                        style={{textDecoration:'none'}}
                                        onClick={()=> setActiveNoteID(id)}
                                    >
                                        <Card 
                                        sx={{
                                            mb:'10px', 
                                            '&:after': {width: id === activeNoteID ? '100%' : '0', content: '""', display: 'block', height: '10px', bgcolor: '#749F82', transition: 'width .3s'} }}>
                                            <CardContent sx={{ '&:last-child': {pb: '10px'}, padding: '10px'}}>
                                                <div style={{fontSize: 14, fontWeight: 'bold', color: '#749F82'}}
                                                    dangerouslySetInnerHTML={{__html: `${content.substring(0, 30) || 'Empty'}`}}
                                                >
                                                </div>
                                                <Typography sx={{fontSize: '12px', pt: '10px'}}>
                                                    {moment(updatedAt).format('dd, Do/M/YYY ')}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Link>;
                        })
                    }
                </List>
            </Grid>
            <Grid item xs={10}>
                <Outlet />
            </Grid>
        </Grid>
    )
}
