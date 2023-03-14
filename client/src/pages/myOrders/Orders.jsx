import React, { useEffect, useState } from "react";
import { Nav, Tab } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import {
    BackButton, PTag, RedirectCard
} from "../../components/designComponents/MicroComponents";

import { canceleOrder, getUpcomingOrders, getOngoingOrders, getCompletedOrders, getCancelledOrders } from "../../store/order/slice";

import { useDispatch, useSelector } from "react-redux";

//icons
import { MdOutlineFilterList } from "react-icons/md";
import InfiniteScroll from "react-infinite-scroll-component";
import OrderCard from "../../components/common/OrderCard";
import MiniLoader from "../../components/customLoader/MiniLoader";
import BottomSheetDialog from "../sellerConfirmedAvailability/BottomSheetDialog";
import CancelOrder from "../sellerConfirmedAvailability/CancelOrder";

const Orders = () => {
    const navigation = useNavigate();
    const [show, setShow] = useState(false);
    const [open, setOpen] = useState(false);

    const dispatch = useDispatch();

    const { status, upcomingOrders, ongoingOrders, completedOrders, cancelledOrders } = useSelector((state) => state.order);

    const [selectedType, setSelectedType] = useState("upcoming");
    const [isMiniloading, setIsMiniloading] = useState(true)

    const [currentPage, setCurrentPage] = useState({
        upcoming: 0,
        ongoing: 0,
        completed: 0,
        cancelled: 0,
    })

    const fetchOrders = (selectedType) => {

        switch (selectedType) {
            case "upcoming":
                dispatch(getUpcomingOrders(0))
                break;
            case "ongoing":
                dispatch(getOngoingOrders(0))
                break;
            case "completed":
                dispatch(getCompletedOrders(0))
                break;
            case "cancelled":
                dispatch(getCancelledOrders(0))
                break;
        }
    }

    useEffect(() => {
        fetchOrders(selectedType)
    }, [selectedType])

    useEffect(() => {
        status === 'loading' ? setIsMiniloading(true) : setIsMiniloading(false)
    }, [status])


    const DeleteAlert = (id, index) => {
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
                Promise.all([dispatch(canceleOrder(id))]).then((res) => {
                    fetchOrders(selectedType)
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
                            title={`${selectedType} Orders`}
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
                        id="Orders"
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
                                    dataLength={upcomingOrders?.orders?.length ?? 10} //This is important field to render the next data
                                    next={() => {
                                        setCurrentPage(prev => ({ ...prev, upcoming: prev.upcoming + 1 }))
                                        dispatch(getUpcomingOrders(currentPage.upcoming + 1))
                                    }}
                                    loader={<MiniLoader className={'w-100 h-100'} />}
                                    hasMore={!(upcomingOrders?.totalPages === upcomingOrders?.currentpage + 1 || upcomingOrders?.totalPages === 0)}
                                    endMessage={
                                        upcomingOrders?.orders?.length > 0 && <p style={{ textAlign: 'center' }}>
                                            <b>Yay! You have seen it all</b>
                                        </p>
                                    }
                                >
                                    {upcomingOrders?.orders?.length ? upcomingOrders?.orders.map((order, index) => {
                                        return (
                                            <OrderCard
                                                order={order}
                                                key={index}
                                                className={'col-4'}
                                                upcoming={true}
                                                canceledOrder={() => DeleteAlert(order?.profileOrderId, index)}
                                            />
                                        )
                                    }) : <RedirectCard text={'No upcoming Orders'} label={'Add Orders'} />}
                                </InfiniteScroll>}
                            </Tab.Pane>
                            <Tab.Pane eventKey="ongoing">
                                {selectedType == 'ongoing' && <InfiniteScroll
                                    className='row hide-scroll'
                                    dataLength={ongoingOrders?.orders?.length ?? 10} //This is important field to render the next data
                                    next={() => {
                                        setCurrentPage(prev => ({ ...prev, ongoing: prev.ongoing + 1 }))
                                        dispatch(getOngoingOrders(currentPage.ongoing + 1))
                                    }}
                                    loader={<MiniLoader className={'w-100 h-100'} />}
                                    hasMore={!(ongoingOrders?.totalPages === ongoingOrders?.currentpage + 1 || ongoingOrders?.totalPages === 0)}
                                    endMessage={
                                        ongoingOrders?.orders?.length > 0 && <p style={{ textAlign: 'center' }}>
                                            <b>Yay! You have seen it all</b>
                                        </p>
                                    }
                                >
                                    {ongoingOrders?.orders?.length ? ongoingOrders?.orders.map((order, index) => {
                                        return (
                                            <OrderCard
                                                order={order}
                                                key={index}
                                                className={'col-4'}
                                                ongoing={true}
                                                canceledOrder={() => DeleteAlert(order?.profileOrderId)}
                                            />
                                        )
                                    }) : <RedirectCard text={'No ongoing Orders'} label={'Add Orders'} />}
                                </InfiniteScroll>}
                            </Tab.Pane>
                            <Tab.Pane eventKey="completed">
                                {selectedType == 'completed' && <InfiniteScroll
                                    className='row hide-scroll'
                                    dataLength={completedOrders?.orders?.length ?? 10} //This is important field to render the next data
                                    next={() => {
                                        setCurrentPage(prev => ({ ...prev, completed: prev.completed + 1 }))
                                        dispatch(getCompletedOrders(currentPage.completed + 1))
                                    }}
                                    loader={<MiniLoader className={'w-100 h-100'} />}
                                    hasMore={!(completedOrders?.totalPages === completedOrders?.currentpage + 1 || completedOrders?.totalPages === 0)}
                                    endMessage={
                                        completedOrders?.orders?.length > 0 && <p style={{ textAlign: 'center' }}>
                                            <b>Yay! You have seen it all</b>
                                        </p>
                                    }
                                >
                                    {completedOrders?.orders?.length ? completedOrders?.orders.map((order, index) => {
                                        return (
                                            <OrderCard
                                                order={order}
                                                key={index}
                                                className={'col-4'}
                                                completed={true}
                                                canceledOrder={() => DeleteAlert(order?.profileOrderId)}
                                            />
                                        )
                                    }) : <RedirectCard text={'No completed Orders'} label={'Add Orders'} />}
                                </InfiniteScroll>}
                            </Tab.Pane>
                            <Tab.Pane eventKey="cancelled">
                                {selectedType == 'cancelled' && <InfiniteScroll
                                    className='row hide-scroll'
                                    dataLength={cancelledOrders?.orders?.length ?? 10} //This is important field to render the next data
                                    next={() => {
                                        setCurrentPage(prev => ({ ...prev, cancelled: prev.cancelled + 1 }))
                                        dispatch(getCancelledOrders(currentPage.cancelled + 1))
                                    }}
                                    loader={<MiniLoader className={'w-100 h-100'} />}
                                    hasMore={!(cancelledOrders?.totalPages === cancelledOrders?.currentpage + 1 || cancelledOrders?.totalPages === 0)}
                                    endMessage={
                                        cancelledOrders?.orders?.length > 0 && <p style={{ textAlign: 'center' }}>
                                            <b>Yay! You have seen it all</b>
                                        </p>
                                    }
                                >
                                    {cancelledOrders?.orders?.length ? cancelledOrders?.orders.map((order, index) => {
                                        return (
                                            <OrderCard
                                                order={order}
                                                key={index}
                                                className={'col-4'}
                                                cancelled={true}
                                                canceledOrder={() => DeleteAlert(order?.profileOrderId)}
                                            />
                                        )
                                    }) : <RedirectCard text={'No cancelled Orders'} label={'Add Orders'} />}
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

export default Orders;
