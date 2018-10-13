import Application from './Index';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import "antd/dist/antd.css";

ReactDOM.render((
    <BrowserRouter>
        <Application />    
    </BrowserRouter>
), document.getElementById('reactEntry'));
