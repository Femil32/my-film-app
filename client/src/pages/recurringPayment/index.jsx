import React, { useState } from 'react';
import { BackButton, ButtonTag, InputTag, PTag } from '../../components/designComponents/MicroComponents'
import Select from 'react-select'
import RecurringPaymentAdded from './RecurringPaymentAdded';
import { useNavigate } from 'react-router-dom';

export default function RecurringPayment() {

    const navigation = useNavigate()
    const [value, onChange] = useState(new Date());
    const [show, setShow] = useState(false)

    const options = [
        { value: 'MonDay', label: 'MonDay' },
        { value: 'Tuesday', label: 'Tuesday' },
        { value: 'Wednesday', label: 'Wednesday' },
        { value: 'Thursday', label: 'Thursday' },
        { value: 'Firday', label: 'Firday' },
        { value: 'Saturday', label: 'Saturday' },
        { value: 'Sunday', label: 'Sunday' }
    ];

    return (
        <>
            <div className="container">
                <div className="">
                    <BackButton title={'Recurring Payment'}
                        onClick={() => {
                            navigation('/dashboard/')
                        }} />
                </div>
                <div className="max-w-625 mx-auto">
                    <div className="row mt-4">
                        <div className="col-12">
                            <InputTag classes={'form-control mb-2'} placeholder={'Amount'} />
                        </div>
                    </div>
                    <div className="row">
                        <PTag classes={'text-dark-blue fw-bold fn-16 my-2'} texts={'Repeat Every'} />
                        <div className="col-lg-6">
                            <InputTag classes={'form-control mb-2'} placeholder={'1'} />
                        </div>
                        <div className="col-lg-6">
                            <Select className={'form-control p-0 pt-1  mb-2'} placeholder={'Week'} options={options} />
                        </div>
                    </div>
                    <div className="row">
                        <div className='weeklyday'>
                            <div className="d-flex justify-content-evenly align-items-center border rounded-10 p-2">
                                <div className="bg-light-blue w-40 h-40 rounded d-flex align-items-center justify-content-center">
                                    <PTag classes={'text-white'} texts={'S'} />
                                </div>
                                <div className="bg-light-blue w-40 h-40 rounded d-flex align-items-center justify-content-center">
                                    <PTag classes={'text-white'} texts={'M'} />
                                </div>
                                <div className="bg-light-blue w-40 h-40 rounded d-flex align-items-center justify-content-center">
                                    <PTag classes={'text-white'} texts={'T'} />
                                </div>
                                <div className="bg-dark w-40 h-40 rounded d-flex align-items-center justify-content-center">
                                    <PTag classes={'text-white'} texts={'W'} />
                                </div>
                                <div className="bg-light-blue w-40 h-40 rounded d-flex align-items-center justify-content-center">
                                    <PTag classes={'text-white'} texts={'T'} />
                                </div>
                                <div className="bg-light-blue w-40 h-40 rounded d-flex align-items-center justify-content-center">
                                    <PTag classes={'text-white'} texts={'F'} />
                                </div>
                                <div className="bg-light-blue w-40 h-40 rounded d-flex align-items-center justify-content-center">
                                    <PTag classes={'text-white'} texts={'S'} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <div className='position-relative'>
                                <div className="h-60 border rounded-10 my-3"></div>
                                <div className="mt-2">
                                    <PTag classes={'text-dark-blue fw-bold fn-16'} texts={'Select Date'} />
                                </div>
                                <div className='Customcalendar max-w-370 mx-auto my-3'>
                                    {/* <Calendar onChange={onChange} value={value} /> */}
                                </div>
                            </div>
                        </div>
                        <div className="col-12 d-flex justify-content-center">
                            <div className="mt-2 mb-4">
                                <ButtonTag classes={'btn-orange'} value={"Continue"}
                                    onClick={() => setShow(true)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <RecurringPaymentAdded show={show} setShow={setShow} />
            </div>
        </>
    )
}
