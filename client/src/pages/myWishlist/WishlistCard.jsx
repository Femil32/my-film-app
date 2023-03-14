import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { Star } from '../../components/AllSvgs'
import ImageSlider from '../../components/common/ImageSlider'
import { ButtonTag, PTag } from '../../components/designComponents/MicroComponents'
//icons
import { AiFillHeart } from 'react-icons/ai'
import { MdLocationOn } from 'react-icons/md'

const WishlistCard = ({ gallery, produt, subCategory, reviews, location, price }) => {
    return (
        <>
            <Card className={'product-card rounded-16 p-3 mb-3'}>
                {/* Card Image Container */}
                <div className='position-relative rounded-10 max-h-300 overflow-hidden product-img'>
                    {/* Image Slider */}
                    <div className='remove-position'>
                        <ImageSlider images={gallery} />
                    </div>
                    {/* Heart Icon */}
                    <div className='like-box Ai-Fill-Heart-parent d-flex justify-content-center align-items-center pointer'>
                        <AiFillHeart className={'Ai-Fill-Heart'} />
                    </div>
                </div>
                {/* Card Body */}
                <Card.Body className='p-0'>
                    <div className='d-flex justify-content-between align-items-start my-3'>
                        <div>
                            <PTag texts={produt} classes='text-dark-blue fn-17 fw-bold' />
                            <PTag texts={subCategory} classes='text-dark-blue mt-1' />
                        </div>

                        <div className='bg-extra-lite-skyblue d-flex align-items-center rounded-2 px-2'>
                            <div className='w-12 me-1'>
                                <Star />
                            </div>
                            <PTag texts={reviews} classes='text-dark-gray fn-12' />
                        </div>
                    </div>
                    <div className='d-flex align-items-center mb-3'>
                        <MdLocationOn fontSize={25} fill={'rgb(135 146 160)'} className={'me-1'} />
                        <PTag texts={location} classes='text-gray' />
                    </div>
                    <div className='d-flex align-items-center border-bottom border-top py-2 mb-3'>
                        <PTag classes={'text-gray fw-bold fn-18 me-2'} texts={'Base Price -'} />
                        <PTag classes={'text-dark-blue fw-bold fn-20 mt-0'} texts={price} />
                    </div>
                    <Row className='g-2'>
                        <Col xs={6}>
                            <ButtonTag
                                value='Call For Audition'
                                classes='btn btn-extra-lite-green semibold fn-12 rounded white-space-nowrap w-100'
                            />
                        </Col>
                        <Col xs={6}>
                            <ButtonTag
                                value='Book Directly'
                                classes='btn btn-orange semibold fn-12 rounded white-space-nowrap w-100'
                            />
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </>
    )
}

export default WishlistCard
