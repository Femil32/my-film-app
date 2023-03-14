import React, { useState } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'
import { Card, Col, Container, Row } from 'react-bootstrap'
import {
    ImageEight,
    ImageFive,
    ImageNine,
    ImageSeven,
    ImageSix,
    ImageTen,
    ImageThree,
} from '../../assets/img'
import ImageSliderWithoutOffer from '../../components/common/ImageSliderWithoutOffer'
import {
    ATag,
    BackButton,
    ButtonTag,
    CurrentDirectorylink,
    ImgTag,
    InputTag,
    PlayButton,
    PTag,
} from '../../components/designComponents/MicroComponents'
import { Offer, Star } from '../../components/AllSvgs'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
//icons
import { AiFillHeart, AiOutlineShareAlt } from 'react-icons/ai'
import { FiPhone } from 'react-icons/fi'

const gallery = [ImageThree, ImageThree, ImageThree, ImageThree]

const ProductProfile = () => {
    let [count, setCount] = useState(0)
    function incrementCount() {
        count = count + 1
        setCount(count)
    }
    function decrementCount() {
        count = count - 1
        setCount(count)
    }
    const portfolio = [
        {
            img: ImageFive,
        },
        {
            img: ImageSix,
        },
        {
            img: ImageSeven,
        },
        {
            img: ImageEight,
        },
        {
            img: ImageNine,
        },
        {
            img: ImageTen,
        },
    ]
    const otherCategory = [
        {
            productImg: ImageThree,
            produtName: 'Nikon Camera',
            category: 'Sub Category',
            reviews: '4.5',
            del: '₹2,50,000',
            BasePrice: '₹1,00,000',
        },
        {
            productImg: ImageThree,
            produtName: 'Nikon Camera',
            category: 'Sub Category',
            reviews: '4.5',
            del: '₹2,50,000',
            BasePrice: '₹1,00,000',
        },
        {
            productImg: ImageThree,
            produtName: 'Nikon Camera',
            category: 'Sub Category',
            reviews: '4.5',
            del: '₹2,50,000',
            BasePrice: '₹1,00,000',
        },
        {
            productImg: ImageThree,
            produtName: 'Nikon Camera',
            category: 'Sub Category',
            reviews: '4.5',
            del: '₹2,50,000',
            BasePrice: '₹1,00,000',
        },
        {
            productImg: ImageThree,
            produtName: 'Nikon Camera',
            category: 'Sub Category',
            reviews: '4.5',
            del: '₹2,50,000',
            BasePrice: '₹1,00,000',
        },
    ]
    return (
        <>
            <Container>
                <BackButton title={'Profile'} />
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
                        <ImageSliderWithoutOffer images={gallery} />
                    </div>
                    <div className='col-xl-8 col-sm-7'>
                        <div className='d-flex justify-content-between align-items-center'>
                            <PTag classes={'text-dark-blue fn-17 fw-bold'} texts={'Nikon Camera'} />
                            <div className='d-flex align-items-center text-dark-blue rounded-pill border p-1'>
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
                        </div>
                        <div className='mb-3'>
                            <PTag classes={'text-gray'} texts={'Inventory Type'} />
                            <PTag classes={'text-gray'} texts={'Inventory Sub-Type'} />
                        </div>
                        <div className='d-flex justify-content-center mb-3'>
                            <ButtonTag
                                classes={'btn btn-hover-dark-orange-border rounded p-10-24 me-3'}
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
                <div>
                    <div className='border-teb mb-3'>
                        <nav id='navbar-example2' className='navbar pb-0'>
                            <ul className='nav nav-pills'>
                                <li className='nav-item'>
                                    <a className='nav-link active' href='#Portfolio'>
                                        Portfolio
                                    </a>
                                </li>
                                <li className='nav-item'>
                                    <a className='nav-link' href='#Overview'>
                                        Overview
                                    </a>
                                </li>
                                <li className='nav-item'>
                                    <a className='nav-link' href='#Reviews'>
                                        Reviews
                                    </a>
                                </li>
                            </ul>
                        </nav>
                        <div
                            data-bs-spy='scroll'
                            data-bs-target='#navbar-example2'
                            data-bs-offset='0'
                            className='scrollspy px-2'
                            tabIndex='0'
                        >
                            <div id='Portfolio'>
                                <PTag
                                    classes={'text-dark-blue fw-bold fn-24 mb-3'}
                                    texts={'Portfolio'}
                                />
                                <Row className='g-3 mb-3'>
                                    {portfolio.map((data, index) => (
                                        <Col xl={2} lg={3} sm={4} xs={6} key={index}>
                                            <div className='position-relative'>
                                                <ImgTag
                                                    src={data.img}
                                                    classes={'img-fluid w-100'}
                                                    alt={'img'}
                                                />
                                                <PlayButton />
                                            </div>
                                        </Col>
                                    ))}
                                </Row>
                            </div>
                            <div id='Overview'>
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
                                    <div className='d-flex justify-content-between align-items-center mb-2'>
                                        <PTag classes={'text-dark-blue'} texts={'Feature Films'} />
                                        <PTag classes={'text-dark-blue bold'} texts={'₹1,00,000'} />
                                    </div>
                                    <div className='d-flex justify-content-between align-items-center mb-2'>
                                        <PTag
                                            classes={'text-dark-blue'}
                                            texts={'TV / Web Series'}
                                        />
                                        <PTag classes={'text-dark-blue bold'} texts={'₹50,000'} />
                                    </div>
                                    <div className='d-flex justify-content-between align-items-center mb-2'>
                                        <PTag
                                            classes={'text-dark-blue'}
                                            texts={'Ads / shorts Films'}
                                        />
                                        <PTag classes={'text-dark-blue bold'} texts={'₹30,000'} />
                                    </div>
                                    <div className='d-flex justify-content-between align-items-center'>
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
                                        <PTag
                                            classes={'text-dark-blue'}
                                            texts={'Advance to be paid'}
                                        />
                                        <PTag classes={'text-dark-blue bold'} texts={'25%'} />
                                    </div>
                                    <div className='d-flex justify-content-between align-items-center mb-2'>
                                        <PTag
                                            classes={'text-dark-blue'}
                                            texts={'On Shoot/Delivery'}
                                        />
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
                            </div>
                            <div id='Reviews'>
                                <div>
                                    <div className='mb-3'>
                                        <PTag
                                            classes={'text-dark-blue fn-17 fw-bold mb-3'}
                                            texts={'Other category profiles of this seller'}
                                        />
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
                                            className='mySwiper navigation-down pb-5'
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
                                                                <div className='border-bottom pb-2 mb-3'>
                                                                    <PTag
                                                                        texts='Base Price'
                                                                        classes='text-dark-gray'
                                                                    />
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
                            </div>
                        </div>
                    </div>
                </div>
                <div className='text-center filter-button d-sm-flex pt-0 mb-sm-3'>
                    <div className='d-flex align-items-center bg-extra-lite-skyblue w-100 p-sm-2 p-3'>
                        <div className='bg-dark-orange d-flex align-items-center rounded-3 px-2 py-1 me-2'>
                            <Offer />
                            <PTag texts='20% OFF' classes='text-white bold ms-2' />
                        </div>
                        <PTag classes={'text-dark-blue'} texts={'Feugiat in ante metus dictum'} />
                    </div>
                    <div className='pt-sm-0 pt-2 px-2'>
                        <ButtonTag
                            classes={'btn-orange bold rounded white-space-nowrap w-100'}
                            value={'Book Now'}
                        />
                    </div>
                </div>
            </Container>
        </>
    )
}

export default ProductProfile
