import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosApi } from "../../helpers/axios";
import state from "./state";
//

export const getAllSpotDeals = createAsyncThunk(
    'getAllSpotDeals',
    async (pageNo, { rejectWithValue }) => {
        try {
            const res = await axiosApi.get(`/coupon/api/v1/spotdeals/all?pageNo=${pageNo}`)
            return res.data
        } catch (error) {
            if (!error) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    }
)

export const getSpotDealCode = createAsyncThunk(
    'getSpotDealCode',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosApi.get(`/coupon/api/v1/spotdeals/spotdeal-code`)
            return res.data
        } catch (error) {
            if (!error) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    }
)

export const saveSpotDeal = createAsyncThunk('saveSpotDeal', async (data, { rejectWithValue }) => {
    try {
        const res = await axiosApi.post(`/coupon/api/v1/spotdeals`, data)
        return res.data
    } catch (error) {
        if (!error) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }
})

export const getUpcomingSpotDeals = createAsyncThunk(
    'getUpcomingSpotDeals',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosApi.get(`/coupon/api/v1/spotdeals/upcoming`)
            return res.data
        } catch (error) {
            if (!error) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    }
)

export const getCompletedSpotDeals = createAsyncThunk(
    'getCompletedSpotDeals',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosApi.get(`/coupon/api/v1/spotdeals/completed`)
            return res.data
        } catch (error) {
            if (!error) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    }
)

export const deleteSpotDeal = createAsyncThunk(
    'deleteSpotDeal',
    async (spotDealId, { rejectWithValue }) => {
        try {
            const res = await axiosApi.delete(`/coupon/api/v1/spotdeals/${spotDealId}`)
            return res.data
        } catch (error) {
            if (!error) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    }
)

export const editSpotDeal = createAsyncThunk('editSpotDeal', async (data, { rejectWithValue }) => {
    try {
        const res = await axiosApi.put(`/coupon/api/v1/spotdeals/${data.id}`, data.payload)
        return res.data
    } catch (error) {
        if (!error) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }
})

export const getSingleSpotDeal = createAsyncThunk(
    'getSingleSpotDeal',
    async (id, { rejectWithValue }) => {
        try {
            const res = await axiosApi.get(`/coupon/api/v1/spotdeals/${id}`)
            return res.data
        } catch (error) {
            if (!error) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    }
)

const spotDealsSlice = createSlice({
    name: 'spotDealsSlice',
    initialState: state,
    extraReducers: {
        [getAllSpotDeals.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'GET_ALL_SPOT_DEALS'
        },
        [getAllSpotDeals.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'GET_ALL_SPOT_DEALS'
            state.allSpotDeals = action.payload
        },
        [getAllSpotDeals.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'GET_ALL_SPOT_DEALS'
            state.error = action.payload
        },

        [getSpotDealCode.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'GET_SPOT_DEAL_CODE'
        },
        [getSpotDealCode.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'GET_SPOT_DEAL_CODE'
            state.newSpotDealCode = action.payload
        },
        [getSpotDealCode.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'GET_SPOT_DEAL_CODE'
            state.error = action.payload
        },

        [saveSpotDeal.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'SAVE_SPOT_DEAL'
        },
        [saveSpotDeal.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'SAVE_SPOT_DEAL'
            state.saveSpotDeal = action.payload
        },
        [saveSpotDeal.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'SAVE_SPOT_DEAL'
            state.error = action.payload
        },
        [getUpcomingSpotDeals.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'GET_UPCOMING_SPOT_DEALS'
        },
        [getUpcomingSpotDeals.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'GET_UPCOMING_SPOT_DEALS'
            state.allUpcomingDeals = action.payload
        },
        [getUpcomingSpotDeals.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'GET_UPCOMING_SPOT_DEALS'
            state.error = action.payload
        },
        [getCompletedSpotDeals.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'GET_COMPLETED_SPOT_DEALS'
        },
        [getCompletedSpotDeals.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'GET_COMPLETED_SPOT_DEALS'
            state.allCompletedDeals = action.payload
        },
        [getCompletedSpotDeals.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'GET_COMPLETED_SPOT_DEALS'
            state.error = action.payload
        },
        [deleteSpotDeal.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'DELETE_SPOT_DEAL'
        },
        [deleteSpotDeal.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'DELETE_SPOT_DEAL'
            state.deleteDeal = action.payload
        },
        [deleteSpotDeal.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'DELETE_SPOT_DEAL'
            state.error = action.payload
        },
        [editSpotDeal.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'EDIT_SPOT_DEAL'
        },
        [editSpotDeal.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'EDIT_SPOT_DEAL'
            state.editedDeal = action.payload
        },
        [editSpotDeal.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'EDIT_SPOT_DEAL'
            state.error = action.payload
        },
        [getSingleSpotDeal.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'SINGLE_SPOT_DEAL'
        },
        [getSingleSpotDeal.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'SINGLE_SPOT_DEAL'
            state.singleDeal = action.payload
        },
        [getSingleSpotDeal.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'SINGLE_SPOT_DEAL'
            state.error = action.payload
        },
    },
    reducers: {
        setSpotDeals: state => {
            state.status = null
            state.error = null
            state.type = null
        },
        setSingleSpotDeal: state => {
            state.status = null
            state.error = null
            state.type = null
            state.singleDeal = null
        },
    },
})


export const { setSpotDeals, setSingleSpotDeal } = spotDealsSlice.actions
export default spotDealsSlice.reducer
