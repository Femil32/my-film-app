import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ProfilePictureTwo } from '../../assets/img'
import { Alaramicon, RightChevron } from '../../components/AllSvgs'
import { BackButton, ButtonTag, ImgTag, PTag } from '../../components/designComponents/MicroComponents'
import TotalViewCart from '../totalViewCart'

export default function FuturePayments(props) {

    const navigation = useNavigate()

    const FuturePaymentsCard = [1, 2, 3, 4, 5]

    return (
        <>
            <div className="container">
                <div className="">
                    <BackButton
                        title={'Future Payments'}
                        onClick={() => {
                            navigation('/dashboard')
                        }}
                    />
                </div>
                <div className='row align-items-center justify-content-between my-4'>
                    {FuturePaymentsCard.map((e, index) =>
                        <div className='col-lg-6' key={index}>
                            <div className='card rounded-16 p-3 my-3' >
                                <div className="d-flex align-items-center justify-content-between flex-wrap">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div className='max-w-40 w-100 h-40 rounded-5 overflow-hidden'>
                                            <ImgTag
                                                src={ProfilePictureTwo}
                                                alt={'profile'}
                                                classes={'img-fluid'}
                                            />
                                        </div>
                                        <div className='ms-2 w-100'>
                                            <PTag
                                                classes={'text-dark-blue fw-bold fn-16'}
                                                texts={'Harsh Mehta'}
                                            />
                                            <div className='d-flex align-items-center'>
                                                <PTag
                                                    classes={'text-dark-blue me-1'}
                                                    texts={'Category'}
                                                />
                                                <RightChevron stroke={'#1A3556'} />
                                                <PTag
                                                    classes={'text-dark-blue ms-1'}
                                                    texts={'Sub Category'}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center text-danger mt-2">
                                        <Alaramicon width={'24'} opacityFill={'#F0360F'} stroke={'#F0360F'} />
                                        <PTag classes={'px-2'} texts={'Due Date - Today'} />
                                    </div>
                                </div>
                                <div className='mt-4'>
                                    <TotalViewCart texts={'Pay Now'} />
                                </div>
                            </div>
                        </div>
                    )}
                    <div className='col-lg-6'>
                        <div className='card rounded-16 p-3 my-3'>
                            <div className="d-flex align-items-center justify-content-between flex-wrap">
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className='max-w-40 w-100 h-40 rounded-5 overflow-hidden'>
                                        <ImgTag
                                            src={ProfilePictureTwo}
                                            alt={'profile'}
                                            classes={'img-fluid'}
                                        />
                                    </div>
                                    <div className='ms-2 w-100'>
                                        <PTag
                                            classes={'text-dark-blue fw-bold fn-16'}
                                            texts={'Harsh Mehta'}
                                        />
                                        <div className='d-flex align-items-center'>
                                            <PTag
                                                classes={'text-dark-blue me-1'}
                                                texts={'Category'}
                                            />
                                            <RightChevron stroke={'#1A3556'} />
                                            <PTag
                                                classes={'text-dark-blue ms-1'}
                                                texts={'Sub Category'}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center text-success mt-2">
                                    <Alaramicon width={'24'} opacityFill={'#198754'} stroke={'#198754'} />
                                    <PTag classes={'px-2'} texts={'Due Date - 2-oct, 2021'} />
                                </div>
                            </div>
                            <div className='mt-4'>
                                <TotalViewCart texts={'Pay Now'} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
