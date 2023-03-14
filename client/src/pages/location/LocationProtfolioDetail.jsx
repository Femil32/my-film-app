import React, { useContext, useEffect, useState } from 'react'
import LocationContext from './LocationContext'
import Swal from 'sweetalert2'
import {
    ATag,
    ButtonTag,
    ImgTag,
    InputTag,
    LabelTag,
    PTag,
} from '../../components/designComponents/MicroComponents'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { SUPPORTED_FORMATS, URL_REGEX } from '../../utils/constants'

// Higher Order Loader
import IsLoadingHOC from '../../components/higherOrderLoader/IsLoadingHOC'

//icons
import { Dash, Edit, Info } from '../../components/AllSvgs'
import { MdDelete } from 'react-icons/md'
import { FiPlus } from 'react-icons/fi'

// Import Swiper React components
import { Pagination, Navigation, Autoplay, Lazy } from 'swiper'

// PhotoSwipeLightbox
import PhotoSwipeLightbox from 'photoswipe/lightbox'
import 'photoswipe/style.css'

// Import Swiper
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// Mini Loader
import MiniLoader from '../../components/customLoader/MiniLoader'
import {
    delLocationPortfolio,
    getLocationPortfolioLinks,
    getLocationPortfolioPhotos,
    locationPortfolioLinks,
    postLocationPortfolio,
    setLocation,
} from '../../store/location/slice'
import { commonMsg } from '../../components/common/ValidationConstants'

