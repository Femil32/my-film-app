import React, { useContext, useState, useEffect } from 'react'
import {
    ButtonTag,
    ImgTag,
    InputTag,
    LabelTag,
    MultiLineInputTag,
    PTag,
    ToogleCheckBox,
} from '../../components/designComponents/MicroComponents'
import CrewContext from './CrewContext'
import { Formik, Form, FieldArray } from 'formik'
import * as Yup from 'yup'
import Select from 'react-select'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import {
    setCrew,
    postCrewProfilePhoto,
    crewUploadUnionCard,
    getCrewProfileBasicDetails,
    putCrewProfile,
    getCrewProfilePhoto,
} from '../../store/crew/slice'
import InputError from '../../components/common/InputError'
import { allGenres, getAllInterests } from '../../store/masterdata/slice'
import CustomLoader from '../../components/customLoader'
import IsLoadingHOC from '../../components/higherOrderLoader/IsLoadingHOC'
//icons
import { FiCamera, FiUploadCloud, FiTag } from 'react-icons/fi'
import { MdClose } from 'react-icons/md'
import { commonMsg, crewMsg } from '../../components/common/ValidationConstants'
import { basicDetailsErrorMsg } from '../../components/common/ErrorMassages'
import { minInputRange, removeDuplicates } from '../../helpers/functions'

