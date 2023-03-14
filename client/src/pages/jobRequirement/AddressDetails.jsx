import React, { useState, useContext, useEffect } from 'react'
import {
    InputTag,
    MultiLineInputTag,
    PTag,
    ButtonTag,
} from '../../components/designComponents/MicroComponents'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import InputError from '../../components/common/InputError'
import MultiStepFormContext from './MultiStepFormContext'
import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux'
import { countriesApi, stateApi, cityApi, setAddressApi } from '../../store/location/slice'
import { toast } from 'react-toastify'
import IsLoadingHOC from '../../components/higherOrderLoader/IsLoadingHOC'
import { commonMsg } from '../../components/common/ValidationConstants'

const Addressdetail = ({ setLoading }) => {
    const { next, addressdetail, setAddressDetail } = useContext(MultiStepFormContext)
    const dispatch = useDispatch()

    const addressApi = useSelector(store => store.location)

    const [countryArray, setCountryArray] = useState([])
    const [stateArray, setStateArray] = useState([])
    const [cityArray, setCityArray] = useState([])

    useEffect(() => {
        Promise.all([
            setCountryArray(addressdetail.countryArray),
            setStateArray(addressdetail.stateArray),
            setCityArray(addressdetail.cityArray),
            dispatch(countriesApi()),
        ]).finally(() => {
            setLoading(false)
        })
    }, [])

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
                next()
            }
        } else {
        }
    }, [addressApi])

    //Submit
    const onSubmitForm = values => {
        //setCallApiAddress(true)
        let pram = {
            ['address1']: values.address,
            ['cityId']: values.city.cityId,
            ['stateId']: values.state.stateId,
            ['countryId']: values.country.countryId,
            ['pincode']: values.pincode.toString(),
        }
        setAddressDetail({
            country: values.country,
            pincode: '"' + values.pincode + '"',
            state: values.state,
            city: values.city,
            address: values.address,
            countryArray: countryArray,
            stateArray: stateArray,
            cityArray: cityArray,

        })
        dispatch(setAddressApi(pram))
    }

    return (
        <>
            <div className='max-w-625 mx-auto px-sm-0 px-3'>
                {/* Title */}
                <PTag
                    classes={'text-dark-blue fw-bold fn-17 mb-3 mt-4'}
                    texts={'Address Details'}
                />
                {/* Form */}
                <Formik
                    initialValues={{
                        countryId: addressdetail && addressdetail.country.countryId,
                        country: addressdetail.country,
                        pincode: addressdetail.address,
                        state: addressdetail.state,
                        city: addressdetail.city,
                        address: addressdetail.address,

                        isStateAvailable: false,
                        isCityAvailable: false,
                    }}

                    validationSchema={Yup.object().shape({
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
                        address: Yup.string()
                            .required('Enter address')
                            .matches(/^(?!.*^\s*$)/, `   can't be Empty.`),

                        isStateAvailable: Yup.boolean(),
                        isCityAvailable: Yup.boolean()
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
                            <div className='row'>
                                <div className='col-sm-6 col-12'>
                                    <div className='sign-inputs'>
                                        <PTag texts={'Country'} classes={`mb-2`} />
                                        <label
                                            className={`sign-input ${errors.country && touched.country
                                                ? `error-inputs`
                                                : null
                                                } w-100`}
                                        >
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
                                            {errors.country && touched.country ? (
                                                <InputError
                                                    className='input-error mt-2'
                                                    errorTitle={errors.country}
                                                />
                                            ) : null}
                                        </label>
                                    </div>
                                </div>
                                <div className='col-sm-6 col-12'>
                                    <div className='sign-inputs'>
                                        <PTag texts={'State'} classes={`mb-2`} />
                                        <label
                                            className={`sign-input ${errors.state && touched.state
                                                ? `error-inputs`
                                                : null
                                                } w-100`}
                                        >
                                            <Select
                                                className='form-control p-0'
                                                options={stateArray}
                                                noOptionsMessage={() => stateArray.length ? 'Please select country' : "No state available"}
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
                                            {errors.state && touched.state ? (
                                                <InputError
                                                    className='input-error mt-2'
                                                    errorTitle={errors.state}
                                                />
                                            ) : null}
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-sm-6 col-12'>
                                    <div className='sign-inputs'>
                                        <PTag texts={'City'} classes={`mb-2`} />
                                        <label
                                            className={`sign-input ${errors.city && touched.city ? `error-inputs` : null
                                                } w-100`}
                                        >
                                            <Select
                                                className='form-control p-0'
                                                options={cityArray}
                                                noOptionsMessage={() => cityArray.length ? 'Please select country' : "No city available"}
                                                value={values.city}
                                                onBlur={handleBlur('city')}
                                                placeholder='select city'
                                                name={'city'}
                                                onChange={e => {
                                                    setFieldValue('city', e)
                                                }}
                                                getOptionValue={cityArray => cityArray.label}
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
                                <div className='col-sm-6 col-12'>
                                    <div className='sign-inputs'>
                                        <PTag texts={'Pincode'} classes={`mb-2`} />
                                        <label
                                            className={`sign-input ${errors.pincode && touched.pincode
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
                                                placeholder={'Enter pincode'}
                                            />
                                            {errors.pincode && touched.pincode ? (
                                                <InputError
                                                    className='input-error mt-2'
                                                    errorTitle={errors.pincode}
                                                />
                                            ) : null}
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className='sign-inputs'>
                                <PTag texts={'Address'} classes={`mb-2`} />
                                <label
                                    className={`sign-input ${errors.address && touched.address ? `error-inputs` : null
                                        } w-100`}
                                >
                                    <MultiLineInputTag
                                        classes={`mb-3`}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name='address'
                                        value={values.address}
                                        placeholder={'Enter address...'}

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
                                    type='submit'
                                    value='Continue'
                                    classes='btn btn-orange'
                                />
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    )
}

export default IsLoadingHOC(Addressdetail)
