import React, { useState } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { van, van1 } from '../../assets/img'
import { Offer, Star } from '../../components/AllSvgs'
import ImageSliderWithoutOffer from '../../components/common/ImageSliderWithoutOffer'
import {
    ATag,
    ButtonTag,
    InputTag,
    LITag,
    PTag,
    ULTag,
    ImgTag,
    CurrentDirectorylink,
} from '../../components/designComponents/MicroComponents'
import { FaMinus, FaPlus } from 'react-icons/fa'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
//icons
import { AiFillHeart, AiOutlineShareAlt } from 'react-icons/ai'
import { FiPhone } from 'react-icons/fi'

const TransportServiceDetails = () => {
    let [count, setCount] = useState(0)
    function incrementCount() {
        count = count + 1
        setCount(count)
    }
    function decrementCount() {
        count = count - 1
        setCount(count)
    }
    const gallery = [van1, van1, van1, van1]
    const otherCategory = [
        {
            productImg: van,
            produtName: 'Vanity Van',
            category: 'Sub Category',
            reviews: '4.5',
            del: '₹1000/hr',
            BasePrice: '₹1000/hr',
        },
        {
            productImg: van,
            produtName: 'Vanity Van',
            category: 'Sub Category',
            reviews: '4.5',
            del: '₹1000/hr',
            BasePrice: '₹1000/hr',
        },
        {
            productImg: van,
            produtName: 'Vanity Van',
            category: 'Sub Category',
            reviews: '4.5',
            del: '₹1000/hr',
            BasePrice: '₹1000/hr',
        },
        {
            productImg: van,
            produtName: 'Vanity Van',
            category: 'Sub Category',
            reviews: '4.5',
            del: '₹1000/hr',
            BasePrice: '₹1000/hr',
        },
    ]
    return (
        <>
            <Container>
                <CurrentDirectorylink
                    routeData={[
                        {
                            name: 'home',
                            link: '/'
                        },
                        {
                            name: 'search',
                            link: '/'
                        },
                        {
                            name: 'All Categories',
                            link: '/search/listing'
                        },
                        {
                            name: 'Profile',
                            link: '/search/listing'
                        },
                    ]}
                />
                <div className='row'>
                    <div className='col-xl-4 col-sm-5'>
                        <div className='d-flex flex-column align-items-center'>
                            <ImageSliderWithoutOffer images={gallery} />
                            <PTag
                                classes={'text-dark-blue fn-20 fw-bold text-center mb-2'}
                                texts={'Vanity Van'}
                            />
                            <div className='d-flex align-items-center text-dark-blue rounded-pill border p-1 mb-3'>
                                <div
                                    className='d-flex justify-content-center align-items-center rounded-circle w-40 h-40 pointer bg-lite-white'
                                    onClick={decrementCount}
                                >
                                    <FaMinus />
                                </div>
                                <div className='w50 fn-16 px-1'>
                                    <InputTag
                                        type={'text'}
                                        value={count}
                                        classes={'w-100 text-center fw-bold'}
                                    />
                                </div>
                                <div
                                    className='d-flex justify-content-center align-items-center rounded-circle w-40 h-40 pointer bg-lite-white'
                                    onClick={incrementCount}
                                >
                                    <FaPlus />
                                </div>
                            </div>
                            <div className='d-flex justify-content-center mb-3'>
                                <ButtonTag
                                    classes={
                                        'btn btn-hover-dark-orange-border rounded p-10-24 me-3'
                                    }
                                    value={<AiOutlineShareAlt fontSize={27} className={'Ai-OutlineShareAlt'} />}
                                />
                                <ButtonTag
                                    classes={
                                        'btn btn-extra-lite-green rounded p-10-24 d-flex align-items-center me-3'
                                    }
                                    value={
                                        <>
                                            <FiPhone fontSize={19} />
                                            <PTag classes={'ms-2'} texts={'Call'} />
                                        </>
                                    }
                                />
                                <ButtonTag
                                    classes={'btn btn-hover-dark-red-border'}
                                    value={<AiFillHeart className={'Ai-Fill-Heart'} />}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='col-xl-8 col-sm-7'>
                        <div>
                            <div className='border-bottom pb-3 mb-3'>
                                <PTag
                                    classes={'text-dark-blue fn-17 fw-bold mb-2'}
                                    texts={'Description'}
                                />
                                <PTag
                                    classes={'text-dark-gray'}
                                    texts={
                                        'Feugiat in ante metus dictum at tempor. Dui into faucibus in ornare quam viverra. Elementum a facilisis leo vel fringilla.'
                                    }
                                />
                            </div>
                            <div className='border-bottom pb-3 mb-3'>
                                <PTag
                                    classes={'text-dark-blue fn-17 fw-bold mb-2'}
                                    texts={'Inventory Amenities'}
                                />
                                <div className='d-flex align-items-center mb-2'>
                                    <span className='text-gray fs-1 line-height-0.5 line-height-xs-0.8 me-2'>
                                        •
                                    </span>
                                    <PTag classes={'text-dark-gray'} texts={'Fridge'} />
                                </div>
                                <div className='d-flex align-items-center mb-2'>
                                    <span className='text-gray fs-1 line-height-0.5 line-height-xs-0.8 me-2'>
                                        •
                                    </span>
                                    <PTag classes={'text-dark-gray'} texts={'Electric Toilet'} />
                                </div>
                                <div className='d-flex align-items-center'>
                                    <span className='text-gray fs-1 line-height-0.5 line-height-xs-0.8 me-2'>
                                        •
                                    </span>
                                    <PTag classes={'text-dark-gray'} texts={'Make Up Room'} />
                                </div>
                            </div>
                            <div className='py-3 border-bottom'>
                                <div className='d-flex align-items-center justify-content-between mb-2'>
                                    <PTag
                                        classes={'text-dark-blue fn-17 fw-bold'}
                                        texts={'Charges'}
                                    />
                                    <span className='bg-extra-lite-skyblue text-dark-gray rounded fn-14 py-2 px-3 mb-2'>
                                        Negotiate
                                    </span>
                                </div>
                                <PTag classes={'text-gray mb-2'} texts={'Base Price'} />
                                <div className='d-flex justify-content-between align-items-center mb-4'>
                                    <PTag classes={'text-dark-blue'} texts={'Rate Per Sec/Hr'} />
                                    <PTag classes={'text-dark-blue bold'} texts={'₹20,000 hr'} />
                                </div>
                                <div className='d-flex justify-content-between align-items-center mb-2'>
                                    <PTag classes={'text-dark-blue'} texts={'Taxes'} />
                                    <PTag classes={'text-dark-blue bold'} texts={'25%'} />
                                </div>
                            </div>
                            <div className='border-bottom py-3'>
                                <div className='d-flex align-items-center justify-content-between mb-2'>
                                    <PTag
                                        classes={'text-dark-blue fn-17 fw-bold'}
                                        texts={'Payment Terms'}
                                    />
                                    <span className='bg-extra-lite-skyblue text-dark-gray rounded fn-14 py-2 px-3 mb-2'>
                                        Negotiate
                                    </span>
                                </div>
                                <div className='d-flex justify-content-between align-items-center mb-2'>
                                    <PTag classes={'text-dark-blue'} texts={'Advance to be paid'} />
                                    <PTag classes={'text-dark-blue bold'} texts={'25%'} />
                                </div>
                                <div className='d-flex justify-content-between align-items-center mb-2'>
                                    <PTag classes={'text-dark-blue'} texts={'On Shoot/Delivery'} />
                                    <PTag classes={'text-dark-blue bold'} texts={'25%'} />
                                </div>
                                <div className='d-flex justify-content-between align-items-center mb-2'>
                                    <PTag classes={'text-dark-blue'} texts={'Credit Period'} />
                                    <PTag classes={'text-dark-blue bold'} texts={'20 Days'} />
                                </div>
                            </div>
                            <div className='border-bottom py-3 mb-3'>
                                <PTag
                                    classes={'text-dark-blue fn-17 fw-bold mb-3'}
                                    texts={'Cancelation Policy'}
                                />
                                <div className='d-flex align-items-start mb-2'>
                                    <span className='text-gray fs-1 line-height-0.5 line-height-xs-0.8 me-2'>
                                        •
                                    </span>
                                    <div>
                                        <PTag classes={'text-dark-blue'} texts={'Refund %'} />
                                        <PTag
                                            classes={'text-dark-gray'}
                                            texts={'Elementum a facilisis leo vel fringilla.'}
                                        />
                                    </div>
                                </div>
                                <div className='d-flex align-items-start'>
                                    <span className='text-gray fs-1 line-height-0.5 line-height-xs-0.8 me-2'>
                                        •
                                    </span>
                                    <div>
                                        <PTag
                                            classes={'text-dark-blue'}
                                            texts={'Cancellation Days before shoot'}
                                        />
                                        <PTag
                                            classes={'text-dark-gray'}
                                            texts={
                                                'Refund _%, when cancelled _ days before the shoot'
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <PTag
                                    classes={'text-dark-blue fn-17 fw-bold mb-3'}
                                    texts={'Similar Items'}
                                />
                                <Swiper
                                    spaceBetween={25}
                                    slidesPerView={2}
                                    navigation={true}
                                    modules={[Navigation]}
                                    breakpoints={{
                                        1280: {
                                            slidesPerView: 2.2,
                                        },
                                        768: {
                                            slidesPerView: 1.2,
                                        },
                                        320: {
                                            slidesPerView: 1.1,
                                            spaceBetween: 15,
                                        },
                                    }}
                                    className='mySwiper navigation-remove'
                                >
                                    {otherCategory.map((data, index) => (
                                        <SwiperSlide key={index}>
                                            <Card className='border product-card rounded-16 position-relative p-3 mb-3'>
                                                <div>
                                                    <div className='position-relative rounded-10 max-h-300 overflow-hidden product-img mb-3'>
                                                        <ImgTag
                                                            src={data.productImg}
                                                            classes={
                                                                'img-fluid object-fit-cover h-100 w-100'
                                                            }
                                                        />
                                                        <div className='bg-dark-orange d-flex align-items-center rounded-3 position-absolute top-10 start-10 px-2 py-1'>
                                                            <Offer />
                                                            <PTag
                                                                texts='20% OFF'
                                                                classes='text-white bold ms-2'
                                                            />
                                                        </div>
                                                        <div className='like-box Ai-Fill-Heart-parent d-flex justify-content-center align-items-center pointer'>
                                                            <AiFillHeart className={'Ai-Fill-Heart'} />
                                                        </div>
                                                    </div>
                                                    <Card.Body className='p-0'>
                                                        <div className='d-flex justify-content-between align-items-start mb-3'>
                                                            <div>
                                                                <PTag
                                                                    texts={data.produtName}
                                                                    classes='text-dark-blue fn-17 fw-bold'
                                                                />
                                                                <PTag
                                                                    texts={data.category}
                                                                    classes='text-dark-blue mt-1'
                                                                />
                                                            </div>
                                                            <div className='bg-extra-lite-skyblue d-flex align-items-center rounded-2 px-2'>
                                                                <div className='w-12 me-1'>
                                                                    <Star />
                                                                </div>
                                                                <PTag
                                                                    texts={data.reviews}
                                                                    classes='text-dark-gray fn-12'
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className='mb-3'>
                                                            <PTag
                                                                texts={
                                                                    <>
                                                                        {data.BasePrice}
                                                                        <del className='text-gray fn-14 ms-2'>
                                                                            {data.del}
                                                                        </del>
                                                                    </>
                                                                }
                                                                classes='text-dark-blue fn-17 fw-bold'
                                                            />
                                                        </div>
                                                        <Row className='g-2'>
                                                            <Col xs={6}>
                                                                <ButtonTag
                                                                    value='Check Availability'
                                                                    classes='btn btn-extra-lite-green semibold fn-12 rounded white-space-nowrap w-100'
                                                                />
                                                            </Col>
                                                            <Col xs={6}>
                                                                <ButtonTag
                                                                    value='Book Directly'
                                                                    classes='btn btn-orange semibold fn-12 rounded white-space-nowrap w-100'
                                                                />
                                                            </Col>
                                                        </Row>
                                                    </Card.Body>
                                                </div>
                                            </Card>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>
                        <div className='filter-button px-sm-0 px-2 mb-sm-3'>
                            <ButtonTag
                                classes={'btn-orange bold rounded w-100'}
                                value={'Book Now'}
                            />
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default TransportServiceDetails
