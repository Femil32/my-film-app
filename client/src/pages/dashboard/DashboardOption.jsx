import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
    ProfilePictureTwo,
    ProfilePictureFive,
    ProfilePictureSeven,
    ProfilePictureFour,
    ProfilePictureSix,
} from '../../assets/img'
import {
    ATag,
    ButtonTag,
    H1Tag,
    ImgTag,
    PTag,
} from '../../components/designComponents/MicroComponents'
import JobsAppliedFor from '../../components/common/JobsAppliedFor'
import RecentTransactions from '../../components/common/RecentTransactions'

const DashboardOption = () => {
    const navigation = useNavigate()

    const jobsAppliesForArray = [
        {
            talentName: 'AAnchor',
            date: 'Mar 23, 11:30 am',
            projectTitle: 'Atarangi Re',
            image: ProfilePictureFour,
            Status: 'Status',
            Waiting: 'Waiting',
        },
        {
            talentName: 'Anchor',
            date: 'Mar 23, 11:30 am',
            projectTitle: 'Atarangi Re',
            image: ProfilePictureFive,
            Status: 'Status',
            Waiting: 'Waiting',
        },
        {
            talentName: 'Anchor',
            date: 'Mar 23, 11:30 am',
            projectTitle: 'Atarangi Re',
            image: ProfilePictureFive,
            Status: 'Status',
            Waiting: 'Waiting',
        },
    ]
    const recentTransactions = [
        {
            name: 'Aakash Shah',
            amount: '-3000',
            date: 'Mar 23, 11:30 am',
            image: ProfilePictureTwo,
        },
        {
            name: 'Pramod Suchak',
            amount: '-1500',
            date: 'Mar 23, 11:30 am',
            image: ProfilePictureSix,
        },
        {
            name: 'Paid to Shikha',
            amount: '-5000',
            date: 'Mar 23, 11:30 am',
            image: ProfilePictureSeven,
        },
    ]

    return (
        <>
            {' '}
            <div className='Container max-w-950 mx-auto'>
                <div>
                    <H1Tag classes={'text-dark-blue fn-26 fw-bold mb-3'} title={'Dashboard'} />
                    {/* <PTag classes={'text-dark-blue fn-16'} texts={'Welcome Harsh,'} /> */}
                </div>
                <div>
                    <div className='row'>
                        <div className='col-lg-2 col-md-4 col-6 d-flex justify-content-end mb-3'>
                            <ATag className='box bg-extra-lite-orange text-center d-flex flex-column justify-content-center align-items-center pointer'>
                                <PTag classes={'text-dark-blue fn-36 fw-bold'} texts={'5'} />
                                <PTag classes={'text-gray'} texts={'Total Bookings'} />
                            </ATag>
                        </div>
                        <div className='col-lg-2 col-md-4 col-6 mb-3'>
                            <ATag
                                className='box bg-extra-lite-green text-center d-flex flex-column justify-content-center align-items-center pointer'
                                onClick={() => {
                                    navigation('/dashboard/bookings')
                                }}
                            >
                                <PTag classes={'text-dark-blue fn-36 fw-bold'} texts={'2'} />
                                <PTag classes={'text-gray'} texts={'Upcoming Bookings'} />
                            </ATag>
                        </div>
                        <div className='col-lg-2 col-md-4 col-6 d-flex justify-content-end mb-3'>
                            <ATag
                                className='box bg-extra-lite-blue text-center d-flex flex-column justify-content-center align-items-center pointer'
                                onClick={() => {
                                    navigation('/dashboard/dashboard-option/pending-buyer-payments')
                                }}
                            >
                                <PTag classes={'text-dark-blue fn-36 fw-bold'} texts={'2'} />
                                <PTag classes={'text-gray'} texts={'Pending Buyer Payments'} />
                            </ATag>
                        </div>
                        <div className='col-lg-2 col-md-4 col-6 mb-3'>
                            <ATag
                                className='box bg-extra-lite-purple text-center d-flex flex-column justify-content-center align-items-center pointer'
                                onClick={() => {
                                    navigation('/dashboard/dashboard-option/booking-status')
                                }}
                            >
                                <PTag classes={'text-dark-blue fn-36 fw-bold'} texts={'2'} />
                                <PTag classes={'text-gray'} texts={'Pending Booking Requests'} />
                            </ATag>
                        </div>
                        <div className='col-lg-2 col-md-4 col-6 d-flex justify-content-end mb-3'>
                            <ATag
                                className='box bg-extra-lite-green-perot text-center d-flex flex-column justify-content-center align-items-center pointer'
                                onClick={() => {
                                    navigation('/dashboard/dashboard-option/negotiation-request')
                                }}
                            >
                                <PTag classes={'text-dark-blue fn-36 fw-bold'} texts={'2'} />
                                <PTag classes={'text-gray'} texts={'Negotiation Request'} />
                            </ATag>
                        </div>
                        <div className='col-lg-2 col-md-4 col-6 mb-3'>
                            <div className='box bg-extra-lite-red text-center d-flex flex-column justify-content-center align-items-center pointer'>
                                <ATag>
                                    <PTag classes={'text-dark-blue fn-36 fw-bold'} texts={'2'} />
                                </ATag>
                                <ATag>
                                    <PTag classes={'text-gray'} texts={'Reviews'} />
                                </ATag>
                            </div>
                        </div>
                        <div className='col-12 mb-3'>
                            <div className='d-flex justify-content-between align-items-center rounded-10 shadow-sm p-3'>
                                <PTag classes={'text-dark-blue'} texts={'Wallet Balance'} />
                                <PTag classes={'text-dark-blue fn-26 fw-bold'} texts={'₹5000'} />
                            </div>
                        </div>
                    </div>
                    <div className='row a'>
                        <div className='col-lg-6 col-12'>
                            <div className='card rounded-16 p-3 mb-3'>
                                <PTag
                                    classes={'text-dark-blue fn-18 fw-bold mb-3'}
                                    texts={'Jobs Applied For'}
                                />
                                {jobsAppliesForArray.map((data, index) => (
                                    <JobsAppliedFor
                                        key={index}
                                        talentName={data.talentName}
                                        Status={data.Status}
                                        Waiting={data.Waiting}
                                        date={data.date}
                                        projectTitle={data.projectTitle}
                                        image={data.image}
                                    />
                                ))}
                                <div className='text-center'>
                                    <ButtonTag
                                        classes={'btn-extra-lite-green bold px-4'}
                                        value={'View All'}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-6 col-6'>
                            <div className='card rounded-16 p-3 mb-3'>
                                <PTag
                                    classes={'text-dark-blue fn-18 fw-bold mb-3'}
                                    texts={'Recent Transactions'}
                                />
                                {recentTransactions.map((data, index) => (
                                    <RecentTransactions
                                        key={index}
                                        name={data.name}
                                        amount={data.amount}
                                        date={data.date}
                                        image={data.image}
                                    />
                                ))}
                                <div className='text-center'>
                                    <ButtonTag
                                        classes={'btn-extra-lite-green bold px-4'}
                                        value={'View All'}
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

export default DashboardOption
