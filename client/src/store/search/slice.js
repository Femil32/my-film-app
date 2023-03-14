import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosApi } from '../../helpers/axios'
import state from './state'

export const postSearch = createAsyncThunk(
    'postSearch',
    async (params, { rejectWithValue }) => {
        try {
            const res = await axiosApi.post(`/search/api/v1/profiles/search`, params)
            return res
        } catch (error) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    }
)

export const postFilterSearch = createAsyncThunk(
    'postFilterSearch',
    async (params, { rejectWithValue }) => {
        try {
            const res = await axiosApi.post(`/search/api/v1/profiles/search-filter`, params)
            return res
        } catch (error) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    }
)

export const profileDetail = createAsyncThunk(
    'profileDetail',
    async ({ profileId, profileType }, { rejectWithValue }) => {
        try {
            const res = await axiosApi.get(
                `/search/api/v1/profiles/detail?profileId=${profileId}&profileType=${profileType}`
            )
            return res.data
        } catch (error) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    }
)

export const otherProfileFromSeller = createAsyncThunk(
    'otherProfileFromSeller',
    async ({ userId, withImage }, { rejectWithValue }) => {
        try {
            const res = await axiosApi.get(
                `/search/api/v1/profiles/by-user?userId=${userId}&withImage=${withImage ?? true}`
            )
            return res.data
        } catch (error) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    }
)

const search = createSlice({
    name: 'search',
    initialState: state,
    extraReducers: {
        [postSearch.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'POST_SEARCH'
        },
        [postSearch.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'POST_SEARCH'

            state.talentResult = action.payload.data.talentProfiles
            state.crewResult = action.payload.data.crewProfiles
            state.serviceResult = action.payload.data.serviceProfiles
            state.locationResult = action.payload.data.locationProfiles

            state.searchResult = action.payload.data
        },
        [postSearch.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'POST_SEARCH'
            state.error = action.payload.errorMessage
        },

        [postFilterSearch.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'POST_FILTER_SEARCH'
        },
        [postFilterSearch.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'POST_FILTER_SEARCH'
            state.searchResult = action.payload.data
        },
        [postFilterSearch.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'POST_FILTER_SEARCH'
            state.error = action.payload.errorMessage
        },

        [profileDetail.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'PROFILE_DETAIL'
        },
        [profileDetail.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'PROFILE_DETAIL'
            state.profileDetails = action.payload
        },
        [profileDetail.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'PROFILE_DETAIL'
            state.error = action.payload.errorMessage
        },

        [otherProfileFromSeller.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'OTHER_PROFILES_SELLER'
        },
        [otherProfileFromSeller.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'OTHER_PROFILES_SELLER'
            state.otherProfilesFromSeller = {
                ...action.payload,
                otherProfiles: [
                    ...action.payload?.crewProfiles,
                    ...action.payload?.locationProfiles,
                    ...action.payload?.serviceProfiles,
                    ...action.payload?.talentProfiles
                ]
            }
        },
        [otherProfileFromSeller.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'OTHER_PROFILES_SELLER'
            state.error = action.payload.errorMessage
        },
    },
    reducers: {
        setSearch: state => {
            state.status = null
            state.type = null
        },
        setSearchResult: (state, action) => {
            switch (action.payload.type) {
                case "CREW_DATA":
                    state.crewResult = action.payload?.payload
                    break;
                case "LOCATION_DATA":
                    state.locationResult = action.payload?.payload
                    break;
                case "SERVICE_DATA":
                    state.serviceResult = action.payload?.payload
                    break;
                case "TALENT_DATA":
                    state.talentResult = action.payload?.payload
                    break;
                default:
                    break;
            }
        },
        setOtherProfiles: (state, action) => {
            state.otherProfilesFromSeller.otherProfiles = action.payload
        },
        setProfileDetails: (state, action) => {
            state.profileDetails = null
        },
        setSearchResultNull: (state, action) => {
            state.crewResult = []
            state.talentResult = []
            state.serviceResult = []
            state.locationResult = []
        }
    },
})

export const { setSearch, setSearchResult, setOtherProfiles, setProfileDetails, setSearchResultNull } = search.actions
const { reducer } = search
export default reducer
