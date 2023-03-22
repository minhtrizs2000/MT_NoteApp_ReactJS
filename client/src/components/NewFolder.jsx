import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import {CreateNewFolder} from '@mui/icons-material';
import { addNewFolder } from '../utils/folderUtils';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function NewFolder() {
    const [newFolderName, setNewFolderName] = useState();
    const [open, setOpen] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    const popupName = searchParams.get('popup');
    const navigate = useNavigate();

    const handleOpenPopup = () => {
        // setOpen(true);
        setSearchParams({ popup: 'add-folder' });
    }
    const handleClosePopup = () => {
        // setOpen(false);
        setNewFolderName('');
        navigate(-1);
    }
    const handleNewFolderNameChange = (e) => {
        setNewFolderName(e.target.value);
    }
    const handleAddNewFolder = async () => {
        const {addFolder} = await addNewFolder({name: newFolderName});
        
        handleClosePopup();
    }

    useEffect(()=>{
        if(popupName === 'add-folder'){
            setOpen(true);
            return;
        }
        setOpen(false);
    },[popupName])


    return (
        <div>
            <Tooltip title="Add Folder" onClick={handleOpenPopup}>
                <IconButton>
                    <CreateNewFolder sx={{color: '#FFF'}}/>
                </IconButton>
            </Tooltip>
            <Dialog open={open} onClose={handleClosePopup}>
                <DialogTitle>New Folder</DialogTitle>
                <DialogContent>
                    <TextField 
                        autoFocus
                        margin='dense'
                        id='name'
                        label='Folder Name'
                        fullWidth
                        size='small'
                        variant='standard'
                        sx={{ width: '400px' }}
                        autoComplete='off'
                        value={newFolderName}
                        onChange={handleNewFolderNameChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClosePopup}>Cancel</Button>
                    <Button onClick={handleAddNewFolder}>Done</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
