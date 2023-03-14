import { Route, Routes } from 'react-router-dom'
import DetailsCrew from './DetailCrew'

const DetailsCrewRoute = () => {
    return (
        <Routes>
            <Route exact path='/' element={<DetailsCrew />} />
        </Routes>
    )
}

export default DetailsCrewRoute
