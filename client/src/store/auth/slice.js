import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit'
import { axiosApi, axiosAuthApi, axiosTestApi } from '../../helpers/axios'
import initialStates from './state'
import { ACCESS_TOKEN, COUNTRY_CODE, FBM_USER_ID, GUEST_TOKEN, MOBILE_NO } from '../../utils/constants'
import { toast } from 'react-toastify'
import { Navigate } from 'react-router-dom'


// guest user
export const guestUserToken = createAsyncThunk('guestUserToken', async (_, { rejectWithValue }) => {
    try {
        const res = await axiosApi.post('fbmuser/guesttoken')
        axiosApi.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`
        return res.data
    } catch (error) {
        if (!error.response) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }
})

// registration status of user
export const registrationStatus = createAsyncThunk('registrationStatus', async (mobileNumber, { rejectWithValue }) => {
    try {
        const res = await axiosApi.get(`/fbmuser/register-status?mobile=${mobileNumber}`)
        return res.data
    } catch (error) {
        if (!error.response) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }
})

// login
// authentication
export const OTPUser = createAsyncThunk('OTPUser', async (data, { rejectWithValue }) => {
    try {
        const response = await axiosAuthApi.post('/authentication/otp', data)
        toast.success('Otp send successfully')
        return response.data
    } catch (error) {
        if (!error.response) {
            throw error
        }
        // We got validation errors, let's return those so we can reference in our component and set form errors
        return rejectWithValue(error.response.data)
    }
})

// OTP
export const authentication = createAsyncThunk('authentication', async (data, { rejectWithValue }) => {
    try {
        const response = await axiosAuthApi.post('/authentication', data)
        return response.data
    } catch (error) {
        if (!error.response) {
            throw error
        }
        // We got validation errors, let's return those so we can reference in our component and set form errors
        return rejectWithValue(error.response.data)
    }
})

// register
export const loginUser = createAsyncThunk('loginUser', async (data, { rejectWithValue }) => {
    try {
        const response = await axiosApi.post('/user/login', data)
        console.log(response);
        if (response.token) {
            axiosTestApi.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
            localStorage.setItem(ACCESS_TOKEN, response.token)
            localStorage.setItem(USER_EMAIL, response.email)
            // localStorage.setItem(COUNTRY_CODE, response.countryCode)
            // localStorage.setItem(FBM_USER_ID, response.fbmUserId)
            // localStorage.removeItem(GUEST_TOKEN)
        }
        return response.data
    } catch (error) {
        if (!error.response) {
            throw error
        }
        // We got validation errors, let's return those so we can reference in our component and set form errors
        return rejectWithValue(error.response.data)
    }
})

// register
export const registerUser = createAsyncThunk('registerUser', async (data, { rejectWithValue }) => {
    try {
        const response = await axiosTestApi.post('/user/register', data)
        console.log(response);
        // localStorage.setItem(FBM_USER_ID, response.data.fbmUserId)
        // localStorage.setItem(ACCESS_TOKEN, response.data.token)
        // localStorage.removeItem(GUEST_TOKEN)
        // if (response.token) {
        //     axiosApi.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
        // }
        return response
    } catch (error) {
        if (!error.response) {
            throw error
        }
        // We got validation errors, let's return those so we can reference in our component and set form errors
        return rejectWithValue(error.response.data)
    }
})

// basic_detail
export const basic_detail = createAsyncThunk('basic-detail', async (data, { rejectWithValue }) => {
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
})


// update profile
export const update_profile = createAsyncThunk('update-profile', async (data, { rejectWithValue }) => {
    try {
        const response = await axiosApi.put('/fbmuser/api/v1/fbmusers', data)
        return response
    } catch (error) {
        if (!error.response) {
            throw error
        }
        // We got validation errors, let's return those so we can reference in our component and set form errors
        return rejectWithValue(error.response.data)
    }
})

// register
export const getUserInfo = createAsyncThunk('getUserInfo', async (_, { rejectWithValue }) => {
    try {
        const response = await axiosApi.get('/fbmuser/api/v1/fbmusers')
        return response
    } catch (error) {
        if (!error.response) {
            throw error
        }
        // We got validation errors, let's return those so we can reference in our component and set form errors
        return rejectWithValue(error.response.data)
    }
})

export const getProfileImg = createAsyncThunk('getProfileImg', async (_, { rejectWithValue }) => {
    try {
        const res = axiosApi.get('/fbmuser/api/v1/fbmusers/profileimage')
        return res
    } catch (error) {
        if (!error.response) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }
})

// create slice
const authSlice = createSlice({
    name: 'auth',
    initialState: initialStates,
    extraReducers: {
        [guestUserToken.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'GUEST_API'
        },
        [guestUserToken.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.guestUserToken = action.payload
            state.type = 'GUEST_API'
        },
        [guestUserToken.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.payload.errorMessage
            state.type = 'GUEST_API'
        },

        [registrationStatus.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'REGISTRATION_STATUS'
        },
        [registrationStatus.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.isUserRegistered = action.payload.registeredUser
            state.type = 'REGISTRATION_STATUS'
        },
        [registrationStatus.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.payload.errorMessage
            state.type = 'REGISTRATION_STATUS'
        },

        [authentication.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'AUTH_API'
        },
        [authentication.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.authData = action.payload
            state.type = 'AUTH_API'
        },
        [authentication.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.payload.error.message
            state.type = 'AUTH_API'
        },

        [OTPUser.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'OTP_API'
        },
        [OTPUser.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.otpData = action.payload
            state.type = 'OTP_API'
        },
        [OTPUser.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.payload.errorMessage
            state.type = 'OTP_API'
        },
        [loginUser.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'LOGIN_API'
        },
        [loginUser.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.loginData = action.payload
            state.type = 'LOGIN_API'
        },
        [loginUser.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.payload.errorMessage
            state.errorTitle = action.payload.errorTitle
            state.type = 'LOGIN_API'
        },
        [registerUser.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'REGISTER_API'
        },
        [registerUser.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.registerData = action.payload
            state.type = 'REGISTER_API'
        },
        [registerUser.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.payload.errorMessage
            state.type = 'REGISTER_API'
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
        [update_profile.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'UPDATE_PROFILE'
        },
        [update_profile.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.updateProfileData = action.payload
            state.type = 'UPDATE_PROFILE'
        },
        [update_profile.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.payload.errorMessage
            state.type = 'UPDATE_PROFILE'
        },
        [getUserInfo.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'USER_INFO'
        },
        [getUserInfo.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.userInfo = action.payload.data
            state.type = 'USER_INFO'
        },
        [getUserInfo.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.payload.errorMessage
            state.type = 'USER_INFO'
        },
        [getProfileImg.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'PROFILE_IMG'
        },
        [getProfileImg.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.profileImg = action.payload.data
            state.type = 'PROFILE_IMG'
        },
        [getProfileImg.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.payload.errorMessage
            state.type = 'PROFILE_IMG'
        },
    },
    reducers: {
        setAuth(state) {
            state.status = null
            state.type = null
        },
    },
})

export const { setAuth } = authSlice.actions
const { reducer } = authSlice
export default reducer
