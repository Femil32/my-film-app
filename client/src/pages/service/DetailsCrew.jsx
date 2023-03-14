import React, { useState } from 'react'
import { Col, Nav, Row, Tab } from 'react-bootstrap'
import { CameraProfile, ImageTwelve, ImgLp } from '../../assets/img'
import {
    ATag,
    BackButton,
    ButtonTag,
    ImgTag,
    InputTag,
    PTag,
} from '../../components/designComponents/MicroComponents'
import { Dash, Edit } from '../../components/AllSvgs'
import { useLocation, useNavigate } from 'react-router-dom'
import ReviewsCard from '../../components/common/ReviewsCard'
import ImportContactsFrom from './ImportContactsFrom'
import { FieldArray, Form, Formik } from 'formik'
import * as Yup from 'yup'
//icons
import { FiPlus } from 'react-icons/fi'

const DetailsCrew = () => {
    const navigation = useNavigate()
    const { state } = useLocation()
    const [show, setShow] = useState(false)



    const SUPPORTED_FORMATS = [
        'image/jpg',
        'image/jpeg',
        'image/gif',
        'image/png',
        'audios/mp3',
        'video/mp4',
    ]

    const handleFileChange = (files, setFieldValue, fileArray) => {
        const file = files[0]
        if (SUPPORTED_FORMATS.includes(file.type) === true) {
            const addData = {
                id: 1,
                url: URL.createObjectURL(files[0]),
            }
            fileArray.push(addData)
            setFieldValue('fileArray', fileArray)
        } else if (SUPPORTED_FORMATS.includes(file.type) === false) {
            alert('Your Selected file of formate not support')
        }
    }

    return (
        <>
            <div className='container'>
                <BackButton
                    onClick={() => {
                        navigation('/dashboard/added-inventories', { state })
                    }}
                />
                <Row>
                    <Col xl={3} sm={5} xs={12} className={'mb-3 pt-3'}>
                        <div className='rounded-10 mx-auto border'>
                            <ImgTag src={CameraProfile} classes={'img-fluid w-100'} />
                        </div>
                        <PTag
                            classes={'text-dark-blue fn-20 fn-xs-18 fw-bold mt-2'}
                            texts={'Nikon Camera'}
                        />
                    </Col>
                    <Col xl={9} sm={7} xs={12} className={'border-orange'}>
                        <Tab.Container defaultActiveKey='Portfolio'>
                            <Nav variant='pills' className='mb-3'>
                                <Nav.Item className='pointer'>
                                    <Nav.Link eventKey='Portfolio'>Portfolio</Nav.Link>
                                </Nav.Item>
                                <Nav.Item className='pointer'>
                                    <Nav.Link eventKey='Overview'>Overview</Nav.Link>
                                </Nav.Item>
                                <Nav.Item className='pointer'>
                                    <Nav.Link eventKey='Reviews'>Reviews</Nav.Link>
                                </Nav.Item>
                            </Nav>
                            <Tab.Content>
                                <Tab.Pane eventKey='Portfolio'>
                                    <Formik
                                        initialValues={{
                                            fileArray: [],
                                        }}
                                        validationSchema={Yup.object().shape({
                                            fileArray: Yup.array()
                                                .of(
                                                    Yup.object().shape({
                                                        id: Yup.string(),
                                                        url: Yup.mixed(),
                                                    })
                                                )
                                                .min(1)
                                                .required('At least one portfolio added here'),
                                        })}
                                        onSubmit={values => {
                                            onSubmitForm(values)
                                        }}
                                    >
                                        {({
                                            values,
                                            errors,
                                            touched,
                                            handleSubmit,
                                            setFieldValue,
                                        }) => (
                                            <Form
                                                onSubmit={handleSubmit}
                                                className='d-flex flex-column justify-content-between h-100'
                                            >
                                                <div className='row'>
                                                    {values.fileArray.length > 0 && (
                                                        <FieldArray
                                                            name='fileArray'
                                                            render={arrayHelpers => {
                                                                const filesArray = values.fileArray
                                                                return filesArray.map(
                                                                    (element, index) => (
                                                                        <div
                                                                            className='col-xl-3 col-6 mb-3'
                                                                            key={index}
                                                                        >
                                                                            <div className='box w-100 position-relative bg-lite-gray'>
                                                                                <ImgTag
                                                                                    src={
                                                                                        element.url
                                                                                    }
                                                                                    alt={'profile'}
                                                                                    classes={
                                                                                        'img-fluid object-fit-cover h-100 w-100'
                                                                                    }
                                                                                />
                                                                                <div className='w-30 h-30 rounded-circle d-flex justify-content-center align-items-center bg-white shadow-sm position-absolute top-10 end-10'>
                                                                                    <ATag
                                                                                        children={
                                                                                            <Dash />
                                                                                        }
                                                                                        onClick={() => {
                                                                                            arrayHelpers.remove(
                                                                                                index
                                                                                            )
                                                                                        }}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                )
                                                            }}
                                                        />
                                                    )}
                                                    {values.fileArray.length < 4 && (
                                                        <div
                                                            className={`${values.fileArray.length == 1 ||
                                                                values.fileArray.length == 4
                                                                ? 'col-xl-3 col-sm-6'
                                                                : 'col-xl-3 col-sm-6 col-12'
                                                                } mb-3`}
                                                        >
                                                            <div className='box w-100 position-relative bg-lite-white border-dashed-2'>
                                                                <div className='d-flex w-100 h-100 justify-content-center align-items-center position-absolute center-con'>
                                                                    <InputTag
                                                                        className={
                                                                            'uplode-input w-100 h-100'
                                                                        }
                                                                        type={'file'}
                                                                        name={'fileSelect'}
                                                                        onChange={event => {
                                                                            handleFileChange(
                                                                                event.target.files,
                                                                                setFieldValue,
                                                                                values.fileArray
                                                                            )
                                                                        }}
                                                                    />
                                                                    <div className='plus-box d-flex align-items-center justify-content-center rounded'>
                                                                        <FiPlus fontSize={40} className={'Fi-Plus pointer'} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                                {errors.fileSelect && (
                                                    <div className='d-flex align-items-center mb-3'>
                                                        <InputError
                                                            className='input-error'
                                                            errorTitle={errors.fileSelect}
                                                        />
                                                    </div>
                                                )}
                                                {errors.fileArray && touched.fileArray ? (
                                                    <div className='d-flex align-items-center mb-3'>
                                                        <InputError
                                                            className='input-error'
                                                            errorTitle={errors.fileArray}
                                                        />
                                                    </div>
                                                ) : null}

                                                <div className='col-12 form-control position-relative d-flex justify-content-between align-items-center p-2 ps-3 pe-2 mb-sm-3 w-100'>
                                                    <InputTag
                                                        className={'uplode-input'}
                                                        type={'file'}
                                                        accept={`.mp3, .mp4`}
                                                        name={'fileSelect'}
                                                        onChange={event => {
                                                            handleFileChange(
                                                                event.target.files,
                                                                setFieldValue,
                                                                values.fileArray
                                                            )
                                                        }}
                                                    />

                                                    <ATag
                                                        classes={'text-dark bold'}
                                                        children={<PTag texts={'Add Audios'} />}
                                                    />
                                                    <ATag
                                                        classes={'btn btn-dark-gray bold'}
                                                        children={<PTag texts={'Add'} />}
                                                    />
                                                </div>
                                                <div className='col-12 form-control position-relative d-flex justify-content-between align-items-center p-2 ps-3 pe-2 mb-sm-3 w-100'>
                                                    <InputTag
                                                        type={'file'}
                                                        name={'fileSelect'}
                                                        accept={`.mp4, ogg`}
                                                        className={'uplode-input w-100'}
                                                        onChange={event => {
                                                            handleFileChange(
                                                                event.target.files,
                                                                setFieldValue,
                                                                values.fileArray
                                                            )
                                                        }}
                                                    />

                                                    <ATag
                                                        classes={'text-dark bold'}
                                                        children={<PTag texts={'Add Videos'} />}
                                                    />
                                                    <ATag
                                                        classes={'btn btn-dark-gray bold'}
                                                        children={<PTag texts={'Add'} />}
                                                    />
                                                </div>
                                            </Form>
                                        )}
                                    </Formik>
                                </Tab.Pane>
                                <Tab.Pane eventKey='Overview'>
                                    <div className='px-3'>
                                        <div className='py-2 border-bottom'>
                                            <div className='d-flex justify-content-between align-items-center mb-2'>
                                                <PTag
                                                    classes={'text-dark-blue bold fn-18'}
                                                    texts={'Description'}
                                                />
                                                <div>
                                                    <Edit width={'24'} />
                                                </div>
                                            </div>
                                            <div className='text-gray'>
                                                Feugiat in ante metus dictum at tempor. Dui into
                                                faucibus in ornare quam viverra. lementum a
                                                facilisis leo vel Fringilla.
                                            </div>
                                        </div>
                                        <div className='py-3 border-bottom'>
                                            <div className='d-flex justify-content-between align-items-center mb-2'>
                                                <PTag
                                                    classes={'text-dark-blue bold fn-18'}
                                                    texts={'Charges'}
                                                />
                                                <div>
                                                    <Edit width={'24'} />
                                                </div>
                                            </div>
                                            <div className='d-flex align-items-center justify-content-between mb-2'>
                                                <PTag
                                                    classes={'text-gray'}
                                                    texts={'Rate Per Sec/Hr'}
                                                />
                                                <PTag
                                                    classes={'text-dark-blue bold'}
                                                    texts={'₹1,00,000'}
                                                />
                                            </div>
                                            <div className='d-flex align-items-center justify-content-between'>
                                                <PTag classes={'text-gray'} texts={'Taxes'} />
                                                <PTag
                                                    classes={'text-dark-blue bold'}
                                                    texts={'25%'}
                                                />
                                            </div>
                                        </div>
                                        <div className='py-3 border-bottom'>
                                            <div className='d-flex justify-content-between align-items-center mb-2'>
                                                <PTag
                                                    classes={'text-dark-blue bold fn-18'}
                                                    texts={'Payment Terms'}
                                                />
                                                <div>
                                                    <Edit width={'24'} />
                                                </div>
                                            </div>
                                            <div className='d-flex align-items-center justify-content-between mb-2'>
                                                <PTag
                                                    classes={'text-gray'}
                                                    texts={'Advance to be paid'}
                                                />
                                                <PTag
                                                    classes={'text-dark-blue bold'}
                                                    texts={'25%'}
                                                />
                                            </div>
                                            <div className='d-flex align-items-center justify-content-between mb-2'>
                                                <PTag classes={'text-gray'} texts={'On Shoot %'} />
                                                <PTag
                                                    classes={'text-dark-blue bold'}
                                                    texts={'25%'}
                                                />
                                            </div>
                                            <div className='d-flex align-items-center justify-content-between'>
                                                <PTag
                                                    classes={'text-gray'}
                                                    texts={'Credit Period'}
                                                />
                                                <PTag
                                                    classes={'text-dark-blue bold'}
                                                    texts={'20 Days'}
                                                />
                                            </div>
                                        </div>
                                        <div className='py-3'>
                                            <div className='d-flex justify-content-between align-items-center mb-2'>
                                                <PTag
                                                    classes={'text-dark-blue bold fn-18'}
                                                    texts={'Cancelation Policy'}
                                                />
                                                <div>
                                                    <Edit width={'24'} />
                                                </div>
                                            </div>
                                            <div className='mb-sm-4 mb-3'>
                                                <PTag
                                                    classes={'text-dark-blue fn-18 fn-xs-16 mb-1'}
                                                    texts={'Refund %'}
                                                />
                                                <PTag
                                                    classes={'text-dark-gray mt-0 fn-14 fn-xs-13'}
                                                    texts={
                                                        'Elementum a facilisis leo vel Fringilla.'
                                                    }
                                                />
                                            </div>
                                            <div>
                                                <PTag
                                                    classes={'text-dark-blue fn-18 fn-xs-16 mb-1'}
                                                    texts={'Cancellation Days before shoot'}
                                                />
                                                <PTag
                                                    classes={'text-dark-gray mt-0 fn-14 fn-xs-13'}
                                                    texts={
                                                        'Elementum a facilisis leo vel Fringilla.'
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey='Reviews'>
                                    <Row>
                                        <Col xl={6}>
                                            <ReviewsCard
                                                UserImg={ImgLp}
                                                UserName={'Anthony James'}
                                                ReviewsTime={'4 Mins ago'}
                                                Reviewsdiscretion={
                                                    'Feugiat in ante metus dictum at tempor. Dui into faucibus in ornare quam viverra. Elementum a facilisis leo vel fringilla.'
                                                }
                                                Image={ImageTwelve}
                                                likeNumber={'129'}
                                            />
                                        </Col>
                                        <Col xl={6}>
                                            <ReviewsCard
                                                UserImg={ImgLp}
                                                UserName={'Anthony James'}
                                                ReviewsTime={'4 Mins ago'}
                                                Reviewsdiscretion={
                                                    'Feugiat in ante metus dictum at tempor. Dui into faucibus in ornare quam viverra. Elementum a facilisis leo vel fringilla.'
                                                }
                                                Image={ImageTwelve}
                                                likeNumber={'129'}
                                            />
                                        </Col>
                                        <Col xs={12} className={'text-center mb-3'}>
                                            <ButtonTag
                                                classes={'btn-dark-blue bold rounded'}
                                                value={'Request A Review'}
                                                onClick={() => setShow(true)}
                                            />
                                        </Col>
                                    </Row>
                                </Tab.Pane>
                            </Tab.Content>
                        </Tab.Container>
                    </Col>
                </Row>
            </div>
            <ImportContactsFrom show={show} setShow={setShow} />
        </>
    )
}

export default DetailsCrew
