import React, { useEffect, useState } from 'react'
import { BackButton, ButtonTag, PTag } from '../../components/designComponents/MicroComponents'
import InventoriesCard from '../../components/common/InventoriesCard'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import UploadCSV from './UploadCSV'
import { getCategoryAndSubCategoryByLink } from '../../store/masterdata/slice'
import { inventoryGetByProfileApi, setService } from '../../store/service/slice'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from 'react-bootstrap'
import LogoIcon from '../../assets/img/profile/placeholder.png'
import IsLoadingHOC from '../../components/higherOrderLoader/IsLoadingHOC'
//icons
import { FiUploadCloud } from 'react-icons/fi'
import { MdClose } from 'react-icons/md'

const AddedInventories = ({ setLoading }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { state } = useLocation()
    const [show, setShow] = useState(false)
    const [open, setOpen] = useState(false)
    const [category, setCategory] = useState({})
    const [inventory, setInventory] = useState([])

    const [allInOneProp, setAllInOneProp] = useState({})

    const [currrentPage, setCurrrentPage] = useState(0)

    const masterData = useSelector(state => state.masterdata)
    const servicesData = useSelector(state => state.service)

    useEffect(() => {
        if (state !== null && state !== undefined) {
            setAllInOneProp(state)
            Promise.all([
                dispatch(getCategoryAndSubCategoryByLink(state?.profile?.profileType)),
            ]).then(() => {
                setLoading(false)
            })
        } else {
            navigate('/dashboard')
        }
    }, [])

    useEffect(() => {
        if (
            masterData.status === 'succeed' &&
            masterData.type === 'CATEGORY_AND_SUBCATEGORY_BY_PRAMILINK_API'
        ) {
            setCategory({ ...state, categoryData: masterData.categoryAndSubCategory })
        }
    }, [masterData])

    useEffect(() => {
        if (
            servicesData.status === 'succeed' &&
            servicesData.type === 'INVENTORY_GET_BY_PROFILE_API'
        ) {
            dispatch(setService())
            setInventory(servicesData?.getInventory?.inventory)
        }
        if (servicesData.status === 'succeed' && servicesData.type === 'DEL_INVENTORY') {
            dispatch(setService())
            dispatch(
                inventoryGetByProfileApi({
                    servicesProfileId: state?.profile?.profileId,
                    pageNo: currrentPage,
                })
            )
        }
    }, [servicesData])

    // useEffects
    useEffect(() => {
        dispatch(
            inventoryGetByProfileApi({
                servicesProfileId: state?.profile?.profileId,
                pageNo: currrentPage,
            })
        )
    }, [currrentPage])

    return (
        <>
            <BackButton
                textClass={'fn-20'}
                title={'Added Inventories'}
                onClick={() => {
                    navigate('/dashboard')
                }}
            />
            <div className='row my-5 MyServices'>
                <div className='col-lg-9'>
                    <div className='row mt-1'>
                        {inventory.length > 0 ? (
                            inventory.map((data, index) => (
                                <div className='col-xl-4 col-sm-6 mb-lg-4 pointer mb-3' key={index}>
                                    <InventoriesCard
                                        key={index}
                                        image={
                                            data.profileImageUrl ? data.profileImageUrl : LogoIcon
                                        }
                                        titleText={data.inventoryName}
                                        typeText={
                                            data.inventoryTypeName +
                                            '->' +
                                            data.inventorySubtypeName
                                        }
                                        priceText={data.perHour !== null ? data.perHour : '0'}
                                        cardData={{ ...allInOneProp, data }}
                                        percentageCompletion={data.percentageCompletion}
                                    />
                                </div>
                            ))
                        ) : (
                            <>
                                <div
                                    className='w-100 d-flex align-items-center justify-content-center'
                                    style={{ height: '300px' }}
                                >
                                    <PTag
                                        classes={'text-gray '}
                                        texts={'No data found'}
                                        style={{ height: '100px' }}
                                    />
                                </div>
                            </>
                        )}
                        {servicesData?.getInventory?.totalPages > 1 && (
                            <CustomPagination
                                pageCount={servicesData?.getInventory?.totalPages}
                                onPageChange={(page) => {
                                    setCurrrentPage(page.selected)
                                }}
                            />
                        )}
                    </div>
                </div>
                <div className='col-lg-3'>
                    <div className='mb-3'>
                        <PTag classes={'text-dark-blue fw-bold fn-18 mb-3'} texts={'Inventories'} />
                        <div className='d-flex justify-content-center align-items-center flex-column'>
                            <ButtonTag
                                classes={
                                    'd-flex justify-content-center align-items-center btn-dashed-border bg-lite-white w-100 h-260 h-lg-195 me-2 mb-3'
                                }
                                value={
                                    <>
                                        <FiUploadCloud
                                            className={'Fi-UploadCloud'}
                                            color={'#427CC3'}
                                        />
                                        <PTag
                                            classes={'text-navy-blue bold ms-2'}
                                            texts={'Upload CSV'}
                                        />
                                    </>
                                }
                            // onClick={() => setOpen(true)}
                            />
                            <div className='w-100 px-4'>
                                <ButtonTag
                                    classes={'btn-dark-blue rounded bold w-100'}
                                    value={'Add'}
                                    onClick={() => setShow(true)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName='modal-dialog-scrollable max-w-400'
            >
                <div
                    className='text-white fs-4 bg-navy-blue w50 h50 d-flex justify-content-center align-items-center rounded-circle pointer close-icon'
                    onClick={() => setShow(false)}
                >
                    <MdClose fontSize={30} className={'Md-Close'} />
                </div>
                <Modal.Body>
                    <div className='d-flex mb-3'>
                        <PTag classes={'text-dark-blue fw-bold'} texts={'Add Inventory'} />
                    </div>
                    <div className='box-shadow mb-2'>
                        <Link
                            to='/dashboard/added-inventories/add-inventory'
                            className='btn btn-orange bold fn-12 w-100'
                            state={{ ...category, isEdit: false }}
                        >
                            Add Inventory
                        </Link>
                    </div>
                    <div className='box-shadow'>
                        <ButtonTag
                            classes={'btn-orange bold fn-12 w-100'}
                            value={'Create Packages'}
                            onClick={() => {
                                navigate('/dashboard/added-inventories/add-pakcage', {
                                    state: category,
                                })
                            }}
                        />
                    </div>
                </Modal.Body>
            </Modal>
            {/* <BottomSheetDialog show={show} setShow={setShow} state={category}/> */}
            <UploadCSV show={open} setOpen={setOpen} />
        </>
    )
}

export default IsLoadingHOC(AddedInventories)
