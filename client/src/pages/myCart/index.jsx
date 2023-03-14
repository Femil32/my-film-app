import React from 'react'
import { Route, Routes } from 'react-router-dom'
import MyCart from './MyCart'

const MyCartRoute = () => {
    return (
        <>
            <Routes>
                <Route exact path='/' element={<MyCart />} />
            </Routes>
        </>
    )
}

export default MyCartRoute
