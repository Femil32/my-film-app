import * as Yup from 'yup'
import { setOtherProfiles, setSearchResult } from '../store/search/slice'
import { addWishlist, deleteWishlistItem } from '../store/wishlist/slice'

export const clearLocalStorage = () => {
    return localStorage.clear()
}

export const valInputRange = (field, min, max) => {
    return Yup
        .number()
        .moreThan(min, obj => {
            return `${field} must be more than ${obj.more}`
        })
        .lessThan(max, obj => {
            return `${field} must be less than ${obj.less}`
        })
        .required(`please enter ${field}`)
}

export const minInputRange = (field, min) => {
    return Yup
        .number()
        .moreThan(min, obj => {
            return `${field} must be more than ${obj.more}`
        })
        .required(`please enter ${field}`)
}

export const maxInputRange = (field, max) => {
    return Yup
        .number()
        .lessThan(max, obj => {
            return `${field} must be less than ${obj.less}`
        })
        .required(`please enter ${field}`)
}


export const setDropOptions = (data, label, value) => {
    return {
        ...data,
        label: data[label],
        value: data[value],
    }
}

export const indianAmount = (amount) => {
    return "₹" + amount.toLocaleString('en-IN')
}

export const removeDuplicates = (arr) => {
    return arr.filter((item,
        index) => arr.indexOf(item) === index);
}

export const toggleWishList = async (index, profileId, profileType, dataArray, dispatchType, dispatch, otherProfile = false) => {
    let temp = [...dataArray]
    if (dataArray[index]?.wishlistProfile) {
        await dispatch(deleteWishlistItem(dataArray[index]?.wishlistItemId))
        temp[index] = { ...temp[index], wishlistProfile: false }
    } else {
        let id
        await Promise.resolve(dispatch(addWishlist({ profileId, profileType }))).then(res => {
            id = res.payload.data.wishlistItemId
        })
        temp[index] = { ...temp[index], wishlistProfile: true, wishlistItemId: id }
    }

    if (otherProfile) {
        dispatch(setOtherProfiles(temp))
    } else {
        dispatch(setSearchResult({
            type: dispatchType,
            payload: temp
        }))
    }
}