import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ProfilePictureSeven } from '../../assets/img'
import { CreditCard, SuccessfulIcon } from '../../components/AllSvgs'
import { BackButton, ButtonTag, H1Tag, ImgTag, PTag } from '../../components/designComponents/MicroComponents'
import { HiOutlineDocumentDownload } from 'react-icons/hi'


export default function ResourceBooked() {

    const navigation = useNavigate()

    return (
        <>
            <div className="container">
                <div className="">
                    <BackButton
                        title={'Resource Booked'}
                        onClick={() => {
                            navigation('/dashboard/recurringpayment')
                        }}
                    />
                </div>
                <div className="row max-w-625 mx-auto mt-5">

                    <SuccessfulIcon />
                    <div className="text-center mb-4">
                        <H1Tag classes={'text-dark-blue'} title={'Resource Booked'} />
                        <PTag classes={''} texts={'Thank you for booking artist'} />
                    </div>
                    <div className="card p-3  rounded-10 mb-5">
                        <div className="d-flex align-items-center">
                            <div className="w-80 h-80">
                                <ImgTag src={ProfilePictureSeven} classes={'w-100 h-100'} />
                            </div>
                            <div className='ms-3'>
                                <PTag classes={'text-dark-blue fn-18 fw-bold'} texts={'Aakash Shah'} />
                                <PTag classes={'text-dark-blue'} texts={'category > subcategory'} />
                            </div>
                        </div>
                        <div className="text-center">
                            <PTag classes={'text-red fw-bold my-2'} texts={'Cancel/Modify Order'} />
                        </div>
                        <div className='mt-2'>
                            <ButtonTag classes={'d-flex align-items-center btn btn-lite-white semibold justify-content-center w-100'} value={
                                <>
                                    <HiOutlineDocumentDownload fontSize={22}
                                        className={'HiOutlineDocumentDownload'}
                                    />
                                    <PTag classes={'ms-2'} texts={' Dowanload Invoice'} />
                                </>
                            } />
                        </div>
                    </div>
                    <div className="card p-3 rounded-10 mb-5">
                        <div className="d-flex align-items-center">
                            <div className="w-80 h-80">
                                <ImgTag src={ProfilePictureSeven} classes={'w-100 h-100'} />
                            </div>
                            <div className='ms-3'>
                                <PTag classes={'text-dark-blue fn-18 fw-bold'} texts={'Aakash Shah'} />
                                <PTag classes={'text-dark-blue'} texts={'Vanity van'} />
                                <PTag classes={'text-dark-blue'} texts={'category > subcategory'} />
                            </div>
                        </div>
                        <div className='my-2'>
                            <div className="d-flex text-red">
                                <CreditCard width={"14"} />
                                <PTag classes={'ms-2'} texts={'Next Payment - 27 oct, 2021'} />
                            </div>
                            <PTag classes={''} texts={'Payment Amount - ₹20,000'} />
                        </div>
                        <div className="text-center">
                            <PTag classes={'text-red fw-bold my-2'} texts={'Cancel/Modify Order'} />
                        </div>
                        <div className='mt-2'>
                            <ButtonTag classes={'d-flex align-items-center btn btn-lite-white semibold justify-content-center w-100'} value={
                                <>
                                    <HiOutlineDocumentDownload fontSize={22}
                                        className={'HiOutlineDocumentDownload'}
                                    />
                                    <PTag classes={'ms-2'} texts={' Dowanload Invoice'} />
                                </>
                            } />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
