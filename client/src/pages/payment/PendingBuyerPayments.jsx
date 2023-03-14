import React from 'react'
import { useNavigate } from 'react-router-dom'
import { RightChevron } from '../../components/AllSvgs'
import { ProfilePictureTwo } from '../../assets/img'
import {
    BackButton,
    ButtonTag,
    ImgTag,
    PTag,
} from '../../components/designComponents/MicroComponents'


const PendingBuyerPayments = () => {
    const navigation = useNavigate()

    return (
        <>
            <div className='container'>
                <BackButton
                    title={'Pending Buyer Payments '}
                    onClick={() => {
                        navigation('/dashboard')
                    }}
                />
                <div className='row my-4'>
                    <div className='col-xl-4 col-sm-6'>
                        <div className='card rounded-16 p-3 mb-sm-4 mb-3'>
                            <div className='d-flex align-items-center mb-4'>
                                <div className='max-w-40 w-100 h-40 rounded-5 overflow-hidden'>
                                    <ImgTag
                                        src={ProfilePictureTwo}
                                        alt={'profile'}
                                        classes={'img-fluid'}
                                    />
                                </div>
                                <div className='ms-2 w-100'>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <PTag
                                            classes={'text-dark-blue fw-bold fn-16'}
                                            texts={'Kumar Biswas'}
                                        />
                                        <PTag
                                            classes={'text-dark-blue fw-bold fn-16 me-2'}
                                            texts={'₹700'}
                                        />
                                    </div>
                                    <div className='d-flex align-items-center'>
                                        <PTag classes={'text-dark-blue me-1'} texts={'Category'} />
                                        <RightChevron stroke={'#1A3556'} />
                                        <PTag
                                            classes={'text-dark-blue ms-1'}
                                            texts={'Sub Category'}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='row g-3'>
                                <div className='col-6'>
                                    <ButtonTag
                                        classes={
                                            'btn-extra-lite-green semibold fn-12 rounded white-space-nowrap w-100'
                                        }
                                        value={'Send Reminder'}
                                    />
                                </div>
                                <div className='col-6'>
                                    <ButtonTag
                                        classes={
                                            'btn-orange semibold fn-12 rounded white-space-nowrap w-100'
                                        }
                                        value={'Send Validity'}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-xl-4 col-sm-6'>
                        <div className='card rounded-16 p-3 mb-sm-4 mb-3'>
                            <div className='d-flex align-items-center mb-4'>
                                <div className='max-w-40 w-100 h-40 rounded-5 overflow-hidden'>
                                    <ImgTag
                                        src={ProfilePictureTwo}
                                        alt={'profile'}
                                        classes={'img-fluid'}
                                    />
                                </div>
                                <div className='ms-2 w-100'>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <PTag
                                            classes={'text-dark-blue fw-bold fn-16'}
                                            texts={'Kumar Biswas'}
                                        />
                                        <PTag
                                            classes={'text-dark-blue fw-bold fn-16 me-2'}
                                            texts={'₹700'}
                                        />
                                    </div>
                                    <div className='d-flex align-items-center'>
                                        <PTag classes={'text-dark-blue me-1'} texts={'Category'} />
                                        <RightChevron stroke={'#1A3556'} />
                                        <PTag
                                            classes={'text-dark-blue ms-1'}
                                            texts={'Sub Category'}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='row g-3'>
                                <div className='col-6'>
                                    <ButtonTag
                                        classes={
                                            'btn-extra-lite-green semibold fn-12 rounded white-space-nowrap w-100'
                                        }
                                        value={'Send Reminder'}
                                    />
                                </div>
                                <div className='col-6'>
                                    <ButtonTag
                                        classes={
                                            'btn-orange semibold fn-12 rounded white-space-nowrap w-100'
                                        }
                                        value={'Send Validity'}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-xl-4 col-sm-6'>
                        <div className='card rounded-16 p-3 mb-sm-4 mb-3'>
                            <div className='d-flex align-items-center mb-4'>
                                <div className='max-w-40 w-100 h-40 rounded-5 overflow-hidden'>
                                    <ImgTag
                                        src={ProfilePictureTwo}
                                        alt={'profile'}
                                        classes={'img-fluid'}
                                    />
                                </div>
                                <div className='ms-2 w-100'>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <PTag
                                            classes={'text-dark-blue fw-bold fn-16'}
                                            texts={'Kumar Biswas'}
                                        />
                                        <PTag
                                            classes={'text-dark-blue fw-bold fn-16 me-2'}
                                            texts={'₹700'}
                                        />
                                    </div>
                                    <div className='d-flex align-items-center'>
                                        <PTag classes={'text-dark-blue me-1'} texts={'Category'} />
                                        <RightChevron stroke={'#1A3556'} />
                                        <PTag
                                            classes={'text-dark-blue ms-1'}
                                            texts={'Sub Category'}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='row g-3'>
                                <div className='col-6'>
                                    <ButtonTag
                                        classes={
                                            'btn-extra-lite-green semibold fn-12 rounded white-space-nowrap w-100'
                                        }
                                        value={'Send Reminder'}
                                    />
                                </div>
                                <div className='col-6'>
                                    <ButtonTag
                                        classes={
                                            'btn-orange semibold fn-12 rounded white-space-nowrap w-100'
                                        }
                                        value={'Send Validity'}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-xl-4 col-sm-6'>
                        <div className='card rounded-16 p-3 mb-sm-4 mb-3'>
                            <div className='d-flex align-items-center mb-4'>
                                <div className='max-w-40 w-100 h-40 rounded-5 overflow-hidden'>
                                    <ImgTag
                                        src={ProfilePictureTwo}
                                        alt={'profile'}
                                        classes={'img-fluid'}
                                    />
                                </div>
                                <div className='ms-2 w-100'>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <PTag
                                            classes={'text-dark-blue fw-bold fn-16'}
                                            texts={'Kumar Biswas'}
                                        />
                                        <PTag
                                            classes={'text-dark-blue fw-bold fn-16 me-2'}
                                            texts={'₹700'}
                                        />
                                    </div>
                                    <div className='d-flex align-items-center'>
                                        <PTag classes={'text-dark-blue me-1'} texts={'Category'} />
                                        <RightChevron stroke={'#1A3556'} />
                                        <PTag
                                            classes={'text-dark-blue ms-1'}
                                            texts={'Sub Category'}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='row g-3'>
                                <div className='col-6'>
                                    <ButtonTag
                                        classes={
                                            'btn-extra-lite-green semibold fn-12 rounded white-space-nowrap w-100'
                                        }
                                        value={'Send Reminder'}
                                    />
                                </div>
                                <div className='col-6'>
                                    <ButtonTag
                                        classes={
                                            'btn-orange semibold fn-12 rounded white-space-nowrap w-100'
                                        }
                                        value={'Send Validity'}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-xl-4 col-sm-6'>
                        <div className='card rounded-16 p-3 mb-sm-4 mb-3'>
                            <div className='d-flex align-items-center mb-4'>
                                <div className='max-w-40 w-100 h-40 rounded-5 overflow-hidden'>
                                    <ImgTag
                                        src={ProfilePictureTwo}
                                        alt={'profile'}
                                        classes={'img-fluid'}
                                    />
                                </div>
                                <div className='ms-2 w-100'>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <PTag
                                            classes={'text-dark-blue fw-bold fn-16'}
                                            texts={'Kumar Biswas'}
                                        />
                                        <PTag
                                            classes={'text-dark-blue fw-bold fn-16 me-2'}
                                            texts={'₹700'}
                                        />
                                    </div>
                                    <div className='d-flex align-items-center'>
                                        <PTag classes={'text-dark-blue me-1'} texts={'Category'} />
                                        <RightChevron stroke={'#1A3556'} />
                                        <PTag
                                            classes={'text-dark-blue ms-1'}
                                            texts={'Sub Category'}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='row g-3'>
                                <div className='col-6'>
                                    <ButtonTag
                                        classes={
                                            'btn-extra-lite-green semibold fn-12 rounded white-space-nowrap w-100'
                                        }
                                        value={'Send Reminder'}
                                    />
                                </div>
                                <div className='col-6'>
                                    <ButtonTag
                                        classes={
                                            'btn-orange semibold fn-12 rounded white-space-nowrap w-100'
                                        }
                                        value={'Send Validity'}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-xl-4 col-sm-6'>
                        <div className='card rounded-16 p-3 mb-sm-4 mb-3'>
                            <div className='d-flex align-items-center mb-4'>
                                <div className='max-w-40 w-100 h-40 rounded-5 overflow-hidden'>
                                    <ImgTag
                                        src={ProfilePictureTwo}
                                        alt={'profile'}
                                        classes={'img-fluid'}
                                    />
                                </div>
                                <div className='ms-2 w-100'>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <PTag
                                            classes={'text-dark-blue fw-bold fn-16'}
                                            texts={'Kumar Biswas'}
                                        />
                                        <PTag
                                            classes={'text-dark-blue fw-bold fn-16 me-2'}
                                            texts={'₹700'}
                                        />
                                    </div>
                                    <div className='d-flex align-items-center'>
                                        <PTag classes={'text-dark-blue me-1'} texts={'Category'} />
                                        <RightChevron stroke={'#1A3556'} />
                                        <PTag
                                            classes={'text-dark-blue ms-1'}
                                            texts={'Sub Category'}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='row g-3'>
                                <div className='col-6'>
                                    <ButtonTag
                                        classes={
                                            'btn-extra-lite-green semibold fn-12 rounded white-space-nowrap w-100'
                                        }
                                        value={'Send Reminder'}
                                    />
                                </div>
                                <div className='col-6'>
                                    <ButtonTag
                                        classes={
                                            'btn-orange semibold fn-12 rounded white-space-nowrap w-100'
                                        }
                                        value={'Send Validity'}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-xl-4 col-sm-6'>
                        <div className='card rounded-16 p-3 mb-sm-4 mb-3'>
                            <div className='d-flex align-items-center mb-4'>
                                <div className='max-w-40 w-100 h-40 rounded-5 overflow-hidden'>
                                    <ImgTag
                                        src={ProfilePictureTwo}
                                        alt={'profile'}
                                        classes={'img-fluid'}
                                    />
                                </div>
                                <div className='ms-2 w-100'>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <PTag
                                            classes={'text-dark-blue fw-bold fn-16'}
                                            texts={'Kumar Biswas'}
                                        />
                                        <PTag
                                            classes={'text-dark-blue fw-bold fn-16 me-2'}
                                            texts={'₹700'}
                                        />
                                    </div>
                                    <div className='d-flex align-items-center'>
                                        <PTag classes={'text-dark-blue me-1'} texts={'Category'} />
                                        <RightChevron stroke={'#1A3556'} />
                                        <PTag
                                            classes={'text-dark-blue ms-1'}
                                            texts={'Sub Category'}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='row g-3'>
                                <div className='col-6'>
                                    <ButtonTag
                                        classes={
                                            'btn-extra-lite-green semibold fn-12 rounded white-space-nowrap w-100'
                                        }
                                        value={'Send Reminder'}
                                    />
                                </div>
                                <div className='col-6'>
                                    <ButtonTag
                                        classes={
                                            'btn-orange semibold fn-12 rounded white-space-nowrap w-100'
                                        }
                                        value={'Send Validity'}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-xl-4 col-sm-6'>
                        <div className='card rounded-16 p-3 mb-sm-4 mb-3'>
                            <div className='d-flex align-items-center mb-4'>
                                <div className='max-w-40 w-100 h-40 rounded-5 overflow-hidden'>
                                    <ImgTag
                                        src={ProfilePictureTwo}
                                        alt={'profile'}
                                        classes={'img-fluid'}
                                    />
                                </div>
                                <div className='ms-2 w-100'>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <PTag
                                            classes={'text-dark-blue fw-bold fn-16'}
                                            texts={'Kumar Biswas'}
                                        />
                                        <PTag
                                            classes={'text-dark-blue fw-bold fn-16 me-2'}
                                            texts={'₹700'}
                                        />
                                    </div>
                                    <div className='d-flex align-items-center'>
                                        <PTag classes={'text-dark-blue me-1'} texts={'Category'} />
                                        <RightChevron stroke={'#1A3556'} />
                                        <PTag
                                            classes={'text-dark-blue ms-1'}
                                            texts={'Sub Category'}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='row g-3'>
                                <div className='col-6'>
                                    <ButtonTag
                                        classes={
                                            'btn-extra-lite-green semibold fn-12 rounded white-space-nowrap w-100'
                                        }
                                        value={'Send Reminder'}
                                    />
                                </div>
                                <div className='col-6'>
                                    <ButtonTag
                                        classes={
                                            'btn-orange semibold fn-12 rounded white-space-nowrap w-100'
                                        }
                                        value={'Send Validity'}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-xl-4 col-sm-6'>
                        <div className='card rounded-16 p-3 mb-sm-4 mb-3'>
                            <div className='d-flex align-items-center mb-4'>
                                <div className='max-w-40 w-100 h-40 rounded-5 overflow-hidden'>
                                    <ImgTag
                                        src={ProfilePictureTwo}
                                        alt={'profile'}
                                        classes={'img-fluid'}
                                    />
                                </div>
                                <div className='ms-2 w-100'>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <PTag
                                            classes={'text-dark-blue fw-bold fn-16'}
                                            texts={'Kumar Biswas'}
                                        />
                                        <PTag
                                            classes={'text-dark-blue fw-bold fn-16 me-2'}
                                            texts={'₹700'}
                                        />
                                    </div>
                                    <div className='d-flex align-items-center'>
                                        <PTag classes={'text-dark-blue me-1'} texts={'Category'} />
                                        <RightChevron stroke={'#1A3556'} />
                                        <PTag
                                            classes={'text-dark-blue ms-1'}
                                            texts={'Sub Category'}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='row g-3'>
                                <div className='col-6'>
                                    <ButtonTag
                                        classes={
                                            'btn-extra-lite-green semibold fn-12 rounded white-space-nowrap w-100'
                                        }
                                        value={'Send Reminder'}
                                    />
                                </div>
                                <div className='col-6'>
                                    <ButtonTag
                                        classes={
                                            'btn-orange semibold fn-12 rounded white-space-nowrap w-100'
                                        }
                                        value={'Send Validity'}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PendingBuyerPayments
