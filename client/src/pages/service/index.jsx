import { Route, Routes } from 'react-router-dom'
import AddedInventories from './AddedInventories'
import Inventory from './Inventory'
import InventoryAddPackage from './InventoryAddPackage'
import DetailsCrew from './DetailsCrew'
import RequestReview from './RequestReview'

const AddedInventoriesRoute = () => {
    return (
        <>
            <div className='container'>
                <Routes>
                    <Route exact path='/' element={<AddedInventories />} />
                    <Route exact path='/add-inventory' element={<Inventory />} />
                    <Route exact path='/detailscrew' element={<DetailsCrew />} />
                    <Route exact path='/add-pakcage' element={<InventoryAddPackage />} />
                    <Route exact path='/request-review' element={<RequestReview />} />
                </Routes>
            </div>
        </>
    )
}

export default AddedInventoriesRoute