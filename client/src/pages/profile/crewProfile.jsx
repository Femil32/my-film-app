import React, { useEffect, useState } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'
import { Col, Container, Row } from 'react-bootstrap'
import {
    ImageThree,
} from '@/assets/img'
import ImageSliderWithoutOffer from '@/components/common/ImageSliderWithoutOffer'
import {
    ButtonTag,
    CurrentDirectorylink,
    ImgTag,
    InputTag,
    PlayButton,
    PTag,
} from '@/components/designComponents/MicroComponents'
import { Offer } from '@/components/AllSvgs'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
//icons
import { AiFillHeart, AiOutlineShareAlt } from 'react-icons/ai'
import { FiPhone } from 'react-icons/fi'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { profileDetail } from '@/store/search/slice'
import TabScroll from '@/components/common/TabScroll'
import { indianAmount } from '../../helpers/functions'
import IsLoadingHOC from '../../components/higherOrderLoader/IsLoadingHOC'
import { otherProfileFromSeller } from '../../store/search/slice'
import Crew from '../../components/common/profileCards/Crew'
import { addWishlist, deleteWishlistItem } from '../../store/wishlist/slice'
import { useSearchContext } from '../../hooks/useSearchContext'
import { BackButton } from '../../components/designComponents/MicroComponents'

