import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { axiosApi } from "../../helpers/axios";
import state from "./state";

export const getNegotiationRequests = createAsyncThunk('requestStatusConfirmed', async (_, { rejectWithValue }) => {
    try {
        const res = axiosApi.get(`/order/api/v1/profile/negotiation/orders?requestStatus=pending`)
        return res
    } catch (error) {
        if (!error.response) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }
})

export const acceptNegotiationRequests = createAsyncThunk('acceptNegotiationRequests', async (profileOrderId, { rejectWithValue }) => {
    try {
        const res = await axiosApi.put(`/order/api/v1/profile/bookings/${profileOrderId}/accept`)
        toast.success("Negotiation Requests Accept Successful")
        return res.data
    } catch (error) {
        if (!error.response) {
            throw error
        }
        toast.error(error.response.data.errorMessage)
        return rejectWithValue(error.response.data)
    }
})

const negotiationRequestsSlice = createSlice({
    name: 'negotiationRequestsSlice',
    initialState: state,
    extraReducers: {
        // get Negotiation Requests
        [getNegotiationRequests.pending]: (state) => {
            state.status = 'loading'
            state.type = 'GET_NEGOTIATION_REQUESTS'
        },
        [getNegotiationRequests.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.GetNegotiationRequests = action.payload.data
            state.type = 'GET_NEGOTIATION_REQUESTS'
        },
        [getNegotiationRequests.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'GET_NEGOTIATION_REQUESTS'
            state.error = action.payload
        },
        // accept Negotiation Requests
        [acceptNegotiationRequests.pending]: (state) => {
            state.status = 'loading'
            state.type = 'ACCEPT_NEGOTIATION_REQUESTS'
        },
        [acceptNegotiationRequests.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.GetNegotiationRequests = action.payload.data
            state.type = 'ACCEPT_NEGOTIATION_REQUESTS'
        },
        [acceptNegotiationRequests.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'ACCEPT_NEGOTIATION_REQUESTS'
            state.error = action.payload
        },
    },
})

const { reducer } = negotiationRequestsSlice
export default reducer