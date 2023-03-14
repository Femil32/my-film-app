import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
    ProfilePictureSeven,
    ProfilePictureSix,
    ProfilePictureThree,
    ProfilePictureTwo,
} from '../../assets/img'
import {
    BackButton,
    InputTag,
    PTag,
} from '../../components/designComponents/MicroComponents'
import RequestFromPrevious from './RequestFromPrevious'
// icons
import { FiSearch } from 'react-icons/fi'

const RequestReview = () => {
    const navigate = useNavigate()
    const requestFromPrevious = [
        {
            ProfilePictureThree: ProfilePictureThree,
            ProfileName: 'Mary Reynolds',
            BtnValue: 'Request',
        },
        {
            ProfilePictureThree: ProfilePictureSeven,
            ProfileName: 'Sara Reynolds',
            BtnValue: 'Request',
        },
        {
            ProfilePictureThree: ProfilePictureTwo,
            ProfileName: 'Chad Stewart',
            BtnValue: 'Request',
        },
        {
            ProfilePictureThree: ProfilePictureSix,
            ProfileName: 'Richard Riley',
            BtnValue: 'Request',
        },
        {
            ProfilePictureThree: ProfilePictureSeven,
            ProfileName: 'Emma Pierce',
            BtnValue: 'Request',
        },
    ]

    return (
        <><div className="mb-4">
            <BackButton textClass={'fn-20'} title={'Request Review'}
                onClick={() => {
                    navigate('/dashboard')
                }} />
        </div>
            <div className='container'>
                <div>
                    <div className='row g-0 mb-sm-4 mb-3'>
                        <div className='p-3 mx-auto shadow-sm rounded'>
                            <div className='d-flex justify-content-between align-items-center px-sm-4'>
                                <InputTag
                                    type={'text'}
                                    placeholder={'Search'}
                                    classes={'w-100 fn-16 fn-xs-14'}
                                />
                                <FiSearch className='fi-search' />
                            </div>
                        </div>
                    </div>
                    <PTag
                        classes={'text-dark-gray bold mb-3'}
                        texts={'Request from previous clients'}
                    />

                    {requestFromPrevious.map((data, index) => (
                        <div className='mb-3' key={index}>
                            <RequestFromPrevious
                                ProfilePicture={data.ProfilePictureThree}
                                ProfileName={data.ProfileName}
                                BtnValue={data.BtnValue}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default RequestReview
