import React, { useContext, useEffect } from 'react';
import { Button, Typography } from '@mui/material';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { AuthContext } from '../context/AuthProvider';
import { Navigate } from 'react-router-dom';
import { Box } from '@mui/system';
import { graphQLRequest } from '../utils/request';

export default function Login() {
    const auth = getAuth();
    // const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const handleLoginWithGoogle = async ()=>{
        const provider = new GoogleAuthProvider();
        // const res = await signInWithPopup(auth, provider);
        const { user: {uid, displayName} } = await signInWithPopup(auth, provider)
        
        const { data } = await graphQLRequest({query:`mutation register($uid: String!, $name: String!) {
            register(uid: $uid, name: $name) {
                uid
                name
            }
        }`, variables: {
            uid, 
            name: displayName
        },
        });
    } 

    if(localStorage.getItem('accessToken')){
        //it will excute error "Maximum update depth exeeded" because using hook useNavigate outsite of hook useEffect
        //navigate('/');
        //=> change to use Navigate component instead of hook useNavigate
        
        return <Navigate to="/" />;
    }

        
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', paddingTop: '100px' }}>
            <Typography variant='h5' sx={{ marginBottom: '10px' }}>Welcome to Note App</Typography>
            <Button variant='outlined' onClick={handleLoginWithGoogle}>
                Login with Google
            </Button>
        </Box>
    )
}
