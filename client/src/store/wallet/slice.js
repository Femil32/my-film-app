import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosApi } from "../../helpers/axios";
import state from "./state";

export const getWallet = createAsyncThunk('getWallet', async (_, { rejectWithValue }) => {
    try {
        const res = await axiosApi.get("/wallet/api/v1/wallet")
        return res.data
    }
    catch (error) {
        if (!error.response) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }
})

export const getWalletTransactions = createAsyncThunk('getWalletTransactions', async (status = 'approved', { rejectWithValue }) => {
    try {
        const res = await axiosApi.get(`wallet/api/v1/transations`)
        return res.data
    } catch (error) {
        if (!error.response) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }
})

const walletSlice = createSlice({
    name: "walletSlice",
    initialState: state,
    extraReducers: {
        // getWallet
        [getWallet.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'GET_WALLET'
        },
        [getWallet.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'GET_WALLET'
            state.wallet = action.payload
        },
        [getWallet.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'GET_WALLET'
            state.error = action.payload.errorMessage
        },
        // getWalletTransactions
        [getWalletTransactions.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'GET_TRANSACTIONS'
        },
        [getWalletTransactions.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'GET_TRANSACTIONS'
            state.walletTransactions = action.payload
        },
        [getWalletTransactions.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'GET_TRANSACTIONS'
            state.error = action.payload.errorMessage
        },
    },
    reducers: {
        setWallet(state) {
            state.status = null
            state.type = null
        }
    },
})

export const { setWallet } = walletSlice.actions
const { reducer } = walletSlice
export default reducer