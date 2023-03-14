import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { FaMinus, FaPlus } from 'react-icons/fa'
import { ProfilePictureThree } from '../../assets/img'
import {
    BackButton,
    ButtonTag,
    ImgTag,
    InputTag,
    PTag
} from '../../components/designComponents/MicroComponents'
//icons
import { MdDelete, MdLocationOn } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import IsLoadingHOC from '../../components/higherOrderLoader/IsLoadingHOC'
import { indianAmount } from '../../helpers/functions'
import { getCart, RemoveFromCart } from '../../store/cart/slice'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'

const MyCart = ({ setLoading }) => {

    const dispatch = useDispatch()
    const { cartItems } = useSelector(state => state.cart)

    const [allCount, setAllCount] = useState({})

    const incrementCount = (id) => {
        let temp = { ...allCount }
        temp[id] = (temp[id] || 1) + 1
        setAllCount(temp)
    }
    const decrementCount = (id) => {
        let temp = { ...allCount }
        temp[id] = (temp[id] || 1) - 1
        temp[id] > 0 && setAllCount(temp)
    }

    useEffect(() => {
        dispatch(getCart()).then(() => {
            setLoading(false)
        })
    }, [])

    const DeleteAlert = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to Remove this item!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(res => {
            if (res.isConfirmed) {
                Promise.all([dispatch(RemoveFromCart(id))]).then((res) => {
                    dispatch(getCart())
                })
            }
        });
    };


    return (
        <Container>
            <BackButton title={'My Cart'} classes={'mb-3'} />
            <PTag classes={'text-dark-blue fw-bold fn-20 mb-3'} texts={'Cart Items'} />
            <Row>
                {cartItems?.cartItems?.map(item => {
                    return (
                        <Col xs={4} key={item.cartItemId}>
                            <Card className='rounded-16 p-3 mb-3'>
                                <div className='d-flex align-items-center w-100 mb-3'>
                                    <div className='max-w-80 w-100 rounded-5 overflow-hidden'>
                                        <ImgTag
                                            src={item?.sellerDetail?.profileImageUrl}
                                            alt={'profile'}
                                            classes={'img-fluid w-100'}
                                        />
                                    </div>
                                    <div className='ms-3 w-100'>
                                        <div className='d-flex justify-content-between align-items-center mb-2'>
                                            <PTag
                                                classes={'text-dark-blue fw-bold fn-16'}
                                                texts={item?.sellerDetail?.firstName + " " + item?.sellerDetail?.lastName}
                                            />
                                            <div className='pointer' onClick={() => DeleteAlert(item?.cartItemId)}>
                                                <MdDelete className={'Md-Delete'} />
                                            </div>
                                        </div>
                                        <div className='d-flex justify-content-between'>
                                            <div>
                                                <PTag
                                                    classes={'text-dark-gray mb-2'}
                                                    texts={'sub Category'}
                                                />
                                                <PTag
                                                    classes={'text-dark-blue fw-bold fn-16'}
                                                    texts={indianAmount(item?.totalAmount)}
                                                />
                                            </div>
                                            <div className='d-flex align-items-center text-dark-blue user-select-none'>
                                                <div
                                                    className={` d-flex justify-content-center align-items-center border rounded-circle w-40 h-40 pointer`}
                                                    onClick={() => decrementCount(item?.cartItemId)}
                                                >
                                                    <FaMinus />
                                                </div>
                                                <div className='w50 fn-16 px-1'>
                                                    <InputTag
                                                        type={'text'}
                                                        value={allCount[item?.cartItemId] ?? 1}
                                                        classes={'w-100 text-center fw-bold'}
                                                    />
                                                </div>
                                                <div
                                                    className='d-flex justify-content-center align-items-center border rounded-circle w-40 h-40 pointer'
                                                    onClick={() => incrementCount(item?.cartItemId)}
                                                >
                                                    <FaPlus />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Link
                                    to={'/dashboard/orders/modify'}
                                    state={{
                                        profileOrderId: item?.profileOrderId
                                    }}
                                    className="text-orange fw-bold fn-12 text-center pointer"
                                >Modify Order</Link>
                            </Card>
                        </Col>
                    )
                })}

                {/* <Col xs={4}>
                    <Card className='rounded-16 p-3 mb-3'>
                        <div className='d-flex align-items-center w-100 mb-3'>
                            <div className='max-w-80 w-100 rounded-5 overflow-hidden'>
                                <ImgTag
                                    src={ProfilePictureThree}
                                    alt={'profile'}
                                    classes={'img-fluid w-100'}
                                />
                            </div>
                            <div className='ms-3 w-100'>
                                <div className='d-flex justify-content-between align-items-center mb-2'>
                                    <PTag
                                        classes={'text-dark-blue fw-bold fn-16'}
                                        texts={'Aakash Shah'}
                                    />
                                    <div className='pointer'>
                                        <MdDelete className={'Md-Delete'} />
                                    </div>
                                </div>
                                <PTag classes={'text-dark-gray mb-2'} texts={'sub Category'} />
                                <PTag classes={'text-dark-blue fw-bold fn-16'} texts={'₹20,000'} />
                            </div>
                        </div>
                        <PTag
                            classes={'text-orange fw-bold fn-16 text-center pointer'}
                            texts={'Cancel/Modify Order'}
                        />
                    </Card>
                </Col>
                <Col xs={4}>
                    <Card className='rounded-16 p-3 mb-3'>
                        <div className='d-flex align-items-center w-100 mb-3'>
                            <div className='max-w-80 w-100 rounded-5 overflow-hidden'>
                                <ImgTag
                                    src={ProfilePictureEight}
                                    alt={'profile'}
                                    classes={'img-fluid w-100'}
                                />
                            </div>
                            <div className='ms-3 w-100'>
                                <div className='d-flex justify-content-between align-items-center mb-2'>
                                    <PTag
                                        classes={'text-dark-blue fw-bold fn-16'}
                                        texts={'Vanity Van'}
                                    />
                                    <div className='pointer'>
                                        <MdDelete className={'Md-Delete'} />
                                    </div>
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <div>
                                        <PTag
                                            classes={'text-dark-gray mb-2'}
                                            texts={'sub Category'}
                                        />
                                        <PTag
                                            classes={'text-dark-blue fw-bold fn-16'}
                                            texts={'₹20,000'}
                                        />
                                    </div>
                                    <div className='d-flex align-items-center text-dark-blue'>
                                        <div
                                            className='d-flex justify-content-center align-items-center border rounded-circle w-40 h-40 pointer'
                                            onClick={decrementCount}
                                        >
                                            <FaMinus />
                                        </div>
                                        <div className='w50 fn-16 px-1'>
                                            <InputTag
                                                type={'text'}
                                                value={count}
                                                classes={'w-100 text-center fw-bold'}
                                            />
                                        </div>
                                        <div
                                            className='d-flex justify-content-center align-items-center border rounded-circle w-40 h-40 pointer'
                                            onClick={incrementCount}
                                        >
                                            <FaPlus />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <PTag
                            classes={'text-orange fw-bold fn-16 text-center pointer'}
                            texts={'Cancel/Modify Order'}
                        />
                    </Card>
                </Col>
                <Col xs={4}>
                    <Card className='rounded-16 p-3 mb-3'>
                        <div className='d-flex align-items-center w-100 mb-3'>
                            <div className='max-w-80 w-100 rounded-5 overflow-hidden'>
                                <ImgTag
                                    src={ProfilePictureEight}
                                    alt={'profile'}
                                    classes={'img-fluid w-100'}
                                />
                            </div>
                            <div className='ms-3 w-100'>
                                <div className='d-flex justify-content-between align-items-center mb-2'>
                                    <PTag
                                        classes={'text-dark-blue fw-bold fn-16'}
                                        texts={'Vanity Van'}
                                    />
                                    <div className='pointer'>
                                        <MdDelete className={'Md-Delete'} />
                                    </div>
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <div>
                                        <PTag
                                            classes={'text-dark-gray mb-2'}
                                            texts={'sub Category'}
                                        />
                                        <PTag
                                            classes={'text-dark-blue fw-bold fn-16'}
                                            texts={'₹20,000'}
                                        />
                                    </div>
                                    <div className='d-flex align-items-center text-dark-blue'>
                                        <div
                                            className='d-flex justify-content-center align-items-center border rounded-circle w-40 h-40 pointer'
                                            onClick={decrementCount}
                                        >
                                            <FaMinus />
                                        </div>
                                        <div className='w50 fn-16 px-1'>
                                            <InputTag
                                                type={'text'}
                                                value={count}
                                                classes={'w-100 text-center fw-bold'}
                                            />
                                        </div>
                                        <div
                                            className='d-flex justify-content-center align-items-center border rounded-circle w-40 h-40 pointer'
                                            onClick={incrementCount}
                                        >
                                            <FaPlus />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <PTag
                            classes={'text-orange fw-bold fn-16 text-center pointer'}
                            texts={'Cancel/Modify Order'}
                        />
                    </Card>
                </Col> */}
            </Row>
            <PTag classes={'text-dark-blue fw-bold fn-20 mb-3'} texts={'Selected Locations'} />
            <Row>
                <Col xs={6}>
                    <Card className='rounded-16 p-3 mb-3'>
                        <div className='d-flex align-items-center w-100 mb-3'>
                            <div className='max-w-80 w-100 rounded-5 overflow-hidden'>
                                <ImgTag
                                    src={ProfilePictureThree}
                                    alt={'profile'}
                                    classes={'img-fluid w-100'}
                                />
                            </div>
                            <div className='ms-3 w-100'>
                                <div className='d-flex justify-content-between align-items-center mb-2'>
                                    <PTag
                                        classes={'text-dark-blue fw-bold fn-16'}
                                        texts={'Myna Villa'}
                                    />
                                    <div className='pointer'>
                                        <MdDelete className={'Md-Delete'} />
                                    </div>
                                </div>
                                <PTag classes={'text-dark-gray mb-2'} texts={'sub Category'} />
                            </div>
                        </div>
                        <div className='d-flex mb-3'>
                            <div className='w-24 me-2'>
                                <MdLocationOn fontSize={25} fill={'rgb(135 146 160)'} />
                            </div>
                            <PTag
                                classes={'text-gary pointer'}
                                texts={
                                    'Myna Villas S N 28 C NO 15, TAJ COTTAGES, FINALLY HILLS, 410401 Lonavala,'
                                }
                            />
                        </div>
                        <Row>
                            <Col xs={6} className={'px-2'}>
                                <ButtonTag
                                    classes={'btn-extra-lite-green bold w-100 rounded fn-14'}
                                    value={'Select Date/Time'}
                                />
                            </Col>
                            <Col xs={6} className={'px-2'}>
                                <ButtonTag
                                    classes={'btn-orange bold w-100 rounded fn-14'}
                                    value={'Select Recce Type'}
                                />
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col xs={6}>
                    <Card className='rounded-16 p-3 mb-3'>
                        <div className='d-flex align-items-center w-100 mb-3'>
                            <div className='max-w-80 w-100 rounded-5 overflow-hidden'>
                                <ImgTag
                                    src={ProfilePictureThree}
                                    alt={'profile'}
                                    classes={'img-fluid w-100'}
                                />
                            </div>
                            <div className='ms-3 w-100'>
                                <div className='d-flex justify-content-between align-items-center mb-2'>
                                    <PTag
                                        classes={'text-dark-blue fw-bold fn-16'}
                                        texts={'Myna Villa'}
                                    />
                                    <div className='pointer'>
                                        <MdDelete className={'Md-Delete'} />
                                    </div>
                                </div>
                                <PTag classes={'text-dark-gray mb-2'} texts={'sub Category'} />
                            </div>
                        </div>
                        <div className='d-flex mb-3'>
                            <div className='w-24 me-2'>
                                <MdLocationOn fontSize={25} fill={'rgb(135 146 160)'} />
                            </div>
                            <PTag
                                classes={'text-gary pointer'}
                                texts={
                                    'Myna Villas S N 28 C NO 15, TAJ COTTAGES, FINALLY HILLS, 410401 Lonavala,'
                                }
                            />
                        </div>
                        <Row>
                            <Col xs={6} className={'px-2'}>
                                <ButtonTag
                                    classes={'btn-extra-lite-green bold w-100 rounded fn-14'}
                                    value={'Select Date/Time'}
                                />
                            </Col>
                            <Col xs={6} className={'px-2'}>
                                <ButtonTag
                                    classes={'btn-orange bold w-100 rounded fn-14'}
                                    value={'Select Recce Type'}
                                />
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default IsLoadingHOC(MyCart)
