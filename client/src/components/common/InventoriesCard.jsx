import { ImgTag, PTag } from '../designComponents/MicroComponents'
import { Edit } from '../AllSvgs'
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getCategoryAndSubCategoryByLink } from '../../store/masterdata/slice'
import { deleteInventory } from '../../store/service/slice'
import { ProgressBar } from 'react-bootstrap'
import MiniLoader from '../customLoader/MiniLoader'
import { toast } from 'react-toastify'
//icons
import { MdDelete } from 'react-icons/md'
import { commonMsg } from './ValidationConstants'

const InventoriesCard = ({
    image,
    titleText,
    typeText,
    priceText,
    cardData,
    percentageCompletion,
}) => {
    const { state } = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [category, setCategory] = useState({})

    const masterData = useSelector(state => state.masterdata)

    const [isLoading, setIsLoading] = useState(false)

    const DeleteAlert = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You want to delete this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then(result => {
            if (result.isConfirmed) {
                setIsLoading(true)
                Promise.all([
                    dispatch(
                        deleteInventory({
                            serviceProfileId: cardData?.profile?.profileId,
                            inventoryId: cardData?.data?.serviceInventoryId,
                        })
                    ),
                ]).finally(() => {
                    toast.success(commonMsg.inventoryDeleted)
                    setIsLoading(false)
                })
            }
        })
    }

    useEffect(() => {
        if (masterData.status === "succeed" && masterData.type === 'CATEGORY_AND_SUBCATEGORY_BY_PRAMILINK_API') {
            setCategory({ ...state, categoryData: masterData.categoryAndSubCategory })
        }
    }, [masterData])

    return (
        <>
            {isLoading ? (
                <MiniLoader className={'w-100 h-100'} />
            ) : (
                <div className='d-flex h-100 flex-column'>
                    <div className='d-flex max-w-310'>
                        <div className='box-img me-3'>
                            <ImgTag
                                src={image}
                                alt={'camera'}
                                classes={'img-fluid w-100 border rounded-10'}
                            />
                        </div>
                        <div className='w-100'>
                            <div
                                className='pointer'
                                onClick={() => {
                                    navigate('/dashboard/added-inventories/detailscrew', {
                                        state: cardData,
                                    })
                                }}
                            >
                                <PTag classes={'text-dark-blue fn-16 fw-bold'} texts={titleText} />
                                <PTag classes={'text-dark-gray mb-2 mt-0'} texts={typeText} />
                                <PTag
                                    classes={'text-dark-blue fn-16 fw-bold mb-3'}
                                    texts={`₹ ${priceText}/hr`}
                                />
                            </div>

                            <div className='d-flex align-items-center'>
                                <div
                                    className='d-flex align-items-center me-2'
                                    onClick={DeleteAlert}
                                >
                                    <MdDelete className={'Md-Delete'} />
                                    <PTag classes={'text-dark-gray'} texts={'Remove'} />
                                </div>
                                <Link
                                    to='/dashboard/added-inventories/add-inventory'
                                    state={{ ...category, ...cardData, isEdit: true }}
                                >
                                    <div className='d-flex align-items-center'>
                                        <Edit width={'24'} />
                                        <PTag classes={'text-dark-gray'} texts={'Edit'} />
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className='d-flex align-items-center justify-content-between max-w-310 mt-auto'>
                        <div className='w-100  border rounded' style={{ height: '7px' }}>
                            <ProgressBar
                                style={{ height: '7px' }}
                                variant={'primary'}
                                now={percentageCompletion}
                            />
                        </div>
                        <PTag
                            classes={'px-2 fw-bold text-danger'}
                            texts={`${percentageCompletion}%`}
                        />
                    </div>
                </div>
            )}
        </>
    )
}

export default InventoriesCard
