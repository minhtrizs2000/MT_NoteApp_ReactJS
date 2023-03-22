import { IconButton, Tooltip } from '@mui/material';
import React from 'react';
import {NoteAdd} from '@mui/icons-material';
import { useParams, useSubmit } from 'react-router-dom';

export default function NewNote() {

    const { folderID } = useParams();
    const submit = useSubmit();

    const handleAddNewNote = async () => {
        submit({
            content: '',
            folderID: folderID,
        },{
            method: 'POST',
            action: `/folders/${folderID}`
        })
    }

    return (
        <Tooltip title="Add Note" onClick={handleAddNewNote}>
            <IconButton>
                <NoteAdd sx={{color: '#FFF'}}/>
            </IconButton>
        </Tooltip>
    )
}
