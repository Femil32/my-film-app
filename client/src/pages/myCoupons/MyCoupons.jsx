import React, { useEffect, useState } from 'react'
import { Nav, Tab } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import MiniLoader from '../../components/customLoader/MiniLoader'
import { BackButton, ButtonTag, PTag, RedirectCard } from '../../components/designComponents/MicroComponents'
import IsLoadingHOC from '../../components/higherOrderLoader/IsLoadingHOC'
import { deactivateCoupon, getAllCoupons, getCompletedCoupons, getUpcomingCoupons, setSingleCoupon } from '../../store/coupon/slice'
import { CustomPagination } from '../../components/common/pagination'

const MyCoupons = ({ setLoading }) => {
    const navigation = useNavigate()
    const dispatch = useDispatch()

    const couponProfile = useSelector(state => state.coupon)

    // statescurrrentPage
    const [allCoupons, setAllCoupons] = useState([])
    const [upcomingCoupons, setUpcomingCoupons] = useState([])
    const [completedCoupons, setCompletedCoupons] = useState([])
    const [isMiniLoading, setIsMiniLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState({
        'allCoupon': 1,
        'upcomingCoupon': 1,
        'completedCoupon': 1,
    })
    const [currrentTab, setCurrrentTab] = useState(1)

    useEffect(() => {
        dispatch(getAllCoupons(0))
        dispatch(setSingleCoupon())
        setLoading(false)
    }, [])

    const fetchData = (tab) => {
        switch (tab) {
            case 1:
                dispatch(getAllCoupons(currentPage.allCoupon - 1))
                break;
            case 2:
                dispatch(getUpcomingCoupons(currentPage.upcomingCoupon - 1))
                break;
            case 3:
                dispatch(getCompletedCoupons(currentPage.completedCoupon - 1))
                break;
            default:
                dispatch(setSingleCoupon())
                break;
        }
    }

    useEffect(() => {
        switch (couponProfile.status) {
            case 'succeed':
                switch (couponProfile.type) {
                    case 'GET_ALL_COUPONS':
                        setAllCoupons(couponProfile?.allCoupons)
                        setIsMiniLoading(false)
                        break;
                    case 'GET_UPCOMING_COUPONS':
                        setUpcomingCoupons(couponProfile?.allUpcomingCoupons)
                        setIsMiniLoading(false)
                        break;
                    case 'GET_COMPLETED_COUPONS':
                        setCompletedCoupons(couponProfile?.allCompletedCoupons)
                        setIsMiniLoading(false)
                        break;
                    case 'DEACTIVATE_COUPON':
                        fetchData(currrentTab)
                        setIsMiniLoading(false)
                        break;
                    default:
                        break;
                }
                break;
        }
    }, [couponProfile])

    const DeleteSocialProfileAlert = couponId => {
        Swal.fire({
            title: 'Are you sure?',
            text: `You won't be able to undo this!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then(result => {
            if (result.isConfirmed) {
                setIsMiniLoading(true)
                dispatch(deactivateCoupon(couponId))
            }
        })
    }


    return (
        <>
            <div className="container coupon-listing">
                <div className="">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <BackButton
                            classes={'mb-0'}
                            title={'My Coupons'}
                            onClick={() => {
                                navigation('/dashboard/')
                            }}
                        />
                        <ButtonTag className={'btn semibold btn-dark-blue'} value={'Add Coupon'} onClick={() => {
                            navigation('/dashboard/coupons/couponcreation')
                        }} />
                    </div>
                </div>
                <div className="row">
                    <div className='border-teb'>
                        <Tab.Container
                            id='MyCoupons'
                            className='justify-content-sm-center justify-content-strat'
                            defaultActiveKey='1'
                            onSelect={(e) => {
                                if (e != currrentTab) {
                                    setIsMiniLoading(true)
                                    setCurrrentTab(Number(e))
                                    fetchData(Number(e))

                                }
                            }}
                        >
                            <Nav variant='pills' className='gap-4'>
                                <Nav.Item className='pointer'>
                                    <Nav.Link eventKey='1'>All</Nav.Link>
                                </Nav.Item>
                                <Nav.Item className='pointer'>
                                    <Nav.Link eventKey='2'>Upcoming</Nav.Link>
                                </Nav.Item>
                                <Nav.Item className='pointer'>
                                    <Nav.Link eventKey='3'>Completed</Nav.Link>
                                </Nav.Item>
                            </Nav>
                            <Tab.Content>
                                <Tab.Pane eventKey='1' className='my-4'>
                                    <div className="">
                                        {isMiniLoading ?
                                            <MiniLoader className={'w-100 h-100'} /> :
                                            (allCoupons?.coupons?.length > 0 ?
                                                <div className='row g-3'>
                                                    {allCoupons?.coupons?.map((coupon, i) => {
                                                        return (
                                                            <div className='col-3' key={i}>
                                                                <div className='card p-3 rounded-10'>
                                                                    <div className="mb-4">
                                                                        <PTag classes={'text-dark-blue fw-bold fn-16'} texts={`${coupon?.couponCode}`} />
                                                                    </div>
                                                                    <div className='my-2'>
                                                                        <PTag className={''} texts={'Valid on'} />
                                                                        <PTag classes={'text-dark-blue semibold fn-16'} texts={`${new Date(coupon?.validFrom).toLocaleDateString()} (${coupon?.validFromTime}) - ${new Date(coupon?.validTo).toLocaleDateString()} (${coupon?.validToTime})`} />
                                                                    </div>
                                                                    <div className='my-2'>
                                                                        <PTag className={''} texts={'Discount type'} />
                                                                        {coupon?.couponType === 'percenatge_discount' ? <PTag classes={'text-dark-blue semibold fn-16'} texts={`${coupon?.couponTypeLabel} (${coupon?.couponValue}%)`} /> : <PTag classes={'text-dark-blue semibold fn-16'} texts={`${coupon?.couponTypeLabel} (₹${coupon?.couponValue})`} />}

                                                                    </div>
                                                                    <div className='my-2'>
                                                                        <PTag className={''} texts={'Category'} />
                                                                        <PTag classes={'text-dark-blue fn-16 semibold'} texts={coupon?.categoryName} />
                                                                    </div>
                                                                    <div className='my-2'>
                                                                        <PTag className={''} texts={'Sub-Category'} />
                                                                        <PTag classes={'text-dark-blue fn-16 semibold'} texts={coupon?.subCategoryName} />
                                                                    </div>
                                                                    <div className='my-2'>
                                                                        <PTag className={''} texts={'Inventory Type'} />
                                                                        <PTag classes={'text-dark-blue fn-16 semibold'} texts={coupon?.inventoryTypeName ?? '-'} />
                                                                    </div>
                                                                    <div className='my-2'>
                                                                        <PTag className={''} texts={'Inventory Sub-Type'} />
                                                                        <PTag classes={'text-dark-blue fn-16 semibold'} texts={coupon?.inventorySubtypeName ?? '-'} />
                                                                    </div>
                                                                    <div className="d-flex mt-4 gap-3">
                                                                        <ButtonTag classes={'btn-orange semibold w-100'} value={'Delete'} onClick={() => {
                                                                            DeleteSocialProfileAlert(coupon?.discountCouponId)
                                                                        }} />
                                                                        <Link to='/dashboard/coupons/couponcreation' state={{ couponId: coupon?.discountCouponId }} className='btn btn-dark-blue semibold w-100'>
                                                                            Edit
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                    {allCoupons?.totalPages > 1 &&
                                                        <CustomPagination
                                                            pageCount={allCoupons?.totalPages}
                                                            onPageChange={(page) => {
                                                                dispatch(getAllCoupons(page.selected))
                                                                setCurrentPage({ ...currentPage, allCoupon: page.selected })
                                                            }}
                                                        />
                                                    }
                                                </div>
                                                : <RedirectCard text={`You don't have any coupon yet.`} link={`/dashboard/coupons/couponcreation`} label={`Create coupon`} />
                                            )
                                        }
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey='2' className='my-4'>
                                    <div className="row g-3 ">
                                        {isMiniLoading ?
                                            <MiniLoader className={'w-100 h-100'} /> :
                                            (upcomingCoupons?.coupons?.length > 0 ?
                                                <div className='row g-3'>
                                                    {upcomingCoupons?.coupons?.map((coupon, i) => {
                                                        return (
                                                            <div className='col-3' key={i}>
                                                                <div className='card p-3 rounded-10'>
                                                                    <div className="mb-4">
                                                                        <PTag classes={'text-dark-blue fw-bold fn-16'} texts={`${coupon?.couponCode}`} />
                                                                    </div>
                                                                    <div className='my-2'>
                                                                        <PTag className={''} texts={'Valid on'} />
                                                                        <PTag classes={'text-dark-blue semibold fn-16'} texts={`${new Date(coupon?.validFrom).toLocaleDateString()} (${coupon?.validFromTime}) - ${new Date(coupon?.validTo).toLocaleDateString()} (${coupon?.validToTime})`} />
                                                                    </div>
                                                                    <div className='my-2'>
                                                                        <PTag className={''} texts={'Discount type'} />
                                                                        {coupon?.couponType === 'percenatge_discount' ? <PTag classes={'text-dark-blue semibold fn-16'} texts={`${coupon?.couponTypeLabel} (${coupon?.couponValue}%)`} /> : <PTag classes={'text-dark-blue semibold fn-16'} texts={`${coupon?.couponTypeLabel} (₹${coupon?.couponValue})`} />}

                                                                    </div>
                                                                    <div className='my-2'>
                                                                        <PTag className={''} texts={'Category'} />
                                                                        <PTag classes={'text-dark-blue fn-16 semibold'} texts={coupon?.categoryName} />
                                                                    </div>
                                                                    <div className='my-2'>
                                                                        <PTag className={''} texts={'Sub-Category'} />
                                                                        <PTag classes={'text-dark-blue fn-16 semibold'} texts={coupon?.subCategoryName} />
                                                                    </div>
                                                                    <div className='my-2'>
                                                                        <PTag className={''} texts={'Inventory Type'} />
                                                                        <PTag classes={'text-dark-blue fn-16 semibold'} texts={coupon?.inventoryTypeName ?? '-'} />
                                                                    </div>
                                                                    <div className='my-2'>
                                                                        <PTag className={''} texts={'Inventory Sub-Type'} />
                                                                        <PTag classes={'text-dark-blue fn-16 semibold'} texts={coupon?.inventorySubtypeName ?? '-'} />
                                                                    </div>
                                                                    <div className="d-flex mt-4 gap-3">
                                                                        <ButtonTag classes={'btn-orange semibold w-100'} value={'Delete'} onClick={() => {
                                                                            DeleteSocialProfileAlert(coupon?.discountCouponId)
                                                                        }} />
                                                                        <Link to='/dashboard/coupons/couponcreation' state={{ couponId: coupon?.discountCouponId }} className='btn btn-dark-blue semibold w-100'>
                                                                            Edit
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                    {upcomingCoupons?.totalPages > 1 &&
                                                        <CustomPagination
                                                            pageCount={upcomingCoupons?.totalPages}
                                                            onPageChange={(page) => {
                                                                dispatch(getUpcomingCoupons(page.selected))
                                                                setCurrentPage({ ...currentPage, upcomingCoupon: page.selected })
                                                            }}
                                                        />
                                                    }
                                                </div>
                                                : <RedirectCard text={`You don't have any upcoming coupon yet.`} link={`/dashboard/coupons/couponcreation`} label={`Create coupon`} />
                                            )
                                        }
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey='3' className='my-4'>
                                    <div className="row g-3 ">
                                        {isMiniLoading ?
                                            <MiniLoader className={'w-100 h-100'} /> :
                                            (completedCoupons?.coupons?.length > 0 ?
                                                <div className='row g-3'>
                                                    {completedCoupons?.coupons?.map((coupon, i) => {
                                                        return (
                                                            <div className='col-3' key={i}>
                                                                <div className='card p-3 rounded-10'>
                                                                    <div className="mb-4">
                                                                        <PTag classes={'text-dark-blue fw-bold fn-16'} texts={`${coupon?.couponCode}`} />
                                                                    </div>
                                                                    <div className='my-2'>
                                                                        <PTag className={''} texts={'Valid on'} />
                                                                        <PTag classes={'text-dark-blue semibold fn-16'} texts={`${new Date(coupon?.validFrom).toLocaleDateString()} (${coupon?.validFromTime}) - ${new Date(coupon?.validTo).toLocaleDateString()} (${coupon?.validToTime})`} />
                                                                    </div>
                                                                    <div className='my-2'>
                                                                        <PTag className={''} texts={'Discount type'} />
                                                                        {coupon?.couponType === 'percenatge_discount' ? <PTag classes={'text-dark-blue semibold fn-16'} texts={`${coupon?.couponTypeLabel} (${coupon?.couponValue}%)`} /> : <PTag classes={'text-dark-blue semibold fn-16'} texts={`${coupon?.couponTypeLabel} (₹${coupon?.couponValue})`} />}

                                                                    </div>
                                                                    <div className='my-2'>
                                                                        <PTag className={''} texts={'Category'} />
                                                                        <PTag classes={'text-dark-blue fn-16 semibold'} texts={coupon?.categoryName} />
                                                                    </div>
                                                                    <div className='my-2'>
                                                                        <PTag className={''} texts={'Sub-Category'} />
                                                                        <PTag classes={'text-dark-blue fn-16 semibold'} texts={coupon?.subCategoryName} />
                                                                    </div>
                                                                    <div className='my-2'>
                                                                        <PTag className={''} texts={'Inventory Type'} />
                                                                        <PTag classes={'text-dark-blue fn-16 semibold'} texts={coupon?.inventoryTypeName ?? '-'} />
                                                                    </div>
                                                                    <div className='my-2'>
                                                                        <PTag className={''} texts={'Inventory Sub-Type'} />
                                                                        <PTag classes={'text-dark-blue fn-16 semibold'} texts={coupon?.inventorySubtypeName ?? '-'} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                    {completedCoupons?.totalPages > 1 &&
                                                        <CustomPagination
                                                            pageCount={completedCoupons?.totalPages}
                                                            onPageChange={(page) => {
                                                                dispatch(getCompletedCoupons(page.selected))
                                                                setCurrentPage({ ...currentPage, completedCoupon: page.selected })
                                                            }}
                                                        />
                                                    }
                                                </div>
                                                : <RedirectCard text={`You don't have any completed coupon yet.`} link={`/dashboard/coupons/couponcreation`} label={`Create coupon`} />
                                            )
                                        }
                                    </div>
                                    {/* <div className="row my-5">
                                        <div className="col-12">
                                            {isMiniLoading ? <MiniLoader className={'w-100 h-100'} /> :
                                                completedCoupons?.coupons?.length > 0 ? <Swiper
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
                                                    {completedCoupons?.coupons?.map((coupon, i) => {
                                                        return (
                                                            <SwiperSlide className='' key={i}>
                                                                <div className='card p-3 rounded-10 mb-4'>
                                                                    <div className="mb-4">
                                                                        <PTag classes={'text-dark-blue fw-bold fn-16'} texts={`${coupon?.couponCode}`} />
                                                                    </div>
                                                                    <div className='my-2'>
                                                                        <PTag className={''} texts={'Valid on'} />
                                                                        <PTag classes={'text-dark-blue semibold fn-16'} texts={`${new Date(coupon?.validFrom).toLocaleDateString()} (${coupon?.validFromTime}) - ${new Date(coupon?.validTo).toLocaleDateString()} (${coupon?.validToTime})`} />
                                                                    </div>
                                                                    <div className='my-2'>
                                                                        <PTag className={''} texts={'Discount type'} />
                                                                        {coupon?.couponType === 'percenatge_discount' ? <PTag classes={'text-dark-blue semibold fn-16'} texts={`${coupon?.couponTypeLabel} (${coupon?.couponValue}%)`} /> : <PTag classes={'text-dark-blue semibold fn-16'} texts={`${coupon?.couponTypeLabel} (₹${coupon?.couponValue})`} />}

                                                                    </div>
                                                                    <div className='my-2'>
                                                                        <PTag className={''} texts={'Category'} />
                                                                        <PTag classes={'text-dark-blue fn-16 semibold'} texts={coupon?.categoryName} />
                                                                    </div>
                                                                    <div className='my-2'>
                                                                        <PTag className={''} texts={'Sub-Category'} />
                                                                        <PTag classes={'text-dark-blue fn-16 semibold'} texts={coupon?.subCategoryName} />
                                                                    </div>
                                                                    <div className='my-2'>
                                                                        <PTag className={''} texts={'Inventory Type'} />
                                                                        <PTag classes={'text-dark-blue fn-16 semibold'} texts={coupon?.inventoryTypeName ?? '-'} />
                                                                    </div>
                                                                    <div className='my-2'>
                                                                        <PTag className={''} texts={'Inventory Sub-Type'} />
                                                                        <PTag classes={'text-dark-blue fn-16 semibold'} texts={coupon?.inventorySubtypeName ?? '-'} />
                                                                    </div>
                                                                </div>
                                                            </SwiperSlide>
                                                        )
                                                    })}
                                                </Swiper>
                                                    :
                                                    <RedirectCard text={`You don't have any completed coupon yet.`} link={`/dashboard/coupons/couponcreation`} label={`Create coupon`} />
                                            }
                                        </div>
                                    </div> */}
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

export default IsLoadingHOC(MyCoupons)