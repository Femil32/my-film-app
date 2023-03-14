import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosApi } from "../../helpers/axios";
import state from "./state";

export const requestStatusConfirmed = createAsyncThunk('requestStatusConfirmed', async (_, { rejectWithValue }) => {
    try {
        const res = axiosApi.get(`/order/api/v1/profile/avlcheck/orders?requestStatus=accepted`)
        return res
    } catch (error) {
        if (!error.response) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }
})


const futurePaymentsSlice = createSlice({
    name: 'futurePaymentsSlice',
    initialState: state,
    extraReducers: {
        // future Payments
        [requestStatusConfirmed.pending]: (state) => {
            state.status = 'loading'
            state.type = 'fUTURE_PAYMENT'
        },
        [requestStatusConfirmed.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.FuturePaymentsSlice = action.payload.data
            state.type = 'fUTURE_PAYMENT'
        },
        [requestStatusConfirmed.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'fUTURE_PAYMENT'
            state.error = action.payload
        },
    },
})

const { reducer } = futurePaymentsSlice
export default reducer