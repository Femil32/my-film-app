import React, { useContext, useEffect, useState } from 'react'
import {
    ButtonTag,
    InputTag,
    LabelTag,
    MultiLineInputTag,
    PTag,
} from '../../components/designComponents/MicroComponents'

import InventoryContext from './InventoryContext'
import { Formik, Form, FieldArray } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { setService, inventoryWithProfileApi, getInventoryById, updateInventoryWithProfileApi, getInventorytypeApi, getInventorySubtypeApi, setInventorData } from '../../store/service/slice'
import * as Yup from 'yup'
import Select from 'react-select'
import InputError from '../../components/common/InputError'
import IsLoadingHOC from '../../components/higherOrderLoader/IsLoadingHOC'
//icons
import { MdClose } from 'react-icons/md'
import { FiTag } from 'react-icons/fi'
import { toast } from 'react-toastify'
import { serviceMsg } from '../../components/common/ValidationConstants'
import { minInputRange } from '../../helpers/functions'

const InventoryBasicDetail = ({ setLoading, data }) => {
    const { next, setInventory } = useContext(InventoryContext)

    const [inventoryData, setInventoryData] = useState([])

    const [inventorySubTypeData, setInventorySubTypeData] = useState([])

    const dispatch = useDispatch()

    const servicesProfile = useSelector(state => state.service)

    useEffect(() => {
        Promise.all([
            data.isEdit ? (
                dispatch(getInventoryById(data?.data?.serviceInventoryId)),
                dispatch(getInventorytypeApi(data?.categoryData?.subSubCategoryId)),
                dispatch(getInventorySubtypeApi(data?.data?.inventoryType))
            ) : dispatch(setInventorData())
        ]).then(() => {
            setLoading(false)
        })
    }, []);


    useEffect(() => {

        if (servicesProfile.status === 'succeed' && servicesProfile.type === 'INVENTORYTYPE_API') {
            const data = []
            servicesProfile.allInventoryTypes.map((element, index) => {
                data.push({ label: element.name, value: element.inventoryTypeId })
            })
            setInventoryData(data)
        }

        if (servicesProfile.status === 'succeed' && servicesProfile.type === 'INVENTORY_SUB_TYPE_API') {
            const data = []
            servicesProfile.allInventorySubTypes.map((element, index) => {
                data.push({ label: element.name, value: element.inventorySubtypeId })
            })
            dispatch(setService())
            setInventorySubTypeData(data)
        }

        if (servicesProfile.status === 'succeed' && servicesProfile.type === 'INVENTORY_CREATE_PROFILE_API') {
            dispatch(setService())
            setInventory(servicesProfile.addInventory)
            toast.success(serviceMsg.serviceProfileCreated)
            next()
        }

        if (servicesProfile.status === 'succeed' && servicesProfile.type === 'UPDATE_INVENTORY') {
            dispatch(setService())
            toast.success(serviceMsg.serviceProfileDetails)
            setInventory(servicesProfile.addInventory)
            next()
        }
        //
    }, [servicesProfile]);

    const onSubmitForm = values => {
        if (data.isEdit) {
            const payload = {
                serviceProfileId: data?.profile?.profileId,
                inventoryId: data.data.serviceInventoryId,
                data: {
                    ["inventoryType"]: values.inventory_type.value,
                    ["inventorySubtype"]: values.inventory_subtype.value,
                    ["inventoryName"]: values.inventory_name,
                    ["description"]: values.description,
                    ["keywords"]: values.tags,
                    ["amenities"]: ["none"],
                    ["manufacturingYear"]: values.manufacturing_year,
                    ["quantity"]: values.quantity
                }
            }
            dispatch(updateInventoryWithProfileApi(payload))
        } else {
            const payload = {
                ["categoryId"]: data.categoryData.categoryId,
                ["subCategoryId"]: data.categoryData.subCategoryId,
                ["subSubCategoryId"]: data.categoryData.subSubCategoryId,
                ["inventoryType"]: values.inventory_type.value,
                ["inventorySubtype"]: values.inventory_subtype.value,
                ["inventoryName"]: values.inventory_name,
                ["description"]: values.description,
                ["keywords"]: values.tags,
                ["amenities"]: ["none"],
                ["manufacturingYear"]: values.manufacturing_year,
                ["quantity"]: values.quantity
            }
            dispatch(inventoryWithProfileApi(payload))
        }

    }

    return (
        <>
            <div className='max-w-625 mx-auto'>
                <PTag classes={'text-dark-blue fw-bold fn-16 mb-4'} texts={'Basic Details'} />
                <Formik
                    enableReinitialize
                    initialValues={{
                        inventory_type: data.isEdit
                            ? data?.data?.inventoryType !== undefined
                                ? {
                                    label: data?.data?.inventoryTypeName,
                                    value: data?.data?.inventoryType,
                                }
                                : ''
                            : '',
                        inventory_subtype: data.isEdit
                            ? data?.data?.inventoryType !== undefined
                                ? {
                                    label: data?.data?.inventorySubtypeName,
                                    value: data?.data?.inventorySubtype,
                                }
                                : ''
                            : '',
                        inventory_name: servicesProfile?.servicesBascDetails?.inventoryName ?? '',
                        manufacturing_year:
                            servicesProfile?.servicesBascDetails?.manufacturingYear ?? '',
                        description: servicesProfile?.servicesBascDetails?.description ?? '',
                        tags: servicesProfile?.servicesBascDetails?.keywords ?? [],
                        quantity: servicesProfile?.servicesBascDetails?.quantity ?? '',
                    }}
                    validationSchema={Yup.object().shape({
                        inventory_type: Yup.object()
                            .shape({
                                label: Yup.string().required('inventory type'),
                                value: Yup.string().required('inventory type'),
                            })
                            .required('inventory type'),
                        inventory_subtype: Yup.object()
                            .shape({
                                label: Yup.string().required('inventory sub-type'),
                                value: Yup.string().required('inventory sub-type'),
                            })
                            .required('inventory sub-type'),
                        inventory_name: Yup.string().required('enter inventory name'),
                        manufacturing_year: minInputRange('manufacturing year', 0),
                        description: Yup.string().required('enter description'),
                        tags: Yup.array().of(Yup.string()).min(1).required('tags required'),
                        quantity: minInputRange('quantity', 0),
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
                            <div className='row'>
                                <div className='col-lg-6 col-12 couponselect'>
                                    <div
                                        className={`sign-input ${errors.inventory_type?.label && touched.inventory_type
                                            ? ` error-inputs `
                                            : ``
                                            }mb-3`}
                                    >
                                        <LabelTag
                                            classes={'text-gray fn-12 mb-2'}
                                            text={'Inventory type'}
                                            For={'inventory-type'}
                                        />
                                        <Select
                                            className='form-control p-0'
                                            options={inventoryData}
                                            value={values.inventory_type}
                                            name='inventory_type'
                                            placeholder='Select Inventory Type'
                                            onBlur={handleBlur('inventory_type')}
                                            getOptionValue={inventoryData => inventoryData.value}
                                            onChange={e => {
                                                if (e !== undefined) {
                                                    setFieldValue('inventory_type', {
                                                        label: e.label,
                                                        value: e.value,
                                                    })
                                                    setFieldValue('inventory_subtype', '')
                                                    dispatch(getInventorySubtypeApi(e.value))
                                                }
                                            }}
                                        />
                                        {errors?.inventory_type?.label && touched.inventory_type ? (
                                            <div className='d-flex align-items-center'>
                                                <InputError
                                                    className='input-error mt-2'
                                                    errorTitle={errors?.inventory_type?.label}
                                                />
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className='col-lg-6 col-12 couponselect'>
                                    <div
                                        className={`sign-input ${errors.inventory_subtype?.label &&
                                            touched.inventory_subtype
                                            ? ` error-inputs `
                                            : ``
                                            }mb-3`}
                                    >
                                        <LabelTag
                                            classes={'text-gray fn-12 mb-2'}
                                            text={'Inventory Subtype'}
                                            For={'inventory_subtype'}
                                        />
                                        <Select
                                            className='form-control p-0'
                                            value={values.inventory_subtype}
                                            options={inventorySubTypeData}
                                            name='inventory_subtype'
                                            placeholder='Select Inventory Subtype'
                                            onChange={e => {
                                                setFieldValue('inventory_subtype', {
                                                    label: e.label,
                                                    value: e.value,
                                                })
                                            }}
                                            onBlur={handleBlur('inventory_subtype')}
                                            getOptionValue={inventorySubTypeData =>
                                                inventorySubTypeData.value
                                            }
                                        />
                                        {errors.inventory_subtype?.label &&
                                            touched.inventory_subtype ? (
                                            <div className='d-flex align-items-center'>
                                                <InputError
                                                    className='input-error mt-2'
                                                    errorTitle={errors.inventory_subtype?.label}
                                                />
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                                <div className='col-lg-6 col-12'>
                                    <div
                                        className={`sign-input ${errors.inventory_name && touched.inventory_name
                                            ? ` error-inputs `
                                            : ``
                                            }mb-3`}
                                    >
                                        <LabelTag
                                            classes={'text-gray fn-12 mb-2'}
                                            text={'Inventory name'}
                                        />
                                        <InputTag
                                            type={'text'}
                                            placeholder={'Enter inventory name'}
                                            classes={'form-control'}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            name={'inventory_name'}
                                            value={values.inventory_name}
                                        />
                                        {errors.inventory_name && touched.inventory_name ? (
                                            <InputError
                                                className={'input-error mt-2'}
                                                errorTitle={errors.inventory_name}
                                            />
                                        ) : null}
                                    </div>
                                </div>
                                <div className='col-lg-6 col-12'>
                                    <div
                                        className={`sign-input ${errors.manufacturing_year && touched.manufacturing_year
                                            ? `error-inputs `
                                            : ``
                                            }mb-3`}
                                    >
                                        <LabelTag
                                            classes={'text-gray fn-12 mb-2'}
                                            text={'Operational since/Manufacturing year'}
                                        />
                                        <InputTag
                                            type={'number'}
                                            placeholder={
                                                'Enter Operational since/Manufacturing year'
                                            }
                                            classes={'form-control'}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            name={'manufacturing_year'}
                                            value={values.manufacturing_year}
                                        />
                                        {errors.manufacturing_year && touched.manufacturing_year ? (
                                            <InputError
                                                className={'input-error mt-2'}
                                                errorTitle={errors.manufacturing_year}
                                            />
                                        ) : null}
                                    </div>
                                </div>
                                <div className='col-12'>
                                    <div
                                        className={`sign-input ${errors.description && touched.description
                                            ? ` error-inputs `
                                            : ``
                                            }mb-3`}
                                    >
                                        <LabelTag
                                            classes={'text-gray fn-12 mb-2'}
                                            text={'Description'}
                                            For={'description'}
                                        />
                                        <MultiLineInputTag
                                            id={'description'}
                                            placeholder={'Enter description'}
                                            name={'description'}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.description}
                                        />
                                        {errors.description && touched.description ? (
                                            <div className='d-flex align-items-center'>
                                                <InputError
                                                    className='input-error mt-2'
                                                    errorTitle={errors.description}
                                                />
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-lg-6 col-12'>
                                    <FieldArray
                                        name='tags'
                                        render={arrayHelpers => {
                                            const tagsArray = values.tags
                                            return (
                                                <>
                                                    <div
                                                        className={`sign-input ${errors.tags && touched.tags
                                                            ? ` error-inputs `
                                                            : ``
                                                            }mb-3`}
                                                    >
                                                        <LabelTag
                                                            classes={'text-gray fn-12 mb-2'}
                                                            text={'Tags'}
                                                            For={'tags'}
                                                        />
                                                        <div className='d-flex  position-relative'>
                                                            <FiTag
                                                                fontSize={20}
                                                                className={
                                                                    'me-2 Fi-Tag input-add-icon-left'
                                                                }
                                                            />
                                                            <InputTag
                                                                placeholder={'Add tags'}
                                                                id={'tags'}
                                                                classes={
                                                                    'w-100 form-control input-plachholder-paddingleft'
                                                                }
                                                                name={'tags'}
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
                                                        </div>
                                                        {errors.tags && touched.tags ? (
                                                            <div className='d-flex align-items-center'>
                                                                <InputError
                                                                    className='input-error mt-2'
                                                                    errorTitle={errors.tags}
                                                                />
                                                            </div>
                                                        ) : null}
                                                    </div>

                                                    <div className='d-flex flex-wrap gap-1 mb-2'>
                                                        {tagsArray.map((element, index) => (
                                                            <div
                                                                className='btn-dark-blue me-2 rounded px-3 py-2'
                                                                key={index}
                                                            >
                                                                <div className={'d-flex w-100'}>
                                                                    <PTag
                                                                        classes={'bold me-1'}
                                                                        texts={element}
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
                                                                            fontSize={20}
                                                                            className={'Md-Close'}
                                                                        />
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </>
                                            )
                                        }}
                                    />
                                </div>
                                <div className='col-lg-6 col-12'>
                                    <div
                                        className={`sign-input ${errors.quantity && touched.quantity
                                            ? `error-inputs `
                                            : ``
                                            }mb-3`}
                                    >
                                        <LabelTag
                                            classes={'text-gray fn-12 mb-2'}
                                            text={'Quantity'}
                                        />
                                        <InputTag
                                            type={'number'}
                                            placeholder={'Enter Quantity'}
                                            classes={'form-control'}
                                            value={values.quantity}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            name={'quantity'}
                                        />
                                        {errors.quantity && touched.quantity ? (
                                            <InputError
                                                className={'input-error mt-2'}
                                                errorTitle={errors.quantity}
                                            />
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                            <div className='col-12'>
                                <div className='mb-3 d-flex justify-content-center'>
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

export default IsLoadingHOC(InventoryBasicDetail)
