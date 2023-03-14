import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CouponCreation from './CouponCreation'
import MyCoupons from './MyCoupons'

const index = () => {
    return (
        <Routes>
            <Route path='/' element={<MyCoupons />} />
            {/* my coupons creation */}
            <Route path='/couponcreation' element={<CouponCreation />} />
        </Routes>
    )
}

export default index