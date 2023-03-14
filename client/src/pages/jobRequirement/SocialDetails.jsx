import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, Form, FieldArray } from 'formik'
import Select from 'react-select'
import Swal from 'sweetalert2'
import * as Yup from 'yup'
import InputError from '../../components/common/InputError'
import { FaceBookIcon, Edit, Dash } from '../../components/AllSvgs'
import {
    BackButton,
    H5Tag,
    InputTag,
    LabelTag,
    PTag,
    ButtonTag,
    ATag,
    ImgTag,
} from '../../components/designComponents/MicroComponents'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import {
    uploadGstApi,
    uploadPanCardApi,
    uploadPhotoApi,
    setSocialDetail,
    putSocialdetail,
} from '../../store/socialdetail/slice'
import ProfileImg from '../../assets/img/profile/profile.png'
//icons
import { FiCamera, FiUploadCloud } from 'react-icons/fi'
import { MdDelete, MdClose } from 'react-icons/md'
import { RiInstagramFill } from 'react-icons/ri'
import { FaLinkedinIn } from 'react-icons/fa'
import { IoLogoFacebook } from 'react-icons/io'

import { URL_REGEX } from '../../utils/constants'
import IsLoadingHOC from '../../components/higherOrderLoader/IsLoadingHOC'
import { commonMsg } from '../../components/common/ValidationConstants'
import { languageApi } from '../../store/masterdata/slice'
import { getUserInfo } from '../../store/auth/slice'

