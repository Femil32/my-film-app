import React, { useState, useEffect, memo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
    BackButton,
    ButtonTag,
    Checkbox,
    InputTag,
    LabelTag,
    PTag,
} from '../../components/designComponents/MicroComponents'
import Select from 'react-select'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import InputError from '../../components/common/InputError'
import { getCouponPackages, getInventoryItems } from '../../store/coupon/slice'
import { allCategoryApi, FilterSubCategory, FilterSubSubCategory } from '../../store/category/slice'
import { getInventorySubtypeApi, getInventorytypeApi } from '../../store/service/slice'
import { useDispatch, useSelector } from 'react-redux'
import { minInputRange, setDropOptions, valInputRange } from '../../helpers/functions'
import { editSpotDeal, getSingleSpotDeal, getSpotDealCode, saveSpotDeal, setSpotDeals } from '../../store/spotdeals/slice'
import { toast } from 'react-toastify'
import IsLoadingHOC from '../../components/higherOrderLoader/IsLoadingHOC'
import { couponMsg } from '../../components/common/ValidationConstants'
import "react-multi-date-picker/styles/layouts/mobile.css"
import { CustomDatePicker } from '../../components/DateAndTime'



const AddMySpotDeals = memo(({ setLoading }) => {
    const navigation = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    const { spotDealId } = location.state ?? false

    //options
    const [categoryOptions, setCategoryOptions] = useState([])
    const [subCategoryOptions, setSubCategoryOptions] = useState([])
    const [subSubCategoryOptions, setSubSubCategoryOptions] = useState([])
    const [invTypesOptions, setInvTypesOptions] = useState([])
    const [invSubTypeOptions, setInvSubTypeOptions] = useState([])
    const [invItemsOptions, setInvItemsOptions] = useState([])
    const [packageOptions, setPackageOptions] = useState([])
    //update
    const [spotDealData, setSpotDealData] = useState({})

    const spotDealProfile = useSelector(state => state.spotdeals)

    //const categoryDetail = useSelector(state => state.category)

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            spotDealDates: null,
            couponCode: '',
            couponValue: '',
            minimumPurchaseAmount: '',
            categoryId: "",
            subCategoryId: "",
            subSubCategoryId: "",
            inventoryTypeId: "",
            inventorySubtypeId: "",
            inventoryItems: [],
            packageIds: '',
            appliesToPackage: spotDealData?.appliesToPackage ?? true,
            appliesToEntireOrder: spotDealData?.appliesToEntireOrder ?? false,
            // conditionally validation
            isMinPurchase: true,
            isSubSubCategory: false,
            isService: true,
        },
        validationSchema: Yup.object().shape({
            spotDealDates: Yup.array().nullable().required('please select date'),
            couponCode: Yup.string().required('please add coupon code'),
            couponValue: valInputRange('value', 0, 101),
            minimumPurchaseAmount: Yup.mixed().nullable()
                .when('isMinPurchase', (isMinPurchase, schema) => {
                    if (isMinPurchase) {
                        return minInputRange('amount', 0)
                    } else {
                        return schema
                    }
                }),
            categoryId: Yup.object().nullable().required('please enter Category'),
            subCategoryId: Yup.object().nullable().required('please enter Sub Category'),
            subSubCategoryId: Yup.object()
                .nullable()
                .when('isSubSubCategory', (isSubSubCategory, schema) => {
                    if (isSubSubCategory) {
                        return schema.required('Please enter Sub Sub Category')
                    } else {
                        return schema
                    }
                }),
            inventoryTypeId: Yup.mixed().when('isService', {
                is: true,
                then: Yup.object().nullable().required('please enter select inventory'),
            }),
            inventorySubtypeId: Yup.mixed().when('isService', {
                is: true,
                then: Yup.object().nullable().required('please enter select inventory'),
            }),
            inventoryItems: Yup.mixed().when('isService', {
                is: true,
                then: Yup.array().nullable().required('please enter inventory items'),
            }),
            appliesToPackage: Yup.boolean(),
            appliesToEntireOrder: Yup.boolean(),
            // conditionally validation
            isMinPurchase: Yup.boolean(),
            isSubSubCategory: Yup.boolean(),
            isService: Yup.boolean(),
        }),
        onSubmit: (values, { resetForm }) => {
            SubmitHandler(values)
        },
    })

    const { values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue } = formik

    useEffect(() => {
        Promise.all([
            dispatch(allCategoryApi()),
            dispatch(getCouponPackages()),
            dispatch(setSpotDeals()),
            spotDealId && dispatch(getSingleSpotDeal(spotDealId)),
        ])
            .then(res => {
                const singleSpotDeal = res[0]?.payload ?? null
                setSpotDealData({ ...singleSpotDeal })
                const data = res[0]?.payload.map((item, index) => {
                    return ({
                        ...item,
                        label: item.name,
                        value: item.categoryId
                    })
                })

                if (singleSpotDeal) {
                    setCategoryOptions([...data])
                    setFieldValue("spotDealDates", singleSpotDeal?.spotDealDates?.map(d => new Date(d)))
                    setFieldValue("couponCode", singleSpotDeal?.couponCode)
                    setFieldValue("couponValue", singleSpotDeal?.couponValue)
                    setFieldValue("minimumPurchaseAmount", singleSpotDeal?.minimumPurchaseAmount)
                    setFieldValue("appliesToPackage", singleSpotDeal?.appliesToPackage)
                    setFieldValue("appliesToEntireOrder", singleSpotDeal?.appliesToEntireOrder)
                }

                if (singleSpotDeal) {
                    setFieldValue("spotDealDates", singleSpotDeal?.spotDealDates?.map(d => new Date(d)))
                    setFieldValue("couponCode", singleSpotDeal?.couponCode)
                    setFieldValue("couponValue", singleSpotDeal?.couponValue)
                    setFieldValue("minimumPurchaseAmount", singleSpotDeal?.minimumPurchaseAmount)
                    setFieldValue("appliesToPackage", singleSpotDeal?.appliesToPackage)
                    setFieldValue("appliesToEntireOrder", singleSpotDeal?.appliesToEntireOrder)
                }

                spotDealId && setFieldValue('categoryId', data.find((item) => { return item.categoryId === singleSpotDeal?.categoryId }))

                res[0]?.payload?.map(x => {
                    if (x.categoryId === singleSpotDeal?.categoryId) {
                        dispatch(FilterSubCategory(x.categoryId)).then(subCategories => {
                            setSubCategoryOptions(
                                subCategories?.payload?.map(subCategory => {
                                    subCategory.subCategoryId ===
                                        singleSpotDeal?.subCategoryId &&
                                        setFieldValue(
                                            'subCategoryId',
                                            setDropOptions(
                                                subCategory,
                                                'subCategoryName',
                                                'subCategoryId'
                                            )
                                        )
                                    return setDropOptions(
                                        subCategory,
                                        'subCategoryName',
                                        'subCategoryId'
                                    )
                                })
                            )
                            // subSubCategoryId
                            dispatch(
                                FilterSubSubCategory({
                                    categoryId: singleSpotDeal?.categoryId,
                                    subCategoryId: singleSpotDeal?.subCategoryId,
                                })
                            ).then(subSubCategories => {
                                setSubSubCategoryOptions(
                                    subSubCategories?.payload.map(subSubCategory => {
                                        let temp = setDropOptions(
                                            subSubCategory,
                                            'subSubCategoryName',
                                            'subSubCategoryId'
                                        )
                                        subSubCategory.subSubCategoryId ===
                                            singleSpotDeal?.subSubCategoryId &&
                                            setFieldValue('subSubCategoryId', temp)
                                        return temp
                                    })
                                )
                            })
                            singleSpotDeal?.minimumPurchaseAmount === 0 &&
                                setFieldValue('isMinPurchase', false)

                            if (singleSpotDeal?.categoryId === 3) {
                                // inventoryTypeId
                                dispatch(
                                    getInventorytypeApi(singleSpotDeal?.subSubCategoryId)
                                ).then(subSubCategories => {
                                    setInvTypesOptions(
                                        subSubCategories?.payload.map(aa => {
                                            let temp = setDropOptions(aa, 'name', 'inventoryTypeId')
                                            aa.inventoryTypeId ===
                                                singleSpotDeal?.inventoryTypeId &&
                                                setFieldValue('inventoryTypeId', temp)
                                            return temp
                                        })
                                    )
                                })
                                // inventorySubtypeId
                                dispatch(
                                    getInventorySubtypeApi(singleSpotDeal?.inventoryTypeId)
                                ).then(invSubTypes => {
                                    setInvSubTypeOptions(
                                        invSubTypes?.payload.map(invSubType => {
                                            let temp = setDropOptions(
                                                invSubType,
                                                'name',
                                                'inventorySubtypeId'
                                            )
                                            invSubType.inventorySubtypeId ===
                                                singleSpotDeal?.inventorySubtypeId &&
                                                setFieldValue('inventorySubtypeId', temp)
                                            return temp
                                        })
                                    )
                                })
                                // inventorySubtypeId
                                const payload = {
                                    categoryId: singleSpotDeal?.categoryId,
                                    subCategoryId: singleSpotDeal?.subCategoryId,
                                    subSubCategoryId: singleSpotDeal?.subSubCategoryId,
                                    inventoryTypeId: singleSpotDeal?.inventoryTypeId,
                                    inventorySubtypeId: singleSpotDeal.inventorySubtypeId,
                                }
                                dispatch(getInventoryItems(payload)).then(invItems => {
                                    setInvItemsOptions(
                                        invItems?.payload?.map(invItem => {
                                            return setDropOptions(
                                                invItem,
                                                'inventoryName',
                                                'serviceInventoryId'
                                            )
                                        })
                                    )
                                    setFieldValue(
                                        'inventoryItems',
                                        singleSpotDeal?.inventoryItems.map(sc =>
                                            setDropOptions(
                                                sc,
                                                'inventoryName',
                                                'serviceInventoryId'
                                            )
                                        )
                                    )
                                })
                            } else {
                                setFieldValue('isService', false)
                            }
                        })
                    }
                    return setDropOptions(x, 'name', 'categoryId')
                })


                const temp = []
                setPackageOptions(
                    res[2]?.payload?.packages?.map(x => {
                        singleSpotDeal?.packageIds.includes(x.inventoryPackageId) &&
                            temp.push(setDropOptions(x, 'packageName', 'inventoryPackageId'))
                        return setDropOptions(x, 'packageName', 'inventoryPackageId')
                    })
                )
                setFieldValue('packageIds', temp)
                return () => {
                    setCategoryOptions({})
                    setLimitUsageOptions({})
                    setPackageOptions({})
                }
            })
            .then(() => setLoading(false))
    }, [])

    useEffect(() => {

    }, [spotDealData])

    useEffect(() => {
        switch (spotDealProfile?.status) {
            case 'succeed':
                switch (spotDealProfile?.type) {
                    case 'SAVE_SPOT_DEAL':
                        toast.success(couponMsg.couponCreated)
                        navigation(`/dashboard/spotdeals`)
                        dispatch(setSpotDeals())
                        break
                    case 'EDIT_SPOT_DEAL':
                        toast.success(couponMsg.couponUpdated)
                        navigation(`/dashboard/spotdeals`)
                        dispatch(setSpotDeals())
                    case 'SINGLE_SPOT_DEAL':
                        setSpotDealData(spotDealProfile?.singleSpotDeal)
                        break

                    default:
                        break
                }
                break
            case 'failed':
                toast.error(spotDealProfile?.error)
                break

            default:
                break
        }
    }, [spotDealProfile])

    const resetData = () => {
        setInvItemsOptions([])
        setInvSubTypeOptions([])
        setInvTypesOptions([])
        setSubCategoryOptions([])
        setSubSubCategoryOptions([])
        return null
    }

    const SubmitHandler = val => {
        const payload = { ...val }
        // minimumPurchaseAmount
        payload['spotDealDates'] =
            val?.spotDealDates.sort((a, b) => {
                return new Date(a) - new Date(b)
            }) ?? null
        payload['couponCode'] = payload.couponCode
        payload['categoryId'] = val?.categoryId?.value ?? null
        payload['subCategoryId'] = val?.subCategoryId?.value ?? null
        payload['subSubCategoryId'] = val?.subSubCategoryId?.value ?? null
        payload['inventoryTypeId'] = val?.inventoryTypeId?.value ?? null
        payload['inventorySubtypeId'] = val?.inventorySubtypeId?.value ?? null
        payload['inventoryItems'] = val?.inventoryItems?.map(x => {
            return {
                serviceProfileId: x.serviceProfileId,
                serviceInventoryId: x.serviceInventoryId,
                inventoryName: x.inventoryName,
            }
        })
        payload['packageIds'] = values?.packageIds?.map(x => x.value)
        delete payload.isMinPurchase
        delete payload.isService
        delete payload.isSubSubCategory
        spotDealId
            ? dispatch(editSpotDeal({ id: spotDealId, payload }))
            : dispatch(saveSpotDeal(payload))
    }




    return (
        <>
            <div className='container'>
                <div className=''>
                    <BackButton
                        title={'My Spot Deals'}
                        onClick={() => {
                            navigation('/dashboard/spotdeals')
                        }}
                    />
                </div>
                <div className='max-w-625 mx-auto mt-5'>
                    <form onSubmit={handleSubmit}>
                        <div className='row'>
                            <div className='col-12'>
                                <LabelTag classes={'mb-2'} text={'Select Date'} />
                                <div
                                    className={`datePicker-input sign-input ${errors.spotDealDates && touched.spotDealDates
                                        ? ` error-inputs `
                                        : ``
                                        }mb-3`}
                                >
                                    <CustomDatePicker
                                        multiple='true'
                                        minDate={'beforeToday'}
                                        name='spotDealDates'
                                        inputClass={'px-3 py-2'}
                                        className={'rmdp-mobile'}
                                        containerClassName={'w-100 form-control'}
                                        value={values.spotDealDates}
                                        onChange={val => {
                                            setFieldValue(
                                                'spotDealDates',
                                                val.map(e => new Date(e))
                                            )
                                        }}
                                        format={'DD-MM-YYYY'}
                                        placeholder={'Select Date'}
                                    />
                                    {errors.spotDealDates && touched.spotDealDates ? (
                                        <InputError
                                            className={'input-error mt-2'}
                                            errorTitle={errors.spotDealDates}
                                        />
                                    ) : null}
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='d-flex align-items-center justify-content-between mb-2'>
                                <LabelTag text={'Discount Code'} />
                                <LabelTag
                                    classes={'text-primary pointer'}
                                    text={'Generate Code'}
                                    onClick={e => {
                                        e.preventDefault()
                                        dispatch(getSpotDealCode()).then(res =>
                                            setFieldValue('couponCode', res.payload)
                                        )
                                    }}
                                />
                            </div>
                            <div
                                className={`sign-input ${errors.couponCode && touched.couponCode ? ` error-inputs ` : ``
                                    }mb-3`}
                            >
                                <InputTag
                                    readOnly
                                    type={'text'}
                                    placeholder={'Eg Summer Sale'}
                                    name='couponCode'
                                    value={values.couponCode}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    classes={'form-control'}
                                />
                                {errors.couponCode && touched.couponCode ? (
                                    <InputError
                                        className={'input-error mt-2'}
                                        errorTitle={errors.couponCode}
                                    />
                                ) : null}
                            </div>

                            <div
                                className={`sign-input ${errors.couponValue && touched.couponValue
                                    ? ` error-inputs `
                                    : ``
                                    }mb-3`}
                            >
                                <LabelTag classes={'mb-2'} text={'Discount Value'} />
                                <div className='d-flex position-relative'>
                                    <InputTag
                                        type={'number'}
                                        placeholder={'Enter Discount Value'}
                                        name='couponValue'
                                        onChange={handleChange('couponValue')}
                                        onBlur={handleBlur('couponValue')}
                                        classes={'form-control'}
                                        value={values.couponValue}
                                    />
                                    <PTag
                                        classes={
                                            'text-dark-blue white-space-nowrap fw-bold fn-20 me-2 input-add-icon-right'
                                        }
                                        texts={'%'}
                                    />
                                </div>
                                {errors.couponValue && touched.couponValue ? (
                                    <InputError
                                        className={'input-error mt-2'}
                                        errorTitle={errors.couponValue}
                                    />
                                ) : null}
                            </div>
                        </div>
                        <div className='row'>
                            <div className='my-2'>
                                <Checkbox
                                    For={'discountcheck'}
                                    classes={'ps-0 mb-3'}
                                    id={'discountcheck'}
                                    name={'isMinPurchase'}
                                    onChange={async e => {
                                        await setFieldValue('isMinPurchase', e.target.checked)
                                        await setFieldValue('minimumPurchaseAmount', '')
                                    }}
                                    Checkboxlabel={'The discount requires a minimum purchase'}
                                    defaultChecked={values.isMinPurchase}
                                />
                            </div>
                            <div
                                className={`sign-input ${errors.minimumPurchaseAmount && touched.minimumPurchaseAmount
                                    ? ` error-inputs `
                                    : ``
                                    }mb-3`}
                            >
                                <LabelTag classes={'mb-2'} text={'Enter Amount'} />
                                <InputTag
                                    type={'number'}
                                    disabled={!values.isMinPurchase}
                                    name='minimumPurchaseAmount'
                                    value={values.minimumPurchaseAmount}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder={'Enter Amount'}
                                    classes={'form-control'}
                                />
                                {errors.minimumPurchaseAmount && touched.minimumPurchaseAmount ? (
                                    <InputError
                                        className={'input-error mt-2'}
                                        errorTitle={errors.minimumPurchaseAmount}
                                    />
                                ) : null}
                            </div>
                        </div>
                        <div className='mt-4'>
                            <PTag classes={'text-dark-blue fw-bold my-3'} texts={'Applies to'} />
                            <div className='row'>
                                <div className='col-lg-6'>
                                    <div
                                        className={`sign-input ${errors.categoryId && touched.categoryId
                                            ? `error-inputs `
                                            : ``
                                            }mb-3`}
                                    >
                                        <LabelTag classes={'mb-2'} text={'Category'} />
                                        <Select
                                            name='categoryId'
                                            className='form-control p-0'
                                            onChange={e => {
                                                //handleChange('categoryId')
                                                setFieldValue('categoryId', e)
                                                resetData()
                                                setFieldValue('inventoryTypeId', null)
                                                setFieldValue('inventorySubtypeId', null)
                                                setFieldValue('inventoryItems', null)
                                                setFieldValue('subCategoryId', '')
                                                setFieldValue('subSubCategoryId', '')
                                                setFieldValue(
                                                    'isService',
                                                    e.value === 3 ? true : false
                                                )
                                                dispatch(FilterSubCategory(e.value)).then(res => {
                                                    setSubCategoryOptions(
                                                        res?.payload?.map(x => {
                                                            return {
                                                                ...x,
                                                                label: x.subCategoryName,
                                                                value: x.subCategoryId,
                                                            }
                                                        })
                                                    )
                                                })
                                            }}

                                            value={values.categoryId}
                                            onBlur={handleBlur('categoryId')}
                                            options={categoryOptions}
                                            getOptionValue={subCategory => subCategory.value}
                                        />
                                        {errors.categoryId && touched.categoryId ? (
                                            <InputError
                                                className={'input-error mt-2'}
                                                errorTitle={errors.categoryId}
                                            />
                                        ) : null}
                                    </div>
                                </div>
                                <div className='col-lg-6'>
                                    <div
                                        className={`sign-input ${errors.subCategoryId && touched.subCategoryId
                                            ? `error-inputs `
                                            : ``
                                            }mb-3`}
                                    >
                                        <LabelTag classes={'mb-2'} text={'Sub Category'} />
                                        <Select
                                            name='subCategoryId'
                                            className='form-control p-0'
                                            onChange={e => {
                                                setFieldValue('subSubCategoryId', '')
                                                setFieldValue('subCategoryId', e)
                                                dispatch(
                                                    FilterSubSubCategory({
                                                        categoryId: values.categoryId.value,
                                                        subCategoryId: e.value,
                                                    })
                                                ).then(res => {
                                                    setFieldValue(
                                                        'isSubSubCategory',
                                                        res.payload.length ? true : false
                                                    )
                                                    setSubSubCategoryOptions(
                                                        res.payload?.map(x => {
                                                            return {
                                                                ...x,
                                                                label: x.subSubCategoryName,
                                                                value: x.subSubCategoryId,
                                                            }
                                                        })
                                                    )
                                                })
                                            }}
                                            value={values.subCategoryId}
                                            onBlur={handleBlur('subCategoryId')}
                                            options={subCategoryOptions}
                                        />
                                        {errors.subCategoryId && touched.subCategoryId ? (
                                            <InputError
                                                className={'input-error mt-2'}
                                                errorTitle={errors.subCategoryId}
                                            />
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div
                                    className={`sign-input col-lg-6 ${errors.subSubCategoryId && touched.subSubCategoryId
                                        ? `error-inputs `
                                        : ``
                                        }mb-3`}
                                >
                                    <LabelTag classes={'mb-2'} text={'Sub Sub Category'} />
                                    <Select
                                        name='subSubCategoryId'
                                        className='form-control p-0'
                                        onChange={e => {
                                            setFieldValue('subSubCategoryId', e)
                                            dispatch(getInventorytypeApi(e.value)).then(res => {
                                                setInvTypesOptions(
                                                    res.payload.map(x => {
                                                        return {
                                                            ...x,
                                                            label: x.name,
                                                            value: x.inventoryTypeId,
                                                        }
                                                    })
                                                )
                                            })
                                        }}
                                        value={values.subSubCategoryId}
                                        // onChange={e => handleChange('subSubCategoryId')(e.value)}
                                        onBlur={handleBlur('subSubCategoryId')}
                                        options={subSubCategoryOptions}
                                    />
                                    {errors.subSubCategoryId && touched.subSubCategoryId ? (
                                        <InputError
                                            className={'input-error mt-2'}
                                            errorTitle={errors.subSubCategoryId}
                                        />
                                    ) : null}
                                </div>
                                <div
                                    className={`sign-input col-lg-6 ${errors.inventoryTypeId && touched.inventoryTypeId
                                        ? `error-inputs `
                                        : ``
                                        }mb-3`}
                                >
                                    <LabelTag classes={'mb-2'} text={'Select Inventory Type'} />
                                    <Select
                                        name='inventoryTypeId'
                                        className='form-control p-0'
                                        noOptionsMessage={() => 'Only for service'}
                                        onChange={e => {
                                            setFieldValue('inventoryTypeId', e)
                                            dispatch(getInventorySubtypeApi(e.value)).then(res =>
                                                setInvSubTypeOptions(
                                                    res.payload.map(x => {
                                                        return {
                                                            ...x,
                                                            label: x.name,
                                                            value: x.inventorySubtypeId,
                                                        }
                                                    })
                                                )
                                            )
                                        }}
                                        value={values.inventoryTypeId}
                                        onBlur={handleBlur('inventoryTypeId')}
                                        options={invTypesOptions}
                                    />
                                    {errors.inventoryTypeId && touched.inventoryTypeId ? (
                                        <InputError
                                            className={'input-error mt-2'}
                                            errorTitle={errors.inventoryTypeId}
                                        />
                                    ) : null}
                                </div>
                            </div>
                            <div className='row'>
                                <div
                                    className={`sign-input col-lg-6 ${errors.inventorySubtypeId && touched.inventorySubtypeId
                                        ? `error-inputs `
                                        : ``
                                        }mb-3`}
                                >
                                    <LabelTag classes={'mb-2'} text={'Inventory Sub-Type'} />
                                    <Select
                                        name='inventorySubtypeId'
                                        className='form-control p-0'
                                        onChange={e => {
                                            setFieldValue('inventorySubtypeId', e)
                                            const payload = {
                                                categoryId: values?.categoryId?.value,
                                                subCategoryId: values?.subCategoryId?.value,
                                                subSubCategoryId: values?.subSubCategoryId?.value,
                                                inventoryTypeId: values?.inventoryTypeId?.value,
                                                inventorySubtypeId: e.value,
                                            }
                                            dispatch(getInventoryItems(payload)).then(res =>
                                                setInvItemsOptions(
                                                    res.payload?.map(x => {
                                                        return {
                                                            ...x,
                                                            label: x.inventoryName,
                                                            value: x.serviceInventoryId,
                                                        }
                                                    })
                                                )
                                            )
                                        }}
                                        value={values.inventorySubtypeId}
                                        onBlur={handleBlur('inventorySubtypeId')}
                                        options={invSubTypeOptions}
                                        noOptionsMessage={() => 'Only for service'}
                                    />
                                    {errors.inventorySubtypeId && touched.inventorySubtypeId ? (
                                        <InputError
                                            className={'input-error mt-2'}
                                            errorTitle={errors.inventorySubtypeId}
                                        />
                                    ) : null}
                                </div>
                                <div
                                    className={`sign-input col-lg-6 ${errors.inventoryItems && touched.inventoryItems
                                        ? `error-inputs `
                                        : ``
                                        }mb-3`}
                                >
                                    <LabelTag classes={'mb-2'} text={'Inventory Items'} />
                                    <Select
                                        isMulti={true}
                                        name='inventoryItems'
                                        className='form-control p-0'
                                        onChange={e => setFieldValue('inventoryItems', e)}
                                        value={values.inventoryItems}
                                        onBlur={handleBlur('inventoryItems')}
                                        options={invItemsOptions}
                                        noOptionsMessage={() => 'Only for service'}
                                    />
                                    {errors.inventoryItems && touched.inventoryItems ? (
                                        <InputError
                                            className={'input-error mt-2'}
                                            errorTitle={errors.inventoryItems}
                                        />
                                    ) : null}
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-12'>
                                <div className='mb-3'>
                                    <Checkbox
                                        For={'appliesToPackage'}
                                        classes={'ps-0'}
                                        id={'appliesToPackage'}
                                        value={values?.appliesToPackage}
                                        onChange={e => {
                                            setFieldValue('appliesToPackage', e.target.checked)
                                            setFieldValue('packageIds', null)
                                        }}
                                        Checkboxlabel={'Applies to Packages'}
                                    />
                                </div>
                                <div
                                    className={`sign-input ${errors.packageIds && touched.packageIds
                                        ? ` error-inputs `
                                        : ``
                                        }mb-3`}
                                >
                                    <LabelTag classes={'mb-2'} text={'Select Package'} />
                                    <Select
                                        isMulti={true}
                                        // styles={customStyles}
                                        isDisabled={!values.appliesToPackage}
                                        name='packageIds'
                                        className={`${!values.appliesToPackage
                                            ? 'form-control-disabled'
                                            : 'form-control'
                                            } p-0 pt-1 mb-2`}
                                        value={values.packageIds}
                                        onChange={e => setFieldValue('packageIds', e)}
                                        onBlur={handleBlur('packageIds')}
                                        options={packageOptions}
                                    />
                                    {errors.packageIds && touched.packageIds ? (
                                        <InputError
                                            className={'input-error mt-2'}
                                            errorTitle={errors.packageIds}
                                        />
                                    ) : null}
                                </div>
                                <Checkbox
                                    classes={'ps-0'}
                                    For={'appliesToEntireOrder'}
                                    id={'appliesToEntireOrder'}
                                    value={values?.appliesToEntireOrder}
                                    onChange={handleChange}
                                    Checkboxlabel={'Applies to Entire Order '}
                                />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='d-flex justify-content-center'>
                                <ButtonTag
                                    classes={'btn btn-orange my-4'}
                                    type={'submit'}
                                    value={spotDealId ? 'Update' : 'Save'}
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
})

export default IsLoadingHOC(AddMySpotDeals)
