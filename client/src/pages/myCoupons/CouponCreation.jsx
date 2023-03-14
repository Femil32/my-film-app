import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik'
import { useLocation, useNavigate } from 'react-router-dom'
import Select from 'react-select'
import * as Yup from 'yup'
import InputError from '../../components/common/InputError'
import { BackButton, ButtonTag, Checkbox, InputTag, LabelTag, PTag } from '../../components/designComponents/MicroComponents'
import { couponLimit, editCoupon, generateNewCode, getCouponPackages, getDiscountTypes, getInventoryItems, getSingleCoupon, saveCoupon, setCoupon } from '../../store/coupon/slice';
import { useDispatch, useSelector } from 'react-redux';
import { allCategoryApi, FilterSubCategory, FilterSubSubCategory } from '../../store/category/slice';
import { minInputRange, setDropOptions, valInputRange } from '../../helpers/functions';
import { getInventorySubtypeApi, getInventorytypeApi } from '../../store/service/slice';
import { toast } from 'react-toastify';
import { couponMsg } from '../../components/common/ValidationConstants';
import moment from 'moment';
import IsLoadingHOC from '../../components/higherOrderLoader/IsLoadingHOC';
import { CustomDatePicker, CustomTimePicker } from '../../components/DateAndTime';
import { DateObject } from 'react-multi-date-picker';