const SocialDetails = ({ setLoading }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [panCard, setPanCard] = useState(null)
    const [gstNo, setGSTNo] = useState(null)
    const [languageArray, setLanguageArray] = useState([])
    const [isSelectDefault, setIsSelectDefault] = useState(false)
    const [isSelectAdd, setIsSelectAdd] = useState(false)
    const [socialSeletct, setSocialSeletct] = useState('')
    const [socialUrl, setSocialUrl] = useState('')
    const [socialIndex, setSocialIndex] = useState(-1)
    const [profileImagePreview, setProfileImagePreview] = useState(null)

    const socialDetailApi = useSelector(store => store.sdetail)
    const masterdataProfile = useSelector(store => store.masterdata)

    useEffect(() => {
        Promise.all([dispatch(languageApi())]).finally(() => {
            setLoading(false)
        })
    }, [])


    useEffect(() => {
        if (socialDetailApi.status === 'failed') {
        } else if (socialDetailApi.status === 'succeed') {
            if (socialDetailApi.type === 'LANGUAGE_API') {
                if (socialDetailApi.languages.length > 0) {
                    let data = socialDetailApi.languages.map((x, index) => ({
                        ...x,
                        label: x.language,
                    }))
                    setLanguageArray(data)
                }
                dispatch(setSocialDetail())
            } else if (socialDetailApi.type === 'UPLOAD_PHOTO_API') {
                toast.success(commonMsg.profilePhoto)
                dispatch(setSocialDetail())
            } else if (socialDetailApi.type === 'UPLOAD_PANCARD_API') {
                toast.success(commonMsg.panCard)
                dispatch(setSocialDetail())
            } else if (socialDetailApi.type === 'UPLOAD_GST_API') {
                toast.success(commonMsg.GST)
                dispatch(setSocialDetail())
            } else if (socialDetailApi.type === 'SOCICAL_DETAIL_API') {
                toast.success(commonMsg.socialDetail)
                dispatch(setSocialDetail())
                navigate('/dashboard')
            }
        } else {
        }
    }, [socialDetailApi])

    useEffect(() => {
        if (masterdataProfile.status === 'failed') {
        } else if (masterdataProfile.status === 'succeed') {
            if (masterdataProfile.type === 'LANGUAGE_API') {
                if (masterdataProfile.languages.length > 0) {
                    let data = masterdataProfile.languages.map((x, index) => ({
                        ...x,
                        label: x.language,
                    }))
                    setLanguageArray(data)
                }
                dispatch(setSocialDetail())
            }
        } else {
        }
    }, [masterdataProfile])

    const resetData = () => {
        setSocialSeletct('')
        setSocialIndex(-1)
        setSocialUrl('')
        setIsSelectDefault(false)
        setIsSelectAdd(false)
    }

    const selectData = (e, arrayHelpers) => {
        if (e !== null) {
            const tag = e.label
            let arrayLanguages = Object.values(arrayHelpers.form.values.languages).filter(
                element => element.name === tag
            )
            if (arrayLanguages.length == 0) {
                arrayHelpers.push({
                    id: e.launguesId,
                    name: tag,
                })
            }
        }
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
                        name: socialSeletct,
                        url: socialUrl,
                    })
                    setSocialSeletct('')
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
                    name: socialSeletct,
                    url: socialUrl,
                })
                resetData()
            } else {
                toast.error(commonMsg.socialDetailURL)
            }
        }
    }

    const dummyPlatFormArray = [
        {
            value: 'facebook',
            label: 'FaceBook',
            url: 'https://www.FaceBook.com/',
        },
        {
            value: 'instagrap',
            label: 'Instagram',
            url: 'https://Instagram.com/',
        },
        {
            value: 'twitter',
            label: 'Twitter',
            url: 'https://twitter.com/',
        },
    ]

    const handlePanCardChange = (files, setFieldValue) => {
        setFieldValue('pan_card', files[0])
        setPanCard(files[0].name)
        let formData = new FormData()
        formData.append('file', files[0])
        dispatch(uploadPanCardApi(formData))
    }

    const handleGSTDocChange = (files, setFieldValue) => {
        setFieldValue('gst_no', files[0])
        setGSTNo(files[0].name)
        let formData = new FormData()
        formData.append('file', files[0])
        dispatch(uploadGstApi(formData))
    }

    const DeleteSocialProfileAlert = (index, arrayHelpers) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `You won't be able to delete this!`,
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

    const handleProfileImageChange = (files, setFieldValue) => {
        setFieldValue('image_path', files[0])
        setProfileImagePreview(URL.createObjectURL(files[0]))
        let formData = new FormData()
        formData.append('file', files[0])
        Promise.all([dispatch(uploadPhotoApi(formData))]).then(res => dispatch(getUserInfo()))
    }

    const FILE_SIZE = 160 * 1024

    const onSubmitForm = values => {
        const language = []
        values.languages.map((items, index) => {
            language.push(items.name)
        })
        let params = {
            ['languagesKnown']: language,
            ['panCardNumber']: values.pan_card_input,
            ['gstNumber']: values.gst_no_input,
            ['platforms']: values.socialProfiles,
        }
        dispatch(putSocialdetail(params))
    }

    return (
        <>
            <div className='max-w-625 mx-auto px-sm-0 px-3'>
                <H5Tag classes={'text-dark-blue fw-bold fn-16 mb-3'} title={'Social Details'} />
                <div>
                    <Formik
                        initialValues={{
                            image_path: undefined,
                            pan_card_input: '',
                            pan_card: undefined,
                            gst_no_input: '',
                            gst_no: undefined,
                            languages: [],
                            socialProfiles: [],
                            platform: '',
                            url: '',
                        }}
                        validationSchema={Yup.object().shape({
                            image_path: Yup.mixed()
                                .required('A file is required')
                                .test(
                                    'fileSize',
                                    'File too large',
                                    value => value && value.size <= FILE_SIZE
                                ),
                            pan_card_input: Yup.string()
                                .required('Pan Number is required')
                                .test('regex', 'Invalide Pan Number', val => {
                                    let regExp = new RegExp('[A-Z]{5}[0-9]{4}[A-Z]{1}')
                                    return regExp.test(val)
                                }),
                            pan_card: Yup.mixed().required('Pan Document is required'),
                            gst_no_input: Yup.string()
                                .required('GST Number is required')
                                .test('regex', 'Invalide GST Number', val => {
                                    let regExp = new RegExp(
                                        '^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$'
                                    )
                                    return regExp.test(val)
                                }),
                            gst_no: Yup.mixed().required('GST Certificate is required'),
                            languages: Yup.array()
                                .of(
                                    Yup.object().shape({
                                        id: Yup.string(),
                                        category: Yup.string(),
                                    })
                                )
                                .min(1, 'Languages Known field must have at least 1 items')
                                .required('category required'),
                            socialProfiles: Yup.array()
                                .of(
                                    Yup.object().shape({
                                        id: Yup.string(),
                                        label: Yup.string(),
                                        url: Yup.string(),
                                    })
                                )
                                .min(1)
                                .required('Social Profiles required'),
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
                                    <LabelTag
                                        classes={'text-gray fn-14 mb-2'}
                                        text={'Profile Picture'}
                                    />
                                    <div className='profile-picture-box d-flex flex-column overflow-visible position-relative'>
                                        <ImgTag
                                            src={profileImagePreview ?? ProfileImg}
                                            classes='img-fluid rounded-10 border'
                                        />
                                        <div className='camera-icon pointer mb-1'>
                                            <InputTag
                                                className={'uplode-input pointer h-100'}
                                                type={'file'}
                                                accept='.png, .jpg, .jpeg, .gif, .pdf'
                                                name={'profile'}
                                                onChange={event => {
                                                    values.isProfilePhotoAval = true
                                                    handleProfileImageChange(
                                                        event.target.files,
                                                        setFieldValue
                                                    )
                                                }}
                                            />
                                            <FiCamera className={'Fi-Camera'} />
                                        </div>
                                    </div>
                                    {errors.image_path && touched.image_path && (
                                        <InputError
                                            className='input-error mt-2'
                                            errorTitle={errors.image_path}
                                        />
                                    )}
                                    <div className='row my-4'>
                                        <div className='col-sm-6 col-12'>
                                            <div
                                                className={`sign-input ${errors.pan_card_input && touched.pan_card_input
                                                    ? ` error-inputs `
                                                    : ``
                                                    }mb-3`}
                                            >
                                                <LabelTag
                                                    classes={'text-gray fn-12 mb-2'}
                                                    text={'Pan Card No.'}
                                                    For={'panCard'}
                                                />
                                                <InputTag
                                                    type={'text'}
                                                    classes={'form-control'}
                                                    placeholder={'Enter Your Pan Card Number'}
                                                    id={'panCard'}
                                                    value={values.pan_card_input}
                                                    name={'pan_card_input'}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                                {errors.pan_card_input &&
                                                    touched.pan_card_input && (
                                                        <InputError
                                                            className='input-error mt-2'
                                                            errorTitle={errors.pan_card_input}
                                                        />
                                                    )}
                                            </div>
                                            <PTag
                                                texts={panCard}
                                                classes={'text-truncate fst-italic mb-1'}
                                            />

                                            <LabelTag
                                                classes={`upload-label mb-2`}
                                                text={
                                                    <>
                                                        <InputTag
                                                            type={'file'}
                                                            classes={'upload-input pointer'}
                                                            name={'pan_card'}
                                                            accept='.png, .jpg, .jpeg, .pdf'
                                                            onChange={event => {
                                                                handlePanCardChange(
                                                                    event.target.files,
                                                                    setFieldValue
                                                                )
                                                            }}
                                                        />
                                                        <FiUploadCloud fontSize={25} />
                                                        <PTag
                                                            classes={'ms-1'}
                                                            texts={
                                                                panCard == null
                                                                    ? 'Upload Pan Card'
                                                                    : errors.pan_card &&
                                                                        touched.pan_card
                                                                        ? 'Upload Pan Card'
                                                                        : errors.pan_card &&
                                                                            touched.pan_card
                                                                            ? 'Upload Pan Card'
                                                                            : 'Pan card successfully uploaded'
                                                            }
                                                        />
                                                    </>
                                                }
                                            />
                                            {errors.pan_card && touched.pan_card ? (
                                                <InputError
                                                    className='input-error mt-2'
                                                    errorTitle={errors.pan_card}
                                                />
                                            ) : (
                                                ''
                                            )}
                                        </div>
                                        <div className='col-sm-6 col-12'>
                                            <div
                                                className={`sign-input ${errors.gst_no_input && touched.gst_no_input
                                                    ? ` error-inputs `
                                                    : ``
                                                    }mb-3 `}
                                            >
                                                <LabelTag
                                                    classes={'text-gray fn-12 mb-2'}
                                                    text={'GST No.'}
                                                    For={'gdt'}
                                                />
                                                <InputTag
                                                    type={'text'}
                                                    classes={'form-control'}
                                                    placeholder={'Enter Your GST Number'}
                                                    id={'gdt'}
                                                    value={values.gst_no_input}
                                                    name={'gst_no_input'}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                                {errors.gst_no_input && touched.gst_no_input && (
                                                    <InputError
                                                        className='input-error mt-2'
                                                        errorTitle={errors.gst_no_input}
                                                    />
                                                )}
                                            </div>
                                            <PTag
                                                texts={gstNo}
                                                classes={'text-truncate fst-italic mb-1'}
                                            />
                                            <LabelTag
                                                classes={'upload-label align-items-start mb-2'}
                                                text={
                                                    <>
                                                        <InputTag
                                                            type={'file'}
                                                            classes={'upload-input pointer'}
                                                            name={'gst_no'}
                                                            accept='.png, .jpg, .jpeg, .pdf'
                                                            onChange={event => {
                                                                handleGSTDocChange(
                                                                    event.target.files,
                                                                    setFieldValue
                                                                )
                                                            }}
                                                        />
                                                        <FiUploadCloud fontSize={25} />
                                                        <PTag
                                                            classes={'ms-1'}
                                                            texts={
                                                                gstNo === null
                                                                    ? 'Upload GST Certificate'
                                                                    : errors.gst_no &&
                                                                        touched.gst_no
                                                                        ? 'Upload GST Certificate'
                                                                        : 'GST certificate successfully uploaded'
                                                            }
                                                        />
                                                    </>
                                                }
                                            />
                                            {errors.gst_no && touched.gst_no && (
                                                <InputError
                                                    className='input-error'
                                                    errorTitle={errors.gst_no}
                                                />
                                            )}
                                        </div>
                                        <div className='col-12'>
                                            <FieldArray
                                                name='languages'
                                                render={arrayHelpers => {
                                                    const languag = values.languages
                                                    return (
                                                        <>
                                                            <div
                                                                className={`sign-input ${errors.languages &&
                                                                    touched.languages
                                                                    ? ` error-inputs `
                                                                    : ``
                                                                    }mb-3`}
                                                            >
                                                                <LabelTag
                                                                    classes={
                                                                        'text-gray fn-12 bold mb-2'
                                                                    }
                                                                    text={'Languages Known'}
                                                                    For={'languagesKnown'}
                                                                />
                                                                <Select
                                                                    placeholder='Please Select Language'
                                                                    className={'form-control p-0'}
                                                                    options={languageArray}
                                                                    getOptionValue={languageArray =>
                                                                        languageArray.name
                                                                    }
                                                                    // onBlur={handleBlur('languages')}
                                                                    value={null}
                                                                    classNamePrefix='Select Language'
                                                                    onChange={e => {
                                                                        selectData(e, arrayHelpers)
                                                                    }}
                                                                />
                                                                {errors.languages &&
                                                                    touched.languages ? (
                                                                    <InputError
                                                                        className='input-error mt-2'
                                                                        errorTitle={
                                                                            errors.languages
                                                                        }
                                                                    />
                                                                ) : null}
                                                            </div>
                                                            <div className='d-flex flex-wrap gap-2 my-2'>
                                                                {languag.map((element, index) => (
                                                                    <ButtonTag
                                                                        key={index}
                                                                        classes={
                                                                            'btn-dark-blue rounded d-flex'
                                                                        }
                                                                        value={
                                                                            <>
                                                                                <PTag
                                                                                    classes={
                                                                                        'bold me-1'
                                                                                    }
                                                                                    texts={
                                                                                        element.name
                                                                                    }
                                                                                />
                                                                                <ATag
                                                                                    children={
                                                                                        <MdClose
                                                                                            fontSize={
                                                                                                20
                                                                                            }
                                                                                            className={
                                                                                                'Md-Close'
                                                                                            }
                                                                                        />
                                                                                    }
                                                                                    onClick={e => {
                                                                                        e.preventDefault()
                                                                                        arrayHelpers.remove(
                                                                                            index
                                                                                        )
                                                                                    }}
                                                                                />
                                                                            </>
                                                                        }
                                                                    />
                                                                ))}
                                                            </div>
                                                        </>
                                                    )
                                                }}
                                            />
                                        </div>
                                        <div className='col-12'>
                                            <PTag
                                                classes={'text-dark-blue fn-14 bold mb-2 mb-3'}
                                                texts={'Connect Your Social Profile'}
                                            />
                                            <div className='d-flex mb-3'>
                                                <ATag
                                                    classes='social-bg-icon me-3 '
                                                    role='button'
                                                    children={
                                                        <div className='social-icon'>
                                                            <IoLogoFacebook
                                                                fontSize={30}
                                                                fill='#fff'
                                                            />
                                                        </div>
                                                    }
                                                    onClick={() => {
                                                        setSocialSeletct('Facebook')
                                                        setIsSelectDefault(true)
                                                        setIsSelectAdd(false)
                                                    }}
                                                />
                                                <ATag
                                                    role='button'
                                                    classes='social-bg-icon mx-3'
                                                    children={
                                                        <div className='social-icon'>
                                                            <FaLinkedinIn
                                                                className={'Fa-LinkedinIn'}
                                                            />
                                                        </div>
                                                    }
                                                    onClick={() => {
                                                        setSocialSeletct('Linkedin')
                                                        setIsSelectDefault(true)
                                                        setIsSelectAdd(false)
                                                    }}
                                                />
                                                <ATag
                                                    role='button'
                                                    classes='social-bg-icon mx-3'
                                                    children={
                                                        <div className='social-icon'>
                                                            <RiInstagramFill
                                                                className={'Ri-Instagram-Fill'}
                                                            />
                                                        </div>
                                                    }
                                                    onClick={() => {
                                                        setSocialSeletct('Instagram')
                                                        setIsSelectDefault(true)
                                                        setIsSelectAdd(false)
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <FieldArray
                                            name='socialProfiles'
                                            render={arrayHelpers => {
                                                const socialprofileArray = values.socialProfiles
                                                return (
                                                    <>
                                                        <div className='row'>
                                                            <div className='col-lg-3 col-12'>
                                                                <div className='mb-2 couponselect'>
                                                                    <LabelTag
                                                                        classes={
                                                                            'text-gray fn-12 bold mb-2'
                                                                        }
                                                                        text={'Other Platforms'}
                                                                    />
                                                                    {isSelectDefault === false ? (
                                                                        <Select
                                                                            className='form-control p-0'
                                                                            options={
                                                                                dummyPlatFormArray
                                                                            }
                                                                            getOptionValue={dummyPlatFormArray =>
                                                                                dummyPlatFormArray.value
                                                                            }
                                                                            onChange={e => {
                                                                                setSocialSeletct(
                                                                                    e?.label
                                                                                )
                                                                            }}
                                                                        />
                                                                    ) : (
                                                                        <InputTag
                                                                            type={'text'}
                                                                            classes={
                                                                                'form-control mb-2'
                                                                            }
                                                                            placeholder={
                                                                                'Enter Your GST Number'
                                                                            }
                                                                            id={'gdt'}
                                                                            value={socialSeletct}
                                                                            disabled
                                                                        />
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className='col-lg-9 col-12 d-flex align-items-center justify-content-center flex-wrap flex-lg-nowrap'>
                                                                <div className='mb-2 w-100'>
                                                                    <LabelTag
                                                                        classes={
                                                                            'text-gray fn-12 bold mb-2'
                                                                        }
                                                                        text={'Other Platforms'}
                                                                        For={'url'}
                                                                    />
                                                                    <InputTag
                                                                        type={'text'}
                                                                        classes={
                                                                            'form-control mb-2 '
                                                                        }
                                                                        placeholder={'Enter URL'}
                                                                        id={'url'}
                                                                        value={socialUrl}
                                                                        onChange={event => {
                                                                            setSocialUrl(
                                                                                event.target.value
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
                                                                            isSelectAdd === false
                                                                                ? 'Add'
                                                                                : 'Update'
                                                                        }
                                                                        onClick={e => {
                                                                            e.preventDefault()
                                                                            addSocialDetail(
                                                                                arrayHelpers
                                                                            )
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='row'>
                                                            <div className='mb-3'>
                                                                {socialprofileArray.map(
                                                                    (data, index) => (
                                                                        <div
                                                                            key={index}
                                                                            className='d-flex justify-content-between mb-2'
                                                                        >
                                                                            <PTag
                                                                                classes={
                                                                                    'text-dark-blue bold'
                                                                                }
                                                                                texts={data.name}
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
                                                                                                'Md-Delete pointer'
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
                                        <div className='text-center mt-3 mb-5'>
                                            <ButtonTag
                                                classes={'btn-orange w-10 px-5'}
                                                value={'Continue'}
                                                type={'submit'}
                                            />
                                        </div>
                                    </div>
                                </Form>
                            </>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    )
}

export default IsLoadingHOC(SocialDetails)
