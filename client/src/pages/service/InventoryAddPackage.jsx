import React, { useContext, useEffect, useState } from 'react'
import {
    ButtonTag,
    InputTag,
    LabelTag,
    PTag,
    BackButton,
} from '../../components/designComponents/MicroComponents'
import InventoryContext from './InventoryContext'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import Select from 'react-select'
import InputError from '../../components/common/InputError'
import { useLocation, useNavigate } from 'react-router-dom'
import { FilterSubCategory, FilterSubSubCategory } from '../../store/category/slice'
import { getInventorytypeApi, getInventorySubtypeApi, postPackage } from '../../store/service/slice'
import { getInventoryItems } from '../../store/coupon/slice'
import { useDispatch, useSelector } from 'react-redux'
import { minInputRange } from '../../helpers/functions'
import { toast } from 'react-toastify'
import { serviceMsg } from '../../components/common/ValidationConstants'

const InventoryAddPackage = () => {
    const { next } = useContext(InventoryContext)
    const navigate = useNavigate()
    const { state } = useLocation()
    const dispatch = useDispatch()

    //dropdown options
    const [categoryId, setCategoryId] = useState(3)
    const [subCategoryOptions, setSubCategoryOptions] = useState([])
    const [subSubCategoryOptions, setSubSubCategoryOptions] = useState([])
    const [invTypesOptions, setInvTypesOptions] = useState([])
    const [invSubTypesOptions, setInvSubTypesOptions] = useState([])
    const [invItemsOptions, setInvItemsOptions] = useState([])


    const categoryData = useSelector(state => state.category)

    const onSubmitForm = (values) => {
        const payload = {
            packageName: values.packageName,
            inventoryIds: values.inventoryItems?.map(x => {
                return {
                    "serviceProfileId": x.serviceProfileId,
                    "serviceInventoryId": x.serviceInventoryId
                }
            }),
            amountApplicable: values.amountApplicable
        }

        dispatch(postPackage(payload)).then(res => {
            toast.success(serviceMsg.packageCreated)
            navigate('/dashboard')
        })
    }

    useEffect(() => {
        dispatch(FilterSubCategory(categoryId))
    }, [])

    useEffect(() => {
        const newData = categoryData.subCategory.reduce((acc, curr) => {
            acc.push({ label: curr.subCategoryName, value: curr.subCategoryId })
            return acc
        }, [])
        setSubCategoryOptions(newData)
    }, [categoryData])

    return (
        <>
            <BackButton
                onClick={() => {
                    navigate('/dashboard/added-inventories', { state })
                }}
                title={'Create Packages'}
            />
            <div className='max-w-625 mx-auto'>
                <Formik
                    initialValues={{
                        packageName: '',
                        subCategory: '',
                        subSubCategory: '',
                        inventoryType: '',
                        inventorySubtype: '',
                        inventoryItems: [],
                        amountApplicable: '',
                    }}
                    validationSchema={Yup.object().shape({
                        packageName: Yup.string().required('enter package name'),
                        subCategory: Yup.object().nullable().required('enter Sub Category'),
                        subSubCategory: Yup.object().nullable().required('enter Sub Sub Category'),
                        inventoryType: Yup.object().nullable().required('enter inventory type'),
                        inventorySubtype: Yup.object().nullable().required('enter inventory sub-type'),
                        inventoryItems: Yup.array().nullable().required('inventory items required'),
                        amountApplicable: minInputRange("amountApplicable", 0),
                    })}
                    onSubmit={values => {
                        onSubmitForm(values)
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleSubmit,
                        setFieldValue,
                        handleBlur,
                    }) => (
                        <Form
                            onSubmit={handleSubmit}
                            className='d-flex flex-column justify-content-between h-100'
                        >
                            <div className='row mt-3'>
                                <div className='col-lg-6'>
                                    <div
                                        className={`sign-input ${errors.packageName && touched.packageName
                                            ? ` error-inputs `
                                            : ``
                                            }mb-3`}
                                    >
                                        <LabelTag
                                            classes={'text-gray fn-12 mb-2'}
                                            text={'Package Name'}
                                        />
                                        <InputTag
                                            type={'text'}
                                            placeholder={'Eg Summerpackage'}
                                            classes={'form-control'}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            name={'packageName'}
                                        />
                                        {errors.packageName && touched.packageName ? (
                                            <InputError
                                                className={'input-error mt-2'}
                                                errorTitle={errors.packageName}
                                            />
                                        ) : null}
                                    </div>
                                </div>
                                <div className='col-lg-6 couponselect'>
                                    <div
                                        className={`sign-input ${errors.subCategory && touched.subCategory
                                            ? ` error-inputs `
                                            : ``
                                            }mb-3`}
                                    >
                                        <LabelTag
                                            classes={'text-gray fn-12 mb-2'}
                                            text={'Sub Category'}
                                            For={'subCategory'}
                                        />
                                        <Select
                                            className='form-control p-0'
                                            id={'subCategory'}
                                            options={subCategoryOptions}
                                            name='subCategory'
                                            value={values.subCategory}
                                            onBlur={handleBlur('subCategory')}
                                            onChange={e => {
                                                setFieldValue('subCategory', e)
                                                setFieldValue('subSubCategory', "")
                                                setFieldValue('inventoryType', "")
                                                setFieldValue('inventorySubtype', "")
                                                setFieldValue('inventoryItems', "")
                                                dispatch(
                                                    FilterSubSubCategory({
                                                        categoryId: categoryId,
                                                        subCategoryId: e.value,
                                                    })
                                                ).then(res => setSubSubCategoryOptions(res.payload.map(x => {
                                                    return {
                                                        ...x, label: x.subSubCategoryName, value: x.subSubCategoryId
                                                    }
                                                })))
                                            }}
                                        />
                                        {errors.subCategory && touched.subCategory ? (
                                            <div className='d-flex align-items-center'>
                                                <InputError
                                                    className='input-error mt-2'
                                                    errorTitle={errors.subCategory}
                                                />
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className='col-lg-6'>
                                    <div
                                        className={`sign-input ${errors.subSubCategory && touched.subSubCategory
                                            ? ` error-inputs `
                                            : ``
                                            }mb-3`}
                                    >
                                        <LabelTag
                                            classes={'text-gray fn-12 mb-2'}
                                            text={'Sub Sub Category'}
                                        />
                                        <Select
                                            className='form-control p-0'
                                            id={'subSubCategory'}
                                            options={subSubCategoryOptions}
                                            name='subSubCategory'
                                            value={values.subSubCategory}
                                            onBlur={handleBlur('subSubCategory')}
                                            onChange={e => {
                                                setFieldValue('subSubCategory', e)
                                                setFieldValue('inventoryType', "")
                                                setFieldValue('inventorySubtype', "")
                                                setFieldValue('inventoryItems', "")
                                                dispatch(
                                                    getInventorytypeApi(e.value)
                                                ).then(res =>
                                                    setInvTypesOptions(res.payload.map(x => {
                                                        return {
                                                            ...x, label: x.name, value: x.inventoryTypeId
                                                        }
                                                    })
                                                    )
                                                )
                                            }}
                                        />
                                        {errors.subSubCategory && touched.subSubCategory ? (
                                            <InputError
                                                className={'input-error mt-2'}
                                                errorTitle={errors.subSubCategory}
                                            />
                                        ) : null}
                                    </div>
                                </div>
                                <div className='col-lg-6 couponselect'>
                                    <div
                                        className={`sign-input ${errors.inventoryType && touched.inventoryType
                                            ? ` error-inputs `
                                            : ``
                                            }mb-3`}
                                    >
                                        <LabelTag
                                            classes={'text-gray fn-12 mb-2'}
                                            text={'Inventory type'}
                                            For={'inventoryType'}
                                        />
                                        <Select
                                            className='form-control p-0'
                                            id={'inventory-type'}
                                            name='inventoryType'
                                            options={invTypesOptions}
                                            value={values.inventoryType}
                                            onBlur={handleBlur('inventoryType')}
                                            onChange={e => {
                                                setFieldValue('inventoryType', e)
                                                setFieldValue('inventorySubtype', "")
                                                setFieldValue('inventoryItems', "")
                                                dispatch(
                                                    getInventorySubtypeApi(e.value)
                                                ).then(res =>
                                                    setInvSubTypesOptions(res.payload.map(x => {
                                                        return {
                                                            ...x, label: x.name, value: x.inventorySubtypeId
                                                        }
                                                    })
                                                    )
                                                )
                                            }}
                                        />
                                        {errors.inventoryType && touched.inventoryType ? (
                                            <div className='d-flex align-items-center'>
                                                <InputError
                                                    className='input-error mt-2'
                                                    errorTitle={errors.inventoryType}
                                                />
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-lg-6 couponselect'>
                                    <div
                                        className={`sign-input ${errors.inventorySubtype && touched.inventorySubtype
                                            ? ` error-inputs `
                                            : ``
                                            }mb-3`}
                                    >
                                        <LabelTag
                                            classes={'text-gray fn-12 mb-2'}
                                            text={'Inventory Subtype'}
                                            For={'inventorySubtype'}
                                        />
                                        <Select
                                            className='form-control p-0'
                                            id={'inventorySubtype'}
                                            value={values.inventorySubtype}
                                            options={invSubTypesOptions}
                                            onBlur={handleBlur('inventorySubtype')}
                                            name='inventorySubtype'
                                            onChange={e => {
                                                setFieldValue('inventorySubtype', e)
                                                setFieldValue('inventoryItems', "")
                                                dispatch(
                                                    getInventoryItems({ categoryId: categoryId, subCategoryId: values.subCategory.value, subSubCategoryId: values.subSubCategory.value, inventoryTypeId: values.inventoryType.value, inventorySubtypeId: e.value })
                                                ).then(res =>
                                                    setInvItemsOptions(res.payload.map(x => {
                                                        return {
                                                            ...x, label: x.inventoryName, value: x.serviceInventoryId
                                                        }
                                                    })
                                                    )
                                                )
                                            }}
                                        />
                                        {errors.inventorySubtype && touched.inventorySubtype ? (
                                            <div className='d-flex align-items-center'>
                                                <InputError
                                                    className='input-error mt-2'
                                                    errorTitle={errors.inventorySubtype}
                                                />
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className='col-lg-6 couponselect'>
                                    <div
                                        className={`sign-input ${errors.inventoryItems && touched.inventoryItems
                                            ? ` error-inputs `
                                            : ``
                                            }mb-3`}
                                    >
                                        <LabelTag
                                            classes={'text-gray fn-12 mb-2'}
                                            text={'Inventory Items'}
                                            For={'inventoryItems'}
                                        />
                                        <Select
                                            isMulti
                                            className='form-control p-0'
                                            id={'inventoryItems'}
                                            values={values.inventoryItems}
                                            options={invItemsOptions}
                                            onBlur={handleBlur('inventoryItems')}
                                            name='inventoryItems'
                                            onChange={e => {
                                                setFieldValue('inventoryItems', e)
                                            }}
                                        />
                                        {errors.inventoryItems && touched.inventoryItems ? (
                                            <div className='d-flex align-items-center'>
                                                <InputError
                                                    className='input-error mt-2'
                                                    errorTitle={errors.inventoryItems}
                                                />
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-12'>
                                    <div
                                        className={`sign-input ${errors.amountApplicable && touched.amountApplicable
                                            ? ` error-inputs `
                                            : ``
                                            }mb-3`}
                                    >
                                        <LabelTag
                                            classes={'text-gray fn-12 mb-2'}
                                            text={'Amount Applicable'}
                                            For={'amountApplicable'}
                                        />
                                        <div className='d-flex position-relative'>
                                            <PTag
                                                classes={
                                                    'text-dark-blue fw-bold fn-20 me-2 input-add-icon-left'
                                                }
                                                texts={'₹'}
                                            />
                                            <InputTag
                                                classes={
                                                    'w-100 form-control input-plachholder-paddingleft'
                                                }
                                                id={'amountApplicable'}
                                                placeholder={'Enter feature films'}
                                                type='number'
                                                name={'amountApplicable'}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.amountApplicable}
                                            />
                                        </div>
                                        {errors.amountApplicable && touched.amountApplicable ? (
                                            <div className='d-flex align-items-center'>
                                                <InputError
                                                    className='input-error mt-2'
                                                    errorTitle={errors.amountApplicable}
                                                />
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className='col-12 d-flex justify-content-center mb-3'>
                                    <ButtonTag
                                        classes={'btn-orange px-4'}
                                        value={'Next'}
                                        type={'submit'}
                                    />
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    )
}

export default InventoryAddPackage