import { Navigate, Route, Routes } from 'react-router-dom'
import Portfolio from './Portfolio'
import MyProfile from './MyProfile'
import MyProfileDetails from './MyProfileDetails'
import ArtistPortfolio from './ArtistPortfolio'
import ProductProfile from './ProductProfile'
import Transportservice from './Transportservice'
import TransportServiceDetails from './TransportServiceDetails'

const ProfileRoute = () => {
    return (
        <Routes>
            <Route exact path='/artist-portfolio' element={<ArtistPortfolio />} />
            <Route exact path='/myprofile' element={<MyProfile />} />
            <Route exact path='/profiledetail' element={<MyProfileDetails />} />
            <Route exact path='/portfolio' element={<Portfolio />} />
            {/* profiles details */}
            <Route exact path='/product-profile' element={<ProductProfile />} />
            <Route exact path='/transport-service' element={<Transportservice />} />
            <Route exact path='/transport-service-details' element={<TransportServiceDetails />} />

            <Route
                path="*"
                element={<Navigate to="/dashboard" replace={true} />}
            ></Route>
        </Routes>
    )
}

export default ProfileRoute