const LocationProtfolioDetaila = ({ setLoading, data }) => {
    // hooks
    const { next } = useContext(LocationContext)
    const dispatch = useDispatch()
    const locationProfile = useSelector(state => state.location)

    // All useStates
    const [isLoading, setIsLoading] = useState(false)
    const [portfolioLinks, setPortfolioLinks] = useState({})
    const [allProfilesPhotos, setAllProfilesPhotos] = useState([])

    const [isAudioEdit, setIsAudioEdit] = useState(false)
    const [isVideoEdit, setIsVideoEdit] = useState(false)

    const [audio, setAudio] = useState('')
    const [video, setVideo] = useState('')

    const [audioArray, setAudioArray] = useState([])
    const [videoArray, setVideoArray] = useState([])

    const [editAudioIndex, setEditAudioIndex] = useState(null)
    const [editVideoIndex, setEditVideoIndex] = useState(null)

    const [totalPages, setTotalPages] = useState(1)

    const [isNext, setIsNext] = useState(false)

    // UseEffects
    useEffect(() => {
        Promise.all([
            setLoading(true),
            dispatch(getLocationPortfolioPhotos(data?.profile?.profileId)),
            dispatch(getLocationPortfolioLinks(data?.profile?.profileId)),
        ]).finally(() => {
            setLoading(false)
        })
    }, [])

    useEffect(() => {
        if (locationProfile.status === 'succeed') {
            if (locationProfile.type === 'PORTFOLIO_LINK_API') {
                dispatch(setLocation())
                toast.success(commonMsg.linksUpdated)
                next()
            }
            if (locationProfile.type === 'PORTFOLIO_API') {
                dispatch(setLocation())
                setIsLoading(true)
                Promise.all([
                    setIsLoading(true),
                    isNext && dispatch(locationPortfolioLinks(portfolioLinks)),
                    dispatch(getLocationPortfolioPhotos(data?.profile?.profileId)),
                ]).finally(() => {
                    setIsLoading(false)
                })
                toast.success(commonMsg.photosUploaded)
            }
            if (locationProfile.type === 'DEL_LOCATION_PORTFOLIO_ID') {
                dispatch(setLocation())
                toast.success(commonMsg.photosDeleted)
            }
            if (locationProfile.type === 'GET_LINKS') {
                dispatch(setLocation())
                setAudioArray(locationProfile?.location_portfolio_links?.audioLinks)
                setVideoArray(locationProfile?.location_portfolio_links?.videoLinks)
            }
            if (locationProfile.type === 'GET_PORTFOLIO_PHOTOS') {
                dispatch(setLocation())
                let data = locationProfile?.portfolioPhotos?.portfolioImages.map(x => {
                    return {
                        ...x,
                        type: 'online',
                    }
                })
                setAllProfilesPhotos(data)
                setTotalPages(locationProfile?.portfolioPhotos?.totalPages)
            }
        }
    }, [locationProfile])

    useEffect(() => {
        const lightbox = new PhotoSwipeLightbox({
            gallery: '#location-profile-photos',
            children: 'a',
            showHideAnimationType: 'fade',
            bgOpacity: 0.8,
            spacing: 0.5,
            wheelToZoom: true,
            loop: true,
            padding: { top: 20, bottom: 20, left: 100, right: 100 },
            escKey: true,
            arrowKeys: true,
            pswpModule: () => import('photoswipe'),
        })
        lightbox.init()
    }, [allProfilesPhotos])

    // functions
    const handleFileChange = files => {
        let allPhotos = [...files]
        const addData = allPhotos.map((photo, index) => {
            return {
                url: URL.createObjectURL(photo),
                file: photo,
            }
        })
        setAllProfilesPhotos(data => [...data, ...addData])

        let formData = new FormData()
        addData.map(data => {
            formData.append('files', data.file)
        })

        const tempdata = {
            id: data?.profile?.profileId,
            formData: formData,
        }

        Promise.all([setIsLoading(true), dispatch(postLocationPortfolio(tempdata))]).then(() => {
            setIsLoading(false)
        })
    }

    const handleChange = (isAudio, isEdit, index) => {
        if (isAudio) {
            if (isEdit) {
                if (URL_REGEX.test(audio)) {
                    let temp = [...audioArray]
                    temp[index] = audio
                    setAudioArray(data => [...temp])
                    setIsAudioEdit(false)
                    setAudio('')
                } else {
                    toast.error(commonMsg.validDetails)
                }
            } else {
                if (!audioArray.includes(audio)) {
                    if (URL_REGEX.test(audio)) {
                        setAudioArray(data => [...data, audio])
                        setAudio('')
                    } else if (!audioArray.length < 1) {
                        toast.error(commonMsg.onlyOneURL)
                    } else {
                        toast.error(commonMsg.validDetails)
                    }
                } else {
                    toast.error(commonMsg.duplicateValues)
                }
            }
        } else {
            if (isEdit) {
                if (URL_REGEX.test(video)) {
                    let temp = [...videoArray]
                    temp[index] = video
                    setVideoArray(data => [...temp])
                    setIsVideoEdit(false)
                    setVideo('')
                } else {
                    toast.error(commonMsg.validDetails)
                }
            } else {
                if (!videoArray.includes(video)) {
                    if (URL_REGEX.test(video)) {
                        setVideoArray(data => [...data, video])
                        setVideo('')
                    } else if (!videoArray.length < 1) {
                        toast.error(commonMsg.onlyOneURL)
                    } else {
                        toast.error(commonMsg.validDetails)
                    }
                } else {
                    toast.error(commonMsg.duplicateValues)
                }
            }
        }
    }

    const handleImageRemove = index => {
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
                // setIsLoading(true)
                Promise.all([
                    dispatch(
                        delLocationPortfolio({ locationProfileId: data?.profile?.profileId, index })
                    ),
                ]).finally(() => {
                    dispatch(getLocationPortfolioPhotos(data?.profile?.profileId))
                    let temp = allProfilesPhotos.filter(x => x.imageId !== index)
                    setAllProfilesPhotos(temp)
                    // setIsLoading(false)
                })
            }
        })
    }

    const handleRemove = (index, isAudio) => {
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
                if (isAudio) {
                    let temp = audioArray.filter(data => audioArray.indexOf(data) !== index)
                    setAudioArray(temp)
                } else {
                    let temp = videoArray.filter(data => videoArray.indexOf(data) !== index)
                    setVideoArray(temp)
                }
            }
        })
    }

    const onSubmitForm = () => {
        // links
        var payloadLinks = {
            id: data?.profile?.profileId,
            links: {
                videoLinks: videoArray,
                audioLinks: audioArray,
            },
        }
        setPortfolioLinks(payloadLinks)
        dispatch(locationPortfolioLinks(payloadLinks))
    }

    // rendering
    return (
        <>
            <div className='row max-w-625 mx-auto g-0'>
                <PTag classes={'text-dark-blue fw-bold fn-16 mb-3'} texts={'Portfolio Details'} />
                <PTag
                    classes={'text-dark-blue fw-bold mb-2'}
                    texts={'Upload any photos, videos or audio'}
                />
                <div className='d-flex align-items-center mb-3'>
                    <Info width={'24'} />
                    <PTag classes={'text-red ms-2'} texts={'You can choose Multiple images'} />
                </div>

                <form
                    onSubmit={e => {
                        e.preventDefault()
                        setIsNext(false)
                        onSubmitForm()
                    }}
                    className='d-flex flex-column justify-content-between h-100'
                >
                    <div className='location-swiper'>
                        {/* Swiper Initialize */}
                        {allProfilesPhotos.length > 0 ? (
                            <Swiper
                                style={{
                                    '--swiper-navigation-color': '#121212',
                                    '--swiper-pagination-color': '#121212',
                                    userSelect: 'none',
                                }}
                                lazy={true}
                                pagination={{
                                    type: 'fraction',
                                }}
                                navigation={true}
                                modules={[Lazy, Pagination, Navigation]}
                                className='mySwiper'
                                id='location-profile-photos'
                                slidesPerView={3}
                                slidespercolumn={2}
                                slidesperrow={2}
                                slidespergroup={4}
                                slidespercolumnfill='row'
                                spaceBetween={25}
                            >
                                <SwiperSlide className={'bg-lite-gray'}>
                                    <div className='w50 h50 rounded-circle d-flex justify-content-center align-items-center bg-white shadow-sm'>
                                        <InputTag
                                            className={'uplode-input h-100'}
                                            type={'file'}
                                            name={'fileSelect'}
                                            accept={SUPPORTED_FORMATS}
                                            onChange={event => {
                                                handleFileChange(event.target.files)
                                            }}
                                            multiple='multiple'
                                        />
                                        <div className='plus-box d-flex align-items-center justify-content-center'>
                                            <FiPlus fontSize={30} className={'Fi-Plus pointer'} />
                                        </div>
                                    </div>
                                </SwiperSlide>
                                {allProfilesPhotos.length > 0 &&
                                    allProfilesPhotos.map((element, index) => (
                                        <SwiperSlide
                                            key={index}
                                            className='border rounded-10 overflow-hidden relative'
                                        >
                                            {isLoading ? (
                                                <MiniLoader className={'w-100 h-100'} />
                                            ) : (
                                                <a
                                                    href={element.imageUrl}
                                                    data-pswp-width={element.width}
                                                    data-pswp-height={element.height}
                                                    target='_blank'
                                                    className='w-100 h-100 swiper-lazy'
                                                >
                                                    <ImgTag
                                                        src={element.imageUrl}
                                                        alt={'profile'}
                                                        classes={'object-fit-contain mw-100 mh-100'}
                                                        itemProp='thumbnail'
                                                    />
                                                </a>
                                            )}
                                            <button
                                                className='w-30 h-30 overflow-hidden rounded-circle d-flex justify-content-center align-items-center bg-white shadow-sm position-absolute top-10 end-10'
                                                onClick={event => {
                                                    event.stopPropagation()
                                                    event.preventDefault()
                                                    handleImageRemove(element.imageId)
                                                }}
                                            >
                                                <Dash />
                                            </button>
                                        </SwiperSlide>
                                    ))}
                            </Swiper>
                        ) : (
                            <div
                                className={`${allProfilesPhotos.length == 1 || allProfilesPhotos.length == 3
                                    ? 'col-6'
                                    : 'col-12'
                                    } mb-3`}
                            >
                                <div className='box w-100 position-relative bg-lite-gray d-flex justify-content-center align-items-center'>
                                    <div className='w50 h50 rounded-circle d-flex justify-content-center align-items-center bg-white shadow-sm'>
                                        <InputTag
                                            className={'uplode-input h-100'}
                                            type={'file'}
                                            name={'fileSelect'}
                                            accept={SUPPORTED_FORMATS}
                                            onChange={event => {
                                                handleFileChange(event.target.files)
                                            }}
                                            multiple='multiple'
                                        />
                                        <div className='plus-box d-flex align-items-center justify-content-center'>
                                            <FiPlus fontSize={30} className={'Fi-Plus pointer'} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Audio Tag */}
                    <div className='form-control d-flex p-2 ps-3 pe-2 mb-3'>
                        <InputTag
                            name={'AddAudio'}
                            classes={'text-dark bold w-100 me-2'}
                            onChange={e => {
                                setAudio(e.target.value)
                            }}
                            placeholder={'Add Audios'}
                            value={audio}
                        />
                        <ATag
                            classes={'btn btn-dark-gray bold'}
                            onClick={() => {
                                isAudioEdit
                                    ? handleChange(true, true, editAudioIndex)
                                    : handleChange(true, false, -1)
                            }}
                            children={<PTag texts={isAudioEdit ? 'Edit' : 'Add'} />}
                        />
                    </div>
                    {audioArray.map((item, index) => (
                        <div className='d-flex justify-content-between mb-3' key={index}>
                            <LabelTag text={item} />
                            <div className='d-flex'>
                                <div className='me-3'>
                                    <Edit
                                        width={24}
                                        className={'pointer'}
                                        onClick={() => {
                                            setIsAudioEdit(true)
                                            setAudio(item)
                                            setEditAudioIndex(index)
                                            // handleChange(true, true, index)
                                        }}
                                    />
                                </div>
                                <div>
                                    <MdDelete
                                        className={'Md-Delete pointer'}
                                        width={'24'}
                                        onClick={() => handleRemove(index, true)}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Video Tag */}
                    <div className='form-control d-flex p-2 ps-3 pe-2 mb-3'>
                        <InputTag
                            name={'AddVideo'}
                            classes={'text-dark bold w-100 me-2'}
                            onChange={e => {
                                setVideo(e.target.value)
                            }}
                            value={video}
                            placeholder={'Add Videos'}
                        />
                        <ATag
                            classes={'btn btn-dark-gray bold'}
                            onClick={() => {
                                isVideoEdit
                                    ? handleChange(false, true, editVideoIndex)
                                    : handleChange(false, false, -1)
                            }}
                            children={<PTag texts={isVideoEdit ? 'Edit' : 'Add'} />}
                        />
                    </div>
                    {videoArray.map((item, index) => (
                        <div className='d-flex justify-content-between mb-3' key={index}>
                            <LabelTag text={item} />
                            <div className='d-flex'>
                                <div className='me-3'>
                                    <Edit
                                        width={24}
                                        className={'pointer'}
                                        onClick={() => {
                                            setIsVideoEdit(true)
                                            setVideo(item)
                                            setEditVideoIndex(index)
                                            // handleChange(false, true, index)
                                        }}
                                    />
                                </div>
                                <div>
                                    <MdDelete
                                        className={'Md-Delete pointer'}
                                        width={24}
                                        onClick={() => handleRemove(index, false)}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Submit Button */}
                    <div className='col-3 mx-auto mb-3'>
                        <ButtonTag classes={'btn-orange w-100'} value={'Next'} type='submit' />
                    </div>
                </form>
            </div>
        </>
    )
}

export default IsLoadingHOC(LocationProtfolioDetaila)
