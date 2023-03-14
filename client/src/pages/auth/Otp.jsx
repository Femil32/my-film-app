import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import filmreelimg from '../../assets/img/base/film-reel.png'
import { useDispatch, useSelector } from 'react-redux'
import { MOBILE_NO, ACCESS_TOKEN, FBM_USER_ID, COUNTRY_CODE, GUEST_TOKEN } from '../../utils/constants'
import { loginUser, setAuth, authentication, OTPUser } from '../../store/auth/slice'
import { toast } from 'react-toastify'
import { axiosApi } from '../../helpers/axios'
import { commonMsg } from '../../components/common/ValidationConstants'
import { Formik, Form } from 'formik';
import { ButtonTag, H1Tag, PTag } from './../../components/designComponents/MicroComponents';
import * as Yup from 'yup'
import InputError from './../../components/common/InputError';
import OTPInput, { ResendOTP } from "otp-input-react";


const Otp = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    const loginResponse = useSelector(state => state.auth)

    const [isSubmitDisable, setIsSubmitDisable] = useState(false)
    const [submitText, setSubmitText] = useState("Continue")
    const [OTP, setOTP] = useState("");

    useEffect(() => {
        if (location.state === null) {
            navigate('/auth')
        }
    }, []);



    useEffect(() => {
        if (loginResponse.status === 'failed') {
            if (loginResponse.errorTitle === "InvalidInputException") navigate('/auth')
            toast.error(loginResponse.error)
            setIsSubmitDisable(false)
            // dispatch(OTPUser(location.state))
        } else if (loginResponse.status === 'succeed') {
            switch (loginResponse.type) {
                case 'OTP_API':
                    break;
                case 'AUTH_API':
                    const { isd_code, username } = location.state
                    const jsonObject = {
                        ['countryCode']: isd_code,
                        ['mobile']: username,
                        ['accessToken']: loginResponse?.authData?.access_token
                    }
                    dispatch(loginUser(jsonObject))
                    dispatch(setAuth())
                    break;
                case 'LOGIN_API':
                    axiosApi.defaults.headers.common[
                        'Authorization'
                    ] = `Bearer ${loginResponse.loginData.token}`
                    localStorage.setItem(ACCESS_TOKEN, loginResponse?.loginData?.token)
                    localStorage.setItem(FBM_USER_ID, loginResponse?.loginData?.fbmUserId)
                    localStorage.setItem(COUNTRY_CODE, loginResponse?.loginData?.countryCode)
                    localStorage.setItem(MOBILE_NO, loginResponse?.loginData?.mobile)
                    localStorage.setItem(FBM_USER_ID, loginResponse?.loginData?.fbmUserId)
                    localStorage.removeItem(GUEST_TOKEN)

                    if (loginResponse.loginData?.registerComplete) {
                        navigate('/dashboard')
                        toast.success(commonMsg.login)
                        dispatch(setAuth())
                    } else {
                        navigate('/create-profile')
                        dispatch(setAuth())
                    }
                    break;

                default:
                    break;
            }

            // if (loginResponse.type === 'REGISTER_API') {
            //     dispatch(setAuth())
            //     if (loginResponse.registerData !== undefined) {
            //         localStorage.setItem(FBM_USER_ID, loginResponse.registerData.fbmUserId)
            //         localStorage.setItem(ACCESS_TOKEN, loginResponse.registerData.token)
            //         localStorage.setItem(MOBILE_NO, loginResponse.registerData.mobile)
            //         localStorage.setItem(COUNTRY_CODE, loginResponse.registerData.countryCode)
            //         localStorage.removeItem(GUEST_TOKEN)
            //         axiosApi.defaults.headers.common[
            //             'Authorization'
            //         ] = `Bearer ${loginResponse.registerData.token}`
            //         navigate('/create-profile/')
            //         toast.success(commonMsg.register)
            //     }
            // }

        }
    }, [loginResponse])

    const handleSubmit = (values) => {
        setIsSubmitDisable(true)
        const { isd_code, username } = location.state
        const jsonObject = {
            ['isd_code']: isd_code,
            ['username']: username,
            ['otp']: values.otp
        }
        dispatch(authentication(jsonObject))
    }


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

                    <div className='col-lg-4 col-12 d-flex justify-content-center align-items-center p-5' id="otp-input">
                        <div className='col-12'>
                            <div className='sign-head-text'>
                                <H1Tag classes='sign-head fw-bold text-dark-blue mt-2' title='Verification Code' />
                                <PTag
                                    classes='sign-text text-dark-gray mt-3'
                                    texts='We have sent the verification code to your mobile number'
                                />
                            </div>

                            <Formik

                                initialValues={{
                                    otp: "",
                                }}
                                validationSchema={Yup.object().shape({
                                    otp: Yup.string().min(6).required('Enter otp'),
                                })}
                                onSubmit={values => handleSubmit(values)}
                            >
                                {({
                                    values,
                                    errors,
                                    touched,
                                    handleSubmit,
                                    setFieldValue,
                                }) => (
                                    <>

                                        <Form
                                            onSubmit={handleSubmit}
                                            className='d-flex flex-column mt-2'
                                        >

                                            <div className={`sign-input ${errors.otp && touched.otp
                                                ? `error-inputs `
                                                : ``
                                                }mb-3`}>

                                                <div className='col-12 w-100 align-middle mb-2 mt-2'>
                                                    <OTPInput
                                                        value={values.otp}
                                                        onChange={(otp) => {
                                                            setFieldValue('otp', otp)
                                                        }}
                                                        autoFocus
                                                        OTPLength={6}
                                                        otpType="number"
                                                        disabled={false}
                                                        // inputStyle='w-100 bd-highlight card me-2 heightBox otp-control'
                                                        // inputStyles='w-100 bd-highlight card me-2 heightBox otp-control'
                                                        inputClassName='w-100 py-4 bd-highlight card me-2 heightBox otp-control'
                                                    // className='w-100 bd-highlight card me-2 heightBox otp-control'
                                                    />
                                                    {/* <OtpInput
                                                        autoFocus
                                                        value={values.otp}
                                                        onChange={(otp) => {
                                                            setFieldValue('otp', otp)
                                                        }}
                                                        isInputNum={true}
                                                        type={'number'}
                                                        inputStyle='w-100 bd-highlight card me-2 heightBox otp-control'
                                                        numInputs={6}
                                                    /> */}
                                                    {errors.otp && touched.otp ? (
                                                        <InputError
                                                            className='input-error mt-2'
                                                            errorTitle={errors.otp}
                                                        />
                                                    ) : null}
                                                </div>
                                            </div>
                                            <ButtonTag
                                                classes={'btn-orange fw-normal mb-5 mt-1 px-5'}
                                                value={submitText}
                                                disabled={isSubmitDisable}
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

export default Otp
