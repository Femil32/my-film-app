import React from 'react'
import { Nav, Tab } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { ProfilePictureTwo } from '../../assets/img'
import { Alaramicon, RightChevron } from '../../components/AllSvgs'
import { BackButton, ButtonTag, ImgTag, PTag } from '../../components/designComponents/MicroComponents'

export default function Requirements() {
    const navigation = useNavigate()

    const Reuirments = [1, 2, 3, 4]
    return (
        <>
            <div className="container">
                <div className="">
                    <BackButton
                        title={'Requirements'}
                        onClick={() => {
                            navigation('/dashboard')
                        }}
                    />
                </div>
                <div className="row my-4">
                    <div className="border-teb">
                        <Tab.Container
                            id='Requirements'
                            className='justify-content-sm-center justify-content-strat'
                            defaultActiveKey='Open'
                        >
                            <Nav variant='pills'>
                                <Nav.Item className='pointer me-sm-4 me-2'>
                                    <Nav.Link eventKey='Open'>Open</Nav.Link>
                                </Nav.Item>
                                <Nav.Item className='pointer mx-sm-4 me-2'>
                                    <Nav.Link eventKey='Closed'>Closed</Nav.Link>
                                </Nav.Item>
                                <Nav.Item className='pointer ms-sm-4'>
                                    <Nav.Link eventKey='Draft'>Draft</Nav.Link>
                                </Nav.Item>
                            </Nav>
                            <Tab.Content>
                                <Tab.Pane eventKey='Open'>
                                    <div className="row">
                                        {Reuirments.map((e, index) =>
                                            <div className='col-lg-6' key={index}>
                                                <div className='card rounded-16 p-3 my-3'>
                                                    <div className="d-flex align-items-center justify-content-between flex-wrap">
                                                        <div className="d-flex align-items-center justify-content-between">
                                                            <div className='max-w-40 w-100 h-40 rounded-5 overflow-hidden'>
                                                                <ImgTag
                                                                    src={ProfilePictureTwo}
                                                                    alt={'profile'}
                                                                    classes={'img-fluid'}
                                                                />
                                                            </div>
                                                            <div className='ms-2 w-100'>
                                                                <PTag
                                                                    classes={'text-dark-blue fw-bold fn-16'}
                                                                    texts={'Harsh Mehta'}
                                                                />
                                                                <div className='d-flex align-items-center'>
                                                                    <PTag
                                                                        classes={'text-dark-blue me-1'}
                                                                        texts={'Project Titil'}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex align-items-center text-green mt-2 mt-sm-0">
                                                            <Alaramicon width={'24'} opacityFill={'#31ad76'} stroke={'#31ad76'} />
                                                            <PTag classes={'px-2'} texts={'Expiry Date - 27 Oct, 2021'} />
                                                        </div>
                                                    </div>
                                                    <div className='mt-4 mx-auto'>
                                                        <ButtonTag
                                                            classes={'btn-green semibold fn-12 rounded'}
                                                            value={'View Responses'}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey='Closed'>
                                    <div className="row">
                                        {Reuirments.map((e, index) =>
                                            <div className='col-lg-6' key={index}>
                                                <div className='card rounded-16 p-3 my-3'>
                                                    <div className="d-flex align-items-center justify-content-between flex-wrap">
                                                        <div className="d-flex align-items-center justify-content-between">
                                                            <div className='max-w-40 w-100 h-40 rounded-5 overflow-hidden'>
                                                                <ImgTag
                                                                    src={ProfilePictureTwo}
                                                                    alt={'profile'}
                                                                    classes={'img-fluid'}
                                                                />
                                                            </div>
                                                            <div className='ms-2 w-100'>
                                                                <PTag
                                                                    classes={'text-dark-blue fw-bold fn-16'}
                                                                    texts={'Harsh Mehta'}
                                                                />
                                                                <div className='d-flex align-items-center'>
                                                                    <PTag
                                                                        classes={'text-dark-blue me-1'}
                                                                        texts={'Project Titil'}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex align-items-center text-green mt-2 mt-sm-0">
                                                            <Alaramicon width={'24'} opacityFill={'#31ad76'} stroke={'#31ad76'} />
                                                            <PTag classes={'px-2'} texts={'Expiry Date - 27 Oct, 2021'} />
                                                        </div>
                                                    </div>
                                                    <div className='mt-4 mx-auto'>
                                                        <ButtonTag
                                                            classes={'btn-orange semibold fn-12 rounded'}
                                                            value={'Edit Requirement'}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey='Draft'>
                                    <div className="row">
                                        {Reuirments.map((e, index) =>
                                            <div className='col-lg-6' key={index}>
                                                <div className='card rounded-16 p-3 my-3'>
                                                    <div className="d-flex align-items-center justify-content-between flex-wrap">
                                                        <div className="d-flex align-items-center justify-content-between">
                                                            <div className='max-w-40 w-100 h-40 rounded-5 overflow-hidden'>
                                                                <ImgTag
                                                                    src={ProfilePictureTwo}
                                                                    alt={'profile'}
                                                                    classes={'img-fluid'}
                                                                />
                                                            </div>
                                                            <div className='ms-2 w-100'>
                                                                <PTag
                                                                    classes={'text-dark-blue fw-bold fn-16'}
                                                                    texts={'Harsh Mehta'}
                                                                />
                                                                <div className='d-flex align-items-center'>
                                                                    <PTag
                                                                        classes={'text-dark-blue me-1'}
                                                                        texts={'Project Titil'}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex align-items-center text-green mt-2 mt-sm-0">
                                                            <Alaramicon width={'24'} opacityFill={'#31ad76'} stroke={'#31ad76'} />
                                                            <PTag classes={'px-2'} texts={'Expiry Date - 27 Oct, 2021'} />
                                                        </div>
                                                    </div>
                                                    <div className='mt-4 mx-auto'>
                                                        <ButtonTag
                                                            classes={'btn-orange semibold fn-12 rounded '}
                                                            value={'Resume Editing'}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </Tab.Pane>
                            </Tab.Content>
                        </Tab.Container>
                    </div>
                </div>
            </div>
        </>
    )
}
