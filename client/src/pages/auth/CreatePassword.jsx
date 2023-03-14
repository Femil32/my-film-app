import { Esy, Info } from '../../components/AllSvgs'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    H1Tag,
    PTag,
    InputTag,
    ButtonTag,
    BackButton,
    ATag,
} from '../../components/designComponents/MicroComponents'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import InputError from '../../components/common/InputError'

const CreatePassword = () => {
    const navigate = useNavigate()
    const [isVisiblePassword, setVisiblePassword] = useState(false)
    const [isVisibleConfirmPassword, setVisibleConfirmPassword] = useState(false)

    //Submit
    const onSubmitForm = values => {
        // event.preventDefault();
        navigate('/auth/successful')
    }

    const onPasswordClick = () => {
        if (isVisiblePassword == true) {
            setVisiblePassword(false)
        } else {
            setVisiblePassword(true)
        }
    }

    const onConfirmPasswordClick = () => {
        if (isVisibleConfirmPassword == true) {
            setVisibleConfirmPassword(false)
        } else {
            setVisibleConfirmPassword(true)
        }
    }

    return (
        <>
            <div className='d-flex flex-column justify-content-between h-100'>
                {/* Back Button Start */}
                <div className='mb-5'>
                    <BackButton src='/auth/verify' title='New Password' />
                </div>

                <div className='mb-3'>
                    <H1Tag
                        title='Create Password'
                        classes='page-heading text-dark-blue fw-bolder'
                    />
                    <PTag texts='Will keep it safe.' classes='text-dark-gray' />
                </div>

                <Formik
                    initialValues={{
                        password: '',
                        confirmPassword: '',
                    }}
                    validationSchema={Yup.object().shape({
                        password: Yup.string().required('enter password'),
                        confirmPassword: Yup.string()
                            .oneOf([Yup.ref('password'), null], 'Passwords must match')
                            .required('Confirm Password is required'),
                    })}
                    onSubmit={values => {
                        onSubmitForm(values)
                    }}
                >
                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                        <>
                            <Form
                                onSubmit={handleSubmit}
                                className='d-flex flex-column justify-content-between h-100'
                            >
                                <div className='sign-inputs'>
                                    <label
                                        className={`sign-input ${errors.password && touched.password
                                                ? `error-inputs`
                                                : null
                                            } w-100`}
                                    >
                                        {/* Text Input Container */}
                                        <div className='form-control d-flex'>
                                            <InputTag
                                                name='password'
                                                type={isVisiblePassword ? 'text' : 'password'}
                                                placeholder='New password'
                                                classes='w-100'
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.password}
                                            />
                                            <ATag
                                                classes={''}
                                                children={
                                                    <Esy
                                                        width='24'
                                                        height='24'
                                                        className='pointer'
                                                    />
                                                }
                                                onClick={onPasswordClick}
                                            />
                                        </div>
                                        <div className='input-error mt-2'>
                                            {errors.password && touched.password ? (
                                                <InputError
                                                    className='input-error mt-2'
                                                    errorTitle={errors.password}
                                                />
                                            ) : null}
                                        </div>
                                    </label>
                                    <label
                                        className={`sign-input ${errors.confirmPassword && touched.confirmPassword
                                                ? `error-inputs`
                                                : null
                                            } w-100`}
                                    >
                                        {/* Text Input Container */}
                                        <div className='form-control d-flex'>
                                            <InputTag
                                                name='confirmPassword'
                                                type={
                                                    isVisibleConfirmPassword ? 'text' : 'password'
                                                }
                                                placeholder='Re-type password'
                                                classes='w-100'
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.confirmPassword}
                                            />
                                            <ATag
                                                classes={''}
                                                children={
                                                    <Esy
                                                        width='24'
                                                        height='24'
                                                        className='pointer'
                                                    />
                                                }
                                                onClick={onConfirmPasswordClick}
                                            />
                                        </div>
                                        <div className='input-error mt-2'>
                                            {errors.confirmPassword && touched.confirmPassword ? (
                                                <InputError
                                                    className='input-error mt-2'
                                                    errorTitle={errors.confirmPassword}
                                                />
                                            ) : null}
                                        </div>
                                    </label>
                                </div>
                                {/* Button Start */}
                                <ButtonTag classes='btn btn-orange w-100' value='Continue' />
                            </Form>
                        </>
                    )}
                </Formik>
            </div>
        </>
    )
}

export default CreatePassword
