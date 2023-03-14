import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosApi, multipartHeader } from '../../helpers/axios'
import state from './state'

export const getInventorytypeApi = createAsyncThunk(
    'getInventorytypeApi',
    async (subSubCategoryId, { rejectWithValue }) => {
        try {
            const response = await axiosApi.get(
                `/inventorytype/api/v1/invtypes?subSubCategoryId=${subSubCategoryId}`
            )
            return response.data
        } catch (err) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    }
)

export const getInventorySubtypeApi = createAsyncThunk(
    'getInventorySubtypeApi',
    async (inventoryTypeId, { rejectWithValue }) => {
        try {
            const response = await axiosApi.get(
                `/inventorytype/api/v1/invsubtypes?inventoryTypeId=${inventoryTypeId}`
            )
            return response.data
        } catch (err) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    }
)
export const getServicePortfolioPhotos = createAsyncThunk(
    'getServicePortfolioPhotos',
    async (serviceProfileId, { rejectWithValue }) => {
        try {
            const response = await axiosApi.get(
                `/serviceprofile/api/v1/inventory/${serviceProfileId}/portfolio`
            )
            return response.data
        } catch (err) {
            if (!err) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    }
)

export const servicePortfolioLinks = createAsyncThunk(
    'servicePortfolioLinks',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosApi.put(
                `/serviceprofile/api/v1/inventory/${data.id}/portfolio-links`,
                data.links
            )
            return response.data
        } catch (error) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    }
)

export const getServicePortfolioLinks = createAsyncThunk(
    'getServicePortfolioLinks',
    async (inventoryId, { rejectWithValue }) => {
        try {
            const response = await axiosApi.get(
                `/serviceprofile/api/v1/inventory/${inventoryId}/portfolio-links`
            )
            return response.data
        } catch (err) {
            if (!err.response) {
                throw err
            }
            return rejectWithValue(err.response.data)
        }
    }
)

export const inventoryWithProfileApi = createAsyncThunk(
    'createprofiledetail',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosApi.post(
                `/serviceprofile/api/v1/serviceprofiles/inventory`,
                data
            )
            return response.data
        } catch (error) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    }
)

export const updateInventoryWithProfileApi = createAsyncThunk(
    'updateprofiledetail',
    async ({ serviceProfileId, inventoryId, data }, { rejectWithValue }) => {
        try {
            const response = await axiosApi.put(
                `/serviceprofile/api/v1/serviceprofiles/${serviceProfileId}/inventory/${inventoryId}`,
                data
            )
            return response.data
        } catch (error) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    }
)

export const inventoryGetByProfileApi = createAsyncThunk(
    'inventoryGetByProfileApi',
    async ({ servicesProfileId, pageNo }, { rejectWithValue }) => {
        try {
            const response = await axiosApi.get(
                `serviceprofile/api/v1/serviceprofiles/${servicesProfileId}/inventory?pageNo=${pageNo}`
            )
            return response.data
        } catch (error) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    }
)

export const postServicePortfolio = createAsyncThunk(
    'postServicePortfolio',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosApi.post(
                `/serviceprofile/api/v1/inventory/${data.id}/portfolio`,
                data.formData,
                multipartHeader
            )
            return response.data
        } catch (error) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    }
)

export const servicesRateTermsByProfileId = createAsyncThunk(
    'servicesRateTermsByProfileId',
    async (serviceProfileId, { rejectWithValue }) => {
        try {
            const response = await axiosApi.get(
                `serviceprofile/api/v1/serviceprofiles/${serviceProfileId}/rateterm-labels`
            )
            return response.data
        } catch (err) {
            if (!err.response) {
                throw error
            }
            return rejectWithValue(err.response.data)
        }
    }
)

export const getServicesRateTerm = createAsyncThunk(
    'getServicesRateTerm',
    async (serviceProfileId, { rejectWithValue }) => {
        try {
            const response = await axiosApi.get(
                `/userprofile/api/v1/userprofiles/${serviceProfileId}/rateandterms`
            )
            return response.data
        } catch (error) {
            if (!error.response) {
                throw error
            }
            // We got validation errors, let's return those so we can reference in our component and set form errors
            return rejectWithValue(error.response.data)
        }
    }
)

export const servicesRateTerm = createAsyncThunk(
    'servicesRateTerm',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosApi.put(
                `/serviceprofile/api/v1/inventory/${data.id}/rateandterms`,
                data.payload
            )
            return response.data
        } catch (error) {
            if (!error.response) {
                throw error
            }
            // We got validation errors, let's return those so we can reference in our component and set form errors
            return rejectWithValue(error.response.data)
        }
    }
)

