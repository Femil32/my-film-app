import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosApi, multipartHeader } from '../../helpers/axios'
import state from './state'

/**
 *! Seller flow start
 */

export const categoryByPermalinkApi = createAsyncThunk(
    'categoriesAll',
    async (parmilink, { rejectWithValue }) => {
        try {
            const response = await axiosApi.get(
                '/talentmst/api/v1/category/by-permalink?permalink=' + parmilink
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

export const postCrewProfilePhoto = createAsyncThunk(
    'postCrewProfilePhoto',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosApi.post(
                `/crewprofile/api/v1/crewprofiles/${data.id}/profilephoto`,
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

// PUT Api
export const putCrewProfile = createAsyncThunk(
    'putCrewProfile',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await axiosApi.put(
                `/crewprofile/api/v1/crewprofiles/${payload.id}`,
                payload.data
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

export const postCrewPortfolio = createAsyncThunk(
    'postCrewPortfolio',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosApi.post(
                `/crewprofile/api/v1/crewprofiles/${data.id}/portfolio`,
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

export const crewUploadUnionCard = createAsyncThunk(
    'crewUploadUnionCard',
    async (data, { rejectWithValue }) => {
        try {
            const res = axiosApi.put(
                `crewprofile/api/v1/crewprofiles/${data.id}/unioncard`,
                data.formData,
                multipartHeader
            )
            return res
        } catch (err) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    }
)

// Get crew profile photo
export const getCrewProfilePhoto = createAsyncThunk(
    'getCrewProfilePhoto',
    async (crewProfileId, { rejectWithValue }) => {
        try {
            const response = await axiosApi.get(
                `/crewprofile/api/v1/crewprofiles/${crewProfileId}/profilephoto`
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

// Get crew profile Basic Details
export const getCrewProfileBasicDetails = createAsyncThunk(
    'getCrewProfileBasicDetails',
    async (crewProfileId, { rejectWithValue }) => {
        try {
            const response = await axiosApi.get(`/crewprofile/api/v1/crewprofiles/${crewProfileId}`)
            return response
        } catch (error) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    }
)

export const crewRateTerm = createAsyncThunk('crewRateTerm', async (data, { rejectWithValue }) => {
    try {
        const response = await axiosApi.put(
            `crewprofile/api/v1/crewprofiles/${data.id}/rateandterms`,
            data.payload
        )
        return response
    } catch (error) {
        if (!error.response) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }
})

export const getCrewRateTerm = createAsyncThunk(
    'getCrewRateTerm',
    async (crewProfileId, { rejectWithValue }) => {
        try {
            const response = await axiosApi.get(
                `/crewprofile/api/v1/crewprofiles/${crewProfileId}/rateandterms`
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

export const crewRateTermsByProfileId = createAsyncThunk(
    'crewRateTermsByProfileId',
    async (crewProfileId, { rejectWithValue }) => {
        try {
            const res = await axiosApi.get(
                `crewprofile/api/v1/crewprofiles/${crewProfileId}/rateterm-labels`
            )
            return res
        } catch (err) {
            if (!err.response) {
                throw error
            }
            return rejectWithValue(err.response.data)
        }
    }
)

export const crewPortfolioLinks = createAsyncThunk(
    'crewPortfolioLinks',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosApi.put(
                `/crewprofile/api/v1/crewprofiles/${data.id}/portfolio-links`,
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

export const getcrewPortfolioLinks = createAsyncThunk(
    'getcrewPortfolioLinks',
    async (crewProfileId, { rejectWithValue }) => {
        try {
            const response = await axiosApi.get(
                `/crewprofile/api/v1/crewprofiles/${crewProfileId}/portfolio-links`
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

export const getCrewPortfolioPhotos = createAsyncThunk(
    'getCrewPortfolioPhotos',
    async (crewProfileId, { rejectWithValue }) => {
        try {
            const res = await axiosApi.get(
                `/crewprofile/api/v1/crewprofiles/${crewProfileId}/portfolio`
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

export const getCrewVitalDetailsApi = createAsyncThunk(
    'getCrewVitalDetailsApi',
    async (crewProfileId, { rejectWithValue }) => {
        try {
            const response = await axiosApi.get(
                `/crewprofile/api/v1/crewprofiles/${crewProfileId}/credentials`
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
export const delCrewPortfolio = createAsyncThunk(
    'delCrewPortfolio',
    async ({ crewProfileId, index }, { rejectWithValue }) => {
        try {
            const response = await axiosApi.delete(
                `/crewprofile/api/v1/crewprofiles/${crewProfileId}/portfolio/${index}`
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

export const getCrewDynamicFields = createAsyncThunk(
    'getCrewDynamicFields',
    async (crewProfileId, { rejectWithValue }) => {
        try {
            const response = await axiosApi.get(
                `/crewprofile/api/v1/crewprofiles/${crewProfileId}/fields`
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

export const crewProfileCost = createAsyncThunk(
    'crewProfileCost',
    async (crewProfileId, { rejectWithValue }) => {
        try {
            const response = await axiosApi.get(
                `/crewprofile/api/v1/crewprofiles/${crewProfileId}/cost`
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
const crewSlice = createSlice({
    name: 'crew',
    initialState: state,
    extraReducers: {
        /**
         *! Seller flow start
         */
        [categoryByPermalinkApi.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'CATEGORY_API'
        },
        [categoryByPermalinkApi.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'CATEGORY_API'
            state.category = action.payload.data
        },
        [categoryByPermalinkApi.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'CATEGORY_API'
            state.error = action.payload.errorMessage
        },

        [postCrewProfilePhoto.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'POST_CREW_PROFILEPHOTO'
        },
        [postCrewProfilePhoto.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'POST_CREW_PROFILEPHOTO'
        },
        [postCrewProfilePhoto.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'POST_CREW_PROFILEPHOTO'
            state.error = action.error.message
        },

        [putCrewProfile.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'ADD_CREW_PROFILE'
        },
        [putCrewProfile.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'ADD_CREW_PROFILE'
            state.crewBasicDetails = action.payload.data
        },
        [putCrewProfile.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'ADD_CREW_PROFILE'
            state.error = action.error.message
        },

        [getCrewProfilePhoto.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'GET_CREW_PROFILEPHOTO'
        },
        [getCrewProfilePhoto.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'GET_CREW_PROFILEPHOTO'
            state.crewProfilePhoto = action.payload.data
        },
        [getCrewProfilePhoto.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'GET_CREW_PROFILEPHOTO'
        },

        [getCrewProfileBasicDetails.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'GET_CREW_BASIC_DETAILS'
        },
        [getCrewProfileBasicDetails.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'GET_CREW_BASIC_DETAILS'
            state.crewBasicDetails = action.payload.data
        },
        [getCrewProfileBasicDetails.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'GET_CREW_BASIC_DETAILS'
            state.error = action.error.message
            state.crewBasicDetails = {}
        },

        [crewUploadUnionCard.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'PUT_UNION_CARD'
        },
        [crewUploadUnionCard.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'PUT_UNION_CARD'
        },
        [crewUploadUnionCard.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'PUT_UNION_CARD'
            state.error = action.payload.errorMessage
        },

        [crewRateTerm.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.rateAndTerm = action.payload.data
            state.type = 'CREW_RATE_TERM'
        },
        [crewRateTerm.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'CREW_RATE_TERM'
        },
        [crewRateTerm.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.payload.errorMessage
            state.type = 'CREW_RATE_TERM'
        },

        [getCrewRateTerm.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'GET_CREW_RATE_TERM'
        },
        [getCrewRateTerm.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'GET_CREW_RATE_TERM'
            state.rateAndTerm = action.payload.data
        },
        [getCrewRateTerm.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'GET_CREW_RATE_TERM'
            state.rateAndTerm = {}
            state.error = action.payload.errorMessage
        },

        [crewRateTermsByProfileId.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'RATE_TERM_LABLE'
        },
        [crewRateTermsByProfileId.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'RATE_TERM_LABLE'
            state.rateAndTermLabel = action.payload.data
        },
        [crewRateTermsByProfileId.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'RATE_TERM_LABLE'
            state.error = action.payload.errorMessage
        },

        [crewPortfolioLinks.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'PORTFOLIO_LINK_API'
        },
        [crewPortfolioLinks.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'PORTFOLIO_LINK_API'
            state.crew_portfolio_links = action.payload.data
        },
        [crewPortfolioLinks.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'PORTFOLIO_LINK_API'
            state.error = action.payload.errorMessage
        },

        [getCrewPortfolioPhotos.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'GET_PORTFOLIO_PHOTOS'
        },
        [getCrewPortfolioPhotos.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'GET_PORTFOLIO_PHOTOS'
            state.portfolioPhotos = action.payload.data
        },
        [getCrewPortfolioPhotos.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'GET_PORTFOLIO_PHOTOS'
            state.error = action.error.message
        },

        [getCrewVitalDetailsApi.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'GET_VITAL_DETAIL'
        },
        [getCrewVitalDetailsApi.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'GET_VITAL_DETAIL'
            state.vitalDetails = action.payload.data
        },
        [getCrewVitalDetailsApi.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'GET_VITAL_DETAIL'
            state.error = action.payload.errorMessage
        },

        [postCrewPortfolio.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'PORTFOLIO_API'
        },
        [postCrewPortfolio.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'PORTFOLIO_API'
        },
        [postCrewPortfolio.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'PORTFOLIO_API'
            state.error = action.payload.errorMessage
        },

        [delCrewPortfolio.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'DEL_CREW_PORTFOLIO_ID'
        },
        [delCrewPortfolio.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'DEL_CREW_PORTFOLIO_ID'
        },
        [delCrewPortfolio.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'DEL_CREW_PORTFOLIO_ID'
            state.error = action.payload.errorMessage
        },

        [getcrewPortfolioLinks.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'GET_LINKS'
        },
        [getcrewPortfolioLinks.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'GET_LINKS'
            state.crew_portfolio_links = action.payload.data
        },
        [getcrewPortfolioLinks.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'GET_LINKS'
            state.error = action.payload.errorMessage
        },

        [getCrewDynamicFields.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'GET_CREW_DYNAMIC'
        },
        [getCrewDynamicFields.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'GET_CREW_DYNAMIC'
            state.dynamicFields = action.payload.data
        },
        [getCrewDynamicFields.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'GET_CREW_DYNAMIC'
            state.error = action.payload.errorMessage
        },

        [crewProfileCost.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'CREW_COST'
        },
        [crewProfileCost.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'CREW_COST'
            state.crewProfileCost = action.payload.data
        },
        [crewProfileCost.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'CREW_COST'
            state.error = action.payload.errorMessage
        },
    },
    reducers: {
        setCrew(state) {
            state.status = null
            state.type = null
        },
    },
})

export const { setCrew } = crewSlice.actions
const { reducer } = crewSlice
export default reducer
