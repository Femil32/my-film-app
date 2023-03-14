import { useEffect, useState } from 'react'
import { Modal, Offcanvas } from 'react-bootstrap'
// import svgs
import { LogoIcon, Transactions } from '../../components/AllSvgs'
// import Imgs
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
    ATag,
    ButtonTag,
    ImgTag,
    LITag,
    PTag,
    ULTag
} from '../../components/designComponents/MicroComponents'
import IsLoadingHOC from '../../components/higherOrderLoader/IsLoadingHOC'
import { getUserInfo } from '../../store/auth/slice'
import { getSocialdetail } from '../../store/socialdetail/slice'
// icons
import { BiMessageAltDetail } from 'react-icons/bi'
import { FaUser } from 'react-icons/fa'
import {
    FiArchive, FiArrowRight, FiBookmark, FiChevronDown, FiGrid, FiHeart, FiMenu, FiSearch, FiShoppingCart, FiTag
} from 'react-icons/fi'
import { IoBagHandleOutline, IoDocumentTextOutline, IoWalletOutline } from 'react-icons/io5'
import { MdNotifications } from 'react-icons/md'
import { commonMsg } from '../../components/common/ValidationConstants'
import { ACCESS_TOKEN } from '../../utils/constants'

import Search from '../../components/common/search'
import MiniLoader from '../../components/customLoader/MiniLoader'
import { postSearch } from '../../store/search/slice'

