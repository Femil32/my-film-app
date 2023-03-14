import { configureStore } from "@reduxjs/toolkit";
import { getDefaultMiddleware } from "@reduxjs/toolkit";

import authReducer from "./auth/slice"; // auth reducer
import categoryReducer from "./category/slice"; // category reducer
import locationReducer from "./location/slice"; // address reducer
import socialdetail from "./socialdetail/slice"; // social reducer
import dashboard from "./dashboard/slice"; // social reducer
import talent from "./talent/slice"; // social reducer
import crew from "./crew/slice"; // social reducer
import masterdata from "./masterdata/slice"; // masterdata reducer
import servicesReducer from "./service/slice"; // services reducer
import searchReducer from "./search/slice"; // search reducer
import projectSlice from "./project/slice"; // project reducer
import couponSlice from "./coupon/slice"; // coupon reducer
import spotDealsSlice from "./spotdeals/slice"; // spotdeals reducer
import wishlistSlice from "./wishlist/slice"; // spotdeals reducer
import orderSlice from "./order/slice"; // spotdeals reducer
import requestavailability from "./requestavailability/slice"; // requestavailability reducer
import sellerbookingrequest from "./sellerbookingrequest/slice"; // spotdeals reducer
import cartSlice from "./cart/slice"; // cart reducer
import walletSlice from "./wallet/slice"; // wallet reducer
import reviewSlice from "./review/slice"; // review reducer
import bookingSlice from "./booking/slice";
import futurePaymentsSlice from "./futurepayments/slice";
import negotiationRequestsSlice from "./negotiationrequests/slice";

const rootReducer = {
    auth: authReducer,
    category: categoryReducer,
    location: locationReducer,
    sdetail: socialdetail,
    dashboard: dashboard,
    talent: talent,
    crew: crew,
    masterdata: masterdata,
    service: servicesReducer,
    search: searchReducer,
    project: projectSlice,
    coupon: couponSlice,
    spotdeals: spotDealsSlice,
    wishlist: wishlistSlice,
    order: orderSlice,
    requestavailability: requestavailability,
    sellerbookingrequest: sellerbookingrequest,
    cart: cartSlice,
    wallet: walletSlice,
    review: reviewSlice,
    booking: bookingSlice,
    futurePayments: futurePaymentsSlice,
    negotiationRequests: negotiationRequestsSlice,
};
const customizedMiddleware = getDefaultMiddleware({
    serializableCheck: false,
});
export default configureStore({
    reducer: rootReducer,
    middleware: customizedMiddleware,
});
