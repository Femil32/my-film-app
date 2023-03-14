import React, { useEffect, useState } from "react";
import { Accordion, Nav, Tab } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ProfilePictureTwo } from "../../assets/img";
import {
  ATag,
  BackButton,
  ImgTag,
  LabelTag,
  PTag,
} from "../../components/designComponents/MicroComponents";
import IsLoadingHOC from "../../components/higherOrderLoader/IsLoadingHOC";
//icons
import { FiCalendar } from "react-icons/fi";
import { MdLocationOn } from "react-icons/md";
import MiniLoader from "../../components/customLoader/MiniLoader";

import {
  acceptBookingRequest,
  getAllBookingRequestlist,
  rejectBookingRequest,
} from "./../../store/sellerbookingrequest/slice";
import InfiniteScroll from "react-infinite-scroll-component";

const PendingRequest = ({ setLoading }) => {
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const [isMiniLoading, setIsMiniLoading] = useState({
    pandingLoading: false,
    confirmedLoading: false,
    rejectedLoading: false,
  });

  const [currentTab, setCurrentTab] = useState("Pending");

  const [pandingData, setPandingData] = useState([]);
  const [confirmedData, setConfirmedData] = useState([]);
  const [rejectedData, setRejectedData] = useState([]);

  const [currrentPage, setCurrrentPage] = useState({
    Pending: 0,
    accepted: 0,
    Rejected: 0,
  });

  const fetchSearchData = (searchString) => {
    let params = {
      currrentPage:
        currentTab === "Pending"
          ? currrentPage.Pending
          : currentTab === "Confirmed"
          ? currrentPage.accepted
          : currentTab === "Rejected"
          ? currrentPage.Rejected
          : 0,
      status:
        searchString === "Confirmed" ? "accepted" : searchString.toLowerCase(),
    };

    switch (searchString) {
      case "Pending":
        if (pandingData?.length == 0) {
          setIsMiniLoading({ ...isMiniLoading, pandingLoading: true });
          dispatch(getAllBookingRequestlist(params))
            .then((res) => {
              setPandingData(res?.payload?.data?.bookings);
            })
            .finally(() =>
              setIsMiniLoading({ ...isMiniLoading, pandingLoading: false })
            );
        }
        break;
      case "Confirmed":
        if (confirmedData?.length == 0) {
          setIsMiniLoading({ ...isMiniLoading, confirmedLoading: true });
          dispatch(getAllBookingRequestlist(params))
            .then((res) => {
              setConfirmedData(res?.payload?.data?.bookings);
            })
            .finally(() =>
              setIsMiniLoading({ ...isMiniLoading, confirmedLoading: false })
            );
        }
        break;
      case "Rejected":
        if (rejectedData?.length == 0) {
          setIsMiniLoading({ ...isMiniLoading, rejectedLoading: true });
          dispatch(getAllBookingRequestlist(params))
            .then((res) => {
              setRejectedData(res?.payload?.data?.bookings);
            })
            .finally(() =>
              setIsMiniLoading({ ...isMiniLoading, rejectedLoading: false })
            );
        }
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    Promise.all([fetchSearchData("Pending")]).finally(() => {
      setLoading(false);
    });
  }, []);

  return (
    <>
      <div className="container">
        <BackButton
          title={"Pending Booking Requests"}
          onClick={() => {
            navigation("/dashboard");
          }}
        />
        <div className="border-teb mt-3">
          <Tab.Container
            id="PendingRequest"
            defaultActiveKey={"Pending"}
            onSelect={(e) => {
              if (e !== currentTab) {
                setCurrentTab(e);
                fetchSearchData(e);
                setCurrrentPage({
                  Pending: 0,
                  accepted: 0,
                  Rejected: 0,
                });
              }
            }}
          >
            <Nav variant="pills">
              <Nav.Item className="pointer me-sm-2">
                <Nav.Link eventKey="Pending">Pending</Nav.Link>
              </Nav.Item>
              <Nav.Item className="pointer mx-sm-2">
                <Nav.Link eventKey="Confirmed">Confirmed</Nav.Link>
              </Nav.Item>
              <Nav.Item className="pointer ms-sm-2">
                <Nav.Link eventKey="Rejected">Rejected</Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey="Pending">
                <div className="remove-padding-arrow-accordion">
                  {isMiniLoading.pandingLoading ? (
                    <MiniLoader className={"w-100 h-100"} />
                  ) : pandingData?.length > 0 ? (
                    <Accordion defaultActiveKey={0}>
                      <InfiniteScroll
                        className="row hide-scroll"
                        dataLength={pandingData?.length ?? 10} //This is important field to render the next data
                        next={() => {
                          setCurrrentPage((prev) => ({
                            ...prev,
                            currrentPage: prev.Pending + 1,
                          }));
                          dispatch(
                            getAllBookingRequestlist({
                              status: "pending",
                              currrentPage: currrentPage.Pending + 1,
                            })
                          );
                        }}
                        loader={<MiniLoader className={"w-100 h-100"} />}
                        hasMore={
                          pandingData?.totalPages ===
                            pandingData?.currrentPage + 1 ||
                          pandingData?.totalPages === 0
                        }
                        endMessage={
                          pandingData?.length > 0 && (
                            <p style={{ textAlign: "center" }}>
                              <b>Yay! You have seen it all</b>
                            </p>
                          )
                        }
                      >
                        {pandingData.map((element, index) => {
                          return (
                            <Accordion.Item
                              className="border-bottom my-2 remove-button-accordin"
                              key={index}
                              eventKey={index}
                            >
                              <div className="d-sm-flex align-items-center mb-3">
                                <Accordion.Header className="w-100">
                                  <div className="d-flex align-items-center justify-content-between flex-sm-nowrap flex-wrap ">
                                    <ImgTag
                                      src={element.sellerDetail.profileImageUrl}
                                      alt="profile"
                                      className="rounded-5 w-100 object-fit-cover"
                                      style={{
                                        maxWidth: "5rem",
                                        height: "6rem",
                                        minWidth: "5rem",
                                      }}
                                    />

                                    <div className="ms-2 w-100">
                                      <PTag
                                        classes={
                                          "text-dark-blue fw-bold fn-16 mb-2"
                                        }
                                        texts={`${
                                          element.sellerDetail.firstName +
                                          " " +
                                          element.sellerDetail.lastName
                                        }`}
                                      />
                                      <PTag
                                        classes={"text-dark-gray"}
                                        texts={`${JSON.stringify(
                                          element.profileType.split("/")
                                        )
                                          .replace("[", "")
                                          .replace("]", "")
                                          .replaceAll(",", ">")
                                          .replaceAll('"', "")}`}
                                      />
                                    </div>
                                  </div>
                                </Accordion.Header>
                                <div className="d-flex justify-content-sm-end justify-content-center accordion-buttons">
                                  <div className="">
                                    <ATag
                                      classes={
                                        "btn btn-outline-orange semibold fn-12 rounded white-space-nowrap w-100"
                                      }
                                      children={"Reject Booking"}
                                      onClick={() => {
                                        dispatch(
                                          rejectBookingRequest(
                                            element.profileOrderId
                                          )
                                        )
                                          .then((res) => {
                                            fetchSearchData("Pending");
                                          })
                                          .finally(() =>
                                            setIsMiniLoading({
                                              ...isMiniLoading,
                                              pandingLoading: false,
                                            })
                                          );
                                      }}
                                    />
                                  </div>
                                  <div className="ms-2">
                                    <ATag
                                      classes={
                                        "btn btn-green semibold fn-12 rounded white-space-nowrap w-100"
                                      }
                                      children={"Accept Booking"}
                                      onClick={() => {
                                        dispatch(
                                          acceptBookingRequest(
                                            element.profileOrderId
                                          )
                                        )
                                          .then((res) => {
                                            fetchSearchData("Pending");
                                          })
                                          .finally(() =>
                                            setIsMiniLoading({
                                              ...isMiniLoading,
                                              pandingLoading: false,
                                            })
                                          );
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                              <Accordion.Body>
                                <div className="card rounded-16 p-3 mb-3">
                                  <PTag
                                    classes={
                                      "text-dark-blue fn-18 fw-bold mb-3"
                                    }
                                    texts={"Project Title"}
                                  />
                                  <div className="mb-3">
                                    <LabelTag
                                      classes={"text-gray fn-14 mb-1"}
                                      text={"Locations"}
                                    />
                                    <div className="d-flex align-items-center">
                                      <MdLocationOn
                                        fontSize={25}
                                        fill={"#1A3556"}
                                      />
                                      <PTag
                                        classes={"text-dark-blue ms-1"}
                                        texts={"Mumbai, Shimla"}
                                      />
                                    </div>
                                  </div>
                                  <div className="mb-3">
                                    <LabelTag
                                      classes={"text-gray fn-14 mb-1"}
                                      text={"Scheduled For"}
                                    />
                                    <div className="d-flex align-items-center">
                                      <FiCalendar className={"Fi-Calendar"} />
                                      <PTag
                                        classes={"text-dark-blue ms-1"}
                                        texts={`Date 05th Apr'2021`}
                                      />
                                    </div>
                                  </div>
                                  <div className="mb-4">
                                    <LabelTag
                                      classes={"text-gray fn-14 mb-1"}
                                      text={"Scheduled For"}
                                    />
                                    <div className="d-flex align-items-center">
                                      <ImgTag
                                        src={
                                          element.sellerDetail.profileImageUrl
                                        }
                                        alt={"profile"}
                                        classes={
                                          "img-fluid w-40 h-40 rounded-5 overflow-hidden"
                                        }
                                      />
                                      <PTag
                                        classes={"text-dark-blue fw-bold ms-2"}
                                        texts={`${
                                          element.sellerDetail.firstName +
                                          " " +
                                          element.sellerDetail.lastName
                                        }`}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </Accordion.Body>
                            </Accordion.Item>
                          );
                        })}
                      </InfiniteScroll>
                    </Accordion>
                  ) : (
                    <div
                      className="w-100 d-flex align-items-center justify-content-center"
                      style={{ height: "300px" }}
                    >
                      <PTag
                        classes={"text-gray "}
                        texts={"No data found"}
                        style={{ height: "100px" }}
                      />
                    </div>
                  )}
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="Confirmed">
                <div className="remove-padding-arrow-accordion">
                  {isMiniLoading.confirmedLoading ? (
                    <MiniLoader className={"w-100 h-100"} />
                  ) : confirmedData?.length > 0 ? (
                    <Accordion defaultActiveKey={0}>
                      <InfiniteScroll
                        className="row hide-scroll"
                        dataLength={confirmedData?.length ?? 10} //This is important field to render the next data
                        next={() => {
                          setCurrrentPage((prev) => ({
                            ...prev,
                            currrentPage: prev.accepted + 1,
                          }));
                          dispatch(
                            getAllBookingRequestlist({
                              status: "accepted",
                              currrentPage: currrentPage.accepted + 1,
                            })
                          );
                        }}
                        loader={<MiniLoader className={"w-100 h-100"} />}
                        hasMore={
                          confirmedData?.totalPages ===
                            confirmedData?.currrentPage + 1 ||
                          confirmedData?.totalPages === 0
                        }
                        endMessage={
                          confirmedData?.length > 0 && (
                            <p style={{ textAlign: "center" }}>
                              <b>Yay! You have seen it all</b>
                            </p>
                          )
                        }
                      >
                        {confirmedData.map((element, index) => {
                          return (
                            <Accordion.Item
                              className="border-bottom my-2 remove-button-accordin"
                              key={index}
                              eventKey={index}
                            >
                              <div className="d-sm-flex align-items-center mb-3">
                                <Accordion.Header className="w-100">
                                  <div className="d-flex align-items-center justify-content-between flex-sm-nowrap flex-wrap w-100 mb-3">
                                    <ImgTag
                                      src={element.sellerDetail.profileImageUrl}
                                      alt="profile"
                                      className="rounded-5"
                                      style={{
                                        objectFit: "cover",
                                        width: "5rem",
                                        height: "6rem",
                                        minWidth: "5rem",
                                      }}
                                    />

                                    <div className="ms-2 w-100">
                                      <PTag
                                        classes={
                                          "text-dark-blue fw-bold fn-16 mb-2"
                                        }
                                        texts={`${
                                          element.sellerDetail.firstName +
                                          " " +
                                          element.sellerDetail.lastName
                                        }`}
                                      />
                                      <PTag
                                        classes={"text-dark-gray"}
                                        texts={`${JSON.stringify(
                                          element.profileType.split("/")
                                        )
                                          .replace("[", "")
                                          .replace("]", "")
                                          .replaceAll(",", ">")
                                          .replaceAll('"', "")}`}
                                      />
                                    </div>
                                  </div>
                                </Accordion.Header>
                                <div className="d-flex justify-content-sm-end justify-content-center">
                                  <ATag
                                    classes={
                                      "btn btn-outline-orange semibold fn-12 rounded white-space-nowrap"
                                    }
                                    children={"Reject Booking"}
                                  />
                                </div>
                              </div>
                              <Accordion.Body>
                                <div className="card rounded-16 p-3 mb-3">
                                  <PTag
                                    classes={
                                      "text-dark-blue fn-18 fw-bold mb-3"
                                    }
                                    texts={"Project Title"}
                                  />
                                  <div className="mb-3">
                                    <LabelTag
                                      classes={"text-gray fn-14 mb-1"}
                                      text={"Locations"}
                                    />
                                    <div className="d-flex align-items-center">
                                      <MdLocationOn
                                        fontSize={25}
                                        fill={"#1A3556"}
                                      />
                                      <PTag
                                        classes={"text-dark-blue ms-1"}
                                        texts={"Mumbai, Shimla"}
                                      />
                                    </div>
                                  </div>
                                  <div className="mb-3">
                                    <LabelTag
                                      classes={"text-gray fn-14 mb-1"}
                                      text={"Scheduled For"}
                                    />
                                    <div className="d-flex align-items-center">
                                      <FiCalendar className={"Fi-Calendar"} />
                                      <PTag
                                        classes={"text-dark-blue ms-1"}
                                        texts={`Date 05th Apr'2021`}
                                      />
                                    </div>
                                  </div>
                                  <div className="mb-4">
                                    <LabelTag
                                      classes={"text-gray fn-14 mb-1"}
                                      text={"Scheduled For"}
                                    />
                                    <div className="d-flex align-items-center">
                                      <ImgTag
                                        src={
                                          element.sellerDetail.profileImageUrl
                                        }
                                        alt={"profile"}
                                        classes={
                                          "img-fluid w-40 h-40 rounded-5 overflow-hidden"
                                        }
                                      />
                                      <PTag
                                        classes={"text-dark-blue fw-bold ms-2"}
                                        texts={`${
                                          element.sellerDetail.firstName +
                                          " " +
                                          element.sellerDetail.lastName
                                        }`}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </Accordion.Body>
                            </Accordion.Item>
                          );
                        })}
                      </InfiniteScroll>
                    </Accordion>
                  ) : (
                    <div
                      className="w-100 d-flex align-items-center justify-content-center"
                      style={{ height: "300px" }}
                    >
                      <PTag
                        classes={"text-gray "}
                        texts={"No data found"}
                        style={{ height: "100px" }}
                      />
                    </div>
                  )}
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="Rejected">
                <div className="remove-padding-arrow-accordion">
                  {isMiniLoading.rejectedLoading ? (
                    <MiniLoader className={"w-100 h-100"} />
                  ) : rejectedData?.length > 0 ? (
                    <Accordion defaultActiveKey="0">
                      <InfiniteScroll
                        className="row hide-scroll"
                        dataLength={rejectedData?.length ?? 10} //This is important field to render the next data
                        next={() => {
                          setCurrrentPage((prev) => ({
                            ...prev,
                            currrentPage: prev.rejected + 1,
                          }));
                          dispatch(
                            getAllBookingRequestlist({
                              status: "rejected",
                              currrentPage: currrentPage.rejected + 1,
                            })
                          );
                        }}
                        loader={<MiniLoader className={"w-100 h-100"} />}
                        hasMore={
                          rejectedData?.totalPages ===
                            rejectedData?.currrentPage + 1 ||
                          rejectedData?.totalPages === 0
                        }
                        endMessage={
                          rejectedData?.length > 0 && (
                            <p className="my-2" style={{ textAlign: "center" }}>
                              <b>Yay! You have seen it all</b>
                            </p>
                          )
                        }
                      >
                        {rejectedData.map((element, index) => {
                          return (
                            <Accordion.Item
                              className="border-bottom my-2"
                              eventKey="0"
                              key={index}
                            >
                              <Accordion.Header>
                                <div className="w-100">
                                  <div className="d-flex align-items-center mb-3">
                                    <ImgTag
                                      src={element.sellerDetail.profileImageUrl}
                                      alt="profile"
                                      className="rounded-5"
                                      style={{
                                        objectFit: "cover",
                                        width: "5rem",
                                        height: "6rem",
                                        minWidth: "5rem",
                                      }}
                                    />
                                    <div className="ms-2 w-100">
                                      <PTag
                                        classes={
                                          "text-dark-blue fw-bold fn-16 mb-2"
                                        }
                                        texts={`${
                                          element.sellerDetail.firstName +
                                          " " +
                                          element.sellerDetail.lastName
                                        }`}
                                      />
                                      <PTag
                                        classes={"text-dark-gray"}
                                        texts={`${JSON.stringify(
                                          element.profileType.split("/")
                                        )
                                          .replace("[", "")
                                          .replace("]", "")
                                          .replaceAll(",", ">")
                                          .replaceAll('"', "")}`}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </Accordion.Header>
                              <Accordion.Body>
                                <div className="card rounded-16 p-3 mb-3">
                                  <PTag
                                    classes={
                                      "text-dark-blue fn-18 fw-bold mb-3"
                                    }
                                    texts={"Project Title"}
                                  />
                                  <div className="mb-3">
                                    <LabelTag
                                      classes={"text-gray fn-14 mb-1"}
                                      text={"Locations"}
                                    />
                                    <div className="d-flex align-items-center">
                                      <MdLocationOn
                                        fontSize={25}
                                        fill={"#1A3556"}
                                      />
                                      <PTag
                                        classes={"text-dark-blue ms-1"}
                                        texts={"Mumbai, Shimla"}
                                      />
                                    </div>
                                  </div>
                                  <div className="mb-3">
                                    <LabelTag
                                      classes={"text-gray fn-14 mb-1"}
                                      text={"Scheduled For"}
                                    />
                                    <div className="d-flex align-items-center">
                                      <FiCalendar className={"Fi-Calendar"} />
                                      <PTag
                                        classes={"text-dark-blue ms-1"}
                                        texts={`Date 05th Apr'2021`}
                                      />
                                    </div>
                                  </div>
                                  <div>
                                    <LabelTag
                                      classes={"text-gray fn-14 mb-1"}
                                      text={"Scheduled For"}
                                    />
                                    <div className="d-flex align-items-center">
                                      <ImgTag
                                        src={ProfilePictureTwo}
                                        alt={"profile"}
                                        classes={
                                          "img-fluid w-40 h-40 rounded-5 overflow-hidden"
                                        }
                                      />
                                      <PTag
                                        classes={"text-dark-blue fw-bold ms-2"}
                                        texts={`Kunal Kohli `}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </Accordion.Body>
                            </Accordion.Item>
                          );
                        })}
                      </InfiniteScroll>
                    </Accordion>
                  ) : (
                    <div
                      className="w-100 d-flex align-items-center justify-content-center"
                      style={{ height: "300px" }}
                    >
                      <PTag
                        classes={"text-gray "}
                        texts={"No data found"}
                        style={{ height: "100px" }}
                      />
                    </div>
                  )}
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </div>
      </div>
    </>
  );
};

export default IsLoadingHOC(PendingRequest);
