import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Star } from '../AllSvgs'
import { ButtonTag, ImgTag, PTag } from '../designComponents/MicroComponents'
import ImageSlider from './ImageSlider'
//icons
import { MdLocationOn } from 'react-icons/md'

const ProductCard = ({
    gallery,
    UserName,
    Category,
    review,
    del,
    BasePrice,
    location,
    ProfileImg,
    Services,
}) => {
    return (
        <>
            <Card className='product-card rounded-16 p-3 mb-3'>
                {/* Card Image Container */}
                <ImageSlider images={gallery} />
                {/* Card Body */}
                <div className='card-body p-0'>
                    <div className='d-flex justify-content-between align-items-start border-bottom pb-2 mb-2'>
                        <div>
                            <PTag texts={UserName} classes='text-dark-blue fn-17 fw-bold' />
                            <PTag texts={Category} classes='text-dark-blue' />
                        </div>
                        <div className='bg-extra-lite-skyblue d-flex align-items-center rounded-2 px-2'>
                            <div>
                                <Star width={12} className='me-1' />
                            </div>
                            <PTag texts={review} classes='text-dark-gray fn-12' />
                        </div>
                    </div>
                    <div className='d-flex align-items-center justify-content-between mb-3'>
                        <div className='d-flex align-items-center'>
                            <div className='w-40 h-40 rounded-circle overflow-hidden'>
                                <ImgTag src={ProfileImg} alt='profile' classes='img-fluid w-100' />
                            </div>
                            <PTag texts={Services} classes='text-dark-blue ms-2' />
                        </div>
                    </div>
                    <div className='d-flex justify-content-between align-items-end border-bottom pb-3 mb-3'>
                        <div>
                            <PTag texts='Base Price' classes='text-dark-gray' />
                            <PTag
                                texts={
                                    <>
                                        <del className='text-gray fn-14 me-2'>{del}</del>
                                        {BasePrice}
                                    </>
                                }
                                classes='text-dark-blue fn-17 fw-bold'
                            />
                        </div>
                        <div className='d-flex align-items-center'>
                            <MdLocationOn fontSize={25} fill={'rgb(135 146 160)'} />
                            <PTag texts={location} classes='text-gray' />
                        </div>
                    </div>
                    <div>
                        {/* Card Button */}
                        <Row className='g-2'>
                            <Col xs={6}>
                                <ButtonTag
                                    value='Book A Recce'
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
                    </div>
                </div>
            </Card>
        </>
    )
}

export default ProductCard