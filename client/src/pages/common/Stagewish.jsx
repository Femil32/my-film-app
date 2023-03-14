import { Button } from 'bootstrap'
import { ErrorMessage, Form, Formik } from 'formik'
import * as Yup from 'yup'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Edit } from '../../components/AllSvgs'
import { ATag, BackButton, ButtonTag, InputTag, PTag } from '../../components/designComponents/MicroComponents'
import InputError from '../../components/common/InputError'
//icons
import { MdDelete } from 'react-icons/md'
import { SingleDatePicker } from '../../components/DateAndTime'

export default function Stagewish() {

    const navigation = useNavigate()

    const handleSubmit = value => {
    }

    return (
        <>
            <div className="container">
                <div className="">
                    <BackButton
                        title={'Stage Wish'}
                        onClick={() => {
                            navigation('/dashboard/negotiate')
                        }}
                    />
                </div>
                <div className="max-w-625 mx-auto mt-4">
                    <Formik
                        initialValues={{
                            Description: '',
                            SelectDate: '',
                            AddEnterPercentage: '',
                        }}
                        validationSchema={Yup.object().shape({
                            Description: Yup.string().required('Please Add Description'),
                            SelectDate: Yup.date().nullable(),
                            AddEnterPercentage: Yup.string().required('Please Enter Percentage'),
                        })}
                        onSubmit={handleSubmit}>
                        {({ values,
                            errors,
                            touched,
                            handleChange,
                            setFieldValue,
                            handleBlur,
                            handleSubmit,
                            isSubmitting, }) => (<Form>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className={`sign-input ${errors.Description && touched.Description
                                            ? `error-inputs ` : ``}mb-3`}>
                                            <InputTag classes={'form-control'}
                                                name='Description'
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                placeholder={'Description'} />
                                            {errors.Description && touched.Description
                                                ? (<InputError className={'input-error mt-2'}
                                                    errorTitle={errors.Description}
                                                />) : null}
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className={`sign-input ${errors.SelectDate && touched.SelectDate ?
                                            ` error-inputs ` : ``}mb-3`}>
                                            <div className='datePicker-input'>
                                                <SingleDatePicker
                                                    minDate={'beforeToday'}
                                                    containerClassName={'w-100 form-control'}
                                                    placeholder={'Select Date'}
                                                    name='SelectDate'
                                                    inputClass={'px-3 py-2'}
                                                    className={'w-100 form-control d-flex justify-content-between align-middle'}
                                                    value={values.SelectDate}
                                                    onChange={val => {
                                                        setFieldValue('SelectDate', new Date(val))
                                                    }}

                                                />
                                                {errors.SelectDate && touched.SelectDate
                                                    ? (<InputError className={'input-error mt-2'}
                                                        errorTitle={errors.SelectDate}
                                                    />) : null}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className={`sign-input ${errors.AddEnterPercentage && touched.AddEnterPercentage
                                            ? ` error-inputs ` : ``}mb-3`}>
                                            <InputTag classes={'form-control'}
                                                type='number'
                                                name='AddEnterPercentage'
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                placeholder={'Enter Percentage%'} />
                                            {errors.AddEnterPercentage && touched.AddEnterPercentage ?
                                                (<InputError className={'input-error mt-2'}
                                                    errorTitle={errors.AddEnterPercentage} />) : null}
                                        </div>
                                    </div>
                                    <div className="col-12 d-flex justify-content-center">
                                        <ButtonTag classes={'btn-extra-lite-green semibold  mt-2'}
                                            type='submit'
                                            value={'Add'} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="py-3 d-flex align-items-center justify-content-between border-bottom">
                                            <div className="">
                                                <PTag classes={'text-dark-blue fw-bold'} texts={'Description'} />
                                                <PTag texts={'Mar 23, 10%'} />
                                            </div>
                                            <div className="">
                                                <ATag className={'me-3'} >
                                                    <Edit width={'24'} />
                                                </ATag>
                                                <ATag>
                                                    <MdDelete className={'Md-Delete'} />
                                                </ATag>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <ButtonTag classes={'btn-extra-lite-green semibold my-2'} value={'+ Add More'} />
                                    </div>
                                </div>
                            </Form>)}

                    </Formik>

                    <Formik initialValues={{
                        AddMoreDescription: '',
                        AddMoreSelectDate: '',
                        AddMoreEnterPercentage: '',
                    }}
                        validationSchema={Yup.object().shape({
                            AddMoreDescription: Yup.string().required('Please Add Description'),
                            AddMoreSelectDate: Yup.date().nullable(),
                            AddMoreEnterPercentage: Yup.string().required('Please Add Enter Percentage')
                        })}
                    >
                        {({ values, errors,
                            touched,
                            handleChange,
                            setFieldValue,
                            handleBlur, }) => (
                            <Form>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className={`sign-input ${errors.AddMoreDescription && touched.AddMoreDescription ?
                                            ` error-inputs ` : ``}mb-3`}>
                                            <InputTag classes={'form-control'}
                                                name='AddMoreDescription'
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                placeholder={'Description'} />
                                            {errors.AddMoreDescription && touched.AddMoreDescription
                                                ? (<InputError className='input-error mt-2' errorTitle={errors.AddMoreDescription} />) : null}
                                        </div>
                                    </div>
                                    {/* DatePicker validation error */}
                                    <div className="col-lg-6">
                                        <div className={`sign-input ${errors.AddMoreSelectDate && touched.AddMoreSelectDate ?
                                            ` error-inputs ` : ``}mb-3`}>
                                            <div className='datePicker-input'>
                                                <SingleDatePicker
                                                    name='AddMoreSelectDate'
                                                    minDate={'beforeToday'}
                                                    containerClassName={'w-100 form-control'}
                                                    placeholder={'Select Date'}
                                                    inputClass={'px-3 py-2'}
                                                    className={'w-100 form-control d-flex justify-content-between align-middle'}
                                                    value={values.AddMoreSelectDate}
                                                    onChange={val => {
                                                        setFieldValue('AddMoreSelectDate', new Date(val))
                                                    }}
                                                />
                                                {errors.AddMoreSelectDate && touched.AddMoreSelectDate
                                                    ? (<InputError className={'input-error mt-2'}
                                                        errorTitle={errors.AddMoreSelectDate}
                                                    />) : null}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className={`sing-input ${errors.AddMoreEnterPercentage && touched.AddMoreEnterPercentage ?
                                            ` error-inputs ` : ``}mb-3`}>
                                            <InputTag classes={'form-control mb-2'}
                                                name='AddMoreEnterPercentage'
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                placeholder={'Enter Percentage%'} />
                                            {errors.AddMoreEnterPercentage && touched.AddMoreEnterPercentage
                                                ? (<InputError errorTitle={errors.AddMoreEnterPercentage} />) : null}
                                        </div>
                                    </div>
                                    <div className="col-12 d-flex justify-content-center mb-4">
                                        <ButtonTag classes={'btn-orange semibold mt-2'}
                                            onChange={e => e.preventDefault()} value={'Continue'} />
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    )
}
