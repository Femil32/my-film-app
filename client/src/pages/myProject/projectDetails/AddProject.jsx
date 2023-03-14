import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
    BackButton,
    ButtonTag,
    InputTag,
    LabelTag,
    PTag,
} from '../../../components/designComponents/MicroComponents'
import Select from 'react-select'
import { Form, Formik, FieldArray } from 'formik'
import * as Yup from 'yup'
import InputError from '../../../components/common/InputError'
//icons
import { MdLocationOn, MdClose } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { getprojectDetails, getProjectTypes, postProject, setProject, updateProject } from '../../../store/project/slice'
import { FiTag } from 'react-icons/fi'
import IsLoadingHOC from '../../../components/higherOrderLoader/IsLoadingHOC'
import { toast } from 'react-toastify'
import { projectMsg } from '../../../components/common/ValidationConstants'
import { CustomDatePicker } from '../../../components/DateAndTime'

const AddProject = ({ setLoading }) => {
    // hooks
    const projectProfile = useSelector(state => state.project)
    const navigation = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    const [projectOptions, setProjectOptions] = useState([])
    const [projectData, setProjectData] = useState({})
    const [projectType, setProjectType] = useState({})

    const { projectId } = location?.state ?? false

    useEffect(() => {
        if (projectId) {
            Promise.all([dispatch(getProjectTypes()), dispatch(getprojectDetails(projectId))]).finally(() => { setLoading(false) })
        } else {
            dispatch(getProjectTypes())
            setLoading(false)
            dispatch(setProject())
        }
    }, [])

    useEffect(() => {
        switch (projectProfile.status) {
            case 'failed':
                toast.error(projectProfile.error)
                break
            case 'succeed':
                switch (projectProfile.type) {
                    case 'GET_PROJECT_TYPES':
                        let temp = projectProfile?.projectTypes.map((x, i) => {
                            return { ...x, label: x.projectType, value: x.projectTypeCode }
                        })
                        setProjectOptions(temp)
                        if (projectId) {
                            let data = projectProfile?.projectTypes.filter((x, i) => projectData?.projectTypeCode === x.projectTypeCode)
                            setProjectType({ ...data[0], label: data[0]?.projectType, value: data[0]?.projectTypeCode })
                        }
                        dispatch(setProject())
                        break
                    case 'POST_PROJECT':
                        toast.success(projectMsg.projectCreated)
                        navigation(`/dashboard/addrequirement`, { state: { projectId: projectProfile?.projectMetadata?.projectId } })
                        dispatch(setProject())
                        break
                    case 'PUT_PROJECT':
                        toast.success(projectMsg.projectUpdated)
                        navigation(`/dashboard/projectdetails/`, { state: { projectId } })
                        dispatch(setProject())
                        break
                    case 'GET_PROJECT_DETAILS':
                        setProjectData(projectProfile.projectDetails)
                        dispatch(setProject())
                        break
                    default:
                        break
                }
                break
            default:
                break
        }
    }, [projectProfile])

    // custom functions
    const submitProject = values => {
        if (projectId) {
            const payload = {
                projectName: values.projectName,
                projectTypeCode: values.projectTypeCode.value,
                projectDurationFrom: new Date(values.projectDurationFrom),
                projectDurationTo: new Date(values.projectDurationTo),
                projectLocations: values.projectLocations,
            }
            dispatch(updateProject({ payload, projectId }))
        } else {
            const payload = {
                projectName: values.projectName,
                projectTypeCode: values.projectTypeCode.projectTypeCode,
                projectDurationFrom: values.projectDurationFrom,
                projectDurationTo: values.projectDurationTo,
                projectLocations: values.projectLocations,
            }
            dispatch(postProject(payload))
        }

        // sessionStorage.removeItem('projectDetails')

        // if (isUpdate && isLocal) {
        //     navigation(`/dashboard/addnewproject`, {
        //         state: {
        //             isOnline: false
        //         }
        //     })
        // } else {
        //     navigation(`/dashboard/addrequirement`, {
        //         state: {
        //             isOnline
        //         }
        //     })
        // }
    }

    return (
        <div className='container'>
            <div className=''>
                <BackButton
                    title={'Project Name'}
                    onClick={() => {
                        navigation(projectId ? "/dashboard/projectdetails/" : '/dashboard/projects', {
                            state: {
                                projectId
                            }
                        })
                    }}
                />
            </div>
            <Formik
                enableReinitialize
                initialValues={{
                    projectName: projectData?.projectName ?? '',
                    projectTypeCode: projectData?.projectTypeCode
                        ? {
                            value: projectData?.projectTypeCode,
                            label:
                                projectData?.projectTypeCode.charAt(0).toUpperCase() +
                                projectData?.projectTypeCode.slice(1),
                        }
                        : '',
                    projectDurationFrom: projectData?.projectDurationFrom
                        ? new Date(projectData?.projectDurationFrom)
                        : null,
                    projectDurationTo: projectData?.projectDurationTo
                        ? new Date(projectData?.projectDurationTo)
                        : null,
                    projectLocations: projectData?.projectLocations ?? [],
                }}
                validationSchema={Yup.object().shape({
                    projectName: Yup.string().required('please add Project Name'),
                    projectTypeCode: Yup.object().nullable().required('please select project'),
                    projectDurationFrom: Yup.date().nullable().required('please select Select Date'),
                    projectDurationTo: Yup.date().nullable().required('please select End Date'),
                    projectLocations: Yup.array()
                        .min(1, `Enter min 1 Project locations`)
                        .required('Enter Project locations'),
                })}
                onSubmit={values => {
                    submitProject(values)
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    setFieldValue,
                    setErrors,
                    isSubmitting,
                }) => (
                    <Form onSubmit={handleSubmit}>
                        <div className='row max-w-625 mx-auto mt-5'>
                            <div className='col-lg-6'>
                                <div
                                    className={`sign-input ${errors.projectName && touched.projectName
                                        ? ` error-inputs `
                                        : ``
                                        } mb-3`}
                                >
                                    <LabelTag
                                        classes={'text-gray fn-12 mb-2'}
                                        text={'Project Name'}
                                        For={'projectName'}
                                    />
                                    <div className='form-control'>
                                        <InputTag
                                            id={'projectName'}
                                            type={'text'}
                                            placeholder={'Enter project Name'}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            classes={'w-100'}
                                            name={'projectName'}
                                            value={values.projectName}
                                        />
                                    </div>
                                    {errors.projectName && touched.projectName ? (
                                        <InputError
                                            className={'input-error mt-2'}
                                            errorTitle={errors.projectName}
                                        />
                                    ) : null}
                                </div>
                            </div>
                            <div className='col-lg-6'>
                                <div
                                    className={`sign-input ${errors.projectTypeCode && touched.projectTypeCode
                                        ? ` error-inputs `
                                        : ``
                                        }mb-3`}
                                >
                                    <LabelTag
                                        classes={'text-gray fn-12 mb-2'}
                                        text={'Project type'}
                                    />
                                    <Select
                                        value={values.projectTypeCode}
                                        className={'form-control'}
                                        placeholder={'Enter project type'}
                                        options={projectOptions}
                                        onChange={e => {
                                            setFieldValue('projectTypeCode', e)
                                            handleChange('projectTypeCode')
                                        }}
                                        onBlur={handleBlur('projectTypeCode')}
                                        name={'projectTypeCode'}
                                    />
                                    {errors.projectTypeCode && touched.projectTypeCode ? (
                                        <InputError
                                            className={'input-error mt-2'}
                                            errorTitle={errors.projectTypeCode}
                                        />
                                    ) : null}
                                </div>
                            </div>
                            {/* datepicker */}
                            <div className='col-lg-6 datePicker-input projectDurationFrompicker'>
                                <div
                                    className={`sign-input ${errors.projectDurationFrom && touched.projectDurationFrom
                                        ? ` error-inputs `
                                        : ``
                                        }mb-3`}
                                >
                                    <div className='datePicker-input selectdatepicker'>
                                        <LabelTag
                                            classes={'text-gray fn-12 mb-2'}
                                            text={'Start Date'}
                                            For={'projectDurationFrom'}
                                        />
                                        <CustomDatePicker
                                            minDate={'beforeToday'}
                                            name='projectDurationFrom'
                                            inputClass={'px-3 py-2'}
                                            className={'rmdp-mobile'}
                                            containerClassName={'w-100 form-control'}
                                            value={values.projectDurationFrom}
                                            onChange={val => {
                                                setFieldValue(
                                                    'projectDurationFrom',
                                                    new Date(val)
                                                )
                                                setFieldValue(
                                                    'projectDurationTo',
                                                    null
                                                )
                                            }}
                                            format={'DD-MM-YYYY'}
                                            placeholder={'Select Date'}
                                        />
                                    </div>

                                    {errors.projectDurationFrom && touched.projectDurationFrom ? (
                                        <InputError
                                            className={'input-error mt-2'}
                                            errorTitle={errors.projectDurationFrom}
                                        />
                                    ) : null}
                                </div>
                            </div>
                            {/* datepicker */}
                            <div className='col-lg-6 projectDurationFrompicker'>
                                <div
                                    className={`sign-input ${errors.projectDurationTo && touched.projectDurationTo
                                        ? ` error-inputs `
                                        : ``
                                        }mb-3`}
                                >
                                    <div className='datePicker-input selectdatepicker'>
                                        <LabelTag
                                            classes={'text-gray fn-12 mb-2'}
                                            text={'End Date'}
                                            For={'projectDurationTo'}
                                        />
                                        <CustomDatePicker
                                            minDate={values.projectDurationFrom}
                                            name='projectDurationTo'
                                            inputClass={'px-3 py-2'}
                                            className={'rmdp-mobile'}
                                            containerClassName={'w-100 form-control'}
                                            value={values.projectDurationTo}
                                            onChange={val => {
                                                setFieldValue(
                                                    'projectDurationTo',
                                                    new Date(val)
                                                )
                                            }}
                                            format={'DD-MM-YYYY'}
                                            placeholder={'Select Date'}
                                        />
                                    </div>
                                    {errors.projectDurationTo && touched.projectDurationTo && (
                                        <InputError
                                            className={'input-error mt-2'}
                                            errorTitle={errors.projectDurationTo}
                                        />
                                    )}
                                </div>
                            </div>
                            <div className='col-12'>
                                <FieldArray
                                    name='projectLocations'
                                    render={arrayHelpers => {
                                        const projectLocationsArray = values.projectLocations
                                        return (
                                            <>
                                                <div className='w-100'>
                                                    <div
                                                        className={`sign-input ${errors.projectLocations &&
                                                            touched.projectLocations
                                                            ? `error-inputs `
                                                            : ``
                                                            } mb-3`}
                                                    >
                                                        <LabelTag
                                                            classes={'text-gray fn-12 mb-2'}
                                                            text={'Project Locations'}
                                                            For={'projectLocations'}
                                                        />
                                                        <div className='d-flex position-relative'>
                                                            <InputTag
                                                                placeholder={'Locations'}
                                                                classes={'form-control'}
                                                                id={'projectLocations'}
                                                                name={'projectLocations'}
                                                                onBlur={handleBlur}
                                                                onKeyDown={e => {
                                                                    if (e.key === 'Enter') {
                                                                        e.preventDefault()
                                                                        if (e.target.value != '') {
                                                                            arrayHelpers.push(
                                                                                e.target.value
                                                                            )
                                                                            e.target.value = ''
                                                                        }
                                                                    }
                                                                }}
                                                            />
                                                            {/* <div className='me-2'> */}
                                                            <MdLocationOn
                                                                fontSize={25}
                                                                fill={'rgb(135 146 160)'}
                                                                className='me-2 input-add-icon-right Fi-Tag'
                                                            />
                                                            {/* </div> */}
                                                        </div>
                                                        {errors.projectLocations &&
                                                            touched.projectLocations ? (
                                                            <div className='d-flex align-items-center mt-2'>
                                                                <InputError
                                                                    className='input-error'
                                                                    errorTitle={
                                                                        errors.projectLocations
                                                                    }
                                                                />
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                    <div className='d-flex flex-wrap gap-2'>
                                                        {projectLocationsArray.map(
                                                            (element, index) => (
                                                                <div
                                                                    className='btn-dark-blue rounded mb-2 px-3 py-2'
                                                                    key={index}
                                                                >
                                                                    <div className={'d-flex w-100'}>
                                                                        <PTag
                                                                            classes={'bold me-1'}
                                                                            texts={element}
                                                                        />
                                                                        <span
                                                                            onClick={e => {
                                                                                e.preventDefault()
                                                                                arrayHelpers.remove(
                                                                                    index
                                                                                )
                                                                            }}
                                                                            role='button'
                                                                        >
                                                                            {' '}
                                                                            <MdClose
                                                                                fontSize={20}
                                                                                className={
                                                                                    'Md-Close'
                                                                                }
                                                                            />
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    }}
                                />
                            </div>
                            <div className='d-flex justify-content-center my-4'>
                                <ButtonTag
                                    type='submit'
                                    classes={'btn btn-orange'}
                                    value={'Continue'}
                                />
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default IsLoadingHOC(AddProject)
