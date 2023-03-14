import axios from 'axios'
import { ACCESS_TOKEN } from '../utils/constants'

export const baseURL = process.env.base_url
export const base_url_auth = 'https://filmboardmovies.com/profile-manager'
export const axiosApi = axios.create({ baseURL })
export const axiosAuthApi = axios.create({ baseURL: base_url_auth })

export const multipartHeader = {
    headers: {
        ["Authorization"]: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN),
        ['content-type']: 'multipart/form-data',
    },
}


if (localStorage.getItem(ACCESS_TOKEN)) {
    axiosApi.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
    axiosApi.defaults.headers.get["Content-Type"] = "application/json"
}