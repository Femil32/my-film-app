import React, { useContext, useState, useEffect } from 'react'
import { Accordion, Modal, Nav, Tab } from 'react-bootstrap'
import {
    BackButton,
    ATag,
    ButtonTag,
    Checkbox,
    InputTag,
    LabelTag,
    PTag,
    DefaultPhoneInput,
} from '../../components/designComponents/MicroComponents'
import MultiStepFormContext from './MultiStepFormContext'
import { Formik, Form, FieldArray } from 'formik'
import * as Yup from 'yup'
import InputError from '../../components/common/InputError'
import { useDispatch, useSelector } from 'react-redux'
import { basic_detail, setAuth } from '../../store/auth/slice'
import {
    allCategoryApi,
    allsubCategoriesApi,
    allSubSubCategoriesApi,
} from '../../store/category/slice'
import { toast } from 'react-toastify'
import { COUNTRY_CODE, MOBILE_NO } from '../../utils/constants'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
//icons
import { FiPlus } from 'react-icons/fi'
import { MdClose } from 'react-icons/md'
import IsLoadingHOC from '../../components/higherOrderLoader/IsLoadingHOC'
import { commonMsg } from '../../components/common/ValidationConstants'
import { CustomDatePicker } from '../../components/DateAndTime'
import { parsePhoneNumber } from 'react-phone-number-input'


