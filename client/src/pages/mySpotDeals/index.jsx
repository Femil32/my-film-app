import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AddMySpotDeals from './AddMySpotDeals'
import MySpotDeals from './MySpotDeals'

const index = () => {
    return (
        <Routes>
            <Route exact path='/' element={<MySpotDeals />} />
            <Route exact path='/addmyspotdeals' element={<AddMySpotDeals />} />
        </Routes>
    )
}

export default index