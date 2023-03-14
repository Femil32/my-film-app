import React from 'react'
import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { ProfilePictureTwo } from '../../assets/img'
import { BackButton, ImgTag, PTag } from '../../components/designComponents/MicroComponents'
//icons
import { IoDocumentTextOutline } from 'react-icons/io5'

export const TransactionDetails = () => {
    const navigation = useNavigate()
    return (
        <>
            <Container>
                <BackButton
                    classes={'mb-3'}
                    title={'Transaction Details'}
                    onClick={() => {
                        navigation('/dashboard/wallet/')
                    }}
                />
                <div className='mx-auto max-w-625'>
                    <div className='bg-lite-white rounded-16 p-3 mb-3'>
                        <div className={'d-flex align-items-center mb-3'}>
                            <IoDocumentTextOutline fontSize={22} className={'Io-Document-TextOutline'} />
                            <PTag
                                classes={'text-dark-blue semibold ms-2'}
                                texts={'Transaction Id - 1448'}
                            />
                        </div>
                        <div className='d-flex align-items-center mb-3'>
                            <div className='max-w50 w-100'>
                                <ImgTag src={ProfilePictureTwo} classes={'img-fluid rounded-10'} />
                            </div>
                            <div className='w-100 ms-3'>
                                <div className='d-flex justify-content-between align-items-center mb-1'>
                                    <PTag
                                        classes={'text-dark-blue semibold'}
                                        texts={'Aakash Shah'}
                                    />
                                    <PTag classes={'text-orange semibold'} texts={'+ ₹3000'} />
                                </div>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <PTag classes={'text-gray'} texts={'Mar 23, 11:30 am'} />
                                    <PTag
                                        classes={'text-dark-blue mt-0'}
                                        texts={'Balance : ₹5448'}
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <PTag
                                classes={'text-gray'}
                                texts={
                                    'Wallet Amount Of ₹3000 Was Debited Against Your Transaction With Aakash Shah'
                                }
                            />
                        </div>
                    </div>
                    <div>
                        <div className='d-flex justify-content-between align-items-center mb-2'>
                            <PTag classes={'text-navy-blue fn-16'} texts={'Transaction ID'} />
                            <PTag classes={'text-navy-blue fn-16 bold'} texts={'1448'} />
                        </div>
                        <div className='d-flex justify-content-between align-items-center mb-2'>
                            <PTag classes={'text-dark-blue fn-16'} texts={'Date'} />
                            <PTag classes={'text-dark-blue fn-16 bold'} texts={'Mar 23, 2021'} />
                        </div>
                        <div className='d-flex justify-content-between align-items-center mb-2'>
                            <PTag classes={'text-dark-blue fn-16'} texts={'Time'} />
                            <PTag classes={'text-dark-blue fn-16 bold'} texts={'11:35 am'} />
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}
