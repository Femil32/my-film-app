import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Listing from '../listing'
import Search from './Search'
import { SearchContextProvider } from './SearchContext'

const index = () => {
    return (
        <SearchContextProvider>
            <Routes>
                <Route path='/' element={<Search />} />
                <Route path='/listing/*' element={<Listing />} />
                <Route
                    path="*"
                    element={<Navigate to="/search" replace={true} />}
                ></Route>
            </Routes>
        </SearchContextProvider>
    )
}

export default index