import React, { useEffect, useState } from 'react'
import { Col, Nav, Row, Tab } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import {
    BackButton,
    CurrentDirectorylink,
    FilterSortMenu
} from '../../components/designComponents/MicroComponents'
import FilterModal from './FilterModal'
import SortByModal from './SortByModal'
//icons
import InfiniteScroll from "react-infinite-scroll-component"
import { useDispatch, useSelector } from 'react-redux'
import Crew from '../../components/common/profileCards/Crew'
import Location from '../../components/common/profileCards/Location'
import Service from '../../components/common/profileCards/Service'
import Talent from '../../components/common/profileCards/Talent'
import MiniLoader from '../../components/customLoader/MiniLoader'
import { Provider } from '../../components/designComponents/MicroComponentsContext'
import IsLoadingHOC from '../../components/higherOrderLoader/IsLoadingHOC'
import { useSearchContext } from '../../hooks/useSearchContext'
import { allCategoryApi } from '../../store/category/slice'
import { genderFilter, rateFilter } from '../../store/masterdata/slice'
import { getProjectTypes } from '../../store/project/slice'
import { postSearch, setSearchResult } from '../../store/search/slice'


const Listing = ({ setLoading }) => {
    const { bookNowModel, dispatchSearch } = useSearchContext()
    const { crewResult, locationResult, serviceResult, talentResult } = useSelector(store => store.search)
    const { bookProfile } = useSelector(store => store.requestavailability)
    // hoooks
    const navigation = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    const { keyword, keywordId, searchKeyword } = location.state ?? 'crew'

    const { category } = useSelector(state => state.category)
    const searchProfile = useSelector(state => state.search)
    const [isMiniLoading, setIsMiniLoading] = useState({
        crewLoading: false,
        locationsLoading: false,
        servicesLoading: false,
        talentLoading: false,
    })
    const [fromRecord, setFromRecord] = useState({
        crewFromRecord: 0,
        locationsFromRecord: 0,
        servicesFromRecord: 0,
        talentFromRecord: 0,
    })
    const [hasMore, setHasMore] = useState({
        crewHasMore: true,
        locationHasMore: true,
        serviceHasMore: true,
        talentHasMore: true,
    })

    // states
    const [showSort, setShowSort] = useState(false)
    const [showFilter, setShowFilter] = useState(false)
    const [filterData, setFilterData] = useState([])
    const [currentTab, setCurrentTab] = useState(keywordId ?? 2)

    useEffect(() => {
        let isFetching = true
        Promise.all([
            dispatch(allCategoryApi()),
            dispatch(getProjectTypes()),
        ]).then(res => {
            let searchWord = res[0]?.payload?.filter(cat => cat?.permalink == keyword)[0]
            // setCurrentTab(keyword, keywordId, searchKeyword, searchWord?.permalink)
            // !(keyword && keywordId && searchKeyword) && fetchSearchData(searchWord?.permalink)
            fetchSearchData(searchWord?.permalink)
        }).finally(() => setLoading(false))

        if (isFetching) {
            switch (keyword) {
                case 'crew':
                    dispatchSearch({
                        type: "CREW_DATA",
                        payload: searchProfile?.searchResult?.profiles
                    })
                    break;
                case 'location':
                    dispatchSearch({
                        type: "LOCATIONS_DATA",
                        payload: searchProfile?.searchResult?.profiles
                    })
                    break;
                case 'service':
                    dispatchSearch({
                        type: "SERVICES_DATA",
                        payload: searchProfile?.searchResult?.profiles
                    })
                    break;
                case 'talent':
                    dispatchSearch({
                        type: "TALENT_DATA",
                        payload: searchProfile?.searchResult?.profiles
                    })
                    break;
                default:
                    break;
            }
        }

        return () => isFetching = false
    }, [])

    // useEffect(() => {
    //     let isFetching = true
    //     Promise.all([dispatch(FilterSubCategory(currentTab?.id))])
    //         .then(res => {
    //             const tempFilterData = []
    //             tempFilterData.push({
    //                 filterTag: "sub category",
    //                 activeId: 1,
    //                 filterTypes: res[0].payload.map((subCategory, i) => {
    //                     return ({
    //                         id: subCategory?.subCategoryId,
    //                         name: subCategory?.subCategoryName,
    //                         key: "profileType",
    //                         value: subCategory?.permalink
    //                     })
    //                 })
    //             })
    //             filterData.splice(2)
    //             isFetching && setFilterData(state => [...state, ...tempFilterData])
    //         })

    //     return () => isFetching = false
    // }, [currentTab])

    useEffect(() => {
        let isFetching = true
        Promise.all([dispatch(genderFilter()), dispatch(rateFilter())])
            .then(res => {
                const tempFilterData = []
                tempFilterData.push({
                    filterTag: "gender",
                    activeId: 2,
                    filterTypes: res[0].payload.map((gender, i) => {
                        return ({
                            id: i,
                            name: gender,
                            key: "genderFilter",
                            value: gender
                        })
                    })
                })
                tempFilterData.push({
                    filterTag: "price",
                    activeId: 3,
                    filterTypes: res[1].payload.map((rate, i) => {
                        return ({
                            id: i,
                            name: rate.rateFilterLabel,
                            key: "rateFilter",
                            value: rate.rateFilter
                        })
                    })
                })
                isFetching && setFilterData(tempFilterData)
            })
        return () => isFetching = false
    }, [])

    const fetchSearchData = (searchString, fromRecord, batchSize = 20, withImage = true) => {
        let params = {
            "searchString": searchString,
            "fromRecord": fromRecord ?? 0,
            "batchSize": 5,
            "withImage": withImage,
        }

        switch (searchString) {
            case 'crew':
                dispatch(postSearch(params)).then(res => {
                    !res.payload?.data?.crewProfiles.length && setHasMore({ ...hasMore, crewHasMore: false })
                    dispatch(setSearchResult({
                        type: "CREW_DATA",
                        payload: [...crewResult, ...res.payload?.data?.crewProfiles]
                    }))
                })
                break;
            case 'locations':
                dispatch(postSearch(params)).then(res => {
                    !res.payload?.data?.locationProfiles.length && setHasMore({ ...hasMore, locationHasMore: false })
                    dispatch(setSearchResult({
                        type: "LOCATION_DATA",
                        payload: [...locationResult, ...res.payload?.data?.locationProfiles]
                    }))
                })
                break;
            case 'services':
                dispatch(postSearch(params)).then(res => {
                    !res.payload?.data?.serviceProfiles.length && setHasMore({ ...hasMore, serviceHasMore: false })
                    dispatch(setSearchResult({
                        type: "SERVICE_DATA",
                        payload: [...serviceResult, ...res.payload?.data?.serviceProfiles]
                    }))
                })
                break;
            case 'talent':
                dispatch(postSearch(params)).then(res => {
                    !res.payload?.data?.talentProfiles.length && setHasMore({ ...hasMore, talentHasMore: false })
                    dispatch(setSearchResult({
                        type: "TALENT_DATA",
                        payload: [...talentResult, ...res.payload?.data?.talentProfiles]
                    }))
                })
                break;
            default:
                break;
        }
    }

    return (
        <>
            <div className='container listing'>
                <div className='d-flex justify-content-between align-items-center'>
                    <BackButton
                        classes={'mb-4'}
                        textClass={'fn-20'}
                        title={'Listing'}
                        onClick={() => {
                            navigation('/')
                        }}
                    />
                </div>
                <div className='d-flex justify-content-between align-item-center'>
                    <CurrentDirectorylink
                        routeData={[
                            {
                                name: 'home',
                                link: '/'
                            },
                            {
                                name: 'search',
                                link: '/search'
                            },
                            {
                                name: currentTab?.name ?? searchKeyword,
                                link: '/search/listing'
                            },
                        ]}
                    />
                    <Provider value={{
                        showFilter,
                        showSort,
                        setShowFilter,
                        setShowSort
                    }}>
                        <FilterSortMenu />
                    </Provider>
                </div>

                <div className='border-teb full-border-teb my-3'>
                    <Tab.Container
                        id='listing'
                        className='justify-content-sm-center justify-content-strat'
                        defaultActiveKey={keywordId ?? 2}
                        onSelect={(e) => {
                            let temp = category.filter(cat => e == cat?.categoryId)[0]
                            if (temp.categoryId !== currentTab) {
                                setCurrentTab(temp.categoryId)
                                fetchSearchData(temp.permalink)
                            }
                        }}
                    >
                        <div className='my-4'>
                            <Nav variant='pills'>
                                {category.map((cat, i) =>
                                    <Nav.Item key={i} className={`pointer`}>
                                        <Nav.Link eventKey={cat.categoryId}>{cat.name}</Nav.Link>
                                    </Nav.Item>)}
                            </Nav>
                        </div>
                        <Tab.Content>
                            <Tab.Pane eventKey={4}>
                                {currentTab == 4 &&
                                    <InfiniteScroll
                                        className='row hide-scroll'
                                        dataLength={locationResult?.length} //This is important field to render the next data
                                        next={() => {
                                            fetchSearchData('locations', locationResult?.length + 1)
                                        }}
                                        scrollThreshold={0.5}
                                        hasMore={hasMore.locationHasMore}
                                        loader={<MiniLoader className={'w-100 h-100'} />}
                                        endMessage={
                                            <p style={{ textAlign: 'center' }}>
                                                <b>Yay! You have seen it all</b>
                                            </p>
                                        }
                                        refreshFunction={() => {
                                            console.log('refresh')
                                        }}
                                        pullDownToRefresh
                                        pullDownToRefreshThreshold={50}
                                    >
                                        {locationResult?.map((data, i) => {
                                            return (
                                                <Col xl={4} sm={6} className="mb-3" key={i}>
                                                    <Location profile={data} key={i} index={i} />
                                                </Col>
                                            )
                                        })}
                                    </InfiniteScroll>
                                }
                            </Tab.Pane>
                            <Tab.Pane eventKey={2}>
                                {currentTab == 2 &&
                                    <InfiniteScroll
                                        className='row hide-scroll'
                                        dataLength={crewResult?.length} //This is important field to render the next data
                                        next={() => {
                                            fetchSearchData('crew', crewResult?.length + 1)
                                        }}
                                        scrollThreshold={0.5}
                                        hasMore={hasMore.crewHasMore}
                                        loader={<MiniLoader className={'w-100 h-100'} />}
                                        endMessage={
                                            <p style={{ textAlign: 'center' }}>
                                                <b>Yay! You have seen it all</b>
                                            </p>
                                        }
                                        refreshFunction={() => {
                                            console.log('refresh')
                                        }}
                                        pullDownToRefresh
                                        pullDownToRefreshThreshold={50}
                                    >
                                        {crewResult?.map((data, i) => {
                                            return (
                                                <Col xl={4} sm={6} className="mb-3" key={data?.profileRecordMapping}>
                                                    <Crew profile={data} key={i} index={i} />
                                                </Col>
                                            )
                                        })}
                                    </InfiniteScroll>
                                }
                            </Tab.Pane>
                            <Tab.Pane eventKey={3}>
                                <Row className=''>
                                    {currentTab == 3 &&
                                        <InfiniteScroll
                                            className='row hide-scroll'
                                            dataLength={serviceResult?.length} //This is important field to render the next data
                                            next={() => {
                                                fetchSearchData('services', serviceResult?.length + 1)
                                            }}
                                            scrollThreshold={0.5}
                                            hasMore={hasMore.serviceHasMore}
                                            loader={<MiniLoader className={'w-100 h-100'} />}
                                            endMessage={
                                                <p style={{ textAlign: 'center' }}>
                                                    <b>Yay! You have seen it all</b>
                                                </p>
                                            }
                                            refreshFunction={() => {
                                                console.log('refresh')
                                            }}
                                            pullDownToRefresh
                                            pullDownToRefreshThreshold={50}
                                        >
                                            {serviceResult?.map((data, i) => {
                                                return (
                                                    <Col xl={4} sm={6} className="mb-3" key={i}>
                                                        <Service profile={data} key={i} index={i} />
                                                    </Col>
                                                )
                                            })}
                                        </InfiniteScroll>
                                    }
                                </Row>
                            </Tab.Pane>
                            <Tab.Pane eventKey={1}>
                                <Row className=''>
                                    {currentTab == 1 &&
                                        <InfiniteScroll
                                            className='row hide-scroll'
                                            dataLength={talentResult?.length} //This is important field to render the next data
                                            next={() => {
                                                fetchSearchData('talent', talentResult?.length + 1)
                                            }}
                                            scrollThreshold={0.5}
                                            hasMore={hasMore.talentHasMore}
                                            loader={<MiniLoader className={'w-100 h-100'} />}
                                            endMessage={
                                                <p style={{ textAlign: 'center' }}>
                                                    <b>Yay! You have seen it all</b>
                                                </p>
                                            }
                                            refreshFunction={() => {
                                                console.log('refresh')
                                            }}
                                            pullDownToRefresh
                                            pullDownToRefreshThreshold={50}
                                        >
                                            {talentResult?.map((data, i) => {
                                                return (
                                                    <Col xl={4} sm={6} className="mb-3" key={i}>
                                                        <Talent profile={data} key={i} index={i} />

                                                    </Col>
                                                )
                                            })}
                                        </InfiniteScroll>
                                    }
                                </Row>
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </div>
            </div>

            {/* Models */}

            <FilterModal show={showFilter}
                setShow={setShowFilter}
                filterData={filterData}
                setIsMiniLoading={setIsMiniLoading}
                isMiniLoading={isMiniLoading}

            />

            <SortByModal show={showSort} setOpen={setShowSort} />
        </>
    )
}

export default IsLoadingHOC(Listing)
