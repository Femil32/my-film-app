import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CheckAvailability from './CheckAvailability'
import OrderDetails from './OrderDetails'
import BookingDirectly from './../myOrders/BookDirectly';
import Orders from './Orders';
import CancelModifyOrder from './CancelModifyOrder';

const OrderDetailsRoute = () => {
    return (
        <>
            <Routes>
                <Route index element={<Orders />} />
                <Route exact path='/details' element={<OrderDetails />} />
                <Route exact path='/check-availability' element={<CheckAvailability />} />
                <Route exact path='/book-directly' element={<BookingDirectly />} />
                <Route exact path='/modify' element={<CancelModifyOrder />} />
            </Routes>
        </>
    )
}

export default OrderDetailsRoute
