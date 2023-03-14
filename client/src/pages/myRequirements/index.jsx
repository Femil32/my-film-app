import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import 'swiper/css/navigation'
import { ImageNine, LocationIcon, OfferIcon, ProfilePictureOne, StarIcon } from '../../assets/img'
import { BackButton, ButtonTag, ImgTag, PTag } from '../../components/designComponents/MicroComponents'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import ReviewCard from './ReviewCard'
import EnterDetail from './EnterDetail'
//icons
import { AiFillHeart } from 'react-icons/ai'
import { MdOutlineFilterList } from 'react-icons/md'


export default function LiveRequirements() {

    const navigation = useNavigate()

    const InterestingDeals = [1, 2, 3, 4, 5];
    const gallery = ['', '', '', '',];
    const [show, setShow] = useState(false);
    const [etershow, setEtershow] = useState(false);


    return (
        <>
            <div className='container'>
                <div className="d-flex align-items-center justify-content-between">
                    <div className="">
                        <BackButton
                            title={'Live Requirements'}
                            onClick={() => {
                                navigation('/dashboard')
                            }}
                        />
                    </div>
                    <div>
                        <div
                            className='d-flex align-items-center pointer filter-button'
                        >
                            <MdOutlineFilterList fontSize={22} />
                            <PTag classes={'text-dark-blue mx-2'} texts={'Filter'} />
                            <PTag
                                classes={
                                    'bg-navy-blue text-white rounded-circle w-30 h-30 d-flex mt-0 justify-content-center align-items-center'
                                }
                                texts={'2'}
                            />
                        </div>
                    </div>
                </div>
                {/* Interesting Deals */}
                <div className='row my-4'>
                    <div className='col-12'>
                        <PTag
                            classes={'text-dark-blue fw-bold fn-20'}
                            texts={'Responses for Cameraman'}
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
                                                        <div className='bg-extra-lite-skyblue d-flex align-items-center rounded-2 px-2'
                                                            onClick={() => { setShow(true) }}>
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
                                                            <PTag classes='text-dark-gray fn-12 mt-2' texts={'3 yrs of exp'} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='d-flex justify-content-between align-items-end border-top py-2 border-bottom mb-3'>
                                                    <div >
                                                        <PTag
                                                            texts='quoted Price'
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
                                                            value='Move To Cart'
                                                            classes='btn btn-extra-lite-green semibold fn-12 rounded white-space-nowrap w-100'
                                                            onClick={() => { setEtershow(true) }}
                                                        />
                                                    </div>
                                                    <div className='col-6'>
                                                        <ButtonTag
                                                            value='Negotiate'
                                                            classes='btn btn-orange semibold fn-12 rounded white-space-nowrap w-100'
                                                            onClick={() => { navigation('/dashboard/negotiate') }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className='text-center text-red fw-bold'>
                                                    <PTag texts={'remove form the list'} />
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                )
                            })}
                        </Swiper>
                    </div>
                    <ReviewCard show={show} setShow={setShow} />
                    <EnterDetail show={etershow} setEtershow={setEtershow} />
                </div>
            </div>
        </>
    )
}
