import React, { useEffect, useState } from "react";
import { Notifications } from "@mui/icons-material";
import { createClient } from "graphql-ws";
import { Badge, Menu, MenuItem } from "@mui/material";

const client = createClient({
    url: import.meta.env.VITE_GRAPHQL_SUBSCRIPTION_ENDPOINT,
});

const query = `subscription PushNotification {
    notification {
      message
    }
  }`

export default function PushNotification() {
    const [invisible, setInvisible] = useState(true);
    const [notification, setNotification] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    
    const open = Boolean(anchorEl);
    const handleClose = () => {
        setAnchorEl(null);
        setNotification('');
        setInvisible(true);
    }
    const handleClick = (e) => {
        if(notification){
            setAnchorEl(e.currentTarget);
        }
    }
    
    
    useEffect(() => {
        // subscription
        (async () => {
            const onNext = (data) => {
                setInvisible(false);
                const message = data?.data?.notification?.message;
                setNotification(message);
                console.log(`[PushNotification]`,data);
            };
          
            await new Promise((resolve, reject) => {
                client.subscribe(
                    {
                    query: query,
                    },
                    {
                        next: onNext,
                        error: reject,
                        complete: resolve,
                    },
                );
            });
        })();
    }, []);


    return <>
            <Badge color="success" variant="dot" invisible={invisible}>
                <Notifications onClick={handleClick}/>
            </Badge>
            <Menu
                id='basic-menu'
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>{notification}</MenuItem>
            </Menu>
        </>;
}
