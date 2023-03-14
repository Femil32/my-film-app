import {
    createAsyncThunk,
    createSlice
} from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { bookingMsg } from "../../components/common/ValidationConstants";
import { axiosApi } from "../../helpers/axios";
import state from "./state";

// Upcoming Bookings
export const getUpcomingBookings = createAsyncThunk('getUpcomingBookings', async (pageNo, { rejectWithValue }) => {
    try {
        const res = await axiosApi.get(`/order/api/v1/profile/bookings/upcoming?pageNo=${pageNo}`)
        return { res, pageNo }
    } catch (error) {
        if (!error.response) {
            throw error;
        }
        return rejectWithValue(error.response.data);
    }
})

// Upcoming Bookings
export const getOngoingBookings = createAsyncThunk('getOngoingBookings', async (pageNo, { rejectWithValue }) => {
    try {
        const res = await axiosApi.get(`/order/api/v1/profile/bookings/ongoing?pageNo=${pageNo}`)
        return { res, pageNo }
    } catch (error) {
        if (!error.response) {
            throw error;
        }
        return rejectWithValue(error.response.data);
    }
})

// Upcoming Bookings
export const getCompletedBookings = createAsyncThunk('getCompletedBookings', async (pageNo, { rejectWithValue }) => {
    try {
        const res = await axiosApi.get(`/order/api/v1/profile/bookings/completed?pageNo=${pageNo}`)
        return { res, pageNo }
    } catch (error) {
        if (!error.response) {
            throw error;
        }
        return rejectWithValue(error.response.data);
    }
})

// Upcoming Bookings
export const getCancelledBookings = createAsyncThunk('getCancelledBookings', async (pageNo, { rejectWithValue }) => {
    try {
        const res = await axiosApi.get(`/order/api/v1/profile/bookings/cancelled?pageNo=${pageNo}`)
        return { res, pageNo }
    } catch (error) {
        if (!error.response) {
            throw error;
        }
        return rejectWithValue(error.response.data);
    }
})

export const canceleBooking = createAsyncThunk("canceleBooking", async (profileOrderId, { rejectWithValue }) => {
    try {
        const res = await axiosApi.put(`/order/api/v1/profile/bookings/${profileOrderId}/cancel`, {})
        return res
    } catch (error) {
        if (!error.response) {
            throw error;
        }
        return rejectWithValue(error.response.data);
    }
})

// create slice
const bookingSlice = createSlice({
    name: "mybooking",
    initialState: state,
    extraReducers: {
        // Upcoming Bookings
        [getUpcomingBookings.pending]: (state, action) => {
            state.status = "loading";
            state.type = "UPCOMING_BOOKING";
        },
        [getUpcomingBookings.fulfilled]: (state, action) => {
            state.status = "succeed";
            state.upcomingBookings = action.payload.pageNo ? { ...action.payload.res.data, bookings: [...state.upcomingBookings.bookings, ...action.payload.res.data.bookings] } : action.payload.res.data
            state.type = "UPCOMING_BOOKING";
        },
        [getUpcomingBookings.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.payload.errorMessage;
            state.type = "UPCOMING_BOOKING";
        },

        // Ongoing Bookings
        [getOngoingBookings.pending]: (state, action) => {
            state.status = "loading";
            state.type = "ONGOING_BOOKING";
        },
        [getOngoingBookings.fulfilled]: (state, action) => {
            state.status = "succeed";
            state.ongoingBookings = action.payload.pageNo ? { ...action.payload.res.data, bookings: [...state.ongoingBookings.bookings, ...action.payload.res.data.bookings] } : action.payload.res.data
            state.type = "ONGOING_BOOKING";
        },
        [getOngoingBookings.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.payload.errorMessage;
            state.type = "ONGOING_BOOKING";
        },

        // Completed Bookings
        [getCompletedBookings.pending]: (state, action) => {
            state.status = "loading";
            state.type = "COMPLETED_BOOKING";
        },
        [getCompletedBookings.fulfilled]: (state, action) => {
            state.status = "succeed";
            state.completedBookings = action.payload.pageNo ? { ...action.payload.res.data, bookings: [...state?.completedBookings.bookings, ...action.payload.res.data.bookings] } : action.payload.res.data
            state.type = "COMPLETED_BOOKING";
        },
        [getCompletedBookings.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.payload.errorMessage;
            state.type = "COMPLETED_BOOKING";
        },

        // Cancelled Bookings
        [getCancelledBookings.pending]: (state, action) => {
            state.status = "loading";
            state.type = "CANCELLED_BOOKING";
        },
        [getCancelledBookings.fulfilled]: (state, action) => {
            state.status = "succeed";
            state.cancelledBookings = action.payload.pageNo ? { ...action.payload.res.data, bookings: [...state.cancelledBookings.bookings, ...action.payload.res.data.bookings] } : action.payload.res.data
            state.type = "CANCELLED_BOOKING";
        },
        [getCancelledBookings.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.payload.errorMessage;
            state.type = "CANCELLED_BOOKING";
        },

        // Cancel Booking
        [canceleBooking.pending]: (state, action) => {
            state.status = "loading";
            state.type = "CANCEL_BOOKING";
        },
        [canceleBooking.fulfilled]: (state, action) => {
            toast.success(bookingMsg.cancelBooking)
            state.status = "succeed";
            state.type = "CANCEL_BOOKING";
        },
        [canceleBooking.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.payload.errorMessage;
            state.type = "CANCEL_BOOKING";
        },
    },
    reducers: {
        setGetMyBooking(state) {
            state.status = null;
            state.type = null;
            state.bookingApiData = {};
        },
    },
});

export const { setGetMyBooking } = bookingSlice.actions;
const { reducer } = bookingSlice;
export default reducer;
