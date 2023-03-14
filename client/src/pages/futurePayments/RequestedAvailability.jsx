import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Nav, Tab } from "react-bootstrap";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Alaramicon, RightChevron } from "../../components/AllSvgs";
import IsLoadingHOC from "../../components/higherOrderLoader/IsLoadingHOC";
import {
  ATag,
  BackButton,
  ButtonTag,
  ImgTag,
  LinkBtn,
  PTag,
} from "../../components/designComponents/MicroComponents";
//icons
import { FiChevronRight } from "react-icons/fi";
import { getRequestedAvailability } from "./../../store/requestavailability/slice";
import { postCart } from "../../store/cart/slice";

const RequestedAvailability = ({ setLoading }) => {
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const [currentTab, setCurrentTab] = useState("Pending");

  const [pandingData, setPandingData] = useState([]);
  const [confirmedData, setConfirmedData] = useState([]);
  const [rejectedData, setRejectedData] = useState([]);

  const [isMiniLoading, setIsMiniLoading] = useState({
    pandingLoading: false,
    confirmedLoading: false,
    rejectedLoading: false,
  });

  const fetchSearchData = (searchString) => {
    let params = {
      currrentPage: 0,
      status:
        searchString === "Confirmed" ? "accepted" : searchString.toLowerCase(),
    };
    switch (searchString) {
      case "Pending":
        if (pandingData?.length == 0) {
          setIsMiniLoading({ ...isMiniLoading, pandingLoading: true });
          dispatch(getRequestedAvailability(params))
            .then((res) => {
              setPandingData(res?.payload?.data?.orders);
            })
            .finally(() =>
              setIsMiniLoading({ ...isMiniLoading, crewLoading: false })
            );
        }
        break;
      case "Confirmed":
        if (confirmedData?.length == 0) {
          setIsMiniLoading({ ...isMiniLoading, confirmedLoading: true });
          dispatch(getRequestedAvailability(params))
            .then((res) => {
              setConfirmedData(res?.payload?.data?.orders);
            })
            .finally(() =>
              setIsMiniLoading({ ...isMiniLoading, crewLoading: false })
            );
        }
        break;
      case "Rejected":
        if (rejectedData?.length == 0) {
          setIsMiniLoading({ ...isMiniLoading, rejectedLoading: true });
          dispatch(getRequestedAvailability(params))
            .then((res) => {
              setRejectedData(res?.payload?.data?.orders);
            })
            .finally(() =>
              setIsMiniLoading({ ...isMiniLoading, crewLoading: false })
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

  const Reuirments = [1, 2, 3, 4];

  return (
    <>
      <div className="container">
        <BackButton
          title={"Requirements Availability"}
          onClick={() => {
            navigation("/dashboard");
          }}
        />
        <div className="row my-4">
          <div className="border-teb">
            <Tab.Container
              id="Requirements"
              className="justify-content-sm-center justify-content-strat"
              defaultActiveKey={"Pending"}
              onSelect={(e) => {
                if (e !== currentTab) {
                  setCurrentTab(e);
                  fetchSearchData(e);
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
                  <div className="row">
                    {pandingData.length > 0 ? (
                      pandingData.map((element, index) => (
                        <div className="col-lg-6" key={index}>
                          <div className="card rounded-16 p-3 my-3">
                            <div className="d-flex align-items-center justify-content-between flex-wrap">
                              <div className="d-flex align-items-center justify-content-between">
                                <div className="max-w-40 w-100 h-40 rounded-5 overflow-hidden">
                                  <ImgTag
                                    src={element?.sellerDetail?.profileImageUrl}
                                    alt={"profile"}
                                    classes={"img-fluid"}
                                  />
                                </div>
                                <div className="ms-2 w-100">
                                  <PTag
                                    classes={"text-dark-blue fw-bold fn-16"}
                                    texts={`${
                                      element?.sellerDetail?.firstName +
                                      " " +
                                      element?.sellerDetail?.lastName
                                    }`}
                                  />
                                  <div className="d-flex align-items-center">
                                    <PTag
                                      classes={"text-dark-blue me-1"}
                                      texts={
                                        element.profileType.split("/")[
                                          element.profileType.split("/")
                                            .length - 1
                                        ]
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="d-flex align-items-center text-green mt-2 mt-sm-2 mt-md-0 mt-lg-0 mt-xxl-0">
                                <Alaramicon
                                  width={"24"}
                                  opacityFill={"#31ad76"}
                                  stroke={"#31ad76"}
                                />
                                <PTag
                                  classes={"px-2"}
                                  texts={"Expiry Date - 27 Oct, 2021"}
                                />
                              </div>
                            </div>
                            <div className="mt-4 d-flex align-items-center">
                              <div className="w-100 mx-2">
                                <ButtonTag
                                  classes={
                                    "btn-extra-lite-orange semibold fn-12 rounded w-100"
                                  }
                                  value={"Cancel/Modify Order"}
                                />
                              </div>
                              <div className="w-100 mx-2">
                                <ButtonTag
                                  classes={
                                    "btn-dark-blue semibold fn-12 rounded w-100"
                                  }
                                  value={"Send Reminder"}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div
                        className="w-100 d-flex align-items-center justify-content-center"
                        style={{ height: "250px" }}
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
                  <div className="row">
                    {confirmedData.length > 0 ? (
                      confirmedData.map((element, index) => (
                        <div className="col-lg-6" key={index}>
                          <div className="card rounded-16 p-3 my-3">
                            <div className="d-flex align-items-center justify-content-between flex-wrap">
                              <div className="d-flex align-items-center justify-content-between">
                                <div className="max-w-40 w-100 h-40 rounded-5 overflow-hidden">
                                  <ImgTag
                                    src={element.sellerDetail.profileImageUrl}
                                    alt={"profile"}
                                    classes={"img-fluid"}
                                  />
                                </div>
                                <div className="ms-2 w-100">
                                  <PTag
                                    classes={"text-dark-blue fw-bold fn-16"}
                                    texts={`${
                                      element.sellerDetail.firstName +
                                      " " +
                                      element.sellerDetail.lastName
                                    }`}
                                  />
                                  <div className="d-flex align-items-center">
                                    <PTag
                                      classes={"text-dark-blue me-1"}
                                      texts={
                                        element.profileType.split("/")[
                                          element.profileType.split("/")
                                            .length - 1
                                        ]
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                              {/* <div className="d-flex align-items-center text-green mt-2 mt-sm-0">
                                                            <Alaramicon width={'24'} opacityFill={'#31ad76'} stroke={'#31ad76'} />
                                                            <PTag classes={'px-2'} texts={'Expiry Date - 27 Oct, 2021'} />
                                                        </div> */}
                            </div>
                            <div className="mt-4 d-flex">
                              <div className="w-100 mx-2">
                                <ButtonTag
                                  classes={
                                    "btn btn-extra-lite-green semibold fn-12 rounded w-100"
                                  }
                                  value={"Move To Cart"}
                                  onClick={() => {
                                    dispatch(
                                      postCart({
                                        payload: {
                                          profileOrderId:
                                            element?.profileOrderId,
                                        },
                                        navigation,
                                      })
                                    );
                                  }}
                                />
                              </div>
                              <div className="w-100 mx-2">
                                <ButtonTag
                                  classes={
                                    "btn-dark-blue semibold fn-12 rounded w-100"
                                  }
                                  value={"Negotiate"}
                                  onClick={() => {
                                    const standardPayment =
                                      element.standardPayment;
                                    navigation("/dashboard/negotiation", {
                                      state: {
                                        standardPayment: standardPayment,
                                        totalAmount: element.totalAmount,
                                        profileId: element.profileOrderId,
                                        routePath:
                                          "/dashboard/requestedavailability",
                                      },
                                    });
                                  }}
                                />
                              </div>
                            </div>
                            <div className="mx-auto mt-3">
                              <PTag
                                classes={"text-red"}
                                texts={"Cancel/Modify Order"}
                              />
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div
                        className="w-100 d-flex align-items-center justify-content-center"
                        style={{ height: "250px" }}
                      >
                        <PTag
                          classes={"text-gray "}
                          texts={"No data found"}
                          style={{ height: "100px" }}
                        />
                      </div>
                    )}
                  </div>
                  <div className="container-fluid bg-white filter-button px-sm-0 px-3 py-3">
                    <div className="row">
                      <div className="">
                        <ButtonTag
                          classes={"btn-green semibold fn-12 rounded w-100"}
                          value={"Move All To Cart"}
                        />
                      </div>
                    </div>
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="Rejected">
                  <div className="row">
                    {rejectedData.length > 0 ? (
                      rejectedData.map((e, index) => (
                        <div className="col-lg-6" key={index}>
                          <div className="card rounded-16 p-3 my-3">
                            <div className="d-flex align-items-center justify-content-between">
                              <div className="d-flex align-items-center justify-content-between">
                                <div className="max-w-40 w-100 h-40 rounded-5 overflow-hidden">
                                  <ImgTag
                                    src={e.sellerDetail.profileImageUrl}
                                    alt={"profile"}
                                    classes={"img-fluid"}
                                  />
                                </div>
                                <div className="ms-2 w-100">
                                  <PTag
                                    classes={"text-dark-blue fw-bold fn-16"}
                                    texts={"Harsh Mehta"}
                                  />
                                  <div className="d-flex align-items-center">
                                    <PTag
                                      classes={"text-dark-blue me-1"}
                                      texts={"Project Titil"}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="mt-4 d-flex align-items-center">
                              <div className="w-100 mx-2">
                                <ButtonTag
                                  classes={
                                    "btn-dark-blue semibold fn-12 rounded w-100"
                                  }
                                  value={"Check Alternate Dates"}
                                />
                              </div>
                              <div className="w-100 mx-2 text-center">
                                <ATag
                                  classes={"fn-16 w-100 me-2"}
                                  children={"Search alternates"}
                                />
                                <FiChevronRight
                                  fontSize={25}
                                  color={"#1890ff"}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div
                        className="w-100 d-flex align-items-center justify-content-center"
                        style={{ height: "250px" }}
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
      </div>
    </>
  );
};

export default IsLoadingHOC(RequestedAvailability);
