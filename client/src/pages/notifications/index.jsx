import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Notifications } from './Notifications'

export const NotificationsRoute = () => {
    return (
        <>
            <Routes>
                <Route exact path='/' element={<Notifications />} />
            </Routes>
        </>
    )
}
export default NotificationsRoute