const BasicDetail = ({ setLoading }) => {
    const { next, basicdetail, setBasicDetails } = useContext(MultiStepFormContext)

    const dispatch = useDispatch()

    const basic_detail_api = useSelector(store => store.auth)
    const categoryData = useSelector(state => state.category)

    const [show, setShow] = useState(false)
    const [selectedData, setSelectedData] = useState([])
    const [profilesData, setProfilesData] = useState([])

    const [tempArray, setTempArray] = useState([])

    useEffect(() => {
        Promise.all([
            dispatch(allCategoryApi()),
            dispatch(allsubCategoriesApi()),
            dispatch(allSubSubCategoriesApi()),
        ]).finally(() => {
            setLoading(false)
        })
    }, [])

    const onSubmitForm = values => {
        // let categoryArray = []
        // values.selectedData?.map((element, index) => {
        //     categoryArray.push(element.permalink)
        // })
        if (selectedData.length > 0) {
            let params = {
                ['firstName']: values.firstName,
                ['lastName']: values.lastName,
                ['mobile']: localStorage.getItem(MOBILE_NO),
                ['countryCode']: localStorage.getItem(COUNTRY_CODE),
                ['email']: values.email,
                ['gender']: values.gender,
                ['dob']: values.dob,
                ['profiles']: selectedData,
            }

            if (values.sameasabove) {
                params = {
                    ...params,
                    ['whatsAppCountryCode']: localStorage.getItem(COUNTRY_CODE),
                    ['whatsAppNumber']: localStorage.getItem(MOBILE_NO)
                }
            } else {
                const { nationalNumber, countryCallingCode } = parsePhoneNumber(values.whatsAppno) ?? null
                params = {
                    ...params,
                    ['whatsAppCountryCode']: '+' + countryCallingCode,
                    ['whatsAppNumber']: `${nationalNumber}`
                }
            }

            setBasicDetails({
                firstName: values.firstName,
                lastName: values.lastName,
                dob: values.dob,
                mobile: values.mobile,
                whatsAppno: values.whatsAppno,
                email: values.email,
                gender: values.gender,
                categories: selectedData,
                sameasabove: values.sameasabove,
            })
            dispatch(basic_detail(params))
        } else {
            toast.error(commonMsg.selectCategoty)
        }
    }

    useEffect(() => {
        if (basic_detail_api.status === 'failed') {
        } else if (basic_detail_api.status === 'succeed') {
            if (basic_detail_api.type === 'BASIC_DETAIL') {
                dispatch(setAuth())
                toast.success(commonMsg.basicDetail)
                nextRedirect()
            }
        } else {
        }
    }, [basic_detail_api.status])

    useEffect(() => {
        if (categoryData?.status === 'failed') {

        } else if (categoryData?.status === 'succeed') {
            if (categoryData?.type === 'SUB_SUB_CATEGORY_API') {
                dataSetSubSubcategory(
                    categoryData.subSubCategory,
                    categoryData.subCategory,
                    categoryData.category
                )
            }
        }
    }, [categoryData])

    useEffect(() => {

        if (show === true) {

            // selectedData.push()
            setTempArray([...selectedData])
        }
    }, [show])

    const dataSetSubSubcategory = (subSubCategoryArray, subCategoryArray, categoryArray) => {
        let categoryTempArray = []
        categoryArray.map((categoryData, i) => {
            categoryTempArray.push({
                categoryId: categoryData.categoryId,
                categoryName: categoryData.name,
                subCategory: [],
            })
            const categoryLastPos = categoryTempArray.length - 1
            const catId = categoryTempArray[categoryLastPos].categoryId
            subCategoryArray.map(subCategoryData => {
                if (catId === subCategoryData.categoryId) {
                    const isDisable = false
                    const isSubSubCategory =
                        subSubCategoryArray.find(value => {
                            return value.subCategoryId === subCategoryData.subCategoryId
                        }) !== undefined
                            ? true
                            : false
                    categoryTempArray[categoryLastPos].subCategory.push({
                        categoryId: subCategoryData.categoryId,
                        categoryName: subCategoryData.categoryName,
                        subCategoryId: subCategoryData.subCategoryId,
                        subCategoryName: subCategoryData.subCategoryName,
                        isActive: subCategoryData.isActive,
                        permalink: subCategoryData.permalink,
                        isSubSubCategory: isSubSubCategory,
                        isSelect: isDisable,
                        isDisable: isDisable,
                        subSubCategory: [],
                    })
                    const subCategoryLastPos =
                        categoryTempArray[categoryLastPos].subCategory.length - 1
                    const subCategory =
                        categoryTempArray[categoryLastPos].subCategory[subCategoryLastPos]
                    if (subCategory.isSubSubCategory === true) {
                        subSubCategoryArray.map((subSubCategory, subSubCategoryIndex) => {
                            if (subSubCategory.subCategoryId === subCategory.subCategoryId) {
                                const isDisable = false
                                categoryTempArray[categoryLastPos].subCategory[
                                    subCategoryLastPos
                                ].subSubCategory.push({
                                    categoryId: subSubCategory.categoryId,
                                    categoryName: subSubCategory.categoryName,
                                    subCategoryId: subSubCategory.subCategoryId,
                                    subCategoryName: subSubCategory.subCategoryName,
                                    subSubCategoryId: subSubCategory.subSubCategoryId,
                                    subSubCategoryName: subSubCategory.subSubCategoryName,
                                    permalink: subSubCategory.permalink,
                                    isActive: subSubCategory.isActive,
                                    isSelect: isDisable,
                                    isDisable: isDisable,
                                })
                            }
                        })
                    }
                    // setParamsData(tempData)
                }
            })
            const subCategory = [
                ...categoryTempArray[categoryLastPos].subCategory.filter(
                    ({ isSubSubCategory }) => isSubSubCategory
                ),
                ...categoryTempArray[categoryLastPos].subCategory.filter(
                    ({ isSubSubCategory }) => !isSubSubCategory
                ),
            ]
            categoryTempArray[categoryLastPos].subCategory = []
            categoryTempArray[categoryLastPos].subCategory = subCategory
        })
        setProfilesData(categoryTempArray)
    }

    const subCategories = (data, index) => (
        <Accordion.Body className='px-0 pb-0'>
            {data.subCategory?.map((x, i) => {
                return (
                    <div
                        className={`create-profile-drop d-flex justify-content-between align-items-center ${x.isSubSubCategory && 'mb-2'
                            }`}
                        key={i}
                    >
                        {x.isSubSubCategory ? (
                            <Accordion defaultChecked='0' className='w-100 mx-2' key={i}>
                                <Accordion.Item eventKey='0' className='border-0 w-100'>
                                    <Accordion.Header>
                                        <PTag
                                            classes={'text-dark-blue bold fn-16 py-3 px-3'}
                                            texts={x.subCategoryName}
                                        />
                                    </Accordion.Header>
                                    <Accordion.Body className='px-1 py-1 mx-2'>
                                        {x.subSubCategory.map((element, index) => {
                                            return (
                                                <div
                                                    className='d-flex justify-content-between align-items-center border-bottom p-2 w-100'
                                                    key={index}
                                                >
                                                    <p
                                                        className={'text-dark-blue bold fn-16'}
                                                        style={{ width: '300%' }}
                                                    >
                                                        {' '}
                                                        {element.subSubCategoryName}
                                                    </p>
                                                    <Checkbox
                                                        classes={'justify-content-end me-2'}
                                                        defaultChecked={selectedData.includes(
                                                            element.permalink
                                                        )}
                                                        onChange={e => {
                                                            if (e.target.checked) {
                                                                setTempArray([
                                                                    ...tempArray,
                                                                    element.permalink,
                                                                ])
                                                            } else {
                                                                const data = tempArray.findIndex(
                                                                    data => {
                                                                        return (
                                                                            data ===
                                                                            element.permalink
                                                                        )
                                                                    }
                                                                )
                                                                tempArray.splice(data, 1)
                                                                setTempArray([...tempArray])
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            )
                                        })}
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        ) : (
                            <div
                                className={`d-flex justify-content-between align-items-center w-100 mx-2 px-2 ${!x.isSubSubCategory && 'border-bottom py-2'
                                    } w-100`}
                                key={i}
                            >
                                <p className={'text-dark-blue bold fn-16'} style={{ width: '80%' }}>
                                    {' '}
                                    {x.subCategoryName}
                                </p>
                                <Checkbox
                                    classes={'justify-content-end me-2'}
                                    defaultChecked={selectedData.includes(x.permalink)}
                                    onChange={e => {
                                        if (e.target.checked) {
                                            setTempArray([...tempArray, x.permalink])
                                        } else {
                                            const data = tempArray.findIndex(data => {
                                                return data === x.permalink
                                            })
                                            tempArray.splice(data, 1)
                                            setTempArray([...tempArray])
                                        }
                                    }}
                                />
                            </div>
                        )}
                    </div>
                )
            })}
        </Accordion.Body>
    )

    const dailogCategoryAndSubCategory = () => {
        return (
            <div className='select-Category select-Category-modal'>
                <Modal
                    show={show}
                    onHide={() => {
                        setShow(false)
                        setTempArray([])
                        setSelectedData([...selectedData])
                        // setSelectedSubCategory(state => {
                        //     return []
                        // })
                    }}
                    dialogClassName='modal-dialog-scrollable'
                    aria-labelledby='example-custom-modal-styling-title'
                >
                    <Modal.Header className='border-bottom-0 pb-0' closeButton>
                        <PTag classes={'text-dark-blue fn-17 fw-bold'} texts={'Select Category'} />
                    </Modal.Header>
                    <Modal.Body>
                        <div className='pb-2 h-100 d-flex flex-column'>
                            <div className='justify-content-between'>
                                <div className='shadow-accordion center-item chat-window accordion-down-arrow'>
                                    {profilesData?.map((data, index) => {
                                        return (
                                            <Accordion
                                                defaultChecked='0'
                                                className='mb-3'
                                                key={index}
                                            >
                                                <Accordion.Item eventKey='0' className='border-0'>
                                                    <Accordion.Header>
                                                        <PTag
                                                            classes={
                                                                'text-dark-blue bold fn-16 py-3 px-3'
                                                            }
                                                            texts={data.categoryName}
                                                        />
                                                    </Accordion.Header>
                                                    {subCategories(data, index)}
                                                </Accordion.Item>
                                            </Accordion>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer className='border-top-0 pt-0'>
                        <div className='bg-white box-shadow w-100 m-0'>
                            <ButtonTag
                                classes={'btn-orange bold fn-12 w-100'}
                                value={'Continue'}
                                onClick={e => {
                                    e.preventDefault()
                                    setSelectedData([...tempArray])
                                    setShow(false)
                                }}
                            />
                        </div>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }

    const nextRedirect = () => {
        next()
    }

    return (
        <>
            <div className='max-w-625 mx-auto'>
                <PTag classes={'text-dark-blue fw-bold fn-17 mb-2'} texts={'Basic Details'} />
                <Formik
                    initialValues={{
                        firstName: basicdetail.firstName,
                        lastName: basicdetail.lastName,
                        dob: basicdetail.dob,
                        mobile: localStorage.getItem(COUNTRY_CODE) + localStorage.getItem(MOBILE_NO),
                        whatsAppno: basicdetail.whatsAppno ?? '',
                        email: basicdetail.email,
                        gender: basicdetail.gender,
                        categories: basicdetail.categories,
                        sameasabove: basicdetail.sameasabove,
                    }}
                    validationSchema={Yup.object().shape({
                        firstName: Yup.string()
                            .matches('[a-zA-Z]{2,30}', 'Please enter valid name')
                            .required('This firstname field is required'),
                        lastName: Yup.string()
                            .matches('[a-zA-Z]{2,30}', 'Please enter valid name')
                            .required('This lastname field is required'),
                        dob: Yup.string().nullable().required('Please select date of birth'),

                        mobile: Yup.string().required('This mobile no field is required'),
                        whatsAppno: Yup.string().nullable()
                            .required('This whatsapp no field is required')
                            .min(10, 'Enter vaild Whatsapp no'),
                        email: Yup.string()
                            .email('Enter valid email')
                            .required('This email field is required'),
                        gender: Yup.string().required('Please select your gender'),

                        // categories: Yup.array()
                        //     .of(
                        //         Yup.object().shape({
                        //             id: Yup.string(),
                        //             category: Yup.string(),
                        //         })
                        //     )
                        //     .min(1)
                        //     .required('Any catagoery field select required'),
                        sameasabove: Yup.boolean(),
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
                        handleBlur,
                        handleSubmit,
                        setFieldValue,
                    }) => (
                        <>
                            <Form
                                onSubmit={handleSubmit}
                                className='d-flex flex-column justify-content-between h-100'
                            >
                                <div className='row'>
                                    <div className='col-sm-6 col-12'>
                                        <div
                                            className={`sign-input ${errors.firstName && touched.firstName
                                                ? `error-inputs `
                                                : null
                                                }mb-3`}
                                        >
                                            <LabelTag
                                                For={'firstName'}
                                                classes={'text-dark-gray mb-2'}
                                                text={'First Name'}
                                            />
                                            <InputTag
                                                classes={'form-control mb-2'}
                                                placeholder={'Enter first name'}
                                                name={'firstName'}
                                                value={values.firstName}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.firstName && touched.firstName ? (
                                                <InputError
                                                    className={'input-error mt-2'}
                                                    errorTitle={errors.firstName}
                                                />
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className='col-sm-6 col-12'>
                                        <div
                                            className={`sign-input ${errors.lastName && touched.lastName
                                                ? `error-inputs `
                                                : null
                                                }mb-3`}
                                        >
                                            <LabelTag
                                                For={'listName'}
                                                classes={'text-dark-gray mb-2'}
                                                text={'Last name'}
                                            />
                                            <InputTag
                                                classes={'form-control mb-2'}
                                                placeholder={'Enter last name'}
                                                name={'lastName'}
                                                value={values.lastName}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.lastName && touched.lastName ? (
                                                <InputError
                                                    className='input-error mt-2'
                                                    errorTitle={errors.lastName}
                                                />
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className='col-sm-6 col-12'>
                                        <div
                                            className={`sign-input ${errors.dob && touched.dob ? `error-inputs ` : null
                                                }mb-3`}
                                        >
                                            <LabelTag
                                                For={'dob'}
                                                classes={'text-dark-gray mb-2'}
                                                text={'DOB'}
                                            />
                                            <div className='datePicker-input'>
                                                <CustomDatePicker
                                                    name={'dob'}
                                                    maxDate={'afterToday'}
                                                    id='dob'
                                                    inputClass={'px-3 py-2'}
                                                    className={
                                                        'form-control d-flex justify-content-between align-middle py-2'
                                                    }
                                                    containerClassName={'form-control'}
                                                    value={values.dob}
                                                    onChange={val => {
                                                        setFieldValue(
                                                            'dob',
                                                            new Date(val)
                                                        )
                                                    }}
                                                    onBlur={() => handleBlur('dob')}
                                                    format={'DD-MM-YYYY'}
                                                    placeholder={'Select Date of Birth'}
                                                />
                                                {/* <DatePicker
                                                    format='dd-MM-yyyy'
                                                    className={
                                                        'w-100 form-control d-flex justify-content-between align-middle py-2'
                                                    }
                                                    disabledDate={afterToday()}
                                                    placeholder='Select Date'
                                                    onChange={value => setFieldValue('dob', value)}
                                                    defaultValue={values.dob}
                                                /> */}
                                            </div>
                                            {errors.dob && touched.dob ? (
                                                <InputError
                                                    className={'input-error mt-2'}
                                                    errorTitle={errors.dob}
                                                />
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className='col-sm-6 col-12'>
                                        <div
                                            className={`sign-input ${errors.email && touched.email
                                                ? `error-inputs `
                                                : null
                                                }mb-3`}
                                        >
                                            <LabelTag
                                                For={'email'}
                                                classes={'text-dark-gray mb-2'}
                                                text={'Email'}
                                            />
                                            <InputTag
                                                classes={'form-control'}
                                                placeholder={'Enter email address'}
                                                name={'email'}
                                                value={values.email}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            {errors.email && touched.email ? (
                                                <InputError
                                                    className='input-error mt-2'
                                                    errorTitle={errors.email}
                                                />
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className='col-sm-6 col-12'>
                                        <div
                                            className={`sign-input ${errors.mobile && touched.mobile
                                                ? `error-inputs `
                                                : ``
                                                }mb-3`}
                                        >
                                            <div className='d-flex justify-content-between w-100 mb-2'>
                                                <LabelTag
                                                    For={'mobile'}
                                                    classes={'text-dark-gray w-100'}
                                                    text={'Mobile'}
                                                />
                                            </div>
                                            <div className='form-control d-flex align-middle plus-number-inputs mb-2'>
                                                <DefaultPhoneInput
                                                    placeholder='Enter phone number'
                                                    value={values.mobile}
                                                    onChange={handleChange}
                                                    disabled
                                                />

                                                {errors.mobile && touched.mobile ? (
                                                    <InputError
                                                        className='input-error mt-2'
                                                        errorTitle={errors.mobile}
                                                    />
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-sm-6 col-12'>
                                        <div
                                            // className={`${errors.whatsAppno && touched.whatsAppno
                                            //     ? `error-inputs `
                                            //     : ``
                                            //     }mb-3`}
                                            className={`mb-3`}
                                        >
                                            <div className='d-flex justify-content-between w-100 mb-2'>
                                                <LabelTag
                                                    For={'wnumber'}
                                                    classes={'text-dark-gray w-100'}
                                                    text={'WhatsApp No.'}
                                                />
                                            </div>
                                            <div className='form-control d-flex align-middle plus-number-inputs mb-2'>
                                                <DefaultPhoneInput
                                                    name="whatsAppno"
                                                    placeholder='Enter whatsapp number'
                                                    onChange={(value) => {
                                                        value ? setFieldValue('whatsAppno', value) : setFieldValue('whatsAppno', null)
                                                    }}
                                                    onBlur={handleBlur('whatsAppno')}
                                                    value={values.whatsAppno}
                                                />
                                            </div>
                                            <Checkbox
                                                classes={
                                                    'justify-content-ed fn-12 ps-0 form-check d-flex align-items-center w-100'
                                                }
                                                For='sameMobile'
                                                name={'sameasabove'}
                                                value={values.sameasabove}
                                                onChange={(e) => {
                                                    setFieldValue('sameasabove', !values.sameasabove)
                                                    e.target.checked && setFieldValue('whatsAppno', values.mobile)
                                                }}
                                                Checkboxlabel={'Same as above'}
                                                id='sameMobile'
                                            />
                                            {errors.whatsAppno && touched.whatsAppno && (
                                                <InputError
                                                    className='input-error mt-2'
                                                    errorTitle={errors.whatsAppno}
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <div className='col-sm-6 col-12'>
                                        <div
                                            className={`sign-input ${errors.gender && touched.gender
                                                ? `error-inputs `
                                                : null
                                                } mb-3`}
                                        >
                                            <LabelTag
                                                classes={'text-dark-gray mb-2'}
                                                text={'Gender'}
                                            />
                                            <div className='d-flex justify-content-between'>
                                                <div className='box-gender'>
                                                    <InputTag
                                                        type={'radio'}
                                                        classes={'gender-radio'}
                                                        name={'gender'}
                                                        value='male'
                                                        checked={values.gender === 'male'}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    <div className='gender-box rounded-3 border'>
                                                        <PTag
                                                            classes={'gender-text bold'}
                                                            texts={'Male'}
                                                        />
                                                    </div>
                                                </div>
                                                <div className='box-gender mx-2 mx-lg-0'>
                                                    <InputTag
                                                        type={'radio'}
                                                        classes={'gender-radio '}
                                                        name={'gender'}
                                                        value='female'
                                                        checked={values.gender === 'female'}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    <div className='gender-box rounded-3 border'>
                                                        <PTag
                                                            classes={'gender-text bold'}
                                                            texts={'Female'}
                                                        />
                                                    </div>
                                                </div>
                                                <div className='box-gender'>
                                                    <InputTag
                                                        type={'radio'}
                                                        classes={'gender-radio'}
                                                        name={'gender'}
                                                        value='other'
                                                        checked={values.gender === 'other'}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                    <div className='gender-box rounded-3 border'>
                                                        <PTag
                                                            classes={'gender-text bold'}
                                                            texts={'Others'}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-sm-6 col-12'>
                                        <FieldArray
                                            name='categories'
                                            render={arrayHelpers => {
                                                const category = values.categories
                                                return (
                                                    <div className='d-flex flex-wrap gap-2 mb-sm-3'>
                                                        <div className='d-flex align-items-center justify-content-between w-100'>
                                                            <LabelTag
                                                                text={'Select Category'}
                                                                classes={'text-dark-gray'}
                                                            />
                                                            <div className='d-flex align-items-center pointer'>
                                                                <FiPlus
                                                                    className={'Fi-Plus'}
                                                                    fontSize={15}
                                                                />
                                                                <ATag
                                                                    children={
                                                                        <PTag
                                                                            classes={
                                                                                'text-navy-blue'
                                                                            }
                                                                            texts={'  Add '}
                                                                        />
                                                                    }
                                                                    onClick={e => {
                                                                        e.preventDefault()
                                                                        setShow(true)
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                        {selectedData?.map((element, index) => (
                                                            <div
                                                                className='btn-dark-blue me-2 rounded px-3 py-2'
                                                                key={index}
                                                            >
                                                                <div className={'d-flex w-100'}>
                                                                    <PTag
                                                                        classes={
                                                                            'bold me-1 text-capitalize'
                                                                        }
                                                                        texts={
                                                                            element.split('/')[
                                                                            element.split('/')
                                                                                .length - 1
                                                                            ]
                                                                        }
                                                                    />
                                                                    <span
                                                                        onClick={e => {
                                                                            e.preventDefault()
                                                                            arrayHelpers.remove(
                                                                                index
                                                                            )
                                                                            selectedData.splice(
                                                                                index,
                                                                                1
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
                                                        {/* {errors.categories && touched.categories ? (
                                                            <InputError
                                                                className='input-error text-red'
                                                                errorTitle={errors.categories}
                                                            />
                                                        ) : null} */}
                                                    </div>
                                                )
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className='d-flex justify-content-center'>
                                    <ButtonTag
                                        classes={'btn-orange fw-normal mb-5 mt-2 px-5'}
                                        value={'Continue'}
                                        type={'submit'}
                                    />
                                </div>
                            </Form>
                        </>
                    )}
                </Formik>

                {dailogCategoryAndSubCategory()}
            </div>
        </>
    )
}

export default IsLoadingHOC(BasicDetail)
