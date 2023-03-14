import { Route, Routes } from 'react-router-dom'
import Talentdetails from './Talentdetails'

const DetailTalentRoute = () => {
    return (
        <Routes>
            <Route exact path='/' element={<Talentdetails />} />
        </Routes>
    )
}

export default DetailTalentRoute
