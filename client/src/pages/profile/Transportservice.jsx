import React from 'react'
import { Card, Col, Container, Nav, Row, Tab } from 'react-bootstrap'
import { ImageThree, ProfilePictureThree } from '../../assets/img'
import { Star } from '../../components/AllSvgs'
import {
    ATag,
    BackButton,
    ButtonTag,
    ImgTag,
    LITag,
    PTag,
    ULTag,
} from '../../components/designComponents/MicroComponents'
import ImageSlider from '../../components/common/ImageSlider'
//icons
import { FiPhone } from 'react-icons/fi'
import { AiOutlineShareAlt } from 'react-icons/ai'
import { MdLocationOn } from 'react-icons/md'

const Transportservice = () => {
    const camerasAndAccessories = [
        {
            gallery: [ImageThree, ImageThree, ImageThree, ImageThree],
            produtName: 'Nikon Camera',
            category: 'Sub Category',
            reviews: '4.5',
            del: '₹1,00,000',
            BasePrice: '₹1,00,000',
        },
        {
            gallery: [ImageThree, ImageThree, ImageThree, ImageThree],
            produtName: 'Nikon Camera',
            category: 'Sub Category',
            reviews: '4.5',
            del: '₹1,00,000',
            BasePrice: '₹1,00,000',
        },
        {
            gallery: [ImageThree, ImageThree, ImageThree, ImageThree],
            produtName: 'Nikon Camera',
            category: 'Sub Category',
            reviews: '4.5',
            del: '₹1,00,000',
            BasePrice: '₹1,00,000',
        },
    ]
    return (
        <>
            <Container>
                <BackButton title={'Profile'} />
                <CurrentDirectorylink
                    routeData={[
                        {
                            name: 'home',
                            link: '/'
                        },
                        {
                            name: 'search',
                            link: '/'
                        },
                        {
                            name: 'All Categories',
                            link: '/search/listing'
                        },
                        {
                            name: 'Profile',
                            link: '/search/listing'
                        },
                    ]}
                />
                <div className='d-flex align-items-center mb-3'>
                    <div className='max-w-80 w-100 h-80 rounded-10 overflow-hidden me-2'>
                        <ImgTag src={ProfilePictureThree} alt={'profile'} className={'img-fluid'} />
                    </div>
                    <div className='w-100'>
                        <div className='d-flex align-items-center justify-content-between mb-1'>
                            <PTag
                                classes={'text-dark-blue fn-17 fw-bold'}
                                texts={'Veena Equipments'}
                            />
                            <div className='bg-extra-lite-skyblue d-flex align-items-center rounded-2 py-1 px-2'>
                                <Star width={12} className={'me-1'} />
                                <PTag classes='text-dark-gray fn-12' texts={'4.5'} />
                            </div>
                        </div>
                        <div className='d-flex align-items-center justify-content-between'>
                            <div className='d-flex align-items-center'>
                                <MdLocationOn fontSize={25} fill={'rgb(135 146 160)'} />
                                <PTag classes={'text-gray'} texts={'Mumbai'} />
                            </div>
                            <PTag classes='text-navy-blue fn-12 bold' texts={'4 Reviews'} />
                        </div>
                    </div>
                </div>
                <div className='d-flex justify-content-center mb-3'>
                    <ButtonTag
                        classes={'btn btn-hover-dark-orange-border rounded p-10-24 me-3'}
                        value={<AiOutlineShareAlt fontSize={27} className={'Ai-OutlineShareAlt'} />}
                    />
                    <ButtonTag
                        classes={
                            'btn btn-extra-lite-green rounded p-10-24 d-flex align-items-center'
                        }
                        value={
                            <>
                                <FiPhone fontSize={19} />
                                <PTag classes={'ms-2'} texts={'Call'} />
                            </>
                        }
                    />
                </div>
                <div className='border-teb mb-3'>
                    <Tab.Container
                        id='Requirements'
                        className='justify-content-sm-center justify-content-strat'
                        defaultActiveKey='VanityVans'
                    >
                        <Nav variant='pills'>
                            <Nav.Item className='pointer me-sm-4 me-2'>
                                <Nav.Link eventKey='VanityVans'>Vanity Vans</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className='pointer mx-sm-4 me-2'>
                                <Nav.Link eventKey='HeavyVehicles'>Heavy Vehicles</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className='pointer ms-sm-4'>
                                <Nav.Link eventKey='PoliceVehicle'>Police Vehicle</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <Tab.Content>
                            <Tab.Pane eventKey='VanityVans'>
                                <PTag
                                    classes={'text-dark-blue fn-20 fw-bold mb-3'}
                                    texts={'Inventories'}
                                />
                                <Row>
                                    {camerasAndAccessories.map((data, index) => (
                                        <div className='col-xl-4 col-sm-6' key={index}>
                                            <Card className='border product-card rounded-16 position-relative p-3 mb-3'>
                                                <div>
                                                    <div className='remove-position'>
                                                        <ImageSlider images={data.gallery} />
                                                    </div>
                                                    <Card.Body className='p-0'>
                                                        <div className='d-flex justify-content-between align-items-start mb-3'>
                                                            <div>
                                                                <PTag
                                                                    texts={data.produtName}
                                                                    classes='text-dark-blue fn-17 fw-bold'
                                                                />
                                                                <PTag
                                                                    texts={data.category}
                                                                    classes='text-dark-blue mt-1'
                                                                />
                                                            </div>
                                                            <div className='bg-extra-lite-skyblue d-flex align-items-center rounded-2 px-2'>
                                                                <div className='w-12 me-1'>
                                                                    <Star />
                                                                </div>
                                                                <PTag
                                                                    texts={data.reviews}
                                                                    classes='text-dark-gray fn-12'
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className='border-bottom pb-2 mb-3'>
                                                            <PTag
                                                                texts='Base Price'
                                                                classes='text-dark-gray'
                                                            />
                                                            <PTag
                                                                texts={
                                                                    <>
                                                                        <del className='text-gray fn-14 me-2'>
                                                                            {data.del}
                                                                        </del>
                                                                        {data.BasePrice}
                                                                    </>
                                                                }
                                                                classes='text-dark-blue fn-17 fw-bold'
                                                            />
                                                        </div>
                                                        <Row className='g-2'>
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
                                                    </Card.Body>
                                                </div>
                                            </Card>
                                        </div>
                                    ))}
                                </Row>
                            </Tab.Pane>
                            <Tab.Pane eventKey='HeavyVehicles'></Tab.Pane>
                            <Tab.Pane eventKey='PoliceVehicle'></Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </div>
            </Container>
        </>
    )
}

export default Transportservice
