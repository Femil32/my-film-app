import { FormikProvider, FieldArray, useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Select from 'react-select'
import { Edit } from '../../../components/AllSvgs'
import {
    BackButton,
    ButtonTag,
    InputTag,
    LabelTag,
    PTag,
} from '../../../components/designComponents/MicroComponents'
import * as Yup from 'yup'
import InputError from '../../../components/common/InputError'
//icons
import { MdDelete, MdClose } from 'react-icons/md'
import IsLoadingHOC from '../../../components/higherOrderLoader/IsLoadingHOC'
import Swal from 'sweetalert2'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import {
    allCategoryApi,
    FilterSubCategory,
    FilterSubSubCategory,
} from '../../../store/category/slice'
import { allGenders, allGenres, amenitiesApi, languageApi } from '../../../store/masterdata/slice'
import { getAllRequirements, getFieldsByProfileType, getReuirementById, postRequirement, setProject, updateReuirementById } from '../../../store/project/slice'
import { FiTag } from 'react-icons/fi'
import MiniLoader from '../../../components/customLoader/MiniLoader'
import { toast } from 'react-toastify'
import { projectMsg } from '../../../components/common/ValidationConstants'
import { getInventorySubtypeApi, getInventorytypeApi } from '../../../store/service/slice'


const AddRequirement = ({ setLoading }) => {
    // states
    const [dynamicFields, setDynamicFields] = useState([])
    const [initialValues, setInitialValues] = useState({})
    const [dynamicValidation, setDynamicValidation] = useState({})
    const [allRequirements, setAllRequirements] = useState([])
    const [isMiniloading, setIsMiniloading] = useState({
        dynamicFieldsLoader: false,
        requirementLoader: false
    })
    const [projectData, setProjectData] = useState({})

    // select options
    const [allGenere, setAllGenere] = useState([])
    const [genders, setGenders] = useState([])
    const [allLanguages, setAllLanguages] = useState([])
    const [allAmenities, setAllAmenities] = useState([])
    const [inventoryOptions, setInventoryOptions] = useState([])
    const [inventorySubOptions, setInventorySubOptions] = useState([])

    // category options
    const [categoryOptions, setCategoryOptions] = useState([])
    const [subCategoryOptions, setSubCategoryOptions] = useState([])
    const [subSubCategoryOptions, setSubSubCategoryOptions] = useState([])

    // editing options
    const [editRequirement, setEditRequirement] = useState(null)
    const [addUpdate, setIsAddUpdate] = useState(false)
    const [currentEditRequirementIndex, setCurrentEditRequirementIndex] = useState(null)

    // hooks
    const navigation = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const projectProfile = useSelector(state => state.project)
    const categoryProfile = useSelector(state => state.category)
    const masterDataProfile = useSelector(state => state.masterdata)

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ]

    let { projectId, requirementId, isUpdate } = location?.state ?? false

    // initial useEffect
    useEffect(() => {
        if (projectId && !requirementId) {
            dispatch(getAllRequirements(projectId))
            setLoading(false)
        }
        if (projectId && requirementId) {
            setIsMiniloading({ ...isMiniloading, dynamicFieldsLoader: true })
            dispatch(getReuirementById({ projectId, requirementId }))
        }
        Promise.all([dispatch(allCategoryApi())])
            .finally(() => {
                setProjectData(projectProfile?.projectMetadata)
                setLoading(false)
            })
    }, [])

    // category profile
    useEffect(() => {
        if (categoryProfile.status === 'failed') {
        } else if (categoryProfile.status === 'succeed') {
            if (categoryProfile.type === 'CATEGORY_API') {
                let data = categoryProfile.category.map((x, index) => {
                    if (x.categoryId === projectProfile?.requirementById?.categoryId) {
                        formik.setFieldValue('category', {
                            label: x.name,
                            value: x.categoryId
                        })
                    }
                    return {
                        ...x,
                        label: x.name,
                        value: x.categoryId,
                    }
                })
                setCategoryOptions(data)
            } else if (categoryProfile.type === 'FILTER_SUBCATEGORY_API') {
                let data = categoryProfile.subCategory.map((x, index) => ({
                    ...x,
                    label: x.subCategoryName,
                    value: x.subCategoryId,
                }))
                setSubCategoryOptions(data)
            } else if (categoryProfile.type === 'FILTER_SUB_SUB_CATEGORY_API') {
                let data = categoryProfile.subSubCategory.map((x, index) => ({
                    ...x,
                    label: x.subSubCategoryName,
                    value: x.subSubCategoryId,
                }))
                data.length === 0 && formik.setFieldValue('isSubSubCategory', false)
                setSubSubCategoryOptions(data)
            }
        }
    }, [categoryProfile])

    // master data profile
    useEffect(() => {
        if (masterDataProfile.status === 'failed') {
        } else if (masterDataProfile.status === 'succeed') {
            if (masterDataProfile.type === 'GENRES_API') {
                let data = masterDataProfile.genres.map((x, index) => ({
                    ...x,
                    label: x.genreName,
                    value: x.genreId,
                }))
                setAllGenere(data)
            }
            if (masterDataProfile.type === 'ALL_GENDERS') {
                let data = masterDataProfile.genders.map((x, index) => ({
                    ...x,
                    label: x.gender,
                    value: x.genderId,
                }))
                setGenders(data)
            }
            if (masterDataProfile.type === 'LANGUAGE_API') {
                let data = masterDataProfile.languages.map((x, index) => ({
                    ...x,
                    label: x.language,
                    value: x.launguesId,
                }))
                setAllLanguages(data)
            }
            if (masterDataProfile.type === 'AMENITIES_API') {
                let data = masterDataProfile.amenities?.amenities?.map((x, index) => ({
                    ...x,
                    label: x.name,
                    value: x.amenityId,
                }))
                setAllAmenities(data)
            }
        }
    }, [masterDataProfile])

    // requirement profile
    useEffect(() => {
        if (projectProfile.status === 'failed') {
        } else if (projectProfile.status === 'succeed') {
            if (projectProfile.type === 'GET_FIELDS_BY_TYPES') {
                // set dynamic fileds
                setDynamicFields(projectProfile?.dynamicFields?.fields)

                // set initial values
                let tempFields = {}
                projectProfile?.dynamicFields?.fields?.map(field => {
                    if (field.fieldType === 'string' || field?.fieldType === 'number') {
                        tempFields[field.fieldName] = ''
                    } else if (field.fieldType === 'array' || field.fieldType === 'multitags') {
                        if (field.fieldName === 'genres') {
                            dispatch(
                                allGenres(
                                    formik.values?.subCategory?.subCategoryId ??
                                    formik.values?.subCategory?.value
                                )
                            )
                        }
                        if (field.fieldName === 'gender') {
                            dispatch(allGenders())
                        }
                        if (field.fieldName === 'languagesKnown') {
                            dispatch(languageApi())
                        }
                        if (field.fieldName === 'amenities') {
                            dispatch(
                                amenitiesApi({
                                    categoryId: formik.values.subSubCategory.categoryId,
                                    subCategoryId: formik.values.subSubCategory.subCategoryId,
                                    subSubCategoryId: formik.values.subSubCategory.subSubCategoryId,
                                })
                            )
                        }
                        if (field.fieldName === 'invType') {
                            dispatch(getInventorytypeApi(formik.values.subSubCategory.subSubCategoryId ?? formik.values.subSubCategory.value))
                                .then(res => {
                                    let tmp = res.payload.data.map(x => {
                                        return {
                                            ...x,
                                            label: x.name,
                                            value: x.inventoryTypeId,
                                        }
                                    })
                                    setInventoryOptions(tmp)
                                })
                        }
                        tempFields[field.fieldName] = []
                    }

                    for (const key in tempFields) {
                        formik.setFieldValue(key, tempFields[key])
                    }
                })
                projectProfile?.dynamicFields?.fields?.map(field => {
                    if (
                        field.fieldType === 'string' ||
                        field?.fieldType === 'number' ||
                        field.fieldType === 'multitags'
                    ) {
                        formik.setFieldValue(
                            field.fieldName,
                            projectProfile?.requirementById?.[field?.fieldName]
                        )
                    } else if (field.fieldType === 'array') {
                        formik.setFieldValue(field.fieldName, [
                            allRequirements[currentEditRequirementIndex]?.tempData?.[
                            field?.fieldName
                            ],
                        ])
                    }
                })

                // set validations
                let tempValidation = {}
                projectProfile?.dynamicFields?.fields?.map((field, index) => {
                    if (field.isMandatory) {
                        switch (field.fieldType) {
                            case 'string': {
                                tempValidation[field.fieldName] = Yup.string().required(
                                    `Please enter ${field.fieldName}`
                                )
                                break
                            }
                            case 'number': {
                                tempValidation[field.fieldName] = Yup.number()
                                    .moreThan(0, obj => {
                                        return `${obj.path} cannot be less than ${obj.more}`
                                    })
                                    .required(`Please enter ${field.fieldLabel}`)
                                break
                            }
                            case 'array': {
                                tempValidation[field.fieldName] = Yup.array()
                                    .min(1)
                                    .required(`Please enter ${field.fieldName}`)
                                break
                            }
                            case 'multitags': {
                                tempValidation[field.fieldName] = Yup.array()
                                    .min(1)
                                    .required(`Please enter ${field.fieldName}`)
                                break
                            }
                            default:
                                break
                        }
                    } else {
                        switch (field.fieldType) {
                            case 'number': {
                                tempValidation[field.fieldName] = Yup.number()
                                    .moreThan(0, obj => {
                                        return `${obj.path} cannot be less than ${obj.more}`
                                    })
                                break
                            }
                            default:
                                break
                        }
                    }
                })

                setDynamicValidation(tempValidation)
                setIsMiniloading({ ...isMiniloading, dynamicFieldsLoader: false })
                dispatch(setProject())
            } else if (projectProfile.type === 'GET_ALL_REQUIREMENTS') {
                setAllRequirements(projectProfile?.allRequirements?.requirements)
                dispatch(setProject())
            } else if (projectProfile.type === 'POST_REQUIREMENT') {
                Promise.all([dispatch(getAllRequirements(projectId))]).then(() => {
                    setAllRequirements(projectProfile?.allRequirements?.requirements)
                    setIsMiniloading({ ...isMiniloading, requirementLoader: false })
                })
                toast.success(projectMsg.requirementAdded)
                dispatch(setProject())
            } else if (projectProfile.type === 'UPDATE_REQUIREMENT') {
                toast.success(projectMsg.requirementUpdated)
                dispatch(setProject())
                navigation(`/dashboard/projectdetails/`, {
                    state: { projectId }
                })
            } else if (projectProfile.type === 'GET_SINGLE_REQUIREMENT') {
                Promise.all([
                    dispatch(FilterSubCategory(projectProfile.requirementById.categoryId)),
                    dispatch(
                        FilterSubSubCategory({
                            categoryId: projectProfile.requirementById.categoryId,
                            subCategoryId: projectProfile.requirementById.subCategoryId,
                        })
                    ),
                    resetData(),
                ]).then(result => {
                    const subCategory = result[0].payload?.find(e => e?.subCategoryId === projectProfile?.requirementById?.subCategoryId)
                    const subsubCategory = result[1].payload?.find(e => e?.subSubCategoryId === projectProfile?.requirementById?.subSubCategoryId)
                    formik.setFieldValue('subCategory', { label: subCategory?.subCategoryName, value: subCategory.subCategoryId })
                    formik.setFieldValue('subSubCategory', { label: subsubCategory.subSubCategoryName, value: subsubCategory.subSubCategoryId })
                    dispatch(getFieldsByProfileType(subsubCategory?.permalink ?? subCategory?.permalink))
                })

                dispatch(setProject())
            }
        }
    }, [projectProfile])

    const formik = useFormik({
        enableReinitialize: (projectId && requirementId) ? true : false,
        initialValues: {
            category: null,
            subCategory: null,
            subSubCategory: null,
            isSubSubCategory: isUpdate ? (editRequirement?.subSubCategoryId ? true : false) : false,
            ...initialValues,
        },
        validationSchema: Yup.object().shape({
            category: Yup.object().nullable().required('Please enter category'),
            subCategory: Yup.object().nullable().required('Please enter subCategory'),
            isSubSubCategory: Yup.boolean(),
            subSubCategory: Yup.object()
                .nullable()
                .when('isSubSubCategory', (isSubSubCategory, schema) => {
                    if (isSubSubCategory) {
                        return schema.required('Please enter subSubCategory')
                    } else {
                        return schema
                    }
                }),
            ...dynamicValidation,
        }),
        onSubmit: values => {
            onSubmitForm(values)
        },
    })

    const resetData = () => {
        setDynamicValidation({})
        setInitialValues({})
        setDynamicFields([])
    }

    const onSubmitForm = values => {

        dispatch(setProject())

        let payload = {
            categoryId: values.category?.categoryId ?? values.category?.value,
            subCategoryId: values.subCategory?.subCategoryId ?? values.subCategory?.value,
            subSubCategoryId: values.subSubCategory?.subSubCategoryId ?? values.subSubCategory?.value,
        }

        dynamicFields?.map(field => {
            if (field?.fieldType === 'string' || field?.fieldType === 'number') {
                payload[field.fieldName] = values[field.fieldName] ?? null
            }
            if (field?.fieldType === 'array') {
                if (field?.multiSelect) {
                    let temp = []
                    values[field.fieldName][0]?.map((name, index) => {
                        temp.push(name?.label ?? '')
                    })
                    payload[field.fieldName] = temp
                } else {
                    let temp = []
                    values[field.fieldName]?.map((name, index) => {
                        temp.push(name?.label ?? '')
                    })
                    payload[field.fieldName] = temp
                }
            }
            if (field?.fieldType === 'multitags') {
                payload[field.fieldName] = values[field.fieldName] ?? []
            }
        })

        if (projectId && requirementId) {
            dispatch(updateReuirementById({ projectId, requirementId, payload }))
        } else {
            dispatch(postRequirement({ projectId, payload }))
        }
        formik.resetForm()
        setDynamicFields([])
    }

    const DeleteSocialProfileAlert = i => {
        Swal.fire({
            title: 'Are you sure?',
            text: `You won't be able to undo this!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then(result => {
            if (result.isConfirmed) {
                allRequirements.splice(i, 1)
                setAllRequirements(prev => [...prev])
            }
        })
    }

    return projectId ? <div className='container'>
        <div className=''>
            <BackButton
                title={'Add Requirement'}
                onClick={() => {
                    navigation('/dashboard/projectdetails/', {
                        state: {
                            projectId
                        },
                    })
                }}
            />
        </div>
        <div className='max-w-625 mx-auto mt-3'>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <div className='row'>
                        <div
                            className={`col-lg-6 couponselect sign-input ${formik.errors.category && formik.touched.category
                                ? `error-inputs `
                                : ``
                                }mb-3`}
                        >
                            <LabelTag classes={'text-gray fn-12 mb-2'} text={'category'} />
                            <Select
                                name='category'
                                className={'form-control p-0'}
                                options={categoryOptions}
                                placeholder={'Category'}
                                onChange={e => {
                                    formik.handleChange('category')
                                    formik.setFieldValue('category', e)
                                    formik.setFieldValue('isSubSubCategory', true)
                                    Promise.all([
                                        dispatch(FilterSubCategory(e.categoryId)),
                                        resetData(),
                                    ]).finally(() => {
                                        formik.setFieldValue('subCategory', null)
                                        formik.setFieldValue('subSubCategory', null)
                                    })
                                }}
                                onBlur={formik.handleBlur('category')}
                                value={formik.values.category}
                                getOptionValue={category => category.value}
                            />
                            {formik.errors.category && formik.touched.category ? (
                                <InputError
                                    className={'input-error mt-2'}
                                    errorTitle={formik.errors.category}
                                />
                            ) : null}
                        </div>
                        <div
                            className={`col-lg-6 couponselect sign-input ${formik.errors.subCategory && formik.touched.subCategory
                                ? `error-inputs `
                                : ``
                                }mb-3`}
                        >
                            <LabelTag
                                classes={'text-gray fn-12 mb-2'}
                                text={'Sub Category'}
                            />
                            <Select
                                name='subCategory'
                                className={'form-control p-0'}
                                noOptionsMessage={() => 'Please select categoty.'}
                                options={subCategoryOptions}
                                placeholder={'Sub category'}
                                onChange={e => {
                                    formik.handleChange('subCategory')
                                    formik.setFieldValue('subCategory', e)
                                    Promise.all([
                                        dispatch(
                                            FilterSubSubCategory({
                                                categoryId: e.categoryId,
                                                subCategoryId: e.subCategoryId,
                                            })
                                        ),
                                        setDynamicFields([]),
                                    ])
                                        .then(result => {
                                            result[0].payload.length === 0 &&
                                                (setIsMiniloading({ ...isMiniloading, dynamicFieldsLoader: true })
                                                    ,
                                                    dispatch(
                                                        getFieldsByProfileType(e?.permalink)
                                                    ))
                                        })
                                        .finally(() => {
                                            formik.setFieldValue('subSubCategory', null)
                                        })
                                }}
                                onBlur={formik.handleBlur('subCategory')}
                                value={formik.values.subCategory}
                                getOptionValue={subCategory => subCategory.value}
                            />
                            {formik.errors.subCategory && formik.touched.subCategory ? (
                                <InputError
                                    className={'input-error mt-2'}
                                    errorTitle={formik.errors.subCategory}
                                />
                            ) : null}
                        </div>
                    </div>
                    <div className='row'>
                        <div
                            className={`col-lg-6 couponselect sign-input ${formik.errors.subSubCategory &&
                                formik.touched.subSubCategory
                                ? `error-inputs `
                                : ``
                                }mb-3`}
                        >
                            <LabelTag
                                classes={'text-gray fn-12 mb-2'}
                                text={'Sub Sub Category'}
                            />
                            <Select
                                name='subSubCategory'
                                options={subSubCategoryOptions}
                                className={'form-control p-0'}
                                placeholder={'Sub Sub Category'}
                                noOptionsMessage={() => 'Please select Sub Categoty.'}
                                onChange={e => {
                                    setDynamicFields([])
                                    formik.setFieldValue('subSubCategory', e)
                                    subSubCategoryOptions.length > 0 &&
                                        (setIsMiniloading({ ...isMiniloading, dynamicFieldsLoader: true })
                                            ,
                                            dispatch(getFieldsByProfileType(e?.permalink)))
                                }}
                                onBlur={formik.handleBlur('subSubCategory')}
                                value={formik.values.subSubCategory}
                                getOptionValue={category => category.value}
                            />
                            {formik.errors.subSubCategory &&
                                formik.touched.subSubCategory ? (
                                <InputError
                                    className={'input-error mt-2'}
                                    errorTitle={formik.errors.subSubCategory}
                                />
                            ) : null}
                        </div>
                        {isMiniloading.dynamicFieldsLoader ? (
                            <MiniLoader className={'w-100 h-100'} />
                        ) : (
                            dynamicFields?.map((data, i) =>
                                (() => {
                                    if (data.fieldType === 'string') {
                                        return (
                                            <div
                                                className={`col-sm-6 sign-input ${formik.errors[data.fieldName] &&
                                                    formik.touched[data.fieldName]
                                                    ? `error-inputs `
                                                    : ``
                                                    }mb-3`}
                                                key={i}
                                            >
                                                <LabelTag
                                                    classes={'text-gray fn-12 mb-2'}
                                                    text={data.fieldLabel}
                                                    For={data.fieldName}
                                                />
                                                <InputTag
                                                    classes={'form-control mb-2'}
                                                    placeholder={`Enter ${data.fieldLabel}`}
                                                    id={data.fieldName}
                                                    name={data.fieldName}
                                                    type={data.fieldType}
                                                    value={formik.values[data.fieldName]}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                />
                                                {formik.errors[data.fieldName] &&
                                                    formik.touched[data.fieldName] && (
                                                        <div className='d-flex align-items-center mt-2'>
                                                            <InputError
                                                                className='input-error'
                                                                errorTitle={
                                                                    formik.errors[
                                                                    data.fieldName
                                                                    ]
                                                                }
                                                            />
                                                        </div>
                                                    )}
                                            </div>
                                        )
                                    } else if (data.fieldType === 'number') {
                                        return (
                                            <div
                                                className={`col-sm-6 mb-3 sign-input ${formik.errors[data.fieldName] &&
                                                    formik.touched[data.fieldName]
                                                    ? `error-inputs `
                                                    : ``
                                                    }mb-3`}
                                                key={i}
                                            >
                                                <LabelTag
                                                    classes={'text-gray fn-12 mb-2'}
                                                    text={data.fieldLabel}
                                                    For={data.fieldName}
                                                />
                                                <InputTag
                                                    classes={'form-control mb-2'}
                                                    placeholder={`Enter ${data.fieldLabel}`}
                                                    id={data.fieldName}
                                                    name={data.fieldName}
                                                    type={data.fieldType}
                                                    value={formik.values[data.fieldName]}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                />
                                                {formik.errors[data.fieldName] &&
                                                    formik.touched[data.fieldName] && (
                                                        <div className='d-flex align-items-center mt-2'>
                                                            <InputError
                                                                className='input-error'
                                                                errorTitle={
                                                                    formik.errors[
                                                                    data.fieldName
                                                                    ]
                                                                }
                                                            />
                                                        </div>
                                                    )}
                                            </div>
                                        )
                                    } else if (data.fieldType === 'array') {
                                        return (
                                            <FormikProvider value={formik} key={i}>
                                                <FieldArray
                                                    name={data.fieldName}
                                                    render={arrayHelpers => {
                                                        return (
                                                            <>
                                                                <div
                                                                    className={`sign-input col-sm-6 ${formik.errors[
                                                                        data.fieldName
                                                                    ] &&
                                                                        formik.touched[
                                                                        data.fieldName
                                                                        ]
                                                                        ? ` error-inputs `
                                                                        : ``
                                                                        } mb-3`}
                                                                >
                                                                    <LabelTag
                                                                        classes={
                                                                            'text-gray fn-12 mb-2'
                                                                        }
                                                                        text={
                                                                            data.fieldLabel
                                                                        }
                                                                        For={data.fieldName}
                                                                    />
                                                                    <Select
                                                                        className='form-control p-0'
                                                                        options={
                                                                            data.fieldName ===
                                                                                'genres'
                                                                                ? allGenere
                                                                                : data.fieldName ===
                                                                                    'gender'
                                                                                    ? genders
                                                                                    : data.fieldName ===
                                                                                        'languagesKnown'
                                                                                        ? allLanguages
                                                                                        : data.fieldName ===
                                                                                            'amenities'
                                                                                            ? allAmenities
                                                                                            : (data.fieldName ===
                                                                                                'invType'
                                                                                                ? inventoryOptions
                                                                                                : data.fieldName === 'invsubtype' ? inventorySubOptions : options)
                                                                        }
                                                                        isSearchable={true}
                                                                        placeholder={`Enter ${data.fieldLabel}`}
                                                                        name={
                                                                            data.fieldName
                                                                        }
                                                                        onBlur={formik.handleBlur(
                                                                            data.fieldName
                                                                        )}
                                                                        isMulti={data?.multiSelect ? true : false}
                                                                        onChange={e => {
                                                                            formik.handleChange(data.fieldName)
                                                                            data?.multiSelect ? (
                                                                                formik.setFieldValue(data.fieldName, []),
                                                                                arrayHelpers.push(e)
                                                                            ) : (
                                                                                arrayHelpers.remove(e),
                                                                                arrayHelpers.push(e),
                                                                                // condition
                                                                                data.fieldName === "invType" && dispatch(getInventorySubtypeApi(e.inventoryTypeId))
                                                                                    .then(res => {
                                                                                        setInventorySubOptions(res.payload.data.map(x => {
                                                                                            return { ...x, label: x.name, value: x.inventorySubtypeId }
                                                                                        }))
                                                                                    })
                                                                            )
                                                                        }}
                                                                    />
                                                                    {formik.errors[
                                                                        data.fieldName
                                                                    ] &&
                                                                        formik.touched[
                                                                        data.fieldName
                                                                        ] && (
                                                                            <InputError
                                                                                className='input-error mt-2'
                                                                                errorTitle={
                                                                                    formik
                                                                                        .errors[
                                                                                    data
                                                                                        .fieldName
                                                                                    ]
                                                                                }
                                                                            />
                                                                        )}
                                                                </div>
                                                            </>
                                                        )
                                                    }}
                                                />
                                            </FormikProvider>
                                        )
                                    } else if (data.fieldType === 'multitags') {
                                        return (
                                            <FormikProvider value={formik} key={i}>
                                                <FieldArray
                                                    name={data.fieldName}
                                                    render={arrayHelpers => {
                                                        const tempArray =
                                                            formik.values[data.fieldName]
                                                        return (
                                                            <div className='col-sm-6'>
                                                                <div
                                                                    className={`sign-input ${formik.errors[
                                                                        data.fieldName
                                                                    ] &&
                                                                        formik.touched[
                                                                        data.fieldName
                                                                        ]
                                                                        ? `error-inputs `
                                                                        : ``
                                                                        }mb-3`}
                                                                >
                                                                    <LabelTag
                                                                        classes={
                                                                            'text-gray fn-12 mb-2'
                                                                        }
                                                                        text={
                                                                            data.fieldLabel
                                                                        }
                                                                        For={data.fieldName}
                                                                    />
                                                                    <div className='d-flex position-relative'>
                                                                        <FiTag
                                                                            fontSize={20}
                                                                            className={
                                                                                'me-2 input-add-icon-left Fi-Tag'
                                                                            }
                                                                        />
                                                                        <InputTag
                                                                            placeholder={`Enter ${data.fieldName}`}
                                                                            classes={
                                                                                'form-control input-plachholder-paddingleft'
                                                                            }
                                                                            id={
                                                                                data.fieldName
                                                                            }
                                                                            name={
                                                                                data.fieldName
                                                                            }
                                                                            onBlur={formik.handleBlur(
                                                                                data.fieldName
                                                                            )}
                                                                            onKeyDown={e => {
                                                                                if (
                                                                                    e.key ===
                                                                                    'Enter'
                                                                                ) {
                                                                                    e.preventDefault()
                                                                                    if (
                                                                                        e
                                                                                            .target
                                                                                            .value !=
                                                                                        ''
                                                                                    ) {
                                                                                        arrayHelpers.push(
                                                                                            e
                                                                                                .target
                                                                                                .value
                                                                                        )
                                                                                        e.target.value =
                                                                                            ''
                                                                                    }
                                                                                }
                                                                            }}
                                                                        />
                                                                    </div>
                                                                    {formik.errors[
                                                                        data.fieldName
                                                                    ] &&
                                                                        formik.touched[
                                                                        data.fieldName
                                                                        ] && (
                                                                            <div className='d-flex align-items-center mt-2'>
                                                                                <InputError
                                                                                    className='input-error'
                                                                                    errorTitle={
                                                                                        formik
                                                                                            .errors[
                                                                                        data
                                                                                            .fieldName
                                                                                        ]
                                                                                    }
                                                                                />
                                                                            </div>
                                                                        )}
                                                                </div>
                                                                <div className='d-flex flex-wrap'>
                                                                    {tempArray !==
                                                                        undefined &&
                                                                        tempArray.map(
                                                                            (
                                                                                element,
                                                                                index
                                                                            ) => {
                                                                                return (
                                                                                    <div
                                                                                        className='btn-dark-blue  me-2 rounded px-3 py-2 mb-2'
                                                                                        key={
                                                                                            index
                                                                                        }
                                                                                    >
                                                                                        <div
                                                                                            className={
                                                                                                'd-flex w-100'
                                                                                            }
                                                                                        >
                                                                                            <PTag
                                                                                                classes={
                                                                                                    'bold me-1'
                                                                                                }
                                                                                                texts={
                                                                                                    element
                                                                                                }
                                                                                            />
                                                                                            <span
                                                                                                onClick={() => {
                                                                                                    arrayHelpers.remove(
                                                                                                        index
                                                                                                    )
                                                                                                }}
                                                                                                role='button'
                                                                                            >
                                                                                                <MdClose
                                                                                                    fontSize={
                                                                                                        20
                                                                                                    }
                                                                                                    className={
                                                                                                        'Md-Close'
                                                                                                    }
                                                                                                />
                                                                                            </span>
                                                                                        </div>
                                                                                    </div>
                                                                                )
                                                                            }
                                                                        )}
                                                                </div>
                                                            </div>
                                                        )
                                                    }}
                                                />
                                            </FormikProvider>
                                        )
                                    }
                                })()
                            )
                        )}
                    </div>

                    <div className='d-flex justify-content-center mx-auto my-4'>
                        <ButtonTag
                            type={'submit'}
                            classes={'btn btn-green rounded white-space-nowrap'}
                            value={(projectId && requirementId) ? 'Update' : 'Add'}
                        />
                    </div>

                    <div>
                        {allRequirements?.map((items, i) => (
                            <div key={i}>
                                <div className='border rounded-10 p-3 my-4'>
                                    <div className='d-flex justify-content-between pb-2 border-bottom'>
                                        <div className=''>
                                            <PTag
                                                classes={'text-dark-blue text-capitalize fw-bold fn-18'}
                                                texts={items?.profileType}
                                            />
                                            <PTag
                                                classes={''}
                                                texts={'expiry date - 27 oct 2020'}
                                            />
                                        </div>
                                        <div className='d-flex'>
                                            <div
                                                className={`${addUpdate ? 'btn-disable' : null}`}
                                            >
                                                <Edit
                                                    width={25}
                                                    onClick={() => {
                                                        setCurrentEditRequirementIndex(i)
                                                        setIsMiniloading({ ...isMiniloading, dynamicFieldsLoader: true })
                                                        setIsAddUpdate(true)
                                                    }}
                                                />
                                            </div>
                                            <div className=''>
                                                <MdDelete
                                                    className={'Md-Delete ms-3'}
                                                    onClick={() => {
                                                        DeleteSocialProfileAlert(i)
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='mt-3'>
                                        <PTag classes={''} texts={'Genres'} />
                                        <div className='text-wrap text-break'>
                                            {items?.genres?.map((genre, i) => (
                                                <span
                                                    className='text-dark-blue semibold fn-16 text-capitalize'
                                                    key={i}
                                                >
                                                    {i > 0 && ', '}
                                                    <span>{genre}</span>
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className='mt-3'>
                                        <PTag classes={''} texts={'Budget'} />
                                        <div className='d-flex align-items-center justify-content-between flex-wrap'>
                                            <PTag
                                                classes={'text-dark-blue bold fn-16'}
                                                texts={`Minimum - ₹${items.minBudget.toLocaleString(
                                                    'en-IN'
                                                )}`}
                                            />
                                            <PTag
                                                classes={'text-dark-blue bold fn-16'}
                                                texts={`Maximum - ₹${items.maxBudget.toLocaleString(
                                                    'en-IN'
                                                )}`}
                                            />
                                        </div>
                                    </div>
                                    <div className='my-3'>
                                        <PTag classes={''} texts={'Location'} />
                                        {projectData?.projectLocations?.map((tag, i) => (
                                            <span
                                                className='text-dark-blue semibold fn-16 text-capitalize'
                                                key={i}
                                            >
                                                {i > 0 && ', '}
                                                <span>{tag}</span>
                                            </span>
                                        ))}
                                    </div>
                                    <div className=''></div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {!requirementId &&
                        <div className='d-flex justify-content-center mb-4'>
                            <ButtonTag
                                type={'button'}
                                classes={'btn btn-orange'}
                                value={'Continue'}
                                onClick={e => {
                                    navigation(`/dashboard/projectdetails/`, {
                                        state: {
                                            projectId
                                        }
                                    })
                                }}
                            />
                        </div>
                    }
                </div>
            </form>
        </div>
    </div> :
        <div className='my-4 text-center'>
            <h2 className='mb-3'>Please create Project first</h2>
            <Link to="/dashboard/projects" className='btn btn btn-dark-blue semibold fn-12 rounded' >Create Project</Link>
        </div>


}


export default IsLoadingHOC(AddRequirement)