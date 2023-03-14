import React from 'react'
import { useState } from 'react'
import { MdDelete } from 'react-icons/md'
import { Edit, RightChevron } from '../AllSvgs'
import { ATag, ImgTag, LabelTag, PTag } from '../designComponents/MicroComponents'

const BookingCard = ({ className, booking, upcoming = false, canceledBooking }) => {
    const [cancelModel, setCancelModel] = useState(false)
    return (
        <div className={`${className}`}>
            <div className=''>
                <div className="card rounded-16 position-relative p-3 mb-3">
                    <div className="d-flex align-items-center mb-3">
                        <div className="w-80 min-w-80 h-80 rounded-10 overflow-hidden">
                            <ImgTag
                                src={booking?.sellerDetail?.profileImageUrl}
                                alt={"profile"}
                                classes={"w-100 h-100 object-fit-cover"}
                            />
                        </div>
                        <div className="ms-3">
                            <PTag
                                classes={
                                    "text-dark-blue fw-bold fn-16 mb-2"
                                }
                                texts={booking?.sellerDetail?.firstName + " " + booking?.sellerDetail?.lastName}
                            />
                            <PTag
                                classes={"text-dark-gray"}
                                texts={booking?.categoryName + ' > ' + booking?.subCategoryName + (booking?.subSubCategoryName ? (' > ' + booking?.subSubCategoryName) : '')}
                            />
                        </div>
                        {upcoming &&
                            <div className="d-flex ml-auto gap-2" title='cancel' onClick={() => canceledBooking(booking?.profileOrderId)}>
                                <MdDelete className={"Md-Delete"} />
                            </div>
                        }
                    </div>
                    <div>
                        <div className="mb-3">
                            <LabelTag
                                classes={"text-gray fn-14 mb-1"}
                                text={"Location"}
                            />
                            <PTag
                                classes={"text-dark-blue"}
                                texts={
                                    "Myna Villas S N 28 C NO 15, TAJ COTTAGES, FRICHALLY HILLS, 410401 Lonavala,"
                                }
                            />
                        </div>
                        <div className="mb-3">
                            <LabelTag
                                classes={"text-gray fn-14 mb-1"}
                                text={"Scheduled For"}
                            />
                            <PTag
                                classes={"text-dark-blue"}
                                texts={booking?.startDate + ' to ' + booking?.endDate}
                            />
                        </div>
                        <div className="mb-3">
                            <LabelTag
                                classes={"text-gray fn-14 mb-1"}
                                text={"Recce Type"}
                            />
                            <PTag
                                classes={"text-dark-blue"}
                                texts={"Virtual Live Recce"}
                            />
                        </div>
                        <div>
                            <LabelTag
                                classes={"text-gray fn-14 mb-2"}
                                text={"Booked by"}
                            />
                            <div className="d-flex align-items-center">
                                <div className="w-40 h-40 rounded-5 overflow-hidden">
                                    <ImgTag
                                        src={booking?.buyerDetail?.profileImageUrl}
                                        alt={"profile"}
                                        classes={"w-100 h-100 object-fit-cover"}
                                    />
                                </div>
                                <PTag
                                    classes={
                                        "text-dark-blue fw-bold ms-2"
                                    }
                                    texts={booking?.buyerDetail?.firstName + " " + booking?.buyerDetail?.lastName}
                                />
                                <div className='ml-auto pointer' title='call'>
                                    <PTag
                                        classes={
                                            "text-dark-blue fw-bold me-2 d-inline-block"
                                        }
                                        texts={`Call`}
                                    />
                                    <RightChevron
                                        stroke={"#1A3556"}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookingCard