import { useCallback, useEffect, useState } from 'react'
import { Accordion, Modal, Nav, Tab } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import DashboardBoxes from '../../components/common/DashboardBoxes'
import JobsAppliedFor from '../../components/common/JobsAppliedFor'
import RecentTransactions from '../../components/common/RecentTransactions'
import {
    ButtonTag,
    Checkbox,
    H1Tag,
    PTag
} from '../../components/designComponents/MicroComponents'
import { AddProfiles, dashboardApi, setDashboard } from '../../store/dashboard/slice'

import { toast } from 'react-toastify'
import 'swiper/css'
import 'swiper/css/navigation'
import {
    ImageOne, ProfilePictureFive, ProfilePictureFour, ProfilePictureOne, ProfilePictureSeven, ProfilePictureSix, ProfilePictureTwo
} from '../../assets/img'
import { getProfileImg, setAuth } from '../../store/auth/slice'

import ProductCard from '../../components/common/ProductCard'
import IsLoadingHOC from '../../components/higherOrderLoader/IsLoadingHOC'
import {
    allCategoryApi,
    allsubCategoriesApi,
    allSubSubCategoriesApi,
    setCategory
} from '../../store/category/slice'
import { getSocialdetail } from '../../store/socialdetail/slice'
//icons
import { FiPlus } from 'react-icons/fi'
import { commonMsg } from '../../components/common/ValidationConstants'
import MiniLoader from '../../components/customLoader/MiniLoader'
import { removeDuplicates } from '../../helpers/functions'

