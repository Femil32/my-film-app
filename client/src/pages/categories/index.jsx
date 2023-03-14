import { Route, Routes } from 'react-router-dom'
import CategoriesDetails from './CategoriesDetails'

const CategoriesDetailsRoute = () => {
    return (
        <Routes>
            <Route exact path='/' element={<CategoriesDetails />} />
        </Routes>
    )
}

export default CategoriesDetailsRoute
