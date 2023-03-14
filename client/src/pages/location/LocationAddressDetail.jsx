import React, { useContext, useEffect, useState } from 'react'
import {
    ButtonTag,
    InputTag,
    LabelTag,
    MultiLineInputTag,
    PTag,
} from '../../components/designComponents/MicroComponents'

import LocationContext from './LocationContext'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Select from 'react-select'
import InputError from '../../components/common/InputError'
import { useDispatch, useSelector } from 'react-redux'
import {
    stateApi,
    cityApi,
    locationhubApi,
    createLocationAddresDetailApi,
    setLocation,
    countriesApi,
} from '../../store/location/slice'
import { toast } from 'react-toastify'
import IsLoadingHOC from '../../components/higherOrderLoader/IsLoadingHOC'
import async from 'async'
import { locationMsg } from '../../components/common/ValidationConstants'

const LocationAddressDetail = ({ setLoading }) => {
    const {
        next,
        locationProfileInitialState,
        addressIdData,
    } = useContext(LocationContext)
    const dispatch = useDispatch()
    const addressApi = useSelector(store => store.location)

    const onSubmitForm = values => {
        let payload = {
            ['profileId']: locationProfileInitialState.profile.profileId,
            ['address_detail']: {
                ['countryId']: values.country.countryId,
                ['pincode']: values.pincode,
                ['stateId']: values.state.stateId ?? null,
                ['cityId']: values?.city?.cityId ?? null,
                ['address']: values.address,
                ['loactionHub']: values.location_hub.regionId,
            },
        }
        dispatch(createLocationAddresDetailApi(payload))
    }

    const [defaultCountry, setDefaultCountry] = useState([])
    const [defaultState, setDefaultState] = useState([])
    const [defaultCity, setDefaultCity] = useState([])
    const [defaultLocationHub, setDefaultLocationHub] = useState(null)
    const [defaultPincode, setDefaultPincode] = useState({})
    const [defaultAddress, setDefaultAddress] = useState({})

    const [countryArray, setCountryArray] = useState([])
    const [stateArray, setStateArray] = useState([])
    const [cityArray, setCityArray] = useState([])
    const [locationHubArray, setLocationHubArray] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            country_id: '',
            country: defaultCountry ?? '',
            state: defaultState ?? null,
            city: defaultCity ?? null,
            location_hub: '',
            pincode: defaultPincode ?? '',
            address: defaultAddress ?? '',
            isStateAvailable: false,
            isCityAvailable: false,
        },
        validationSchema: Yup.object().shape({
            country: Yup.object().nullable().required('Select country'),
            state: Yup.mixed().nullable()
                .when('isStateAvailable', (isStateAvailable, schema) => {
                    if (isStateAvailable) {
                        return Yup.object().nullable().required('Select State')
                    } else {
                        return schema
                    }
                }),
            city: Yup.mixed().nullable()
                .when('isCityAvailable', (isCityAvailable, schema) => {
                    if (isCityAvailable) {
                        return Yup.object().nullable().required('Select city')
                    } else {
                        return schema
                    }
                }),
            pincode: Yup.string().required('Enter pincode'),
            location_hub: Yup.object().nullable().required('Select Location Hub'),
            address: Yup.string().required('Enter address'),

            isStateAvailable: Yup.boolean(),
            isCityAvailable: Yup.boolean()
        }),
        onSubmit: (values, { resetForm }) => {
            onSubmitForm(values)
        },
    })

    const { values, errors, touched, setFieldValue, handleBlur, handleSubmit, handleChange } = formik

    useEffect(() => {
        Promise.all([dispatch(locationhubApi()), dispatch(countriesApi())])
            .then(() => {
                async.series(
                    {
                        country: function (callback) {
                            let country = addressApi?.country.map((x, index) => ({
                                ...x,
                                label: x.name,
                                value: x.countryId,
                            }))
                            let data = country?.filter(
                                data => data?.countryId == addressIdData?.countryId
                            )
                            if (data.length > 0) {
                                setDefaultCountry(data[0])
                                dispatch(stateApi(data[0]?.countryId))
                                callback(null, data[0])
                            }
                            setCountryArray(country)
                        },
                        state: function (callback) {
                            let state = addressApi?.state.map((x, index) => ({
                                ...x,
                                label: x.name,
                                value: x.stateId,
                            }))
                            let data = state?.filter(
                                data => data?.stateId == addressIdData?.stateId
                            )
                            if (data.length > 0) {

                                setDefaultState(data[0])
                                dispatch(cityApi(data[0]?.stateId))
                                callback(null, data[0])
                            }
                        },
                        city: function (callback) {
                            let city = addressApi?.city.map((x, index) => ({
                                ...x,
                                label: x.name,
                                value: x.cityId,
                            }))
                            let data = city?.filter(data => data?.cityId == addressIdData?.cityId)
                            if (data.length > 0) {

                                setDefaultCity(data[0])
                                callback(null, data[0])
                            }
                        },
                    },
                    function (err, results) {
                        let temp = {
                            country: { ...results.country, label: results?.country?.name },
                            state: { ...results.state, label: results?.state?.name },
                            city: { ...results.city, label: results?.city?.name },
                        }
                    }
                )
            })
            .finally(() => {
                setDefaultPincode(addressApi?.locationBasicDetails?.locationAddress?.pincode ?? '')
                setDefaultAddress(addressApi?.locationBasicDetails?.locationAddress?.address ?? '')
                setLoading(false)
            })
    }, [])

    useEffect(() => {
        if (addressApi.status === 'failed') {
            setIsLoading(false)
            dispatch(setLocation())
        } else if (addressApi.status === 'succeed') {
            setIsLoading(false)
            if (addressApi.type === 'STATES_API' && addressApi.state.length > 0) {
                let data = addressApi.state.map((x, index) => ({ ...x, label: x.name }))
                setStateArray(data)
                dispatch(setLocation())
            } else if (addressApi.type === 'CITIES_API' && addressApi.city.length > 0) {
                let data = addressApi.city.map((x, index) => ({ ...x, label: x.name }))
                setCityArray(data)
                dispatch(setLocation())
            } else if (addressApi.type === 'LOCATION_ADDRESS_DETAIL_API') {
                dispatch(setLocation())
                toast.success(locationMsg.locationAddressDetail)
                next()
            } else if (addressApi.type === 'LOCATIONHUB_API' && addressApi.locationhub.length > 0) {
                let data = addressApi.locationhub.map((x, index) => ({ ...x, label: x.name }))
                setLocationHubArray(data)
                dispatch(setLocation())
            }
        } else if (addressApi.status === 'loading') {
            setIsLoading(true)
        } else {
            setIsLoading(false)
        }
    }, [addressApi])

    return (
        <>
            <div className='max-w-625 mx-auto'>
                {
                    <>
                        <PTag
                            classes={'text-dark-blue fw-bold fn-16 mb-4'}
                            texts={'Address Details'}
                        />

                        <form
                            onSubmit={handleSubmit}
                            className='d-flex flex-column justify-content-between h-100'
                        >
                            <div className='row'>
                                <div className='col-lg-6'>
                                    <div
                                        className={`sign-input ${errors.country && touched.country
                                            ? `error-inputs `
                                            : ``
                                            } mb-3`}
                                    >
                                        <div>
                                            <LabelTag
                                                classes={'text-gray fn-12 mb-2'}
                                                text={'Country'}
                                                For={'country'}
                                            />
                                            <Select
                                                className='form-control p-0'
                                                options={countryArray}
                                                name='country'
                                                // defaultValue={defaultCountry}
                                                value={values.country}
                                                placeholder='select country'
                                                onBlur={handleBlur('country')}
                                                onChange={e => {
                                                    handleChange('country')
                                                    setFieldValue('country', e)
                                                    setFieldValue('countryId', e.countryId)
                                                    setCityArray([])
                                                    setStateArray([])
                                                    setFieldValue('state', [])
                                                    setFieldValue('city', [])
                                                    dispatch(stateApi(e.countryId)).then(state => {
                                                        setFieldValue('isCityAvailable', false)
                                                        if (state?.payload?.data.length === 0) {
                                                            setFieldValue('isStateAvailable', false)
                                                            setCityArray([])
                                                        } else {
                                                            setFieldValue('isStateAvailable', true)
                                                        }
                                                    })
                                                }}
                                                getOptionValue={countryArray => countryArray.label}
                                            />
                                        </div>
                                        {errors.country && touched.country ? (
                                            <InputError
                                                className='input-error mt-2'
                                                errorTitle={errors.country}
                                            />
                                        ) : null}
                                    </div>
                                </div>
                                <div className='col-lg-6'>
                                    <div
                                        className={`sign-input ${errors.state && touched.state
                                            ? `error-inputs `
                                            : ``
                                            } mb-3`}
                                    >
                                        <div>
                                            <LabelTag
                                                classes={'text-gray fn-12 mb-2'}
                                                text={'State'}
                                                For={'state'}
                                            />
                                            <Select
                                                className='form-control p-0'
                                                options={stateArray}
                                                noOptionsMessage={() => 'Please select country'}
                                                value={values.state}
                                                placeholder='select state'
                                                name={'state'}
                                                onBlur={handleBlur('state')}
                                                onChange={e => {
                                                    setFieldValue('state', e)
                                                    dispatch(cityApi(e.stateId)).then(city => {
                                                        if (city?.payload?.data.length === 0) {
                                                            setFieldValue('isCityAvailable', false)
                                                            setCityArray([])
                                                        } else {
                                                            setFieldValue('isCityAvailable', true)
                                                        }
                                                    })
                                                    setFieldValue('city', null)
                                                }}
                                                getOptionValue={stateArray => stateArray.label}
                                            />
                                        </div>
                                        {errors.state && touched.state ? (
                                            <InputError
                                                className={'input-error mt-2'}
                                                errorTitle={errors.state}
                                            />
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-lg-6'>
                                    <div
                                        className={`sign-input ${errors.city && touched.city
                                            ? `error-inputs `
                                            : ``
                                            } mb-3`}
                                    >
                                        <div>
                                            <LabelTag
                                                classes={'text-gray fn-12 mb-2'}
                                                text={'City'}
                                                For={'city'}
                                            />
                                            <Select
                                                className='form-control p-0'
                                                options={cityArray}
                                                noOptionsMessage={() => !cityArray.length ? 'Please select state' : "No city available"}
                                                value={values.city}
                                                onBlur={handleBlur('city')}
                                                placeholder='select city'
                                                name={'city'}
                                                onChange={e => {
                                                    setFieldValue('city', e)
                                                }}
                                                getOptionValue={cityArray => cityArray.label}
                                            />
                                        </div>
                                        {errors.city && touched.city ? (
                                            <InputError
                                                className={'input-error mt-2'}
                                                errorTitle={errors.city}
                                            />
                                        ) : null}
                                    </div>
                                </div>
                                <div className='col-lg-6'>
                                    <div
                                        className={`sign-input ${errors.pincode && touched.pincode
                                            ? `error-inputs `
                                            : ``
                                            } mb-3`}
                                    >
                                        <div>
                                            <LabelTag
                                                classes={'text-gray fn-12 mb-2'}
                                                text={'Pincode'}
                                                For={'pincode'}
                                            />
                                            <InputTag
                                                type={'text'}
                                                placeholder={'Enter pincode'}
                                                name={'pincode'}
                                                classes={`form-control`}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.pincode}
                                            />
                                        </div>
                                        {errors.pincode && touched.pincode ? (
                                            <InputError
                                                className='input-error mt-2'
                                                errorTitle={errors.pincode}
                                            />
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-12'>
                                    <div
                                        className={`sign-input ${errors.location_hub &&
                                            touched.location_hub
                                            ? `error-inputs `
                                            : ``
                                            } mb-3`}
                                    >
                                        <div>
                                            <LabelTag
                                                classes={'text-gray fn-12 mb-2'}
                                                text={'Location Hub'}
                                                For={'locationHub'}
                                            />
                                            <Select
                                                className='form-control p-0'
                                                options={locationHubArray}
                                                name='location_hub'
                                                onBlur={handleBlur('location_hub')}
                                                // defaultValue={defaultCountry}
                                                value={values.location_hub}
                                                placeholder='select location hub'
                                                onChange={e => {
                                                    setFieldValue('location_hub', e)
                                                }}
                                                getOptionValue={locationHubArray => locationHubArray.label}
                                            />
                                        </div>
                                        {errors.location_hub &&
                                            touched.location_hub ? (
                                            <InputError
                                                className='input-error mt-2'
                                                errorTitle={errors.location_hub}
                                            />
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-12'>
                                    <div
                                        className={`sign-input ${errors.address && touched.address
                                            ? `error-inputs `
                                            : ``
                                            } mb-3`}
                                    >
                                        <div>
                                            <LabelTag
                                                classes={'text-gray fn-12 mb-2'}
                                                text={'Address'}
                                                For={'address'}
                                            />
                                            <MultiLineInputTag
                                                placeholder={'Enter address'}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                name='address'
                                                value={values.address}
                                            />
                                        </div>
                                        {errors.address && touched.address ? (
                                            <InputError
                                                className='input-error mt-2'
                                                errorTitle={errors.address}
                                            />
                                        ) : null}
                                    </div>
                                </div>
                                <div className='col-3 mx-auto mb-3'>
                                    <ButtonTag
                                        classes={'btn-orange w-100'}
                                        value={'Next'}
                                        type={'submit'}
                                    />
                                </div>
                            </div>
                        </form>
                    </>
                }
            </div>
        </>
    )
}

export default IsLoadingHOC(LocationAddressDetail)
