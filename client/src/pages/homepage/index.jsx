import React, { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import bookingsOfferimg from '../../assets/img/base/bookingsOffer.png'
import ChairCameraimg from '../../assets/img/base/ChairCamera.png'
import filmreelimg from '../../assets/img/base/film-reel.png'
import Intercameraimg from '../../assets/img/base/Intercameraimg.png'
import locationsProjects from '../../assets/img/base/locationsProjects.png'
import Lookingfilm from '../../assets/img/base/Lookingfilm.png'
import registerbackgroundimg from '../../assets/img/base/registerbackground.png'
import {
    ButtonTag,
    H1Tag,
    H3Tag,
    H5Tag,
    H6Tag,
    ImgTag,
    PTag
} from '../../components/designComponents/MicroComponents'
// Import Swiper styles
import { Pagination } from 'swiper'
import 'swiper/css'
import "swiper/css/pagination"
import { Actor, CameraMan, HandCamera, location, MemberCameraman, Producation, Singer, Travel } from '../../assets/img'
import { BookingSharicon, Discountsicon } from '../../components/AllSvgs'
// icons
import { CgClose } from 'react-icons/cg'
import { FaPlay } from "react-icons/fa"
import { FiHeart, FiSearch } from "react-icons/fi"
import { TbHistory } from 'react-icons/tb'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { commonMsg } from '../../components/common/ValidationConstants'
import MiniLoader from '../../components/customLoader/MiniLoader'
import { indianAmount } from '../../helpers/functions'
import { couponListing } from '../../store/coupon/slice'
import { postSearch, setSearchResultNull } from '../../store/search/slice'
import { getGlobalBookingAcceptedlist } from '../../store/sellerbookingrequest/slice'
import { RECENT_SEARCH } from '../../utils/constants'

export const HomePage = () => {

    // declaration Hook / store
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // refs
    const searchInput = useRef(null)

    // states
    const [recentSearches, setRecentSearches] = useState([])
    const [filterSearches, setFilterSearches] = useState(null)
    const [recentOpen, setRecentOpen] = useState(false)
    const [searchLoader, setSearchLoader] = useState(false)
    const [discountList, setDiscountList] = useState([])
    const [bookingList, setBookingList] = useState([])

    useEffect(() => {
        let isFetching = true
        Promise.all([dispatch(couponListing()), dispatch(getGlobalBookingAcceptedlist())]).then(res => {
            if (isFetching) {
                setDiscountList(res[0].payload)
                setBookingList(res[1].payload.data)
            }
        })
        return () => isFetching = false
    }, [])

    useEffect(() => {
        let isFetching = true
        if (localStorage.getItem(RECENT_SEARCH) && isFetching) {
            let temp = JSON.parse(localStorage.getItem(RECENT_SEARCH))
            temp = [...new Set(temp)]
            setRecentSearches(temp.reverse())
        }
        document.addEventListener('click', function (e) {
            if (!e.target.classList.contains('aaa') && isFetching) {
                setFilterSearches(null)
                setRecentOpen(false)
            }
        })
        return () => isFetching = false
    }, [])


    const LookingfilmimgArry = [
        {
            Lookingfilmimg: `${Lookingfilm}`,
        },
        {
            Lookingfilmimg: `${Lookingfilm}`,
        },
        {
            Lookingfilmimg: `${Lookingfilm}`,
        },
        {
            Lookingfilmimg: `${Lookingfilm}`,
        },
    ]

    const locationsProjectsArry = [
        {
            Projectsimg: `${locationsProjects}`,
        },
    ]

    const searchKeyword = (searchKeyword) => {
        let params = {
            "searchString": searchKeyword,
            "fromRecord": 0,
            "batchSize": 20,
            "withImage": true
        }

        dispatch(postSearch(params)).then(res => {
            let results = res.payload.data["talentProfiles"].length ? res.payload.data["talentProfiles"] :
                (res.payload.data["locationProfiles"].length ? res.payload.data["locationProfiles"] :
                    (res.payload.data["serviceProfiles"].length ? res.payload.data["serviceProfiles"] :
                        (res.payload.data["crewProfiles"].length ? res.payload.data["crewProfiles"] :
                            [])))
            if (results.length) {
                dispatch(setSearchResultNull())
                navigate('/search/listing', {
                    state: {
                        keywordId: results[0]?.categoryId,
                        keyword: results[0]?.categoryName,
                        searchKeyword: searchKeyword.toLowerCase()
                    }
                })
                if (recentSearches.length > 7) {
                    const temp = recentSearches
                    temp.shift()
                    localStorage.setItem(RECENT_SEARCH, JSON.stringify(temp))
                } else {
                    const temp = [...recentSearches, searchKeyword]
                    localStorage.setItem(RECENT_SEARCH, JSON.stringify(temp))
                }
            } else {
                setSearchLoader(false)
                toast.error(commonMsg.noDataFound)
            }
        })
    }

    const removeRecent = i => {
        let temp = [...recentSearches]
        temp.splice(i, 1)
        setRecentSearches(temp)
        localStorage.setItem(RECENT_SEARCH, JSON.stringify(temp))
    }

    return (
        <>
            <div className='home-page'>
                <div className='container'>
                    <div className='row g-0 productioncamera align-items-center px-4 mb-xl-5 mb-4'>
                        <div className='col-lg-5 col-12 my-4'>
                            <div className='max-w-450 mx-auto'>
                                <ImgTag
                                    src={filmreelimg}
                                    classes={'w-100 h-100 object-fit-cover'}
                                />
                            </div>
                        </div>
                        <div className='col-lg-7 col-12 ps-sm-5 text-lg-start text-center pb-lg-0 pb-4'>
                            <div className='max-w-370 max-w-lg-0 mx-lg-0 mb-sm-0 mb-2 mx-auto'>
                                <H1Tag
                                    classes={
                                        'text-dark-blue fw-bold cousem-under-line d-inline head-text'
                                    }
                                    title={`All your resources to make a film`}
                                />
                            </div>
                            <div>
                                <PTag
                                    classes={'text-dark-blue fn-10 lh-sm-1 mt-sm-2 mx-auto py-sm-2'}
                                    texts={
                                        'Book the best talents, location, crew, service provider for your next project.'
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    {/* Search */}
                    <div className='row g-0 mb-sm-4 mb-3'>
                        <div className='search-bar max-w-950 position-relative mx-auto' >
                            <div className='position-relative search-input shadow-sm rounded d-flex mb-3 justify-content-between align-items-center'>
                                <input
                                    autoComplete='off'
                                    type={'text'}
                                    placeholder={'Search talents, crew, service provider'}
                                    name={'search'}
                                    className={`aaa input w-100 fn-18 fn-xs-14 p-3 px-sm-4`}
                                    onChange={e => {
                                        e.preventDefault()
                                    }}
                                    ref={searchInput}
                                    onKeyDown={e => {
                                        let temp = structuredClone(recentSearches)
                                        setFilterSearches(temp?.filter(a => {
                                            return a?.includes(e.target.value) && a
                                        }))
                                        if (e.target.value.length > 2) {
                                            if (e.key === 'Enter') {
                                                searchKeyword(e.target.value)
                                                setSearchLoader(true)
                                            }
                                        }
                                    }}
                                    onFocusCapture={(e) => {
                                        setRecentOpen(true)
                                        e.preventDefault()
                                    }}
                                />
                                {/* Search Icon */}
                                {!searchLoader ? <FiSearch className='fi-search posi' /> : <MiniLoader width={20} height={20} className={'w-auto h-auto fi-search posi'} />}
                            </div>
                            {recentOpen &&
                                <ul className='recent-search-dropdown aaa' id='divToHide'>
                                    {(filterSearches || recentSearches).map((keyword, i) =>
                                        <li key={i} className='px-4 py-3 d-flex justify-content-between align-items-center' style={{ zIndex: 9 }} onClick={e => {
                                            setSearchLoader(true)
                                            searchKeyword(keyword)
                                        }}>
                                            <div className='d-flex gap-2 align-items-center'>
                                                <TbHistory className='icon' />
                                                <span>{keyword}</span>
                                            </div>
                                            <div className='rounded-circle overflow-hidden' style={{ zIndex: 999 }} onClick={(e) => {
                                                removeRecent(i)
                                                e.stopPropagation()
                                            }}>
                                                <CgClose className='icon' />
                                            </div>
                                        </li>)}
                                </ul>
                            }
                        </div>
                    </div>
                    <div className='row g-0 mb-xl-5 mb-sm-4 mb-3 pb-xl-3 pb-0'>
                        <div className='d-flex justify-content-center align-items-center flex-wrap'>
                            <ButtonTag
                                classes={
                                    'btn-extra-lite-darkyellow mb-sm-0 mb-2 me-sm-3 me-1 fwbolder fn-14 rounded'
                                }
                                value={'Dubbing'}
                            />
                            <ButtonTag
                                classes={
                                    'btn-extra-lite-darkblue mb-sm-0 mb-2 mx-sm-3 mx-1 fwbolder fn-14 rounded'
                                }
                                value={'Makeup'}
                            />
                            <ButtonTag
                                classes={
                                    'btn-extra-lite-darkgreen mb-sm-0 mb-2 mx-sm-3 mx-1 fwbolder fn-14 rounded'
                                }
                                value={'Travel'}
                            />
                            <ButtonTag
                                classes={
                                    'btn-extra-lite-DarkElectricBlue mb-sm-0 mb-2 ms-sm-3 ms-1 fwbolder fn-14 rounded'
                                }
                                value={'Food'}
                            />
                        </div>
                    </div>
                    {/* results multicard*/}
                    <div className='d-flex gap-5'>
                        <Link to={'/search/listing'} state={{ keyword: 'locations', keywordId: 4 }} className='w-100 position-relative text-black'>
                            <div className='resultsmulticard position-relative rounded-10 overflow-hidden bg-light-blue'>
                                <span className='position-absolute bg-light-blue-gradient h-100 w-100'></span>
                                <ImgTag src={location} classes={'w-100 h-100 object-fit-cover'} />
                            </div>
                            <div className='resultstextcard'>
                                <H3Tag classes={'card-head'} title={'Location'} />
                                <PTag texts={'100+ results'} classes={'fn-18 fn-xs-14'} />
                            </div>
                        </Link>
                        <Link to={'/search/listing'} state={{ keyword: 'services', keywordId: 3 }} className='w-100 position-relative text-black'>
                            <div className='resultsmulticard position-relative rounded-10 overflow-hidden bg-light-orange'>
                                <span className='position-absolute bg-light-orange-gradient h-100 w-100'></span>
                                <ImgTag src={HandCamera} classes={'w-100 h-100 object-fit-cover'} />
                            </div>
                            <div className='resultstextcard'>
                                <H3Tag classes={'card-head'} title={'Services'} />
                                <PTag texts={'100+ results'} classes={'fn-18 fn-xs-14'} />
                            </div>
                        </Link>
                        <Link to={'/search/listing'} state={{ keyword: 'crew', keywordId: 2 }} className='w-100 position-relative text-black'>
                            <div className='resultsmulticard position-relative rounded-10 overflow-hidden bg-light-green'>
                                <span className='position-absolute bg-light-green-gradient h-100 w-100'></span>
                                <ImgTag src={Producation} classes={'w-100 h-100 object-fit-cover'} />
                            </div>
                            <div className='resultstextcard'>
                                <H3Tag classes={'card-head'} title={'Crew'} />
                                <PTag texts={'50+ results'} classes={'fn-18 fn-xs-14'} />
                            </div>
                        </Link>
                        <Link to={'/search/listing'} state={{ keyword: 'talent', keywordId: 1 }} className='w-100 position-relative text-black'>
                            <div className='resultsmulticard rounded-10 overflow-hidden bg-light-pink'>
                                <ImgTag src={CameraMan} classes={'w-100 h-100 object-fit-cover'} />
                            </div>
                            <div className='resultstextcard'>
                                <H3Tag classes={'card-head'} title={'Talent'} />
                                <PTag texts={'150+ results'} classes={'fn-18 fn-xs-14'} />
                            </div>
                        </Link>
                    </div>
                    {/* Crew Members at Last Minute? */}
                    <div className='row g-0 align-items-center py-xl-5 mb-xl-5 mb-sm-4 mb-3'>
                        <div className='col-lg-6 col-12'>
                            <div className='camerapro rounded-10 overflow-hidden'>
                                <div className='cameraproimg d-flex justify-content-end align-items-center'>
                                    <ImgTag src={Intercameraimg} classes={'w-100 h-100 object-fit-cover'} />
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-6 col-12 d-flex align-items-center justify-content-center mt-lg-0 mt-sm-3 mt-2'>
                            <div className='max-w-576 max-w-lg-0 text-lg-start text-center'>
                                <div className='max-w-315 max-w-lg-0 mb-lg-0 mb-2'>
                                    <H1Tag
                                        classes={
                                            'text-dark-blue fw-bold border-bottom border-1 border-secondary d-inline head-text'
                                        }
                                        title={`Crew Members at Last Minute?`}
                                    />
                                </div>
                                <div className='mb-lg-0 mb-3'>
                                    <PTag
                                        classes={
                                            'text-dark-blue fn-18 fn-xs-14 line-height-1 mt-lg-2 py-lg-2 '
                                        }
                                        texts={'Browse through 1000s of crew members.'}
                                    />
                                </div>
                                <div className='py-lg-4'>
                                    <Link to={'/search/listing'} state={{ keyword: 'crew', keywordId: 2 }} className="btn btn-orange fn-14 fw-normal">
                                        Book Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Lookingfilm? */}
                <div className='bg-under-line-gray my-xl-5 mb-4'>
                    <div className='row g-0 align-items-center py-xl-5 py-lg-4 py-3 sidebar-lookingfilm px-lg-0 px-4'>
                        <div className='container col-lg-6 col-12 d-lg-flex justify-content-center align-items-center mt-lg-0 mt-sm-3 mt-2 book-an-actor'>
                            <div className='max-w-450 max-w-lg-0 text-lg-start text-center'>
                                <div className='mb-lg-0 mb-2'>
                                    <H1Tag
                                        classes={
                                            'text-dark-blue fw-bold border-bottom border-1 border-secondary d-inline head-text'
                                        }
                                        title={`Looking for Talents for your film?`}
                                    />
                                </div>
                                <div className='mb-lg-0 mb-3'>
                                    <PTag
                                        classes={
                                            'text-dark-blue fn-18 line-height-1 fn-xs-14 mt-lg-2 py-lg-2 '
                                        }
                                        texts={'Don’t worry about it, we got this.'}
                                    />
                                </div>
                                <div className='py-lg-4'>
                                    <Link to={'/search/listing'} state={{ keyword: 'talent', keywordId: 1 }} className='btn-orange fn-14 fw-normal btn'>Book an Actor</Link>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-6 col-12 swiper-section'>
                            <Swiper
                                className='mySwiper'
                                spaceBetween={30}
                                slidesPerView={1.3}
                                breakpoints={{
                                    768: {
                                        slidesPerView: 1.3,
                                        spaceBetween: 30,
                                    },
                                    320: {
                                        slidesPerView: 1.1,
                                        spaceBetween: 15,
                                    },
                                }}
                            >
                                {LookingfilmimgArry.map((e, LookingfilmimgArryIndex) => {
                                    return (
                                        <SwiperSlide className='rounded-10 overflow-hidden locationsProjectsimg' key={LookingfilmimgArryIndex}>
                                            <ImgTag
                                                src={e.Lookingfilmimg}
                                                classes={'w-100 h-100 object-fit-cover'}
                                            />
                                        </SwiperSlide>

                                    )
                                })}
                            </Swiper>
                        </div>
                    </div>
                </div>
                {/* Crew Members at Last Minute? */}
                <div className='container my-xl-5 mb-sm-4 mb-3'>
                    <div className='row g-0 align-items-center py-xl-5'>
                        <div className='col-lg-6 col-12'>
                            <div className='camerapro rounded-10 overflow-hidden'>
                                <div className='cameraproimg d-flex justify-content-end align-items-center'>
                                    <ImgTag src={Intercameraimg} classes={'w-100 h-100 object-fit-cover'} />
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-6 col-12 d-lg-flex align-items-center justify-content-center text-lg-start text-center mt-lg-0 mt-sm-3 mt-2'>
                            <div className='max-w-370 max-w-lg-0'>
                                <div className='mb-lg-0 mb-2'>
                                    <H1Tag
                                        classes={
                                            'text-dark-blue fw-bold border-bottom border-1 border-secondary d-inline head-text'
                                        }
                                        title={`Need service provider on your sets?`}
                                    />
                                </div>
                                <div className='mb-lg-0 mb-3'>
                                    <PTag
                                        classes={
                                            'text-dark-blue fn-18 fn-xs-14 line-height-1 mt-lg-2 py-lg-2 '
                                        }
                                        texts={'That covered for you.'}
                                    />
                                </div>
                                <div className='py-lg-4'>
                                    <Link to={'/search/listing'} state={{ keyword: 'services', keywordId: 3 }} className='btn btn-orange fn-14 fw-normal'>
                                        Book Services
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* locationsProjects*/}
                <div>
                    <div className='row g-0 align-items-center sidebar-lookingfilm py-xl-5 mb-xl-0 mb-4 px-lg-0 px-4'>
                        <div className='container col-lg-6 col-12 d-lg-flex justify-content-center align-items-center book-an-actor mt-lg-0 mt-sm-3 mt-2'>
                            <div className='max-w-370 max-w-lg-0 text-lg-start text-center'>
                                <div className='mb-lg-0 mb-2'>
                                    <H1Tag
                                        classes={
                                            'text-dark-blue fw-bold border-bottom border-1 border-secondary d-inline head-text'
                                        }
                                        title={`Need suitable locations for your Projects?`}
                                    />
                                </div>
                                <div className='mb-lg-0 mb-3'>
                                    <PTag
                                        classes={
                                            'text-dark-blue fn-18 fn-xs-14 line-height-1 mt-lg-2 py-lg-2 '
                                        }
                                        texts={'No worries, we’ve got your back!'}
                                    />
                                </div>
                                <div className='py-lg-4'>
                                    <Link to={'/search/listing'} state={{ keyword: 'locations', keywordId: 4 }} className='btn btn-orange fn-14 fw-normal'>
                                        Book Location
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-6 col-12 swiper-section'>
                            <div className=''>
                                <Swiper
                                    className='mySwiper'
                                    spaceBetween={30}
                                    slidesPerView={1.3}
                                    breakpoints={{
                                        768: {
                                            slidesPerView: 1.3,
                                            spaceBetween: 30,
                                        },
                                        320: {
                                            slidesPerView: 1.1,
                                            spaceBetween: 15,
                                        },
                                    }}
                                >
                                    {locationsProjectsArry.map((e, IndexlocationsProjectsArry) => {
                                        return (
                                            <SwiperSlide className='rounded-10 overflow-hidden locationsProjectsimg' key={IndexlocationsProjectsArry}>
                                                <ImgTag
                                                    src={e.Projectsimg}
                                                    classes={'w-100 h-100 object-fit-cover'}
                                                />
                                            </SwiperSlide>

                                        )
                                    })}
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </div>
                {/* How The Site Works */}
                <div className='container py-xl-5 pt-lg-5 pt-3 my-xl-5 mb-sm-4 mb-3 px-sm-2 px-0'>
                    <div className='bg-extra-lite-orange rounded-10 rounded-sm-0 px-4 position-relative'>
                        <div className='row'>
                            <div className='col-md-6 col-sm-12 col-7 d-flex align-items-center justify-content-center px-xl-5 order-xs-1'>
                                <div className='max-w-576 max-w-lg-0 ChairCamera'>
                                    <ImgTag src={ChairCameraimg} classes={'w-100 h-100'} />
                                </div>
                            </div>
                            <div className='col-md-6 col-sm-12 col-5 d-flex align-items-center justify-content-sm-center justify-content-xl-start pb-lg-0 pb-3 order-xs-0'>
                                <div className='max-w-250 max-w-lg-0 ms-xl-5'>
                                    <div className="d-flex align-items-center justify-content-center bg-dark-orange w-80 h-80 w-md-70 h-md-70 w-xs-60 h-xs-60 rounded-circle">
                                        <FaPlay fontSize={27} color={'#fff'} className={"ms-sm-2 ms-1 w-md-30 h-md-30 w-xs-25 h-xs-25 w-40 h-40"} />
                                    </div>
                                    <H1Tag
                                        classes={'text-dark-blue fw-bold head-text line-height-1.3 mt-lg-5 mt-4'}
                                        title={`How The Site Works`}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*Types Of Categories. */}
                <div className='container my-xl-5 mb-sm-4 mb-3'>
                    <div className='row align-items-center justify-content-center my-xl-5 mb-4'>
                        <div className='max-w-750 max-w-lg-0 text-center mb-xl-0 mb-sm-4 mb-2'>
                            <H1Tag
                                classes={
                                    'text-dark-blue fw-bold border-bottom border-1 border-secondary d-inline head-text'
                                }
                                title={`Select Members From Various Types Of Categories.`}
                            />
                        </div>
                        <div className='d-flex align-items-center justify-content-center my-xl-5'>
                            <ButtonTag
                                classes={'btn-orange fn-14 fw-normal'}
                                value={'45 More Categories'}
                            />
                        </div>
                    </div>
                    {/* Services multicard*/}
                    <div className='row g-0 my-xl-5 mb-lg-4'>
                        <Swiper className='pb-3'
                            spaceBetween={40}
                            slidesPerView={4}
                            pagination={{
                                clickable: true,
                            }}
                            modules={[Pagination]}
                            breakpoints={{
                                376: {
                                    width: 376,
                                    slidesPerView: 1.3,
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
                                }
                            }}
                        >
                            <div className='row text-dark-blue'>
                                <SwiperSlide>
                                    <div className='col-12 position-relative mx-lg-0 mb-sm-4 mb-3 pointer' onClick={() => searchKeyword('cameramans')}>
                                        <div className='resultsmulticard position-relative rounded-10 overflow-hidden bg-light-brown'>
                                            <ImgTag src={MemberCameraman} classes={'w-100 h-100 object-fit-cover'} />
                                        </div>
                                        <div className='resultstextcard text-white'>
                                            <PTag texts={'60+ results'} classes={'fn-18 fn-xs-14'} />
                                            <H3Tag classes={'card-head'} title={'Cameraman'} />
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className='col-12 position-relative mx-lg-0 mb-sm-4 mb-3 pointer' onClick={() => searchKeyword('actors')}>
                                        <div className='resultsmulticard position-relative rounded-10 overflow-hidden bg-light-mint-green'>
                                            <span className='position-absolute bg-light-mintgreen-gradient h-100 w-100'></span>
                                            <ImgTag src={Actor} classes={'w-100 h-100 object-fit-cover'} />
                                        </div>
                                        <div className='resultstextcard text-white'>
                                            <H3Tag classes={'card-head'} title={'Actors'} />
                                            <PTag texts={'100+ results'} classes={'fn-18 fn-xs-14'} />
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className='col-12 position-relative mx-lg-0 mb-sm-4 mb-3 pointer' onClick={() => searchKeyword('travel')}>
                                        <div className='resultsmulticard position-relative rounded-10 overflow-hidden bg-light-yellow'>
                                            <span className='position-absolute bg-light-yellow-gradient h-100 w-100'></span>
                                            <ImgTag src={Travel} classes={'w-100 h-100 object-fit-cover'} />
                                        </div>
                                        <div className='resultstextcard text-white'>
                                            <H3Tag classes={'card-head'} title={'Travel'} />
                                            <PTag texts={'85+ results'} classes={'fn-18 fn-xs-14'} />
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className='col-12 position-relative mx-lg-0 mb-sm-4 mb-3 pointer' onClick={() => searchKeyword('singers')}>
                                        <div className='resultsmulticard position-relative rounded-10 overflow-hidden bg-light-blue'>
                                            <span className='position-absolute bg-light-blue-gradient h-100 w-100'></span>
                                            <ImgTag src={Singer} classes={'w-100 h-100 object-fit-cover'} />
                                        </div>
                                        <div className='resultstextcard text-white'>
                                            <H3Tag classes={'card-head'} title={'Singers'} />
                                            <PTag texts={'66+ results'} classes={'fn-18 fn-xs-14'} />
                                        </div>
                                    </div>
                                </SwiperSlide>
                            </div>
                        </Swiper>
                    </div>
                    {/*providing Discounts */}
                    <div className='row align-items-center justify-content-center my-xl-5 mb-4 py-xl-4'>
                        <div className='max-w-576 max-w-lg-0 text-center'>
                            <H1Tag
                                classes={
                                    'text-dark-blue fw-bold border-bottom border-1 border-secondary d-inline head-text'
                                }
                                title={`Members who are providing Discounts`}
                            />
                        </div>
                    </div>
                    <div className='row pb-5'>
                        {/* Dicountcard */}
                        {discountList?.coupons?.map((member, i) => {
                            return (
                                <div className='col-lg-6 col-12 p-xl-3 mb-xl-0 mb-lg-4 mb-3' key={i}>
                                    <div className='box-shadow max-w-57 d-flex justify-content-between align-items-center rounded-10 p-3'>
                                        <div className='d-flex align-items-center'>
                                            <div className='max-w-120 DiscountsCard rounded-10 overflow-hidden'>
                                                <ImgTag
                                                    src={member?.sellerDetail?.profileImageUrl}
                                                    classes={'w-100 h-100'}
                                                />
                                            </div>
                                            <div className='ps-3'>
                                                <H5Tag
                                                    classes={'text-dark-blue mb-2'}
                                                    title={member?.sellerDetail?.firstName + " " + member?.sellerDetail?.lastName}
                                                />
                                                <PTag
                                                    classes={'text-dark-blue'}
                                                    texts={member.subCategoryName}
                                                />
                                            </div>
                                        </div>
                                        <div className='d-flex align-items-center'>
                                            {member.couponType === "percenatge_discount" &&
                                                <div className='discountsicon-icon'>
                                                    <Discountsicon />
                                                </div>}
                                            <H3Tag
                                                classes={
                                                    'text-orange mt-0 px-sm-4 ps-2 dicountcard-text'
                                                }
                                                title={member.couponType === 'percenatge_discount' ? member.couponValue + "%" : indianAmount(member.couponValue)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    {/* bookings offer */}
                    <div className='bg-extra-lite-red rounded-10 pb-xl-0 pb-4 my-xl-5 mb-4'>
                        <div className='bookingsOffer d-flex justify-content-center'>
                            <div className='bookingsOfferimg max-w-310'>
                                <ImgTag src={bookingsOfferimg} classes={'h-100 w-100'} />
                            </div>
                        </div>
                        <div className='d-flex align-items-center justify-content-center'>
                            <div className='text-center mb-xl-0 mb-sm-4 mb-3'>
                                <H1Tag
                                    classes={'head-text text-orange fw-light'}
                                    title={`Special Offer`}
                                />
                                <H1Tag
                                    classes={
                                        'text-dark-blue fw-bold border-bottom border-2 border-secondary d-inline pb-2 head-text'
                                    }
                                    title={`20% off on bookings`}
                                />
                                <PTag
                                    classes={'fn-20 pt-3 fn-xs-16'}
                                    texts={`Maecenas interdum lorem eleifend orci enimaliquam mollis.`}
                                />
                            </div>
                        </div>
                        <div className='d-flex align-items-center justify-content-center'>
                            <ButtonTag
                                classes={'btn-orange fn-14 fw-normal mt-xl-4 mb-xl-5'}
                                value={'Book Now'}
                            />
                        </div>
                    </div>
                    {/* Successful Bookings */}
                    <div className='row align-items-center justify-content-center my-xl-5 mb-4 py-xl-5'>
                        <div className='max-w-576 text-center'>
                            <H1Tag
                                classes={
                                    'text-dark-blue fw-bold border-bottom border-1 border-secondary d-inline head-text'
                                }
                                title={`Successful Bookings`}
                            />
                            <PTag classes={'fn-20 fn-xs-14 mt-2'} texts={`Our Happy Clinets`} />
                        </div>
                    </div>
                    {/* Bookingcard */}
                    <div className='row py-xl-4 px-sm-0 px-2'>
                        <Swiper
                            className='mySwiper'
                            spaceBetween={30}
                            slidesPerView={4}
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
                            {bookingList?.orders?.map((data, i) => {
                                return (
                                    <SwiperSlide key={i}>
                                        <div className='pt-sm-5 pt-3'>
                                            <div className='p-3 border rounded-10'>
                                                <div className='d-flex align-items-center'>
                                                    <div className='profilecardimg rounded-10 overflow-hidden border bg-white'>
                                                        <ImgTag
                                                            src={
                                                                data?.sellerDetail?.profileImageUrl
                                                            }
                                                            classes={'w-100 h-100'}
                                                        />
                                                    </div>
                                                    <div className='ps-3'>
                                                        <H6Tag
                                                            title={
                                                                data.sellerDetail?.firstName + " " + data.sellerDetail?.lastName
                                                            }
                                                        />
                                                        <div className='d-flex'>
                                                            {Array(5).fill(0).map((_, index) => {
                                                                return (
                                                                    <FiHeart fontSize={20}
                                                                        color={'#f05454'}
                                                                        fill={'#f05454'}
                                                                        className={'mt-1 me-1'}
                                                                        key={index}
                                                                    />
                                                                )
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='my-3 text-capitalize'>
                                                    <PTag texts={data.orderType} />
                                                </div>
                                                <div className='max-w-310 movieadvertisementimg overflow-hidden rounded-10 border bg-white'>
                                                    <ImgTag
                                                        src={
                                                            data?.sellerDetail?.profileImageUrl
                                                        }
                                                        classes={'w-100 h-100'}
                                                    />
                                                </div>
                                                <div className='d-flex justify-content-between align-items-center mt-3'>
                                                    <div className='d-flex align-items-center'>
                                                        <FiHeart fontSize={20}
                                                            color={'#f05454'}
                                                            fill={'#f05454'}
                                                            className={''}
                                                        />
                                                        <PTag
                                                            texts={"129"}
                                                            classes={'px-2'}
                                                        />
                                                    </div>
                                                    <BookingSharicon width={'24'} />
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                )
                            })}
                        </Swiper>
                    </div>
                </div>
                <div className='container rounded-10 overflow-hidden position-relative px-0 py-xl-5 my-xl-5 py-sm-0 py-sm-5 mb-4'>
                    <ImgTag src={registerbackgroundimg} classes={'w-100 h-100'} />
                    <div className='position-absolute top-50 start-50 text-center w-100 translate-middle'>
                        <div className='text-center text-white mb-xl-0 mb-4'>
                            <div className='max-w-400 max-w-xl-340 max-w-xs-0 mx-auto'>
                                <H1Tag
                                    title={'Register yourself as an artist'}
                                    classes={
                                        'border-bottom border-1 border-light d-inline head-text'
                                    }
                                />
                            </div>
                            <PTag classes={'my-2'} texts={'Work for opportunities.'} />
                        </div>
                        <div className='d-flex align-items-center justify-content-center'>
                            <Link to={"/auth"} className='btn btn-orange fn-14 fw-normal my-xl-5'>Register Now</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage