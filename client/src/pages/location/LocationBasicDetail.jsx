import React, { useContext, useState, useEffect } from 'react'
import {
    ButtonTag,
    ImgTag,
    InputTag,
    LabelTag,
    MultiLineInputTag,
    PTag,
} from '../../components/designComponents/MicroComponents'

import LocationContext from './LocationContext'
import { Formik, Form, FieldArray } from 'formik'
import * as Yup from 'yup'
import Select from 'react-select'
import InputError from '../../components/common/InputError'
import { useDispatch, useSelector } from 'react-redux'
import {
    createLocationBasicDetailApi,
    setLocation,
    profilephotoApi,
    getLocationProfilePhoto,
    getLocationProfileBasicDetails,
} from '../../store/location/slice'
import { toast } from 'react-toastify'
import CustomLoader from '../../components/customLoader'
import { amenitiesApi } from '../../store/masterdata/slice'
import IsLoadingHOC from '../../components/higherOrderLoader/IsLoadingHOC'
//icons
import { FiCamera, FiTag } from 'react-icons/fi'
import { MdClose } from 'react-icons/md'
import { commonMsg, locationMsg } from '../../components/common/ValidationConstants'

const LocationBasicDetail = ({ setLoading, data }) => {
    const { next, locationProfileInitialState, aminityArray } = useContext(LocationContext)
    const dispatch = useDispatch()
    const [profileImagePreview, setProfileImagePreview] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [aminitisArray, setAminitisArray] = useState([])

    const locationProfile = useSelector(state => state.location)
    const masterData = useSelector(state => state.masterdata)
    // functions
    const handleProfileImageChange = (files, setFieldValue) => {
        const file = files[0]
        setFieldValue('profile', file)
        let formData = new FormData()
        formData.append('file', files[0])
        let imgdata = {
            id: locationProfileInitialState.profile.profileId,
            profile: formData,
        }
        setProfileImagePreview(URL.createObjectURL(file))
        dispatch(profilephotoApi(imgdata))
    }

    useEffect(() => {
        Promise.all([
            dispatch(amenitiesApi()),
            dispatch(getLocationProfilePhoto(data?.profile?.profileId)),
        ]).finally(() => {
            setLoading(false)
        })
    }, [])

    useEffect(() => {
        setAminitisArray(aminityArray)
    }, [aminityArray])

    const onSubmitForm = values => {
        let aminitisTempArray = []
        values.amenities.map((item, index) => {
            aminitisTempArray.push(item.amenity)
        })
        let finalaminitisVal = JSON.stringify(aminitisTempArray)
            .replace('[', '')
            .replace(']', '')
            .replace(/["]/g, '')

        const payload = {
            id: data?.profile?.profileId,
            data: {
                ['categoryId']: data.subCat.categoryId,
                ['subCategoryId']: data.subCat.subCategoryId,
                ['profileType']: data.profile.profileType,
                ['propertyName']: values.propertyName,
                ['description']: values.description,
                ['locationAmenitis']: values.aminitisTempArray,
                ['latestProjects']: [values.latest_projects],
                ['keywords']: values.tags,
                ['propertyOwner']: true,
                ['responseTime']: 10,
            },
        }
        dispatch(createLocationBasicDetailApi(payload))
    }

    useEffect(() => {
        switch (locationProfile.status) {
            case 'succeed':
                switch (locationProfile.type) {
                    case 'LOCATION_BASIC_DETAIL_API':
                        dispatch(setLocation())
                        toast.success(locationMsg.locationBasicDetail)
                        next()
                        break
                    case 'AMENITIES_API':
                        dispatch(setLocation())
                        locationProfile.amenities.amenities.map(data => {
                            aminitisArray.push({ ...data, label: data.name })
                        })
                        setAminitisArray([...aminitisArray])
                        break
                    case 'PROFILE_API':
                        dispatch(setLocation())
                        toast.success(commonMsg.profilePhoto)
                        break
                }
                break
        }
    }, [locationProfile])

    return (
        <>
            {isLoading && <CustomLoader />}
            {
                <div className='max-w-625 mx-auto'>
                    <>
                        <PTag
                            classes={'text-dark-blue fw-bold fn-16 mb-4'}
                            texts={'Basic Details'}
                        />
                        <Formik
                            enableReinitialize
                            initialValues={{
                                profile: null,
                                propertyName:
                                    locationProfile?.locationBasicDetails?.propertyName ?? '',
                                description:
                                    locationProfile?.locationBasicDetails?.description ?? '',
                                amenities: [],
                                latest_projects:
                                    locationProfile?.locationBasicDetails?.latestProjects[0] ?? '',
                                tags: locationProfile?.locationBasicDetails?.keywords ?? [],
                            }}
                            validationSchema={Yup.object().shape({
                                propertyName: Yup.string().required('Property is required'),
                                description: Yup.string().required('enter description'),
                                amenities: Yup.array().of(
                                    Yup.object().shape({
                                        id: Yup.string(),
                                        amenity: Yup.string(),
                                    })
                                ),
                                latest_projects: Yup.string().required(
                                    'Latest Projects name are required'
                                ),
                                tags: Yup.array(),
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
                                                        : locationProfile?.locationProfilePhoto
                                                            ?.imageUrl
                                                }
                                                classes='img-fluid rounded-10 border'
                                            />
                                            <div
                                                className='camera-icon pointer'
                                                style={{ width: '35px', height: '35px' }}
                                            >
                                                <InputTag
                                                    className={'uplode-input'}
                                                    type={'file'}
                                                    accept='.png, .jpg, .jpeg, .gif, .pdf'
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
                                            texts={`${locationProfileInitialState?.profile?.profileType?.split(
                                                '/'
                                            )[
                                                locationProfileInitialState?.profile?.profileType.split(
                                                    '/'
                                                )?.length - 1
                                            ]
                                                } (Location)`}
                                        />
                                    </div>
                                    <div
                                        className={`sign-input ${errors.propertyName && touched.propertyName
                                            ? `error-inputs `
                                            : ``
                                            }mb-3`}
                                    >
                                        <div>
                                            <LabelTag
                                                classes={'text-gray fn-12 mb-2'}
                                                text={'Property name'}
                                                For={'propertyName'}
                                            />
                                            <InputTag
                                                placeholder={'Enter property name'}
                                                type={'text'}
                                                classes={'form-control mb-2'}
                                                onChange={handleChange}
                                                name={'propertyName'}
                                                onBlur={handleBlur}
                                                value={values.propertyName}
                                            />
                                        </div>
                                        {errors.propertyName && touched.propertyName ? (
                                            <InputError
                                                className={'input-error mt-2'}
                                                errorTitle={errors.propertyName}
                                            />
                                        ) : null}
                                    </div>
                                    <div
                                        className={`sign-input ${errors.description && touched.description
                                            ? `error-inputs `
                                            : ``
                                            }mb-3`}
                                    >
                                        <div>
                                            <LabelTag
                                                classes={'text-gray fn-12 mb-2'}
                                                text={'Description'}
                                                For={'description'}
                                            />
                                            <MultiLineInputTag
                                                placeholder={'Enter description'}
                                                name={'description'}
                                                onChange={handleChange}
                                                value={values.description}
                                                onBlur={handleBlur}
                                            />
                                        </div>
                                        {errors.description && touched.description ? (
                                            <InputError
                                                className='input-error mt-2'
                                                errorTitle={errors.description}
                                            />
                                        ) : null}
                                    </div>
                                    <div className='mb-3'>
                                        <FieldArray
                                            name='amenities'
                                            render={arrayHelpers => {
                                                const aminitisItemArray = values.amenities
                                                return (
                                                    <>
                                                        <div
                                                            className={`sign-input ${errors.amenities &&
                                                                touched.amenities
                                                                ? `error-inputs `
                                                                : ``
                                                                }mb-2`}
                                                        >
                                                            <div>
                                                                <LabelTag
                                                                    classes={'text-gray fn-12 mb-2'}
                                                                    text={'Amenities'}
                                                                    For={'amenities'}
                                                                />
                                                                <Select
                                                                    className='form-control p-0'
                                                                    options={aminitisArray}
                                                                    name='amenities'
                                                                    value={null}
                                                                    onChange={e => {
                                                                        if (e !== undefined) {
                                                                            arrayHelpers.push({
                                                                                id: 1,
                                                                                amenity: e.label,
                                                                            })
                                                                        }
                                                                    }}
                                                                    onBlur={handleBlur('amenities')}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className='d-flex flex-wrap'>
                                                            {aminitisItemArray.map(
                                                                (element, index) => (
                                                                    <div
                                                                        className='btn-dark-blue me-2 rounded px-3 py-2 mb-2'
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
                                                                                texts={
                                                                                    element.amenity
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
                                        {errors.amenities && touched.amenities ? (
                                            <InputError
                                                className={'input-error'}
                                                errorTitle={errors.amenities}
                                            />
                                        ) : null}
                                    </div>
                                    <div
                                        className={`sign-input ${errors.latest_projects && touched.latest_projects
                                            ? `error-inputs `
                                            : ``
                                            }mb-3`}
                                    >
                                        <div>
                                            <LabelTag
                                                classes={'text-gray fn-12 mb-2'}
                                                text={'Latest Projects'}
                                                For={'latestProjects'}
                                            />
                                            <MultiLineInputTag
                                                placeholder={'Enter latest projects'}
                                                name={'latest_projects'}
                                                onChange={handleChange}
                                                value={values.latest_projects}
                                                onBlur={handleBlur}
                                            />
                                        </div>
                                        {errors.latest_projects && touched.latest_projects ? (
                                            <InputError
                                                className='input-error mt-2'
                                                errorTitle={errors.latest_projects}
                                            />
                                        ) : null}
                                    </div>
                                    <div className='mb-3'>
                                        <FieldArray
                                            name='tags'
                                            render={arrayHelpers => {
                                                const tagsArray = values.tags
                                                return (
                                                    <>
                                                        <div
                                                            className={`sign-input`}
                                                        >
                                                            <div>
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
                                                                        classes={
                                                                            'w-100 form-control input-plachholder-paddingleft'
                                                                        }
                                                                        placeholder={'Add tags'}
                                                                        name={'tags'}
                                                                        onKeyDown={e => {
                                                                            if (e.key === 'Enter') {
                                                                                e.preventDefault()
                                                                                if (
                                                                                    e.target
                                                                                        .value != ''
                                                                                ) {
                                                                                    arrayHelpers.push(
                                                                                        e.target
                                                                                            .value
                                                                                    )
                                                                                    e.target.value =
                                                                                        ''
                                                                                }
                                                                            }
                                                                        }}
                                                                        onBlur={handleBlur('tags')}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='d-flex flex-wrap gap-1'>
                                                            {tagsArray.map((element, index) => (
                                                                <div
                                                                    className='btn-dark-blue rounded px-3 py-2'
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
                                        {/* {errors.tags && touched.tags ? (
                                            <InputError
                                                className={'input-error'}
                                                errorTitle={errors.tags}
                                            />
                                        ) : null} */}
                                    </div>
                                    <div className='row'>
                                        <div className='col-3 mx-auto mb-3'>
                                            <ButtonTag
                                                onSubmit={e => {
                                                    e.preventDefault()
                                                }}
                                                classes={'btn-orange w-100'}
                                                value={'Next'}
                                                type={'submit'}
                                            />
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </>
                </div>
            }
        </>
    )
}

export default IsLoadingHOC(LocationBasicDetail)