const Dashboard = ({ setLoading, images }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const dashboard = useSelector(state => state.dashboard)
    const userInfo = useSelector(state => state.auth)
    const categoryData = useSelector(state => state.category)
    //const dashboard = useSelector(store => store.dashboard.dashboard)

    const [show, setShow] = useState(false)
    const [user, setUser] = useState(false)
    const [categoryList, setCategoryList] = useState([])
    const [subCategoryList, setSubCategoryList] = useState([])
    const [bookings, setBookings] = useState({})
    const [wallet, setWallet] = useState({})
    const [openBottomSheet, setOpenBottomSheet] = useState(false)
    const [categoryListForSelection, setCategoryListForSelection] = useState([])
    const [selectedSubCategory, setSelectedSubCategory] = useState([])
    const [profilesData, setProfilesData] = useState([])
    const [selectedData, setSelectedData] = useState([])
    const [paramsData, setParamsData] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    const [tempProfileData, setTempProfileData] = useState([])

    const [totalDataCount, setTotalDataCount] = useState([])

    const jobsAppliesForArray = [
        {
            talentName: 'Anchor',
            date: 'Mar 23, 11:30 am',
            projectTitle: 'Atarangi Re',
            image: ProfilePictureFour,
            Status: 'Status',
            Waiting: 'Waiting',
        },
        {
            talentName: 'Anchor',
            date: 'Mar 23, 11:30 am',
            projectTitle: 'Atarangi Re',
            image: ProfilePictureFive,
            Status: 'Status',
            Waiting: 'Waiting',
        },
        {
            talentName: 'Anchor',
            date: 'Mar 23, 11:30 am',
            projectTitle: 'Atarangi Re',
            image: ProfilePictureFive,
            Status: 'Status',
            Waiting: 'Waiting',
        },
    ]

    const recentTransactions = [
        {
            name: 'Aakash Shah',
            amount: '-3000',
            date: 'Mar 23, 11:30 am',
            image: ProfilePictureTwo,
        },
        {
            name: 'Pramod Suchak',
            amount: '-1500',
            date: 'Mar 23, 11:30 am',
            image: ProfilePictureSix,
        },
        {
            name: 'Paid to Shikha',
            amount: '-5000',
            date: 'Mar 23, 11:30 am',
            image: ProfilePictureSeven,
        },
    ]

    const InterestingDeals = [
        {
            gallery: [ImageOne, ImageOne, ImageOne, ImageOne],
            UserName: 'Myna Villa',
            Category: 'Sub Category',
            review: '4.5',
            det: '₹1,00,000',
            BasePrice: '₹1,00,000',
            location: 'Lonavala',
            ProfileImg: ProfilePictureOne,
            Services: 'Venna Services',
        },
        {
            gallery: [ImageOne, ImageOne, ImageOne, ImageOne],
            UserName: 'Myna Villa',
            Category: 'Sub Category',
            review: '4.5',
            det: '₹1,00,000',
            BasePrice: '₹1,00,000',
            location: 'Lonavala',
            ProfileImg: ProfilePictureOne,
            Services: 'Venna Services',
        },
        {
            gallery: [ImageOne, ImageOne, ImageOne, ImageOne],
            UserName: 'Myna Villa',
            Category: 'Sub Category',
            review: '4.5',
            det: '₹1,00,000',
            BasePrice: '₹1,00,000',
            location: 'Lonavala',
            ProfileImg: ProfilePictureOne,
            Services: 'Venna Services',
        },
        {
            gallery: [ImageOne, ImageOne, ImageOne, ImageOne],
            UserName: 'Myna Villa',
            Category: 'Sub Category',
            review: '4.5',
            det: '₹1,00,000',
            BasePrice: '₹1,00,000',
            location: 'Lonavala',
            ProfileImg: ProfilePictureOne,
            Services: 'Venna Services',
        },
        {
            gallery: [ImageOne, ImageOne, ImageOne, ImageOne],
            UserName: 'Myna Villa',
            Category: 'Sub Category',
            review: '4.5',
            det: '₹1,00,000',
            BasePrice: '₹1,00,000',
            location: 'Lonavala',
            ProfileImg: ProfilePictureOne,
            Services: 'Venna Services',
        },
        {
            gallery: [ImageOne, ImageOne, ImageOne, ImageOne],
            UserName: 'Myna Villa',
            Category: 'Sub Category',
            review: '4.5',
            det: '₹1,00,000',
            BasePrice: '₹1,00,000',
            location: 'Lonavala',
            ProfileImg: ProfilePictureOne,
            Services: 'Venna Services',
        },
    ]

    useEffect(() => {
        Promise.all([
            dispatch(getProfileImg()),
            dispatch(dashboardApi()),
            dispatch(getSocialdetail()),
            dispatch(setAuth()),
        ])
    }, [])

    useEffect(() => {
        if (dashboard?.status === 'failed') {
            if (dashboard?.type !== 'BASIC_DETAIL') {
                // toast.error('Error accour')
            }
        } else if (dashboard?.status === 'succeed') {
            let mainArr = []
            if (dashboard?.type === 'DASHBOARD_API') {
                setBookings(dashboard.dashboard.bookings)
                setWallet(dashboard.dashboard.wallet)
                setTotalDataCount(dashboard?.dashboard?.ordercounts)

                let categoriesTab = []
                let subCategoryTabData = [...dashboard.dashboard.profiles]
                dashboard.dashboard.profiles.map((x, index) => {
                    categoriesTab.push(x.profileName)
                })
                removeDuplicates(categoriesTab).map((x, i) => {
                    mainArr.push({
                        category: x,
                        subCategory: [],
                    })
                })

                mainArr = mainArr.filter(
                    (value, index, self) =>
                        index === self.findIndex(t => t.category === value.category)
                )

                mainArr.map((x, index) => {
                    dashboard.dashboard.profiles.map((y, index) => {
                        if (x.category === y.profileName) {
                            x.subCategory.push(y)
                        }
                    })
                })
                setCategoryList([...mainArr])
                Promise.all([dispatch(allCategoryApi()), dispatch(allsubCategoriesApi())]).finally(
                    () => {
                        setLoading(false)
                        dispatch(allSubSubCategoriesApi())
                    }
                )
            } else if (dashboard?.type === 'ADD_PROFILES') {
                toast.success(commonMsg.categoryUpdate)
                onDismiss()
                dispatch(setDashboard())
                dispatch(dashboardApi())
            }
        }
    }, [dashboard])

    useEffect(() => {
        if (userInfo?.status === 'failed') {
        } else if (userInfo?.status === 'succeed') {
            setUser(userInfo.userInfo)
            // if (JSON.stringify(userInfo.userInfo) !== '{}') {
            // }
        }
    }, [userInfo])

    useEffect(() => {
        if (categoryData?.status === 'failed') {
        } else if (categoryData?.status === 'succeed') {
            if (categoryData?.type === 'SUB_SUB_CATEGORY_API') {
                dispatch(setCategory())
                setSubCategoryList(categoryData.subCategory)
                dataSetSubcategory(
                    categoryData.category,
                    categoryData.subCategory,
                    categoryData.subSubCategory
                )
                dispatch(setDashboard())
            }
            if (categoryData?.type === 'SUB_SUB_CATEGORY_API') {
                dispatch(setCategory())
                dataSetSubSubcategory(
                    categoryData.subSubCategory,
                    categoryData.subCategory,
                    categoryData.category
                )
            }
        }
    }, [categoryData])

    const dataSetSubSubcategory = useCallback(
        (subSubCategoryArray, subCategoryArray, categoryArray) => {
            let categoryTempArray = []
            categoryArray.map((categoryData, i) => {
                categoryTempArray.push({
                    categoryId: categoryData.categoryId,
                    categoryName: categoryData.name,
                    subCategory: [],
                })
                const categoryLastPos = categoryTempArray.length - 1
                const catId = categoryTempArray[categoryLastPos].categoryId
                subCategoryArray.map(subCategoryData => {
                    if (catId === subCategoryData.categoryId) {
                        const isDisable =
                            dashboard?.dashboard.profiles?.find(value => {
                                return value.profileType === subCategoryData.permalink
                            }) !== undefined
                                ? true
                                : false
                        const isSubSubCategory =
                            subSubCategoryArray.find(value => {
                                return value.subCategoryId === subCategoryData.subCategoryId
                            }) !== undefined
                                ? true
                                : false
                        categoryTempArray[categoryLastPos].subCategory.push({
                            categoryId: subCategoryData.categoryId,
                            categoryName: subCategoryData.categoryName,
                            subCategoryId: subCategoryData.subCategoryId,
                            subCategoryName: subCategoryData.subCategoryName,
                            isActive: subCategoryData.isActive,
                            permalink: subCategoryData.permalink,
                            isSubSubCategory: isSubSubCategory,
                            isSelect: isDisable,
                            isDisable: isDisable,
                            subSubCategory: [],
                        })
                        const subCategoryLastPos =
                            categoryTempArray[categoryLastPos].subCategory.length - 1
                        const subCategory =
                            categoryTempArray[categoryLastPos].subCategory[subCategoryLastPos]
                        let tempData = []
                        if (subCategory.isSubSubCategory === true) {
                            subSubCategoryArray.map((subSubCategory, subSubCategoryIndex) => {
                                tempData.push({
                                    categoryId: subSubCategory.categoryId,
                                    subCategoryId: subSubCategory.subCategoryId,
                                    subSubCategoryId: subSubCategory.subSubCategoryId,
                                    categoryName: subSubCategory.categoryName,
                                    subCategoryName: subSubCategory.subCategoryName,
                                    subSubCategoryName: subSubCategory.subSubCategoryName,
                                    permalink: subSubCategory.permalink,
                                })
                                if (subSubCategory.subCategoryId === subCategory.subCategoryId) {
                                    const isDisable =
                                        dashboard?.dashboard.profiles?.find(value => {
                                            return value.profileType === subSubCategory.permalink
                                        }) !== undefined
                                            ? true
                                            : false
                                    categoryTempArray[categoryLastPos].subCategory[
                                        subCategoryLastPos
                                    ].subSubCategory.push({
                                        categoryId: subSubCategory.categoryId,
                                        categoryName: subSubCategory.categoryName,
                                        subCategoryId: subSubCategory.subCategoryId,
                                        subCategoryName: subSubCategory.subCategoryName,
                                        subSubCategoryId: subSubCategory.subSubCategoryId,
                                        subSubCategoryName: subSubCategory.subSubCategoryName,
                                        permalink: subSubCategory.permalink,
                                        isActive: subSubCategory.isActive,
                                        isSelect: isDisable,
                                        isDisable: isDisable,
                                    })
                                }
                            })
                        }
                        setParamsData(tempData)
                    }
                })
                const subCategory = [
                    ...categoryTempArray[categoryLastPos].subCategory.filter(
                        ({ isSubSubCategory }) => isSubSubCategory
                    ),
                    ...categoryTempArray[categoryLastPos].subCategory.filter(
                        ({ isSubSubCategory }) => !isSubSubCategory
                    ),
                ]
                categoryTempArray[categoryLastPos].subCategory = []
                categoryTempArray[categoryLastPos].subCategory = subCategory
            })

            setProfilesData(categoryTempArray)

            setProfilesData(state => {
                setIsLoading(false)
                return categoryTempArray
            })

            categoryTempArray.map((catData, catIndex) => {
                catData.subCategory.map((subCatData, subCatIndex) => {
                    if (subCatData.isDisable === true) {
                        selectedData.push({
                            isSubSubCategory: false,
                            categoryPos: catIndex,
                            categoryId: catData.categoryId,
                            subCategoryPos: subCatIndex,
                            subCategoryId: subCatData.subCategoryId,
                            subSubCategoryId: 0,
                            subSubCategoryPos: 0,
                            isAlreadySelect: true,
                            permalink: subCatData.permalink,
                        })
                    }
                    subCatData.subSubCategory.map((subSubCatData, subSubIndex) => {
                        if (subSubCatData.isDisable === true) {
                            selectedData.push({
                                isSubSubCategory: true,
                                categoryPos: catIndex,
                                categoryId: catData.categoryId,
                                subCategoryPos: subCatIndex,
                                subCategoryId: subCatData.subCategoryId,
                                subSubCategoryPos: subSubIndex,
                                subSubCategoryId: subSubCatData.subSubCategoryId,
                                permalink: subSubCatData.permalink,
                                isAlreadySelect: true,
                            })
                        }
                    })
                })
            })
            setSelectedData(data => [...data])
        },
        [],
    )


    const dataSetSubcategory = useCallback((categories, allsubCategories, allSubSubCategory) => {
        if (categories.length != categoryListForSelection.length) {
            let categoryArray = []
            categories.map((category, index) => {
                categoryArray.push({
                    id: category.categoryId,
                    name: category.name,
                    subcategories: [],
                })
            })

            //parmlink.
            let subCategoryArray = []
            let subSubCategoryArray = []

            allsubCategories.map((apiSubCategory, categoryIndex) => {
                subCategoryArray.push(apiSubCategory)
            })

            allSubSubCategory.map((d, i) => {
                subSubCategoryArray.push(d)
            })

            subCategoryArray.map((x, i) => {
                categoryList.map((y, j) => {
                    y.subCategory.map((z, k) => {
                        if (z.profileType.split('/')[1] === x.permalink.split('/')[1]) {
                            subCategoryArray[i] = { ...subCategoryArray[i], isDisable: true }
                        } else {
                            if (x?.isDisable === false) {
                                subCategoryArray[i] = { ...subCategoryArray[i], isDisable: false }
                            }
                        }
                    })
                })
            })

            categoryArray.map((category, categoryIndex) => {
                categoryArray[categoryIndex].subcategories = subCategoryArray.filter(
                    x => x.categoryId === category.id
                )
            })

            let selectedSubCategoryData = []
            categoryArray.map((category, categoryIndex) => {
                category.subcategories.map((subcategory, subCategoryIndex) => {
                    categoryArray[categoryIndex].subcategories[subCategoryIndex] = {
                        ...subcategory,
                        isSelect: subcategory.isDisable === true ? true : false,
                    }
                    if (subcategory.isDisable === true) {
                        selectedSubCategoryData.push(subcategory)
                    }
                })
            })
            setSelectedSubCategory([...selectedSubCategoryData])
            setCategoryListForSelection([...categoryArray])
        }
    }, [])

    const onDismiss = () => {
        setOpenBottomSheet(false)
        setShow(false)
    }

    const showCategoryAndSubCategory = (categoryList) => {
        return (
            categoryList.length > 0 && (
                <div className='dashboard-tabs px-0'>
                    <Tab.Container
                        id='left-tabs-example'
                        defaultActiveKey={categoryList[0].category}
                    >
                        <Nav variant='pills text-capitalize'>
                            {categoryList.map((category, index) => (
                                <Nav.Item className='pointer' key={index}>
                                    <Nav.Link eventKey={category.category}>
                                        {category.category}
                                    </Nav.Link>
                                </Nav.Item>
                            ))}
                        </Nav>
                        <Tab.Content>
                            {categoryList.map((category, position) => (
                                <Tab.Pane eventKey={category.category} key={position}>
                                    <div className='row'>
                                        {category.subCategory.map((data, index) => {
                                            return (
                                                <DashboardBoxes
                                                    key={index}
                                                    title={
                                                        data.profileType.split('/')[
                                                        data.profileType.split('/').length - 1
                                                        ]
                                                    }
                                                    type={data.profileType}
                                                    titlePercentage={
                                                        data.completionPercentage + '%'
                                                    }
                                                    now={data.completionPercentage}
                                                    onClick={e => {
                                                        selectServiceOffer(category.category, data)
                                                    }}
                                                />
                                            )
                                        })}
                                    </div>
                                </Tab.Pane>
                            ))}
                        </Tab.Content>
                    </Tab.Container>
                </div>
            )
        )
    }

    let removeByAttr = function (arr, attr, value) {
        var i = arr.length
        while (i--) {
            if (    
                arr[i] &&
                arr[i].hasOwnProperty(attr) &&
                arguments.length > 2 &&
                arr[i][attr] === value
            ) {
                arr.splice(i, 1)
            }
        }
        return arr
    }

    const subCategories = (data, index) => (
        <Accordion.Body className='px-0 pb-0'>
            {data.subCategory?.map((x, i) => {
                return (
                    <div
                        className={`d-flex justify-content-between align-items-center ${x.isSubSubCategory && 'mb-2'
                            }`}
                        key={i}
                    >
                        {x.isSubSubCategory ? (
                            <Accordion defaultChecked='0' className='w-100 mx-2' key={i}>
                                <Accordion.Item eventKey='0' className='border-0 w-100'>
                                    <Accordion.Header>
                                        <PTag
                                            classes={'text-dark-blue bold fn-16 py-3 px-3'}
                                            texts={x.subCategoryName}
                                        />
                                    </Accordion.Header>
                                    <Accordion.Body className='px-1 py-1 mx-2'>
                                        {x.subSubCategory.map((element, index) => {
                                            return (
                                                <div
                                                    className='dashboard-checkbox d-flex justify-content-between align-items-center border-bottom p-2'
                                                    key={index}
                                                >
                                                    <p
                                                        className={'text-dark-blue bold fn-16'}
                                                        style={{ width: '300%' }}
                                                    >
                                                        {' '}
                                                        {element.subSubCategoryName}
                                                    </p>
                                                    {element.isDisable === true ? (
                                                        <Checkbox
                                                            classes={
                                                                'justify-content-end label_tag_w_auto'
                                                            }
                                                            value={element.isSelect}
                                                        />
                                                    ) : (
                                                        <Checkbox
                                                            classes={
                                                                'justify-content-end label_tag_w_auto'
                                                            }
                                                            onChange={e => {
                                                                if (e.target.checked) {
                                                                    setTempProfileData([
                                                                        ...tempProfileData,
                                                                        element,
                                                                    ])
                                                                } else {
                                                                    setTempProfileData(
                                                                        removeByAttr(
                                                                            tempProfileData,
                                                                            'subSubCategoryId',
                                                                            element.subSubCategoryId
                                                                        )
                                                                    )
                                                                }
                                                            }}
                                                        />
                                                    )}
                                                </div>
                                            )
                                        })}
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        ) : (
                            <div
                                className={`dashboard-checkbox d-flex justify-content-between align-items-center w-100 mx-2 px-2 ${!x.isSubSubCategory && 'border-bottom py-2'
                                    }`}
                                key={i}
                            >
                                <p className={'text-dark-blue bold fn-16'} style={{ width: '80%' }}>
                                    {' '}
                                    {x.subCategoryName}
                                </p>

                                {x.isDisable === true ? (
                                    <Checkbox
                                        classes={'justify-content-end me-2 label_tag_w_auto'}
                                        value={x.isSelect}
                                    />
                                ) : (
                                    <Checkbox
                                        classes={'justify-content-end me-2 label_tag_w_auto'}
                                        onChange={e => {
                                            if (e.target.checked) {
                                                setTempProfileData([...tempProfileData, x])
                                                // setSelectedData([...selectedData, x])
                                            } else {
                                                setTempProfileData(
                                                    removeByAttr(
                                                        tempProfileData,
                                                        'subSubCategoryId',
                                                        x.subCategoryId
                                                    )
                                                )
                                                // setSelectedData(
                                                //     removeByAttr(
                                                //         selectedData,
                                                //         'subSubCategoryId',
                                                //         x.subCategoryId
                                                //     )
                                                // )
                                            }
                                        }}
                                    />
                                )}
                            </div>
                        )}
                    </div>
                )
            })}
        </Accordion.Body>
    )

    const dailogCategoryAndSubCategory = () => {
        return (
            <div className='select-Category select-Category-modal'>
                <Modal
                    show={show}
                    onHide={() => {
                        setShow(false)
                        setTempProfileData([])
                    }}
                    dialogClassName='modal-dialog-scrollable'
                    aria-labelledby='example-custom-modal-styling-title'
                >
                    <Modal.Header className='border-bottom-0 pb-0' closeButton>
                        <PTag classes={'text-dark-blue fn-17 fw-bold'} texts={'Select Category'} />
                    </Modal.Header>
                    <Modal.Body>
                        <div className='pb-2 h-100 d-flex flex-column'>
                            <div className='justify-content-between'>
                                <div className='shadow-accordion center-item chat-window accordion-down-arrow'>
                                    {isLoading ? (
                                        <MiniLoader className={'w-100 h-100'} />
                                    ) : (
                                        <>
                                            {profilesData?.map((data, index) => (
                                                <Accordion
                                                    defaultChecked='0'
                                                    className='mb-3'
                                                    key={index}
                                                >
                                                    <Accordion.Item
                                                        eventKey='0'
                                                        className='border-0'
                                                    >
                                                        <Accordion.Header>
                                                            <PTag
                                                                classes={
                                                                    'text-dark-blue bold fn-16 py-3 px-3'
                                                                }
                                                                texts={data.categoryName}
                                                            />
                                                        </Accordion.Header>
                                                        {subCategories(data, index)}
                                                    </Accordion.Item>
                                                </Accordion>
                                            ))}
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer className='border-top-0 pt-0'>
                        <div className='bg-white box-shadow w-100 m-0'>
                            <ButtonTag
                                classes={'btn-orange bold fn-12 w-100'}
                                value={'Continue'}
                                onClick={e => {
                                    e.preventDefault()
                                    let getArray = []
                                    tempProfileData.map((data, index) => {
                                        getArray.push(data.permalink)
                                    })
                                    const paramsdata = {
                                        profiles: getArray,
                                    }
                                    // dispatch(basic_detail(paramsdata))
                                    setLoading(false)
                                    Promise.all([dispatch(AddProfiles(paramsdata))]).finally(() => {
                                        dispatch(dashboardApi())
                                        setLoading(false)
                                        setTempProfileData([])
                                    })
                                    setShow(false)
                                }}
                            />
                        </div>
                    </Modal.Footer>
                </Modal>
            </div >
        )
    }

    const selectServiceOffer = (category, profile) => {
        subCategoryList.map((x, i) => {
            if (x.perlinkCat2 === profile.profileType.split('/')[1]) {
                if (category === 'services') {
                    return navigate('/dashboard/added-inventories/', {
                        state: {
                            subCat: x,
                            profile,
                        },
                    })
                } else if (category === 'locations') {
                    return navigate('/dashboard/details-location/', {
                        state: {
                            subCat: x,
                            profile,
                        },
                    })
                } else if (category === 'crew') {
                    return navigate('/dashboard/details-crew/', {
                        state: {
                            subCat: x,
                            profile,
                        },
                    })
                } else if (category === 'talent') {
                    return navigate('/dashboard/details-talent', {
                        state: {
                            subCat: x,
                            profile,
                        },
                    })
                }
            }
        })
    }

    return (
        <>
            <div className='container'>
                <div className='my-3 text-center'>
                    <H1Tag
                        classes={
                            'text-dark-blue fn-md-20 fn-26 fw-bold border-bottom border-2 border-dark d-inline text-capitalize'
                        }
                        title={`Welcome! ${user.firstName ?? 'User'} ${user?.lastName ?? ''}`}
                    />
                    <PTag
                        classes={'text-dark-blue fn-18 line-height-1 mt-sm-2'}
                        texts={'Dashboard'}
                    />
                </div>
                <div className='row'>
                    {totalDataCount.map((data, i) => {
                        console.log("Data>>",data?.link);
                        return (
                            <div key={i} className='col-6 col-sm-4 col-xl-2 d-flex justify-content-center mb-xl-4 mb-3'>
                                <Link to={`${data?.link}`} className={`box p-2 ${i % 2 === 0 ? "bg-extra-lite-green" : "bg-extra-lite-orange "}  text-center d-flex flex-column justify-content-center align-items-center h-150`}>
                                    <span className='text-dark-blue fn-36 fw-bold'>{data?.orderCount ?? 0}</span>
                                    <span className='text-gray text-wrap'>{data?.oderyCountLabel}</span>
                                </Link>
                            </div>
                        )
                    })}
                </div>
                <div className='row m-0 mt-4'>
                    <div className='d-flex justify-content-between align-items-lg-center px-0'>
                        <PTag
                            classes={'text-dark-blue bold mb-3'}
                            texts={'Services Offered by you'}
                        />
                        <div className='d-flex align-items-center'>
                            <div
                                className='d-flex align-items-center pointer addmore-box'
                                onClick={() => {
                                    setShow(true)
                                }}
                            >
                                <FiPlus fontSize={20} className={'Fi-Plus'} />
                                <PTag
                                    classes={'text-navy-blue ms-1'}
                                    texts={categoryList.length > 0 ? 'Add more' : 'Add'}
                                />
                            </div>
                        </div>
                    </div>

                    {categoryList.length > 0 ? (
                        showCategoryAndSubCategory(categoryList)
                    ) : (
                        <>
                            <div
                                className='w-100 d-flex align-items-center justify-content-center'
                                style={{ height: '200px' }}
                            >
                                <PTag
                                    classes={'text-gray '}
                                    texts={'No data found'}
                                    style={{ height: '100px' }}
                                />
                            </div>
                        </>
                    )}
                </div>
                {dailogCategoryAndSubCategory()}
                <div className='row mb-sm-3'>
                    <div className='col-sm-12 col-lg-6 col-xl-6 col-xxl-6 col-xxxl-6'>
                        <div className='card rounded-16 p-3 mb-3'>
                            <PTag
                                classes={'text-dark-blue fn-18 fw-bold mb-3'}
                                texts={'Jobs Applied For'}
                            />
                            {jobsAppliesForArray.map((data, index) => (
                                <JobsAppliedFor
                                    key={index}
                                    talentName={data.talentName}
                                    Status={data.Status}
                                    Waiting={data.Waiting}
                                    date={data.date}
                                    projectTitle={data.projectTitle}
                                    image={data.image}
                                />
                            ))}
                            <div className='text-center'>
                                <ButtonTag
                                    classes={'btn-extra-lite-green bold px-4'}
                                    value={'View All'}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='col-sm-12 col-lg-6 col-xl-6 col-xxl-6 col-xxxl-6'>
                        <div className='card rounded-16 p-3 mb-3'>
                            <PTag
                                classes={'text-dark-blue fn-18 fw-bold mb-3'}
                                texts={'Recent Transactions'}
                            />
                            {recentTransactions.map((data, index) => (
                                <RecentTransactions
                                    key={index}
                                    name={data.name}
                                    amount={data.amount}
                                    date={data.date}
                                    image={data.image}
                                />
                            ))}
                            <div className='text-center'>
                                <ButtonTag
                                    classes={'btn-extra-lite-green bold px-4'}
                                    value={'View All'}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* Interesting Deals */}
                <div className='row mb-sm-3 mb-2'>
                    <div className='col-12'>
                        <PTag
                            classes={'text-dark-blue fw-bold fn-20'}
                            texts={'Interesting Deals'}
                        />
                    </div>
                </div>
                {/* Successful Bookings */}
                <div className='row pb-5'>
                    <div className='col-12'>
                        <Swiper
                            className='mySwiper navigation-down pb-5'
                            spaceBetween={25}
                            slidesPerView={4}
                            navigation={true}
                            modules={[Navigation]}
                            breakpoints={{
                                // 1440: {
                                //     slidesPerView: 4,
                                // },
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
                            {InterestingDeals.map((data, indexInterestingDeals) => {
                                return (
                                    <SwiperSlide key={indexInterestingDeals}>
                                        <ProductCard
                                            gallery={data.gallery}
                                            PackageName={data.PackageName}
                                            UserName={data.UserName}
                                            Category={data.Category}
                                            review={data.review}
                                            del={data.det}
                                            BasePrice={data.BasePrice}
                                            location={data.location}
                                            ProfileImg={data.ProfileImg}
                                            Services={data.Services}
                                        />
                                    </SwiperSlide>
                                )
                            })}
                        </Swiper>
                    </div>
                </div>
            </div>
        </>
    )
}

export default IsLoadingHOC(Dashboard)
