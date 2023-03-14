import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Wishlist from './Wishlist'

const WishlistRoute = () => {
    return (
        <>
            <Routes>
                <Route exact path='/' element={<Wishlist />} />
            </Routes>
        </>
    )
}

export default WishlistRoute
