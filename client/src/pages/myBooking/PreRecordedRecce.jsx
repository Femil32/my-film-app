import React from 'react'
import { useNavigate } from 'react-router-dom'
import { SuccessfulIcon } from '../../components/AllSvgs'
import { BackButton, ButtonTag, InputTag, LITag, PTag, ULTag } from '../../components/designComponents/MicroComponents'
//icons
import { FaPlay } from 'react-icons/fa'

export default function PreRecordedRecce() {

    const navigation = useNavigate()

    return (
        <>
            <div className='container'>
                <div className=''>
                    <BackButton
                        title={'Pre - Recorded Recce'}
                        onClick={() => {
                            navigation('/dashboard')
                        }}
                    />
                </div>
                <div className="row max-w-625 mx-auto">
                    <div className="d-flex justify-content-center my-3">
                        <SuccessfulIcon />
                    </div>
                    <div className="text-center">
                        <PTag classes={'text-dark-blue fw-bold fn-22'} texts={'Payment Successful'} />
                        <PTag classes={''} texts={'Thank You for booking Recce'} />
                    </div>
                    <div className="d-flex justify-content-center my-3">
                        <ButtonTag classes={'btn-orange'} value={'Continue'} />
                    </div>
                </div>
                <div className="row max-w-400 mx-auto mb-5">
                    <div className='d-flex align-items-center justify-content-center'>
                        <ULTag>
                            <LITag classes={'d-flex align-items-center'}>
                                <span className='text-gray fn-24 me-2'>
                                    &bull;
                                </span>
                                <PTag classes={''} texts={`Here's the link below of your pre-recorded recce`} />
                            </LITag>
                        </ULTag>
                    </div>
                    <div className='max-w-370 mx-auto d-flex justify-content-between align-items-center position-relative'>
                        <InputTag classes={'form-control input-plachholder-paddingright'}
                            placeholder={'Witch Video'}
                        />
                        <div className="bg-info rounded-circle w-30 h-30 d-flex justify-content-center align-items-center input-add-icon-right me-3">
                            <FaPlay fontSize={15} color={'#fff'} className={'ms-1'} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
