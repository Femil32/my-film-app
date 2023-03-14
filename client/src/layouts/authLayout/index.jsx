import React, { useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet, useNavigate } from 'react-router-dom'
import { ACCESS_TOKEN } from '../../utils/constants'

const AuthLayout = (props) => {
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem(ACCESS_TOKEN)) {
            navigate('/dashboard')
        }
    }, [])

    return (
        <div className='vh-100 '>
            <div className='d-flex flex-column h-100'>
                {/* <Header /> */}
                <Outlet />
                {/* <Footer /> */}
            </div>
        </div>
    )
}


export default AuthLayout
