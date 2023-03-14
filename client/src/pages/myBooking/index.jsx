import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Bookings from './Bookings'
import PendingRequest from './PendingRequest'

const BookingsRoute = () => {
    return (
        <>
            <Routes>
                <Route index element={<Bookings />} />
                <Route path='/pending-booking-requests' element={<PendingRequest />} />
            </Routes>
        </>
    )
}

export default BookingsRoute
