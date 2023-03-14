import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { axiosApi } from "../../helpers/axios";
import state from "./state";

// POST NEW REVIEW
export const postReview = createAsyncThunk('postReview', async (payload, { rejectWithValue }) => {
    try {
        const res = axiosApi.post(`/review/api/v1/reviews`, payload)
        return res.data
    } catch (error) {
        if (!error.response) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }
})

export const getReviewReceivedList = createAsyncThunk('reviewreceived', async (_, { rejectWithValue }) => {
    try {
        const res = axiosApi.get(`/review/api/v1/reviews/received`)
        return res
    } catch (error) {
        if (!error.response) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }
})

export const getReviewGivenList = createAsyncThunk('reviewgiven', async (_, { rejectWithValue }) => {
    try {
        const res = axiosApi.get(`/review/api/v1/reviews/given`)
        return res
    } catch (error) {
        if (!error.response) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }
})


const reviewSlice = createSlice({
    name: 'review',
    initialState: state,
    extraReducers: {
        // post review
        [postReview.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'POST_REVIEW'
        },
        [postReview.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.receivedReviewlist = action.payload.data
            state.type = 'POST_REVIEW'
        },
        [postReview.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'POST_REVIEW'
            state.error = action.payload.errorMessage
        },

        // get review received
        [getReviewReceivedList.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'GET_REVIEW_RECEVIVED'
        },
        [getReviewReceivedList.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.receivedReviewlist = action.payload.data
            state.type = 'GET_REVIEW_RECEVIVED'
        },
        [getReviewReceivedList.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'GET_REVIEW_RECEVIVED'
            state.error = action.payload.errorMessage
        },

        // get review given
        [getReviewGivenList.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'GET_REVIEW_GIVEN'
        },

        [getReviewGivenList.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.givenReviewlist = action.payload.data
            state.type = 'GET_REVIEW_GIVEN'
        },

        [getReviewGivenList.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'GET_REVIEW_GIVEN'
            state.error = action.payload.errorMessage
        },

    },
    reducers: {
        setReview: (state) => {
            state.status = null
            state.type = null
            state.error = null
        },
        setReviewData: (state, action) => {
            state.reviewData = { ...state.reviewData, ...action.payload }
        }
    },
})


export const { setReview, setReviewData } = reviewSlice.actions
const { reducer } = reviewSlice
export default reducer