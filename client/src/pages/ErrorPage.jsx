import React from 'react'
import { useRouteError } from 'react-router-dom'

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);
    
    return (
        <div id='error-page'>
            <h1>PAGE NOT FOUND !</h1>
            <p>An unexpected error has occurred.</p>
        </div>
    )
}
