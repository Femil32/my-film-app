import async from 'async'
import { FieldArray, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Modal, Nav, Tab } from 'react-bootstrap'
import PhoneInput, {
    formatPhoneNumberIntl,
    isPossiblePhoneNumber,
    isValidPhoneNumber
} from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import * as Yup from 'yup'
import { CameraIcon } from '../../assets/img'
import { Edit } from '../../components/AllSvgs'
import InputError from '../../components/common/InputError'
import MiniLoader from '../../components/customLoader/MiniLoader'
import {
    ATag,
    BackButton,
    ButtonTag,
    Checkbox,
    DefaultPhoneInput,
    ImgTag,
    InputTag,
    LabelTag,
    MultiLineInputTag,
    PTag
} from '../../components/designComponents/MicroComponents'
import IsLoadingHOC from '../../components/higherOrderLoader/IsLoadingHOC'
import { getUserInfo, update_profile } from '../../store/auth/slice'
import {
    cityApi,
    countriesApi,
    setAddressApi,
    setLocation,
    stateApi
} from '../../store/location/slice'
import { uploadPhotoApi } from '../../store/socialdetail/slice'
import { URL_REGEX } from '../../utils/constants'
//icons
import { FiPlus } from 'react-icons/fi'
import { MdClose, MdDelete } from 'react-icons/md'
import { commonMsg } from '../../components/common/ValidationConstants'
import { SingleDatePicker } from '../../components/DateAndTime'
import { languageApi } from '../../store/masterdata/slice'