export const getInventoryById = createAsyncThunk(
    'getInventoryById',
    async (inventoryId, { rejectWithValue }) => {
        try {
            const response = await axiosApi.get(
                `/serviceprofile/api/v1/serviceprofiles/inventory/${inventoryId}`
            )
            return response.data
        } catch (error) {
            if (!error.response) {
                throw error
            }
            // We got validation errors, let's return those so we can reference in our component and set form errors
            return rejectWithValue(error.response.data)
        }
    }
)

export const getInventorySubtype = createAsyncThunk(
    'getInventorySubtype',
    async (inventotySubId, { rejectWithValue }) => {
        try {
            const response = axiosApi.get(`/inventorytype/api/v1/invsubtypes/${inventotySubId}`)
            return response.data
        } catch (err) {
            if (!error.response) {
                throw error
            }
            // We got validation errors, let's return those so we can reference in our component and set form errors
            return rejectWithValue(error.response.data)
        }
    }
)

export const deleteInventory = createAsyncThunk(
    'deleteInventory',
    async ({ serviceProfileId, inventoryId }, { rejectWithValue }) => {
        try {
            const response = axiosApi.delete(
                `/serviceprofile/api/v1/serviceprofiles/${serviceProfileId}/inventory/${inventoryId}`
            )
            return response.data
        } catch (err) {
            if (!error.response) {
                throw error
            }
            // We got validation errors, let's return those so we can reference in our component and set form errors
            return rejectWithValue(error.response.data)
        }
    }
)

// del service portfolio
export const delServicePortfolio = createAsyncThunk(
    'delServicePortfolio',
    async ({ inventoryId, index }, { rejectWithValue }) => {
        try {
            const response = await axiosApi.delete(
                `/userprofile/api/v1/userprofiles/${inventoryId}/portfolio/${index}`
            )
            return response.data
        } catch (error) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    }
)

// post package
export const postPackage = createAsyncThunk(
    'postPackage',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await axiosApi.post(`/package/api/v1/packages`, payload)
            return response.data
        } catch (error) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    }
)

// post package
export const serviceProfileCost = createAsyncThunk(
    'serviceProfileCost',
    async ({ serviceProfileId, inventoryId }, { rejectWithValue }) => {
        try {
            // const response = await axiosApi.post(`/serviceprofile/api/v1/serviceprofiles/${serviceProfileId}/inventory/${inventoryId}/cost`)
            const response = await axiosApi.post(`/serviceprofile/api/v1/serviceprofiles/inventory/${inventoryId}/cost`)
            return response.data
        } catch (error) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    }
)

