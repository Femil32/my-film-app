import React, { useEffect, useState } from 'react'
import { Col, Container, Modal } from 'react-bootstrap'
import { BackButton, ButtonTag, ImgTag, PTag, RedirectCard } from '../../components/designComponents/MicroComponents'
import { OfferIcon } from '../../assets/img'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { deleteWishlistItem, getWishlist } from '../../store/wishlist/slice'
import IsLoadingHOC from '../../components/higherOrderLoader/IsLoadingHOC'
import { AiFillHeart } from 'react-icons/ai'
import { MdClose, MdLocationOn } from 'react-icons/md'
import { Star } from '../../components/AllSvgs'
import { useSearchContext } from '../../hooks/useSearchContext'
import { setBookProfile } from '../../store/requestavailability/slice'

const Wishlist = ({ setLoading }) => {
    const navigation = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    const wishlistProfile = useSelector(state => state.wishlist)

    const [wishListItems, setWishListItems] = useState([])
    const [bookNowModel, setBookNowModel] = useState(false)


    useEffect(() => {
        dispatch(getWishlist())
    }, [])

    useEffect(() => {
        switch (wishlistProfile?.status) {
            case 'succeed':
                switch (wishlistProfile?.type) {
                    case 'GET_WISHLIST':
                        setWishListItems(wishlistProfile?.wishlist)
                        setLoading(false)
                        break;

                    default:
                        break;
                }
                break;

            default:
                break;
        }
    }, [wishlistProfile])

    const removeItem = (index, wishlistItemId) => {
        let temp = [...wishListItems]
        temp.splice(index, 1)
        setWishListItems(temp)
        dispatch(deleteWishlistItem(wishlistItemId))
    }

    return (
        <>
            <Container>
                <BackButton
                    title={'My wishlist'}
                    classes={'mb-3'}
                    onClick={() => {
                        navigation('/search/listing', {
                            replace: true,
                            state: {
                                keyword: "crew", keywordId: 2
                            }
                        })
                    }}
                />
                <div className="row">
                    {wishListItems?.map((profile, i) => {
                        return (
                            <Col xl={4} sm={6} className="mb-3" key={i}>
                                <Link to={`/search/listing/crew`} state={{ profile }} className='card product-card rounded-16 p-3 h-100'>
                                    <div className='position-relative border rounded-10 overflow-hidden product-img mb-3 remove-position bg-secondary'>
                                        {/* Offer Icon */}
                                        {profile?.coupon?.couponTypeLabel &&
                                            <div className='bg-dark-orange d-flex align-items-center rounded-3 position-absolute top-10 start-10 px-2 py-1'>
                                                <ImgTag src={OfferIcon} alt='offer' />
                                                <PTag texts={`${profile?.coupon?.couponValue}%  ${profile?.coupon?.couponTypeLabel}`} classes='text-white bold ms-2' />
                                            </div>
                                        }
                                        {/* Heart Icon */}
                                        <div className={`${profile?.wishlistItemId && 'active like-box'} d-flex justify-content-center align-items-center pointer`}
                                            onClick={(e) => {
                                                e.preventDefault()
                                                removeItem(i, profile?.wishlistItemId)
                                            }}
                                        >
                                            <AiFillHeart color={`${profile?.wishlistItemId ? 'red' : '#526276'}`} className={'Ai-Fill-Heart'} />
                                        </div>
                                        <div className='mx-auto h-100 w-100'>
                                            <ImgTag src={profile?.profileImage?.imageUrl} alt={profile?.profileImage?.imageName} classes='object-fit-contain w-100 h-100' />
                                        </div>
                                    </div>
                                    <div className='card-body p-0 d-flex flex-column'>
                                        <div className='d-flex justify-content-between align-items-start mb-3'>
                                            <div>
                                                <PTag texts={profile?.sellerDetail?.firstName + " " + profile?.sellerDetail?.lastName} classes='text-dark-blue fn-17 fw-bold' />
                                                <PTag texts={profile?.profileType.split('/')[2] || profile?.profileType.split('/')[1]} classes='text-dark-blue text-capitalize' />
                                            </div>
                                            <div className='bg-extra-lite-skyblue d-flex align-items-center justify-content-center rounded-2 px-2'>
                                                <Star width={12} className='me-1 mb-1' />
                                                <p className='text-dark-gray'>{profile?.profileRating}</p>
                                            </div>
                                        </div>
                                        <div className='d-flex justify-content-between align-items-start mt-auto'>
                                            <div>
                                                <PTag texts='Base Price' classes='text-dark-gray' />
                                                {profile?.rates?.map((rate, i) => {
                                                    return (
                                                        <div className='d-flex text-dark' key={i}>
                                                            <small>{rate.rateLabel} :</small>
                                                            <small>{' ₹' + rate.rate}</small>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                            <div className='d-flex align-items-center'>
                                                <MdLocationOn fontSize={25} fill={'rgb(135 146 160)'} />
                                                <PTag texts={profile?.locationCityName ?? profile?.sellerDetail?.userLocation ?? 'NA'} classes='text-gray' />
                                            </div>
                                        </div>
                                        <Row className='g-2 border-top pt-2 d-flex align-items-center justify-content-between mt-2'>
                                            <ButtonTag
                                                value='Book Directly'
                                                classes='btn btn-orange semibold fn-12 rounded white-space-nowrap w-100'
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    dispatch(setBookProfile(profile))
                                                    setBookNowModel(true)
                                                }}
                                            />
                                        </Row>
                                    </div>
                                </Link>
                            </Col>
                        )
                    }
                    )}
                    {wishListItems?.length === 0 &&
                        <RedirectCard
                            text={`Add items in Wishlist`}
                            label={'Add items'}
                            link={`/search/listing`}
                            state={{
                                keyword: "crew",
                                keywordId: 2
                            }}
                        />}
                </div>
                <Modal
                    show={bookNowModel}
                    onHide={() => setBookNowModel(false)}
                    dialogClassName='max-w-400'
                    centered
                >
                    <div
                        className='text-white fs-4 bg-navy-blue w50 h50 d-flex justify-content-center align-items-center rounded-circle pointer close-icon'
                        onClick={() => {
                            setBookNowModel(false)
                        }}
                    >
                        <MdClose fontSize={30} className={'Md-Close'} />
                    </div>
                    <Modal.Body className='p-0 '>
                        <div className={'px-4'}>
                            <div className='py-4 border-bottom'>
                                <h6 className='mb-2 fw-bold'>Select Project</h6>
                                <p className=''>Check availability before booking.Charges and
                                    terms can be negotiated once seller indicates
                                    availability.</p>
                            </div>
                            <div className='py-4 border-bottom'>
                                <h6 className='mb-2 fw-bold'>Check Availability</h6>
                                <p className=''>
                                    Check availability against specific booking
                                    dates</p>
                                <Link to='/dashboard/orders/check-availability' className='btn btn-dark-blue w-100 mt-3'>
                                    Check Availability
                                </Link>
                            </div>
                            <div className='py-4'>
                                <h6 className='mb-2 fw-bold'>Book Directly</h6>
                                <p className=''>
                                    Are you sure on availability,cancellation charges
                                    will be applicable.</p>
                                <Link to='/dashboard/orders/book-directly' className='btn btn-dark-blue w-100 mt-3'>
                                    Book Now
                                </Link>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </Container>
        </>
    )
}

export default IsLoadingHOC(Wishlist)
