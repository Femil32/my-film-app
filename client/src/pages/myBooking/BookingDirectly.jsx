import React from 'react'
import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { ImageNine } from '../../assets/img'
import { Info } from '../../components/AllSvgs'
import { BackButton, ImgTag, PTag } from '../../components/designComponents/MicroComponents'
import TotalViewCart from '../totalViewCart'
//icons
import { MdDelete, MdLocationOn } from 'react-icons/md'
import { FiChevronDown } from 'react-icons/fi'

export default function BookingDirectly() {

    const navigation = useNavigate()

    return (
        <>
            <div className="container position-relative">
                <div className="">
                    <BackButton
                        title={'Book Recce'}
                        onClick={() => {
                            navigation('/dashboard/bookrecce')
                        }}
                    />
                </div>
                <div className="row max-w-625 mx-auto">
                    <div className="">
                        <PTag classes={'text-dark-blue fw-bold fn-18 my-3'} texts={'Per Recorded Recce'} />
                        <div className="card rounded-10 p-3">
                            <div className="d-flex align-items-center">
                                <div className="w-65 h-60 overflow-hidden rounded-10">
                                    <ImgTag src={ImageNine} />
                                </div>
                                <div className="d-flex justify-content-between align-items-center w-100 ms-3">
                                    <div>
                                        <PTag classes={'text-dark-blue fw-bold '} texts={'Manya Row'} />
                                        <PTag classes={'mt-0'} texts={'Sub Category'} />
                                    </div>
                                    <div>
                                        <MdDelete className={'Md-Delete'} />
                                    </div>
                                </div>
                            </div>
                            <div className='mt-3 d-flex align-items-center mx-auto'>
                                <MdLocationOn fontSize={25} fill={'rgb(135 146 160)'} />
                                <PTag classes={'fn-12'} texts={'Myna Villas S N 28 C NO 15, TAJ COTTAGES,FRICHALLY HILLS, 410401 Lonavala,'} />
                            </div>
                        </div>
                        <div className="d-flex align-items-center my-3">
                            <Info width={'24'} stroke={'#557DF3'} />
                            <PTag classes={'fn-12 ms-2'} texts={'A link will be available to you in 3 working days'} />
                        </div>
                        <div className="border-bottom">
                            <PTag classes={'text-dark-blue fw-bold fn-18 my-3'} texts={'Order Summary'} />
                            <div className="d-flex algn-items-center justify-content-between mb-2">
                                <PTag texts={'Advanch (20%)'} />
                                <PTag texts={'₹20,000'} />
                            </div>
                            <div className="d-flex algn-items-center justify-content-between mb-2">
                                <PTag texts={'on Delivery (5%)'} />
                                <PTag texts={'₹20,000'} />
                            </div>
                            <div className="d-flex algn-items-center justify-content-between mb-2">
                                <PTag texts={'Credit Period'} />
                                <PTag texts={'20 Day'} />
                            </div>
                            <div className="d-flex algn-items-center justify-content-between mb-2">
                                <PTag texts={'GST/Texts'} />
                                <PTag texts={'(20%)'} />
                            </div>
                            <div className="d-flex algn-items-center justify-content-between mb-2">
                                <PTag texts={'TDS (20%)'} />
                                <div className="p-2 bg-white box-shadow rounded d-flex align-items-center">
                                    <PTag classes={'me-2'} texts={'5%'} />
                                    <FiChevronDown className={'Fi-ChevronDown'} />
                                </div>
                            </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-between pb-2 border-bottom mb-4">
                            <PTag classes={'text-dark-blue fw-bold fn-18 my-3'} texts={'Total'} />
                            <PTag classes={'text-dark-blue fw-bold fn-18 my-3'} texts={'₹25,000'} />
                        </div>
                    </div>
                </div>
                <div className="max-w-625 mx-auto position-fixed start-0 end-0 bottom-0 mb-3">
                    <TotalViewCart texts={'Pay Now'} />
                </div>
            </div>
        </>
    )
}
