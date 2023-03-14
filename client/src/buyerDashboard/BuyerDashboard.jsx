import { Splide, SplideSlide } from '@splidejs/react-splide'
import React from 'react'
import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { ImageEight, ImageEleven, ImageNine, ImageOne, ImageTwo, LocationIcon, OfferIcon, ProfilePictureFive, ProfilePictureFour, ProfilePictureOne, ProfilePictureSeven, ProfilePictureSix, ProfilePictureTwo, StarIcon } from '../assets/img'
import { ATag, ButtonTag, H1Tag, ImgTag, PTag } from '../components/designComponents/MicroComponents'
import TotalViewCart from './totalViewCart'
//icons
import { AiFillHeart } from 'react-icons/ai'
import { FiPlus } from 'react-icons/fi'

export default function BuyerDashboard() {

    const navigate = useNavigate()

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
            projectTitle: 'Shikha Pramod',
            image: ProfilePictureFive,
            Status: 'Status',
            Waiting: 'Waiting',
        },
        {
            talentName: 'Anchor',
            date: 'Mar 23, 11:30 am',
            projectTitle: 'Atarangi Re',
            image: ProfilePictureSeven,
            Status: 'Status',
            Waiting: 'Waiting',
        },
    ];

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
    ];

    const InterestingDeals = [1, 2, 3, 4, 5]

    const gallary = [
        { image: ProfilePictureTwo },
        { image: ProfilePictureSix },
        { image: ProfilePictureSeven },
        { image: ProfilePictureFour },
    ]

    return (
        <>
            <div className="container">
                <div className="row">
                    {/* BuyerDashboard */}
                    <div className='my-3 text-center'>
                        <H1Tag
                            classes={
                                'text-dark-blue fn-md-20 fn-26 fw-bold border-bottom border-2 border-dark d-inline'
                            }
                            title={'Welcome! Kumar Biswas'}
                        />
                        <PTag
                            classes={'text-dark-blue fn-18 line-height-1 mt-sm-2'}
                            texts={'Dashboard'}
                        />
                    </div>
                    <div className='d-flex gap-4 flex-wrap flexwrapbuyer mb-4'>
                        <div className='boxdashboard justify-content-center'>
                            <ATag className='box bg-extra-lite-orange text-center d-flex flex-column justify-content-center align-items-center'>

                                <PTag
                                    classes={'text-dark-blue fn-36 fw-bold'}
                                    texts={"0"}
                                />
                                <PTag classes={'text-gray'} texts={'Total Bookings'} />
                            </ATag>
                        </div>
                        <div className='boxdashboard d-flex justify-content-center'>
                            <ATag
                                className='box bg-extra-lite-green text-center d-flex flex-column justify-content-center align-items-center pointer'
                                onClick={() => {
                                    navigate('/dashboard/confirmedorders/')
                                }}
                            >
                                <PTag
                                    classes={'text-dark-blue fn-36 fw-bold'}
                                    texts={"0"}
                                />
                                <PTag classes={'text-gray'} texts={'Upcoming Order'} />
                            </ATag>
                        </div>
                        <div className='boxdashboard d-flex justify-content-center'>
                            <ATag
                                className='box bg-extra-lite-orange text-center d-flex flex-column justify-content-center align-items-center pointer'
                                onClick={() => {
                                    navigate('/dashboard/futurePayments/')
                                }}
                            >
                                <PTag
                                    classes={'text-dark-blue fn-36 fw-bold'}
                                    texts={0}
                                />
                                <PTag
                                    classes={'text-gray max-w-120'}
                                    texts={'Future Payments'}
                                />
                            </ATag>
                        </div>
                        <div className='boxdashboard justify-content-center'>
                            <ATag
                                className='box bg-extra-lite-green text-center d-flex flex-column justify-content-center align-items-center'
                                onClick={() => {
                                    navigate('/dashboard/sellerconfirmedavailability/')
                                }}
                            >
                                <PTag
                                    classes={'text-dark-blue fn-36 fw-bold'}
                                    texts={0}
                                />
                                <PTag classes={'text-gray  max-w-120'} texts={'Seller Confirmed Availability'} />
                            </ATag>
                        </div>
                        <div className='boxdashboard d-flex justify-content-center'>
                            <ATag
                                className='box bg-extra-lite-orange text-center d-flex flex-column justify-content-center align-items-center pointer '
                                onClick={() => {
                                    navigate('/dashboard/requirements/')
                                }}
                            >
                                <PTag
                                    classes={'text-dark-blue fn-36 fw-bold'}
                                    texts={'0'}
                                />
                                <PTag classes={'text-gray max-w-120'} texts={'Live Requirements'} />
                            </ATag>
                        </div>
                        <div className='boxdashboard d-flex justify-content-center'>
                            <ATag
                                className='box bg-extra-lite-green text-center d-flex flex-column justify-content-center align-items-center pointer'
                            >
                                <PTag
                                    classes={'text-dark-blue fn-36 fw-bold'}
                                    texts={"0"}
                                />
                                <PTag
                                    classes={'text-gray max-w-120'}
                                    texts={'My Wishlist'}
                                />
                            </ATag>
                        </div>
                        <div className='boxdashboard d-flex justify-content-center'>
                            <ATag
                                className='box bg-extra-lite-green text-center d-flex flex-column justify-content-center align-items-center pointer'
                                onClick={() => { navigate('/dashboard/requestedavailability') }}
                            >
                                <PTag
                                    classes={'text-dark-blue fn-36 fw-bold'}
                                    texts={"0"}
                                />
                                <PTag
                                    classes={'text-gray max-w-120'}
                                    texts={'Requested Availability'}
                                />
                            </ATag>
                        </div>
                    </div>
                    {/* Current Balance */}
                    <div className='col-12 mb-3'>
                        <div className='d-flex justify-content-between align-items-center rounded-10 shadow-sm px-3 py-2'>
                            <PTag classes={'text-dark-blue'} texts={'Current Balance'} />
                            <PTag
                                classes={'text-dark-blue fn-26 fw-bold'}
                                texts={`₹0`}
                            />
                        </div>
                    </div>
                    {/* Select Category */}
                    <div className="row">
                        <div className='d-flex justify-content-between align-items-lg-center flex-wrap'>
                            <PTag
                                classes={'text-dark-blue bold mb-3'}
                                texts={'Services Offered by you'}
                            />
                            <div className='d-flex align-items-center'>
                                <div
                                    className='d-flex align-items-center pointer addmore-box'

                                >
                                    <FiPlus fontSize={20} className={'Fi-Plus'} />
                                    <PTag
                                        classes={'text-navy-blue ms-1'}
                                        texts={'Add more'}
                                    />
                                </div>
                            </div>
                        </div>
                        <div
                            className='w-100 d-flex align-items-center justify-content-center'
                            style={{ height: '200px' }}
                        >
                            <PTag
                                classes={'text-gray '}
                                texts={'No data found'}
                                style={{ height: '100px' }}
                            />
                        </div>
                    </div>
                    {/* Jobs Applied For */}
                    <div className='row my-sm-5 pe-0'>
                        <div className='col-sm-12 col-lg-6 col-xl-6 col-xxl-6 col-xxxl-6'>
                            <div className='card rounded-16 p-3 mb-3'>
                                <PTag
                                    classes={'text-dark-blue fn-18 fw-bold mb-3'}
                                    texts={'Jobs Applied For'}
                                />
                                {jobsAppliesForArray.map((data, indexjobsAppliesForArray) =>
                                    <div className='d-flex align-items-center mb-3' key={indexjobsAppliesForArray}>
                                        <div className='mini-profile-box bg-dark-gray me-2 overflow-hidden'>
                                            <ImgTag src={data.image} alt={'profile'} classes={'img-fluid w-100 h-100'} />
                                        </div>
                                        <div className='w-100'>
                                            <div className='d-flex justify-content-between mb-2'>
                                                <div className='max-w-120'>
                                                    <PTag classes={'text-dark-blue bold'} texts={data.talentName} />
                                                    <PTag classes={'text-gray'} texts={data.projectTitle} />

                                                </div>
                                                <div className='max-w-120'>
                                                    <PTag classes={'text-dark-blue bold'} texts={"Status"} />
                                                    <PTag classes={'text-gray'} texts={"Waiting"} />

                                                </div>
                                                <PTag classes={'text-dark-gray'} texts={data.date} />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className='text-center'>
                                    <ButtonTag
                                        classes={'btn-extra-lite-green bold px-4'}
                                        value={'View All'}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='col-sm-12 col-lg-6 col-xl-6 col-xxl-6 col-xxxl-6 pe-0'>
                            <div className='card rounded-16 p-3 mb-3'>
                                <PTag
                                    classes={'text-dark-blue fn-18 fw-bold mb-3'}
                                    texts={'Recent Transactions'}
                                />
                                {recentTransactions.map((data, indexrecentTransactions) =>
                                    <div className='d-flex align-items-center mb-3' key={indexrecentTransactions}>
                                        <div className='mini-profile-box me-2 overflow-hidden'>
                                            <ImgTag src={data.image} classes={'img-fluid w-100 h-100'} />
                                        </div>
                                        <div className='w-100'>
                                            <div className='d-flex justify-content-between mb-2'>
                                                <PTag classes={'text-dark-blue bold'} texts={data.name} />
                                                <PTag classes={'text-red fw-bold'} texts={data.amount} />
                                            </div>
                                            <PTag classes={'text-gray'} texts={data.date} />
                                        </div>
                                    </div>
                                )}
                                <div className='text-center'>
                                    <ButtonTag
                                        classes={'btn-extra-lite-green bold px-4'}
                                        value={'View All'}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Interesting Deals */}
                    <div className='row my-sm-5 mb-2'>
                        <div className='col-12'>
                            <PTag
                                classes={'text-dark-blue fw-bold fn-20'}
                                texts={'Interesting Deals'}
                            />
                        </div>
                    </div>
                    {/* Successful Bookings */}
                    <div className='row pb-5 pe-0'>
                        <div className='col-12 pe-0'>
                            <Swiper
                                className='mySwiper navigation-down pb-5'
                                spaceBetween={25}
                                slidesPerView={4}
                                navigation={true}
                                modules={[Navigation]}
                                breakpoints={{
                                    1440: {
                                        slidesPerView: 4,
                                    },
                                    1024: {
                                        slidesPerView: 3,
                                        spaceBetween: 20,
                                    },
                                    768: {
                                        slidesPerView: 2,
                                    },
                                    320: {
                                        slidesPerView: 1.1,
                                        spaceBetween: 15,
                                    },
                                }}
                            >
                                {InterestingDeals.map((InterestingDeals) =>
                                    <SwiperSlide className='' key={InterestingDeals}>
                                        {/* <Card gallery={gallery} /> */}
                                        <div className='card product-card rounded-16 p-3 mb-3'>
                                            {/* Card Image Container */}
                                            <div className='position-relative rounded-10 max-h-300 overflow-hidden product-img mb-3'>
                                                {/* Image Slider */}
                                                <div className='remove-position'>
                                                    <Splide
                                                        options={{
                                                            rewind: true,
                                                            gap: '1rem',
                                                        }}
                                                    >
                                                        {gallary.map((data, indexgallary) =>
                                                            <SplideSlide key={indexgallary}>
                                                                <div className=''>
                                                                    <ImgTag
                                                                        src={ImageNine}
                                                                        alt='profile'
                                                                        classes='img-fluid w-100 h-100'
                                                                    />
                                                                </div>
                                                            </SplideSlide>
                                                        )}
                                                    </Splide>
                                                </div>
                                                {/* Offer Icon */}
                                                <div className='bg-dark-orange d-flex align-items-center rounded-2 position-absolute top-10 start-10 px-2 py-1'>
                                                    <ImgTag src={OfferIcon} alt='offer' />
                                                    <PTag
                                                        texts='20% OFF'
                                                        classes='text-white bold ms-2'
                                                    />
                                                </div>

                                                {/* Heart Icon */}
                                                <div className='like-box Ai-Fill-Heart-parent d-flex justify-content-center align-items-center pointer'>
                                                    <AiFillHeart className={'Ai-Fill-Heart'} />
                                                </div>
                                            </div>
                                            {/* Card Body */}
                                            <div className='card-body p-0'>
                                                <div className='d-flex justify-content-between align-items-start mb-3'>
                                                    <div>
                                                        <PTag
                                                            texts='Nikon Camera'
                                                            classes='text-dark-blue fn-17 fw-bold'
                                                        />
                                                        <PTag
                                                            texts='Sub Category'
                                                            classes='text-dark-blue'
                                                        />
                                                    </div>
                                                    <div className='bg-extra-lite-skyblue d-flex align-items-center rounded-2 px-2'>
                                                        <div className='w-12 me-1'>
                                                            <ImgTag
                                                                src={StarIcon}
                                                                alt='star'
                                                                classes='img-fluid w-100'
                                                            />
                                                        </div>
                                                        <PTag
                                                            texts='4.5'
                                                            classes='text-dark-gray fn-12'
                                                        />
                                                    </div>
                                                </div>
                                                <div className='border-top py-2 d-flex align-items-center justify-content-between mb-3'>
                                                    <div className='d-flex align-items-center'>
                                                        <div className='w-40 h-40 rounded-circle overflow-hidden'>
                                                            <ImgTag
                                                                src={ProfilePictureOne}
                                                                alt='profile'
                                                                classes='img-fluid w-100'
                                                            />
                                                        </div>
                                                        <PTag
                                                            texts='Venna Services'
                                                            classes='text-dark-blue fn-14 ms-2 fw-bold'
                                                        />
                                                    </div>
                                                </div>
                                                <div className='d-flex justify-content-between align-items-end mb-3'>
                                                    <div>
                                                        <PTag
                                                            texts='Base Price'
                                                            classes='text-dark-gray'
                                                        />
                                                        <PTag
                                                            texts='₹1,00,000'
                                                            classes='text-dark-blue fn-17 fw-bold'
                                                        />
                                                    </div>
                                                    <div className='d-flex align-items-center'>
                                                        <ImgTag
                                                            src={LocationIcon}
                                                            alt='location'
                                                        />
                                                        <PTag
                                                            texts='Mumbai'
                                                            classes='text-gray'
                                                        />
                                                    </div>
                                                </div>
                                                <div className='row g-2 mb-sm-3'>
                                                    <div className='col-6'>
                                                        <ButtonTag
                                                            value='Book A Recce'
                                                            classes='btn btn-extra-lite-green semibold fn-12 rounded white-space-nowrap w-100'
                                                        />
                                                    </div>
                                                    <div className='col-6'>
                                                        <ButtonTag
                                                            value='Book Directly'
                                                            classes='btn btn-orange semibold fn-12 rounded white-space-nowrap w-100'
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                )}
                            </Swiper>
                        </div>
                    </div>
                    <div className="">
                        <Container className='position-fixed start-0 end-0 bottom-0 mb-3 w-100 z-index mx-auto px-2'>
                            <TotalViewCart texts={'View Cart'} />
                        </Container>
                    </div>
                </div>
            </div>
        </>
    )
}
