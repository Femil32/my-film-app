import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ProfilePictureFour, ProfilePictureSeven } from '../../assets/img'
import { BackButton, ButtonTag, ImgTag, PTag } from '../../components/designComponents/MicroComponents'
//icons
import { MdClose } from 'react-icons/md'

export default function PaymentFailed() {

    const navigation = useNavigate()

    return (
        <>
            <div className="container">
                <div className="">
                    <BackButton
                        title={'Payment Failed'}
                        onClick={() => {
                            navigation('/dashboard/')
                        }}
                    />
                </div>
                <div className="row max-w-625 mx-auto justify-content-center
                     align-items-center">
                    <div className="d-flex justify-content-center
                     align-items-center mt-4 bg-warning rounded-circle
                     w-70 h-70"
                    >
                        <MdClose fontSize={60} color={'#ffffff'} />
                    </div>
                </div>
                <div className="row max-w-625 mx-auto">
                    <div className="text-center my-3 max-w-315 mx-auto">
                        <PTag classes={'text-dark-blue fn-22 fw-bold'} texts={'Payment Failed'} />
                        <PTag classes={''} texts={'If the money is deducted it will bereversed into your payment method within 7-10 working days.'} />
                        <ButtonTag classes={'btn btn-dark-blue fw-normal my-4 px-5'} value={'Try Again'} />
                    </div>

                    <div className="card p-3 rounded-10 mb-4">
                        <div className="d-flex align-items-center">
                            <div className="w-80 h-80 rounded-10 overflow-hidden">
                                <ImgTag src={ProfilePictureSeven} classes={'w-100 h-100'} />
                            </div>
                            <div className="ms-3">
                                <PTag classes={'text-dark-bule fw-bold'} texts={'Aaksh Shah'} />
                                <PTag classes={''} texts={'Vanity van'} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
