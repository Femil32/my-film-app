import React from 'react'
import { Star } from '../AllSvgs'
import { ImgTag, PTag } from '../designComponents/MicroComponents'
//icons
import { AiFillHeart } from 'react-icons/ai'

const ReviewsCard = ({ UserImg, UserName, ReviewsTime, Reviewsdiscretion, Image, likeNumber }) => {
    return (
        <>
            <div className='rounded-16 border p-3 mb-3'>
                <div className='d-flex mb-3'>
                    <div className='max-w-65 h-65 me-3'>
                        <ImgTag src={UserImg} classes={'img-fluid w-100 object-fit-cover'} />
                    </div>
                    <div>
                        <div className='mb-1'>
                            <Star width={15} className={'me-2'} />
                            <Star width={15} className={'me-2'} />
                            <Star width={15} className={'me-2'} />
                            <Star width={15} className={'me-2'} fill={'#DEE4EB'} />
                            <Star width={15} className={'me-2'} fill={'#DEE4EB'} />
                        </div>
                        <PTag classes={'text-dark-blue fw-bold fn-18 mb-1'} texts={UserName} />
                        <PTag classes={'text-dark-blue mt-0'} texts={ReviewsTime} />
                    </div>
                </div>
                <div className='mb-3'>
                    <PTag classes={'text-dark-gray mb-3'} texts={Reviewsdiscretion} />
                    <div className='h-180 rounded-10 overflow-hidden'>
                        <ImgTag src={Image} classes={'img-fluid h-100 w-100 object-fit-cover'} />
                    </div>
                </div>
                <div className='d-flex align-items-center'>
                    <AiFillHeart className={'Ai-Fill-Heart me-1'} />
                    <PTag classes={'text-dark-gray'} texts={likeNumber} />
                </div>
            </div>
        </>
    )
}

export default ReviewsCard
