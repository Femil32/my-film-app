// inport AllSvgs
import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import InputError from '../../components/common/InputError'
import { useNavigate } from 'react-router-dom'
import {
    ButtonTag,
    H1Tag,
    InputTag,
    PTag,
    BackButton,
} from '../../components/designComponents/MicroComponents'

const ResetPassword = () => {
    const navigate = useNavigate()
    //State
    const [formIsValid, setFormIsValid] = useState(true)
    const [email, setEmail] = useState('')

    //Submit
    const onSubmitForm = values => {
        navigate('/auth/verify')
    }

    //Validation Email
    const validateEmail = value => {
        let error
        if (!value) {
            error = 'Enter Email'
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
            error = 'Please enter a valid email address'
        }
        return error
    }

    //Yup Schema
    const ResetPasswordSchema = Yup.object().shape({
        email: Yup.string().email('invalid email address').required('enter email'),
    })

    return (
        <>
            <BackButton title={'Reset Password'} />

            <div className='mt-5 mb-3'>
                <H1Tag title='Reset Password' classes='page-heading text-dark-blue fw-bolder' />
                <PTag
                    classes='text-dark-gray'
                    texts=" Enter email / phone number associated with your account, we'll send you verification code"
                />
            </div>

            <Formik
                initialValues={{
                    email: '',
                }}
                validationSchema={ResetPasswordSchema}
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
                                    className={`sign-input ${errors.email && touched.email ? `error-inputs` : null
                                        } w-100`}
                                >
                                    <InputTag
                                        name='email'
                                        classes={'form-control'}
                                        type={'text'}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                        validate={validateEmail}
                                        placeholder={'email / phone'}
                                    />
                                    {errors.email && touched.email ? (
                                        <InputError
                                            className='input-error mt-2'
                                            errorTitle={errors.email}
                                        />
                                    ) : null}
                                </label>
                            </div>
                            <ButtonTag
                                type='submit'
                                classes={'btn btn-orange w-100'}
                                disabled={errors.email && touched.email}
                                value={'Send'}
                            />
                        </Form>
                    </>
                )}
            </Formik>
        </>
    )
}

export default ResetPassword
