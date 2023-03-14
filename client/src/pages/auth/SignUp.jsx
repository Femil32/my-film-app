import { Info } from '../../components/AllSvgs'
import {
    PTag,
    H1Tag,
    BackButton,
    InputTag,
    ButtonTag,
} from '../../components/designComponents/MicroComponents'
import { Formik, Field } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import {
    FaGoogle,
    FaFacebook,
    FaLinkedinIn
} from 'react-icons'
const SignUp = () => {
    const navigate = useNavigate()
    return (
        <div className='container'>
            <div className='sign-page'>
                {/* Back Button start */}
                <BackButton src='/auth/signin' title='Sign Up' />

                <div className='my-5'>
                    {/* Heading start*/}
                    <div className='sign-head-text'>
                        <H1Tag classes='sign-head fw-bold text-dark-blue' title='Sign Up' />
                        <PTag
                            classes='sign-text text-dark-gray'
                            texts='All Your Resources To Make A Film'
                        />
                    </div>

                    {/* Form start */}
                    <Formik
                        // validation
                        initialValues={{
                            email: '',
                            name: '',
                            mobile: '',
                            IsCheckSignup: false,
                        }}
                        validationSchema={Yup.object().shape({
                            email: Yup.string()
                                .email('Please enter valid email address')
                                .required('Email is required'),
                            name: Yup.string().required('Name is required'),
                            mobile: Yup.string()
                                .required('Mobile number is required')
                                .min(10, 'At least 10 characters and a Number'),
                            IsCheckSignup: Yup.boolean().required('Is Check Reqired'),
                        })}
                        onSubmit={values => {
                            if (values.IsCheckSignup === true) {
                                navigate('/auth/otp')
                            } else {
                                alert('Please check tearm and condition')
                            }
                        }}
                    >
                        {({
                            values,
                            errors,
                            status,
                            touched,
                            handleSubmit,
                            handleChange,
                            handleBlur,
                        }) => (
                            <>
                                <form onSubmit={handleSubmit}>
                                    <div className='sign-inputs'>
                                        <div
                                            className={
                                                'sign-input w-100' +
                                                (errors.name && touched.name ? ' error-inputs' : '')
                                            }
                                        >
                                            <Field
                                                name='name'
                                                as={InputTag}
                                                type='text'
                                                classes='form-control'
                                                placeholder='Enter name'
                                                value={values.name}
                                                required
                                            />

                                            {errors.name && touched.name ? (
                                                <div className='input-error mt-2'>
                                                    <Info className='error-icon' />
                                                    <PTag
                                                        name='name'
                                                        classes='ms-2'
                                                        texts={errors.name}
                                                    />
                                                </div>
                                            ) : (
                                                ''
                                            )}
                                        </div>
                                        <div
                                            className={
                                                'sign-input ' +
                                                (errors.mobile && touched.mobile
                                                    ? ' error-inputs'
                                                    : '')
                                            }
                                        >
                                            <div className='form-control d-flex align-middle plus-inputs'>
                                                <PTag
                                                    classes='text-dark-blue phone-start-number'
                                                    texts='+91'
                                                />

                                                <Field
                                                    name='mobile'
                                                    as={InputTag}
                                                    type='number'
                                                    classes='plus-input input-pass-p w-100'
                                                    placeholder='Enter number'
                                                    value={values.mobile}
                                                    required
                                                />
                                            </div>
                                            {errors.mobile && touched.mobile ? (
                                                <div className='input-error mt-2'>
                                                    <Info className='error-icon' />
                                                    <PTag
                                                        name='mobile'
                                                        classes='ms-2'
                                                        texts={errors.mobile}
                                                    />
                                                </div>
                                            ) : (
                                                ''
                                            )}
                                        </div>
                                        <div
                                            className={
                                                'sign-input w-100' +
                                                (errors.email && touched.email
                                                    ? ' error-inputs'
                                                    : '')
                                            }
                                        >
                                            <Field
                                                name='email'
                                                as={InputTag}
                                                type='email'
                                                classes='form-control'
                                                placeholder='email / phone'
                                                value={values.email}
                                                required
                                            />

                                            {errors.email && touched.email ? (
                                                <div className='input-error mt-2'>
                                                    <Info className='error-icon' />
                                                    <PTag
                                                        name='email'
                                                        classes='ms-2'
                                                        texts={errors.email}
                                                    />
                                                </div>
                                            ) : (
                                                ''
                                            )}
                                        </div>
                                    </div>
                                    <div className='form-check checkbox d-flex align-items-start mb-3'>
                                        <InputTag
                                            classes='form-check-input pointer'
                                            type='checkbox'
                                            id='login-otp'
                                            name='IsCheckSignup'
                                            value={values.IsCheckSignup}
                                            onChange={handleChange}
                                        />
                                        <label
                                            className='form-check-label text-navy-blue pointer fn-14 ms-2'
                                            htmlFor='login-otp'
                                        >
                                            By creating an account, you agree to the Terms and
                                            Conditions and Privacy Policy
                                        </label>
                                    </div>
                                    <ButtonTag
                                        type='submit'
                                        value='Sign Up'
                                        classes='btn btn-orange w-100'
                                    />
                                </form>
                            </>
                        )}
                    </Formik>
                </div>

                {/* Bottom Bar start  */}
                <div className='text-center'>
                    <PTag classes='text-dark-blue mb-3' texts='Or login with' />
                    <div className='social-bg-icon pointer mx-2'>
                        <FaGoogle className="fa-2x" />
                    </div>
                    <div className='social-bg-icon pointer mx-2'>
                        <FaFacebook className="fa-2x" />
                    </div>
                    <div className='social-bg-icon pointer mx-2'>
                        <FaLinkedinIn className="fa-2x" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp
