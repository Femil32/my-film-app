import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import React from 'react'
import { Modal } from 'react-bootstrap'
import { ButtonTag, DefaultPhoneInput, InputTag, PTag } from '../../components/designComponents/MicroComponents'
import InputError from '../../components/common/InputError'
//icons
import { MdClose } from 'react-icons/md'
import { isValidPhoneNumber } from 'react-phone-number-input'
import { parsePhoneNumber } from 'react-phone-number-input'
import { toast } from 'react-toastify'
import { commonMsg } from '../../components/common/ValidationConstants'
import { useDispatch } from 'react-redux'
import { setReviewData } from '../../store/review/slice'

const EnterDetail = ({ show, setShow, setReviewModel }) => {

    const dispatch = useDispatch()

    const handleSubmit = (values) => {
        let payload = { ...values }
        if (isValidPhoneNumber(values.guestMobile)) {
            const { nationalNumber, countryCallingCode } = parsePhoneNumber(values.guestMobile)
            payload.guestCountryCode = '+' + countryCallingCode
            payload.guestMobile = nationalNumber
            dispatch(setReviewData(payload))
            setReviewModel(true)
            setShow(false)
        } else {
            toast.error(commonMsg.mobileNotvalid)
        }
    }

    return (
        <>
            <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName='modal-dialog-scrollable max-w-400'
            >
                <div
                    className='text-white fs-4 bg-navy-blue w50 h50 d-flex justify-content-center align-items-center rounded-circle pointer close-icon'
                    onClick={() => setShow(false)}
                >
                    <MdClose fontSize={30} className={'Md-Close'} />
                </div>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            guestName: '',
                            guestEmail: '',
                            guestCountryCode: '',
                            guestMobile: '',
                            Associated: ''
                        }}
                        validationSchema={Yup.object().shape({
                            guestName: Yup.string().required('please Enter Name').min(2),
                            guestEmail: Yup.string().email('Please enter valid Email').required('please Enter Email'),
                            guestCountryCode: Yup.string(),
                            guestMobile: Yup.string().required('please Enter Mobile'),
                            Associated: Yup.string().required('please Enter Associated').min(3)
                        })}
                        onSubmit={(values, action) => {
                            handleSubmit(values)
                        }}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            setFieldValue,
                        }) => (
                            <Form>
                                <div className="row">
                                    <div>
                                        <PTag classes={'text-dark-blue fw-bold fn-22 text-center'} texts={'Enter Details'} />
                                    </div>
                                    <div className={`sign-input ${errors.guestName && touched.guestName ?
                                        ` error-inputs ` : ``} my-3`}>
                                        <InputTag
                                            name={'guestName'}
                                            classes={'form-control'}
                                            placeholder={'Your Name'}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {errors.guestName && touched.guestName ?
                                            (<InputError className={'input-error mt-2'} errorTitle={errors.guestName} />) : null}
                                    </div>
                                    <div className={`sign-input ${errors.guestEmail && touched.guestEmail ?
                                        ` error-inputs ` : ``} mb-3`}>
                                        <InputTag
                                            classes={'form-control'}
                                            placeholder={'Enter Email'}
                                            name={"guestEmail"}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {errors.guestEmail && touched.guestEmail ?
                                            (<InputError className={'input-error mt-2'} errorTitle={errors.guestEmail}
                                            />) : null}
                                    </div>
                                    <div className={`sign-input d-flex position-relative ${errors.guestMobile && touched.guestMobile ?
                                        ` error-inputs ` : ``}mb-3`}>
                                        <DefaultPhoneInput
                                            className={'form-control p-3'}
                                            value={values.guestMobile}
                                            onBlur={handleBlur('guestMobile')}
                                            onChange={(value) => {
                                                value !== undefined ? setFieldValue('guestMobile', value) : setFieldValue('guestMobile', '')
                                            }}
                                        />
                                    </div>
                                    {errors.guestMobile && touched.guestMobile ?
                                        (<InputError className={'input-error mb-2'} errorTitle={errors.guestMobile}
                                        />) : null}
                                    <div className={`sign-input ${errors.Associated && touched.Associated ?
                                        ` error-inputs ` : ``} mb-3`}>
                                        <InputTag
                                            classes={'form-control'}
                                            placeholder={'Associated as'}
                                            name={'Associated'}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {errors.Associated && touched.Associated ?
                                            (<InputError className={'input-error mt-2'} errorTitle={errors.Associated}
                                            />) : null}
                                    </div>
                                    <div className="d-flex justify-content-center mt-4">
                                        <ButtonTag type="submit" classes={'btn-orange w-100'} value={'Continue'} />
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default EnterDetail