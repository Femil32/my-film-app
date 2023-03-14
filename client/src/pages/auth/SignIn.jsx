import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import filmreelimg from '../../assets/img/base/film-reel.png'
import Sawo from 'sawo'
import { useDispatch, useSelector } from 'react-redux'
import { authentication, OTPUser, setAuth } from '../../store/auth/slice'
import { toast } from 'react-toastify'
import { Formik, Form } from 'formik';
import { ButtonTag, DefaultPhoneInput, H1Tag, LabelTag, PTag } from './../../components/designComponents/MicroComponents';
import * as Yup from 'yup'
import InputError from './../../components/common/InputError';
import { parsePhoneNumber } from 'react-phone-number-input'
import { isValidPhoneNumber } from 'react-phone-number-input'
import { commonMsg } from '../../components/common/ValidationConstants'

const SignIn = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const loginResponse = useSelector(state => state.auth)

    const [payload, setPayload] = useState({})
    const [isSubmitDisable, setIsSubmitDisable] = useState(false)

    useEffect(() => {
        if (loginResponse.status === 'succeed' && loginResponse.type === "OTP_API") {
            navigate('/auth/otp', { state: payload })
            dispatch(setAuth())
        }

    }, [loginResponse])

    return (
        <>
            <div className='filmdashborad'>
                <div className='row g-0 '>
                    <div className='col-lg-8 col-12'>
                        <div className='text-center  bgimg d-flex justify-content-center align-items-center flex-column'>
                            <div className='max-w-450  mx-auto mb-5'>
                                <img src={filmreelimg} alt='' />
                            </div>
                            <div>
                                <H1Tag
                                    classes={
                                        'text-dark-blue fn-md-20 fn-36 fw-bold border-bottom border-1 border-success  max-w-310 mx-auto d-inline'
                                    }
                                    title={`Don't Let Your talent`}
                                />
                            </div>
                            <div>
                                <H1Tag
                                    classes={
                                        'text-dark-blue fn-md-20 fn-36 fw-bold border-bottom border-1 border-success  max-w-310 mx-auto d-inline '
                                    }
                                    title={`Get Wasted`}
                                />
                            </div>
                            <div>
                                <PTag
                                    classes={
                                        'text-dark-blue fn-10 line-height-1 mt-sm-2 max-w-260  mx-auto py-2 mb-5'
                                    }
                                    texts={
                                        'Work With top rated clients from the industry on amazing projects'
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    <div className='col-lg-4 col-12 d-flex justify-content-center align-items-center p-5' id='signIn'>
                        <div className='col-12'>
                            <div className='sign-head-text'>
                                <H1Tag classes='sign-head fw-bold text-dark-blue mt-2' title='Sign in' />
                                <PTag
                                    classes='sign-text text-dark-gray mt-3'
                                    texts='All Your Resources To Make A Film'
                                />
                            </div>

                            <Formik
                                initialValues={{
                                    mobile: ""
                                }}
                                validationSchema={Yup.object().shape({
                                    mobile: Yup.string().required('This mobile no field is required')
                                })}
                                onSubmit={values => {
                                    if (isValidPhoneNumber(values.mobile)) {
                                        const { nationalNumber, countryCallingCode } = parsePhoneNumber(values.mobile)
                                        const jsonObject = {
                                            ['isd_code']: '+' + countryCallingCode,
                                            ['username']: nationalNumber,
                                        }
                                        setPayload(jsonObject)
                                        setIsSubmitDisable(true)
                                        dispatch(OTPUser(jsonObject))
                                    } else {
                                        toast.error(commonMsg.mobileNotvalid)
                                    }
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
                                            className='d-flex flex-column mt-2'
                                        >

                                            <div className={`sign-input ${errors.mobile && touched.mobile
                                                ? `error-inputs `
                                                : ``
                                                }mb-3`}>

                                                <div className='col-12 w-100 align-middle mb-2 mt-2'>
                                                    <DefaultPhoneInput
                                                        autoFocus
                                                        className={'form-control p-3'}
                                                        value={values.mobile}
                                                        onChange={(value) => {
                                                            value !== undefined ? setFieldValue('mobile', value) : setFieldValue('mobile', '')
                                                        }}
                                                    />
                                                    {errors.mobile && touched.mobile ? (
                                                        <InputError
                                                            className='input-error mt-2'
                                                            errorTitle={errors.mobile}
                                                        />
                                                    ) : null}
                                                </div>
                                            </div>
                                            <ButtonTag
                                                disabled={isSubmitDisable}
                                                classes={'btn-orange fw-normal mb-5 mt-1 px-5'}
                                                value={'Continue'}
                                                type={'submit'}
                                            />
                                        </Form>
                                    </>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignIn
