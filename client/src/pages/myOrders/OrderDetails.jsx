import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { ProfilePictureThree } from '../../assets/img'
import {
    BackButton,
    ButtonTag,
    ImgTag,
    InputTag,
    PTag,
} from '../../components/designComponents/MicroComponents'
import Select from 'react-select'
//icons
import { HiOutlineDocumentDownload } from 'react-icons/hi'
import { FiPhone } from 'react-icons/fi'
import { MdOutlineEventNote } from 'react-icons/md'

const OrderDetails = () => {
    const navigate = useNavigate()

    const dummyArray = [
        {
            value: '5%',
            label: '5%',
        },
        {
            value: '50%',
            label: '50%',
        },
        {
            value: '100%',
            label: '100%',
        },
    ]
    return (
        <>
            <Container>
                <BackButton
                    title={'Order Details'}
                    classes={'mb-3'}
                    onClick={() => {
                        navigate('/dashboard')
                    }}
                />
                <Row className='mb-3'>
                    <Col xl={4} lg={5}>
                        <Card className='border rounded-16 p-3 mb-lg-0 mb-3'>
                            <div className='border-bottom pb-3'>
                                <div className='d-flex align-items-center justify-content-between mb-3'>
                                    <div className='d-flex align-items-center'>
                                        <MdOutlineEventNote fontSize={25} />
                                        <PTag
                                            classes={'text-dark-blue bold ms-2'}
                                            texts={'Order ID - 1448'}
                                        />
                                    </div>
                                    <PTag
                                        classes={'text-dark-gray bold ms-2'}
                                        texts={'27 Oct, 2021'}
                                    />
                                </div>
                                <div>
                                    <div className='d-flex align-items-center justify-content-between'>
                                        <div className='d-flex align-items-center w-100 mb-sm-0'>
                                            <div className='max-w-80 max-h-80 w-100 rounded-10 overflow-hidden'>
                                                <ImgTag
                                                    src={ProfilePictureThree}
                                                    alt={'profile'}
                                                    classes={'img-fluid'}
                                                />
                                            </div>
                                            <div className='ms-2 w-100'>
                                                <PTag
                                                    classes={'text-dark-blue fw-bold fn-16 mb-2'}
                                                    texts={'Kumar Biswas'}
                                                />
                                                <PTag
                                                    classes={
                                                        'text-dark-gray white-space-nowrap mt-0'
                                                    }
                                                    texts={'Project Title'}
                                                />
                                            </div>
                                        </div>
                                        <ButtonTag
                                            classes={
                                                'btn-extra-lite-green d-flex align-items-center rounded bold'
                                            }
                                            value={
                                                <>
                                                    <FiPhone fontSize={19} />
                                                    <span className='ms-1'>Call</span>
                                                </>
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='pt-2'>
                                <ButtonTag
                                    classes={
                                        'btn-orange semibold d-flex align-items-center justify-content-center w-100'
                                    }
                                    value={
                                        <>
                                            <HiOutlineDocumentDownload fontSize={26}
                                                className={'HiOutlineDocumentDownload'}
                                            />
                                            <span className='ms-2'>Download Proforma</span>
                                        </>
                                    }
                                />
                            </div>
                        </Card>
                    </Col>
                    <Col xl={8} lg={7}>
                        <div>
                            <div className='mb-3'>
                                <PTag
                                    classes={'text-dark-blue fn-16 fw-bold mb-3'}
                                    texts={'Payment Terms'}
                                />
                                <div className='border-bottom pb-2 mb-2'>
                                    <div className='d-flex justify-content-between mb-2'>
                                        <PTag classes={'text-dark-blue'} texts={'Advance (25%)'} />
                                        <PTag
                                            classes={'text-dark-blue semibold mt-0'}
                                            texts={'₹20,000'}
                                        />
                                    </div>
                                    <div className='d-flex justify-content-between mb-2'>
                                        <PTag
                                            classes={'text-dark-blue'}
                                            texts={'On Delivery (5%)'}
                                        />
                                        <PTag
                                            classes={'text-dark-blue semibold mt-0'}
                                            texts={'₹2000'}
                                        />
                                    </div>
                                    <div className='d-flex justify-content-between mb-2'>
                                        <PTag classes={'text-dark-blue'} texts={'Credit Period'} />
                                        <PTag
                                            classes={'text-dark-blue semibold mt-0'}
                                            texts={'20 Days'}
                                        />
                                    </div>
                                    <div className='d-flex justify-content-between mb-2'>
                                        <PTag classes={'text-dark-blue'} texts={'GST/Taxes'} />
                                        <PTag
                                            classes={'text-dark-blue semibold mt-0'}
                                            texts={'18%'}
                                        />
                                    </div>
                                    <div className='d-flex align-items-center justify-content-between mb-2'>
                                        <PTag classes={'text-dark-blue'} texts={'TDS'} />
                                        <div className='w-80 small-select'>
                                            <Select
                                                id={'taxes'}
                                                className='form-control text-dark-blue semibold p-0'
                                                options={dummyArray}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='d-flex justify-content-between fw-bold mb-3'>
                                    <PTag classes={'text-dark-blue fn-16'} texts={'Total'} />
                                    <PTag classes={'text-dark-blue fn-16 mt-0'} texts={'₹25,000'} />
                                </div>
                                <div className='form-control d-flex py-2 px-3'>
                                    <InputTag placeholder={'Have any query?'} classes={'w-100'} />
                                    <ButtonTag
                                        classes={
                                            'btn-dark-blue white-space-nowrap rounded semibold'
                                        }
                                        value={'Contact Us'}
                                    />
                                </div>
                            </div>
                            <div className='filter-button px-sm-0 px-2'>
                                <Row>
                                    <Col xs={6} className='pe-2'>
                                        <ButtonTag
                                            classes={'btn-extra-lite-green semibold rounded w-100'}
                                            value={'Remove From Cart'}
                                        />
                                    </Col>
                                    <Col xs={6} className='ps-2'>
                                        <ButtonTag
                                            classes={'btn-orange rounded semibold w-100'}
                                            value={'Check Out'}
                                        />
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default OrderDetails
