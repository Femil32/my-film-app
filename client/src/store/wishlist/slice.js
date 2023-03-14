import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { wishlistMsg } from "../../components/common/ValidationConstants";
import { axiosApi } from "../../helpers/axios";
import state from "./state";

// DELETE http://{{hostname}}/order/api/v1/wishlist/{{wishlistItemId}}
// POST http://{{hostname}}/order/api/v1/wishlist
// GET http://{{hostname}}/order/api/v1/wishlist?withImage=true

export const addWishlist = createAsyncThunk('addWishlist', async ({ profileId, profileType }, { rejectWithValue }) => {
    try {
        const res = await axiosApi.post(`/order/api/v1/wishlist`, { profileId, profileType })
        toast.success(wishlistMsg?.wishAdded)
        return res
    } catch (error) {
        if (!error.response) {
            throw error
        }
        return rejectWithValue(error.response)
    }
})

export const getWishlist = createAsyncThunk('addWish', async (_, { rejectWithValue }) => {
    try {
        const res = axiosApi.get(`/order/api/v1/wishlist?withImage=true`)
        return res
    } catch (error) {
        if (!error.response) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }
})

export const deleteWishlistItem = createAsyncThunk('deleteWishlistItem', async (wishlistItemId, { rejectWithValue }) => {
    try {
        const res = axiosApi.delete(`/order/api/v1/wishlist/${wishlistItemId}`)
        toast.success(wishlistMsg?.wishRemoved)
        return res.data
    } catch (error) {
        if (!error.response) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }
})


const wishlistSlice = createSlice({
    name: 'wishlistSlice',
    initialState: state,
    extraReducers: {
        // add item in wishlist
        [addWishlist.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'ADD_WISHLIST'
        },
        [addWishlist.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'ADD_WISHLIST'
        },
        [addWishlist.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'ADD_WISHLIST'
            state.error = action.payload.errorMessage
        },

        // add item in wishlist
        [getWishlist.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'GET_WISHLIST'
        },
        [getWishlist.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.wishlist = action.payload.data
            state.type = 'GET_WISHLIST'
        },
        [getWishlist.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'GET_WISHLIST'
            state.error = action.payload.errorMessage
        },

        // add item in wishlist
        [deleteWishlistItem.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'DELETE_WISHLIST'
        },
        [deleteWishlistItem.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'DELETE_WISHLIST'
        },
        [deleteWishlistItem.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'DELETE_WISHLIST'
            state.error = action.payload.errorMessage
        },
    },
    reducers: {
        setWishlist: (state) => {
            state.status = null
            state.type = null
            state.error = null
        },
        setWishlistArray: (state, action) => {
            return state.wishlist
        }
    },
})


export const { setWishlist, setWishlistArray } = wishlistSlice.actions
const { reducer } = wishlistSlice
export default reducer