function Header({ setLoading }) {
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { userInfo } = useSelector(state => state.auth)

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const [modal, setModal] = useState(false)
    const [searchLoader, setSearchLoader] = useState(false)

    const nevigate = useNavigate()

    const onclickLogout = () => {
        setModal(!modal)
    }

    const yesClick = props => {
        nevigate('/')
        setModal(!modal)
        toast.success(commonMsg.logout)
        localStorage.clear()
    }

    const searchKeyword = (e, data) => {
        let params = {
            "searchString": data,
            "fromRecord": 0,
            "batchSize": 20,
            "withImage": true
        }

        dispatch(postSearch(params)).then(res => {
            if (res.payload.data.profiles.length) {
                navigate('/search/listing', {
                    state: {
                        keyword: data.toLowerCase()
                    }
                })
                e.target.value = ""
            } else {
                toast.error(commonMsg.noDataFound)
            }
            setSearchLoader(false)
        })
    }

    useEffect(() => {
        let isFetching = true

        setLoading(false)
        if (localStorage.getItem(ACCESS_TOKEN)) {
            isFetching && dispatch(getSocialdetail())
        }
        isFetching && (!userInfo.fbmUserId && localStorage.getItem(ACCESS_TOKEN)) && dispatch(getUserInfo())

        return () => isFetching = false
    }, [])

    return (
        <div className='home-page'>
            <div className='container d-flex align-items-center justify-content-between mb-4 mt-3'>
                <Link to={'/'}>
                    <LogoIcon width={'80'} />
                </Link>
                <div className='d-flex align-items-center'>
                    <div className='headersubmenu'>
                        <ULTag classes='mb-0 d-flex textblack'>
                            <LITag>
                                <ATag classes='textblack pointer'>
                                    <PTag
                                        classes={'pe-4 fn-14 fw-bold'}
                                        texts={'Who we are'}
                                    ></PTag>
                                </ATag>
                            </LITag>
                            <LITag>
                                <ATag classes='textblack pointer'>
                                    <PTag classes={'px-4 fn-14 fw-bold'} texts={'Blog'}></PTag>
                                </ATag>
                            </LITag>
                            <LITag classes={'dropdownUL '}>
                                <ATag classes='textblack d-flex align-items-center px-4 fn-14 fw-bold'>
                                    <PTag classes={'pe-1 pointer'} texts={'Categories'}></PTag>
                                    <FiChevronDown className={'Fi-ChevronDown'} />
                                </ATag>
                                <ULTag
                                    classes={
                                        'box-shadow p-3 dropdown bg-lite-white rounded-10 z-index'
                                    }
                                >
                                    <LITag>
                                        <ATag classes='textblack pointer'>
                                            <PTag
                                                classes={'pe-4 fn-14 fw-bold py-2'}
                                                texts={'Who we are'}
                                            ></PTag>
                                        </ATag>
                                    </LITag>
                                    <LITag>
                                        <ATag classes='textblack pointer'>
                                            <PTag
                                                classes={'pe-4 fn-14 fw-bold py-2'}
                                                texts={'Who we are'}
                                            ></PTag>
                                        </ATag>
                                    </LITag>
                                    <LITag>
                                        <ATag classes='textblack pointer'>
                                            <PTag
                                                classes={'pe-4 fn-14 fw-bold py-2'}
                                                texts={'Who we are'}
                                            ></PTag>
                                        </ATag>
                                    </LITag>
                                    <LITag>
                                        <ATag classes='textblack pointer'>
                                            <PTag
                                                classes={'pe-4 fn-14 fw-bold py-2'}
                                                texts={'Who we are'}
                                            ></PTag>
                                        </ATag>
                                    </LITag>
                                </ULTag>
                            </LITag>
                            <LITag>
                                <ATag classes='textblack pointer'>
                                    <PTag classes={'px-4 fn-14 fw-bold'} texts={'Careers'}></PTag>
                                </ATag>
                            </LITag>
                            <LITag>
                                <ATag classes='textblack pointer'>
                                    <PTag classes={'px-4 fn-14 fw-bold'} texts={'Contact'}></PTag>
                                </ATag>
                            </LITag>
                            <LITag>
                                <ATag classes='textblack pointer'>
                                    <PTag classes={'px-4 fn-14 fw-bold'} texts={'FAQs'}></PTag>
                                </ATag>
                            </LITag>
                        </ULTag>
                    </div>
                    <Search
                        children={!searchLoader ? <FiSearch className='fi-search posi' /> : <MiniLoader width={20} height={20} className={'w-auto h-auto fi-search posi'} />}
                        onClick={(e) => {
                            e.preventDefault
                        }}
                        onKeyDown={e => {
                            if (e.target.value.length > 2) {
                                if (e.key === 'Enter') {
                                    searchKeyword(e, e.target.value)
                                    setSearchLoader(true)
                                }
                            }
                        }}
                        onBlur={(e) => { setSearchLoader(false) }}
                    />
                    {/* User Icon */}
                    <MdNotifications
                        color='rgb(113 122 134)'
                        className='Md-Notifications pointer me-lg-4 me-2'
                        onClick={() => {
                            nevigate('/dashboard/notifications')
                        }}
                    />

                    {/* sign up / sign in */}
                    {localStorage.getItem(ACCESS_TOKEN) === null ||
                        localStorage.getItem(ACCESS_TOKEN) === '' ? (
                        <ButtonTag
                            classes={'border border-dark signupsigninbutton'}
                            value={
                                <div className='d-flex align-items-center justify-content-between'>
                                    <FaUser fontSize={16} className='usericonbutton' />
                                    <FiArrowRight
                                        className={'Fi-Arrow-Right LeftArrowsignup'}
                                        style={{ color: 'var(--lite-gray)' }}
                                    />
                                    <PTag
                                        classes={'signupsignin fn-12 ms-1'}
                                        texts={'sign up / sign in'}
                                    />
                                </div>
                            }
                            onClick={() => {
                                nevigate('/auth')
                            }}
                        />
                    ) : (
                        <ATag classes='icons pointer'>
                            {/* FiMenu Icon */}
                            <FiMenu className={'Fi-Menu'} onClick={handleShow} />
                        </ATag>
                    )}
                </div>
            </div>
            <Offcanvas placement={'end'} show={show} onHide={handleClose}>
                <div className='aside-container'>
                    <aside>
                        <Offcanvas.Header className='p-0'>
                            <div className='aside-header d-flex align-items-center w-100'>
                                <div className='aside-header-img-box me-3 border rounded-10'>
                                    <ImgTag
                                        src={userInfo?.profileImageUrl}
                                        alt={'profile'}
                                        classes={'img-fluid w-100 h-100 border rounded-10 '}
                                    />
                                </div>
                                <div>
                                    <PTag
                                        classes={'text-dark-blue fn-18 fw-bold text-capitalize'}
                                        texts={`${userInfo.firstName ?? 'User'}`}
                                    />
                                    <ATag
                                        classes={'pointer'}
                                        onClick={() => {
                                            handleClose()
                                            nevigate('/dashboard/myprofile')
                                        }}
                                    >
                                        <PTag classes={'text-green'} texts={'View Profile'} />
                                    </ATag>
                                </div>
                            </div>
                        </Offcanvas.Header>
                        <div className='d-flex flex-column justify-content-between aside-content'>
                            <div className='aside-body'>
                                <div className='aside-box pointer'>
                                    <ATag
                                        classes={'d-flex align-items-center'}
                                        onClick={() => {
                                            handleClose()
                                            nevigate('/dashboard')
                                        }}
                                    >
                                        <FiGrid
                                            fontSize={23}
                                            color={'rgba(60, 120, 190, 0.88)'}
                                            strokeWidth={1.5}
                                            fill={'#427cc320'}
                                        />
                                        <PTag
                                            classes={'text-dark-blue fn-16 ms-3'}
                                            texts={'Dashboard'}
                                        />
                                    </ATag>
                                </div>
                                <div className='aside-box pointer'>
                                    <ATag
                                        classes={'d-flex align-items-center'}
                                        onClick={() => {
                                            handleClose()
                                            nevigate(
                                                '/dashboard/orders'
                                            )
                                        }}
                                    >
                                        <FiShoppingCart
                                            fontSize={23}
                                            color={'rgba(60, 120, 190, 0.88)'}
                                            strokeWidth={1.5}
                                            fill={'#427cc320'}
                                        />
                                        <PTag
                                            classes={'text-dark-blue fn-16 ms-3'}
                                            texts={'My Orders'}
                                        />
                                    </ATag>
                                </div>
                                <div className='aside-box pointer'>
                                    <ATag
                                        classes={'d-flex align-items-center'}
                                        onClick={() => {
                                            handleClose()
                                            nevigate('/dashboard/wishlist', {
                                                state: { prevPath: location.pathname }
                                            })
                                        }}
                                    >
                                        <FiHeart
                                            fontSize={23}
                                            color={'rgba(60, 120, 190, 0.88)'}
                                            strokeWidth={1.5}
                                            fill={'#427cc320'}
                                        />
                                        <PTag
                                            classes={'text-dark-blue fn-16 ms-3'}
                                            texts={'My Wishlist'}
                                        />
                                    </ATag>
                                </div>
                                <div className='aside-box pointer'>
                                    <ATag
                                        classes={'d-flex align-items-center'}
                                        onClick={() => {
                                            handleClose()
                                            nevigate('/dashboard/projects')
                                        }}
                                    >
                                        <FiGrid
                                            fontSize={23}
                                            color={'rgba(60, 120, 190, 0.88)'}
                                            strokeWidth={1.5}
                                            fill={'#427cc320'}
                                        />
                                        <PTag
                                            classes={'text-dark-blue fn-16 ms-3'}
                                            texts={'My Projects'}
                                        />
                                    </ATag>
                                </div>
                                <div className='aside-box pointer'>
                                    <ATag
                                        classes={'d-flex align-items-center'}
                                        onClick={() => {
                                            handleClose()
                                            nevigate('/dashboard/added-inventories/request-review')
                                        }}
                                    >
                                        <BiMessageAltDetail
                                            fontSize={23}
                                            color={'rgba(60, 120, 190, 0.88)'}
                                            strokeWidth={0.01}
                                        // fill={'#427cc3'}
                                        />
                                        <PTag
                                            classes={'text-dark-blue fn-16 ms-3'}
                                            texts={'Reviews'}
                                        />
                                    </ATag>
                                </div>
                                <div className='aside-box pointer'>
                                    <ATag
                                        classes={'d-flex align-items-center'}
                                        onClick={() => {
                                            handleClose()
                                            nevigate('/dashboard/bookings')
                                        }}
                                    >
                                        <FiBookmark
                                            fontSize={23}
                                            color={'rgba(60, 120, 190, 0.88)'}
                                            strokeWidth={1.5}
                                            fill={'#427cc320'}
                                        />
                                        <PTag
                                            classes={'text-dark-blue fn-16 ms-3'}
                                            texts={'My Bookings'}
                                        />
                                    </ATag>
                                </div>
                                <div className='aside-box pointer'>
                                    <ATag
                                        classes={'d-flex align-items-center'}
                                        onClick={() => {
                                            handleClose()
                                            nevigate('/dashboard/wallet')
                                        }}
                                    >
                                        <IoWalletOutline
                                            fontSize={23}
                                            color={'rgba(60, 120, 190, 0.88)'}
                                        />
                                        <PTag
                                            classes={'text-dark-blue fn-16 ms-3'}
                                            texts={'My Wallet'}
                                        />
                                    </ATag>
                                </div>
                                <div className='aside-box pointer'>
                                    <ATag
                                        classes={'d-flex align-items-center'}
                                        onClick={() => {
                                            handleClose()
                                            // nevigate('/dashboard/liverequirements/')
                                            nevigate('/dashboard/projects')
                                        }}
                                    >
                                        <IoDocumentTextOutline
                                            fontSize={23}
                                            color={'rgba(60, 120, 190, 0.88)'}
                                            className={'Gr-DocumentText'}
                                        />
                                        <PTag
                                            classes={'text-dark-blue fn-16 ms-3'}
                                            texts={'My Requirements'}
                                        />
                                    </ATag>
                                </div>
                                <div className='aside-box pointer'>
                                    <ATag
                                        classes={'d-flex align-items-center'}
                                        onClick={() => {
                                            handleClose()
                                            nevigate('/dashboard/myjob/')
                                        }}
                                    >
                                        <IoBagHandleOutline
                                            fontSize={23}
                                            color={'rgba(60, 120, 190, 0.88)'}
                                        />
                                        <PTag
                                            classes={'text-dark-blue fn-16 ms-3'}
                                            texts={'My Jobs'}
                                        />
                                    </ATag>
                                </div>
                                <div className='aside-box pointer'>
                                    <ATag
                                        classes={'d-flex align-items-center'}
                                        onClick={() => {
                                            handleClose()
                                            nevigate('/dashboard/coupons/')
                                        }}
                                    >
                                        <FiTag
                                            fontSize={23}
                                            color={'rgba(60, 120, 190, 0.88)'}
                                            strokeWidth={1.5}
                                            fill={'#427cc320'}
                                        />
                                        <PTag
                                            classes={'text-dark-blue fn-16 ms-3'}
                                            texts={'My Coupons'}
                                        />
                                    </ATag>
                                </div>
                                <div className='aside-box pointer'>
                                    <ATag
                                        classes={'d-flex align-items-center'}
                                        onClick={() => {
                                            handleClose()
                                            nevigate('/dashboard/spotdeals/')
                                        }}
                                    >
                                        <FiArchive
                                            fontSize={23}
                                            color={'rgba(60, 120, 190, 0.88)'}
                                            strokeWidth={1.5}
                                            fill={'#427cc320'}
                                        />
                                        <PTag
                                            classes={'text-dark-blue fn-16 ms-3'}
                                            texts={'My Spot Deals'}
                                        />
                                    </ATag>
                                </div>
                                <div className='aside-box pointer'>
                                    <ATag
                                        classes={'d-flex align-items-center'}
                                        onClick={() => {
                                            handleClose()
                                            nevigate('/dashboard')
                                        }}
                                    >
                                        <Transactions width={'24'} />
                                        <PTag
                                            classes={'text-dark-blue fn-16 ms-3'}
                                            texts={'My Transactions'}
                                        />
                                    </ATag>
                                </div>
                            </div>
                            <div className='aside-footer px-2'>
                                <ButtonTag
                                    classes={'btn-orange'}
                                    value={'Log out'}
                                    onClick={() => {
                                        handleClose()
                                        onclickLogout()
                                    }}
                                />
                            </div>
                        </div>
                    </aside>
                </div>
            </Offcanvas>

            <Modal show={modal} onHide={onclickLogout}>
                <Modal.Header closeButton>
                    <Modal.Title>Logout</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to logout?</Modal.Body>
                <Modal.Footer>
                    <ButtonTag
                        classes={'btn-orange'}
                        value={'Yes'}
                        onClick={() => {
                            yesClick()
                        }}
                    />
                    <ButtonTag classes={'btn-orange'} value={'No'} onClick={onclickLogout} />
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default IsLoadingHOC(Header)