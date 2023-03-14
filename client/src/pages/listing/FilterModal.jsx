import React, { memo, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { ButtonTag, PTag } from '../../components/designComponents/MicroComponents'
//icons
import { MdClose } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { postFilterSearch, postSearch } from '../../store/search/slice'
import { toast } from 'react-toastify'
import { useSearchContext } from '../../hooks/useSearchContext'

const FilterModal = ({ show, setShow, filterData, ...res }) => {

    const { isMiniLoading, setIsMiniLoading } = res
    const { currentTab, dispatchSearch } = useSearchContext()
    const dispatch = useDispatch()


    const [activetab, setActivetab] = useState(1)
    const [subActiveTab, setSubActiveTab] = useState({
        genderFilter: null,
        rateFilter: null,
        profileType: null,
    })
    const [selectedFilters, setSelectedFilters] = useState({})

    const fetchSearchData = async (batchSize = 20, withImage = true) => {

        if (!selectedFilters.profileType) {
            toast.error('Please select sub category.')
        }
        let params = {
            "fromRecord": 0,
            "batchSize": batchSize,
            "withImage": withImage,
            ...selectedFilters
        }

        let filterProfile = []

        await Promise.all([dispatch(postFilterSearch(params))]).then(res => {
            filterProfile = res[0].payload.data.profiles
        })

        switch (currentTab?.name) {
            case 'crew':
                setIsMiniLoading({ ...isMiniLoading, crewLoading: true })
                dispatchSearch({
                    type: "CREW_DATA",
                    payload: filterProfile
                })
                setIsMiniLoading({ ...isMiniLoading, crewLoading: false })
                break;
            case 'locations':
                setIsMiniLoading({ ...isMiniLoading, locationsLoading: true })
                dispatchSearch({
                    type: "LOCATIONS_DATA",
                    payload: filterProfile
                })
                setIsMiniLoading({ ...isMiniLoading, locationsLoading: false })
                break;
            case 'services':
                setIsMiniLoading({ ...isMiniLoading, servicesLoading: true })
                dispatchSearch({
                    type: "SERVICES_DATA",
                    payload: filterProfile
                })
                setIsMiniLoading({ ...isMiniLoading, servicesLoading: false })
                break;
            case 'talent':
                setIsMiniLoading({ ...isMiniLoading, talentLoading: true })
                dispatchSearch({
                    type: "TALENT_DATA",
                    payload: filterProfile
                })
                setIsMiniLoading({ ...isMiniLoading, talentLoading: false })
                break;
            default:
                break;
        }
    }

    return (
        <>
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
                <Modal.Body className='p-0 '>
                    <div>
                        <div className='d-flex justify-content-between align-items-center px-4 py-3'>
                            <PTag classes={'text-dark-blue fw-bold'} texts={'Filter'} />
                            {/* <PTag classes={''} texts={''} /> */}
                            <button className='text-orange fw-bold pointer border-0 bg-transparent' onClick={() => {
                                setSubActiveTab({})
                                setSelectedFilters({})
                            }}>Clear All</button>
                        </div>
                        <div className='filterMenu d-flex border-top bg-lite-white'>
                            <div className='filterTag'>
                                {filterData?.map((data, i) => {
                                    return (
                                        <div key={i} className="border-bottom">
                                            <span
                                                className={`w-100 d-block py-2 px-3 pointer text-capitalize ${activetab === data.activeId && 'bg-navy-blue text-white'}`}
                                                onClick={e => setActivetab(data.activeId)}
                                            >{data.filterTag}</span>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className='filterType bg-lite-white border-start'>
                                {filterData?.map((data, i) => {
                                    return (activetab === data.activeId) &&
                                        data.filterTypes.map((type, index) => {
                                            return (
                                                (activetab === data.activeId) &&
                                                <div className='border-bottom' key={index} onClick={(e) => {
                                                    setSelectedFilters({
                                                        ...selectedFilters,
                                                        [type?.key]: type?.value
                                                    })
                                                    setSubActiveTab({
                                                        ...subActiveTab,
                                                        [type?.key]: index
                                                    })
                                                }}>
                                                    <span
                                                        className={`w-100 d-block py-2 px-3 border-end pointer text-capitalize ${subActiveTab[type?.key] == index && 'bg-navy-blue text-white'}`}
                                                    > {type.name}</span>
                                                </div>
                                            )
                                        })
                                })}
                            </div>
                        </div>
                        <div className='box-shadow px-3 pb-2 pb-3 pt-3'>
                            <ButtonTag
                                classes={'btn-orange bold fn-12 w-100'}
                                value={'Apply Filters'}
                                onClick={() => {
                                    fetchSearchData()
                                    setShow(false)
                                }}
                            />
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default memo(FilterModal)