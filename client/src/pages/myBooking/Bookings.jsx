import React, { useEffect, useState } from "react";
import { Nav, Tab } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import {
    BackButton, PTag, RedirectCard
} from "../../components/designComponents/MicroComponents";

import { canceleBooking, getUpcomingBookings, getOngoingBookings, getCompletedBookings, getCancelledBookings } from "../../store/booking/slice";

import { useDispatch, useSelector } from "react-redux";

//icons
import { MdOutlineFilterList } from "react-icons/md";
import InfiniteScroll from "react-infinite-scroll-component";
import BookingCard from "../../components/common/BookingCard";
import MiniLoader from "../../components/customLoader/MiniLoader";
import BottomSheetDialog from "../sellerConfirmedAvailability/BottomSheetDialog";
import CancelOrder from "../sellerConfirmedAvailability/CancelOrder";

const Bookings = () => {
    const navigation = useNavigate();
    const [show, setShow] = useState(false);
    const [open, setOpen] = useState(false);

    const dispatch = useDispatch();

    const { status, upcomingBookings, ongoingBookings, completedBookings, cancelledBookings } = useSelector((state) => state.booking);

    const [selectedType, setSelectedType] = useState("upcoming");
    const [isMiniloading, setIsMiniloading] = useState(true)

    const [currentPage, setCurrentPage] = useState({
        upcoming: 0,
        ongoing: 0,
        completed: 0,
        cancelled: 0, 
    })

    const fetchBookings = (selectedType) => {

        switch (selectedType) {
            case "upcoming":
                dispatch(getUpcomingBookings(0))
                break;
            case "ongoing":
                dispatch(getOngoingBookings(0))
                break;
            case "completed":
                dispatch(getCompletedBookings(0))
                break;
            case "cancelled":
                dispatch(getCancelledBookings(0))
                break;
        }
    }

    useEffect(() => {
        fetchBookings(selectedType)
    }, [selectedType])

    useEffect(() => {
        status === 'loading' ? setIsMiniloading(true) : setIsMiniloading(false)
    }, [status])


    const DeleteAlert = (idndex) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(res => {
            if (res.isConfirmed) {
                Promise.all([dispatch(canceleBooking(id))]).then((res) => {
                    fetchBookings(selectedType)
                })
            }
        });
    };

    return (
        <>
            <div className="container">
                <div className="d-flex justify-content-between mt-5 mb-3">
                    <div className="d-flex align-items-center ">
                        <BackButton
                            textClass={"fn-20"}
                            title={`${selectedType} Bookings`}
                            onClick={() => {
                                navigation("/dashboard");
                            }}
                        />
                    </div>
                    <div>
                        <div
                            className="d-flex align-items-center pointer filter-button"
                            onClick={() => setShow(true)}
                        >
                            <MdOutlineFilterList fontSize={22} />
                            <PTag classes={"text-dark-blue mx-2"} texts={"Filter"} />
                            <PTag
                                classes={
                                    "bg-navy-blue text-white rounded-circle w-30 h-30 d-flex mt-0 justify-content-center align-items-center"
                                }
                                texts={"2"}
                            />
                        </div>
                    </div>
                </div>
                <div className="border-teb">
                    <Tab.Container
                        id="Bookings"
                        className="justify-content-sm-center justify-content-strat"
                        defaultActiveKey={'upcoming'}
                        onSelect={(e) => {
                            if (selectedType !== e.toLowerCase()) {
                                setSelectedType(e.toLowerCase());
                                setCurrentPage({
                                    upcoming: 0,
                                    ongoing: 0,
                                    completed: 0,
                                    cancelled: 0,
                                })
                            }
                        }}
                    >
                        <Nav variant="pills">
                            <Nav.Item className="pointer me-sm-4 me-2">
                                <Nav.Link eventKey="upcoming">Upcoming</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="pointer mx-sm-4 me-2">
                                <Nav.Link eventKey="ongoing">Ongoing</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="pointer mx-sm-4 me-2">
                                <Nav.Link eventKey="completed">Completed</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="pointer ms-sm-4">
                                <Nav.Link eventKey="cancelled">Cancelled</Nav.Link>
                            </Nav.Item>
                        </Nav>

                        <Tab.Content className="my-3">
                            <Tab.Pane eventKey="upcoming" className="row">
                                {selectedType == 'upcoming' && <InfiniteScroll
                                    className='row hide-scroll'
                                    dataLength={upcomingBookings?.bookings?.length ?? 10} //This is important field to render the next data
                                    next={() => {
                                        setCurrentPage(prev => ({ ...prev, upcoming: prev.upcoming + 1 }))
                                        dispatch(getUpcomingBookings(currentPage.upcoming + 1))
                                    }}
                                    loader={<MiniLoader className={'w-100 h-100'} />}
                                    hasMore={!(upcomingBookings?.totalPages === upcomingBookings?.currentpage + 1 || upcomingBookings?.totalPages === 0)}
                                    endMessage={
                                        upcomingBookings?.bookings?.length > 0 && <p style={{ textAlign: 'center' }}>
                                            <b>Yay! You have seen it all</b>
                                        </p>
                                    }
                                >
                                    {upcomingBookings?.bookings?.length ? upcomingBookings?.bookings.map((booking, index) =>
                                        <BookingCard
                                            booking={booking}
                                            key={index}
                                            className={'col-4'}
                                            upcoming={true}
                                            canceledBooking={() => DeleteAlert(booking?.profileOrderId, index)}
                                        />
                                    ) : <RedirectCard text={'No upcoming Bookings'} label={'Add Bookings'} />}
                                </InfiniteScroll>}
                            </Tab.Pane>
                            <Tab.Pane eventKey="ongoing">
                                {selectedType == 'ongoing' && <InfiniteScroll
                                    className='row hide-scroll'
                                    dataLength={ongoingBookings?.bookings?.length ?? 10} //This is important field to render the next data
                                    next={() => {
                                        setCurrentPage(prev => ({ ...prev, ongoing: prev.ongoing + 1 }))
                                        dispatch(getOngoingBookings(currentPage.ongoing + 1))
                                    }}
                                    loader={<MiniLoader className={'w-100 h-100'} />}
                                    hasMore={!(ongoingBookings?.totalPages === ongoingBookings?.currentpage + 1 || ongoingBookings?.totalPages === 0)}
                                    endMessage={
                                        ongoingBookings?.bookings?.length > 0 && <p style={{ textAlign: 'center' }}>
                                            <b>Yay! You have seen it all</b>
                                        </p>
                                    }
                                >
                                    {ongoingBookings?.bookings?.length ? ongoingBookings?.bookings.map((booking, index) => {
                                        return (
                                            <BookingCard
                                                booking={booking}
                                                key={index}
                                                className={'col-4'}
                                                ongoing={true}
                                                canceledBooking={() => DeleteAlert(booking?.profileOrderId)}
                                            />
                                        )
                                    }) : <RedirectCard text={'No ongoing Bookings'} label={'Add Bookings'} />}
                                </InfiniteScroll>}
                            </Tab.Pane>
                            <Tab.Pane eventKey="completed">
                                {selectedType == 'completed' && <InfiniteScroll
                                    className='row hide-scroll'
                                    dataLength={completedBookings?.bookings?.length ?? 10} //This is important field to render the next data
                                    next={() => {
                                        setCurrentPage(prev => ({ ...prev, completed: prev.completed + 1 }))
                                        dispatch(getCompletedBookings(currentPage.completed + 1))
                                    }}
                                    loader={<MiniLoader className={'w-100 h-100'} />}
                                    hasMore={!(completedBookings?.totalPages === completedBookings?.currentpage + 1 || completedBookings?.totalPages === 0)}
                                    endMessage={
                                        completedBookings?.bookings?.length > 0 && <p style={{ textAlign: 'center' }}>
                                            <b>Yay! You have seen it all</b>
                                        </p>
                                    }
                                >
                                    {completedBookings?.bookings?.length ? completedBookings?.bookings.map((booking, index) => {
                                        return (
                                            <BookingCard
                                                booking={booking}
                                                key={index}
                                                className={'col-4'}
                                                completed={true}
                                                canceledBooking={() => DeleteAlert(booking?.profileOrderId)}
                                            />
                                        )
                                    }) : <RedirectCard text={'No completed Bookings'} label={'Add Bookings'} />}
                                </InfiniteScroll>}
                            </Tab.Pane>
                            <Tab.Pane eventKey="cancelled">
                                {selectedType == 'cancelled' && <InfiniteScroll
                                    className='row hide-scroll'
                                    dataLength={cancelledBookings?.bookings?.length ?? 10} //This is important field to render the next data
                                    next={() => {
                                        setCurrentPage(prev => ({ ...prev, cancelled: prev.cancelled + 1 }))
                                        dispatch(getCancelledBookings(currentPage.cancelled + 1))
                                    }}
                                    loader={<MiniLoader className={'w-100 h-100'} />}
                                    hasMore={!(cancelledBookings?.totalPages === cancelledBookings?.currentpage + 1 || cancelledBookings?.totalPages === 0)}
                                    endMessage={
                                        cancelledBookings?.bookings?.length > 0 && <p style={{ textAlign: 'center' }}>
                                            <b>Yay! You have seen it all</b>
                                        </p>
                                    }
                                >
                                    {cancelledBookings?.bookings?.length ? cancelledBookings?.bookings.map((booking, index) => {
                                        return (
                                            <BookingCard
                                                booking={booking}
                                                key={index}
                                                className={'col-4'}
                                                cancelled={true}
                                                canceledBooking={() => DeleteAlert(booking?.profileOrderId)}
                                            />
                                        )
                                    }) : <RedirectCard text={'No cancelled Bookings'} label={'Add Bookings'} />}
                                </InfiniteScroll>}
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>

                    <BottomSheetDialog show={show} setShow={setShow} />
                    <CancelOrder show={open} setOpen={setOpen} />
                </div>
            </div>
        </>
    );
};

export default Bookings;
