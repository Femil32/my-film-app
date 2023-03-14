import { Route, Routes } from 'react-router-dom'
import DetailLocation from './DetailLocation'

const DetailLocationRoute = () => {
    return (
        <Routes>
            <Route exact path='/' element={<DetailLocation />} />
        </Routes>
    )
}

export default DetailLocationRoute
