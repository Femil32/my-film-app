import {
    BackButton,
    ImgTag,
    PTag,
    SocialIcon,
} from '../../components/designComponents/MicroComponents'
import { useNavigate } from 'react-router-dom'
// import { Location } from '../../components/AllSvgs'
import { ButtonTag } from './../../components/designComponents/MicroComponents'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getUserInfo } from '../../store/auth/slice'
import ProfileImg from '../../assets/img/profile/profile.png'
import IsLoadingHOC from '../../components/higherOrderLoader/IsLoadingHOC'
//icons
import { MdLocationOn } from 'react-icons/md'

const MyProfile = ({ setLoading }) => {
    const nevigation = useNavigate()
    const auth = useSelector(state => state.auth)
    const socialdetail = useSelector(state => state.sdetail)

    const authState = useSelector(state => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        Promise.all([dispatch(getUserInfo())]).finally(() => {
            setLoading(false)
        })
    }, [])

    return (
        <div className='container'>
            <BackButton
                title={'My Profie'}
                onClick={() => {
                    nevigation('/dashboard')
                }}
            />
            <div className='row my-3'>
                <div className='col-xl-4 col-sm-5 col-12 mb-sm-0 mb-3'>
                    <div className='rounded-10 border p-sm-3 p-2 pt-sm-4 h-100'>
                        <div className='text-center mb-sm-3 mb-2'>
                            <div className='rounded-10 overflow-hidden object-fit-cover max-w-180 max-h-180 mx-auto w-100 h-100 d-flex justify-content-center align-items-center'>
                                <ImgTag
                                    src={authState.userInfo?.profileImageUrl ?? ProfileImg}
                                    alt={'profile'}
                                    classes={'img-fluid w-100 h-100'}
                                />
                            </div>
                            <PTag
                                classes={'text-dark-blue fn-20 fn-xs-18 fw-bold mt-2'}
                                texts={authState.userInfo.firstName ?? 'User'}
                            />
                            <div className='d-flex align-items-center justify-content-center'>
                                <MdLocationOn fontSize={25} color={'rgb(135 146 160)'} />
                                <PTag
                                    classes={'text-gray'}
                                    texts={authState?.userInfo?.address?.cityName}
                                />
                            </div>
                        </div>
                        <div>
                            <div className='border-bottom max-w-310 mx-auto pb-3'>
                                <PTag
                                    classes={'text-gray text-center'}
                                    texts={authState.userInfo.description ?? 'lorem ispum'}
                                />
                            </div>
                            <div className='text-center pt-3'>
                                <PTag
                                    classes={'text-dark-gray fn-20 fn-xs-18 bold'}
                                    texts={'Profile Vists'}
                                />
                                <PTag
                                    classes={'text-orange bold fn-36 fn-xs-30 mt-0'}
                                    texts={'782'}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-xl-8 col-sm-7 col-12 px-3'>
                    <PTag classes={'text-dark-blue fw-bold mb-sm-3 mb-2'} texts={'Basic Details'} />
                    <div className='row mb-xl-0 mb-3'>
                        <div className='col-xl-6 col-12 mb-xl-4 mb-3'>
                            <label htmlFor='E-mail' className='text-dark-gray mb-2'>
                                E-mail
                            </label>
                            <div className='form-control d-flex align-middle plus-number-inputs'>
                                <PTag
                                    classes={'py-1'}
                                    texts={authState.userInfo.email ?? 'Text@gmail.com'}
                                />
                            </div>
                        </div>
                        <div className='col-xl-6 col-12 mb-xl-4 mb-3'>
                            <label htmlFor='Phone' className='text-dark-gray mb-2'>
                                Phone
                            </label>
                            <div className='form-control d-flex align-middle plus-number-inputs'>
                                <PTag
                                    classes={'py-1'}
                                    texts={authState.userInfo.mobile ?? '9999999999'}
                                />
                            </div>
                        </div>
                        <div className='col-xl-6 col-12 mb-xl-4'>
                            <label htmlFor='Languages' className='text-dark-gray mb-2'>
                                Languages Known
                            </label>
                            <div className='form-control d-flex align-middle plus-number-inputs'>
                                <PTag classes={'py-1'} texts={'Hindi, English'} />
                            </div>
                        </div>
                    </div>
                    <div>
                        <PTag
                            classes={'text-dark-blue fw-bold mb-sm-3 mb-2'}
                            texts={'Address Details'}
                        />
                        <div className='row'>
                            <div className='col-xl-6 col-12 mb-xl-4 mb-2'>
                                <label htmlFor='Country' className='text-dark-gray mb-2'>
                                    Country
                                </label>
                                <div className='form-control d-flex align-middle plus-number-inputs'>
                                    <PTag classes={'py-1'} texts={'India'} />
                                </div>
                            </div>
                            <div className='col-xl-6 col-12 mb-xl-4 mb-2'>
                                <label htmlFor='Address' className='text-dark-gray mb-2'>
                                    Address
                                </label>
                                <div className='form-control d-flex align-middle plus-number-inputs'>
                                    <PTag
                                        classes={'py-1'}
                                        texts={
                                            authState.userInfo.address?.address1 ??
                                            '350 A Wing, Nirman Bhawan, Delhi'
                                        }
                                    />
                                </div>
                            </div>
                            <div className='col-12 mb-xl-4 mb-2'>
                                <PTag
                                    classes={'text-dark-blue fw-bold'}
                                    texts={'Connected Social Profile'}
                                />
                                <div className='d-flex my-3 text-capitalize'>
                                    {auth.userInfo?.socialPlatforms?.map((data, index) => {
                                        return (
                                            <a
                                                href={`${data.url}`}
                                                className='me-3 capitalize d-flex justify-content-center align-items-center text-reset gap-2'
                                                target='_blank'
                                                rel='noreferrer noopener'
                                                key={index}
                                            >
                                                <img
                                                    src={data.socialPlatformUrl}
                                                    alt={data.name}
                                                    width='32'
                                                />
                                                <p>{data.name}</p>
                                            </a>
                                        )
                                    })}
                                </div>
                                <ButtonTag
                                    classes={'btn btn-dark-blue semibold fn-14 px-5'}
                                    value={'Edit Profile'}
                                    onClick={() => {
                                        nevigation('/dashboard/profiledetail')
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IsLoadingHOC(MyProfile)
