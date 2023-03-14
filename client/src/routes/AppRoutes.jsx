import { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import LazyloadLoader from '../components/common/LazyLoader'
import DefaultLayout from '../layouts/defaultLayout'

import CreateProfile from '../pages/jobRequirement'

import HomePage from '../pages/homepage/index'
import ProtectedRoute from './ProtectedRoute'
import Dashboard from '../pages/dashboard'
import SearchIndex from '../pages/search'
import AuthIndexRoute from './AuthIndexRoute'
import Auth from '../pages/auth'


import GuestRoute from './GuestRoute'
import { ToastContainer } from 'react-toastify'
import ListingRoute from '../pages/listing'

const AppRoutes = () => {
    return (
        <Suspense fallback={<LazyloadLoader />}>
            <ToastContainer position='bottom-right' />
            <Routes>
                <Route path='/' element={<DefaultLayout />}>
                    <Route element={<GuestRoute isAllowed={true} />}>
                        <Route index element={<HomePage />} />
                        <Route path='search/*' element={<SearchIndex />} />
                    </Route>
                    <Route element={<ProtectedRoute />}>
                        <Route path='dashboard/*' element={<Dashboard />} />
                        <Route path='create-profile/*' element={<CreateProfile />} />
                    </Route>
                    <Route element={<AuthIndexRoute />}>
                        <Route path='auth/*' element={<Auth />} />
                    </Route>
                    <Route
                        path="*"
                        element={<Navigate to="dashboard" replace={true} />}
                    ></Route>
                </Route>
            </Routes>
        </Suspense>
    )
}

export default AppRoutes
