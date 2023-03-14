import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { couponMsg } from '../../components/common/ValidationConstants'
import { axiosApi } from '../../helpers/axios'
import state from './state'

export const generateNewCode = createAsyncThunk('generateCode', async (_, { rejectWithValue }) => {
    try {
        const res = await axiosApi.get(`/coupon/api/v1/coupons/coupon-code`)
        return res.data
    } catch (error) {
        if (!error) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }
})

export const couponListing = createAsyncThunk('couponListing', async (_, { rejectWithValue }) => {
    try {
        const res = await axiosApi.get(`/coupon/api/v1/coupons/listing`)
        return res.data
    } catch (error) {
        if (!error) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }
})

export const getDiscountTypes = createAsyncThunk(
    'getDiscountTypes',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosApi.get(`/coupon/api/v1/coupons/coupon-types`)
            return res.data
        } catch (error) {
            if (!error) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    }
)

export const getCouponCategory = createAsyncThunk(
    'getCouponCategory',
    async ({ id }, { rejectWithValue }) => {
        try {
            const res = await axiosApi.get(`/talentmst/api/v1/subcategory?categoryId=${id}`)
            return res.data
        } catch (error) {
            if (!error) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    }
)

export const getCouponSubCategory = createAsyncThunk(
    'getCouponSubCategory',
    async ({ id, subId }, { rejectWithValue }) => {
        try {
            const res = await axiosApi.get(
                `/talentmst/api/v1/subsubcategory?categoryId=${id}&subCategoryId=${subId}`
            )
            return res.data
        } catch (error) {
            if (!error) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    }
)

export const getInventoryItems = createAsyncThunk(
    'getInventoryItems',
    async (payload, { rejectWithValue }
    ) => {
        try {
            const res = await axiosApi.get(
                `/serviceprofile/api/v1/serviceprofiles/inventory/items?categoryId=${payload.categoryId}&subCategoryId=${payload.subCategoryId}&subSubCategoryId=${payload.subSubCategoryId}&inventoryType=${payload.inventoryTypeId}&inventorySubtype=${payload.inventorySubtypeId}`
            )
            return res.data
        } catch (error) {
            if (!error) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    }
)

export const getCouponPackages = createAsyncThunk(
    'getCouponPackages',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosApi.get(`/package/api/v1/packages`)
            return res.data
        } catch (error) {
            if (!error) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    }
)

export const couponLimit = createAsyncThunk('couponLimit', async (_, { rejectWithValue }) => {
    try {
        const res = await axiosApi.get(`/coupon/api/v1/coupons/usage-items`)
        return res.data
    } catch (error) {
        if (!error) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }
})

export const saveCoupon = createAsyncThunk('saveCoupon', async (data, { rejectWithValue }) => {
    try {
        const res = await axiosApi.post(`/coupon/api/v1/coupons`, data)
        return res.data
    } catch (error) {
        if (!error) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }
})

export const getAllCoupons = createAsyncThunk('getAllCoupons', async (pageNo, { rejectWithValue }) => {
    try {
        const res = await axiosApi.get(`/coupon/api/v1/coupons?pageNo=${pageNo}`)
        return res.data
    } catch (error) {
        if (!error) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }
})

// UPCOMING COUPONS
export const getUpcomingCoupons = createAsyncThunk('getUpcomingCoupons', async (pageNo, { rejectWithValue }) => {
    try {
        const res = await axiosApi.get(`/coupon/api/v1/coupons/upcoming?pageNo=${pageNo}`)
        return res.data
    } catch (error) {
        if (!error) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }
})

// COMPLETED COUPONS
export const getCompletedCoupons = createAsyncThunk('getCompletedCoupons', async (pageNo, { rejectWithValue }) => {
    try {
        const res = await axiosApi.get(`/coupon/api/v1/coupons/completed?pageNo=${pageNo}`)
        return res.data
    } catch (error) {
        if (!error) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }
})


export const addCoupon = createAsyncThunk('addCoupon', async (data, { rejectWithValue }) => {
    try {
        const res = await axiosApi.post(`/coupon/api/v1/coupons`, data)
        return res.data
    } catch (error) {
        if (!error) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }
})

export const editCoupon = createAsyncThunk(
    'editCoupon',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axiosApi.put(`/coupon/api/v1/coupons/${data.id}`, data.payload)
            return res.data
        } catch (error) {
            if (!error) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    }
)

export const getSingleCoupon = createAsyncThunk(
    'getSingleCoupon',
    async (id, { rejectWithValue }) => {
        try {
            const res = await axiosApi.get(`/coupon/api/v1/coupons/${id}`)
            return res.data
        } catch (error) {
            if (!error) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    }
)

// deactivate coupon
export const deactivateCoupon = createAsyncThunk(
    'deactivateCoupon',
    async (couponId, { rejectWithValue }) => {
        try {
            const res = await axiosApi.delete(`/coupon/api/v1/coupons/${couponId}`)
            toast.success(couponMsg?.couponDeleted)
            setTimeout(() => {
                return res.data
            }, 2000);
        } catch (error) {
            if (!error) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    }
)

const couponSlice = createSlice({
    name: 'coupon',
    initialState: state,
    extraReducers: {
        [generateNewCode.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'GENERATE_NEW_CODE'
        },
        [generateNewCode.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'GENERATE_NEW_CODE'
            state.generatedCode = action.payload
        },
        [generateNewCode.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'GENERATE_NEW_CODE'
            state.error = action.payload.errorMessage
        },

        [couponListing.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'COUPON_LISTING'
        },
        [couponListing.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'COUPON_LISTING'
            state.couponListing = action.payload
        },
        [couponListing.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'COUPON_LISTING'
            state.error = action.payload.errorMessage
        },

        [getDiscountTypes.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'GET_DISCOUNT_TYPES'
        },
        [getDiscountTypes.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'GET_DISCOUNT_TYPES'
            state.discountTypes = action.payload
        },
        [getDiscountTypes.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'GET_DISCOUNT_TYPES'
            state.error = action.payload.errorMessage
        },
        [getCouponCategory.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'GET_COUPON_CATEGORY'
        },
        [getCouponCategory.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'GET_COUPON_CATEGORY'
            state.category = action.payload
        },
        [getCouponCategory.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'GET_COUPON_CATEGORY'
            state.error = action.payload.errorMessage
        },
        [getCouponSubCategory.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'GET_COUPON_SUB_CATEGORY'
        },
        [getCouponSubCategory.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'GET_COUPON_SUB_CATEGORY'
            state.subCategory = action.payload
        },
        [getCouponSubCategory.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'GET_COUPON_SUB_CATEGORY'
            state.error = action.payload.errorMessage
        },
        [getInventoryItems.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'GET_INVENTORY_ITEMS'
        },
        [getInventoryItems.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'GET_INVENTORY_ITEMS'
            state.inventoryItems = action.payload
        },
        [getInventoryItems.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'GET_INVENTORY_ITEMS'
            state.error = action.payload.errorMessage
        },
        [getCouponPackages.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'GET_COUPON_PACKAGES'
        },
        [getCouponPackages.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'GET_COUPON_PACKAGES'
            state.couponPackages = action.payload
        },
        [getCouponPackages.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'GET_COUPON_PACKAGES'
            state.error = action.payload.errorMessage
        },
        [couponLimit.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'COUPON_LIMIT'
        },
        [couponLimit.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'COUPON_LIMIT'
            state.couponLimit = action.payload
        },
        [couponLimit.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'COUPON_LIMIT'
            state.error = action.payload.errorMessage
        },
        [saveCoupon.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'SAVE_COUPON'
        },
        [saveCoupon.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'SAVE_COUPON'
            state.saveCoupon = action.payload
        },
        [saveCoupon.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'SAVE_COUPON'
            state.error = action.payload.errorMessage
        },
        [getAllCoupons.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'GET_ALL_COUPONS'
        },
        [getAllCoupons.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'GET_ALL_COUPONS'
            state.allCoupons = action.payload
        },
        [getAllCoupons.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'GET_ALL_COUPONS'
            state.error = action.payload.errorMessage
        },
        [getUpcomingCoupons.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'GET_UPCOMING_COUPONS'
        },
        [getUpcomingCoupons.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'GET_UPCOMING_COUPONS'
            state.allUpcomingCoupons = action.payload
        },
        [getUpcomingCoupons.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'GET_UPCOMING_COUPONS'
            state.error = action.payload.errorMessage
        },
        [getCompletedCoupons.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'GET_COMPLETED_COUPONS'
        },
        [getCompletedCoupons.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'GET_COMPLETED_COUPONS'
            state.allCompletedCoupons = action.payload
        },
        [getCompletedCoupons.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'GET_COMPLETED_COUPONS'
            state.error = action.payload.errorMessage
        },
        [addCoupon.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'ADD_COUPON'
        },
        [addCoupon.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'ADD_COUPON'
            state.addCoupon = action.payload
        },
        [addCoupon.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'ADD_COUPON'
            state.error = action.payload.errorMessage
        },
        [editCoupon.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'EDIT_COUPON'
        },
        [editCoupon.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'EDIT_COUPON'
            state.singleCoupon = action.payload
        },
        [editCoupon.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'EDIT_COUPON'
            state.error = action.payload.errorMessage
        },
        [getSingleCoupon.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'GET_SINGLE_COUPON'
        },
        [getSingleCoupon.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'GET_SINGLE_COUPON'
            state.singleCoupon = action.payload
        },
        [getSingleCoupon.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'GET_SINGLE_COUPON'
            state.error = action.payload.errorMessage
        },

        [deactivateCoupon.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'DEACTIVATE_COUPON'
        },
        [deactivateCoupon.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'DEACTIVATE_COUPON'
        },
        [deactivateCoupon.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'DEACTIVATE_COUPON'
            state.error = action.payload.errorMessage
        },
    },
    reducers: {
        setCoupon: state => {
            state.status = null
            state.error = null
            state.type = null
        },
        setSingleCoupon: state => {
            state.status = null
            state.error = null
            state.type = null
            state.singleCoupon = null
        }
    },
})

export const { setCoupon, setSingleCoupon } = couponSlice.actions
const { reducer } = couponSlice
export default reducer
