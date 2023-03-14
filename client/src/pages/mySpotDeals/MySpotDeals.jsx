import React, { useState, useEffect } from 'react'
import { Nav, Pagination, Tab } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import MiniLoader from '../../components/customLoader/MiniLoader'
import { BackButton, ButtonTag, PTag, RedirectCard } from '../../components/designComponents/MicroComponents'
import IsLoadingHOC from '../../components/higherOrderLoader/IsLoadingHOC'
import {
    deleteSpotDeal,
    getAllSpotDeals,
    getCompletedSpotDeals,
    getUpcomingSpotDeals,
    setSingleSpotDeal,
} from '../../store/spotdeals/slice'

const MySpotDeals = ({ setLoading }) => {
    const navigation = useNavigate()
    const dispatch = useDispatch()

    const discountCard = [1, 2, 3, 4, 5]

    const spotDealProfile = useSelector(state => state.spotdeals)

    // states current page
    const [allSpotDeals, setAllSpotDeals] = useState([])
    const [upcomingDeals, setUpcomingDeals] = useState([])
    const [completedDeals, setCompletedDeals] = useState([])
    const [isMiniLoading, setIsMiniLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState({
        allSpotDeals: 1,
        upcomingDeals: 1,
        completedDeals: 1,
    })
    const [currentTab, setCurrentTab] = useState(1)

    useEffect(() => {
        dispatch(getAllSpotDeals(0))
        dispatch(setSingleSpotDeal())
        setLoading(false)
    }, [])

    const fetchData = tab => {
        switch (tab) {
            case 1:
                dispatch(getAllSpotDeals(currentPage.allSpotDeals - 1))
                break
            case 2:
                dispatch(getUpcomingSpotDeals(currentPage.upcomingDeals - 1))
                break
            case 3:
                dispatch(getCompletedSpotDeals(currentPage.completedDeals - 1))
                break
            default:
                dispatch(setSingleSpotDeal())
                break
        }
    }

    useEffect(() => {
        switch (spotDealProfile.status) {
            case 'succeed':
                switch (spotDealProfile.type) {
                    case 'GET_ALL_SPOT_DEALS':
                        setAllSpotDeals(spotDealProfile?.allSpotDeals)
                        setIsMiniLoading(false)
                        break
                    case 'GET_UPCOMING_SPOT_DEALS':
                        setUpcomingDeals(spotDealProfile?.allUpcomingDeals)
                        setIsMiniLoading(false)
                        break
                    case 'GET_COMPLETED_SPOT_DEALS':
                        setCompletedDeals(spotDealProfile?.allCompletedDeals)
                        setIsMiniLoading(false)
                        break
                    case 'DELETE_SPOT_DEAL':
                        fetchData(currentTab)
                        setIsMiniLoading(false)
                        break

                    default:
                        break
                }
                break
        }
    }, [spotDealProfile])

    const DeleteSocialProfileAlert = spotDealId => {
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
                dispatch(deleteSpotDeal(spotDealId))
            }
        })
    }

    return (
        <>
            <div className='container'>
                <div className=''>
                    <BackButton
                        title={'My Spot Deals'}
                        onClick={() => {
                            navigation('/dashboard/')
                        }}
                    />
                </div>
                <div className='row my-4'>
                    <div className='d-flex justify-content-between align-items-center'>
                        <PTag classes={'text-dark-blue fn-18 fw-bold'} texts={'Spot Deals'} />
                        <ButtonTag
                            className={'btn semibold btn-dark-blue'}
                            value={'Add'}
                            onClick={() => {
                                navigation('/dashboard/spotdeals/addmyspotdeals')
                            }}
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='border-teb'>
                        <Tab.Container
                            className='justify-content-sm-center justify-content-strat'
                            defaultActiveKey='1'
                            onSelect={e => {
                                if (e != currentTab) {
                                    setIsMiniLoading(true)
                                    setCurrentTab(Number(e))
                                    fetchData(Number(e))
                                }
                            }}
                        >
                            <Nav variant='pills'>
                                <Nav.Item className='pointer me-sm-4 me-2'>
                                    <Nav.Link eventKey='1'>All</Nav.Link>
                                </Nav.Item>
                                <Nav.Item className='pointer mx-sm-4 me-2'>
                                    <Nav.Link eventKey='2'>Upcoming</Nav.Link>
                                </Nav.Item>
                                <Nav.Item className='pointer mx-sm-4 me-2'>
                                    <Nav.Link eventKey='3'>Completed</Nav.Link>
                                </Nav.Item>
                            </Nav>
                            <Tab.Content>
                                <Tab.Pane eventKey='1' className='my-4'>
                                    <div className=''>
                                        {isMiniLoading ? (
                                            <MiniLoader />
                                        ) : allSpotDeals?.spotDeals?.length > 0 ? (
                                            <div className='row g-3'>
                                                {allSpotDeals?.spotDeals?.map((deal, i) => {
                                                    return (
                                                        <div className='col-3' key={i}>
                                                            <div className='card p-3 rounded-10'>
                                                                <div className='mb-4'>
                                                                    <PTag
                                                                        classes={
                                                                            'text-dark-blue fw-bold fn-16'
                                                                        }
                                                                        texts={`${deal?.couponCode}`}
                                                                    />
                                                                </div>
                                                                <div className='my-2'>
                                                                    <PTag
                                                                        className={''}
                                                                        texts={'Valid on'}
                                                                    />
                                                                    <PTag
                                                                        classes={
                                                                            'text-dark-blue semibold fn-16'
                                                                        }
                                                                        texts={`${new Date(
                                                                            deal?.spotDealDates[0]
                                                                        ).toLocaleDateString()} - ${new Date(
                                                                            deal?.spotDealDates[
                                                                            deal?.spotDealDates
                                                                                .length - 1
                                                                            ]
                                                                        ).toLocaleDateString()}`}
                                                                    />
                                                                </div>
                                                                <div className='my-2'>
                                                                    <PTag
                                                                        className={''}
                                                                        texts={'Discount type'}
                                                                    />
                                                                    {deal?.couponType ===
                                                                        'percenatge_discount' ? (
                                                                        <PTag
                                                                            classes={
                                                                                'text-dark-blue semibold fn-16'
                                                                            }
                                                                            texts={`${deal?.couponTypeLabel} (${deal?.couponValue}%)`}
                                                                        />
                                                                    ) : (
                                                                        <PTag
                                                                            classes={
                                                                                'text-dark-blue semibold fn-16'
                                                                            }
                                                                            texts={`${deal?.couponTypeLabel} (₹${deal?.couponValue})`}
                                                                        />
                                                                    )}
                                                                </div>
                                                                <div className='my-2'>
                                                                    <PTag
                                                                        className={''}
                                                                        texts={'Category'}
                                                                    />
                                                                    <PTag
                                                                        classes={
                                                                            'text-dark-blue fn-16 semibold'
                                                                        }
                                                                        texts={deal?.categoryName}
                                                                    />
                                                                </div>
                                                                <div className='my-2'>
                                                                    <PTag
                                                                        className={''}
                                                                        texts={'Sub-Category'}
                                                                    />
                                                                    <PTag
                                                                        classes={
                                                                            'text-dark-blue fn-16 semibold'
                                                                        }
                                                                        texts={
                                                                            deal?.subCategoryName
                                                                        }
                                                                    />
                                                                </div>
                                                                <div className='my-2'>
                                                                    <PTag
                                                                        className={''}
                                                                        texts={'Inventory Type'}
                                                                    />
                                                                    <PTag
                                                                        classes={
                                                                            'text-dark-blue fn-16 semibold'
                                                                        }
                                                                        texts={
                                                                            deal?.inventoryTypeName ??
                                                                            '-'
                                                                        }
                                                                    />
                                                                </div>
                                                                <div className='my-2'>
                                                                    <PTag
                                                                        className={''}
                                                                        texts={'Inventory Sub-Type'}
                                                                    />
                                                                    <PTag
                                                                        classes={
                                                                            'text-dark-blue fn-16 semibold'
                                                                        }
                                                                        texts={
                                                                            deal?.inventorySubtypeName ??
                                                                            '-'
                                                                        }
                                                                    />
                                                                </div>
                                                                <div className='d-flex mt-4 gap-3'>
                                                                    <ButtonTag
                                                                        classes={
                                                                            'btn-orange semibold w-100'
                                                                        }
                                                                        value={'Delete'}
                                                                        onClick={() => {
                                                                            DeleteSocialProfileAlert(
                                                                                deal?.spotDealId
                                                                            )
                                                                        }}
                                                                    />
                                                                    <Link
                                                                        to='/dashboard/spotdeals/addmyspotdeals'
                                                                        state={{
                                                                            spotDealId:
                                                                                deal?.spotDealId,
                                                                        }}
                                                                        className='btn btn-dark-blue semibold w-100'
                                                                    >
                                                                        Edit
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                                {allSpotDeals?.totalPages > 1 && (
                                                    <Pagination
                                                        className='rainbow-m_auto '
                                                        pages={allSpotDeals?.totalPages}
                                                        activePage={currentPage.allSpotDeals}
                                                        onChange={(event, page) => {
                                                            if (page !== currentPage.allSpotDeals) {
                                                                dispatch(getAllSpotDeals(page - 1))
                                                                setCurrentPage({
                                                                    ...currentPage,
                                                                    allSpotDeals: page,
                                                                })
                                                            }
                                                        }}
                                                        variant='shaded'
                                                    />
                                                )}
                                            </div>
                                        ) : (
                                            <RedirectCard
                                                text={`You don't have any spot deal yet.`}
                                                link={`/dashboard/spotdeals/addmyspotdeals`}
                                                label={`Create Spot Deal`}
                                            />
                                        )}
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey='2' className='my-4'>
                                    <div className='row g-3 '>
                                        {isMiniLoading ? (
                                            <MiniLoader />
                                        ) : upcomingDeals?.spotDeals?.length > 0 ? (
                                            <div className='row g-3'>
                                                {upcomingDeals?.spotDeals?.map((deal, i) => {
                                                    return (
                                                        <div className='col-3' key={i}>
                                                            <div className='card p-3 rounded-10'>
                                                                <div className='mb-4'>
                                                                    <PTag
                                                                        classes={
                                                                            'text-dark-blue fw-bold fn-16'
                                                                        }
                                                                        texts={`${deal?.couponCode}`}
                                                                    />
                                                                </div>
                                                                <div className='my-2'>
                                                                    <PTag
                                                                        className={''}
                                                                        texts={'Valid on'}
                                                                    />
                                                                    <PTag
                                                                        classes={
                                                                            'text-dark-blue semibold fn-16'
                                                                        }
                                                                        texts={`${new Date(
                                                                            deal?.validFrom
                                                                        ).toLocaleDateString()} (${deal?.validFromTime
                                                                            }) - ${new Date(
                                                                                deal?.validTo
                                                                            ).toLocaleDateString()} (${deal?.validToTime
                                                                            })`}
                                                                    />
                                                                </div>
                                                                <div className='my-2'>
                                                                    <PTag
                                                                        className={''}
                                                                        texts={'Discount type'}
                                                                    />
                                                                    {deal?.couponType ===
                                                                        'percenatge_discount' ? (
                                                                        <PTag
                                                                            classes={
                                                                                'text-dark-blue semibold fn-16'
                                                                            }
                                                                            texts={`${deal?.couponTypeLabel} (${deal?.couponValue}%)`}
                                                                        />
                                                                    ) : (
                                                                        <PTag
                                                                            classes={
                                                                                'text-dark-blue semibold fn-16'
                                                                            }
                                                                            texts={`${deal?.couponTypeLabel} (₹${deal?.couponValue})`}
                                                                        />
                                                                    )}
                                                                </div>
                                                                <div className='my-2'>
                                                                    <PTag
                                                                        className={''}
                                                                        texts={'Category'}
                                                                    />
                                                                    <PTag
                                                                        classes={
                                                                            'text-dark-blue fn-16 semibold'
                                                                        }
                                                                        texts={deal?.categoryName}
                                                                    />
                                                                </div>
                                                                <div className='my-2'>
                                                                    <PTag
                                                                        className={''}
                                                                        texts={'Sub-Category'}
                                                                    />
                                                                    <PTag
                                                                        classes={
                                                                            'text-dark-blue fn-16 semibold'
                                                                        }
                                                                        texts={
                                                                            deal?.subCategoryName
                                                                        }
                                                                    />
                                                                </div>
                                                                <div className='my-2'>
                                                                    <PTag
                                                                        className={''}
                                                                        texts={'Inventory Type'}
                                                                    />
                                                                    <PTag
                                                                        classes={
                                                                            'text-dark-blue fn-16 semibold'
                                                                        }
                                                                        texts={
                                                                            deal?.inventoryTypeName ??
                                                                            '-'
                                                                        }
                                                                    />
                                                                </div>
                                                                <div className='my-2'>
                                                                    <PTag
                                                                        className={''}
                                                                        texts={'Inventory Sub-Type'}
                                                                    />
                                                                    <PTag
                                                                        classes={
                                                                            'text-dark-blue fn-16 semibold'
                                                                        }
                                                                        texts={
                                                                            deal?.inventorySubtypeName ??
                                                                            '-'
                                                                        }
                                                                    />
                                                                </div>
                                                                <div className='d-flex mt-4 gap-3'>
                                                                    <ButtonTag
                                                                        classes={
                                                                            'btn-orange semibold w-100'
                                                                        }
                                                                        value={'Delete'}
                                                                        onClick={() => {
                                                                            DeleteSocialProfileAlert(
                                                                                deal?.spotDealId
                                                                            )
                                                                        }}
                                                                    />
                                                                    <Link
                                                                        to='/dashboard/spotdeals/addmyspotdeals'
                                                                        state={{
                                                                            spotDealId:
                                                                                deal?.spotDealId,
                                                                        }}
                                                                        className='btn btn-dark-blue semibold w-100'
                                                                    >
                                                                        Edit
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                                {upcomingDeals?.totalPages > 1 && (
                                                    <Pagination
                                                        className='rainbow-m_auto '
                                                        pages={upcomingDeals?.totalPages}
                                                        activePage={currentPage.upcomingDeals}
                                                        onChange={(event, page) => {
                                                            if (
                                                                page !== currentPage.upcomingDeals
                                                            ) {
                                                                dispatch(
                                                                    getUpcomingSpotDeals(page - 1)
                                                                )
                                                                setCurrentPage({
                                                                    ...currentPage,
                                                                    upcomingDeals: page,
                                                                })
                                                            }
                                                        }}
                                                        variant='shaded'
                                                    />
                                                )}
                                            </div>
                                        ) : (
                                            <RedirectCard
                                                text={`You don't have any spot deal yet.`}
                                                link={`/dashboard/spotdeals/addmyspotdeals`}
                                                label={`Create Spot Deal`}
                                            />
                                        )}
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey='3' className='my-4'>
                                    <div className='row g-3 '>
                                        {isMiniLoading ? (
                                            <MiniLoader />
                                        ) : completedDeals?.spotDeals?.length > 0 ? (
                                            <div className='row g-3'>
                                                {completedDeals?.spotDeals?.map((deal, i) => {
                                                    return (
                                                        <div className='col-3' key={i}>
                                                            <div className='card p-3 rounded-10'>
                                                                <div className='mb-4'>
                                                                    <PTag
                                                                        classes={
                                                                            'text-dark-blue fw-bold fn-16'
                                                                        }
                                                                        texts={`${deal?.couponCode}`}
                                                                    />
                                                                </div>
                                                                <div className='my-2'>
                                                                    <PTag
                                                                        className={''}
                                                                        texts={'Valid on'}
                                                                    />
                                                                    <PTag
                                                                        classes={
                                                                            'text-dark-blue semibold fn-16'
                                                                        }
                                                                        texts={`${new Date(
                                                                            deal?.validFrom
                                                                        ).toLocaleDateString()} (${deal?.validFromTime
                                                                            }) - ${new Date(
                                                                                deal?.validTo
                                                                            ).toLocaleDateString()} (${deal?.validToTime
                                                                            })`}
                                                                    />
                                                                </div>
                                                                <div className='my-2'>
                                                                    <PTag
                                                                        className={''}
                                                                        texts={'Discount type'}
                                                                    />
                                                                    {deal?.couponType ===
                                                                        'percenatge_discount' ? (
                                                                        <PTag
                                                                            classes={
                                                                                'text-dark-blue semibold fn-16'
                                                                            }
                                                                            texts={`${deal?.couponTypeLabel} (${deal?.couponValue}%)`}
                                                                        />
                                                                    ) : (
                                                                        <PTag
                                                                            classes={
                                                                                'text-dark-blue semibold fn-16'
                                                                            }
                                                                            texts={`${deal?.couponTypeLabel} (₹${deal?.couponValue})`}
                                                                        />
                                                                    )}
                                                                </div>
                                                                <div className='my-2'>
                                                                    <PTag
                                                                        className={''}
                                                                        texts={'Category'}
                                                                    />
                                                                    <PTag
                                                                        classes={
                                                                            'text-dark-blue fn-16 semibold'
                                                                        }
                                                                        texts={deal?.categoryName}
                                                                    />
                                                                </div>
                                                                <div className='my-2'>
                                                                    <PTag
                                                                        className={''}
                                                                        texts={'Sub-Category'}
                                                                    />
                                                                    <PTag
                                                                        classes={
                                                                            'text-dark-blue fn-16 semibold'
                                                                        }
                                                                        texts={
                                                                            deal?.subCategoryName
                                                                        }
                                                                    />
                                                                </div>
                                                                <div className='my-2'>
                                                                    <PTag
                                                                        className={''}
                                                                        texts={'Inventory Type'}
                                                                    />
                                                                    <PTag
                                                                        classes={
                                                                            'text-dark-blue fn-16 semibold'
                                                                        }
                                                                        texts={
                                                                            deal?.inventoryTypeName ??
                                                                            '-'
                                                                        }
                                                                    />
                                                                </div>
                                                                <div className='my-2'>
                                                                    <PTag
                                                                        className={''}
                                                                        texts={'Inventory Sub-Type'}
                                                                    />
                                                                    <PTag
                                                                        classes={
                                                                            'text-dark-blue fn-16 semibold'
                                                                        }
                                                                        texts={
                                                                            deal?.inventorySubtypeName ??
                                                                            '-'
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                                {completedDeals?.totalPages > 1 && (
                                                    <Pagination
                                                        className='rainbow-m_auto '
                                                        pages={completedDeals?.totalPages}
                                                        activePage={currentPage.completedDeals}
                                                        onChange={(event, page) => {
                                                            if (
                                                                page !== currentPage.completedDeals
                                                            ) {
                                                                dispatch(
                                                                    getCompletedSpotDeals(page - 1)
                                                                )
                                                                setCurrentPage({
                                                                    ...currentPage,
                                                                    completedDeals: page,
                                                                })
                                                            }
                                                        }}
                                                        variant='shaded'
                                                    />
                                                )}
                                            </div>
                                        ) : (
                                            <RedirectCard
                                                text={`You don't have any spot deal yet.`}
                                                link={`/dashboard/spotdeals/addmyspotdeals`}
                                                label={`Create Spot Deal`}
                                            />
                                        )}
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

export default IsLoadingHOC(MySpotDeals)
