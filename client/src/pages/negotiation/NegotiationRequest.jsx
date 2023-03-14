import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ProfilePictureTwo } from "../../assets/img";
import { RightChevron } from "../../components/AllSvgs";
import {
  BackButton,
  ButtonTag,
  ImgTag,
  PTag,
} from "../../components/designComponents/MicroComponents";
import NegotiationRequestDetails from "../sellerConfirmedAvailability/NegotiationRequestDetails";

import { getNegotiationRequests } from "./../../store/negotiationrequests/slice";

import "sweetalert2/src/sweetalert2.scss";

const NegotiationRequest = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [negotiationItem, setNegotiationItem] = useState({});

  const { GetNegotiationRequests } = useSelector(
    (state) => state.negotiationRequests
  );

  useEffect(() => {
    dispatch(getNegotiationRequests());
  }, []);

  return (
    <>
      <div className="container">
        <BackButton
          title={"Negotiation Requests"}
          onClick={() => {
            navigation("/dashboard");
          }}
        />
        <div className="row my-3">
          {GetNegotiationRequests?.orders?.map((e, index) => {
            return (
              <div className="col-sm-6" key={index}>
                <div className="card rounded-16 p-3 mb-3 mb-sm-4">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
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
                          texts={
                            e.sellerDetail.firstName +
                            " " +
                            e.sellerDetail.lastName
                          }
                        />
                        <div className="d-flex align-items-center">
                          <PTag
                            classes={"text-dark-blue me-1"}
                            texts={e.profileType.replaceAll("/", ">")}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-lg-end justify-content-center mt-4 mt-lg-0">
                      <ButtonTag
                        classes={"btn-dark-blue semibold fn-12 rounded"}
                        value={"Check Details"}
                        onClick={() => {
                          setShow(true);
                          setNegotiationItem(e);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <NegotiationRequestDetails show={show} setShow={setShow} negotiationItem={negotiationItem}/>
      </div>
    </>
  );
};

export default NegotiationRequest;