const CrewBasicDetail = ({ setLoading, data }) => {
    // context
    const { next, setCategoryInitial } = useContext(CrewContext)

    // dispatch
    const dispatch = useDispatch()

    // selectors
    const crewProfile = useSelector(state => state.crew)
    const masterData = useSelector(state => state.masterdata)

    // states
    const [isLoading, setIsLoading] = useState(false)
    const [geners, setGeners] = useState([])
    const [profileImagePreview, setProfileImagePreview] = useState(null)
    const [interests, setInterests] = useState([])
    const [state, setState] = useState(false)
    const [unionfileName, setUnionfileName] = useState(null)

    useEffect(() => {
        Promise.all([
            dispatch(getCrewProfilePhoto(data?.profile?.profileId)),
            dispatch(getCrewProfileBasicDetails(data?.profile?.profileId)),
            dispatch(allGenres(data.subCat.subCategoryId)),
            dispatch(getAllInterests()),
        ]).finally(() => {
            setLoading(false)
        })
    }, [])

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
            } else if (masterData.type === 'GENRES_API') {
                let data = masterData.genres.map((x, index) => ({ ...x, label: x.genreName }))
                setGeners(data)
            }
        }
    }, [masterData])

    useEffect(() => {
        if (crewProfile.status === 'failed') {
            dispatch(setCrew())
        } else if (crewProfile.status === 'loading') {
            dispatch(setCrew())
        } else if (crewProfile.status === 'succeed') {
            if (crewProfile.type === "CATEGORY_API") {
                dispatch(setCrew())
                setCategoryInitial(crewProfile.category)
            }
            if (crewProfile.type === 'POST_CREW_PROFILEPHOTO') {
                dispatch(setCrew())
                toast.success(commonMsg.profilePhoto)
            }
            if (crewProfile.type === 'PUT_UNION_CARD') {
                dispatch(setCrew())
                toast.success(commonMsg.unionCard)
            }
            if (crewProfile.type === 'ADD_CREW_PROFILE') {
                dispatch(setCrew())
                toast.success(crewMsg.crewBasicDetails)
                next()
            }
            if (crewProfile.type === 'GET_CREW_BASIC_DETAILS') {
                dispatch(setCrew())
                setUnionfileName(crewProfile?.crewBasicDetails?.unionCardCertificate)
            }
        }
    }, [crewProfile])

    // constants
    const FILE_SIZE = 160 * 1024
    const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png']

    // functions
    const handleProfileImageChange = (files, setFieldValue) => {
        setFieldValue('profile', files[0])
        setProfileImagePreview(URL.createObjectURL(files[0]))
        let formData = new FormData()
        formData.append('file', files[0])
        let imgdata = {
            id: data?.profile?.profileId,
            formData,
        }
        dispatch(postCrewProfilePhoto(imgdata))
    }

    const handleUnionCardChange = (files, setFieldValue) => {
        setFieldValue('uploadunioncard', files[0])
        setUnionfileName(files[0].name)
        let formData = new FormData()
        formData.append('file', files[0])
        let imgdata = {
            id: data?.profile?.profileId,
            formData,
        }
        dispatch(crewUploadUnionCard(imgdata))
    }

    const handleOnChange = setFieldValue => {
        setState(!state)
        setFieldValue('isMandatoryUnionCard', !state)
    }

    const onSubmitForm = values => {
        const tempData = {
            ['categoryId']: data.subCat.categoryId,
            ['subCategoryId']: data.subCat.subCategoryId,
            ['profileType']: data.profile.profileType,
            ['description']: values.description,
            ['genres']: values.genres,
            ['interestedIn']: values.interestedin,
            ['workingSince']: values.workingsince.toString(),
            ['camerasOperated']: values.cameras,
            ['equipmentsOperated']: values.equipments,
            ['keywords']: values.tags,
            ['unionCardHolder']: values.isMandatoryUnionCard ? 'yes' : 'no',
            ['unionCardNumber']: values.unioncardno,
            // static data until UI update
            ['projectTypes']: ['ad film', 'fight series'],
        }

        let payload = {
            id: data?.profile?.profileId,
            data: tempData,
        }
        dispatch(putCrewProfile(payload))
    }

    // render
    return (
        <div>
            {isLoading && <CustomLoader />}
            {!isLoading && (
                <div className='row max-w-625 mx-auto g-0'>
                    <PTag classes={'text-dark-blue fw-bold fn-16 mb-4'} texts={'Basic Details'} />
                    <Formik
                        enableReinitialize
                        initialValues={{
                            profile: null,
                            description: crewProfile?.crewBasicDetails?.description ?? '',
                            genres: crewProfile?.crewBasicDetails?.genres ?? [],
                            interestedin: crewProfile?.crewBasicDetails?.interestedIn ?? [],
                            tags: crewProfile?.crewBasicDetails?.keywords ?? [],
                            workingsince: crewProfile?.crewBasicDetails?.workingSince ?? '',
                            cameras: crewProfile?.crewBasicDetails?.camerasOperated ?? '',
                            equipments: crewProfile?.crewBasicDetails?.equipmentsOperated ?? '',
                            unioncardno: crewProfile?.crewBasicDetails?.unionCardNumber ?? '',
                            uploadunioncard: null,
                            isMandatoryUnionCard:
                                crewProfile?.crewBasicDetails?.unionCardHolder === 'yes'
                                    ? true
                                    : false,
                            isProfilePhotoAval: crewProfile?.crewBasicDetails?.profileImage
                                ? true
                                : false,
                            isUnionPhotoAval: crewProfile?.crewBasicDetails?.unionCardCertificate
                                ? true
                                : false,
                        }}
                        validationSchema={Yup.object().shape({
                            description: Yup.string()
                                .required(basicDetailsErrorMsg.description)
                                .matches(/^(?!.*^\s*$)/, `can't be Empty.`),
                            genres: Yup.array()
                                .min(1, basicDetailsErrorMsg.genres)
                                .required(basicDetailsErrorMsg.genres),
                            interestedin: Yup.array()
                                .min(1, basicDetailsErrorMsg.interested)
                                .required(basicDetailsErrorMsg.interested),
                            workingsince: minInputRange(basicDetailsErrorMsg.workingSince, 0),
                            tags: Yup.array()
                                .min(1, basicDetailsErrorMsg.tags)
                                .required(basicDetailsErrorMsg.tags),
                            equipments: Yup.string().required('Equipments Operated is required'),
                            cameras: Yup.string().required('Cameras Operated is required'),
                            isMandatoryUnionCard: Yup.boolean(),
                            unioncardno: Yup.mixed(),
                            //.when(
                            //     'isMandatoryUnionCard',
                            //     (isMandatoryUnionCard, schema) => {
                            //         if (isMandatoryUnionCard === false) {
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
                            handleSubmit,
                            handleBlur,
                            setFieldValue,
                            setErrors,
                        }) => (
                            <Form
                                onSubmit={handleSubmit}
                                className='d-flex flex-column justify-content-between h-100'
                            >
                                <div className='d-flex align-items-center mb-3'>
                                    <div className='profile-picture-box overflow-visible position-relative me-3'>
                                        <ImgTag
                                            src={
                                                profileImagePreview
                                                    ? profileImagePreview
                                                    : crewProfile?.crewProfilePhoto?.imageUrl
                                            }
                                            classes='img-fluid rounded-10 border'
                                        />
                                        <div className='camera-icon pointer'>
                                            <InputTag
                                                className={'uplode-input pointer h-100'}
                                                type={'file'}
                                                accept={SUPPORTED_FORMATS}
                                                name={'profile'}
                                                onChange={event => {
                                                    handleProfileImageChange(
                                                        event.target.files,
                                                        setFieldValue
                                                    )
                                                }}
                                            />
                                            <FiCamera className={'Fi-Camera'} />
                                        </div>
                                    </div>
                                    <PTag
                                        classes={'text-dark-blue fw-bold fn-16 text-capitalize'}
                                        texts={`${data.subCat.subCategoryName} (Crew)`}
                                    />
                                </div>
                                {errors.profile && touched.profile && (
                                    <div className='d-flex align-items-center mb-3'>
                                        <InputError
                                            className='input-error'
                                            errorTitle={errors.profile}
                                        />
                                    </div>
                                )}

                                <div
                                    className={`sign-input ${errors.description && touched.description
                                        ? `error-inputs `
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
                                    <div className='col-lg-6'>
                                        <FieldArray
                                            name='genres'
                                            render={arrayHelpers => {
                                                const genreArray = values.genres
                                                return (
                                                    <>
                                                        <div
                                                            className={`sign-input ${errors.genres && touched.genres
                                                                ? `error-inputs `
                                                                : ``
                                                                }mb-3`}
                                                        >
                                                            <LabelTag
                                                                classes={'text-gray fn-12 mb-2'}
                                                                text={'genres'}
                                                                For={'genres'}
                                                            />
                                                            <Select
                                                                className='form-control p-0'
                                                                options={geners}
                                                                name='genres'
                                                                onBlur={handleBlur('genres')}
                                                                getOptionValue={geners =>
                                                                    geners.genreId
                                                                }
                                                                onChange={e => {
                                                                    if (e !== undefined) {
                                                                        arrayHelpers.push(e.label)
                                                                    }
                                                                }}
                                                            />
                                                            {errors.genres && touched.genres ? (
                                                                <div className='d-flex align-items-center'>
                                                                    <InputError
                                                                        className='input-error mt-2'
                                                                        errorTitle={errors.genres}
                                                                    />
                                                                </div>
                                                            ) : null}
                                                        </div>
                                                        <div className='d-flex flex-wrap gap-2 mb-sm-3'>
                                                            {genreArray.map((element, index) => (
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
                                                            ))}
                                                        </div>
                                                    </>
                                                )
                                            }}
                                        />
                                    </div>
                                    <div className='col-lg-6'>
                                        <FieldArray
                                            name='interestedin'
                                            render={arrayHelpers => {
                                                const interestedinArray = values.interestedin
                                                return (
                                                    <>
                                                        <div
                                                            className={`sign-input ${errors.interestedin &&
                                                                touched.interestedin
                                                                ? `error-inputs `
                                                                : ``
                                                                }mb-3`}
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
                                                                <div className='d-flex align-items-center'>
                                                                    <InputError
                                                                        className='input-error mt-2'
                                                                        errorTitle={
                                                                            errors.interestedin
                                                                        }
                                                                    />
                                                                </div>
                                                            ) : null}
                                                        </div>
                                                        <div className='d-flex flex-wrap gap-2 mb-sm-3'>
                                                            {interestedinArray.map(
                                                                (element, index) => (
                                                                    <div
                                                                        className='btn-dark-blue me-2 rounded px-3 py-2'
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
                                                    </>
                                                )
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div
                                        className={`sign-input col-sm-6 ${errors.workingsince && touched.workingsince
                                            ? `error-inputs `
                                            : ``
                                            }mb-3`}
                                    >
                                        <LabelTag
                                            classes={'text-gray fn-12 mb-2'}
                                            text={'Working Since'}
                                        />
                                        <InputTag
                                            type={'number'}
                                            placeholder={'Enter Working Since'}
                                            value={values.workingsince}
                                            classes={'form-control'}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            name={'workingsince'}
                                        />
                                        {errors.workingsince && touched.workingsince ? (
                                            <InputError
                                                className={'input-error mt-2'}
                                                errorTitle={errors.workingsince}
                                            />
                                        ) : null}
                                    </div>
                                    <div
                                        className={`sign-input col-sm-6 ${errors.equipments && touched.equipments
                                            ? `error-inputs `
                                            : ``
                                            }mb-3`}
                                    >
                                        <LabelTag
                                            classes={'text-gray fn-12 mb-2'}
                                            text={'Equipments Operated'}
                                        />
                                        <InputTag
                                            type={'text'}
                                            placeholder={'Enter equipments operated'}
                                            classes={'form-control'}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.equipments}
                                            name={'equipments'}
                                        />
                                        {errors.equipments && touched.equipments ? (
                                            <InputError
                                                className={'input-error mt-2'}
                                                errorTitle={errors.equipments}
                                            />
                                        ) : null}
                                    </div>
                                </div>
                                <div className='row'>
                                    <div
                                        className={`sign-input col-lg-6 ${errors.cameras && touched.cameras ? `error-inputs ` : ``
                                            }mb-3`}
                                    >
                                        <LabelTag
                                            classes={'text-gray fn-12 mb-2'}
                                            text={'Cameras Operated'}
                                        />
                                        <InputTag
                                            type={'text'}
                                            placeholder={'Enter cameras operated'}
                                            classes={'form-control'}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            name={'cameras'}
                                            value={values.cameras}
                                        />
                                        {errors.cameras && touched.cameras ? (
                                            <InputError
                                                className={'input-error mt-2'}
                                                errorTitle={errors.cameras}
                                            />
                                        ) : null}
                                    </div>
                                    <div className='col-lg-6'>
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
                                                                        'me-2 Fi-Tag input-add-icon-left'
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
                                                                <div className='d-flex align-items-center'>
                                                                    <InputError
                                                                        className='input-error mt-2'
                                                                        errorTitle={errors.tags}
                                                                    />
                                                                </div>
                                                            ) : null}
                                                        </div>
                                                        <div className='d-flex flex-wrap'>
                                                            {tagsArray.map((element, index) => (
                                                                <div
                                                                    className='btn-dark-blue me-2 rounded px-3 py-2 mb-2'
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
                                <div
                                    className={`sign-input ${errors.unioncardno ? ` error-inputs ` : ``
                                        }mb-3`}
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
                                    {errors.unioncardno && (
                                        <InputError
                                            className='input-error mt-2'
                                            errorTitle={errors.unioncardno}
                                        />
                                    )}
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
                                    {errors.uploadunioncard && (
                                        <InputError
                                            className='input-error mt-2'
                                            errorTitle={errors.uploadunioncard}
                                        />
                                    )}
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
            )}
        </div>
    )
}

export default IsLoadingHOC(CrewBasicDetail)
