import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import 'swiper/css/navigation'
import { ImageNine, LocationIcon, OfferIcon, StarIcon } from '../../assets/img'
import { Sort } from '../../components/AllSvgs'
import {
    BackButton,
    ButtonTag,
    ImgTag,
    PTag,
} from '../../components/designComponents/MicroComponents'
import { Splide, SplideSlide } from '@splidejs/react-splide'
//icons
import { AiFillHeart } from 'react-icons/ai'
import { MdOutlineFilterList } from 'react-icons/md'

export default function BookRecce() {
    const navigation = useNavigate()

    const InterestingDeals = [1, 2, 3, 4, 5]
    const gallery = ['', '', '', '']

    return (
        <>
            <div className='container'>
                <div className='d-flex align-items-center justify-content-between'>
                    <div className=''>
                        <BackButton
                            title={'Book Recce'}
                            onClick={() => {
                                navigation('/dashboard')
                            }}
                        />
                    </div>
                    <div className='d-flex align-items-center  filter-button'>
                        <div className='d-flex align-items-center pointer pe-4 border-end'>
                            <MdOutlineFilterList fontSize={22} />
                            <PTag classes={'text-dark-blue mx-2'} texts={'Filter'} />
                            <PTag
                                classes={
                                    'bg-navy-blue text-white rounded-circle w-30 h-30 d-flex mt-0 justify-content-center align-items-center'
                                }
                                texts={'2'}
                            />
                        </div>
                        <div className='d-flex align-items-center pointer ps-4'>
                            <Sort width={'24'} />
                            <PTag classes={'text-dark-blue mx-2'} texts={'Sort'} />
                        </div>
                    </div>
                </div>
                <div className='row my-4'>
                    {/* Interesting Deals */}
                    <div className='row mb-4'>
                        <div className='col-12'>
                            <PTag
                                classes={'text-dark-blue fw-bold fn-20'}
                                texts={'Select Cameraman'}
                            />
                        </div>
                    </div>
                    {/* Successful Bookings */}
                    <div className='row pb-5'>
                        <div className='col-12'>
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
                                {InterestingDeals.map((e, indexInterestingDeals) => {
                                    return (
                                        <SwiperSlide className='' key={indexInterestingDeals}>
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
                                                            {gallery.map((e, i) => {
                                                                return (
                                                                    <SplideSlide key={i}>
                                                                        <div className=''>
                                                                            <ImgTag
                                                                                src={ImageNine}
                                                                                alt='profile'
                                                                                classes='img-fluid w-100 h-100'
                                                                            />
                                                                        </div>
                                                                    </SplideSlide>
                                                                )
                                                            })}
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
                                                                texts='Cameraman'
                                                                classes='text-dark-blue'
                                                            />
                                                        </div>
                                                        <div>
                                                            <div className='bg-extra-lite-skyblue d-flex align-items-center rounded-2 px-2'>
                                                                <div className='w-12 me-1 mb-1'>
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
                                                            <div>
                                                                <PTag
                                                                    classes='text-dark-gray fn-12 mt-2'
                                                                    texts={'3 yrs of exp'}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='d-flex justify-content-between align-items-end border-top py-2 border-bottom mb-3'>
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
                                                                value='Check Avaliability'
                                                                classes='btn btn-extra-lite-green semibold fn-12 rounded white-space-nowrap w-100'
                                                            />
                                                        </div>
                                                        <div className='col-6'>
                                                            <ButtonTag
                                                                value='Book Directly'
                                                                classes='btn btn-orange semibold fn-12 rounded white-space-nowrap w-100'
                                                                onClick={() => {
                                                                    navigation(
                                                                        '/dashboard/bookingdirectly'
                                                                    )
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    )
                                })}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
