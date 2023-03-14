import React from 'react'
import { Route, Routes } from 'react-router-dom'
import FuturePayments from './FuturePayments'
import PendingBuyerPayments from './PendingBuyerPayments'

const index = () => {
    return (
        <Routes>
            <Route exact path='/pending-buyer-payments' element={<PendingBuyerPayments />} />
            <Route exact path='/future-payments' element={<FuturePayments />} />
        </Routes>
    )
}

export default index