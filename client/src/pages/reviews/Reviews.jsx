import React from 'react'
import {
    BackButton
} from '../../components/designComponents/MicroComponents'
import { Container, Nav, Tab } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Swiper } from 'swiper/react'
import { Navigation } from 'swiper'
import { ImageTwelve } from '../../assets/img'
//icons
import ReviewCard from './ReviewCard';
import { SwiperSlide } from 'swiper/react'

const Reviews = () => {
    const navigate = useNavigate()

    const givenReviews = [
        {
            profile: ImageTwelve,
            profileName: 'Anthony James',
            location: 'Pune',
            description:
                'Feugiat in ante metus dictum at tempor. Dui into faucibus in ornare quam viverra. Elementum a facilisis leo vel fringilla.',
            image: ImageTwelve,
        },
        {
            profile: ImageTwelve,
            profileName: 'Anthony James',
            location: 'Pune',
            description:
                'Feugiat in ante metus dictum at tempor. Dui into faucibus in ornare quam viverra. Elementum a facilisis leo vel fringilla.',
            image: ImageTwelve,
        },
        {
            profile: ImageTwelve,
            profileName: 'Anthony James',
            location: 'Pune',
            description:
                'Feugiat in ante metus dictum at tempor. Dui into faucibus in ornare quam viverra. Elementum a facilisis leo vel fringilla.',
            image: ImageTwelve,
        },
        {
            profile: ImageTwelve,
            profileName: 'Anthony James',
            location: 'Pune',
            description:
                'Feugiat in ante metus dictum at tempor. Dui into faucibus in ornare quam viverra. Elementum a facilisis leo vel fringilla.',
            image: ImageTwelve,
        },
    ]
    const receivedReviews = [
        {
            profile: ImageTwelve,
            profileName: 'Anthony James',
            location: 'Pune',
            description:
                'Feugiat in ante metus dictum at tempor. Dui into faucibus in ornare quam viverra. Elementum a facilisis leo vel fringilla.',
            image: ImageTwelve,
        },
        {
            profile: ImageTwelve,
            profileName: 'Anthony James',
            location: 'Pune',
            description:
                'Feugiat in ante metus dictum at tempor. Dui into faucibus in ornare quam viverra. Elementum a facilisis leo vel fringilla.',
            image: ImageTwelve,
        },
        {
            profile: ImageTwelve,
            profileName: 'Anthony James',
            location: 'Pune',
            description:
                'Feugiat in ante metus dictum at tempor. Dui into faucibus in ornare quam viverra. Elementum a facilisis leo vel fringilla.',
            image: ImageTwelve,
        },
        {
            profile: ImageTwelve,
            profileName: 'Anthony James',
            location: 'Pune',
            description:
                'Feugiat in ante metus dictum at tempor. Dui into faucibus in ornare quam viverra. Elementum a facilisis leo vel fringilla.',
            image: ImageTwelve,
        },
    ]
    return (
        <Container>
            <BackButton
                title={'Reviews'}
                classes={'mb-3'}
                onClick={() => {
                    navigate('/dashboard')
                }}
            />
            <div className='border-teb mb-3'>
                <Tab.Container
                    id='reviews'
                    className='justify-content-sm-center justify-content-strat'
                    defaultActiveKey='Given'
                >
                    <Nav variant='pills'>
                        <Nav.Item className='pointer me-sm-4 me-2'>
                            <Nav.Link eventKey='Given'>Given</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className='pointer mx-sm-4 me-2'>
                            <Nav.Link eventKey='Received'>Received</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Tab.Content>
                        <Tab.Pane eventKey='Given'>
                            <Swiper
                                spaceBetween={25}
                                slidesPerView={3}
                                navigation={true}
                                modules={[Navigation]}
                                breakpoints={{
                                    1440: {
                                        slidesPerView: 3,
                                    },
                                    768: {
                                        slidesPerView: 2,
                                    },
                                    320: {
                                        slidesPerView: 1.1,
                                        spaceBetween: 15,
                                    },
                                }}
                                className='mySwiper navigation-down pb-5 px-2'
                            >
                                {givenReviews.map((data, index) => (
                                    <SwiperSlide key={index} className={'mt-2'}>
                                        <ReviewCard
                                            profile={data.profile}
                                            profileName={data.profileName}
                                            location={data.location}
                                            description={data.description}
                                            image={data.image}
                                        />
                                    </SwiperSlide>

                                ))}
                            </Swiper>
                        </Tab.Pane>
                        <Tab.Pane eventKey='Received'>
                            <Swiper
                                spaceBetween={25}
                                slidesPerView={3}
                                navigation={true}
                                modules={[Navigation]}
                                breakpoints={{
                                    1440: {
                                        slidesPerView: 3,
                                    },
                                    768: {
                                        slidesPerView: 2,
                                    },
                                    320: {
                                        slidesPerView: 1.1,
                                        spaceBetween: 15,
                                    },
                                }}
                                className='mySwiper navigation-down pb-5 px-2'
                            >
                                {receivedReviews.map((data, index) => (
                                    <SwiperSlide key={index} className={'mt-2'}>
                                        <ReviewCard
                                            profile={data.profile}
                                            profileName={data.profileName}
                                            location={data.location}
                                            description={data.description}
                                            image={data.image}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </div>
        </Container>
    )
}

export default Reviews
