import ImageSlider from './ImageSlider'
import {
    PTag,
    ULTag,
    LITag,
    ImgTag,
    ButtonTag,
} from '../../components/designComponents/MicroComponents'
import { Link } from 'react-router-dom'
import { Star } from '../AllSvgs'
import { Col, Row } from 'react-bootstrap'
//icons
import { FiArrowRight } from 'react-icons/fi'
import { MdLocationOn } from 'react-icons/md'

const Card = ({
    gallery,
    PackageName,
    UserName,
    Category,
    review,
    BasePrice,
    location,
    ProfileImg,
    Services,
}) => {
    return (
        <div className='card product-card rounded-16 p-3 mb-3'>
            {/* Card Image Container */}
            <ImageSlider images={gallery} />
            {/* Card Body */}
            <div className='card-body p-0'>
                <div className='d-flex justify-content-between align-items-start mb-3'>
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
                <div className='d-flex justify-content-between align-items-end mb-3'>
                    <div>
                        <PTag texts='Base Price' classes='text-dark-gray' />
                        <PTag texts={BasePrice} classes='text-dark-blue fn-17 fw-bold' />
                    </div>
                    <div className='d-flex align-items-center'>
                        <MdLocationOn fontSize={25} fill={'rgb(135 146 160)'} />
                        <PTag texts={location} classes='text-gray' />
                    </div>
                </div>
                <Row className='g-2 mb-3'>
                    <Col xs={6}>
                        <ButtonTag
                            value='Check Availability'
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
                <div>
                    <PTag texts='Package Name' classes='text-dark-blue fn-17 fw-bold mb-2' />
                    <ULTag>
                        {PackageName?.map((data, index) => (
                            <LITag key={index}>
                                <div className='d-flex align-items-center'>
                                    <span className='text-gray fs-1 line-height-1 me-2'>
                                        &bull;
                                    </span>
                                    <PTag texts={data} classes='text-dark-blue' />
                                </div>
                            </LITag>
                        ))}
                    </ULTag>
                    <div className='border-bottom border-top py-2 d-flex align-items-center justify-content-between mb-3'>
                        <div className='d-flex align-items-center'>
                            <div className='w-40 h-40 rounded-circle overflow-hidden'>
                                <ImgTag src={ProfileImg} alt='profile' classes='img-fluid w-100' />
                            </div>
                            <PTag texts={Services} classes='text-dark-blue ms-2' />
                        </div>
                        <Link to='#' className='d-flex align-items-center pointer'>
                            <PTag texts='View profile' classes='text-navy-blue bold me-2' />
                            <FiArrowRight className={'Fi-Arrow-Right'} />
                        </Link>
                    </div>
                    {/* Card Button */}
                    <div>
                        <ButtonTag
                            value='Book Now'
                            classes='btn btn-orange semibold rounded fn-12 w-100'
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card
