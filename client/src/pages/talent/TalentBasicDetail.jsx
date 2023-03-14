import React, { useContext, useState, useEffect } from 'react'
import {
    ButtonTag,
    ImgTag,
    InputTag,
    LabelTag,
    MultiLineInputTag,
    PTag,
    ATag,
    ToogleCheckBox,
} from '../../components/designComponents/MicroComponents'
import TalentContext from './TalentContext'
import { Formik, Form, FieldArray } from 'formik'
import * as Yup from 'yup'
import Select from 'react-select'
import InputError from '../../components/common/InputError'
import { useDispatch, useSelector } from 'react-redux'
import {
    addTalentProfile,
    getTalentProfileBasicDetails,
    getTalentProfilePhoto,
    postTalentProfilePhoto,
    setTalent,
    talentUploadUnionCard,
} from '../../store/talent/slice'
import { toast } from 'react-toastify'
import CustomLoader from '../../components/customLoader'
import { allGenres, getAllInterests } from '../../store/masterdata/slice'
import IsLoadingHOC from '../../components/higherOrderLoader/IsLoadingHOC'
import async from 'async'
//icons
import { FiCamera, FiUploadCloud, FiTag } from 'react-icons/fi'
import { MdClose } from 'react-icons/md'
import { commonMsg, talentMsg } from '../../components/common/ValidationConstants'
import { basicDetailsErrorMsg } from '../../components/common/ErrorMassages'
import { minInputRange } from '../../helpers/functions'

