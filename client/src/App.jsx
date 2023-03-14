import React, { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import './assets/scss/main.scss'
// eslint-disable-next-line
import Symbol_observable from 'symbol-observable';


const App = () => {
    return (
        <React.StrictMode>
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
        </React.StrictMode>
    )
}
export default App
