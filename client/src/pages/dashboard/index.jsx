import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";

import Stagewish from "../common/Stagewish";
import RequestedAvailability from "../futurePayments/RequestedAvailability";
import Requirements from "../futurePayments/Requirements";
import SellerConfirmedAvailability from "../futurePayments/SellerConfirmedAvailability";
import BookRecce from "../myBooking";
import PreRecordedRecce from "../myBooking/PreRecordedRecce";
import MyCoupons from "../myCoupons";
import MyJob from "../myJobs";
import OrdersRoute from "../myOrders/index";
import MyProject from "../myProject";
import ProjectDetails from "../myProject/projectDetails";
import AddProject from "../myProject/projectDetails/AddProject";
import AddRequirement from "../myProject/projectDetails/AddRequirement";
import LiveRequirements from "../myRequirements";
import MySpotDeals from "../mySpotDeals";
import Notifications from "../notifications";
import PaymentFailed from "../paymentFailed";
import RecurringPayment from "../recurringPayment";
import ResourceBooked from "../resourceBooked";
import TotalViewCart from "../totalViewCart";

import MyCartRoute from "../myCart";
import WishlistRoute from "../myWishlist";
import ReviewsRoute from "../reviews";

import CategoriesDetailsRoute from "../categories";
import DetailsCrewRoute from "../crew";
import DetailLocationRoute from "../location";
import MyWalletRoute from "../myWallet";
import NotificationsRoute from "../notifications";
import AddedInventoriesRoute from "../service";
import DetailTalentRoute from "../talent";

import BookingsRoute from "../myBooking";
import NegotiationRoute from "../negotiation";
import PaymentsRoute from "../payment";
import ProfileRoute from "../profile";

const 
DashboardRoute = () => {
  return (
    <Routes>
      <Route index path="/" element={<Dashboard />} />

      {/* AddedInventoriesRoute */}
      <Route path="added-inventories/*" element={<AddedInventoriesRoute />} />

      {/* DetailLocationRoute */}
      <Route path="details-location/*" element={<DetailLocationRoute />} />

      {/* CategoriesDetailsRoute */}
      <Route path="categoriesdetails/*" element={<CategoriesDetailsRoute />} />

      {/* DetailTalentRoute */}
      <Route path="details-talent/*" element={<DetailTalentRoute />} />

      {/* DetailsCrewRoute */}
      <Route path="details-crew/*" element={<DetailsCrewRoute />} />

      {/* DetailLocationRoute */}
      <Route path="details-location/*" element={<DetailLocationRoute />} />

      {/* my-wallet */}
      <Route path="wallet/*" element={<MyWalletRoute />} />

      {/* NotificationsRouteRoute */}
      <Route path="notifications/*" element={<NotificationsRoute />} />

      {/* Wishlist */}
      <Route path="wishlist/*" element={<WishlistRoute />} />

      {/* MyCart */}
      <Route path="mycart/*" element={<MyCartRoute />} />

      {/* Reviews */}
      <Route path="reviews/*" element={<ReviewsRoute />} />

      {/* Total View Card */}
      <Route path="totalviewcart/*" element={<TotalViewCart />} />

      {/* Seller Confirmed Availability */}
      <Route
        path="sellerconfirmedavailability/*"
        element={<SellerConfirmedAvailability />}
      />

      {/* Requirements */}
      <Route path="requirements/*" element={<Requirements />} />

      {/* Requested Availability */}
      <Route
        path={"requestedavailability/*"}
        element={<RequestedAvailability />}
      />

      {/* Live Requirements */}
      <Route path="liverequirements/*" element={<LiveRequirements />} />

      {/* Recurring Payment */}
      <Route path="recurringpayment/*" element={<RecurringPayment />} />

      {/* Resource Booked */}
      <Route path="resourcebooked/*" element={<ResourceBooked />} />

      {/* Payment Failed */}
      <Route path="paymentfailed/*" element={<PaymentFailed />} />

      {/* Notifications */}
      <Route path="notifications/*" element={<Notifications />} />

      {/* All Project */}
      <Route path="projects/*" element={<MyProject />} />

      {/* Project Dtails */}
      <Route path="projectdetails/*" element={<ProjectDetails />} />

      {/* Project Edit */}
      <Route path="addproject/*" element={<AddProject />} />

      {/* Add Requirement */}
      <Route path="addrequirement/*" element={<AddRequirement />} />

      {/* BookRecce */}
      <Route path="bookrecce/*" element={<BookRecce />} />

      {/* Pre - Recorded Recce */}
      <Route path="prerecordedrecce/*" element={<PreRecordedRecce />} />

      {/* Booking Routes */}
      <Route path="bookings/*" element={<BookingsRoute />} />

      {/* Order Routes */}
      <Route path="orders/*" element={<OrdersRoute />} />

      {/* Payments Routes */}
      <Route path="payments/*" element={<PaymentsRoute />} />

      {/* My Spot Deals */}
      <Route path="spotdeals/*" element={<MySpotDeals />} />

      {/* My Job */}
      <Route path="myjob/*" element={<MyJob />} />

      {/* My Coupons */}
      <Route path="coupons/*" element={<MyCoupons />} />

      {/* Negotiate */}
      <Route path="negotiation/*" element={<NegotiationRoute />} />

      {/* Stage Wish */}
      <Route path="stagewish/*" element={<Stagewish />} />

      {/* profile route */}
      <Route path="/*" element={<ProfileRoute />} />
    </Routes>
  );
};

export default DashboardRoute;
