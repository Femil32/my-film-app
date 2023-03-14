import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosApi } from '../../helpers/axios'
import state from './state'

export const getCart = createAsyncThunk('getCart', async (currrentPage, { rejectWithValue }) => {
    try {
        const res = axiosApi.get(`/order/api/v1/profile/cartitems`)
        return res
    } catch (error) {
        if (!error) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }
})

export const postCart = createAsyncThunk('postCart', async ({ payload, navigation }, { rejectWithValue }) => {
    try {
        const res = await axiosApi.post('/order/api/v1/profile/cartitems', payload);
        navigation('/dashboard/mycart')
        return res
    } catch (error) {
        if (!error) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }
})

// Remove From Cart
export const RemoveFromCart = createAsyncThunk('RemoveFromCart', async (id, { rejectWithValue }) => {
    try {
        const res = await axiosApi.delete(`/order/api/v1/profile/cartitems/${id}`);
        return res
    } catch (error) {
        if (!error) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }
})



const cartItemsSlice = createSlice({
    name: 'cartItems',
    initialState: state,
    extraReducers: {
        [getCart.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'GET_CART_ITEMS'
        },
        [getCart.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'GET_CART_ITEMS'
            state.cartItems = action.payload.data
        },
        [getCart.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'GET_CART_ITEMS'
            state.error = action.payload.errorMessage
        },

        [postCart.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'POST_CART_ITEMS'
        },
        [postCart.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'POST_CART_ITEMS'
            // state.cartItems = action.payload.data
        },
        [postCart.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'POST_CART_ITEMS'
            state.error = action.payload.errorMessage
        },

        // RemoveFromCart
        [RemoveFromCart.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'REMOVE_FROM_CART'
        },
        [RemoveFromCart.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'REMOVE_FROM_CART'
            // state.cartItems = action.payload.data
        },
        [RemoveFromCart.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'REMOVE_FROM_CART'
            state.error = action.payload.errorMessage
        }
    },
    reducers: {
        setCart: state => {
            state.status = null
            state.type = null
        }
    },
})

export const { setCart } = cartItemsSlice.actions
const { reducer } = cartItemsSlice
export default reducer