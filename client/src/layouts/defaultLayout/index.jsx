import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getUserInfo } from '../../store/auth/slice'
import { MOBILE_NO } from '../../utils/constants'


const DefaultLayout = () => {
    const location = useLocation();
    const dispatch = useDispatch();

    // useEffect(() => {
    //     localStorage.getItem(MOBILE_NO) && dispatch(getUserInfo())
    // }, [location.pathname])

    useEffect(() => {
        document.addEventListener("wheel", () => {
            if (document.activeElement.type === "number") {
                document.activeElement.blur();
            }
        });
    }, [])

    return (
        <>
            {location.pathname === '/auth' || location.pathname === '/auth/otp' ? (<Outlet />) : (<div className='d-flex flex-column min-vh-100'>
                <Header />
                <div className="mx-auto w-100 flex-grow-1">
                    <Outlet />
                </div>
                <Footer />
            </div>)}
        </>
    )
}

export default DefaultLayout