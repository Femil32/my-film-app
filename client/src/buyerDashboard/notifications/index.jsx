import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { ImageEight, ImageFive, ImageNine } from '../../assets/img'
import { BackButton, ButtonTag, H6Tag, ImgTag, PTag, } from '../../components/designComponents/MicroComponents'

export default function Notifications() {

    const navigation = useNavigate()

    const BookingAccepted = [1, 2, 3, 4];
    const review = [1, 2, 3, 4];
    const SpecialOffer = [1, 2, 3, 4, 5, 6];

    return (
        <>
            <div className="container">
                <div className="">
                    <BackButton
                        title={'Notifications'}
                        onClick={() => {
                            navigation('/dashboard')
                        }}
                    />
                </div>
                <div className="row mt-4">
                    <PTag classes={'text-dark-blue fn-24 fw-bold'} texts={'Today'} />
                    {BookingAccepted.map((e, iBookingAccepted) => {
                        return (
                            <div className="col-lg-6" key={iBookingAccepted}>
                                <div className="d-flex align-items-center py-3 border-bottom">
                                    <div className="w-80 h-80 overflow-hidden rounded-10">
                                        <ImgTag src={ImageEight} classes={'w-100 h-100'} />
                                    </div>
                                    <div className="ms-2">
                                        <PTag classes={'text-dark-blue fw-bold fn-18'} texts={'Harsh Joshi'} />
                                        <PTag texts={'Booking Accepted'} />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="row mb-5">
                    {review.map((e, ireview) => {
                        return (
                            <div className="col-lg-6 col-12" key={ireview}>
                                <div className="row align-items-center justify-content-between py-3 border-bottom g-1">
                                    <div className="col-lg-6 col-12 d-flex align-items-center max-w-260 mb-2">
                                        <div className="w-80 h-80 overflow-hidden rounded-10">
                                            <ImgTag src={ImageEight} classes={'w-100 h-100'} />
                                        </div>
                                        <div className="ms-2">
                                            <PTag classes={'text-dark-blue fw-bold fn-18'} texts={'Harsh Joshi'} />
                                            <PTag texts={'Is asking for review'} />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-12 d-flex align-items-center justify-content-lg-end justify-content-center">
                                        <ButtonTag classes={'btn-dark-blue semibold fn-12 me-2 w-100 rounded'} value={"Add Review"} />
                                        <ButtonTag classes={'btn-outline-orange semibold fn-12 rounded w-100'} value={"Reject"} />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="row mb-5">
                    <PTag classes={'text-dark-blue fn-24 fw-bold'} texts={'This Week'} />
                    {review.map((e, ireview) => {
                        return (
                            <div className="col-lg-6" key={ireview}>
                                <div className="row align-items-center justify-content-between py-3 border-bottom g-2">
                                    <div className="col-lg-6 col-12 d-flex align-items-center max-w-260 mb-2">
                                        <div className="w-80 h-80 overflow-hidden rounded-10">
                                            <ImgTag src={ImageEight} classes={'w-100 h-100'} />
                                        </div>
                                        <div className="ms-2">
                                            <PTag classes={'text-dark-blue fw-bold fn-18'} texts={'Harsh Joshi'} />
                                            <PTag texts={'Is asking for review'} />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-12 d-flex align-items-center justify-content-lg-end justify-content-center">
                                        <ButtonTag classes={'btn-dark-blue semibold fn-12 me-2 w-100 rounded'} value={"Accept"} />
                                        <ButtonTag classes={'btn-outline-orange semibold fn-12 rounded w-100'} value={"Reject"} />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="row pb-5">
                    <PTag classes={'text-dark-blue fn-24 fw-bold'} texts={'Special Offer'} />
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
                        {SpecialOffer.map((e, indexSpecialOffer) => {
                            return (
                                <SwiperSlide key={indexSpecialOffer}>
                                    <div className="my-4">
                                        <div className='card p-4 rounded-10'>
                                            <div className="">
                                                <div className="h-160 overflow-hidden rounded-10 mb-2">
                                                    <ImgTag src={ImageNine} classes={'w-100 h-100'} />
                                                    <ImgTag src={ImageNine} classes={'w-100 h-100'} />
                                                </div>
                                                <div className="ms-2">
                                                    <PTag classes={'text-dark-blue fw-bold fn-18'} texts={'20% off on bookings'} />
                                                    <PTag texts={`Rush to this deal before it's gone`} />
                                                </div>
                                                <div className="">
                                                    <ButtonTag classes={'btn-orange semibold fn-12 rounded w-100 mt-3'} value={"Book Now"} />
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
        </>
    )
}
