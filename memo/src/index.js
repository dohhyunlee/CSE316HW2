import React from 'react';
import ReactDOM from 'react-dom';
import './app.css';
import App from './App';


ReactDOM.render(
    <React.StrictMode>
        <head>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <link href="app.css" rel="stylesheet"/>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
                  rel="stylesheet"/>
            <title>Notes</title>
        </head>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);