const CrewProfile = ({ setLoading }) => {
    const { otherCrewListing, dispatchSearch } = useSearchContext()
    // hooks
    const location = useLocation()
    const dispatch = useDispatch()
    const navigation = useNavigate()

    // Store state
    const { profileDetails, otherProfilesFromSeller } = useSelector(state => state.search)

    const { userDetail, profileId, profileType } = location?.state?.profile ?? false
    let [count, setCount] = useState(0)

    useEffect(() => {
        // otherFromSeller
        Promise.all([dispatch(profileDetail({ profileId, profileType })), dispatch(otherProfileFromSeller({ userId: userDetail?.userId }))]).then((res) => {
            dispatchSearch({
                type: "OTHER_CREW_DATA",
                payload: res[1].payload?.profiles
            })
            setLoading(false)
        })
    }, [])


    function handleCounter(type) {
        if (type) {
            count = count + 1
            setCount(count)
        } else if (!type) {
            count = count - 1
            setCount(count)
        }
    }

    return (
        <>
            <Container>
                <div className='d-flex justify-content-between align-items-center'>
                    <BackButton
                        textClass={'fn-20'}
                        title={'Listing'}
                        onClick={() => {
                            navigation('/search/listing', {
                                state: {
                                    keyword: "crew", keywordId: 2
                                }
                            })
                        }}
                    />
                </div>
                <CurrentDirectorylink className={'my-3'} routeData={[
                    {
                        name: 'Home',
                        link: '/'
                    },
                    {
                        name: 'search',
                        link: '/'
                    },
                    {
                        name: 'listing',
                        link: '/search/listing',
                        state: { keyword: "crew", keywordId: 2 }
                    },
                    {
                        name: 'crew-profile',
                        link: '/search/listing/crew'
                    },
                ]} />
                <div className='row'>
                    <div className='col-xl-4 col-sm-5'>
                        <ImageSliderWithoutOffer images={profileDetails?.portfolioImages?.map(data => data.imageUrl)} />
                    </div>
                    <div className='col-xl-8 col-sm-7 user-select-none'>
                        <div className='d-flex justify-content-between align-items-center'>
                            <div className='d-flex flex-column mb-3'>
                                <PTag classes={'text-dark-blue fn-17 fw-bold'} texts={`${profileDetails?.profileName} (${profileDetails?.categoryName})`} />
                                <PTag classes={'text-dark-blue fn-10'} texts={`"${profileDetails?.profileDescription}"`} />
                            </div>
                            <div className='d-flex align-items-center text-dark-blue rounded-pill border p-1'>
                                <div
                                    className='d-flex justify-content-center align-items-center rounded-circle w-40 h-40 pointer bg-lite-white'
                                    onClick={() => handleCounter(false)}
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
                                    onClick={() => handleCounter(true)}
                                >
                                    <FaPlus />
                                </div>
                            </div>
                        </div>
                        <div className='mb-3 text-capitalize'>
                            <PTag classes={'text-gray'} texts={profileDetails?.subCategoryName} />
                            <PTag classes={'text-gray'} texts={profileDetails?.subSubCategoryName} />
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
                <TabScroll
                    tabs={[
                        { id: "portfolio", lable: "Portfolio" },
                        { id: "overview", lable: "Overview" },
                        { id: "reviews", lable: "Reviews" },
                    ]}
                >
                    <div id='portfolio'>
                        <PTag
                            classes={'text-dark-blue fw-bold fn-24 py-3'}
                            texts={'Portfolio'}
                        />
                        <Row className='g-3 mb-3'>
                            {profileDetails?.portfolioImages?.map((data, index) => (
                                <Col xl={2} lg={3} sm={4} xs={6} key={index}>
                                    <div className='position-relative h-100 border overflow-hidden rounded-5'>
                                        <ImgTag
                                            src={data.imageUrl}
                                            classes={'object-fit-cover h-100 w-100'}
                                            alt={'img'}
                                        />
                                        <PlayButton />
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </div>
                    <div id='overview'>
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
                            {profileDetails?.rates?.map((rate, i) => {
                                return (
                                    <div className='d-flex justify-content-between align-items-center mb-2' key={i} >
                                        <PTag classes={'text-dark-blue'} texts={rate?.rateLabel} />
                                        <PTag classes={'text-dark-blue bold'} texts={indianAmount(rate.rate)} />
                                    </div>
                                )
                            })}
                            <PTag classes={'text-gray mt-4 mb-2'} texts={'Additional Charges'} />
                            {profileDetails?.additionalCharges?.map((charge, i) => {
                                return (
                                    <div className='d-flex justify-content-between align-items-center mb-2' key={i}>
                                        <PTag classes={'text-dark-blue'} texts={`${charge?.chargeType} (${charge?.isMandatory ? 'Mandatory' : "Not Mandatory"})`} />
                                        <PTag classes={'text-dark-blue bold'} texts={indianAmount(charge?.chargeCost)} />
                                    </div>
                                )
                            })}
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
                                <PTag classes={'text-dark-blue bold'} texts={`${profileDetails?.paymentTerms?.beforeShootAmount}%`} />
                            </div>
                            <div className='d-flex justify-content-between align-items-center mb-2'>
                                <PTag
                                    classes={'text-dark-blue'}
                                    texts={'On Shoot/Delivery'}
                                />
                                <PTag classes={'text-dark-blue bold'} texts={`${profileDetails?.paymentTerms?.onShotAmount}%`} />
                            </div>
                            <div className='d-flex justify-content-between align-items-center mb-2'>
                                <PTag classes={'text-dark-blue'} texts={'Credit Period'} />
                                <PTag classes={'text-dark-blue bold'} texts={`${profileDetails?.paymentTerms?.creditDays} Days`} />
                            </div>
                        </div>
                        <div className='border-bottom py-3 mb-3'>
                            <PTag
                                classes={'text-dark-blue fn-17 fw-bold mb-3'}
                                texts={'Cancelation Policy'}
                            />
                            <div className='d-flex align-items-start'>
                                <span className='text-gray fs-1 line-height-0.5 line-height-xs-0.8 me-2'>
                                    •
                                </span>
                                <div>
                                    <PTag
                                        classes={'text-dark-blue'}
                                        texts={'Cancellation Days before shoot'}
                                    />
                                    <ol className='p-0'>
                                        {profileDetails?.policies?.map((policy, i) => {
                                            return (
                                                <li className='text-dark-gray d-flex' key={i}>
                                                    <span style={{ width: '25px', display: 'block' }}>{i + 1}.</span>
                                                    <span>{`Refund ${policy?.refundpercent}%, when cancelled ${policy?.days} days before the shoot`}</span>
                                                </li>
                                            )
                                        })}
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id='reviews'>
                        <div>
                            <div className='mb-3'>
                                <PTag
                                    classes={'text-dark-blue fn-17 fw-bold py-3'}
                                    texts={'Other category profiles of this seller'}
                                />
                                <Swiper
                                    spaceBetween={25}
                                    slidesPerView={3}
                                    navigation={true}
                                    loop={true}
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
                                    className='mySwiper navigation-down pb-5 row'
                                >
                                    {otherProfilesFromSeller?.otherProfiles?.map((data, i) => (
                                        <SwiperSlide key={i} className="h-unset">
                                            <Crew profile={data} key={i} index={i} otherProfile={true} />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </TabScroll>
                {profileDetails?.coupon?.couponTypeLabel &&
                    <div className='text-center filter-button d-sm-flex pt-0 mb-sm-3'>
                        <div className='d-flex align-items-center bg-extra-lite-skyblue w-100 p-sm-2 p-3'>
                            <div className='bg-dark-orange d-flex align-items-center rounded-3 px-2 py-1 me-2'>
                                <Offer />
                                <PTag texts={`${profileDetails?.coupon?.couponValue} OFF`} classes='text-white bold ms-2' />
                            </div>
                            <PTag classes={'text-dark-blue'} texts={profileDetails?.coupon?.couponTypeLabel} />
                        </div>
                        <div className='pt-sm-0 pt-2 px-2'>
                            <ButtonTag
                                classes={'btn-orange bold rounded white-space-nowrap w-100'}
                                value={'Book Now'}
                            />
                        </div>
                    </div>}
            </Container>
        </>
    )
}

export default IsLoadingHOC(CrewProfile)
