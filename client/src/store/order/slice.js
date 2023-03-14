import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import { orderMsg } from "../../components/common/ValidationConstants"
import { axiosApi } from "../../helpers/axios"
import state from "./state"


export const AddAvlCheck = createAsyncThunk('AddAvlCheck', async ({ payload, navigation }, { rejectWithValue }) => {
    try {
        const res = await axiosApi.post(`/order/api/v1/profile/avlchecks/standardterm`, payload)
        toast.success(orderMsg.AddAvlCheck)
        navigation('/dashboard')
        return res.data
    } catch (error) {
        if (!error.response) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }
})

export const AddOrder = createAsyncThunk('AddOrder', async ({ payload, navigation }, { rejectWithValue }) => {
    try {
        const res = await axiosApi.post(`/order/api/v1/profile/orders/standardterm`, payload)
        toast.success(orderMsg.AddOrder)
        navigation('/dashboard')
        return res.data
    } catch (error) {
        if (!error.response) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }
})

// Upcoming Orders
export const getUpcomingOrders = createAsyncThunk('getUpcomingOrders', async (pageNo, { rejectWithValue }) => {
    try {
        const res = await axiosApi.get(`/order/api/v1/profile/orders/upcoming?pageNo=${pageNo}`)
        return { res, pageNo }
    } catch (error) {
        if (!error.response) {
            throw error;
        }
        return rejectWithValue(error.response.data);
    }
})

// Upcoming Orders
export const getOngoingOrders = createAsyncThunk('getOngoingOrders', async (pageNo, { rejectWithValue }) => {
    try {
        const res = await axiosApi.get(`/order/api/v1/profile/orders/ongoing?pageNo=${pageNo}`)
        return { res, pageNo }
    } catch (error) {
        if (!error.response) {
            throw error;
        }
        return rejectWithValue(error.response.data);
    }
})

// Upcoming Orders
export const getCompletedOrders = createAsyncThunk('getCompletedOrders', async (pageNo, { rejectWithValue }) => {
    try {
        const res = await axiosApi.get(`/order/api/v1/profile/orders/completed?pageNo=${pageNo}`)
        return { res, pageNo }
    } catch (error) {
        if (!error.response) {
            throw error;
        }
        return rejectWithValue(error.response.data);
    }
})

// Upcoming Orders
export const getCancelledOrders = createAsyncThunk('getCancelledOrders', async (pageNo, { rejectWithValue }) => {
    try {
        const res = await axiosApi.get(`/order/api/v1/profile/orders/cancelled?pageNo=${pageNo}`)
        return { res, pageNo }
    } catch (error) {
        if (!error.response) {
            throw error;
        }
        return rejectWithValue(error.response.data);
    }
})

export const canceleOrder = createAsyncThunk("canceleOrder", async (profileOrderId, { rejectWithValue }) => {
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


const OrderSlice = createSlice({
    name: 'OrderSlice',
    initialState: state,
    extraReducers: {
        [AddAvlCheck.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'ADD_AVL_CHECK'
        },
        [AddAvlCheck.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'ADD_AVL_CHECK'
        },
        [AddAvlCheck.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'ADD_AVL_CHECK'
            state.error = action.payload.errorMessage
        },

        [AddOrder.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'ADD_ORDER_CHECK'
        },
        [AddOrder.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'ADD_ORDER_CHECK'
        },
        [AddOrder.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'ADD_ORDER_CHECK'
            state.error = action.payload.errorMessage
        },

        // Upcoming orders
        [getUpcomingOrders.pending]: (state, action) => {
            state.status = "loading";
            state.type = "UPCOMING_BOOKING";
        },
        [getUpcomingOrders.fulfilled]: (state, action) => {
            state.status = "succeed";
            state.upcomingOrders = action.payload.pageNo ? { ...action.payload.res.data, orders: [...state.upcomingOrders.orders, ...action.payload.res.data.orders] } : action.payload.res.data
            state.type = "UPCOMING_BOOKING";
        },
        [getUpcomingOrders.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.payload.errorMessage;
            state.type = "UPCOMING_BOOKING";
        },

        // Ongoing orders
        [getOngoingOrders.pending]: (state, action) => {
            state.status = "loading";
            state.type = "ONGOING_BOOKING";
        },
        [getOngoingOrders.fulfilled]: (state, action) => {
            state.status = "succeed";
            state.ongoingOrders = action.payload.pageNo ? { ...action.payload.res.data, orders: [...state.ongoingOrders.orders, ...action.payload.res.data.orders] } : action.payload.res.data
            state.type = "ONGOING_BOOKING";
        },
        [getOngoingOrders.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.payload.errorMessage;
            state.type = "ONGOING_BOOKING";
        },

        // Completed orders
        [getCompletedOrders.pending]: (state, action) => {
            state.status = "loading";
            state.type = "COMPLETED_BOOKING";
        },
        [getCompletedOrders.fulfilled]: (state, action) => {
            state.status = "succeed";
            state.completedOrders = action.payload.pageNo ? { ...action.payload.res.data, orders: [...state?.completedOrders.orders, ...action.payload.res.data.orders] } : action.payload.res.data
            state.type = "COMPLETED_BOOKING";
        },
        [getCompletedOrders.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.payload.errorMessage;
            state.type = "COMPLETED_BOOKING";
        },

        // Cancelled orders
        [getCancelledOrders.pending]: (state, action) => {
            state.status = "loading";
            state.type = "CANCELLED_BOOKING";
        },
        [getCancelledOrders.fulfilled]: (state, action) => {
            state.status = "succeed";
            state.cancelledOrders = action.payload.pageNo ? { ...action.payload.res.data, orders: [...state.cancelledOrders.orders, ...action.payload.res.data.orders] } : action.payload.res.data
            state.type = "CANCELLED_BOOKING";
        },
        [getCancelledOrders.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.payload.errorMessage;
            state.type = "CANCELLED_BOOKING";
        },

        // Cancel Order
        [canceleOrder.pending]: (state, action) => {
            state.status = "loading";
            state.type = "CANCEL_ORDER";
        },
        [canceleOrder.fulfilled]: (state, action) => {
            toast.success(orderMsg.cancelOrder)
            state.status = "succeed";
            state.type = "CANCEL_ORDER";
        },
        [canceleOrder.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.payload.errorMessage;
            state.type = "CANCEL_ORDER";
        },

    },
    reducers: {
        setOrder: (state) => {
            state.status = null
            state.type = null
        }
    },
})


export const { setOrder } = OrderSlice.actions
const { reducer } = OrderSlice
export default reducer