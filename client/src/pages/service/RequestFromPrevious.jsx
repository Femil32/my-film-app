import React from 'react'
import { ButtonTag, ImgTag, PTag } from '../../components/designComponents/MicroComponents'

const RequestFromPrevious = ({ ProfilePicture, ProfileName, BtnValue }) => {
    return (
        <>
            <div className='d-flex justify-content-between align-items-center'>
                <div className='d-flex align-items-center'>
                    <div className='w-70 h-70 rounded-circle overflow-hidden me-3'>
                        <ImgTag
                            src={ProfilePicture}
                            classes={'w-100 h-100 object-fit-cover img-fluid'}
                        />
                    </div>
                    <PTag classes={'text-dark-blue fn-18 fw-bold'} texts={ProfileName} />
                </div>
                <ButtonTag classes={'btn-dark-blue rounded px-sm-4'} value={BtnValue} />
            </div>
        </>
    )
}

export default RequestFromPrevious
