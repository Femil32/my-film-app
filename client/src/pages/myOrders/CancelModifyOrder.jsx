import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ImageEleven } from '@/assets/img'
import Select from 'react-select'
import { BackButton, ButtonTag, ImgTag, InputTag, LabelTag, PTag } from '@/components/designComponents/MicroComponents'
import { useDispatch, useSelector } from 'react-redux'
import { crewProfileCost } from '@/store/crew/slice'
import IsLoadingHOC from '@/components/higherOrderLoader/IsLoadingHOC'
import InputError from '@/components/common/InputError'
import { locationProfileCost } from '@/store/location/slice'
import { serviceProfileCost } from '@/store/service/slice'
import { talentProfileCost } from '@/store/talent/slice'
import { CustomDatePicker } from '@/components/DateAndTime'
import { setDropOptions } from '@/helpers/functions'
import { AddAvlCheck } from '../../store/order/slice'
import { getRequestedAvailabilityById } from '../../store/requestavailability/slice'


const CancelModifyOrder = ({ setLoading }) => {

    const navigation = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const { profileOrderId } = location.state ?? false

    const [profileCost, setProfileCost] = useState(null)
    const [count, setCount] = useState(1)
    const [numberOfDays, setNumberOfDays] = useState({
        validDays: 0,
        userInput: 1
    })
    const [dates, setDates] = useState(null)
    const [itemsSubTotal, setItemsSubTotal] = useState(null)
    const [OrderSummary, setOrderSummary] = useState({
        "subtotalAmount": 0,
        'advanceAmount': 0,
        'onDeliveryAmount': 0,
        'taxAmount': 0,
        "totalAmount": 0
    })
    // project types
    const [projectTypes, setProjectTypes] = useState([])
    const [projectType, setProjectType] = useState(null)

    const { bookProfile, requestAvailabilityById } = useSelector(store => store.requestavailability)

    useEffect(() => {
        dispatch(getRequestedAvailabilityById(profileOrderId))
    }, [])

    console.log(requestAvailabilityById)

    useEffect(() => {
        switch (bookProfile?.categoryName) {
            case 'crew':
                dispatch(crewProfileCost(bookProfile?.profileId)).then(res => {
                    setProfileCost(res?.payload?.data)
                    setProjectTypes(res?.payload?.data?.profileCosts.map(type => {
                        return setDropOptions(type, 'rateLabel', 'rateType')
                    }))
                })
                break;
            case 'locations':
                dispatch(locationProfileCost(bookProfile?.profileId)).then(res => {
                    setProfileCost(res?.payload?.data)
                    setProjectTypes(res?.payload?.data?.profileCosts.map(type => {
                        return setDropOptions(type, 'rateLabel', 'rateType')
                    }))
                })
                break;
            case 'services':
                dispatch(serviceProfileCost({ serviceProfileId: bookProfile?.profileId, inventoryId: bookProfile?.inventoryId })).then(res => {
                    setProfileCost(res?.payload?.data)
                    setProjectTypes(res?.payload?.data?.profileCosts.map(type => {
                        return setDropOptions(type, 'rateLabel', 'rateType')
                    }))
                })
                break;
            case 'talent':
                dispatch(talentProfileCost(bookProfile?.profileId)).then(res => {
                    setProfileCost(res?.payload?.data)
                    setProjectTypes(res?.payload?.data?.profileCosts.map(type => {
                        return setDropOptions(type, 'rateLabel', 'rateType')
                    }))
                })
                break;
            default:
                break;
        }
        setLoading(false)
    }, [])

    const postAvailabilityCheck = () => {
        let payload = {
            "profileId": bookProfile?.profileId,
            "profileType": bookProfile?.profileType,
            "rateType": projectType?.rateType,
            "orderCount": count,
            "bookingDates": dates
        }
        dispatch(AddAvlCheck({ payload, navigation }))
    }

    return (
        <>
            <div className="container">
                <div>
                    <BackButton
                        title={'Cancel/Modify Order'}
                        onClick={() => {
                            navigation('/search/listing', {
                                state: {
                                    keyword: bookProfile?.categoryName,
                                    keywordId: bookProfile?.categoryId,
                                }
                            })
                        }}
                    />
                </div>
                <div className="row max-w-625 mx-auto my-4">
                    <div>
                        <div className='datePicker-input '>
                            <LabelTag
                                classes={'text-gray fn-12 mb-2'}
                                text={'Select dates'}
                            />
                            <CustomDatePicker
                                multiple='true'
                                minDate={'beforeToday'}
                                inputClass={'px-3 py-2'}
                                className={
                                    'w-100 form-control d-flex justify-content-between align-middle'
                                }
                                onChange={dates => {
                                    setDates(dates.map(date => {
                                        return {
                                            "orderDate": new Date(date)
                                        }
                                    }))
                                }}
                                containerClassName={'w-100 form-control'}
                                format={'DD-MM-YYYY'}
                                placeholder={'Select Date'}
                            />
                        </div>
                    </div>
                    <div className="my-4">
                        <PTag classes={'text-dark-blue fn-18 fw-bold'} texts={`Don't Know Dates`} />
                        <PTag classes={'mt-0 fn-12'} texts={`Please enter number of days`} />
                        <div
                            className={`sign-input ${numberOfDays.userInput < 1 ? ` error-inputs ` : ``
                                } mb-3`}
                        >
                            {/* <LabelTag
                                classes={'text-gray fn-12 mb-2'}
                                text={'Night Shift Allowance'}
                                For={'nightShift'}
                            /> */}
                            <InputTag
                                classes={'form-control'}
                                type={'number'}
                                placeholder={'No of Days'}
                                onChange={(e) => {
                                    setNumberOfDays({
                                        userInput: e.target.value,
                                        validDays: e.target.value > 0 ? e.target.value : 1
                                    })
                                }}
                            />
                            {(numberOfDays.userInput < 1) && (
                                <div className='d-flex align-items-center mt-2'>
                                    <InputError
                                        className='input-error'
                                        errorTitle={'Please Enter valid days'}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <div>
                        <PTag classes={'text-dark-blue fn-16 fw-bold'} texts={'Order Details'} />
                        <div className="d-flex align-items-center justify-content-between py-3 gap-4 flex-wrap border-bottom">
                            <div className="d-flex align-items-center flex-grow-1">
                                <div className="w-65 h-65 overflow-hidden rounded-10">
                                    <ImgTag src={ImageEleven} classes={'w-100 h-100'} />
                                </div>
                                <div className="ms-3 max-w-280 w-100">
                                    <PTag classes={'text-dark-blue fn-12 fw-bold mb-2'} texts={'Select Payment Term'} />
                                    <div className='d-flex justify-content-between align-items-center gap-4'>
                                        <Select className={'form-control p-0 max-w-315 w-100'} options={projectTypes} placeholder={'Project type'} name={'ptojectType'} onChange={(e) => {
                                            setProjectType(e)
                                            setCount(1)
                                            setOrderSummary({
                                                "subtotalAmount": e?.subtotalAmount,
                                                'advanceAmount': e?.advanceAmount,
                                                'onDeliveryAmount': e?.onDeliveryAmount,
                                                'taxAmount': e?.taxAmount,
                                                "totalAmount": e?.totalAmount
                                            })
                                        }} />

                                    </div>
                                </div>
                                <div className="d-flex flex-column align-items-start fw-bold text-dark-blue user-select-none ms-auto">
                                    {projectType &&
                                        <>
                                            <PTag classes={'text-dark-blue fn-14 fw-bold mb-2'} texts={`${projectType.countDropdownLabel || 'Project'}`} />
                                            <div className='d-flex align-items-center fw-bold text-dark-blue user-select-none'>
                                                <div className="pointer bg-white d-flex align-items-center justify-content-center rounded-pill shadow w-40 h-40" onClick={() => {
                                                    if (count > 1) {
                                                        setCount(count - 1)
                                                        setItemsSubTotal((count - 1) * projectType.subtotalAmount)
                                                    }
                                                }}>
                                                    <PTag classes={''} texts={'-'} />
                                                </div>
                                                <div className="mx-3 text-center" style={{ width: '15px' }}>
                                                    <PTag classes={''} texts={count} />
                                                </div>
                                                <div className="pointer bg-white d-flex align-items-center justify-content-center rounded-pill shadow w-40 h-40" onClick={() => {
                                                    setCount(count + 1)
                                                    // setOrderSummary({
                                                    //     "subtotalAmount": (count + 1) * OrderSummary?.subtotalAmount,
                                                    //     'advanceAmount': OrderSummary?.advanceAmount,
                                                    //     'onDeliveryAmount': OrderSummary?.onDeliveryAmount,
                                                    //     'taxAmount': OrderSummary?.taxAmount,
                                                    //     "totalAmount": OrderSummary?.totalAmount
                                                    // })
                                                    setItemsSubTotal((count + 1) * projectType.subtotalAmount)
                                                }}>
                                                    <PTag classes={''} texts={'+'} />
                                                </div>
                                            </div>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        profileCost?.profileCosts?.map((cost, i) => {
                            return cost?.rateType === projectType?.rateType && <div key={i}>
                                <PTag classes={'text-dark-blue fn-16 fw-bold mt-3'} texts={'Order Summary'} />
                                <div>
                                    <div className="d-flex justify-content-between mt-2">
                                        <PTag classes={''} texts={'No. of Days'} />
                                        <PTag classes={'text-dark-blue fw-bold'} texts={`${numberOfDays.validDays} Days`} />
                                    </div>
                                    <div className="d-flex justify-content-between mt-2">
                                        <PTag classes={''} texts={`Items Subtotal (${count})`} />
                                        <PTag classes={'text-dark-blue fw-bold'} texts={`₹ ${(count * OrderSummary.subtotalAmount).toLocaleString('en-IN')}`} />
                                    </div>
                                    <div className="d-flex justify-content-between mt-2">
                                        <PTag classes={''} texts={`Advance (${cost?.advancePercentage}%)`} />
                                        <PTag classes={'text-dark-blue'} texts={`₹${(count * OrderSummary.advanceAmount).toLocaleString('en-IN')}`} />
                                    </div>
                                    <div className="d-flex justify-content-between mt-2">
                                        <PTag classes={''} texts={`On Delivery(${cost?.onDeliveryPercentage}%)`} />
                                        <PTag classes={'text-dark-blue'} texts={`₹${(count * OrderSummary.onDeliveryAmount).toLocaleString('en-IN')}`} />
                                    </div>
                                    <div className="d-flex justify-content-between mt-2">
                                        <PTag classes={''} texts={'Credit Period'} />
                                        <PTag classes={'text-dark-blue fw-bold'} texts={`${cost?.creditDays} Day`} />
                                    </div>
                                    <div className="d-flex justify-content-between mt-2">
                                        <PTag classes={''} texts={`GST/Taxes (${cost?.taxPercentage}%) `} />
                                        <PTag classes={'text-dark-blue fw-bold'} texts={`₹${(count * OrderSummary.taxAmount).toLocaleString('en-IN')}`} />
                                    </div>
                                </div>
                                <div>
                                    <PTag classes={'text-dark-blue fn-12 fw-bold mt-3'} texts={'Additional Charge Amount'} />
                                    <div className="d-flex justify-content-between mt-2">
                                        <PTag classes={''} texts={`Additional Charge`} />
                                        <PTag classes={'text-dark-blue fw-bold'} texts={`₹${cost?.additionalChargeAmount.toLocaleString('en-IN')}`} />
                                    </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-between py-2 mt-3 border-bottom border-top">
                                    <PTag classes={'text-dark-blue fn-16 fw-bold'} texts={'Total'} />
                                    <PTag classes={'text-dark-blue fn-16 fw-bold'} texts={((count * (OrderSummary.subtotalAmount + OrderSummary.taxAmount) + cost?.additionalChargeAmount)).toLocaleString('en-IN')} />
                                </div>
                                <ButtonTag classes={'btn-orange semibold fn-12 rounded w-100 mt-4'} value={'Send'} onClick={() => {
                                    // if (dates || (numberOfDays.validDays > 0))
                                    postAvailabilityCheck()
                                }} />
                            </div>
                        })
                    }

                </div>
            </div>
            {/* <div className="container-fluid bg-white position-fixed w-100 start-0 bottom-0 py-3">
                <div className="row">
                    <div className='d-flex'>
                        <ButtonTag classes={'btn-extra-lite-orange semibold fn-12 rounded w-100 me-2'} value={'Cancel Order'} />
                        <ButtonTag classes={'btn-orange semibold fn-12 rounded w-100 ms-2'} value={'Modify Order'} />
                    </div>
                </div>
            </div> */}
        </>
    )
}


export default IsLoadingHOC(CancelModifyOrder)