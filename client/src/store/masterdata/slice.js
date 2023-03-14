import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosApi } from '../../helpers/axios'
import state from './state'

export const getCategoryAndSubCategoryByLink = createAsyncThunk(
    'getCategoryAndSubCategoryByLink',
    async (link, { rejectWithValue }) => {
        try {
            const res = await axiosApi.get(
                `/talentmst/api/v1/category/by-permalink?permalink=${link}`
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

export const getAllInterests = createAsyncThunk(
    'getAllInterests',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosApi.get('/talentmst/api/v1/interests')
            return res
        } catch (err) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    }
)

export const AllTaxes = createAsyncThunk('AllTaxes', async (_, { rejectWithValue }) => {
    try {
        const res = await axiosApi.get('/talentmst/api/v1/taxes')
        return res
    } catch (err) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }
})

export const amenitiesApi = createAsyncThunk(
    'amenitiesApi',
    async ({ categoryId, subCategoryId, subSubCategoryId }, { rejectWithValue }) => {
        try {
            // const response = await axiosApi.get('/talentmst/api/v1/amenities')
            const response = await axiosApi.get(
                `/talentmst/api/v1/amenities?categoryId=${categoryId}&subCategoryId=${subCategoryId}&subSubCategoryId=${subSubCategoryId}`
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

export const allGenres = createAsyncThunk(
    'allGenres',
    async (subCategoryId, { rejectWithValue }) => {
        try {
            const response = await axiosApi.get(
                `/talentmst/api/v1/genres?subCategoryId=${subCategoryId}`
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

export const allGenders = createAsyncThunk('allGenders', async (_, { rejectWithValue }) => {
    try {
        const response = await axiosApi.get(`/talentmst/api/v1/genders`)
        return response
    } catch (error) {
        if (!error.response) {
            throw error
        }
        // We got validation errors, let's return those so we can reference in our component and set form errors
        return rejectWithValue(error.response.data)
    }
})

export const languageApi = createAsyncThunk('languages', async (_, { rejectWithValue }) => {
    try {
        const response = await axiosApi.get('/talentmst/api/v1/languages')
        return response
    } catch (err) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }
})

// filters api
export const profileDetailFilter = createAsyncThunk('profileDetailFilter', async (payload, { rejectWithValue }) => {
    try {
        const res = await axiosApi.get(`/search/api/v1/profiles/detail?profileId=${payload.profileId}&profileType=${payload.profileType}`)
        return res.data
    } catch (error) {
        if (!error.response) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }
})

export const rateFilter = createAsyncThunk('rateFilter', async (_, { rejectWithValue }) => {
    try {
        const res = await axiosApi.get(`/search/api/v1/ratefilter`)
        return res.data
    } catch (error) {
        if (!error.response) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }
})

export const genderFilter = createAsyncThunk('genderFilter', async (_, { rejectWithValue }) => {
    try {
        const res = await axiosApi.get(`/search/api/v1/genderfilter`)
        return res.data
    } catch (error) {
        if (!error.response) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }
})

const masterdataSlice = createSlice({
    name: 'masterdata',
    initialState: state,
    extraReducers: {
        // getInterests
        [getAllInterests.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'GET_INTERESTS'
        },
        [getAllInterests.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'GET_INTERESTS'
            state.interests = action.payload.data
        },
        [getAllInterests.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'GET_INTERESTS'
            state.error = action.error.name
        },
        // AllTaxes
        [AllTaxes.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'GET_TAXES'
        },
        [AllTaxes.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'GET_TAXES'
            state.taxes = action.payload.data
        },
        [AllTaxes.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'GET_TAXES'
            state.error = action.error.name
        },
        // amenitiesApi
        [amenitiesApi.pending]: (state, action) => {
            state.type = 'AMENITIES_API'
            state.status = 'loading'
        },
        [amenitiesApi.fulfilled]: (state, action) => {
            state.type = 'AMENITIES_API'
            state.status = 'succeed'
            state.amenities = action.payload.data
        },
        [amenitiesApi.rejected]: (state, action) => {
            state.type = 'AMENITIES_API'
            state.status = 'failed'
            state.error = action.error.message
        },
        // allGenres
        [allGenres.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'GENRES_API'
        },
        [allGenres.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'GENRES_API'
            state.genres = action.payload.data
        },
        [allGenres.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'GENRES_API'
            state.error = action.payload.errorMessage
        },
        [getCategoryAndSubCategoryByLink.pending]: (state, action) => {
            // state.status = 'loading'
            state.type = 'CATEGORY_AND_SUBCATEGORY_BY_PRAMILINK_API'
        },
        [getCategoryAndSubCategoryByLink.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'CATEGORY_AND_SUBCATEGORY_BY_PRAMILINK_API'
            state.categoryAndSubCategory = action.payload.data
        },
        [getCategoryAndSubCategoryByLink.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'CATEGORY_AND_SUBCATEGORY_BY_PRAMILINK_API'
            state.error = action.payload.errorMessage
        },
        [allGenders.pending]: (state, action) => {
            // state.status = 'loading'
            state.type = 'ALL_GENDERS'
        },
        [allGenders.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'ALL_GENDERS'
            state.genders = action.payload.data
        },
        [allGenders.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'ALL_GENDERS'
            state.error = action.payload.errorMessage
        },

        [languageApi.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'LANGUAGE_API'
        },
        [languageApi.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'LANGUAGE_API'
            state.languages = action.payload.data
        },
        [languageApi.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'LANGUAGE_API'
            state.error = action.payload
        },

        [profileDetailFilter.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'PROFILE_FILTER'
        },
        [profileDetailFilter.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'PROFILE_FILTER'
            state.profileDetailFilterData = action.payload
        },
        [profileDetailFilter.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'PROFILE_FILTER'
            state.error = action.payload
        },

        [rateFilter.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'RATE_FILTER'
        },
        [rateFilter.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'RATE_FILTER'
            state.rateFilterData = action.payload
        },
        [rateFilter.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'RATE_FILTER'
            state.error = action.payload
        },

        [genderFilter.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'GENDER_FILTER'
        },
        [genderFilter.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'GENDER_FILTER'
            state.genderFilterData = action.payload
        },
        [genderFilter.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'GENDER_FILTER'
            state.error = action.payload
        },
    },
    reducers: {
        setMasterdata(state) {
            state.status = null
            state.type = ''
        },
    },
})

export const { setMasterdata } = masterdataSlice.actions
const { reducer } = masterdataSlice
export default reducer
