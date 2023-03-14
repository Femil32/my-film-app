import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import TalentProfile from '../../pages/profile/TalentProfile'
import CrewProfile from '../profile/crewProfile'
import LocationProfile from '../profile/LocationProfile'
import ServicesProfile from '../profile/ServicesProfile'
import Listing from './Listing'

const ListingRoute = () => {
    return (
        <>
            <Routes>
                <Route index path='/' element={<Listing />} />
                <Route path='/crew' element={<CrewProfile />} />
                <Route path='/location' element={<LocationProfile />} />
                <Route path='/service' element={<ServicesProfile />} />
                <Route path='/talent' element={<TalentProfile />} />
                <Route
                    path="*"
                    element={<Navigate to="/search/listing/" replace={true} />}
                ></Route>
            </Routes>
        </>
    )
}

export default ListingRoute
