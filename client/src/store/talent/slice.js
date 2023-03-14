import { createSlice, createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit'
import state from './state'
import { axiosApi, multipartHeader } from '../../helpers/axios'

export const genresApi = createAsyncThunk(
    'genresapiTalant',
    async (categoryId, { rejectWithValue }) => {
        try {
            const response = await axiosApi.get(
                '/talentmst/api/v1/genres?subCategoryId=' + categoryId
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

export const categoryByPermalinkApi = createAsyncThunk(
    'categoryapi',
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
            // We got validation errors, let's return those so we can reference in our component and set form errors
            return rejectWithValue(error.response.data)
        }
    }
)

export const vitalDetailsApi = createAsyncThunk(
    'vitalDetailsApi',
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await axiosApi.put(
                `/userprofile/api/v1/userprofiles/${id}/credentials`,
                data
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
export const getVitalDetailsApi = createAsyncThunk(
    'getVitalDetailsApi',
    async (userProfileId, { rejectWithValue }) => {
        try {
            const response = await axiosApi.get(
                `/userprofile/api/v1/userprofiles/${userProfileId}/credentials`
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

export const postTalentProfilePhoto = createAsyncThunk(
    'postTalentProfilePhoto',
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await axiosApi.post(
                `/userprofile/api/v1/userprofiles/${id}/profilephoto`,
                data,
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

export const postTalentPortfolio = createAsyncThunk(
    'postTalentPortfolio',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosApi.post(
                `/userprofile/api/v1/userprofiles/${data.id}/portfolio`,
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

export const addTalentProfile = createAsyncThunk(
    'addTalentProfile',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosApi.put(
                `userprofile/api/v1/userprofiles/${data.id}`,
                data.data
            )
            return response
        } catch {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    }
)

export const talentUploadUnionCard = createAsyncThunk(
    'talentUploadUnionCard',
    async (data, { rejectWithValue }) => {
        try {
            const res = axiosApi.put(
                `/userprofile/api/v1/userprofiles/${data.id}/unioncard`,
                data.data,
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

export const userprofileGet = createAsyncThunk(
    'userprofileGet',
    async (data, { rejectWithValue }) => {
        try {
            const res = axiosApi.get(`/userprofile/api/v1/userprofiles/${data}`)
            return res
        } catch (err) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    }
)

export const getTalentProfileBasicDetails = createAsyncThunk(
    'getTalentProfileBasicDetails',
    async (talentProfileId, { rejectWithValue }) => {
        try {
            const response = await axiosApi.get(
                `/userprofile/api/v1/userprofiles/${talentProfileId}`
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

// Get Talent profile photo
export const getTalentProfilePhoto = createAsyncThunk(
    'getTalentProfilePhoto',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosApi.get(
                `/userprofile/api/v1/userprofiles/${id}/profilephoto`
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

export const talentPortfoliolinks = createAsyncThunk(
    'talentPortfoliolinks',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosApi.put(
                `userprofile/api/v1/userprofiles/${data.id}/portfolio-links`,
                data.links
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
export const getTalentPortfolioPhotos = createAsyncThunk(
    'getTalentPortfolioPhotos',
    async (userProfileId, { rejectWithValue }) => {
        try {
            const res = await axiosApi.get(
                `userprofile/api/v1/userprofiles/${userProfileId}/portfolio`
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

export const talentRateTermsByProfileId = createAsyncThunk(
    'talentRateTermsByProfileId',
    async (talentProfileId, { rejectWithValue }) => {
        try {
            const res = await axiosApi.get(
                `/userprofile/api/v1/userprofiles/${talentProfileId}/rateterm-labels`
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

export const getTalentRateTerm = createAsyncThunk(
    'getTalentRateTerm',
    async (talentProfileId, { rejectWithValue }) => {
        try {
            const response = await axiosApi.get(
                `userprofile/api/v1/userprofiles/${talentProfileId}/rateandterms`
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

export const talentRateTerm = createAsyncThunk(
    'talentRateTerm',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosApi.put(
                `/userprofile/api/v1/userprofiles/${data.id}/rateandterms`,
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

export const getTalentDynamicFields = createAsyncThunk(
    'getTalentDynamicFields',
    async (userProfileId, { rejectWithValue }) => {
        try {
            const response = await axiosApi.get(
                `/userprofile/api/v1/userprofiles/${userProfileId}/fields`
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

// get vital detail
export const delTalentPortfolio = createAsyncThunk(
    'delTalentPortfolio',
    async ({ talentProfileId, index }, { rejectWithValue }) => {
        try {
            const response = await axiosApi.delete(
                `/userprofile/api/v1/userprofiles/${talentProfileId}/portfolio/${index}`
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

export const getHairTypes = createAsyncThunk('getHairTypes', async (_, { rejectWithValue }) => {
    try {
        const res = await axiosApi.get(`talentmst/api/v1/hairtypes`)
        return res
    } catch (err) {
        if (!error.response) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }
})
export const getEyeColors = createAsyncThunk('getEyeColors', async (_, { rejectWithValue }) => {
    try {
        const res = await axiosApi.get(`/talentmst/api/v1/eyecolors`)
        return res
    } catch (err) {
        if (!error.response) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }
})
export const getHairColors = createAsyncThunk('getHairColors', async (_, { rejectWithValue }) => {
    try {
        const res = await axiosApi.get(`/talentmst/api/v1/haircolors`)
        return res
    } catch (err) {
        if (!error.response) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }
})

export const talentProfileCost = createAsyncThunk(
    'talentProfileCost',
    async (userProfileId, { rejectWithValue }) => {
        try {
            const response = await axiosApi.get(
                `/userprofile/api/v1/userprofiles/${userProfileId}/cost`
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
const talentSlice = createSlice({
    name: 'talent',
    initialState: state,
    extraReducers: {
        [genresApi.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'GENRES_API'
        },
        [genresApi.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'GENRES_API'
            state.genres = action.payload.data
        },
        [genresApi.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'GENRES_API'
            state.error = action.payload.errorMessage
        },
        [talentUploadUnionCard.pending]: (state, action) => {
            state.type = 'TALENT_UPLOAD_UNION_API'
        },
        [talentUploadUnionCard.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'TALENT_UPLOAD_UNION_API'
        },
        [talentUploadUnionCard.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'TALENT_UPLOAD_UNION_API'
            state.error = action.payload.errorMessage
        },
        [addTalentProfile.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'ADD_TALENT_PROFILE_API'
        },
        [addTalentProfile.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'ADD_TALENT_PROFILE_API'
        },
        [addTalentProfile.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'ADD_TALENT_PROFILE_API'
            state.error = action.payload.errorMessage
        },
        [categoryByPermalinkApi.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'CATEGORY_API'
        },
        [categoryByPermalinkApi.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'CATEGORY_API'
            state.country = action.payload.data
        },
        [categoryByPermalinkApi.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'CATEGORY_API'
            state.error = action.payload.errorMessage
        },
        [postTalentProfilePhoto.pending]: (state, action) => {
            // state.status = 'loading'
            state.type = 'TALENT_PROFILE_PHOTO'
        },
        [postTalentProfilePhoto.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.vitalDetails = action.payload.data
            state.type = 'TALENT_PROFILE_PHOTO'
        },
        [postTalentProfilePhoto.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.payload.errorMessage
            state.type = 'TALENT_PROFILE_PHOTO'
        },
        [vitalDetailsApi.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'VITAL_API'
        },
        [vitalDetailsApi.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'VITAL_API'
            state.vitalDetails = action.payload.data
        },
        [vitalDetailsApi.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'VITAL_API'
            state.error = action.payload.errorMessage
        },

        [getVitalDetailsApi.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'GET_VITAL_DETAIL'
        },
        [getVitalDetailsApi.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'GET_VITAL_DETAIL'
            state.vitalDetails = action.payload.data
        },
        [getVitalDetailsApi.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'GET_VITAL_DETAIL'
            state.error = action.payload.errorMessage
        },
        [postTalentPortfolio.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'PORTFOLIO_API'
        },
        [postTalentPortfolio.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'PORTFOLIO_API'
        },
        [postTalentPortfolio.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'PORTFOLIO_API'
            state.error = action.payload.errorMessage
        },
        [talentPortfoliolinks.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'PORTFOLIO_LINK_API'
        },
        [talentPortfoliolinks.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'PORTFOLIO_LINK_API'
        },
        [talentPortfoliolinks.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'PORTFOLIO_LINK_API'
            state.error = action.payload.errorMessage
        },
        [userprofileGet.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'USERPROFILE_API'
        },
        [userprofileGet.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.userProfile = action.payload.data
            state.type = 'USERPROFILE_API'
        },
        [userprofileGet.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'USERPROFILE_API'
            state.error = action.payload.errorMessage
        },
        [getTalentProfilePhoto.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'GET_TALENT_PROFILEPHOTO'
        },
        [getTalentProfilePhoto.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'GET_TALENT_PROFILEPHOTO'
            state.talentProfilePhoto = action.payload.data
        },
        [getTalentProfilePhoto.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'GET_TALENT_PROFILEPHOTO'
            state.error = action.error.message
        },
        [getTalentProfileBasicDetails.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'GET_TALENT_BASIC_DETAILS'
        },
        [getTalentProfileBasicDetails.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'GET_TALENT_BASIC_DETAILS'
            state.talentBasicDetails = action.payload.data
        },
        [getTalentProfileBasicDetails.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'GET_TALENT_BASIC_DETAILS'
            state.error = action.payload.errorMessage
        },
        [getTalentPortfolioPhotos.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'GET_PORTFOLIO_PHOTOS'
            state.photoLoader = true
        },
        [getTalentPortfolioPhotos.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'GET_PORTFOLIO_PHOTOS'
            state.portfolioPhotos = action.payload.data
            state.photoLoader = false
        },
        [getTalentPortfolioPhotos.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'GET_PORTFOLIO_PHOTOS'
            state.error = action.error.message
            state.photoLoader = false
        },

        [talentRateTerm.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.rateAndTerm = action.payload.data
            state.type = 'TALENT_RATE_TERM'
        },
        [talentRateTerm.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'TALENT_RATE_TERM'
        },
        [talentRateTerm.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.payload.errorMessage
            state.type = 'TALENT_RATE_TERM'
        },

        [talentRateTermsByProfileId.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'RATE_TERM_LABLE'
        },
        [talentRateTermsByProfileId.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'RATE_TERM_LABLE'
            state.rateAndTermLabel = action.payload.data
        },
        [talentRateTermsByProfileId.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'RATE_TERM_LABLE'
            state.error = action.payload.errorMessage
        },

        [getTalentRateTerm.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'GET_TALENT_RATE_TERM'
        },
        [getTalentRateTerm.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'GET_TALENT_RATE_TERM'
            state.rateAndTerm = action.payload.data
        },
        [getTalentRateTerm.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'GET_TALENT_RATE_TERM'
            // state.error = action.payload.errorMessage
        },

        [delTalentPortfolio.pending]: (state, action) => {
            // state.status = 'loading'
            state.type = 'DEL_TALENT_PORTFOLIO_ID'
        },
        [delTalentPortfolio.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'DEL_TALENT_PORTFOLIO_ID'
        },
        [delTalentPortfolio.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'DEL_TALENT_PORTFOLIO_ID'
            state.error = action.payload.errorMessage
        },

        [getTalentDynamicFields.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'GET_TALENT_DYNAMIC'
        },
        [getTalentDynamicFields.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'GET_TALENT_DYNAMIC'
            state.dynamicFields = action.payload.data
        },
        [getTalentDynamicFields.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'GET_TALENT_DYNAMIC'
            state.error = action.payload.errorMessage
        },

        [getHairTypes.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'GET_HAIR_TYPES'
        },
        [getHairTypes.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'GET_HAIR_TYPES'
            state.hairTypes = action.payload.data
        },
        [getHairTypes.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'GET_HAIR_TYPES'
            state.error = action.payload.errorMessage
        },

        [getEyeColors.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'GET_EYE_COLORS'
        },
        [getEyeColors.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'GET_EYE_COLORS'
            state.eyeColors = action.payload.data
        },
        [getEyeColors.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'GET_EYE_COLORS'
            state.error = action.payload.errorMessage
        },

        [getHairColors.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'GET_HAIR_COLORS'
        },
        [getHairColors.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'GET_HAIR_COLORS'
            state.hairColors = action.payload.data
        },
        [getHairColors.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'GET_HAIR_COLORS'
            state.error = action.payload.errorMessage
        },

        [talentProfileCost.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'TALENT_COST'
        },
        [talentProfileCost.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'TALENT_COST'
            state.talentProfileCost = action.payload.data
        },
        [talentProfileCost.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'TALENT_COST'
            state.error = action.payload.errorMessage
        },
    },
    reducers: {
        setTalent(state) {
            state.status = null
            state.type = ''
        },
    },
})

export const { setTalent } = talentSlice.actions
const { reducer } = talentSlice
export default reducer
