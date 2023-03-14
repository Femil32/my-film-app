import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosApi, multipartHeader } from '../../helpers/axios'
import state from './state'

export const uploadPhotoApi = createAsyncThunk(
    'uploadPhotoApi',
    async (formdata, { rejectWithValue }) => {
        try {
            const response = await axiosApi.put(
                '/fbmuser/api/v1/fbmusers/profileimage',
                formdata,
                multipartHeader
            )
            return response
        } catch (error) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    }
)

export const uploadPanCardApi = createAsyncThunk('pan', async (formdata, { rejectWithValue }) => {
    try {
        const response = await axiosApi.put(
            '/fbmuser/api/v1/fbmusers/pan',
            formdata,
            multipartHeader
        )
        return response
    } catch (err) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }
})

export const uploadGstApi = createAsyncThunk(
    'uploadGstApi',
    async (formdata, { rejectWithValue }) => {
        try {
            const response = await axiosApi.put(
                '/fbmuser/api/v1/fbmusers/gst',
                formdata,
                multipartHeader
            )
            return response
        } catch (error) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    }
)

export const putSocialdetail = createAsyncThunk(
    'putSocialdetail',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosApi.put('/fbmuser/api/v1/fbmusers/social-detail', data)
            return response
        } catch (err) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    }
)

export const getSocialdetail = createAsyncThunk(
    'getSocialdetail',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosApi.get('/fbmuser/api/v1/fbmusers/social-detail')
            return response
        } catch (err) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    }
)

// create slice
const social_detail_slice = createSlice({
    name: 'social_detail',
    initialState: state,

    extraReducers: {
        [uploadPhotoApi.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'UPLOAD_PHOTO_API'
        },
        [uploadPhotoApi.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'UPLOAD_PHOTO_API'
            state.profileImg = action.payload.data
        },
        [uploadPhotoApi.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'UPLOAD_PHOTO_API'
            state.error = action.payload
        },
        [uploadPanCardApi.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'UPLOAD_PANCARD_API'
        },
        [uploadPanCardApi.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'UPLOAD_PANCARD_API'
        },
        [uploadPanCardApi.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'UPLOAD_PANCARD_API'
            state.error = action.payload
        },
        [uploadGstApi.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'UPLOAD_GST_API'
        },
        [uploadGstApi.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'UPLOAD_GST_API'
        },
        [uploadGstApi.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'UPLOAD_GST_API'
            state.error = action.payload
        },
        [putSocialdetail.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'SOCICAL_DETAIL_API'
        },
        [putSocialdetail.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'SOCICAL_DETAIL_API'
        },
        [putSocialdetail.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'SOCICAL_DETAIL_API'
            state.error = action.payload
        },
        [getSocialdetail.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'GET_SOCICAL_DETAIL'
        },
        [getSocialdetail.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.socialData = action.payload.data
            state.type = 'GET_SOCICAL_DETAIL'
        },
        [getSocialdetail.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'GET_SOCICAL_DETAIL'
            state.error = action.payload.errorMessage
        },
    },
    reducers: {
        setSocialDetail(state) {
            state.status = null
        },
    },
})

export const { setSocialDetail } = social_detail_slice.actions
const { reducer } = social_detail_slice
export default reducer
