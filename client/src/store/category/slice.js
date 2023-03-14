import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import state from './state'
import { axiosApi } from '../../helpers/axios'

export const allCategoryApi = createAsyncThunk('allCategoryApi', async (_, { rejectWithValue }) => {
    try {
        const response = await axiosApi.get('/talentmst/api/v1/category')
        return response.data
    } catch (err) {
        if (!err.response) {
            throw err
        }
        return rejectWithValue(err.response.data)
    }
})

export const allsubCategoriesApi = createAsyncThunk(
    'allSubCategory',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosApi.get('/talentmst/api/v1/subcategory')
            return response.data
        } catch (err) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    }
)

export const allSubSubCategoriesApi = createAsyncThunk(
    'allSubSubCategoriesApi',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosApi.get('/talentmst/api/v1/subsubcategory')

            return response
        } catch (err) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    }
)

// filter sub category
export const FilterSubCategory = createAsyncThunk(
    'FilterSubCategory',
    async (categoryId, { rejectWithValue }) => {
        try {
            const response = await axiosApi.get(`/talentmst/api/v1/subcategory?categoryId=${categoryId}`)
            return response.data
        } catch (err) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    }
)

// filter sub category
export const FilterSubSubCategory = createAsyncThunk(
    'FilterSubSubCategory',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await axiosApi.get(`/talentmst/api/v1/subsubcategory?categoryId=${payload.categoryId}&subCategoryId=${payload.subCategoryId}`)
            return response.data
        } catch (err) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    }
)


// create slice
const categorySlice = createSlice({
    name: 'category',
    initialState: state,

    extraReducers: {
        [allCategoryApi.pending]: (state, action) => {
            state.type = 'CATEGORY_API'
            state.status = 'loading'
        },
        [allCategoryApi.fulfilled]: (state, action) => {
            state.type = 'CATEGORY_API'
            state.status = 'succeed'
            state.category = action.payload
        },
        [allCategoryApi.rejected]: (state, action) => {
            state.type = 'CATEGORY_API'
            state.status = 'failed'
            state.error = action.payload.errorMessage
        },
        [allsubCategoriesApi.pending]: (state, action) => {
            state.type = 'SUBCATEGORY_API'
            state.status = 'loading'
        },
        [allsubCategoriesApi.fulfilled]: (state, action) => {
            state.type = 'SUBCATEGORY_API'
            state.status = 'succeed'
            state.subCategory = action.payload
        },
        [allsubCategoriesApi.rejected]: (state, action) => {
            state.type = 'SUBCATEGORY_API'
            state.status = 'failed'
            state.error = action.payload.errorMessage
        },
        [allSubSubCategoriesApi.pending]: (state, action) => {
            state.type = 'SUB_SUB_CATEGORY_API'
            state.status = 'loading'
        },
        [allSubSubCategoriesApi.fulfilled]: (state, action) => {
            state.type = 'SUB_SUB_CATEGORY_API'
            state.status = 'succeed'
            state.subSubCategory = action.payload.data
        },
        [allSubSubCategoriesApi.rejected]: (state, action) => {
            state.type = 'SUB_SUB_CATEGORY_API'
            state.status = 'failed'
            state.error = action.payload.errorMessage
        },

        // FilterSubCategory
        [FilterSubCategory.pending]: (state, action) => {
            state.type = 'FILTER_SUBCATEGORY_API'
            state.status = 'loading'
        },
        [FilterSubCategory.fulfilled]: (state, action) => {
            state.type = 'FILTER_SUBCATEGORY_API'
            state.status = 'succeed'
            state.subCategory = action.payload
        },
        [FilterSubCategory.rejected]: (state, action) => {
            state.type = 'FILTER_SUBCATEGORY_API'
            state.status = 'failed'
            state.error = action.payload.errorMessage
        },

        // FilterSubSubCategory
        [FilterSubSubCategory.pending]: (state, action) => {
            state.type = 'FILTER_SUB_SUB_CATEGORY_API'
            state.status = 'loading'
        },
        [FilterSubSubCategory.fulfilled]: (state, action) => {
            state.type = 'FILTER_SUB_SUB_CATEGORY_API'
            state.status = 'succeed'
            state.subSubCategory = action.payload
        },
        [FilterSubSubCategory.rejected]: (state, action) => {
            state.type = 'FILTER_SUB_SUB_CATEGORY_API'
            state.status = 'failed'
            state.error = action.payload.errorMessage
        },
    },
    reducers: {
        setCategory: (state) => {
            state.type = null
            state.status = null
        }
    }
})

export const { setCategory } = categorySlice.actions
const { reducer } = categorySlice
export default reducer
