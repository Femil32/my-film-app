import { Route, Routes } from 'react-router-dom'
import LogIn from './LogIn'
import Otp from './Otp'
import SignIn from './SignIn'

const AuthRoute = () => {
    return (
        <Routes>
            <Route index exact path='/' element={<SignIn />} />
            <Route exact path='/login' element={<LogIn />} />
            <Route exact path='/otp' element={<Otp />} />
        </Routes>
    )
}

export default AuthRoute