const CouponCreation = ({ setLoading }) => {

    const navigation = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()


    const { couponId } = location.state ?? false

    // options
    const [discountTypeOptions, setDiscountTypeOptions] = useState([])
    const [categoryOptions, setCategoryOptions] = useState([])
    const [subCategoryOptions, setSubCategoryOptions] = useState([])
    const [subSubCategoryOptions, setSubSubCategoryOptions] = useState([])
    const [invTypesOptions, setInvTypesOptions] = useState([])
    const [invSubTypeOptions, setInvSubTypeOptions] = useState([])
    const [invItemsOptions, setInvItemsOptions] = useState([])
    const [packageOptions, setPackageOptions] = useState([])
    const [limitUsageOptions, setLimitUsageOptions] = useState([])
    // update
    const [couponData, setCouponData] = useState({})

    const couponProfile = useSelector(state => state.coupon)

    useEffect(() => {
        Promise.all([
            couponId && dispatch(getSingleCoupon(couponId)),
            dispatch(allCategoryApi()),
            dispatch(couponLimit()),
            dispatch(getDiscountTypes()),
            dispatch(getCouponPackages()),
            dispatch(setCoupon()),
        ]).then((res) => {
            const singleCoupon = res[0]?.payload ?? null
            if (singleCoupon) {
                let aa = singleCoupon.validFromTime.split(":")
                let bb = singleCoupon.validToTime.split(":")
                setFieldValue("validFromTime", new DateObject().setHour(aa[0]).setMinute(aa[1]).setSecond(aa[2]))
                setFieldValue("validToTime", new DateObject().setHour(bb[0]).setMinute(bb[1]).setSecond(bb[2]))
            }
            setCouponData(singleCoupon)
            setCategoryOptions(res[1]?.payload?.map(x => {
                if (x.categoryId === singleCoupon?.categoryId) {
                    setFieldValue('categoryId', setDropOptions(x, 'name', 'categoryId'))
                    dispatch(FilterSubCategory(x.categoryId)).then(subCategories => {
                        setSubCategoryOptions(subCategories?.payload?.map(subCategory => {
                            subCategory.subCategoryId === singleCoupon?.subCategoryId && setFieldValue('subCategoryId', setDropOptions(subCategory, 'subCategoryName', 'subCategoryId'))
                            return setDropOptions(subCategory, 'subCategoryName', 'subCategoryId')
                        }))
                        // subSubCategoryId
                        dispatch(FilterSubSubCategory({
                            categoryId: singleCoupon?.categoryId,
                            subCategoryId: singleCoupon?.subCategoryId
                        })).then(subSubCategories => {
                            setSubSubCategoryOptions(subSubCategories?.payload.map(subSubCategory => {
                                let temp = setDropOptions(subSubCategory, 'subSubCategoryName', 'subSubCategoryId')
                                subSubCategory.subSubCategoryId === singleCoupon?.subSubCategoryId && setFieldValue('subSubCategoryId', temp)
                                return temp
                            }))
                        })
                        singleCoupon?.minimumPurchaseAmount === 0 && setFieldValue('isMinPurchase', false)

                        if (singleCoupon?.categoryId === 3) {
                            // inventoryTypeId
                            dispatch(getInventorytypeApi(singleCoupon?.subSubCategoryId)).then(
                                subSubCategories => {
                                    setInvTypesOptions(
                                        subSubCategories?.payload.map(aa => {
                                            let temp = setDropOptions(aa, 'name', 'inventoryTypeId')
                                            aa.inventoryTypeId === singleCoupon?.inventoryTypeId &&
                                                setFieldValue('inventoryTypeId', temp)
                                            return temp
                                        })
                                    )
                                }
                            )
                            // inventorySubtypeId
                            dispatch(getInventorySubtypeApi(singleCoupon?.inventoryTypeId))
                                .then(invSubTypes => {
                                    setInvSubTypeOptions(invSubTypes?.payload.map(invSubType => {
                                        let temp = setDropOptions(invSubType, 'name', 'inventorySubtypeId')
                                        invSubType.inventorySubtypeId === singleCoupon?.inventorySubtypeId && setFieldValue('inventorySubtypeId', temp)
                                        return temp
                                    }))
                                })
                            // inventorySubtypeId
                            const payload = {
                                categoryId: singleCoupon?.categoryId,
                                subCategoryId: singleCoupon?.subCategoryId,
                                subSubCategoryId: singleCoupon?.subSubCategoryId,
                                inventoryTypeId: singleCoupon?.inventoryTypeId,
                                inventorySubtypeId: singleCoupon.inventorySubtypeId
                            }
                            dispatch(getInventoryItems(payload))
                                .then(invItems => {
                                    setInvItemsOptions(invItems?.payload?.map(invItem => {
                                        return setDropOptions(invItem, 'inventoryName', 'serviceInventoryId')
                                    }))
                                    setFieldValue('inventoryItems', singleCoupon?.inventoryItems.map(sc => setDropOptions(sc, 'inventoryName', 'serviceInventoryId')))
                                })
                        } else {
                            setFieldValue('isService', false)
                        }

                    })

                }
                return setDropOptions(x, 'name', 'categoryId')
            }))
            setLimitUsageOptions(res[2]?.payload?.map(x => {
                x === singleCoupon?.usageLimitItemCount && setFieldValue('usageLimitItemCount', {
                    label: x,
                    value: x
                })
                return {
                    ...x,
                    label: x,
                    value: x
                }
            }))
            setDiscountTypeOptions(res[3]?.payload?.map(x => {
                x.couponType === singleCoupon?.couponType && setFieldValue('couponType', setDropOptions(x, 'couponTypeLabel', 'couponType'))
                return setDropOptions(x, 'couponTypeLabel', 'couponType')
            }))
            const temp = []
            setPackageOptions(res[4]?.payload?.packages?.map(x => {
                singleCoupon?.packageIds.includes(x.inventoryPackageId) && temp.push(setDropOptions(x, 'packageName', 'inventoryPackageId'))
                return setDropOptions(x, 'packageName', 'inventoryPackageId')
            }))
            setFieldValue('packageIds', temp)
            return () => {
                setCategoryOptions({})
                setLimitUsageOptions({})
                setPackageOptions({})
            }
        }).then(() => setLoading(false))
    }, [])

    //
    useEffect(() => {
        switch (couponProfile?.status) {
            case 'succeed':
                switch (couponProfile?.type) {
                    case 'SAVE_COUPON':
                        toast.success(couponMsg.couponCreated)
                        navigation(`/dashboard/coupons`)
                        dispatch(setCoupon())
                        break;
                    case 'EDIT_COUPON':
                        toast.success(couponMsg.couponUpdated)
                        navigation(`/dashboard/coupons`)
                        dispatch(setCoupon())
                    case 'GET_SINGLE_COUPON':
                        setCouponData(couponProfile?.singleCoupon)
                        break;

                    default:
                        break;
                }
                break;
            case 'failed':
                toast.error(couponProfile?.error)
                break;

            default:
                break;
        }
    }, [couponProfile])

    const resetData = () => {
        setInvItemsOptions([])
        setInvSubTypeOptions([])
        setInvTypesOptions([])
        setSubCategoryOptions([])
        setSubSubCategoryOptions([])
        return null
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            couponCode: couponData?.couponCode ?? '',
            couponType: '',
            couponValue: couponData?.couponValue ?? '', // percantage value
            minimumPurchaseAmount: couponData?.minimumPurchaseAmount ?? '', // min amount
            couponUsage: couponData?.couponUsage ?? 'Single',
            categoryId: '',
            subCategoryId: '',
            subSubCategoryId: '',
            inventoryTypeId: '',
            inventorySubtypeId: '',
            inventoryItems: [],
            appliesToPackage: couponData?.appliesToPackage ?? true,
            packageIds: [],
            appliesToEntireOrder: couponData?.appliesToEntireOrder ?? false,
            usageLimitPerCoupon: couponData?.usageLimitPerCoupon ?? '',
            usageLimitItemCount: couponData?.usageLimitItemCount ?? '',
            usageLimitPerPerson: couponData?.usageLimitPerPerson ?? '',
            specificCoupon: null,
            validFrom: couponData?.validFrom ? new Date(couponData?.validFrom) : null,
            validTo: couponData?.validTo ? new Date(couponData?.validTo) : null,
            validFromTime: couponData?.validFromTime ?? null,
            validToTime: couponData?.validToTime ?? null,
            // conditionallyru validation
            isMinPurchase: true,
            isSubSubCategory: true,
            isService: true,
            isDiscoutIsPercantage: couponData?.couponType === 'percenatge_discount' ? true : false,
        },
        validationSchema: Yup.object().shape({
            couponCode: Yup.string()
                .matches(/^[a-zA-Z0-9]{8}$/, 'Coupon only be 8 digit long, no white space include')
                .required('please enter discount'),
            couponType: Yup.object().nullable().required('please enter Discount Type'),
            couponValue: Yup.number().when('isDiscoutIsPercantage', isDiscoutIsPercantage => {
                if (isDiscoutIsPercantage) {
                    return valInputRange('value', 0, 101)
                } else {
                    return minInputRange('value', 0)
                }
            }),
            minimumPurchaseAmount: Yup.mixed()
                .nullable()
                .when('isMinPurchase', {
                    is: true,
                    then: minInputRange('amount', 0),
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
            packageIds: Yup.mixed().when('appliesToPackage', {
                is: true,
                then: Yup.array().nullable().min(1).required('please enter inventory items'),
            }),
            // packageIds: Yup.array().required("please enter package"),
            appliesToEntireOrder: Yup.boolean(),
            usageLimitPerCoupon: minInputRange('per coupon', 0),
            usageLimitItemCount: Yup.object().nullable().required('please enter Limit '),
            usageLimitPerPerson: minInputRange('per person', 0),
            specificCoupon: Yup.string().nullable().length(10, 'Mobile number must be 10 digit.'),
            validFrom: Yup.date().nullable().required('please select Select Date'),
            validTo: Yup.date().nullable().required('please select End Date'),
            validFromTime: Yup.string().nullable().required('please select Start Time'),
            validToTime: Yup.string().nullable().required('please select End Time'),

            // conditionally validation
            isMinPurchase: Yup.boolean(),
            isSubSubCategory: Yup.boolean(),
            isService: Yup.boolean(),
            isDiscoutIsPercantage: Yup.boolean(),
        }),

        onSubmit: val => handleSubmitForm(val),
    })

    const { values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue } = formik

    const handleSubmitForm = values => {
        const payload = { ...values }
        payload["couponType"] = values?.couponType?.value ?? null
        payload["categoryId"] = values?.categoryId?.value ?? null
        payload["subCategoryId"] = values?.subCategoryId?.value ?? null
        payload["subSubCategoryId"] = values?.subSubCategoryId?.value ?? null
        payload["inventoryTypeId"] = values?.inventoryTypeId?.value ?? null
        payload["inventorySubtypeId"] = values?.inventorySubtypeId?.value ?? null
        payload["usageLimitItemCount"] = values?.usageLimitItemCount?.value ?? null
        payload["personSpeficiCoupon"] = values?.specificCoupon ? true : false
        payload["specificCoupon"] = values?.specificCoupon ?? null
        payload["validFromTime"] = moment(new Date(values?.validFromTime)).format('HH:mm:ss') ?? null
        payload["validToTime"] = moment(new Date(values?.validToTime)).format('HH:mm:ss') ?? null
        payload["inventoryItems"] = values?.inventoryItems?.map(x => {
            return {
                "serviceProfileId": x.serviceProfileId,
                "serviceInventoryId": x.serviceInventoryId,
                "inventoryName": x.inventoryName
            }
        })
        payload["packageIds"] = values?.packageIds?.map(x => x.value)
        delete payload.isMinPurchase
        delete payload.isService
        delete payload.isSubSubCategory
        delete payload.isDiscoutIsPercantage

        couponId ? dispatch(editCoupon({ id: couponId, payload })) : dispatch(saveCoupon(payload))
    }

    return (
        <>
            <div className='container'>
                <BackButton
                    title={'Coupon Creation'}
                    onClick={() => {
                        navigation('/dashboard/coupons')
                    }}
                />
                <div className='max-w-625 mx-auto mt-5'>
                    <form onSubmit={handleSubmit}>
                        <div
                            className={`sign-input ${errors.couponCode && touched.couponCode
                                ? ` error-inputs `
                                : ``
                                }mb-3`}
                        >
                            <div className='d-flex align-items-center justify-content-between mb-2'>
                                <LabelTag text={'Discount Code'} />
                                <LabelTag classes={'text-primary pointer'} text={'Generate Code'} onClick={(e) => {
                                    e.preventDefault()
                                    dispatch(generateNewCode()).then(res => setFieldValue('couponCode', res.payload))
                                }} />
                            </div>
                            <InputTag
                                name={'couponCode'}
                                classes={'form-control'}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder={'Eg Summer Sale'}
                                value={values.couponCode}
                            />
                            {errors.couponCode && touched.couponCode ? (
                                <InputError
                                    className={'input-error mt-2'}
                                    errorTitle={errors.couponCode}
                                />
                            ) : null}
                        </div>
                        <div className='row'>
                            <PTag
                                classes={'text-dark-blue fw-bold my-3'}
                                texts={'Options'}
                            />
                            <div className='col-lg-6 couponselect'>
                                <div
                                    className={`sign-input ${errors.couponType && touched.couponType
                                        ? `error-inputs `
                                        : ``
                                        }mb-3`}
                                >
                                    <LabelTag classes={'mb-2'} text={'Discount Type'} />
                                    <Select
                                        name='couponType'
                                        className='form-control p-0 '
                                        onChange={e => {
                                            setFieldValue('couponType', e)
                                            setFieldValue('isDiscoutIsPercantage', e.value === 'percenatge_discount' ? true : false)
                                        }}
                                        onBlur={handleBlur('couponType')}
                                        options={discountTypeOptions}
                                        value={values.couponType}
                                    />
                                    {errors.couponType && touched.couponType ? (
                                        <InputError
                                            className={'input-error mt-2'}
                                            errorTitle={errors.couponType}
                                        />
                                    ) : null}
                                </div>
                            </div>
                            <div className='col-lg-6'>
                                <div
                                    className={`sign-input ${errors.couponValue && touched.couponValue
                                        ? ` error-inputs `
                                        : ``
                                        }mb-3`}
                                >
                                    <LabelTag classes={'mb-2'} text={'Value'} />
                                    <div className='d-flex position-relative'>
                                        <InputTag
                                            name='couponValue'
                                            classes={
                                                'w-100 form-control input-plachholder-paddingright'
                                            }
                                            type='number'
                                            placeholder={'Enter advance to be paid'}
                                            value={values?.couponValue}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <PTag
                                            classes={
                                                'text-dark-blue white-space-nowrap fw-bold fn-20 me-2 input-add-icon-right'
                                            }
                                            texts={values.couponType.value === 'percenatge_discount' ? '%' : '₹'}
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
                        </div>
                        <div className='row'>
                            <div className='col-12'>
                                <Checkbox
                                    For={'discountcheck'}
                                    classes={'ps-0 mb-3'}
                                    id={'discountcheck'}
                                    name={'isMinPurchase'}
                                    onChange={e => {
                                        !e.target.checked && setFieldValue('minimumPurchaseAmount', 0)
                                        setFieldValue('isMinPurchase', e.target.checked)
                                    }}
                                    Checkboxlabel={
                                        'The discount requires a minimum purchase'
                                    }
                                    checked={values.isMinPurchase}
                                />

                                <div
                                    className={`sign-input ${errors.minimumPurchaseAmount && touched.minimumPurchaseAmount
                                        ? ` error-inputs `
                                        : ``
                                        }mb-3`}
                                >
                                    <LabelTag classes={'mb-2'} text={'Enter Amount'} />
                                    <InputTag
                                        classes={'form-control'}
                                        name='minimumPurchaseAmount'
                                        type={'number'}
                                        disabled={!values.isMinPurchase}
                                        value={values.minimumPurchaseAmount}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder={'Enter Amount'}
                                    />
                                    {errors.minimumPurchaseAmount && touched.minimumPurchaseAmount ? (
                                        <InputError
                                            className={'input-error mt-2'}
                                            errorTitle={errors.minimumPurchaseAmount}
                                        />
                                    ) : null}
                                </div>
                                <div className='d-flex align-items-center'>
                                    <div className='d-flex align-items-center form-check-checkbox' >
                                        <input type="radio" name="couponUsage" onChange={handleChange('couponUsage')} id="singleuse" value={'Single'} checked={values.couponUsage === 'Single' && true} className='form-check-input orange-input w-20 h-20' />
                                        <LabelTag
                                            For={'singleuse'}
                                            classes={'ms-2 fn-16 pointer text-capitalize'}
                                            text={'single use'}
                                        />
                                    </div>
                                    <div className='d-flex align-items-center ms-2 form-check-checkbox'>
                                        <input type="radio" name="couponUsage" onChange={handleChange('couponUsage')} id="multipleuse" value={'Multiple'} checked={values.couponUsage === 'Multiple' && true} className='form-check-input orange-input w-20 h-20' />
                                        <LabelTag
                                            For={'multipleuse'}
                                            classes={'ms-2 fn-16 pointer text-capitalize'}
                                            text={'multiple use'}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='mt-4'>
                            <PTag
                                classes={'text-dark-blue fw-bold my-3'}
                                texts={'Applies to'}
                            />
                            <div className='row couponselect'>
                                <div className='col-lg-6 couponselect'>
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
                                                setFieldValue('isService', e.value === 3 ? true : false)
                                                dispatch(FilterSubCategory(e.value))
                                                    .then(res => {
                                                        setSubCategoryOptions(res?.payload?.map(x => setDropOptions(x, 'subCategoryName', 'subCategoryId')))
                                                    })
                                            }}
                                            value={values.categoryId}
                                            onBlur={handleBlur('categoryId')}
                                            options={categoryOptions}
                                        />
                                        {errors.categoryId && touched.categoryId ? (
                                            <InputError
                                                className={'input-error mt-2'}
                                                errorTitle={errors.categoryId}
                                            />
                                        ) : null}
                                    </div>
                                </div>
                                <div className='col-lg-6 couponselect'>
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
                                                dispatch(FilterSubSubCategory({ categoryId: values.categoryId.value, subCategoryId: e.value }))
                                                    .then(res => {
                                                        setFieldValue('isSubSubCategory', res.payload.length ? true : false)
                                                        setSubSubCategoryOptions(res.payload?.map(x => setDropOptions(x, 'subSubCategoryName', 'subSubCategoryId')))
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
                            <div className='row couponselect'>
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
                                            dispatch(getInventorytypeApi(e.value))
                                                .then(res => {
                                                    setInvTypesOptions(res.payload.map(x => setDropOptions(x, 'name', 'inventoryTypeId')))
                                                })
                                        }}
                                        value={values.subSubCategoryId}
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
                                    className={`sign-input col-lg-6 ${errors.inventoryTypeId &&
                                        touched.inventoryTypeId
                                        ? `error-inputs `
                                        : ``
                                        }mb-3`}
                                >
                                    <LabelTag
                                        classes={'mb-2'}
                                        text={'Select Inventory Type'}
                                    />
                                    <Select
                                        name='inventoryTypeId'
                                        className='form-control p-0'
                                        noOptionsMessage={() => 'Only for service'}
                                        onChange={e => {
                                            setFieldValue('inventoryTypeId', e)
                                            dispatch(getInventorySubtypeApi(e.value))
                                                .then(res => setInvSubTypeOptions(res.payload.map(x => setDropOptions(x, 'name', 'inventorySubtypeId'))))
                                        }}
                                        value={values.inventoryTypeId}
                                        onBlur={handleBlur('inventoryTypeId')}
                                        options={invTypesOptions}
                                    />
                                    {errors.inventoryTypeId &&
                                        touched.inventoryTypeId ? (
                                        <InputError
                                            className={'input-error mt-2'}
                                            errorTitle={errors.inventoryTypeId}
                                        />
                                    ) : null}
                                </div>
                            </div>
                            <div className='row couponselect'>
                                <div
                                    className={`sign-input col-lg-6 ${errors.inventorySubtypeId && touched.inventorySubtypeId
                                        ? `error-inputs `
                                        : ``
                                        }mb-3`}
                                >
                                    <LabelTag
                                        classes={'mb-2'}
                                        text={'Inventory Sub-Type'}
                                    />
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
                                                inventorySubtypeId: e.value
                                            }
                                            dispatch(getInventoryItems(payload))
                                                .then(res => setInvItemsOptions(res.payload?.map(x => setDropOptions(x, 'inventoryName', 'serviceInventoryId'))))
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
                                        onChange={e =>
                                            setFieldValue('inventoryItems', e)
                                        }
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
                            <div className='col-12 couponselect'>
                                <div className='mb-3'>

                                </div>
                                <div
                                    className={`sign-input ${errors.packageIds && touched.packageIds
                                        ? `error-inputs `
                                        : ``
                                        }mb-3`}
                                >
                                    <div className='d-flex mb-2 justify-content-between align-items-center'>
                                        <LabelTag classes={'w-full'} text={'Select Package'} />
                                        <Checkbox
                                            For={'appliesToPackage'}
                                            classes={'ps-0'}
                                            id={'appliesToPackage'}
                                            checked={values?.appliesToPackage}
                                            onChange={(e) => {
                                                values?.appliesToPackage && setFieldValue('packageIds', [])
                                                handleChange('appliesToPackage')
                                                setFieldValue('appliesToPackage', e.target.checked)
                                            }}
                                            Checkboxlabel={'Applies to Packages'}
                                        />
                                    </div>
                                    <Select
                                        isMulti={true}
                                        isDisabled={!values.appliesToPackage}
                                        name='packageIds'
                                        className='form-control p-0'
                                        value={values.packageIds}
                                        onChange={e =>
                                            setFieldValue('packageIds', e)
                                        }
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
                                <div className='mb-3'>
                                    <Checkbox
                                        classes={'ps-0'}
                                        For={'appliesToEntireOrder'}
                                        id={'appliesToEntireOrder'}
                                        checked={values?.appliesToEntireOrder}
                                        onChange={handleChange('appliesToEntireOrder')}
                                        Checkboxlabel={'Applies to Entire Order '}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <PTag
                                classes={'text-dark-blue fw-bold my-3'}
                                texts={'Usage limit per coupon'}
                            />
                            <div className='col-lg-6'>
                                <div
                                    className={`sign-input ${errors.usageLimitPerCoupon && touched.usageLimitPerCoupon
                                        ? ` error-inputs `
                                        : ``
                                        }mb-3`}
                                >
                                    <LabelTag
                                        classes={'mb-2'}
                                        text={'Usage limit per coupon'}
                                    />
                                    <InputTag
                                        classes={'form-control'}
                                        placeholder={'Enter limit per coupon'}
                                        type={'number'}
                                        name='usageLimitPerCoupon'
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.usageLimitPerCoupon}
                                    />
                                    {errors.usageLimitPerCoupon && touched.usageLimitPerCoupon ? (
                                        <InputError
                                            className={'input-error mt-2'}
                                            errorTitle={errors.usageLimitPerCoupon}
                                        />
                                    ) : null}
                                </div>
                            </div>
                            <div className='col-lg-6 couponselect'>
                                <div
                                    className={`sign-input ${errors.usageLimitItemCount && touched.usageLimitItemCount
                                        ? `error-inputs `
                                        : ``
                                        }mb-3`}
                                >
                                    <LabelTag
                                        classes={'mb-2'}
                                        text={'Limit usage to X items'}
                                    />
                                    <Select
                                        name='usageLimitItemCount'
                                        className='form-control p-0'
                                        onChange={e => setFieldValue('usageLimitItemCount', e)}
                                        onBlur={handleBlur('usageLimitItemCount')}
                                        options={limitUsageOptions}
                                        value={values.usageLimitItemCount}
                                    />
                                    {errors.usageLimitItemCount && touched.usageLimitItemCount ? (
                                        <InputError
                                            className={'input-error mt-2'}
                                            errorTitle={errors.usageLimitItemCount}
                                        />
                                    ) : null}
                                </div>
                            </div>
                            <div className='col-lg-6'>
                                <div
                                    className={`sign-input ${errors.usageLimitPerPerson && touched.usageLimitPerPerson
                                        ? ` error-inputs `
                                        : ``
                                        }mb-3`}
                                >
                                    <LabelTag
                                        classes={'mb-2'}
                                        text={'Usage limit per person'}
                                    />
                                    <InputTag
                                        classes={'form-control'}
                                        name='usageLimitPerPerson'
                                        type={'number'}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder={'Enter limit per person'}
                                        value={values.usageLimitPerPerson}
                                    />
                                    {errors.usageLimitPerPerson && touched.usageLimitPerPerson ? (
                                        <InputError
                                            className={'input-error mt-2'}
                                            errorTitle={errors.usageLimitPerPerson}
                                        />
                                    ) : null}
                                </div>
                            </div>
                            <div className='col-lg-6'>
                                <div
                                    className={`sign-input ${errors.specificCoupon && touched.specificCoupon
                                        ? ` error-inputs `
                                        : ``
                                        }mb-3`}
                                >
                                    <LabelTag
                                        classes={'mb-2'}
                                        text={'Person Specific Coupon'}
                                    />
                                    <InputTag
                                        classes={'form-control'}
                                        type={'number'}
                                        name='specificCoupon'
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder={'Enter mobile number'}
                                        value={values.specificCoupon || ''}
                                    />
                                    {errors.specificCoupon && touched.specificCoupon ? (
                                        <InputError
                                            className={'input-error mt-2'}
                                            errorTitle={errors.specificCoupon}
                                        />
                                    ) : null}
                                </div>
                            </div>
                        </div>
                        <div className='div'>
                            <PTag
                                classes={'text-dark-blue fw-bold my-3'}
                                texts={'Active Dates'}
                            />
                            <div className='row'>
                                <div className='col-lg-6 datePicker-input selectdatepicker'>
                                    <div
                                        className={`sign-input ${errors.validFrom && touched.validFrom
                                            ? ` error-inputs `
                                            : ``
                                            }mb-3`}
                                    >
                                        <LabelTag classes={'mb-2'} text={'Start Date'} />
                                        <div className='datePicker-input'>
                                            <CustomDatePicker
                                                minDate={'beforeToday'}
                                                name='validFrom'
                                                inputClass={'px-3 py-2'}
                                                containerClassName={'w-100 form-control'}
                                                value={values.validFrom}
                                                className={
                                                    'w-100 form-control d-flex justify-content-between align-middle'
                                                }
                                                onChange={date =>
                                                    setFieldValue('validFrom', new Date(date))
                                                }
                                                onBlur={handleBlur('validFrom')}
                                                format={'DD-MM-YYYY'}
                                                placeholder={'Select Date'}
                                            />
                                        </div>
                                        {errors.validFrom && touched.validFrom ? (
                                            <InputError
                                                className={'input-error mt-2'}
                                                errorTitle={errors.validFrom}
                                            />
                                        ) : null}
                                    </div>
                                </div>
                                <div className='col-lg-6 '>
                                    <div
                                        className={`sign-input ${errors.validFromTime && touched.validFromTime
                                            ? ` error-inputs `
                                            : ``
                                            }mb-3`}
                                    >
                                        <LabelTag classes={'mb-2'} text={'Start Time'} />
                                        <CustomTimePicker
                                            value={values.validFromTime}
                                            className={
                                                'w-100 d-flex justify-content-between align-middle'
                                            }
                                            onChange={time => {
                                                setFieldValue('validFromTime', time)
                                            }}
                                            onBlur={handleBlur('validFromTime')}
                                            name='validFromTime'
                                            placeholder={'Start Time'}
                                        />
                                        {errors.validFromTime && touched.validFromTime ? (
                                            <InputError
                                                className={'input-error mt-2'}
                                                errorTitle={errors.validFromTime}
                                            />
                                        ) : null}
                                    </div>
                                </div>
                                {/* issue error datepicker */}

                            </div>
                            <div className='row'>
                                <div className='col-lg-6 selectdatepicker'>
                                    <div
                                        className={`sign-input ${errors.validTo && touched.validTo
                                            ? ` error-inputs `
                                            : ``
                                            }mb-3`}
                                    >
                                        <LabelTag classes={'mb-2'} text={'End Date'} />
                                        <div className='datePicker-input'>
                                            <CustomDatePicker
                                                minDate={values.validFrom}
                                                name='validTo'
                                                inputClass={'px-3 py-2'}
                                                containerClassName={'w-100 form-control'}
                                                value={values.validTo}
                                                className={
                                                    'w-100 form-control d-flex justify-content-between align-middle'
                                                }
                                                onChange={date =>
                                                    setFieldValue('validTo', new Date(date))
                                                }
                                                onBlur={handleBlur('validTo')}
                                                format={'DD-MM-YYYY'}
                                                placeholder={'End Date'}
                                            />
                                        </div>
                                        {errors.validTo && touched.validTo ? (
                                            <InputError
                                                className={'input-error mt-2'}
                                                errorTitle={errors.validTo}
                                            />
                                        ) : null}
                                    </div>
                                </div>
                                <div className='col-lg-6'>
                                    <div
                                        className={`sign-input ${errors.validToTime && touched.validToTime
                                            ? ` error-inputs `
                                            : ``
                                            }mb-3`}
                                    >
                                        <LabelTag classes={'mb-2'} text={'End Time'} />
                                        <CustomTimePicker
                                            value={values.validToTime}
                                            className={
                                                'w-100  d-flex justify-content-between align-middle'
                                            }
                                            onChange={time => {
                                                setFieldValue('validToTime', time)
                                            }}
                                            onBlur={handleBlur('validToTime')}
                                            name='validToTime'
                                            placeholder={'End Time'}
                                        />
                                        {errors.validToTime && touched.validToTime ? (
                                            <InputError
                                                className={'input-error mt-2'}
                                                errorTitle={errors.validToTime}
                                            />
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-12 d-flex justify-content-center'>
                                <ButtonTag
                                    classes={'btn btn-orange my-4'}
                                    type={'submit'}
                                    value={couponId ? 'Update' : 'Save'}
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default IsLoadingHOC(CouponCreation)
