import { Route, Routes } from 'react-router-dom'
import Otp from './Otp'
import SignIn from './SignIn'

const AuthRoute = () => {
    return (
        <Routes>
            <Route index exact path='/' element={<SignIn />} />
            <Route exact path='/otp' element={<Otp />} />
        </Routes>
    )
}

export default AuthRoute