const TalantBasicDetails = ({ setLoading, data }) => {
    const { next } = useContext(TalentContext)

    const dispatch = useDispatch()
    const talentProfile = useSelector(store => store.talent)
    const masterData = useSelector(state => state.masterdata)

    const [state, setState] = useState(false)
    const [profileImagePreview, setProfileImagePreview] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [geners, setGeners] = useState([])
    const [interests, setInterests] = useState([])
    // union card
    const [unionfileName, setUnionfileName] = useState(null)
    const [unioncardno, setUnioncardno] = useState(null)

    useEffect(() => {
        Promise.all([
            dispatch(setTalent()),
            dispatch(getTalentProfileBasicDetails(data?.profile?.profileId)),
            dispatch(getTalentProfilePhoto(data?.profile?.profileId)),
            dispatch(allGenres(data.subCat.subCategoryId)),
            dispatch(getAllInterests()),
        ]).finally(() => {
            setLoading(false)
        })
    }, [])

    useEffect(() => {
        if (talentProfile.status === 'failed') {
            dispatch(setTalent())
            toast.error(talentProfile.error)
        } else if (talentProfile.status === 'succeed') {
            dispatch(setTalent())
            if (talentProfile.type === 'TALENT_UPLOAD_UNION_API') {
                dispatch(setTalent())
                toast.success(commonMsg.unionCard)
            }
            if (talentProfile.type === 'TALENT_PROFILE_PHOTO') {
                dispatch(setTalent())
                toast.success(commonMsg.profilePhoto)
            }
            if (talentProfile.type === 'GET_TALENT_BASIC_DETAILS') {
                dispatch(setTalent())
                setUnionfileName(talentProfile?.talentBasicDetails.unionCardCertificate)
            }
            if (talentProfile.type === 'ADD_TALENT_PROFILE_API') {
                dispatch(setTalent())
                toast.success(talentMsg.talentBasicDetail)
                next()
            }
        }
    }, [talentProfile])

    useEffect(() => {
        if (masterData.status === 'succeed') {
            if (masterData.type === 'GET_INTERESTS') {
                let temp = []
                masterData?.interests.map((data, index) => {
                    temp.push({
                        label: data?.interest,
                        value: data?.interest,
                        id: data?.interestId,
                    })
                })
                setInterests(temp)
            }
            if (masterData.type === 'GENRES_API') {
                setGeners(
                    masterData.genres.map((x, index) => ({
                        ...x,
                        label: x.genreName,
                        value: x.genreName,
                    }))
                )
            }
        }
    }, [masterData])

    const handleOnChange = (setFieldValue, value) => {
        setState(!state)
        setFieldValue('isMandatoryUnionCard', !value)
    }

    const FILE_SIZE = 160 * 1024

    const handleProfileImageChange = (files, setFieldValue) => {
        const file = files[0]
        setFieldValue('profile', file)
        setProfileImagePreview(URL.createObjectURL(file))
        let formData = new FormData()
        formData.append('file', file)
        let imgdata = {
            id: data?.profile?.profileId,
            data: formData,
        }
        dispatch(postTalentProfilePhoto(imgdata))
    }

    const handleUnionCardChange = (files, setFieldValue, setErrors) => {
        setUnionfileName(files[0].name)
        setFieldValue('uploadunioncard', files[0])
        let formData = new FormData()
        formData.append('file', files[0])
        let unionCard = {
            id: data?.profile?.profileId,
            data: formData,
        }
        dispatch(talentUploadUnionCard(unionCard))
    }

    const onSubmitForm = dataform => {
        let profileData = {
            id: data?.profile?.profileId,
            data: {
                ['categoryId']: data.subCat.categoryId,
                ['subCategoryId']: data.subCat.subCategoryId,
                ['profileType']: data.profile.profileType,
                ['description']: dataform.description,
                ['workingSince']: dataform.workingsince,
                ['genres']: dataform.genres,
                ['interestedIn']: dataform.interestedin,
                ['keywords']: dataform.tags,
                ['unionCardHolder']: dataform.isMandatoryUnionCard ? 'yes' : 'no',
                ['unionCardNumber']: dataform.unioncardno,
            },
        }
        dispatch(addTalentProfile(profileData))
    }

    return (
        <>
            {isLoading && <CustomLoader />}
            {!isLoading && (
                <div className='max-w-625 mx-auto'>
                    {/* {isLoading === true && <CustomLoader />} */}
                    <PTag classes={'text-dark-blue fw-bold fn-16 mb-4'} texts={'Basic Details'} />
                    <Formik
                        enableReinitialize={true}
                        initialValues={{
                            profile: null,
                            description: talentProfile?.talentBasicDetails?.description ?? '',
                            genres: talentProfile?.talentBasicDetails?.genres ?? [],
                            interestedin: talentProfile?.talentBasicDetails?.interestedIn ?? [],
                            tags: talentProfile?.talentBasicDetails?.keywords ?? [],
                            workingsince: talentProfile?.talentBasicDetails?.workingSince ?? '',
                            unioncardno: talentProfile?.talentBasicDetails?.unionCardNumber ?? '',
                            uploadunioncard: null,
                            isMandatoryUnionCard:
                                talentProfile?.talentBasicDetails?.unionCardHolder === 'yes'
                                    ? true
                                    : false,
                            isProfilePhotoAval: talentProfile?.talentBasicDetails?.profileImage
                                ? true
                                : false,
                            isUnionPhotoAval: talentProfile?.talentBasicDetails
                                ?.unionCardCertificate
                                ? true
                                : false,
                        }}
                        validationSchema={Yup.object().shape({
                            description: Yup.string()
                                .required(basicDetailsErrorMsg.description)
                                .matches(/^(?!.*^\s*$)/, `   can't be Empty.`),
                            genres: Yup.array()
                                .min(1, `${basicDetailsErrorMsg.genres}`)
                                .required(basicDetailsErrorMsg.genres),
                            interestedin: Yup.array()
                                .min(1, `${basicDetailsErrorMsg.interested}`)
                                .required(basicDetailsErrorMsg.interested),
                            workingsince: minInputRange(basicDetailsErrorMsg.workingSince, 0),
                            tags: Yup.array()
                                .min(1, `${basicDetailsErrorMsg.tags}`)
                                .required(basicDetailsErrorMsg.tags),
                            isMandatoryUnionCard: Yup.boolean(),
                            isUnionPhotoAval: Yup.boolean(),
                            unioncardno: Yup.mixed(),
                            //     .when(
                            //     'isMandatoryUnionCard',
                            //     (isMandatoryUnionCard, schema) => {
                            //         if (!isMandatoryUnionCard) {
                            //             return schema
                            //         } else {
                            //             return schema.required(basicDetailsErrorMsg.unioncardno)
                            //         }
                            //     }
                            // ),
                            uploadunioncard: Yup.mixed(),
                            //     .when(
                            //     ['isMandatoryUnionCard', 'isUnionPhotoAval'],
                            //     {
                            //         is: (isMandatoryUnionCard, isUnionPhotoAval) =>
                            //             isMandatoryUnionCard && !isUnionPhotoAval,
                            //         then: Yup.mixed()
                            //             .required(basicDetailsErrorMsg.uploadunioncard)
                            //             .test(
                            //                 'fileSize',
                            //                 'File too large',
                            //                 value => value && value.size <= FILE_SIZE
                            //             ),
                            //     }
                            // ),
                            isProfilePhotoAval: Yup.boolean(),
                            profile: Yup.mixed().when(
                                'isProfilePhotoAval',
                                (isProfilePhotoAval, schema) => {
                                    if (isProfilePhotoAval === true) {
                                        return schema
                                    } else {
                                        return schema
                                            .required(basicDetailsErrorMsg.profile)
                                            .test(
                                                'fileSize',
                                                'File too large',
                                                value => value && value.size <= FILE_SIZE
                                            )
                                    }
                                }
                            ),
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
                            setErrors,
                        }) => (
                            <Form
                                onSubmit={handleSubmit}
                                className='d-flex flex-column justify-content-between h-100'
                            >
                                <div className={`mb-3`}>
                                    <div className='d-flex align-items-center'>
                                        <div
                                            className={`profile-picture-box overflow-visible position-relative me-3`}
                                        >
                                            <ImgTag
                                                src={
                                                    profileImagePreview
                                                        ? profileImagePreview
                                                        : talentProfile?.talentProfilePhoto
                                                            ?.imageUrl
                                                }
                                                classes='img-fluid rounded-10 border'
                                            />
                                            <div className='camera-icon pointer pointer'>
                                                <InputTag
                                                    className={'uplode-input '}
                                                    type={'file'}
                                                    accept={'.png,.jpg,.jpeg,.gif,.pdf'}
                                                    name={'profile'}
                                                    onChange={event => {
                                                        handleProfileImageChange(
                                                            event.target.files,
                                                            setFieldValue
                                                        )
                                                        setFieldValue('isProfilePhotoAval', true)
                                                    }}
                                                />
                                                <FiCamera className={'Fi-Camera'} />
                                            </div>
                                        </div>
                                        <PTag
                                            classes={'text-dark-blue fw-bold fn-16 text-capitalize'}
                                            texts={`${data.subCat.permalink.split('/')[
                                                data.subCat.permalink.split('/').length - 1
                                            ]
                                                } (Talent)`}
                                        />
                                    </div>
                                    {errors.profile && touched.profile ? (
                                        <InputError
                                            className='input-error mt-2'
                                            errorTitle={errors.profile}
                                        />
                                    ) : null}
                                </div>

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
                                <div className='row'>
                                    <FieldArray
                                        name='genres'
                                        render={arrayHelpers => {
                                            const genreArray = values.genres
                                            return (
                                                <>
                                                    <div className='col-sm-6'>
                                                        <div
                                                            className={`sign-input ${errors.genres && touched.genres
                                                                ? ` error-inputs `
                                                                : ``
                                                                } mb-3`}
                                                        >
                                                            <LabelTag
                                                                classes={'text-gray fn-12 mb-2'}
                                                                text={'Genres'}
                                                            />
                                                            <Select
                                                                className='form-control p-0'
                                                                options={geners}
                                                                name={'genres'}
                                                                onBlur={handleBlur('genres')}
                                                                onChange={e => {
                                                                    if (e !== undefined) {
                                                                        arrayHelpers.push(e.value)
                                                                    }
                                                                }}
                                                            />
                                                            {errors.genres && touched.genres ? (
                                                                <InputError
                                                                    className='input-error mt-2'
                                                                    errorTitle={errors.genres}
                                                                />
                                                            ) : null}
                                                        </div>
                                                        <div className='d-flex flex-wrap gap-2'>
                                                            {genreArray.map((element, index) => (
                                                                <div
                                                                    className='btn-dark-blue rounded px-3 py-2 mb-2'
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
                                                                                className={
                                                                                    'Md-Close'
                                                                                }
                                                                            />
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        }}
                                    />
                                    {/* <div className='col-sm-6 mb-sm-0 mb-3'> */}
                                    <FieldArray
                                        name='interestedin'
                                        render={arrayHelpers => {
                                            const interestedinArray = values.interestedin
                                            return (
                                                <>
                                                    <div className='col-sm-6'>
                                                        <div
                                                            className={`sign-input ${errors.interestedin &&
                                                                touched.interestedin
                                                                ? `error-inputs `
                                                                : ``
                                                                } mb-3`}
                                                        >
                                                            <LabelTag
                                                                classes={'text-gray fn-12 mb-2'}
                                                                text={'interestedin'}
                                                                For={'interestedin'}
                                                            />
                                                            <Select
                                                                className='form-control p-0'
                                                                options={interests}
                                                                name='interestedin'
                                                                onBlur={handleBlur('interestedin')}
                                                                getOptionValue={interests =>
                                                                    interests.id
                                                                }
                                                                onChange={e => {
                                                                    if (e !== undefined) {
                                                                        !arrayHelpers.form.values.interestedin.includes(e.label) && arrayHelpers.push(e.label)
                                                                    }
                                                                }}
                                                            />
                                                            {errors.interestedin &&
                                                                touched.interestedin ? (
                                                                <div className='d-flex align-items-center mt-2'>
                                                                    <InputError
                                                                        className='input-error'
                                                                        errorTitle={
                                                                            errors.interestedin
                                                                        }
                                                                    />
                                                                </div>
                                                            ) : null}
                                                        </div>
                                                        <div className='d-flex flex-wrap gap-2'>
                                                            {interestedinArray.map(
                                                                (element, index) => (
                                                                    <div
                                                                        className='btn-dark-blue rounded mb-2 px-3 py-2'
                                                                        key={index}
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
                                    {/* </div> */}
                                </div>
                                <div className='row'>
                                    <div className='col-sm-6'>
                                        <div
                                            className={`sign-input ${errors.workingsince && touched.workingsince
                                                ? ` error-inputs `
                                                : ``
                                                } mb-3`}
                                        >
                                            <LabelTag
                                                classes={'text-gray fn-12 mb-2'}
                                                text={'Working Since'}
                                                For={'workingSince'}
                                            />
                                            <InputTag
                                                classes={'form-control'}
                                                placeholder={'Enter working since'}
                                                id={'workingSince'}
                                                type={'number'}
                                                name={'workingsince'}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.workingsince}
                                                maxLength='8'
                                            />
                                            {errors.workingsince && touched.workingsince ? (
                                                <InputError
                                                    className='input-error mt-2'
                                                    errorTitle={errors.workingsince}
                                                />
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className='col-sm-6'>
                                        <FieldArray
                                            name='tags'
                                            render={arrayHelpers => {
                                                const tagsArray = values.tags
                                                return (
                                                    <>
                                                        <div
                                                            className={`sign-input ${errors.tags && touched.tags
                                                                ? `error-inputs `
                                                                : ``
                                                                }mb-3`}
                                                        >
                                                            <LabelTag
                                                                classes={'text-gray fn-12 mb-2'}
                                                                text={'Tags'}
                                                                For={'tags'}
                                                            />
                                                            <div className='d-flex position-relative'>
                                                                <FiTag
                                                                    fontSize={20}
                                                                    className={
                                                                        'me-2 input-add-icon-left Fi-Tag'
                                                                    }
                                                                />
                                                                <InputTag
                                                                    placeholder={'Add tags'}
                                                                    classes={
                                                                        'form-control input-plachholder-paddingleft'
                                                                    }
                                                                    id={'tags'}
                                                                    name={'tags'}
                                                                    onBlur={handleBlur}
                                                                    onKeyDown={e => {
                                                                        if (e.key === 'Enter') {
                                                                            e.preventDefault()
                                                                            if (
                                                                                e.target.value != ''
                                                                            ) {
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
                                                                <div className='d-flex align-items-center mt-2'>
                                                                    <InputError
                                                                        className='input-error'
                                                                        errorTitle={errors.tags}
                                                                    />
                                                                </div>
                                                            ) : null}
                                                        </div>

                                                        <div className='d-flex flex-wrap'>
                                                            {tagsArray.map((element, index) => (
                                                                <div
                                                                    className='btn-dark-blue  me-2 rounded px-3 py-2 mb-2'
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
                                                                                className={
                                                                                    'Md-Close'
                                                                                }
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
                                </div>
                                <div className='d-flex justify-content-between align-items-center mb-3'>
                                    <PTag classes={'text-dark'} texts={'Union Card (optional)'} />
                                    <ToogleCheckBox
                                        id={'isMandatoryUnionCard'}
                                        name='isMandatoryUnionCard'
                                        value={values.isMandatoryUnionCard}
                                        onChange={() => {
                                            handleOnChange(
                                                setFieldValue,
                                                values.isMandatoryUnionCard
                                            )
                                        }}
                                        onBlur={handleBlur('uploadunioncard')}
                                    />
                                </div>
                                {/* <div
                                    className={`sign-input ${errors.unioncardno ? ` error-inputs ` : ``
                                        }mb-3`}
                                > */}
                                <div
                                    className={`sign-input mb-3`}
                                >
                                    <LabelTag
                                        classes={'text-gray fn-12 mb-2'}
                                        text={'Union Card No.'}
                                        For={'unionCardNo'}
                                    />
                                    <InputTag
                                        classes={'form-control'}
                                        placeholder={'Enter union card number'}
                                        id={'unionCardNo'}
                                        name={'unioncardno'}
                                        onChange={handleChange}
                                        onBlur={e => {
                                            handleBlur('unioncardno')
                                            e.target.value.length
                                                ? setUnioncardno(e.target.value)
                                                : setUnioncardno(null)
                                        }}
                                        value={values.unioncardno}
                                    />
                                    {/* {errors.unioncardno && (
                                        <InputError
                                            className='input-error mt-2'
                                            errorTitle={errors.unioncardno}
                                        />
                                    )} */}
                                </div>
                                <PTag
                                    texts={unionfileName}
                                    classes={'text-truncate fst-italic mb-1'}
                                />
                                <div className='row mb-3'>
                                    <div className='col-12'>
                                        <div className={' upload-label mb-2'}>
                                            <InputTag
                                                type={'file'}
                                                classes={'upload-input'}
                                                accept='.png, .jpg, .jpeg, .pdf'
                                                name={'uploadunioncard'}
                                                onChange={event => {
                                                    handleUnionCardChange(
                                                        event.target.files,
                                                        setFieldValue,
                                                        setErrors
                                                    )
                                                }}
                                            />
                                            <FiUploadCloud className={'Fi-UploadCloud'} />
                                            <PTag
                                                classes={'ms-1'}
                                                texts={
                                                    unionfileName
                                                        ? 'Union Card successfully uploaded'
                                                        : 'Upload Union Card'
                                                }
                                            />
                                        </div>
                                    </div>
                                    {/* {errors.uploadunioncard && (
                                        <InputError
                                            className='input-error mt-2'
                                            errorTitle={errors.uploadunioncard}
                                        />
                                    )} */}
                                </div>
                                <div className='col-sm-3 col-4 mb-3 mx-auto'>
                                    <ButtonTag
                                        classes={'btn-orange w-100 px-sm-4'}
                                        value={'Next'}
                                        type='submit'
                                    />
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            )
            }
        </>
    )
}

export default IsLoadingHOC(TalantBasicDetails)
