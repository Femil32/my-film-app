import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { registrationStatus } from '../store/auth/slice'
import { ACCESS_TOKEN, MOBILE_NO } from '../utils/constants'

const ProtectedRoute = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()


    useEffect(() => {
        let isApiSubscribed = true;
        const isAuthenticated = localStorage.getItem(ACCESS_TOKEN)

        if (!isAuthenticated) {
            navigate('/auth')
        }

        dispatch(registrationStatus(localStorage.getItem(MOBILE_NO))).then(res => {
            if (isApiSubscribed) {
                if (!res.payload.registeredUser) {
                    navigate('/create-profile')
                }
            }
        })

        return () => {
            isApiSubscribed = false;
        };
    },[])

    return <Outlet />
}

export default ProtectedRoute