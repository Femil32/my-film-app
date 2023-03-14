import React from 'react'
import { ButtonTag, InputTag, PTag } from '../../components/designComponents/MicroComponents'
import * as Yup from 'yup'
import { Formik, Form } from 'formik'
import InputError from '../../components/common/InputError'
import { Modal } from 'react-bootstrap'
//icons
import { MdClose } from 'react-icons/md'

export const TransferMoney = ({ show, setShow }) => {
    return (
        <>
            <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName='modal-dialog-scrollable'
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
                            enter_amount: '',
                            mobil_number: '',
                        }}
                        validationSchema={Yup.object().shape({
                            enter_amount: Yup.string().required('Please enter amount'),
                            mobil_number: Yup.string()
                                .min(7, 'Phone number is not valid')
                                .required('Please enter mobil number'),
                        })}
                        onSubmit={values => {
                            onSubmitForm(values)
                        }}
                    >
                        {({ values, errors, touched, handleSubmit, handleChange, handleBlur }) => (
                            <>
                                <Form onSubmit={handleSubmit}>
                                    <div className=''>
                                        <div className='text-center mb-3'>
                                            <PTag
                                                classes={'text-dark-blue fn-16 fw-bold'}
                                                texts={'Transfer Money'}
                                            />
                                        </div>
                                        <div>
                                            <div className='border rounded-16 d-flex align-items-center justify-content-between p-3 mb-3'>
                                                <PTag
                                                    classes={'text-dark-gray'}
                                                    texts={'Wallet Balance'}
                                                />
                                                <PTag
                                                    classes={'text-dark-blue fw-bold fn-18 mt-0'}
                                                    texts={'₹5000'}
                                                />
                                            </div>
                                            <div
                                                className={`sign-input ${errors.enter_amount && touched.enter_amount
                                                    ? `error-inputs `
                                                    : null
                                                    } mb-3`}
                                            >
                                                <div
                                                    className={`d-flex position-relative`}
                                                >
                                                    <PTag
                                                        classes={
                                                            'text-dark-blue fw-bold fn-20 me-2 input-add-icon-left'
                                                        }
                                                        texts={'₹'}
                                                    />
                                                    <InputTag
                                                        placeholder={'Enter amount'}
                                                        classes={'w-100 form-control input-plachholder-paddingleft'}
                                                        name={'enter_amount'}
                                                        type={'number'}
                                                        value={values.enter_amount}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                    />
                                                </div>
                                                {errors.enter_amount && touched.enter_amount ? (
                                                    <InputError
                                                        className='input-error mt-2'
                                                        errorTitle={errors.enter_amount}
                                                    />
                                                ) : null}
                                            </div>
                                            <div
                                                className={`sign-input ${errors.mobil_number && touched.mobil_number
                                                    ? `error-inputs `
                                                    : null
                                                    } mb-3`}
                                            >
                                                <InputTag
                                                    placeholder={'Enter Phone Number'}
                                                    classes={'form-control'}
                                                    name={'mobil_number'}
                                                    type={'number'}
                                                    value={values.mobil_number}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                                {errors.mobil_number && touched.mobil_number ? (
                                                    <InputError
                                                        className='input-error mt-2'
                                                        errorTitle={errors.mobil_number}
                                                    />
                                                ) : null}
                                            </div>
                                            <div>
                                                <ButtonTag
                                                    classes={'btn-orange bold w-100'}
                                                    value={'Continue'}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </Form>
                            </>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>
        </>
    )
}
