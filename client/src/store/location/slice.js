import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosApi, multipartHeader } from '../../helpers/axios'
import state from './state'

export const countriesApi = createAsyncThunk('countries', async (_, { rejectWithValue }) => {
    try {
        const response = await axiosApi.get('/addressmst/api/v1/countries')
        return response
    } catch (error) {
        if (!error.response) {
            throw error
        }
        // We got validation errors, let's return those so we can reference in our component and set form errors
        return rejectWithValue(error.response.data)
    }
})

export const stateApi = createAsyncThunk('state', async (countryId, { rejectWithValue }) => {
    try {
        const response = await axiosApi.get(`/addressmst/api/v1/states?countryId=${countryId}`)
        return response
    } catch (error) {
        if (!error.response) {
            throw error
        }
        // We got validation errors, let's return those so we can reference in our component and set form errors
        return rejectWithValue(error.response.data)
    }
})

export const cityApi = createAsyncThunk('city', async (stateId, { rejectWithValue }) => {
    try {
        const response = await axiosApi.get('/addressmst/api/v1/cities?stateId=' + stateId)
        return response
    } catch (error) {
        if (!error.response) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }
})

export const locationhubApi = createAsyncThunk('location_hub', async (_, { rejectWithValue }) => {
    try {
        const response = await axiosApi.get('/addressmst/api/v1/regions')
        return response
    } catch (error) {
        if (!error.response) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }
})

export const setAddressApi = createAsyncThunk('address', async (data, { rejectWithValue }) => {
    try {
        const response = await axiosApi.put('/fbmuser/api/v1/fbmusers/address', data)
        return response
    } catch (error) {
        if (!error.response) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }
})

export const profilephotoApi = createAsyncThunk(
    'profilephoto',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosApi.post(
                `/locationprofile/api/v1/locations/${data.id}/profilephoto`,
                data.profile,
                multipartHeader
            )
            return response
        } catch (err) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    }
)

export const locationProfileApi = createAsyncThunk(
    'location-profile',
    async (profileId, { rejectWithValue }) => {
        try {
            const response = await axiosApi.get('/locationprofile/api/v1/locations/' + profileId)
            return response
        } catch (err) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    }
)

export const createLocationAddresDetailApi = createAsyncThunk(
    'location-address',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosApi.put(
                `/locationprofile/api/v1/locations/${data.profileId}/address`,
                data.address_detail
            )
            return response
        } catch (err) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    }
)

export const createLocationBasicDetailApi = createAsyncThunk(
    'locations-basicdetail',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosApi.put(
                `/locationprofile/api/v1/locations/${data.id}`,
                data.data
            )
            return response
        } catch (err) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    }
)

export const postLocationPortfolio = createAsyncThunk(
    'postLocationPortfolio',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosApi.post(
                `/locationprofile/api/v1/locations/${data.id}/portfolio`,
                data.formData,
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

export const locationPortfolioLinks = createAsyncThunk(
    'locationPortfolioLinks',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosApi.put(
                `/locationprofile/api/v1/locations/${data.id}/portfolio-links`,
                data.links
            )

            return response
        } catch (err) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    }
)

export const getLocationPortfolioLinks = createAsyncThunk(
    'getLocationPortfolioLinks',
    async (locationProfileId, { rejectWithValue }) => {
        try {
            const response = await axiosApi.get(
                `locationprofile/api/v1/locations/${locationProfileId}/portfolio-links`
            )
            return response
        } catch (err) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    }
)

