import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosApi } from '../../helpers/axios'
import state from './state'

export const getRequestedAvailability = createAsyncThunk('getRequestedAvailability', async ({ currrentPage, status }, { rejectWithValue }) => {
    try {
        const res = axiosApi.get(`/order/api/v1/profile/avlcheck/orders?requestStatus=${status}&pageNo=${currrentPage}`)
        return res
    } catch (error) {
        if (!error) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }
})


export const getRequestedAvailabilityById = createAsyncThunk('getRequestedAvailability', async (avlCheckId, { rejectWithValue }) => {
    try {
        const res = axiosApi.get(`/order/api/v1/profile/avlcheck/orders/${avlCheckId}`)
        return res
    } catch (error) {
        if (!error) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }
})


export const updateNegotiate = createAsyncThunk('negotiat', async ({ profileOrderId, data }, { rejectWithValue }) => {
    try {
        const res = axiosApi.put(`/order/api/v1/profile/standardterm/${profileOrderId}/negotiate`, data)
        return res
    } catch (error) {
        if (!error) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }
})



const requestedAvailabilitySlice = createSlice({
    name: 'requestedavailability',
    initialState: state,
    extraReducers: {
        [getRequestedAvailability.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'GET_ALL_REQUEST_AVAILIBLITY'
        },
        [getRequestedAvailability.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'GET_ALL_REQUEST_AVAILIBLITY'
            state.allRequestAvailability = action.payload.data
        },
        [getRequestedAvailability.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'GET_ALL_REQUEST_AVAILIBLITY'
            state.error = action.payload.errorMessage
        },
        [updateNegotiate.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'UPDATE_NEGOTIATE'
        },
        [updateNegotiate.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'UPDATE_NEGOTIATE'
            state.updateNegotiate = action.payload.data
        },
        [updateNegotiate.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'UPDATE_NEGOTIATE'
            state.error = action.payload.errorMessage
        },
        [getRequestedAvailabilityById.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'GET_REQUEST_AVAILIBLITY_BY_ID'
        },
        [getRequestedAvailabilityById.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.requestAvailabilityById = action.payload.data
            state.type = 'GET_REQUEST_AVAILIBLITY_BY_ID'
        },
        [getRequestedAvailabilityById.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'GET_REQUEST_AVAILIBLITY_BY_ID'
            state.error = action.payload.errorMessage
        },
    },
    reducers: {
        setRequestedAvailability: state => {
            state.status = null
            state.type = null
        },
        setBookProfile: (state, action) => {
            state.bookProfile = action.payload
        }
    },
})

export const { setRequestedAvailability, setBookProfile } = requestedAvailabilitySlice.actions
const { reducer } = requestedAvailabilitySlice
export default reducer
