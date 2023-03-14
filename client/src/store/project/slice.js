import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosApi } from '../../helpers/axios'
import { ACCESS_TOKEN } from '../../utils/constants'
import state from './state'

export const getAllProject = createAsyncThunk('getAllProject', async (currrentPage, { rejectWithValue }) => {
    try {
        const res = axiosApi.get(`/project/api/v1/projects?pageNo=${currrentPage}`)
        return res
    } catch (error) {
        if (!error) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }
})

export const getprojectDetails = createAsyncThunk(
    'getprojectDetails',
    async (projectId, { rejectWithValue }) => {
        try {
            const res = axiosApi.get(`/project/api/v1/projects/${projectId}`)
            return res
        } catch (error) {
            if (!error) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    }
)

export const postProject = createAsyncThunk('postProject', async (project, { rejectWithValue }) => {
    try {
        const res = axiosApi.post(`/project/api/v1/projects`, project)
        return res
    } catch (error) {
        if (!error) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }
})

export const getProjectTypes = createAsyncThunk(
    'getProjectTypes',
    async (_, { rejectWithValue }) => {
        try {
            const res = axiosApi.get(`talentmst/api/v1/projecttypes`)
            return res
        } catch (error) {
            if (!error) {
                throw error
            }
            return rejectWithValue(error.response.data)
        }
    }
)

export const updateProject = createAsyncThunk('updateProject', async ({ payload, projectId }, { rejectWithValue }) => {
    try {
        const res = axiosApi.put(`/project/api/v1/projects/${projectId}`, payload)
        return res
    } catch (error) {
        if (!error) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }
})


// Requirements
export const getFieldsByProfileType = createAsyncThunk('getFieldsByProfileType', async (type, { rejectWithValue }) => {
    try {
        const res = axiosApi.get(`/project/api/v1/requirements/fields?profileType=${type}`)
        return res
    } catch (error) {
        if (!error) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }
})

// get single requirement
export const getReuirementById = createAsyncThunk('getReuirementById', async ({ projectId, requirementId }, { rejectWithValue }) => {
    try {
        const res = axiosApi.get(`/project/api/v1/projects/${projectId}/requirements/${requirementId}`)
        return res
    } catch (error) {
        if (!error) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }
})

// get single requirement
export const getAllRequirements = createAsyncThunk('getAllRequirements4', async (projectId, { rejectWithValue }) => {
    try {
        const res = axiosApi.get(`project/api/v1/projects/${projectId}/requirements`)
        return res
    } catch (error) {
        if (!error) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }
})

// post req.
export const postRequirement = createAsyncThunk('postRequirement', async ({ projectId, payload }, { rejectWithValue }) => {
    try {
        const res = axiosApi.post(`/project/api/v1/projects/${projectId}/requirement`, payload)
        return res
    } catch (error) {
        if (!error) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }
})

// update req.
export const updateReuirementById = createAsyncThunk('updateReuirementById', async ({ projectId, requirementId, payload }, { rejectWithValue }) => {
    try {
        const res = axiosApi.put(`/project/api/v1/projects/${projectId}/requirements/${requirementId}`, payload)
        return res
    } catch (error) {
        if (!error) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }
})

export const deactiveRequirement = createAsyncThunk('deactiveRequirement', async ({ projectId, requirementId }, { rejectWithValue }) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`);

    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        redirect: 'follow'
    };

    const baseURL = process.env.base_url

    fetch(`${baseURL}/project/api/v1/projects/${projectId}/requirements/${requirementId}/deactivate`, requestOptions)

})

const projectSlice = createSlice({
    name: 'project',
    initialState: state,
    extraReducers: {
        [getAllProject.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'GET_ALL_PROJECT'
        },
        [getAllProject.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'GET_ALL_PROJECT'
            state.allProjects = action.payload.data
        },
        [getAllProject.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'GET_ALL_PROJECT'
            state.error = action.payload.errorMessage
        },

        // post project
        [postProject.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'POST_PROJECT'
        },
        [postProject.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'POST_PROJECT'
            state.projectMetadata = action.payload.data
        },
        [postProject.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'POST_PROJECT'
            state.error = action.error.message
        },

        // Update project
        [updateProject.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'PUT_PROJECT'
        },
        [updateProject.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'PUT_PROJECT'
            state.projectMetadata = action.payload.data
        },
        [updateProject.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'PUT_PROJECT'
            state.error = action.error.message
        },

        // get project details
        [getprojectDetails.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'GET_PROJECT_DETAILS'
        },
        [getprojectDetails.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'GET_PROJECT_DETAILS'
            state.projectDetails = action.payload.data
        },
        [getprojectDetails.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'GET_PROJECT_DETAILS'
            state.error = action.payload.errorMessage
        },

        // get project details
        [getProjectTypes.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'GET_PROJECT_TYPES'
        },
        [getProjectTypes.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'GET_PROJECT_TYPES'
            state.projectTypes = action.payload.data
        },
        [getProjectTypes.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'GET_PROJECT_TYPES'
            state.error = action.payload.errorMessage
        },


        // Requirements
        [getFieldsByProfileType.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'GET_FIELDS_BY_TYPES'
        },
        [getFieldsByProfileType.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'GET_FIELDS_BY_TYPES'
            state.dynamicFields = action.payload.data
        },
        [getFieldsByProfileType.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'GET_FIELDS_BY_TYPES'
            state.error = action.error.message
        },

        [getReuirementById.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'GET_SINGLE_REQUIREMENT'
        },
        [getReuirementById.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'GET_SINGLE_REQUIREMENT'
            state.requirementById = action.payload.data
        },
        [getReuirementById.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'GET_SINGLE_REQUIREMENT'
            state.error = action.error.message
        },

        [getAllRequirements.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'GET_ALL_REQUIREMENTS'
        },
        [getAllRequirements.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'GET_ALL_REQUIREMENTS'
            state.allRequirements = action.payload.data
        },
        [getAllRequirements.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'GET_ALL_REQUIREMENTS'
            state.error = action.error.message
        },

        // post requirement
        [postRequirement.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'POST_REQUIREMENT'
        },
        [postRequirement.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'POST_REQUIREMENT'
            // state.dynamicFields = action.payload.data
        },
        [postRequirement.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'POST_REQUIREMENT'
            state.error = action.error.message
        },

        // post requirement
        [updateReuirementById.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'UPDATE_REQUIREMENT'
        },
        [updateReuirementById.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'UPDATE_REQUIREMENT'
            // state.dynamicFields = action.payload.data
        },
        [updateReuirementById.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'UPDATE_REQUIREMENT'
            state.error = action.error.message
        },

        // del requirement
        [deactiveRequirement.pending]: (state, action) => {
            state.status = 'loading'
            state.type = 'DEL_REQUIREMENT'
        },
        [deactiveRequirement.fulfilled]: (state, action) => {
            state.status = 'succeed'
            state.type = 'DEL_REQUIREMENT'
        },
        [deactiveRequirement.rejected]: (state, action) => {
            state.status = 'failed'
            state.type = 'DEL_REQUIREMENT'
            state.error = action.error.message
        },
    },
    reducers: {
        setProject: state => {
            state.status = null
            state.type = null
        }
    },
})

export const { setProject } = projectSlice.actions
const { reducer } = projectSlice
export default reducer
