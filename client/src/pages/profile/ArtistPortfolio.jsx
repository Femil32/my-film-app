import {
    ProfilePictureThree,
    StarIcon,
    ImageFive,
    ImageSix,
    ImageSeven,
    ImageEight,
    ImageNine,
    ImageTen,
    ImageEleven,
    ImageTwelve,
    ImageThree,
} from '../../assets/img'
import {
    BackButton,
    ATag,
    PTag,
    ImgTag,
    ButtonTag,
    PlayButton,
    CurrentDirectorylink,
} from '../../components/designComponents/MicroComponents'
import {
    Offer,
    Star,
} from '../../components/AllSvgs'
import { Card, Col, Row } from 'react-bootstrap'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper'
import { useNavigate } from 'react-router-dom'
//icons
import { AiFillHeart, AiOutlineShareAlt } from 'react-icons/ai'
import { FiPhone, FiChevronRight } from 'react-icons/fi'
import { FaLinkedinIn, FaTwitter } from 'react-icons/fa'
import { MdLocationOn } from 'react-icons/md'

const ArtistPortfolio = () => {
    const navigation = useNavigate()
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
    const certificate = [
        {
            certificateImg: ImageEleven,
            certificateText: 'Certificate For',
        },
        {
            certificateImg: ImageEleven,
            certificateText: 'Certificate For',
        },
        {
            certificateImg: ImageEleven,
            certificateText: 'Certificate For',
        },
        {
            certificateImg: ImageEleven,
            certificateText: 'Certificate For',
        },
        {
            certificateImg: ImageEleven,
            certificateText: 'Certificate For',
        },
    ]

    window.onscroll = () => {
        const PortfolioTab = document.querySelector('.Portfolio');
        const Portfolioid = document.getElementById('Portfolio');
        const OverviewTab = document.querySelector('.Overview');
        const Overviewid = document.getElementById('Overview');
        const ReviewsTab = document.querySelector('.Reviews');
        const Reviewsid = document.getElementById('Reviews');
        const ReviewsContent = document.querySelector('#Reviews');
        let ReviewContentPosition = 0
        ReviewContentPosition += (ReviewsContent.offsetTop);
        Portfolioid.style.paddingTop = '0px'
        if (window.scrollY < 590) {
            PortfolioTab.classList.add("active");
            OverviewTab.classList.remove('active')
            ReviewsTab.classList.remove('active')
            Portfolioid.style.paddingTop = '80px'
            Reviewsid.style.paddingTop = '0px'
            Overviewid.style.paddingTop = '0px'
        } else if (window.scrollY < ReviewContentPosition - 200) {
            OverviewTab.classList.add('active')
            PortfolioTab.classList.remove("active");
            ReviewsTab.classList.remove("active");
            Overviewid.style.paddingTop = '80px'
            Portfolioid.style.paddingTop = '80px'
            Reviewsid.style.paddingTop = '0px'
        }
        else {
            ReviewsTab.classList.add('active')
            PortfolioTab.classList.remove("active");
            OverviewTab.classList.remove('active')
            Reviewsid.style.paddingTop = '80px'
            Portfolioid.style.paddingTop = '80px'
            Overviewid.style.paddingTop = '80px'
        }
    }


    return (
        <>
            <div className='container'>
                <div className='mt-3'>
                    <BackButton
                        title={'Profile'}
                        onClick={() => {
                            navigation('/dashboard')
                        }}
                    />
                </div>
                <div>
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
                        ]}
                    />
                    <div className='d-flex align-items-center mb-3'>
                        <div className='max-w-80 w-100 h-80 rounded-10 overflow-hidden me-2'>
                            <ImgTag
                                src={ProfilePictureThree}
                                alt={'profile'}
                                className={'img-fluid'}
                            />
                        </div>
                        <div className='w-100'>
                            <div className='d-flex align-items-center justify-content-between mb-1'>
                                <PTag
                                    classes={'text-dark-blue fn-17 fw-bold'}
                                    texts={'Kumar Biswas'}
                                />
                                <div className='bg-extra-lite-skyblue d-flex align-items-center rounded-2 px-2'>
                                    <div className='w-12 me-1'>
                                        <ImgTag
                                            src={StarIcon}
                                            alt={'star'}
                                            className={'img-fluid w-100'}
                                        />
                                    </div>
                                    <PTag classes='text-dark-gray fn-12' texts={'4.5'} />
                                </div>
                            </div>
                            <div className='d-flex align-items-center justify-content-between'>
                                <div className='d-flex align-items-center'>
                                    <MdLocationOn fontSize={25} fill={'rgb(135 146 160)'} />
                                    <PTag classes='text-gray' texts={'Mumbai'} />
                                </div>
                                <PTag classes='text-navy-blue fn-12 bold' texts={'4 Reviews'} />
                            </div>
                        </div>
                    </div>
                    <div className='d-flex justify-content-center mb-3'>
                        <ButtonTag
                            classes={'btn btn-hover-dark-orange-border rounded p-10-24 me-3'}
                            value={
                                <AiOutlineShareAlt fontSize={27} className={'Ai-OutlineShareAlt'} />
                            }
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
                <div>
                    <div className='border-teb mb-3'>
                        <nav id='navbar-example2' className='navbar pb-0'>
                            <ul className='nav nav-pills'>
                                <li className='nav-item'>
                                    <a className='nav-link Portfolio ' href='#Portfolio'>
                                        Portfolio
                                    </a>
                                </li>
                                <li className='nav-item'>
                                    <a className='nav-link Overview' href='#Overview'>
                                        Overview
                                    </a>
                                </li>
                                <li className='nav-item'>
                                    <a className='nav-link Reviews' href='#Reviews'>
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
                                <div>
                                    <PTag
                                        classes={'text-dark-blue fw-bold fn-24 mb-2'}
                                        texts={'Overview'}
                                    />
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
                                </div>
                                <div>
                                    <PTag
                                        classes={'text-dark-blue fn-17 fw-bold mb-2'}
                                        texts={'Vitals'}
                                    />
                                    <Row className='g-4 mb-3'>
                                        <Col xl={2} lg={3} xs={4}>
                                            <PTag
                                                classes={'text-dark-gray mb-1'}
                                                texts={'Height'}
                                            />
                                            <PTag classes={'text-dark-blue bold'} texts={`5'9`} />
                                        </Col>
                                        <Col xl={2} lg={3} xs={4}>
                                            <PTag
                                                classes={'text-dark-gray mb-1'}
                                                texts={'Weight'}
                                            />
                                            <PTag
                                                classes={'text-dark-blue bold'}
                                                texts={`81 kgs`}
                                            />
                                        </Col>
                                        <Col xl={2} lg={3} xs={4}>
                                            <PTag
                                                classes={'text-dark-gray mb-1'}
                                                texts={'Chest/Bust'}
                                            />
                                            <PTag classes={'text-dark-blue bold'} texts={`32 in`} />
                                        </Col>
                                        <Col xl={2} lg={3} xs={4}>
                                            <PTag classes={'text-dark-gray mb-1'} texts={'Waist'} />
                                            <PTag classes={'text-dark-blue bold'} texts={`32 in`} />
                                        </Col>
                                        <Col xl={2} lg={3} xs={4}>
                                            <PTag
                                                classes={'text-dark-gray mb-1'}
                                                texts={'Hair Colour'}
                                            />
                                            <PTag classes={'text-dark-blue bold'} texts={`Black`} />
                                        </Col>
                                        <Col xl={2} lg={3} xs={4}>
                                            <PTag
                                                classes={'text-dark-gray mb-1'}
                                                texts={'Screen Age'}
                                            />
                                            <PTag
                                                classes={'text-dark-blue bold'}
                                                texts={`24 - 32`}
                                            />
                                        </Col>
                                        <Col xl={2} lg={3} xs={4}>
                                            <PTag
                                                classes={'text-dark-gray mb-1'}
                                                texts={'Eye colour'}
                                            />
                                            <PTag classes={'text-dark-blue bold'} texts={`Hazel`} />
                                        </Col>
                                        <Col xl={2} lg={3} xs={4}>
                                            <PTag
                                                classes={'text-dark-gray mb-1'}
                                                texts={'Hip Size'}
                                            />
                                            <PTag classes={'text-dark-blue bold'} texts={`38 in`} />
                                        </Col>
                                    </Row>
                                </div>
                                <div className='border-top border-bottom py-3 mb-3'>
                                    <PTag
                                        classes={'text-dark-blue fn-17 fw-bold mb-2'}
                                        texts={'Past Projects'}
                                    />
                                    <ATag
                                        classes={
                                            'd-flex justify-content-between align-items-center pointer'
                                        }
                                    >
                                        <div className='d-flex align-items-center text-navy-blue'>
                                            <span className='fs-1 line-height-1 me-2'>•</span>
                                            <PTag texts={'imdb link'} />
                                        </div>
                                        <div>
                                            <FiChevronRight fontSize={25} color={'#427cc3'} />
                                        </div>
                                    </ATag>
                                </div>
                                <div className='pb-2 border-bottom'>
                                    <PTag
                                        classes={'text-dark-blue fn-17 fw-bold mb-3'}
                                        texts={'Certificates & Awards'}
                                    />
                                    <Swiper
                                        className='pb-4'
                                        spaceBetween={20}
                                        slidesPerView={4}
                                        pagination={{
                                            clickable: true,
                                        }}
                                        modules={[Pagination]}
                                        breakpoints={{
                                            376: {
                                                width: 376,
                                                slidesPerView: 1.2,
                                            },
                                            640: {
                                                width: 640,
                                                slidesPerView: 2,
                                            },
                                            768: {
                                                width: 768,
                                                slidesPerView: 3,
                                            },
                                            1000: {
                                                width: 1000,
                                                slidesPerView: 3.2,
                                            },
                                        }}
                                    >
                                        {certificate.map((data, index) => (
                                            <SwiperSlide key={index}>
                                                <div>
                                                    <div className='mb-2'>
                                                        <ImgTag
                                                            classes={'img-fluid w-100'}
                                                            src={data.certificateImg}
                                                        />
                                                    </div>
                                                    <PTag
                                                        classes={'text-dark-blue text-center fn-16'}
                                                        texts={data.certificateText}
                                                    />
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                                <div className='py-3 border-bottom text-capitalize'>
                                    <PTag
                                        classes={'text-dark-blue fn-17 fw-bold mb-3'}
                                        texts={'Connected Social Profile'}
                                    />
                                    <ATag classes={'d-flex align-items-center pointer mb-3'}>
                                        <div className='me-3'>
                                            <FaLinkedinIn fontSize={20} />
                                        </div>
                                        <PTag classes={'text-dark-blue'} texts={'LinkedIn'} />
                                    </ATag>
                                    <ATag classes={'d-flex align-items-center pointer'}>
                                        <div className='me-3'>
                                            <FaTwitter fontSize={20} />
                                        </div>
                                        <PTag classes={'text-dark-blue'} texts={'Twitter'} />
                                    </ATag>
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
                                            classes={'text-dark-blue fw-bold fn-24 mb-3'}
                                            texts={'Reviews'}
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
                                            {receivedReviews.map((data, index) => (
                                                <SwiperSlide key={index}>
                                                    <Card className='border product-card rounded-16 position-relative p-3 mb-3'>
                                                        <div className='position-absolute top-15 end-15'>
                                                            <ButtonTag
                                                                classes={'btn-extra-lite-green'}
                                                                value={<FiPhone fontSize={19} />}
                                                            />
                                                        </div>
                                                        <div className='d-flex mb-2'>
                                                            <div className='max-w-80 w-100 h-80 rounded-10 overflow-hidden me-2'>
                                                                <ImgTag
                                                                    classes={
                                                                        'img-fluid object-fit-cover h-100'
                                                                    }
                                                                    src={data.profile}
                                                                />
                                                            </div>
                                                            <div className='w-100'>
                                                                <div>
                                                                    <div className='d-flex mb-2'>
                                                                        <Star
                                                                            width={14}
                                                                            className={'me-2'}
                                                                        />
                                                                        <Star
                                                                            width={14}
                                                                            className={'me-2'}
                                                                        />
                                                                        <Star
                                                                            width={14}
                                                                            className={'me-2'}
                                                                        />
                                                                        <Star
                                                                            width={14}
                                                                            fill={'#DEE4EB'}
                                                                            className={'me-2'}
                                                                        />
                                                                        <Star
                                                                            width={14}
                                                                            fill={'#DEE4EB'}
                                                                            className={'me-2'}
                                                                        />
                                                                    </div>
                                                                    <PTag
                                                                        texts={data.profileName}
                                                                        classes={
                                                                            'text-dark-blue fn-17 fw-bold mb-1'
                                                                        }
                                                                    />
                                                                </div>
                                                                <div className='d-flex align-items-center'>
                                                                    <MdLocationOn fontSize={25} fill={'rgb(135 146 160)'} />
                                                                    <PTag
                                                                        classes={'text-gray'}
                                                                        texts={data.location}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <PTag
                                                            classes={'text-dark-gray mb-3'}
                                                            texts={data.description}
                                                        />
                                                        <div className='max-h-260 rounded-10 overflow-hidden'>
                                                            <ImgTag
                                                                classes={
                                                                    'img-fluid object-fit-cover w-100 h-100'
                                                                }
                                                                src={data.image}
                                                            />
                                                        </div>
                                                    </Card>
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    </div>
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
            </div>
        </>
    )
}

export default ArtistPortfolio
