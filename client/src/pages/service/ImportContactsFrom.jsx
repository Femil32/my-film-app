import { Form, Formik } from 'formik'
import React from 'react'
import { Modal } from 'react-bootstrap'
import {
    FaceBookIcon,
    Google,
    InstagramIcon,
    Twitter,
} from '../../components/AllSvgs'
import { ATag, ButtonTag, InputTag, PTag } from '../../components/designComponents/MicroComponents'
import * as Yup from 'yup'
import InputError from '../../components/common/InputError'
//icons
import { MdClose } from 'react-icons/md'
import { FiChevronRight } from 'react-icons/fi'

const ImportContactsFrom = ({ show, setShow }) => {
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
                    <div>
                        <PTag classes={'text-dark-blue fn-16 fw-bold'} texts={'Transfer Money'} />
                        <PTag
                            classes={'text-dark-gray mb-4'}
                            texts={'Insert Contacts From Given Platforms Below'}
                        />
                        <div className='d-flex justify-content-between mb-3'>
                            <ATag classes={'pointer'}>
                                <Google width={40} height={40} />
                            </ATag>
                            <ATag classes={'pointer'}>
                                <Twitter width={40} height={40} />
                            </ATag>
                            <ATag classes={'pointer'}>
                                <FaceBookIcon width={40} height={40} />
                            </ATag>
                            <ATag classes={'pointer'}>
                                <InstagramIcon width={40} height={40} />
                            </ATag>
                        </div>
                        <div className='divider text-center'>
                            <div className='text-dark-blue fw-bold fn-18'>Or</div>
                        </div>
                        <div>
                            <PTag
                                classes={'text-dark-gray mb-3'}
                                texts={'Ask Through Email or Phone'}
                            />
                            <div className='mb-3'>
                                <Formik
                                    initialValues={{
                                        enter_amount: '',
                                        mobil_number: '',
                                    }}
                                    validationSchema={Yup.object().shape({
                                        mobil_number: Yup.string()
                                            .min(7, 'Phone number is not valid')
                                            .required('Please enter mobil number'),
                                    })}
                                    onSubmit={values => {
                                        onSubmitForm(values)
                                    }}
                                >
                                    {({ values, errors, touched, handleSubmit, handleChange }) => (
                                        <>
                                            <Form onSubmit={handleSubmit}>
                                                <div className=''>
                                                    <div
                                                        className={`sign-input ${errors.mobil_number &&
                                                            touched.mobil_number
                                                            ? `error-inputs `
                                                            : null
                                                            } mb-3`}
                                                    >
                                                        <InputTag
                                                            placeholder={'Email / Phone Number'}
                                                            classes={'form-control'}
                                                            name={'mobil_number'}
                                                            type={'number'}
                                                            value={values.mobil_number}
                                                            onChange={handleChange}
                                                        />
                                                        {errors.mobil_number &&
                                                            touched.mobil_number ? (
                                                            <InputError
                                                                className='input-error mt-2'
                                                                errorTitle={errors.mobil_number}
                                                            />
                                                        ) : null}
                                                    </div>
                                                    <div className='text-center'>
                                                        <ButtonTag
                                                            type={'submit'}
                                                            classes={
                                                                'btn-dark-blue semibold rounded px-4'
                                                            }
                                                            value={'Send'}
                                                        />
                                                    </div>
                                                </div>
                                            </Form>
                                        </>
                                    )}
                                </Formik>
                            </div>
                            <ATag
                                classes={
                                    'pointer block border-dark-blue rounded-10 d-flex justify-content-between align-items-center px-4 py-3'
                                }
                            >
                                <PTag
                                    classes={'text-dark-blue bold fn-16'}
                                    texts={'Ask From Phone Book'}
                                />
                                <FiChevronRight fontSize={25} color={'#1a3556'} />
                            </ATag>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ImportContactsFrom
