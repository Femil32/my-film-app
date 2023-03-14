import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosApi } from '../../helpers/axios'
import state from './state'

export const getGlobalBookingAcceptedlist = createAsyncThunk('getGlobalBookingAcceptedlist', async (_, { rejectWithValue }) => {
    try {
        const res = axiosApi.get(`/order/api/v1/profile/bookings/listing?requestStatus=accepted`)
        return res
    } catch (error) {
        if (!error) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }
})

export const getAllBookingRequestlist = createAsyncThunk('getAllRequestedlist', async ({ status, currrentPage }, { rejectWithValue }) => {
    try {
        const res = axiosApi.get(`/order/api/v1/profile/bookings?requestStatus=${status}&pageNo=${currrentPage}`)
        return res
    } catch (error) {
        if (!error) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }
})

export const acceptBookingRequest = createAsyncThunk('AcceptBookingRequest', async (id, { rejectWithValue }) => {
    try {
        const res = await axiosApi.put(`/order/api/v1/profile/bookings/${id}/accept`)
        toast.success("Order Accept Successfull")
        return res.data
    } catch (error) {
        if (!error.response) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }
})

export const rejectBookingRequest = createAsyncThunk('RejectBookingRequest', async (id, { rejectWithValue }) => {
    try {
        const res = await axiosApi.put(`/order/api/v1/profile/bookings/${id}/reject`)
        toast.success("Order Reject Successfull")
        return res.data
    } catch (error) {
        if (!error.response) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }
})



const sellerBookingRequestSlice = createSlice({
    name: 'sellerbookingrequest',
    initialState: state,
    extraReducers: {
        [getGlobalBookingAcceptedlist.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'GET_GLOBAL_BOOKING_REQUEST'
        },
        [getGlobalBookingAcceptedlist.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'GET_GLOBAL_BOOKING_REQUEST'
            state.getGlobalRequestList = action.payload.data
        },
        [getGlobalBookingAcceptedlist.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'GET_GLOBAL_BOOKING_REQUEST'
            state.error = action.payload.errorMessage
        },

        [getAllBookingRequestlist.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'GET_ALL_BOOKING_REQUEST'
        },
        [getAllBookingRequestlist.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'GET_ALL_BOOKING_REQUEST'
            state.getAllRequestList = action.payload.data
        },
        [getAllBookingRequestlist.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'GET_ALL_BOOKING_REQUEST'
            state.error = action.payload.errorMessage
        },

        [acceptBookingRequest.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'ACCEPT_BOOKING_REQUEST'
        },
        [acceptBookingRequest.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'ACCEPT_BOOKING_REQUEST'
        },
        [acceptBookingRequest.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'ACCEPT_BOOKING_REQUEST'
            state.error = action.payload.errorMessage
        },

        [rejectBookingRequest.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'REJECT_BOOKING_REQUEST'
        },
        [rejectBookingRequest.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'REJECT_BOOKING_REQUEST'
        },
        [rejectBookingRequest.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'REJECT_BOOKING_REQUEST'
            state.error = action.payload.errorMessage
        },
    },
    reducers: {
        setSellerBookingRequest: state => {
            state.status = null
            state.type = null
        }
    },
})

export const { setSellerBookingRequest } = sellerBookingRequestSlice.actions
const { reducer } = sellerBookingRequestSlice
export default reducer
