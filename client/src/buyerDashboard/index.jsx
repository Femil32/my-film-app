import { Route, Routes } from 'react-router-dom'
import BookingDirectly from './myBooking/BookingDirectly'
import BookRecce from './myBooking'
import PreRecordedRecce from './myBooking/PreRecordedRecce'
import BuyerDashboard from './BuyerDashboard'
// import Negotiate from './common/Negotiate'
import Stagewish from './common/Stagewish'
import FuturePayments from './FuturePayments'
import RequestedAvailability from './FuturePayments/RequestedAvailability'
import Requirements from './FuturePayments/Requirements'
import SellerConfirmedAvailability from './FuturePayments/SellerConfirmedAvailability'
import LiveRequirements from './myRequirements'
import MyCoupons from './myCoupons'
import MyJob from './myJobs'
import MyProject from './myProject'
import AddRequirement from './myProject/projectDetails/AddRequirement'
import ProjectDetails from './myProject/projectDetails'
import AddProject from './myProject/projectDetails/AddProject'
import MySpotDeals from './mySpotDeals'
import Notifications from './notifications'
import PaymentFailed from './paymentFailed'
import RecurringPayment from './recurringPayment'
import ResourceBooked from './resourceBooked'
import TotalViewCart from './totalViewCart'
import OrderDetailsRoute from './myOrders/index'

const BuyerDashboardRoute = () => {
    return (
        <Routes>
            {/* BuyerDashboard */}
            <Route exact path='/' element={<BuyerDashboard />} />

            {/* Future Payments */}
            <Route exact path="/futurePayments/" element={<FuturePayments />} />

            {/* Total View Card */}
            <Route exact path="totalviewcart" element={<TotalViewCart />} />

            {/* Seller Confirmed Availability */}
            <Route exact path="/sellerconfirmedavailability/" element={<SellerConfirmedAvailability />} />

            {/* Requirements */}
            <Route exact path="/requirements/" element={<Requirements />} />

            {/* Requested Availability */}
            <Route exact path={'requestedavailability'} element={<RequestedAvailability />} />

            {/* Live Requirements */}
            <Route exact path="/liverequirements/" element={<LiveRequirements />} />

            {/* Recurring Payment */}
            <Route path="/recurringpayment" element={<RecurringPayment />} />

            {/* Resource Booked */}
            <Route exact path='resourcebooked' element={<ResourceBooked />} />

            {/* Payment Failed */}
            <Route exact path='paymentfailed' element={<PaymentFailed />} />

            {/* Notifications */}
            <Route exact path="/notifications/" element={<Notifications />} />

            {/* All Project */}
            <Route exact path="/projects/" element={<MyProject />} />

            {/* Project Dtails */}
            <Route exact path="/projectdetails/" element={<ProjectDetails />} />

            {/* Project Edit */}
            <Route exact path="/addproject/" element={<AddProject />} />

            {/* Add Requirement */}
            <Route exact path="/addrequirement/" element={<AddRequirement />} />

            {/* BookRecce */}
            <Route exact path="/bookrecce/" element={<BookRecce />} />

            {/* Pre - Recorded Recce */}
            <Route exact path='/prerecordedrecce' element={<PreRecordedRecce />} />

            {/* Booking Directly */}
            <Route exact path="/bookingdirectly/" element={<BookingDirectly />} />

            {/* OrderDetails */}
            <Route
                exact
                path='/orders/*'
                element={<OrderDetailsRoute />}
            />

            {/* My Spot Deals */}
            <Route exact path="/spotdeals/*" element={<MySpotDeals />} />

            {/* My Job */}
            <Route exact path="/myjob/" element={<MyJob />} />

            {/* My Coupons */}
            <Route exact path="/coupons/*" element={<MyCoupons />} />

            {/* Negotiate */}
            {/* <Route exact path="/negotiate" element={<Negotiate />} /> */}

            {/* Stage Wish */}
            <Route exact path="/stagewish" element={<Stagewish />} />

        </Routes>
    )
}

export default BuyerDashboardRoute