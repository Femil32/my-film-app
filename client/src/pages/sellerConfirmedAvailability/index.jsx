import { Route, Routes } from 'react-router-dom'
import DashboardOption from '../dashboard/DashboardOption'
// import ConfirmedBookings from './ConfirmedBookings'
// import NegotiationRequest from '../negotiation/NegotiationRequest'
// import PendingBuyerPayments from './PendingBuyerPayments'
// import PendingRequest from './PendingRequest'

const DashboardOptionRoute = () => {
    return (
        <Routes>
            <Route exact path='/' element={<DashboardOption />} />
            {/* <Route exact path='/booking-status' element={<PendingRequest />} /> */}
            {/* <Route exact path='/pending-buyer-payments' element={<PendingBuyerPayments />} /> */}
            {/* <Route exact path='/negotiation-request' element={<NegotiationRequest />} /> */}
            {/* <Route exact path='/confirmedbookings' element={<ConfirmedBookings />} /> */}
        </Routes>
    )
}

export default DashboardOptionRoute