export const postLocationProfilePhotos = createAsyncThunk(
    'postLocationProfilePhotos',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosApi.post(
                `locationprofile/api/v1/locations/${data.id}/portfolio`,
                data.formData,
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

export const locationRateTerm = createAsyncThunk(
    'locationRateTerm',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosApi.post(
                `/locationprofile/api/v1/locations/${data.id}/rateandterms`,
                data.payload
            )
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

export const locationRateTermsByProfileId = createAsyncThunk(
    'locationRateTermsByProfileId',
    async (locationProfileId, { rejectWithValue }) => {
        try {
            const res = await axiosApi.get(
                `/locationprofile/api/v1/locations/rateterm-labels?profileType=${locationProfileId}`
            )
            return res
        } catch (err) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    }
)

// get location profile photo
export const getLocationProfilePhoto = createAsyncThunk(
    'getLocationProfilePhoto',
    async (locationProfileId, { rejectWithValue }) => {
        try {
            const response = await axiosApi.get(
                `/locationprofile/api/v1/locations/${locationProfileId}/profilephoto`
            )
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

// Get location profile Basic Details
export const getLocationProfileBasicDetails = createAsyncThunk(
    'getLocationProfileBasicDetails',
    async (locationProfileId, { rejectWithValue }) => {
        try {
            const response = await axiosApi.get(
                `/locationprofile/api/v1/locations/${locationProfileId}`
            )
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

// Get ADDRESS
export const getLocationAddressById = createAsyncThunk(
    'getLocationAddressById',
    async (addressData, { rejectWithValue }) => {
        try {
            const response = await axiosApi.get(
                `/addressmst/api/v1/address/by-id?stateId=${addressData.stateId}&countryId=${addressData.countryId}&cityId=${addressData.cityId}`
            )
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

// location RateTerm
export const getLocationRateTerm = createAsyncThunk(
    'getLocationRateTerm',
    async (locationProfileId, { rejectWithValue }) => {
        try {
            const response = await axiosApi.get(
                `/locationprofile/api/v1/locations/${locationProfileId}/rateandterms`
            )
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

export const getLocationPortfolioPhotos = createAsyncThunk(
    'getLocationPortfolioPhotos',
    async (locationProfileId, { rejectWithValue }) => {
        try {
            const res = await axiosApi.get(
                `/locationprofile/api/v1/locations/${locationProfileId}/portfolio`
            )
            return res
        } catch (err) {
            if (!err) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    }
)

// get vital detail
export const getLocationVitalDetailsApi = createAsyncThunk(
    'getLocationVitalDetailsApi',
    async (locationProfileId, { rejectWithValue }) => {
        try {
            const response = await axiosApi.get(
                `/locationprofile/api/v1/locations/${locationProfileId}/credentials`
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

// get vital detail
export const delLocationPortfolio = createAsyncThunk(
    'delLocationPortfolio',
    async ({ locationProfileId, index }, { rejectWithValue }) => {
        try {
            const response = await axiosApi.delete(
                `/locationprofile/api/v1/locations/${locationProfileId}/portfolio/${index}`
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

export const locationProfileCost = createAsyncThunk(
    'locationProfileCost',
    async (locationProfileId, { rejectWithValue }) => {
        try {
            const response = await axiosApi.get(
                `/locationprofile/api/v1/locations/${locationProfileId}/cost`
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

// create slice
const locationSlice = createSlice({
    name: 'location',
    initialState: state,
    extraReducers: {
        [countriesApi.pending]: (state, action) => {
            // state.status = 'loading'
            state.type = 'COUNTRIES_API'
        },
        [countriesApi.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'COUNTRIES_API'
            state.country = action.payload.data
        },
        [countriesApi.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'COUNTRIES_API'
            state.error = action.payload.errorMessage
        },
        [stateApi.pending]: (state, action) => {
            state.type = 'STATES_API'
            state.status = 'loading'
        },
        [stateApi.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'STATES_API'
            state.state = action.payload.data
        },
        [stateApi.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'STATES_API'
            state.error = action.payload.errorMessage
        },
        [cityApi.pending]: (state, action) => {
            state.type = 'CITIES_API'
            state.status = 'loading'
        },
        [cityApi.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'CITIES_API'
            state.city = action.payload.data
        },
        [cityApi.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'CITIES_API'
            state.error = action.payload.errorMessage
        },
        [locationhubApi.pending]: (state, action) => {
            state.type = 'LOCATIONHUB_API'
            state.status = 'loading'
        },
        [locationhubApi.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'LOCATIONHUB_API'
            state.locationhub = action.payload.data
        },
        [locationhubApi.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'LOCATIONHUB_API'
            state.error = action.payload.errorMessage
        },
        [profilephotoApi.pending]: (state, action) => {
            state.type = 'PROFILE_API'
            // state.status = 'loading'
        },
        [profilephotoApi.fulfilled]: (state, action) => {
            state.type = 'PROFILE_API'
            state.status = 'succeed'
        },
        [profilephotoApi.rejected]: (state, action) => {
            state.type = 'PROFILE_API'
            state.status = 'failed'
            state.error = action.payload.errorMessage
        },

        [setAddressApi.pending]: (state, action) => {
            state.type = 'SET_ADDRESS_API'
            state.status = 'loading'
        },
        [setAddressApi.fulfilled]: (state, action) => {
            state.type = 'SET_ADDRESS_API'
            state.status = 'succeed'
            state.address = action.payload.data
        },
        [setAddressApi.rejected]: (state, action) => {
            state.type = 'SET_ADDRESS_API'
            state.status = 'failed'
            state.error = action.payload
        },
        [locationProfileApi.pending]: (state, action) => {
            state.type = 'LOCATION_PROFILE_API'
            state.status = 'loading'
        },
        [locationProfileApi.fulfilled]: (state, action) => {
            state.type = 'LOCATION_PROFILE_API'
            state.status = 'succeed'
            state.location_profile = action.payload.data
        },
        [locationProfileApi.rejected]: (state, action) => {
            state.type = 'LOCATION_PROFILE_API'
            state.status = 'failed'
            state.error = action.payload.errorMessage
        },
        [createLocationBasicDetailApi.pending]: (state, action) => {
            state.type = 'LOCATION_BASIC_DETAIL_API'
            state.status = 'loading'
        },
        [createLocationBasicDetailApi.fulfilled]: (state, action) => {
            state.type = 'LOCATION_BASIC_DETAIL_API'
            state.status = 'succeed'
            state.location_profile = action.payload.data
        },
        [createLocationBasicDetailApi.rejected]: (state, action) => {
            state.type = 'LOCATION_BASIC_DETAIL_API'
            state.status = 'failed'
            state.error = action.payload.errorMessage
        },
        [createLocationAddresDetailApi.pending]: (state, action) => {
            state.type = 'LOCATION_ADDRESS_DETAIL_API'
            state.status = 'loading'
        },
        [createLocationAddresDetailApi.fulfilled]: (state, action) => {
            state.type = 'LOCATION_ADDRESS_DETAIL_API'
            state.status = 'succeed'
            state.location_profile = action.payload.data
        },
        [createLocationAddresDetailApi.rejected]: (state, action) => {
            state.type = 'LOCATION_ADDRESS_DETAIL_API'
            state.status = 'failed'
            state.error = action.payload.errorMessage
        },

        [locationPortfolioLinks.pending]: (state, action) => {
            state.type = 'PORTFOLIO_LINK_API'
            state.status = 'loading'
        },
        [locationPortfolioLinks.fulfilled]: (state, action) => {
            state.type = 'PORTFOLIO_LINK_API'
            state.status = 'succeed'
            state.location_portfolio_links = action.payload.data
        },
        [locationPortfolioLinks.rejected]: (state, action) => {
            state.type = 'PORTFOLIO_LINK_API'
            state.status = 'failed'
            state.error = action.payload.errorMessage
        },
        [postLocationProfilePhotos.pending]: (state, action) => {
            state.type = 'POST_LOCATION_PROFILEPHOTOS'
            state.status = 'loading'
        },
        [postLocationProfilePhotos.fulfilled]: (state, action) => {
            state.type = 'POST_LOCATION_PROFILEPHOTOS'
            state.status = 'succeed'
        },
        [postLocationProfilePhotos.rejected]: (state, action) => {
            state.type = 'POST_LOCATION_PROFILEPHOTOS'
            state.status = 'failed'
            state.error = action.payload.errorMessage
        },

        [locationRateTerm.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'LOCATION_RATE_TERM'
        },
        [locationRateTerm.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'LOCATION_RATE_TERM'
            state.rateAndTerm = action.payload.data
        },
        [locationRateTerm.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'LOCATION_RATE_TERM'
            state.error = action.payload.errorMessage
        },

        [locationRateTermsByProfileId.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'RATE_TERM_LABLE'
        },
        [locationRateTermsByProfileId.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'RATE_TERM_LABLE'
            state.rateAndTermLabel = action.payload.data
        },
        [locationRateTermsByProfileId.rejected]: (state, action) => {
            state.status = 'succeed'
            state.type = 'RATE_TERM_LABLE'
            state.error = action.payload.errorMessage
        },

        [getLocationProfilePhoto.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'GET_LOCATION_PROFILEPHOTO'
        },
        [getLocationProfilePhoto.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'GET_LOCATION_PROFILEPHOTO'
            state.locationProfilePhoto = action.payload.data
        },
        [getLocationProfilePhoto.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'GET_LOCATION_PROFILEPHOTO'
            state.error = action.error.message
        },

        [getLocationProfileBasicDetails.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'GET_LOCATION_BASIC_DETAILS'
        },
        [getLocationProfileBasicDetails.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'GET_LOCATION_BASIC_DETAILS'
            state.locationBasicDetails = action.payload.data
        },
        [getLocationProfileBasicDetails.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'GET_LOCATION_BASIC_DETAILS'
            state.error = action.error.message
        },

        [getLocationAddressById.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'GET_LOCATION_ADDRESS_DETAILS'
        },
        [getLocationAddressById.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'GET_LOCATION_ADDRESS_DETAILS'
            state.profileAddress = action.payload.data
        },
        [getLocationAddressById.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'GET_LOCATION_ADDRESS_DETAILS'
            state.error = action.error.message
        },

        [getLocationRateTerm.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'GET_LOCATION_RATE_TERM'
        },
        [getLocationRateTerm.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'GET_LOCATION_RATE_TERM'
            state.rateAndTerm = action.payload.data
        },
        [getLocationRateTerm.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'GET_LOCATION_RATE_TERM'
            state.error = action.payload.errorMessage
        },

        [getLocationPortfolioPhotos.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'GET_PORTFOLIO_PHOTOS'
        },
        [getLocationPortfolioPhotos.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'GET_PORTFOLIO_PHOTOS'
            state.portfolioPhotos = action.payload.data
        },
        [getLocationPortfolioPhotos.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'GET_PORTFOLIO_PHOTOS'
            state.error = action.error.message
        },

        [getLocationVitalDetailsApi.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'GET_VITAL_DETAIL'
        },
        [getLocationVitalDetailsApi.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'GET_VITAL_DETAIL'
            state.vitalDetails = action.payload.data
        },
        [getLocationVitalDetailsApi.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'GET_VITAL_DETAIL'
            state.error = action.payload.errorMessage
        },

        [postLocationPortfolio.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'PORTFOLIO_API'
        },
        [postLocationPortfolio.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'PORTFOLIO_API'
        },
        [postLocationPortfolio.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'PORTFOLIO_API'
            state.error = action.payload.errorMessage
        },

        [delLocationPortfolio.pending]: (state, action) => {
            // state.status = 'loading'
            state.type = 'DEL_LOCATION_PORTFOLIO_ID'
        },
        [delLocationPortfolio.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'DEL_LOCATION_PORTFOLIO_ID'
        },
        [delLocationPortfolio.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'DEL_LOCATION_PORTFOLIO_ID'
            state.error = action.payload.errorMessage
        },

        [getLocationPortfolioLinks.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'GET_LINKS'
        },
        [getLocationPortfolioLinks.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'GET_LINKS'
            state.location_portfolio_links = action.payload.data
        },
        [getLocationPortfolioLinks.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'GET_LINKS'
            state.error = action.payload.errorMessage
        },

        [locationProfileCost.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'LOCATION_COST'
        },
        [locationProfileCost.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'LOCATION_COST'
            state.locationProfileCost = action.payload.data
        },
        [locationProfileCost.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'LOCATION_COST'
            state.error = action.payload.errorMessage
        },
    },
    reducers: {
        setLocation(state) {
            state.status = null
            state.type = null
        },
    },
})

export const { setLocation } = locationSlice.actions
const { reducer } = locationSlice
export default reducer