// create slice
const services = createSlice({
    name: 'services',
    initialState: state,
    extraReducers: {
        [getInventorytypeApi.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'INVENTORYTYPE_API'
        },
        [getInventorytypeApi.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'INVENTORYTYPE_API'
            state.allInventoryTypes = action.payload
        },
        [getInventorytypeApi.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'INVENTORYTYPE_API'
            state.error = action.payload
        },
        [getInventorySubtypeApi.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'INVENTORY_SUB_TYPE_API'
        },
        [getInventorySubtypeApi.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'INVENTORY_SUB_TYPE_API'
            state.allInventorySubTypes = action.payload
        },
        [getInventorySubtypeApi.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'INVENTORY_SUB_TYPE_API'
            state.error = action.payload
        },
        [inventoryWithProfileApi.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'INVENTORY_CREATE_PROFILE_API'
        },
        [inventoryWithProfileApi.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.addInventory = action.payload
            state.type = 'INVENTORY_CREATE_PROFILE_API'
        },
        [inventoryWithProfileApi.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'INVENTORY_CREATE_PROFILE_API'
            state.error = action.payload
        },
        [getServicePortfolioPhotos.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'GET_PORTFOLIO_PHOTOS'
        },
        [getServicePortfolioPhotos.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'GET_PORTFOLIO_PHOTOS'
            state.portfolioPhotos = action.payload
        },
        [getServicePortfolioPhotos.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'GET_PORTFOLIO_PHOTOS'
            state.error = action.error.message
        },

        [servicePortfolioLinks.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'PORTFOLIO_LINK_API'
        },
        [servicePortfolioLinks.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'PORTFOLIO_LINK_API'
        },
        [servicePortfolioLinks.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'PORTFOLIO_LINK_API'
            state.error = action.payload.errorMessage
        },

        [postServicePortfolio.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'PORTFOLIO_API'
        },
        [postServicePortfolio.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'PORTFOLIO_API'
        },
        [postServicePortfolio.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'PORTFOLIO_API'
            state.error = action.payload.errorMessage
        },

        [servicesRateTermsByProfileId.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'RATE_TERM_LABLE'
        },
        [servicesRateTermsByProfileId.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'RATE_TERM_LABLE'
            state.rateAndTermLabel = action.payload
        },
        [servicesRateTermsByProfileId.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'RATE_TERM_LABLE'
            state.error = action.payload.errorMessage
        },

        [getServicesRateTerm.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'GET_SERVICE_RATE_TERM'
        },
        [getServicesRateTerm.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'GET_SERVICE_RATE_TERM'
            state.rateAndTerm = action.payload
        },
        [getServicesRateTerm.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'GET_SERVICE_RATE_TERM'
            state.rateAndTerm = {}
            state.error = action.payload.errorMessage
        },

        [servicesRateTerm.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.rateAndTerm = action.payload
            state.type = 'SERVICE_RATE_TERM'
        },
        [servicesRateTerm.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'SERVICE_RATE_TERM'
        },
        [servicesRateTerm.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.payload.errorMessage
            state.type = 'SERVICE_RATE_TERM'
        },

        [inventoryGetByProfileApi.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'INVENTORY_GET_BY_PROFILE_API'
        },
        [inventoryGetByProfileApi.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.getInventory = action.payload
            state.type = 'INVENTORY_GET_BY_PROFILE_API'
        },
        [inventoryGetByProfileApi.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'INVENTORY_GET_BY_PROFILE_API'
            state.error = action.payload
        },

        [getInventoryById.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'GET_INVENTORY_BY_ID'
        },
        [getInventoryById.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'GET_INVENTORY_BY_ID'
            state.servicesBascDetails = action.payload
        },
        [getInventoryById.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'GET_INVENTORY_BY_ID'
            state.error = action.payload
        },

        [getInventorySubtype.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'GET_INVENTORY_SUB_TYPE'
        },
        [getInventorySubtype.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'GET_INVENTORY_SUB_TYPE'
            state.inventoryDetailes = action.payload
        },
        [getInventorySubtype.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'GET_INVENTORY_SUB_TYPE'
            state.error = action.payload
        },
        [updateInventoryWithProfileApi.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'UPDATE_INVENTORY'
        },
        [updateInventoryWithProfileApi.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'UPDATE_INVENTORY'
            state.addInventory = action.payload
        },
        [updateInventoryWithProfileApi.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'UPDATE_INVENTORY'
            state.error = action.payload
        },

        [deleteInventory.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'DEL_INVENTORY'
        },
        [deleteInventory.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'DEL_INVENTORY'
        },
        [deleteInventory.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'DEL_INVENTORY'
            state.error = action.payload
        },

        [getServicePortfolioLinks.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'GET_LINKS'
        },
        [getServicePortfolioLinks.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'GET_LINKS'
            state.service_portfolio_links = action.payload
        },
        [getServicePortfolioLinks.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'GET_LINKS'
            state.error = action.payload.errorMessage
        },
        [delServicePortfolio.pending]: (state, action) => {
            // state.status = 'loading'
            state.type = 'DEL_SERVICE_PORTFOLIO_ID'
        },
        [delServicePortfolio.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'DEL_SERVICE_PORTFOLIO_ID'
        },
        [delServicePortfolio.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'DEL_SERVICE_PORTFOLIO_ID'
            state.error = action.payload.errorMessage
        },
        [postPackage.pending]: (state, action) => {
            // state.status = 'loading'
            state.type = 'POST_PACKAGE'
        },
        [postPackage.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'POST_PACKAGE'
        },
        [postPackage.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'POST_PACKAGE'
            state.error = action.payload.errorMessage
        },
        [serviceProfileCost.pending]: (state, action) => {
            // state.status = 'loading'
            state.type = 'SERVICE_COST'
        },
        [serviceProfileCost.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'SERVICE_COST'
            state.serviceProfileCost = action.payload.data
        },
        [serviceProfileCost.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'SERVICE_COST'
            state.error = action.payload.errorMessage
        },
    },
    reducers: {
        setService(state) {
            state.status = null
            state.type = null
        },
        setInventorData(state) {
            state.status = null
            state.type = null
            state.servicesBascDetails = {}
        },
    },
})

export const { setService, setInventorData } = services.actions
const { reducer } = services
export default reducer