const MyProfileDetails = ({ setLoading }) => {
    // constant
    const dummyPlatFormArray = [
        {
            id: 1,
            value: 'facebook',
            label: 'FaceBook',
            url: 'https://www.FaceBook.com/',
        },
        {
            id: 2,
            value: 'instagrap',
            label: 'Instagram',
            url: 'https://Instagram.com/',
        },
        {
            id: 3,
            value: 'twitter',
            label: 'Twitter',
            url: 'https://twitter.com/',
        },
    ]

    // dispatch
    const dispatch = useDispatch()

    // useSelector
    const userInfo = useSelector(state => state.auth)
    const sdetail = useSelector(state => state.sdetail)
    const addressApi = useSelector(store => store.location)
    const masterdataProfile = useSelector(store => store.masterdata)

    // states
    const nevigate = useNavigate()
    const [show, setShow] = useState()
    const [languages, setLanguages] = useState([])
    const [isSelectDefault, setIsSelectDefault] = useState(false)
    const [socialUrl, setSocialUrl] = useState('')
    const [isSelectAdd, setIsSelectAdd] = useState(false)
    const [socialSeletct, setSocialSeletct] = useState('')
    const [socialIndex, setSocialIndex] = useState(-1)
    const [countryArray, setCountryArray] = useState([])
    const [stateArray, setStateArray] = useState([])
    const [cityArray, setCityArray] = useState([])
    const [defaultAddress, setDefaultAddress] = useState({})
    const [defaultDob, setDefaultDob] = useState(null)
    const [profileImagePreview, setProfileImagePreview] = useState(null)
    const [miniLoader, setMiniLoader] = useState(false)

    // useEffects
    useEffect(() => {
        Promise.all([
            dispatch(getUserInfo()),
            dispatch(languageApi()),
            dispatch(countriesApi()),
            dispatch(setLocation()),
        ]).finally(() => {
            setLoading(false)
        })
    }, [])

    useEffect(() => {
        if (userInfo.status === 'succeed') {
            if (userInfo.type === 'USER_INFO') {
                setLoading(true)
                async.series(
                    {
                        country: function (callback) {
                            let country = addressApi?.country?.filter(
                                data => data?.countryId == userInfo?.userInfo?.address?.country
                            )
                            dispatch(stateApi(userInfo?.userInfo?.address?.country))
                            callback(null, country[0])
                        },
                        state: function (callback) {
                            let state = addressApi?.state?.filter(
                                data => data?.stateId == userInfo?.userInfo?.address?.state
                            )
                            dispatch(cityApi(userInfo?.userInfo?.address?.state))
                            callback(null, state[0])
                        },
                        city: function (callback) {
                            let city = addressApi?.city?.filter(
                                data => data?.cityId == userInfo?.userInfo?.address?.city
                            )
                            callback(null, city[0])
                        },
                    },
                    function (err, results) {
                        console.log(userInfo?.userInfo?.dob, new Date(userInfo?.userInfo?.dob));
                        setDefaultDob(new Date(userInfo?.userInfo?.dob))

                        console.log(userInfo?.userInfo);

                        let temp = {
                            country: { ...results.country, label: results?.country?.name },
                            state: { ...results.state, label: results?.state?.name },
                            city: { ...results.city, label: results?.city?.name },
                        }
                        setDefaultAddress(temp)
                        setLoading(false)
                    }
                )
            }
            if (userInfo.type === 'UPDATE_PROFILE') {
                toast.success(commonMsg.basicDetail)
                Promise.all([
                    dispatch(getUserInfo())
                ]).finally(() => {
                    //setLoading(false)
                })
            }
        }
    }, [userInfo])

    useEffect(() => {
        if (addressApi.status === 'failed') {
        } else if (addressApi.status === 'succeed') {
            if (addressApi.type === 'COUNTRIES_API' && addressApi.country.length > 0) {
                let data = addressApi.country.map((x, index) => ({ ...x, label: x.name }))
                setCountryArray(data)
            } else if (addressApi.type === 'STATES_API' && addressApi.state.length > 0) {
                let data = addressApi.state.map((x, index) => ({ ...x, label: x.name }))
                setStateArray(data)
            } else if (addressApi.type === 'CITIES_API' && addressApi.city.length > 0) {
                let data = addressApi.city.map((x, index) => ({ ...x, label: x.name }))
                setCityArray(data)
            } else if (addressApi.type === 'SET_ADDRESS_API') {
                toast.success(commonMsg.addressDetail)
                // nevigate('/dashboard')
            }
        }
    }, [addressApi])

    useEffect(() => {
        if (sdetail.status === 'succeed') {
            if (sdetail.type === 'GET_SOCICAL_DETAIL') {
                setLanguages(sdetail.socialData.languagesKnown)
            }
        }
    }, [sdetail])

    // custome Functions
    const onSubmitFormBasicDetails = values => {
        let params = {
            ['firstName']: values.firstName,
            ['lastName']: values.lastName,
            ['dob']: values.dob,
            ['email']: values.email,
            ['languagesKnown']: languages,
            ['platforms']: values.socialProfiles,
            ['description']: values.description,
        }
        if (values.sameasabove) {
            params = {
                ...params,
                ['whatsAppNumber']: `${values.mobile}`,
            }
        } else {
            params = {
                ...params,
                ['whatsAppNumber']: `${values.whatsAppno}`,
            }
        }

        params = {
            ...params,
            ['address1']: `${userInfo.userInfo.address.address1}`,
            ['cityId']: `${userInfo.userInfo.address.city}`,
            ['stateId']: `${userInfo.userInfo.address.state}`,
            ['countryId']: `${userInfo.userInfo.address.country}`,
            ['pincode']: `${userInfo.userInfo.address.pincode}`,
        }

        // vadidate mobile number
        if (isPossiblePhoneNumber(values.mobile) && isValidPhoneNumber(values.mobile)) {
            let tempMobile = formatPhoneNumberIntl(values.mobile).split(' ')
            let tempWpMobile = formatPhoneNumberIntl(values.whatsAppno).split(' ')

            let tempMobileCode = tempMobile.shift()
            let tempWpMobileCode = tempWpMobile.shift()
            params['countryCode'] = tempMobileCode
            params['mobile'] = tempMobile.join('')
            params['whatsAppCountryCode'] = tempWpMobileCode
            params['whatsAppNumber'] = tempWpMobile.join('')

            dispatch(update_profile(params))
        }
    }

    const onSubmitFormAddressDetail = values => {
        let pram = {
            ['address1']: values.address,
            ['cityId']: values.city.cityId,
            ['stateId']: values.state.stateId,
            ['countryId']: values.country.countryId,
            ['pincode']: values.pincode,
        }
        Promise.all([dispatch(setAddressApi(pram))]).finally(() => setLoading(false))
        dispatch(setLocation())
    }

    const addLanguage = (e, lang, index) => {
        if (e.target.checked) {
            setLanguages([...languages, lang.language])
        } else {
            for (var i = 0; i < languages.length; i++) {
                if (
                    languages[i] === lang.language ||
                    languages[i] === lang.language.toLowerCase()
                ) {
                    languages.splice(i, 1)
                }
            }
        }
    }

    const languagePopUp = languages => {
        return (
            <div className='select-Category select-Category-modal'>
                <Modal
                    show={show}
                    onHide={() => {
                        setShow(false)
                    }}
                    dialogClassName='modal-dialog-scrollable'
                    aria-labelledby='example-custom-modal-styling-title'
                >
                    <Modal.Header className='border-bottom-1 py-3'>
                        <PTag classes={'text-dark-blue fn-17 fw-bold'} texts={'Select Languages'} />
                    </Modal.Header>
                    <Modal.Body className='edit-profile-modal'>
                        <div className='pb-2 h-100 d-flex flex-column'>
                            {masterdataProfile?.languages.map((lang, index) => {
                                return (
                                    <div
                                        className='d-flex justify-content-between align-items-center border-bottom pb-2 mb-2'
                                        key={index}
                                    >
                                        <PTag
                                            classes={'text-dark-gray white-space-nowrap w-100 ms-2'}
                                            texts={lang.language}
                                        />
                                        <Checkbox
                                            classes={'justify-content-end me-2'}
                                            defaultChecked={
                                                languages.includes(lang.language.toLowerCase()) ||
                                                languages.includes(lang.language)
                                            }
                                            onChange={e => addLanguage(e, lang, index)}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    </Modal.Body>
                    <Modal.Footer className='border-top-0 pt-0'>
                        <div className='bg-white box-shadow w-100 m-0'>
                            <ButtonTag
                                classes={'btn-orange bold fn-12 w-100'}
                                value={'Continue'}
                                onClick={e => {
                                    setShow(false)
                                }}
                            />
                        </div>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }

    const addSocialDetail = arrayHelpers => {
        if (isSelectAdd === false) {
            if (socialSeletct !== '' && socialUrl !== '') {
                let arrayLanguages = Object.values(arrayHelpers.form.values.socialProfiles).filter(
                    element => element.name === socialSeletct
                )
                Object.values(arrayHelpers.form.values.socialProfiles)?.map((data, i) => {
                    if (socialSeletct === data.name) {
                        toast.error(commonMsg.selectOtherPlatform)
                    }
                })
                if (arrayLanguages.length == 0 && URL_REGEX.test(socialUrl)) {
                    arrayHelpers.push({
                        name: socialSeletct.toLowerCase(),
                        url: socialUrl,
                    })
                    resetData()
                } else {
                    toast.error(commonMsg.validURL)
                }
            } else if (socialSeletct == '') {
                toast.error(commonMsg.selectPlatform)
            } else {
                toast.error(commonMsg.socialDetailURL)
            }
        } else {
            if (socialUrl !== '') {
                arrayHelpers.replace(socialIndex, {
                    name: socialSeletct.toLowerCase(),
                    url: socialUrl,
                })
                resetData()
            } else {
                toast.error(commonMsg.socialDetailURL)
            }
        }
    }

    const resetData = () => {
        setSocialSeletct('')
        setSocialIndex(-1)
        setSocialUrl('')
        setIsSelectDefault(false)
        setIsSelectAdd(false)
    }

    const DeleteSocialProfileAlert = (index, arrayHelpers) => {
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
                deleteSocialProfile(index, arrayHelpers)
            }
        })
    }

    const deleteSocialProfile = (index, arrayHelpers) => {
        arrayHelpers.remove(index)
    }

    const handleProfileImageChange = files => {
        setProfileImagePreview(URL.createObjectURL(files[0]))
        let formData = new FormData()
        formData.append('file', files[0])
        Promise.all([setMiniLoader(true), dispatch(uploadPhotoApi(formData))]).then(() => {
            toast.success(commonMsg.profilePhoto)
        }).finally(() =>
            setMiniLoader(false)
        )
    }

    return (
        <div className='container'>
            <div className='my-4'>
                <BackButton
                    title='Edit profile'
                    onClick={() => {
                        nevigate('/dashboard/myprofile')
                    }}
                />
                <div>
                    <div className='row'>
                        <div className='col-lg-4 py-5'>
                            <div className='text-center mb-3'>
                                <div className='w-100 position-relative mx-auto border rounded-10 object-fit-cover max-w-200 h-200 d-flex justify-content-center align-items-center'>
                                    {miniLoader ? (
                                        <MiniLoader className={'w-100 h-100'} />
                                    ) : (
                                        <ImgTag
                                            src={
                                                profileImagePreview
                                                    ? profileImagePreview
                                                    : userInfo.userInfo?.profileImageUrl
                                            }
                                            classes='img-fluid w-100 rounded-10 h-100'
                                        />
                                    )}
                                    <div className='camera-icon pointer overflow-hidden'>
                                        <InputTag
                                            type={'file'}
                                            name={'image_path'}
                                            accept={'.png, .jpg, .jpeg, .gif, .pdf'}
                                            classes={
                                                'profile-picture-input pointer position-absolute opacity-0'
                                            }
                                            onChange={e => handleProfileImageChange(e.target.files)}
                                        />
                                        <ImgTag src={CameraIcon} classes='img-fluid pe-none' />
                                    </div>
                                </div>
                                <p className='text-dark-blue fw-bold mt-4 text-capitalize'>
                                    {(userInfo.userInfo.firstName ?? '') + ' ' + (userInfo.userInfo.lastName ?? '')}
                                </p>
                            </div>
                        </div>
                        <div className='col-lg-8 border-orange'>
                            <Tab.Container defaultActiveKey='basicDetails'>
                                <Nav variant='pills' className='mb-3'>
                                    <Nav.Item className='pointer'>
                                        <Nav.Link eventKey='basicDetails'>Basic Details</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item className='pointer'>
                                        <Nav.Link eventKey='addressDetails'>
                                            Address Details
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                                <Tab.Content>
                                    <Tab.Pane eventKey='basicDetails'>
                                        <Formik
                                            enableReinitialize
                                            initialValues={{
                                                firstName: userInfo?.userInfo?.firstName ?? '',
                                                lastName: userInfo?.userInfo?.lastName ?? '',
                                                mobile: userInfo?.userInfo?.countryCode + '' + userInfo?.userInfo?.mobile,
                                                whatsAppno: userInfo?.userInfo?.countryCode + '' + userInfo?.userInfo?.whatsAppNumber ?? '',
                                                email: userInfo?.userInfo?.email ?? '',
                                                sameasabove: false,
                                                language: [],
                                                socialProfiles: userInfo?.userInfo?.socialPlatforms ?? [],
                                                description: userInfo?.userInfo?.description ?? '',
                                                dob: defaultDob ?? '',
                                            }}
                                            validationSchema={Yup.object().shape({
                                                firstName: Yup.string().required('First name field is required'),
                                                lastName: Yup.string().required('Last name field is required'),
                                                mobile: Yup.string().required(
                                                    'This mobile no field is required'
                                                ),
                                                whatsAppno: Yup.string().nullable()
                                                    .required('This whatsapp no field is required')
                                                    .min(10, 'Enter vaild Whatsapp no'),
                                                email: Yup.string()
                                                    .email('Enter valid email')
                                                    .required('This email field is required'),
                                                // password: Yup.string()
                                                //     .required('No password provided.')
                                                //     .min(8, 'Password is too short - should be 8 chars minimum.')
                                                //     .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
                                                language: Yup.array(),
                                                socialProfiles: Yup.array()
                                                    .of(
                                                        Yup.object().shape({
                                                            name: Yup.string(),
                                                            url: Yup.string(),
                                                        })
                                                    )
                                                    .min(1)
                                                    .required('Social Profiles required'),
                                                description: Yup.string().required(
                                                    'This Description field is required'
                                                ),
                                                sameasabove: Yup.boolean(),
                                                dob: Yup.string()
                                                    .nullable()
                                                    .required('Please select date of birth'),
                                            })}
                                            onSubmit={values => {
                                                onSubmitFormBasicDetails(values)
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
                                                <Form
                                                    onSubmit={handleSubmit}
                                                    className='d-flex flex-column justify-content-between h-100'
                                                >
                                                    <div className='row'>
                                                        <div
                                                            className={`col-sm-6 sign-input ${errors.firstName &&
                                                                touched.firstName
                                                                ? ` error-inputs `
                                                                : ``
                                                                } mb-3`}
                                                        >
                                                            <LabelTag
                                                                classes={'text-gray fn-12 mb-2'}
                                                                text={'First Name'}
                                                                For={'firstName'}
                                                            />
                                                            <InputTag
                                                                classes={'form-control'}
                                                                id={'firstName'}
                                                                placeholder={'Enter first name'}
                                                                name={'firstName'}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.firstName}
                                                            />
                                                            {errors.firstName && touched.firstName && (
                                                                <div className='d-flex align-items-center mt-2'>
                                                                    <InputError
                                                                        className='input-error'
                                                                        errorTitle={
                                                                            errors.firstName
                                                                        }
                                                                    />
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div
                                                            className={`col-sm-6 sign-input ${errors.lastName && touched.lastName
                                                                ? ` error-inputs `
                                                                : ``
                                                                } mb-3`}
                                                        >
                                                            <LabelTag
                                                                classes={'text-gray fn-12 mb-2'}
                                                                text={'Last Name'}
                                                                For={'lastName'}
                                                            />
                                                            <InputTag
                                                                classes={'form-control'}
                                                                id={'lastName'}
                                                                placeholder={'Enter last name'}
                                                                name={'lastName'}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                value={values.lastName}
                                                            />
                                                            {errors.lastName && touched.lastName && (
                                                                <div className='d-flex align-items-center mt-2'>
                                                                    <InputError
                                                                        className='input-error'
                                                                        errorTitle={errors.lastName}
                                                                    />
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className='row'>
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
                                                                        classes={
                                                                            'text-dark-gray w-100'
                                                                        }
                                                                        text={'Mobile'}
                                                                    />
                                                                </div>
                                                                <div className='form-control d-flex align-middle plus-number-inputs mb-2'>
                                                                    <PhoneInput
                                                                        defaultCountry='IN'
                                                                        placeholder='Enter phone number'
                                                                        value={values.mobile}
                                                                        onChange={e =>
                                                                            setFieldValue(
                                                                                'mobile',
                                                                                e
                                                                            )
                                                                        }
                                                                        onBlur={e =>
                                                                            values.mobile &&
                                                                                isValidPhoneNumber(
                                                                                    values.mobile
                                                                                )
                                                                                ? ''
                                                                                : toast.error(
                                                                                    commonMsg.mobileNotvalid
                                                                                )
                                                                        }
                                                                    />
                                                                </div>
                                                                {errors.mobile && touched.mobile ? (
                                                                    <InputError
                                                                        className='input-error mt-2'
                                                                        errorTitle={errors.mobile}
                                                                    />
                                                                ) : null}
                                                            </div>
                                                        </div>
                                                        <div className='col-sm-6 col-12'>
                                                            <div
                                                                className={`${errors.whatsAppno &&
                                                                    touched.whatsAppno
                                                                    ? `error-inputs `
                                                                    : ``
                                                                    }mb-3`}
                                                            >
                                                                <div className='d-flex justify-content-between w-100 mb-2'>
                                                                    <LabelTag
                                                                        For={'wnumber'}
                                                                        classes={
                                                                            'text-dark-gray w-100'
                                                                        }
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
                                                                {/* <div className='form-control d-flex align-middle mb-2'> */}
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
                                                                {/* </div> */}
                                                                {values.sameasabove == false
                                                                    ? errors.whatsAppno &&
                                                                    touched.whatsAppno && (
                                                                        <InputError
                                                                            className='input-error mt-2'
                                                                            errorTitle={
                                                                                errors.whatsAppno
                                                                            }
                                                                        />
                                                                    )
                                                                    : ''}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='row'>
                                                        <div className='col-sm-6 col-12 mb-4 sign-input'>
                                                            <div
                                                                className={` ${errors.mobile && touched.mobile
                                                                    ? `error-inputs `
                                                                    : ``
                                                                    }mb-3`}
                                                            >
                                                                <LabelTag
                                                                    For={'email'}
                                                                    classes={'text-dark-gray mb-2'}
                                                                    text={'Email'}
                                                                />
                                                                <InputTag
                                                                    classes={'form-control mb-2'}
                                                                    placeholder={
                                                                        'Enter email address'
                                                                    }
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
                                                                className={`sign-input ${errors.dob && touched.dob
                                                                    ? `error-inputs `
                                                                    : null
                                                                    }mb-3`}
                                                            >
                                                                <LabelTag
                                                                    For={'dob'}
                                                                    classes={'text-dark-gray mb-2'}
                                                                    text={'DOB'}
                                                                />
                                                                <div className='datePicker-input'>
                                                                    <SingleDatePicker
                                                                        maxDate={values.dob}
                                                                        id='dob'
                                                                        inputClass={'px-3 py-2'}
                                                                        className={
                                                                            'w-100 form-control d-flex justify-content-between align-middle py-2'
                                                                        }
                                                                        containerClassName={'w-100 form-control'}
                                                                        value={values.dob ?? new Date()}
                                                                        onChange={val => {
                                                                            setFieldValue(
                                                                                'dob',
                                                                                new Date(val)
                                                                            )
                                                                        }}
                                                                        format={'DD-MM-YYYY'}
                                                                        placeholder={'Select Date of Birth'}
                                                                    />
                                                                </div>
                                                                {errors.dob && touched.dob ? (
                                                                    <InputError
                                                                        className={
                                                                            'input-error mt-2'
                                                                        }
                                                                        errorTitle={errors.dob}
                                                                    />
                                                                ) : null}
                                                            </div>
                                                        </div>
                                                        {/* <div
                                                            className={` col-sm-6 col-12 mb-4 sign-input ${errors.password && touched.password
                                                                ? `error-inputs `
                                                                : ``
                                                                }mb-3`}>
                                                            <LabelTag
                                                                For={'password'}
                                                                classes={'text-dark-gray mb-2'}
                                                                text={'Password'}
                                                            />
                                                            <InputTag

                                                                type={'password'}
                                                                name={'password'}
                                                                id={'password'}
                                                                classes={'form-control'}
                                                                placeholder={'Enter password'}
                                                                value={values.password}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                            />
                                                            {errors.password && touched.password ? (
                                                                <InputError
                                                                    className='input-error mt-2'
                                                                    errorTitle={errors.password}
                                                                />
                                                            ) : null}
                                                        </div> */}
                                                    </div>
                                                    <div className='row mb-4'>
                                                        <div className='col-sm-12 mb-3'>
                                                            <div className='d-flex align-items-center justify-content-between mb-2'>
                                                                <PTag
                                                                    classes={
                                                                        'text-dark-blue fw-bold'
                                                                    }
                                                                    texts={'Languages Known'}
                                                                />
                                                                <ATag
                                                                    className='d-flex align-items-center pointer addmore-box'
                                                                    onClick={e => {
                                                                        e.preventDefault()
                                                                        setShow(true)
                                                                    }}
                                                                >
                                                                    <FiPlus
                                                                        fontSize={20}
                                                                        className={'Fi-Plus'}
                                                                    />
                                                                    <PTag
                                                                        classes={
                                                                            'text-navy-blue ms-1'
                                                                        }
                                                                        texts={'Add'}
                                                                    />
                                                                </ATag>
                                                            </div>
                                                            <div className='d-flex flex-wrap'>
                                                                {languages.map((data, i) => {
                                                                    return (
                                                                        <div
                                                                            className='btn-dark-blue me-2 mb-2 rounded px-3 py-1'
                                                                            key={i}
                                                                        >
                                                                            <div
                                                                                className={
                                                                                    'd-flex w-100 justify-content-between align-items-center'
                                                                                }
                                                                            >
                                                                                <PTag
                                                                                    classes={
                                                                                        'bold me-1 text-capitalize'
                                                                                    }
                                                                                    texts={data}
                                                                                />
                                                                                <span
                                                                                    onClick={e => {
                                                                                        const aa =
                                                                                            languages.indexOf(
                                                                                                data
                                                                                            )
                                                                                        languages.splice(
                                                                                            aa,
                                                                                            1
                                                                                        )
                                                                                        setLanguages(
                                                                                            data => [
                                                                                                ...data,
                                                                                            ]
                                                                                        )
                                                                                    }}
                                                                                    role='button'
                                                                                >
                                                                                    {' '}
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
                                                                })}
                                                            </div>
                                                            {languages.length === 0 ? (
                                                                <InputError
                                                                    className='input-error mt-2'
                                                                    errorTitle={
                                                                        'Languages Known field must have at least 1 items'
                                                                    }
                                                                />
                                                            ) : null}
                                                        </div>
                                                        <div className='col-sm-12'>
                                                            <FieldArray
                                                                name='socialProfiles'
                                                                render={arrayHelpers => {
                                                                    const socialprofileArray =
                                                                        values.socialProfiles
                                                                    return (
                                                                        <>
                                                                            <div className='row'>
                                                                                <div className='col-lg-3 col-12'>
                                                                                    <div className='mb-2'>
                                                                                        <LabelTag
                                                                                            classes={
                                                                                                'text-gray fn-12 bold mb-2'
                                                                                            }
                                                                                            text={
                                                                                                'Other Platforms'
                                                                                            }
                                                                                        />
                                                                                        {isSelectDefault ===
                                                                                            false ? (
                                                                                            <Select
                                                                                                name='socialSeletct'
                                                                                                className='form-control p-0'
                                                                                                options={
                                                                                                    dummyPlatFormArray
                                                                                                }
                                                                                                getOptionValue={dummyPlatFormArray =>
                                                                                                    dummyPlatFormArray.value
                                                                                                }
                                                                                                value={socialSeletct ? { label: socialSeletct } : null}
                                                                                                onChange={e => {
                                                                                                    setSocialSeletct(e?.label)
                                                                                                }}
                                                                                            />
                                                                                        ) : (
                                                                                            <InputTag
                                                                                                type={
                                                                                                    'text'
                                                                                                }
                                                                                                classes={
                                                                                                    'form-control mb-2'
                                                                                                }
                                                                                                placeholder={
                                                                                                    'Enter Your GST Number'
                                                                                                }
                                                                                                id={
                                                                                                    'gdt'
                                                                                                }
                                                                                                value={
                                                                                                    socialSeletct
                                                                                                }
                                                                                                disabled
                                                                                            />
                                                                                        )}
                                                                                    </div>
                                                                                </div>
                                                                                <div className='col-lg-9 col-12 d-flex align-items-center justify-content-between flex-wrap flex-lg-nowrap'>
                                                                                    <div className='mb-2 w-100'>
                                                                                        <LabelTag
                                                                                            classes={
                                                                                                'text-gray fn-12 bold mb-2'
                                                                                            }
                                                                                            text={
                                                                                                'Other Platforms'
                                                                                            }
                                                                                            For={
                                                                                                'url'
                                                                                            }
                                                                                        />
                                                                                        <InputTag
                                                                                            type={
                                                                                                'text'
                                                                                            }
                                                                                            classes={
                                                                                                'form-control mb-2 '
                                                                                            }
                                                                                            placeholder={
                                                                                                'Enter URL'
                                                                                            }
                                                                                            id={
                                                                                                'url'
                                                                                            }
                                                                                            value={
                                                                                                socialUrl
                                                                                            }
                                                                                            onChange={event => {
                                                                                                setSocialUrl(
                                                                                                    event
                                                                                                        .target
                                                                                                        .value
                                                                                                )
                                                                                            }}
                                                                                        />
                                                                                        {errors.socialProfiles &&
                                                                                            touched.socialProfiles ? (
                                                                                            <InputError
                                                                                                className='input-error'
                                                                                                errorTitle={
                                                                                                    errors.socialProfiles
                                                                                                }
                                                                                            />
                                                                                        ) : null}
                                                                                    </div>
                                                                                    <div className='text-center mt-2 ms-3'>
                                                                                        <ATag
                                                                                            classes={`btn btn-dark-blue rounded fn-18 ${errors.socialProfiles &&
                                                                                                touched.socialProfiles
                                                                                                ? `mb-3`
                                                                                                : null
                                                                                                }`}
                                                                                            children={
                                                                                                isSelectAdd ===
                                                                                                    false
                                                                                                    ? 'Add'
                                                                                                    : 'Update'
                                                                                            }
                                                                                            onClick={e => {
                                                                                                e.preventDefault()
                                                                                                setSocialSeletct('')
                                                                                                addSocialDetail(arrayHelpers)
                                                                                            }}
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className='row'>
                                                                                <div className='mt-3'>
                                                                                    {socialprofileArray.map(
                                                                                        (
                                                                                            data,
                                                                                            index
                                                                                        ) => (
                                                                                            <div
                                                                                                key={
                                                                                                    index
                                                                                                }
                                                                                                className='d-flex justify-content-between mb-2'
                                                                                            >
                                                                                                <PTag
                                                                                                    classes={
                                                                                                        'text-dark-blue bold'
                                                                                                    }
                                                                                                    texts={
                                                                                                        data.name
                                                                                                    }
                                                                                                />
                                                                                                <div className='d-flex align-items-center mb-2'>
                                                                                                    <ATag
                                                                                                        children={
                                                                                                            <Edit
                                                                                                                width={
                                                                                                                    '24'
                                                                                                                }
                                                                                                                className={
                                                                                                                    'me-4 pointer'
                                                                                                                }
                                                                                                                onClick={() => {
                                                                                                                    setSocialSeletct(
                                                                                                                        socialprofileArray[
                                                                                                                            index
                                                                                                                        ]
                                                                                                                            .name
                                                                                                                    )
                                                                                                                    setSocialIndex(
                                                                                                                        index
                                                                                                                    )
                                                                                                                    setSocialUrl(
                                                                                                                        socialprofileArray[
                                                                                                                            index
                                                                                                                        ]
                                                                                                                            .url
                                                                                                                    )
                                                                                                                    setIsSelectDefault(
                                                                                                                        true
                                                                                                                    )
                                                                                                                    setIsSelectAdd(
                                                                                                                        true
                                                                                                                    )
                                                                                                                }}
                                                                                                            />
                                                                                                        }
                                                                                                    />
                                                                                                    <ATag
                                                                                                        children={
                                                                                                            <MdDelete
                                                                                                                className={
                                                                                                                    'Md-Delete'
                                                                                                                }
                                                                                                                onClick={() =>
                                                                                                                    DeleteSocialProfileAlert(
                                                                                                                        index,
                                                                                                                        arrayHelpers
                                                                                                                    )
                                                                                                                }
                                                                                                            />
                                                                                                        }
                                                                                                    />
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
                                                    </div>
                                                    <div className='row'>
                                                        <div
                                                            className={` col-12 mb-4 sign-input ${errors.description &&
                                                                touched.description
                                                                ? `error-inputs`
                                                                : null
                                                                } mb-3`}
                                                        >
                                                            <LabelTag
                                                                For={'description'}
                                                                classes={'text-dark-gray mb-2'}
                                                                text={'Description'}
                                                            />
                                                            <MultiLineInputTag
                                                                name={'description'}
                                                                id={'description'}
                                                                classes={'form-control'}
                                                                value={values.description}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                            />
                                                            {errors.description &&
                                                                touched.description ? (
                                                                <InputError
                                                                    className='input-error mt-2'
                                                                    errorTitle={errors.description}
                                                                />
                                                            ) : null}
                                                        </div>
                                                    </div>
                                                    <div className='d-flex justify-content-center'>
                                                        <ButtonTag
                                                            classes={'btn-extra-lite-green px-4'}
                                                            value={'Save'}
                                                            type={'submit'}
                                                        />
                                                    </div>
                                                </Form>
                                            )}
                                        </Formik>
                                        {languagePopUp(languages)}
                                    </Tab.Pane>
                                    <Tab.Pane eventKey='addressDetails'>
                                        <Formik
                                            enableReinitialize
                                            initialValues={{
                                                countryId: '',
                                                country: defaultAddress?.country?.label ? defaultAddress?.country ?? '' : '',
                                                pincode: userInfo.userInfo?.address?.pincode ?? '',
                                                state: defaultAddress?.state?.label ? defaultAddress?.state ?? '' : '',
                                                city: defaultAddress?.city?.label ? defaultAddress?.city ?? '' : '',
                                                address: userInfo.userInfo?.address?.address1 ?? '',
                                            }}
                                            validationSchema={Yup.object().shape({
                                                country: Yup.object().required('Select country'),
                                                pincode: Yup.string().required('Enter pincode'),
                                                state: Yup.object().required('Enter state'),
                                                city: Yup.object().required('Enter city'),
                                                address: Yup.string().required('Enter address'),
                                            })}
                                            onSubmit={values => {
                                                onSubmitFormAddressDetail(values)
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
                                                <Form
                                                    onSubmit={handleSubmit}
                                                    className='d-flex flex-column justify-content-between h-100'
                                                >
                                                    <div className='row'>
                                                        <div className='col-sm-6 col-12'>
                                                            <div className='sign-inputs'>
                                                                <PTag
                                                                    texts={'Country'}
                                                                    classes={`mb-2`}
                                                                />
                                                                <label
                                                                    className={`sign-input ${errors.country &&
                                                                        touched.country
                                                                        ? `error-inputs`
                                                                        : null
                                                                        } w-100`}
                                                                >
                                                                    <Select
                                                                        className='form-control p-0'
                                                                        options={countryArray}
                                                                        getOptionValue={countryArray =>
                                                                            countryArray.countryId
                                                                        }
                                                                        defaultValue={
                                                                            defaultAddress?.country
                                                                        }
                                                                        value={
                                                                            countryArray.length >
                                                                            0 &&
                                                                            countryArray.find(
                                                                                op => {
                                                                                    return (
                                                                                        op.label ===
                                                                                        values
                                                                                            .country
                                                                                            .label
                                                                                    )
                                                                                }
                                                                            )
                                                                        }
                                                                        name='countryList'
                                                                        onChange={e => {
                                                                            setFieldValue(
                                                                                'country',
                                                                                e
                                                                            )
                                                                            setFieldValue(
                                                                                'countryId',
                                                                                e.countryId
                                                                            )
                                                                            dispatch(
                                                                                stateApi(
                                                                                    e.countryId
                                                                                )
                                                                            )
                                                                        }}
                                                                    />
                                                                    {errors.country &&
                                                                        touched.country ? (
                                                                        <InputError
                                                                            className='input-error mt-2'
                                                                            errorTitle={
                                                                                errors.country
                                                                            }
                                                                        />
                                                                    ) : null}
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div className='col-sm-6 col-12'>
                                                            <div className='sign-inputs'>
                                                                <PTag
                                                                    texts={'State'}
                                                                    classes={`mb-2`}
                                                                />
                                                                <label
                                                                    className={`sign-input ${errors.state &&
                                                                        touched.state
                                                                        ? `error-inputs`
                                                                        : null
                                                                        } w-100`}
                                                                >
                                                                    <Select
                                                                        className={
                                                                            'form-control p-0'
                                                                        }
                                                                        options={stateArray}
                                                                        getOptionValue={stateArray =>
                                                                            stateArray.name
                                                                        }
                                                                        value={
                                                                            stateArray.length > 0 &&
                                                                            stateArray.find(op => {
                                                                                return (
                                                                                    op.label ===
                                                                                    values.state
                                                                                        .label
                                                                                )
                                                                            })
                                                                        }
                                                                        onChange={e => {
                                                                            setFieldValue(
                                                                                'state',
                                                                                e
                                                                            )
                                                                            dispatch(
                                                                                cityApi(e.stateId)
                                                                            )
                                                                        }}
                                                                    />
                                                                    {errors.state &&
                                                                        touched.state ? (
                                                                        <InputError
                                                                            className='input-error mt-2'
                                                                            errorTitle={
                                                                                errors.state
                                                                            }
                                                                        />
                                                                    ) : null}
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='row'>
                                                        <div className='col-sm-6 col-12'>
                                                            <div className='sign-inputs'>
                                                                <PTag
                                                                    texts={'Pincode'}
                                                                    classes={`mb-2`}
                                                                />
                                                                <label
                                                                    className={`sign-input ${errors.pincode &&
                                                                        touched.pincode
                                                                        ? `error-inputs`
                                                                        : null
                                                                        } w-100`}
                                                                >
                                                                    <InputTag
                                                                        type={'number'}
                                                                        name='pincode'
                                                                        classes={`form-control`}
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        value={values.pincode}
                                                                    />
                                                                    {errors.pincode &&
                                                                        touched.pincode ? (
                                                                        <InputError
                                                                            className='input-error mt-2'
                                                                            errorTitle={
                                                                                errors.pincode
                                                                            }
                                                                        />
                                                                    ) : null}
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div className='col-sm-6 col-12'>
                                                            <div className='sign-inputs'>
                                                                <PTag
                                                                    texts={'City'}
                                                                    classes={`mb-2`}
                                                                />
                                                                <label
                                                                    className={`sign-input ${errors.city && touched.city
                                                                        ? `error-inputs`
                                                                        : null
                                                                        } w-100`}
                                                                >
                                                                    <Select
                                                                        className={
                                                                            'form-control p-0'
                                                                        }
                                                                        options={cityArray}
                                                                        getOptionValue={cityArray =>
                                                                            cityArray.name
                                                                        }
                                                                        value={
                                                                            cityArray.length > 0 &&
                                                                            cityArray.find(op => {
                                                                                return (
                                                                                    op.label ===
                                                                                    values.city
                                                                                        .label
                                                                                )
                                                                            })
                                                                        }
                                                                        onChange={e => {
                                                                            setFieldValue('city', e)
                                                                        }}
                                                                    />
                                                                    {errors.city && touched.city ? (
                                                                        <InputError
                                                                            className='input-error mt-2'
                                                                            errorTitle={errors.city}
                                                                        />
                                                                    ) : null}
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='sign-inputs'>
                                                        <PTag texts={'Address'} classes={`mb-2`} />
                                                        <label
                                                            className={`sign-input ${errors.address && touched.address
                                                                ? `error-inputs`
                                                                : null
                                                                } w-100`}
                                                        >
                                                            <MultiLineInputTag
                                                                classes={`mb-3`}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                name='address'
                                                                value={values.address}
                                                            />
                                                            {errors.address && touched.address ? (
                                                                <InputError
                                                                    className='input-error mt-2'
                                                                    errorTitle={errors.address}
                                                                />
                                                            ) : null}
                                                        </label>
                                                    </div>
                                                    <div className='w-100 d-flex align-items-center justify-content-center mb-5 mt-3'>
                                                        <ButtonTag
                                                            classes={'btn-extra-lite-green px-4'}
                                                            value={'Save'}
                                                            type={'submit'}
                                                        />
                                                    </div>
                                                </Form>
                                            )}
                                        </Formik>
                                        {/* <div>
                                                <Row>
                                                    <Col sm={6} xs={12} className={'mb-4 sign-input'}>
                                                        <LabelTag
                                                            For={'country'}
                                                            classes={'text-dark-gray mb-2'}
                                                            text={'Country'}
                                                        />
                                                        <InputTag
                                                            type={'text'}
                                                            name={'country'}
                                                            id={'country'}
                                                            classes={'form-control'}
                                                            placeholder={'Enter country'}
                                                            required
                                                        />
                                                        <InputError
                                                            className='input-error mt-2'
                                                            errorTitle={'Please enter a valid country'}
                                                        />
                                                    </Col>
                                                    <Col sm={6} xs={12} className={'mb-4 sign-input'}>
                                                        <LabelTag
                                                            For={'state'}
                                                            classes={'text-dark-gray mb-2'}
                                                            text={'state'}
                                                        />
                                                        <InputTag
                                                            type={'text'}
                                                            name={'state'}
                                                            id={'state'}
                                                            classes={'form-control'}
                                                            placeholder={'Enter state'}
                                                            required
                                                        />
                                                        <InputError
                                                            className='input-error mt-2'
                                                            errorTitle={'Please enter a valid state'}
                                                        />
                                                    </Col>
                                                    <Col sm={6} xs={12} className={'mb-4 sign-input'}>
                                                        <LabelTag
                                                            For={'city'}
                                                            classes={'text-dark-gray mb-2'}
                                                            text={'city'}
                                                        />
                                                        <InputTag
                                                            type={'text'}
                                                            name={'city'}
                                                            id={'city'}
                                                            classes={'form-control'}
                                                            placeholder={'Enter city'}
                                                            required
                                                        />
                                                        <InputError
                                                            className='input-error mt-2'
                                                            errorTitle={'Please enter a valid city'}
                                                        />
                                                    </Col>
                                                    <Col sm={6} xs={12} className={'mb-4 sign-input'}>
                                                        <LabelTag
                                                            For={'pincode'}
                                                            classes={'text-dark-gray mb-2'}
                                                            text={'pincode'}
                                                        />
                                                        <InputTag
                                                            type={'text'}
                                                            name={'pincode'}
                                                            id={'pincode'}
                                                            classes={'form-control'}
                                                            placeholder={'Enter pincode'}
                                                            required
                                                        />
                                                        <InputError
                                                            className='input-error mt-2'
                                                            errorTitle={'Please enter a valid pincode'}
                                                        />
                                                    </Col>
                                                    <Col xs={12} className={'mb-4 sign-input'}>
                                                        <LabelTag
                                                            For={'address'}
                                                            classes={'text-dark-gray mb-2'}
                                                            text={'address'}
                                                        />
                                                        <MultiLineInputTag
                                                            name={'address'}
                                                            id={'address'}
                                                            classes={'form-control'}
                                                            placeholder={'Enter address'}
                                                            required
                                                        />
                                                        <InputError
                                                            className='input-error mt-2'
                                                            errorTitle={'Please enter a valid Address'}
                                                        />
                                                    </Col>
                                                    <Col xs={12}>
                                                        <div className='text-center py-4'>
                                                            <ButtonTag
                                                                classes={'btn-extra-lite-green px-4'}
                                                                value={'Save'}
                                                            />
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div> */}
                                    </Tab.Pane>
                                </Tab.Content>
                            </Tab.Container>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IsLoadingHOC(MyProfileDetails)
