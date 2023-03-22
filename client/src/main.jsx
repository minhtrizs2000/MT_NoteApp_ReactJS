import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import router from './router';
import './firebase/config';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { Container } from '@mui/material';

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router = {router} />
)
