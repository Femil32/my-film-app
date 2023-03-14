import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ProfilePictureTwo } from "../../assets/img";
import {
  ATag,
  BackButton,
  ButtonTag,
  ImgTag,
  PTag,
} from "../../components/designComponents/MicroComponents";
import CancelOrder from "../../pages/sellerConfirmedAvailability/CancelOrder";
import { requestStatusConfirmed } from "../../store/futurepayments/slice";

export default function SellerConfirmedAvailability() {
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const { FuturePaymentsSlice } = useSelector((state) => state.futurePayments);

  // categories
  useEffect(() => {
    dispatch(requestStatusConfirmed());
  }, []);

  return (
    <>
      <div className="container">
        <div className="">
          <BackButton
            title={"Seller Confirmed Availability "}
            onClick={() => {
              navigation("/dashboard");
            }}
          />
        </div>
        <div className="row my-4">
          {!FuturePaymentsSlice?.orders?.length ? (
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
          ) : (
            <>
              {FuturePaymentsSlice?.orders?.map((e, index) => {
                return (
                  <div className="col-lg-6" key={index}>
                    <div className="card rounded-16 p-3 mb-sm-4 mb-3">
                      <div className="d-flex mb-4">
                        <div className="max-w-65 w-100 h-65 rounded-5 overflow-hidden">
                          <ImgTag
                            src={e.sellerDetail.profileImageUrl}
                            alt={"profile"}
                            classes={"img-fluid"}
                          />
                        </div>
                        <div className="ms-2 w-100">
                          <div className="d-flex justify-content-between align-items-center flex-wrap">
                            <PTag
                              classes={"text-dark-blue fw-bold fn-16"}
                              texts={`${e.sellerDetail.firstName} ${e.sellerDetail.lastName}`}
                            />
                            <PTag
                              classes={"text-navy-blue fn-16 me-2 mt-0"}
                              texts={"Move to Card"}
                            />
                          </div>
                          <div>
                            <PTag
                              classes={"text-dark-blue me-1 mt-1"}
                              texts={e.profileType.replaceAll("/", ">")}
                            />
                            <PTag
                              classes={"text-dark-blue fw-bold me-1 mt-1"}
                              texts={`₹ ${e.profileRate}`}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row g-3">
                        <div className="col-6">
                          <ButtonTag
                            classes={
                              "btn-extra-lite-green semibold fn-12 rounded white-space-nowrap w-100"
                            }
                            value={"Call"}
                          />
                        </div>
                        <div className="col-6">
                          <ButtonTag
                            classes={
                              "btn-orange semibold fn-12 rounded white-space-nowrap w-100"
                            }
                            value={"Negotiate"}
                            onClick={() => {
                              navigation(`/dashboard/negotiation/`, {
                                state: {
                                  profileId: e.profileOrderId,
                                  routePath:
                                    "/dashboard/sellerconfirmedavailability",
                                },
                              });
                            }}
                          />
                        </div>
                        <div className="text-center">
                          <ATag
                            classes={"text-red fw-bold"}
                            children={"Cancel/Modify Order"}
                            onClick={() => {
                              setOpen(true);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}
          <CancelOrder show={open} setOpen={setOpen} />
        </div>
      </div>
    </>
  );
}
