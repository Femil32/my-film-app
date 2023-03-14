import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Reviews from './Reviews'

const ReviewsRoute = () => {
    return (
        <>
            <Routes>
                <Route exact path='/' element={<Reviews />} />
            </Routes>
        </>
    )
}

export default ReviewsRoute
