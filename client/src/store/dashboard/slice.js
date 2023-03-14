import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit'
import state from './state'
import { axiosApi } from '../../helpers/axios'
import { ACCESS_TOKEN } from './../../utils/constants'

export const dashboardApi = createAsyncThunk('dashboard', async (_, { rejectWithValue }) => {
    try {
        const response = await axiosApi.get('/dashboard/api/v1/dashboard')
        return response
    } catch (err) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }
})

// basic_detail
export const basic_detail = createAsyncThunk(
    'basic-detail-api',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosApi.put('/fbmuser/api/v1/fbmusers/basic-detail', data)
            return response
        } catch (error) {
            if (!error.response) {
                throw error
            }
            // We got validation errors, let's return those so we can reference in our component and set form errors
            return rejectWithValue(error.response.data)
        }
    }
)

// put profiles
export const AddProfiles = createAsyncThunk(
    'AddProfiles',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosApi.put('/fbmuser/api/v1/fbmusers/addprofiles', data)
            return response
        } catch (error) {
            if (!error.response) {
                throw error
            }
            // We got validation errors, let's return those so we can reference in our component and set form errors
            return rejectWithValue(error.response.data)
        }
    }
)

// create slice
const dashboard_slice = createSlice({
    name: 'dashboard',
    initialState: state,
    extraReducers: {
        [dashboardApi.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'DASHBOARD_API'
        },
        [dashboardApi.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'DASHBOARD_API'
            state.dashboard = action.payload.data
        },
        [dashboardApi.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'DASHBOARD_API'
            state.error = action.payload.errorMessage
        },
        [basic_detail.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'BASIC_DETAIL'
        },
        [basic_detail.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.basicDetailData = action.payload
            state.type = 'BASIC_DETAIL'
        },
        [basic_detail.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.payload.errorMessage
            state.type = 'BASIC_DETAIL'
        },

        // add profiles
        [AddProfiles.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'ADD_PROFILES'
        },
        [AddProfiles.fulfilled]: (state, action) => {
            state.status = 'succeed'
            // state.basicDetailData = action.payload
            state.type = 'ADD_PROFILES'
        },
        [AddProfiles.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.payload.errorMessage
            state.type = 'ADD_PROFILES'
        },
    },
    reducers: {
        setDashboard(state) {
            state.status = null
        },
    },
})

export const { setDashboard } = dashboard_slice.actions
const { reducer } = dashboard_slice
export default reducer
