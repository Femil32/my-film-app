import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { StarIcon } from '../../assets/img'
//icons
import { MdClose } from 'react-icons/md'
import { ButtonTag, ImgTag, MultiLineInputTag, PTag } from '../../components/designComponents/MicroComponents'

export default function ReviewCard({ show, setShow }) {


    return (
        <>

            <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName='modal-dialog-scrollable'
            >
                <div
                    className='text-white fs-4 bg-navy-blue w50 h50 d-flex justify-content-center align-items-center rounded-circle pointer close-icon'
                    onClick={() => setShow(false)}
                >
                    <MdClose fontSize={30} className={'Md-Close'} />
                </div>
                <Modal.Body>
                    <div className="">
                        <PTag classes={'text-dark-blue fn-22 fw-bold text-center my-2'} texts={'Add Review'} />
                    </div>
                    <div className="">
                        <PTag classes={'text-dark-blue fn-18 fw-bold'} texts={'Rate inventory'} />
                        <div className="d-flex align-items-center mb-4 mt-2">
                            <div className="w-20 h-20 overflow-hidden">
                                <ImgTag src={StarIcon} alt='star'
                                    classes='img-fluid w-100 h-100' />
                            </div>
                            <div className="w-20 h-20 overflow-hidden">
                                <ImgTag src={StarIcon} alt='star'
                                    classes='img-fluid w-100 h-100' />
                            </div>
                            <div className="w-20 h-20 overflow-hidden">
                                <ImgTag src={StarIcon} alt='star'
                                    classes='img-fluid w-100 h-100' />
                            </div>
                            <div className="w-20 h-20 overflow-hidden">
                                <ImgTag src={StarIcon} alt='star'
                                    classes='img-fluid w-100 h-100' />
                            </div>
                            <div className="w-20 h-20 overflow-hidden">
                                <ImgTag src={StarIcon} alt='star'
                                    classes='img-fluid w-100 h-100' />
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <PTag classes={'text-dark-blue fn-18 fw-bold'} texts={'Rate Seller'} />
                        <div className="d-flex align-items-center mb-4 mt-2">
                            <div className="w-20 h-20 overflow-hidden">
                                <ImgTag src={StarIcon} alt='star'
                                    classes='img-fluid w-100 h-100' />
                            </div>
                            <div className="w-20 h-20 overflow-hidden">
                                <ImgTag src={StarIcon} alt='star'
                                    classes='img-fluid w-100 h-100' />
                            </div>
                            <div className="w-20 h-20 overflow-hidden">
                                <ImgTag src={StarIcon} alt='star'
                                    classes='img-fluid w-100 h-100' />
                            </div>
                            <div className="w-20 h-20 overflow-hidden">
                                <ImgTag src={StarIcon} alt='star'
                                    classes='img-fluid w-100 h-100' />
                            </div>
                            <div className="w-20 h-20 overflow-hidden">
                                <ImgTag src={StarIcon} alt='star'
                                    classes='img-fluid w-100 h-100' />
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <MultiLineInputTag placeholder={"Write Your Review"} />
                    </div>
                    <div className="d-flex justify-content-center mt-4">
                        <ButtonTag classes={'btn btn-orange w-100'} value={'Continue'} />
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}
