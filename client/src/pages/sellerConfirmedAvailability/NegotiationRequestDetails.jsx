import React from "react";
import { Modal } from "react-bootstrap";
//icons
import { MdClose } from "react-icons/md";
import { useDispatch } from "react-redux";
import {
  ButtonTag,
  PTag,
} from "../../components/designComponents/MicroComponents";
import { acceptNegotiationRequests } from "../../store/negotiationrequests/slice";

export const NegotiationRequestDetails = ({
  show,
  setShow,
  negotiationItem,
}) => {
  const dispatch = useDispatch();
  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-dialog-scrollable"
      >
        <div
          className="text-white fs-4 bg-navy-blue w50 h50 d-flex justify-content-center align-items-center rounded-circle pointer close-icon"
          onClick={() => setShow(false)}
        >
          <MdClose fontSize={30} className={"Md-Close"} />
        </div>
        <Modal.Body>
          <div>
            <PTag
              classes={"text-dark-blue fw-bold mb-3"}
              texts={"Negotiation"}
            />
            <div className="border-bottom pb-3 mb-3">
              <PTag
                classes={"text-dark-blue mb-2"}
                texts={"Negotiated payment terns"}
              />
              <div className="d-flex justify-content-between align-items-center mb-3">
                <PTag classes={"text-navy-blue"} texts={"Charges"} />
                <PTag
                  classes={"text-dark-blue fw-bold"}
                  texts={`₹${negotiationItem.profileRate}`}
                />
              </div>
              <div className="bg-lite-white p-2">
                <PTag
                  classes={"text-dark-blue mb-2"}
                  texts={"10% is to be paid on Mar 23"}
                />
                <PTag
                  classes={"text-dark-gray fn-12"}
                  texts={
                    "In at laculis lorem. Praesent Tempor Dictum Tellus UT "
                  }
                />
              </div>
            </div>
            <div className="border-bottom pb-3 mb-3">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <PTag classes={"text-navy-blue"} texts={"Advance to be paid"} />
                <PTag
                  classes={"text-dark-blue fw-bold"}
                  texts={`₹${negotiationItem.advanceAmount}`}
                />
              </div>
              <div className="bg-lite-white p-2">
                <PTag
                  classes={"text-dark-blue"}
                  texts={`${negotiationItem.advancePercentage} % is to be paid on Mar 23`}
                />
              </div>
            </div>
            <div className="border-bottom pb-3 mb-3">
              <div className="d-flex justify-content-between align-items-center">
                <PTag classes={"text-navy-blue"} texts={"On Delivery"} />
                <PTag
                  classes={"text-dark-blue fw-bold"}
                  texts={`₹${negotiationItem.onDeliveryAmount}`}
                />
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <PTag classes={"text-navy-blue"} texts={"Credit Period"} />
              <PTag
                classes={"text-dark-blue fw-bold"}
                texts={`${negotiationItem.creditDays} days`}
              />
            </div>
            <div className="row">
              <div className="col-6">
                <ButtonTag
                  classes={"btn-extra-lite-green fn-12 bold w-100"}
                  value={"Re-Negotiate"}
                />
              </div>
              <div className="col-6">
                <ButtonTag
                  classes={"btn-orange fn-12 bold w-100"}
                  value={"Accept"}
                  onClick={() => {
                    dispatch(
                      acceptNegotiationRequests(negotiationItem.profileOrderId)
                    );
                  }}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default NegotiationRequestDetails;
