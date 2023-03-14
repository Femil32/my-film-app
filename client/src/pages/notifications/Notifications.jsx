import React from 'react'
import { Accordion } from 'react-bootstrap'
import { Cameraman, ProfilePictureTwo } from '../../assets/img'
import {
    BackButton,
    ButtonTag,
    ImgTag,
    PTag,
} from '../../components/designComponents/MicroComponents'

export const Notifications = () => {
    var CameramanImg = {
        backgroundImage: `url( ${Cameraman} )`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    }
    return (
        <>
            <div className='container'>
                <BackButton title={'Notifications'} />
                <div>
                    <PTag classes={'text-dark-gray mb-3'} texts={'Today'} />
                    <div className='remove-padding-arrow-accordion'>
                        <Accordion defaultActiveKey='0'>
                            <div className='row'>
                                <div className='col-sm-6'>
                                    <div className='border rounded-16 p-3 mb-3'>
                                        <Accordion.Item eventKey='0'>
                                            <Accordion.Header>
                                                <div className='d-flex align-items-center'>
                                                    <div className='max-w-75 w-100'>
                                                        <ImgTag
                                                            src={ProfilePictureTwo}
                                                            classes={'img-fluid rounded-10'}
                                                        />
                                                    </div>
                                                    <div className='w-100 ms-3'>
                                                        <PTag
                                                            classes={'text-dark-blue fw-bold fn-16'}
                                                            texts={'Harsh joshi'}
                                                        />
                                                        <PTag
                                                            classes={'text-green'}
                                                            texts={'Booking Accepted'}
                                                        />
                                                    </div>
                                                </div>
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                <div className='row g-3'>
                                                    <div className='col-6'>
                                                        <ButtonTag
                                                            classes={
                                                                'btn-extra-lite-green semibold fn-12 rounded white-space-nowrap w-100 mt-3'
                                                            }
                                                            value={'Add Review'}
                                                        />
                                                    </div>
                                                    <div className='col-6'>
                                                        <ButtonTag
                                                            classes={
                                                                'btn-extra-lite-orange semibold fn-12 rounded white-space-nowrap w-100 mt-3'
                                                            }
                                                            value={'Reject'}
                                                        />
                                                    </div>
                                                </div>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </div>
                                </div>
                                <div className='col-sm-6'>
                                    <div className='border rounded-16 p-3 mb-3'>
                                        <Accordion.Item eventKey='1'>
                                            <Accordion.Header>
                                                <div className='d-flex align-items-center'>
                                                    <div className='max-w-75 w-100'>
                                                        <ImgTag
                                                            src={ProfilePictureTwo}
                                                            classes={'img-fluid rounded-10'}
                                                        />
                                                    </div>
                                                    <div className='w-100 ms-3'>
                                                        <PTag
                                                            classes={'text-dark-blue fw-bold fn-16'}
                                                            texts={'Kumar Biswas'}
                                                        />
                                                        <PTag
                                                            classes={'text-gray'}
                                                            texts={'Is asking for review'}
                                                        />
                                                    </div>
                                                </div>
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                <div className='row g-3'>
                                                    <div className='col-6'>
                                                        <ButtonTag
                                                            classes={
                                                                'btn-extra-lite-green semibold fn-12 rounded white-space-nowrap w-100 mt-3'
                                                            }
                                                            value={'Add Review'}
                                                        />
                                                    </div>
                                                    <div className='col-6'>
                                                        <ButtonTag
                                                            classes={
                                                                'btn-extra-lite-orange semibold fn-12 rounded white-space-nowrap w-100 mt-3'
                                                            }
                                                            value={'Reject'}
                                                        />
                                                    </div>
                                                </div>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </div>
                                </div>
                            </div>
                        </Accordion>
                    </div>
                    <PTag classes={'text-dark-gray mb-3'} texts={'This Week'} />
                    <div className='remove-padding-arrow-accordion'>
                        <Accordion defaultActiveKey=''>
                            <div className='row'>
                                <div className='col-sm-6'>
                                    <div className='border rounded-16 p-3 mb-3'>
                                        <Accordion.Item eventKey='0'>
                                            <Accordion.Header>
                                                <div className='d-flex align-items-center'>
                                                    <div className='max-w-75 w-100'>
                                                        <ImgTag
                                                            src={ProfilePictureTwo}
                                                            classes={'img-fluid rounded-10'}
                                                        />
                                                    </div>
                                                    <div className='w-100 ms-3'>
                                                        <PTag
                                                            classes={'text-dark-blue fw-bold fn-16'}
                                                            texts={'Dance4'}
                                                        />
                                                        <PTag
                                                            classes={'text-gray'}
                                                            texts={
                                                                'An At Iaculis Lorem. Praesent Tempor'
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                <div className='row g-3'>
                                                    <div className='col-6'>
                                                        <ButtonTag
                                                            classes={
                                                                'btn-extra-lite-green semibold fn-12 rounded white-space-nowrap w-100 mt-3'
                                                            }
                                                            value={'Add Review'}
                                                        />
                                                    </div>
                                                    <div className='col-6'>
                                                        <ButtonTag
                                                            classes={
                                                                'btn-extra-lite-orange semibold fn-12 rounded white-space-nowrap w-100 mt-3'
                                                            }
                                                            value={'Reject'}
                                                        />
                                                    </div>
                                                </div>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </div>
                                </div>
                                <div className='col-sm-6'>
                                    <div className='border rounded-16 p-3 mb-3'>
                                        <Accordion.Item eventKey='1'>
                                            <Accordion.Header>
                                                <div className='d-flex align-items-center'>
                                                    <div className='max-w-75 w-100'>
                                                        <ImgTag
                                                            src={ProfilePictureTwo}
                                                            classes={'img-fluid rounded-10'}
                                                        />
                                                    </div>
                                                    <div className='w-100 ms-3'>
                                                        <PTag
                                                            classes={'text-dark-blue fw-bold fn-16'}
                                                            texts={'Dance4'}
                                                        />
                                                        <PTag
                                                            classes={'text-gray'}
                                                            texts={
                                                                'An At Iaculis Lorem. Praesent Tempor'
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                <div className='row g-3'>
                                                    <div className='col-6'>
                                                        <ButtonTag
                                                            classes={
                                                                'btn-extra-lite-green semibold fn-12 rounded white-space-nowrap w-100 mt-3'
                                                            }
                                                            value={'Add Review'}
                                                        />
                                                    </div>
                                                    <div className='col-6'>
                                                        <ButtonTag
                                                            classes={
                                                                'btn-extra-lite-orange semibold fn-12 rounded white-space-nowrap w-100 mt-3'
                                                            }
                                                            value={'Reject'}
                                                        />
                                                    </div>
                                                </div>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </div>
                                </div>
                            </div>
                        </Accordion>
                    </div>
                    <PTag classes={'text-navy-blue mb-3'} texts={'Special Offer'} />
                    <div className='row'>
                        <div className='col-xl-4 col-sm-6'>
                            <div className='card rounded-16 overflow-hidden mb-3'>
                                <div
                                    className='d-flex flex-column justify-content-center p-4 h-160'
                                    style={CameramanImg}
                                >
                                    <PTag classes={'text-orange fw-bold fn-26'} texts={'20% Off'} />
                                    <PTag
                                        classes={'text-dark-blue fw-bold fn-26 mt-0'}
                                        texts={'On Bookings'}
                                    />
                                </div>
                                <div className='d-flex align-items-center justify-content-between p-4'>
                                    <PTag
                                        classes={'text-gray fn-12 max-w-60p'}
                                        texts={"Rush to this deal before it's gone"}
                                    />
                                    <ButtonTag
                                        classes={'btn-extra-lite-green bold rounded'}
                                        value={'Book Now'}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='col-xl-4 col-sm-6'>
                            <div className='card rounded-16 overflow-hidden mb-3'>
                                <div
                                    className='d-flex flex-column justify-content-center p-4 h-160'
                                    style={CameramanImg}
                                >
                                    <PTag classes={'text-orange fw-bold fn-26'} texts={'20% Off'} />
                                    <PTag
                                        classes={'text-dark-blue fw-bold fn-26 mt-0'}
                                        texts={'On Bookings'}
                                    />
                                </div>
                                <div className='d-flex align-items-center justify-content-between p-4'>
                                    <PTag
                                        classes={'text-gray fn-12 max-w-60p'}
                                        texts={"Rush to this deal before it's gone"}
                                    />
                                    <ButtonTag
                                        classes={'btn-extra-lite-green bold rounded'}
                                        value={'Book Now'}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='col-xl-4 col-sm-6'>
                            <div className='card rounded-16 overflow-hidden mb-3'>
                                <div
                                    className='d-flex flex-column justify-content-center p-4 h-160'
                                    style={CameramanImg}
                                >
                                    <PTag classes={'text-orange fw-bold fn-26'} texts={'20% Off'} />
                                    <PTag
                                        classes={'text-dark-blue fw-bold fn-26 mt-0'}
                                        texts={'On Bookings'}
                                    />
                                </div>
                                <div className='d-flex align-items-center justify-content-between p-4'>
                                    <PTag
                                        classes={'text-gray fn-12 max-w-60p'}
                                        texts={"Rush to this deal before it's gone"}
                                    />
                                    <ButtonTag
                                        classes={'btn-extra-lite-green bold rounded'}
                                        value={'Book Now'}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Notifications
