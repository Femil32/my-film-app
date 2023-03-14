import React from 'react'
import { Nav, Tab } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { BackButton, ButtonTag, PTag } from '../../components/designComponents/MicroComponents'

export default function MyJob() {

    const navigation = useNavigate()

    const discountCard = [1, 2, 3, 4, 5]

    return (
        <>
            <div className="container">
                <div className="my-4">
                    <div className="d-flex justify-content-between align-items-center">
                        <BackButton
                            classes={'mb-0'}
                            title={'My Job'}
                            onClick={() => {
                                navigation('/dashboard/')
                            }}
                        />
                        <ButtonTag className={'btn semibold btn-dark-blue'} value={'Add'} onClick={() => {
                            // navigation('/dashboard/')
                        }} />
                    </div>
                </div>
                <div className="row">
                    <div className='border-teb'>
                        <Tab.Container
                            className='justify-content-sm-center justify-content-strat'
                            defaultActiveKey='All'
                        >
                            <Nav variant='pills'>
                                <Nav.Item className='pointer me-sm-4 me-2'>
                                    <Nav.Link eventKey='All'>All</Nav.Link>
                                </Nav.Item>
                                <Nav.Item className='pointer mx-sm-4 me-2'>
                                    <Nav.Link eventKey='Upcoming'>Upcoming</Nav.Link>
                                </Nav.Item>
                                <Nav.Item className='pointer mx-sm-4 me-2'>
                                    <Nav.Link eventKey='Completed'>Completed</Nav.Link>
                                </Nav.Item>
                            </Nav>
                            <Tab.Content>
                                <Tab.Pane eventKey='All'>
                                    <div className="row my-5">
                                        <div className="col-12">
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
                                                {discountCard.map((e, indexdiscountCard) => {
                                                    return (
                                                        <SwiperSlide className='' key={indexdiscountCard}>
                                                            <div className='card p-3 rounded-10 mb-4'>
                                                                <div className='d-flex justify-content-between border-bottom pb-3'>
                                                                    <div className=''>
                                                                        <PTag classes={'text-dark-blue fw-bold fn-16'} texts={'Dance Crew'} />
                                                                        <PTag classes={''} texts={'Expiry Date - 27 Oct 2021'} />
                                                                    </div>
                                                                </div>
                                                                <div className='my-4'>
                                                                    <PTag className={''} texts={'Genres'} />
                                                                    <PTag classes={'text-dark-blue semibold fn-16'} texts={'Laculis'} />
                                                                </div>
                                                                <div className=''>
                                                                    <PTag className={''} texts={'Budget'} />
                                                                    <div className="d-flex justify-content-between my-1 align-items-center">
                                                                        <PTag classes={'text-dark-blue semibold fn-16'} texts={'Minimum - ₹20000'} />
                                                                        <PTag classes={'text-dark-blue semibold fn-16 mt-0'} texts={'Maximum - ₹2020'} />
                                                                    </div>
                                                                </div>
                                                                <div className=''>
                                                                    <PTag className={''} texts={'Location'} />
                                                                    <PTag classes={'text-dark-blue fn-16 semibold'} texts={'Laculis, shimla'} />
                                                                </div>
                                                                <div className="d-flex my-4">
                                                                    <div className="w-100 mx-2">
                                                                        <ButtonTag classes={'btn-orange semibold w-100'} value={'Delete'} />
                                                                    </div>
                                                                    <div className="w-100 mx-2">
                                                                        <ButtonTag classes={'btn-dark-blue semibold w-100'} value={'Edit'} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </SwiperSlide>
                                                    )
                                                })}
                                            </Swiper>
                                        </div>
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey='Upcoming'>
                                    <div className="row my-5">
                                        <div className="col-12">
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
                                                {discountCard.map((e, indexdiscountCard) => {
                                                    return (
                                                        <SwiperSlide className='' key={indexdiscountCard}>
                                                            <div className='card p-3 rounded-10 mb-4'>
                                                                <div className='d-flex justify-content-between border-bottom pb-3'>
                                                                    <div className=''>
                                                                        <PTag classes={'text-dark-blue fw-bold fn-16'} texts={'Dance Crew'} />
                                                                        <PTag classes={''} texts={'Expiry Date - 27 Oct 2021'} />
                                                                    </div>
                                                                </div>
                                                                <div className='my-4'>
                                                                    <PTag className={''} texts={'Genres'} />
                                                                    <PTag classes={'text-dark-blue semibold fn-16'} texts={'Laculis'} />
                                                                </div>
                                                                <div className=''>
                                                                    <PTag className={''} texts={'Budget'} />
                                                                    <div className="d-flex justify-content-between my-1 align-items-center">
                                                                        <PTag classes={'text-dark-blue semibold fn-16'} texts={'Minimum - ₹20000'} />
                                                                        <PTag classes={'text-dark-blue semibold fn-16 mt-0'} texts={'Maximum - ₹2020'} />
                                                                    </div>
                                                                </div>
                                                                <div className=''>
                                                                    <PTag className={''} texts={'Location'} />
                                                                    <PTag classes={'text-dark-blue fn-16 semibold'} texts={'Laculis, shimla'} />
                                                                </div>
                                                                <div className="d-flex my-4">
                                                                    <div className="w-100 mx-2">
                                                                        <ButtonTag classes={'btn-orange semibold w-100'} value={'Delete'} />
                                                                    </div>
                                                                    <div className="w-100 mx-2">
                                                                        <ButtonTag classes={'btn-dark-blue semibold w-100'} value={'Edit'} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </SwiperSlide>
                                                    )
                                                })}
                                            </Swiper>
                                        </div>
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey='Completed'>
                                    <div className="row my-5">
                                        <div className="col-12">
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
                                                {discountCard.map((e, indexdiscountCard) => {
                                                    return (
                                                        <SwiperSlide className='' key={indexdiscountCard}>
                                                            <div className='card p-3 rounded-10 mb-4'>
                                                                <div className='d-flex justify-content-between border-bottom pb-3'>
                                                                    <div className=''>
                                                                        <PTag classes={'text-dark-blue fw-bold fn-16'} texts={'Dance Crew'} />
                                                                        <PTag classes={''} texts={'Expiry Date - 27 Oct 2021'} />
                                                                    </div>
                                                                </div>
                                                                <div className='my-4'>
                                                                    <PTag className={''} texts={'Genres'} />
                                                                    <PTag classes={'text-dark-blue semibold fn-16'} texts={'Laculis'} />
                                                                </div>
                                                                <div className=''>
                                                                    <PTag className={''} texts={'Budget'} />
                                                                    <div className="d-flex justify-content-between my-1 align-items-center">
                                                                        <PTag classes={'text-dark-blue semibold fn-16'} texts={'Minimum - ₹20000'} />
                                                                        <PTag classes={'text-dark-blue semibold fn-16 mt-0'} texts={'Maximum - ₹2020'} />
                                                                    </div>
                                                                </div>
                                                                <div className=''>
                                                                    <PTag className={''} texts={'Location'} />
                                                                    <PTag classes={'text-dark-blue fn-16 semibold'} texts={'Laculis, shimla'} />
                                                                </div>
                                                                <div className="d-flex my-4">
                                                                    <div className="w-100 mx-2">
                                                                        <ButtonTag classes={'btn-orange semibold w-100'} value={'Delete'} />
                                                                    </div>
                                                                    <div className="w-100 mx-2">
                                                                        <ButtonTag classes={'btn-dark-blue semibold w-100'} value={'Edit'} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </SwiperSlide>
                                                    )
                                                })}
                                            </Swiper>
                                        </div>
                                    </div>
                                </Tab.Pane>
                            </Tab.Content>
                        </Tab.Container>

                        {/* <BottomSheetDialog show={show} setShow={setShow} />
                        <CancelOrder show={open} setOpen={setOpen} />
                        <AddReview show={isopen} setISOpen={setISOpen} /> */}
                    </div>
                </div>
            </div>
        </>
    )
}
