import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import InputError from "../../components/common/InputError";
import {
  BackButton,
  ButtonTag,
  InputTag,
  PTag,
} from "../../components/designComponents/MicroComponents";
import IsLoadingHOC from "../../components/higherOrderLoader/IsLoadingHOC";
import {
  getRequestedAvailabilityById,
  updateNegotiate,
} from "../../store/requestavailability/slice";

const Negotiation = ({ setLoading }) => {
  const navigation = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [isMiniLoading, setIsMiniLoading] = useState(false);

  const [showData, setShowData] = useState({});

  const { profileId, routePath } = location?.state ?? false;

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      charge: "",
      percentage: "",
      days: "",
      deliveryPercentage: "",
    },
    validationSchema: Yup.object().shape({
      charge: Yup.string().required("Charge is required"),
      percentage: Yup.string()
        .max(100, "Maximum 100 persentage")
        .required("Advance to be paid is required"),
      days: Yup.string().required("Days is required"),
      deliveryPercentage: Yup.string()
        .max(100, "Maximum 100 persentage")
        .required("Delivery percentages is required"),
    }),

    onSubmit: (values) => onSubmitForm(values),
  });

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = formik;

  useEffect(() => {
    dispatch(getRequestedAvailabilityById(profileId))
      .then((res) => {
        setLoading(false);
        setFieldValue("charge", res.payload.data.advanceAmount);
        setFieldValue("percentage", res.payload.data.advancePercentage);
        setFieldValue("days", res.payload.data.creditDays);
        setFieldValue(
          "deliveryPercentage",
          res.payload.data.onDeliveryPercentage
        );
        setShowData(res.payload.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, []);

  const onSubmitForm = (values) => {
    setIsMiniLoading(true);
    dispatch(
      updateNegotiate({
        profileOrderId: showData.profileOrderId,
        data: {
          ["totalAmount"]: showData.totalAmount,
          ["advancePercentage"]: values.percentage,
          ["onDeliveryPercentage"]: values.deliveryPercentage,
          ["creditDays"]: values.days,
          ["advanceAmount"]: values.charge,
          ["onDeliveryAmount"]: 0,
        },
      })
    )
      .then((res) => {
        setIsMiniLoading(false);
        navigation("/dashboard/requestedavailability");
      })
      .finally(() => setIsMiniLoading(false));
  };

  return (
    <>
      <div className="container">
        <div className="">
          <BackButton
            title={"Negotiate"}
            onClick={() => {
              navigation(routePath ? routePath : "/dashboard");
            }}
          />
        </div>
        <>
          <form onSubmit={handleSubmit}>
            <div className="row my-5 max-w-625 mx-auto">
              <div className="col-12 border-bottom pb-4">
                <PTag classes={"text-gray"} texts={"Payment Terms"} />
                <div className="d-flex align-items-center justify-content-between mt-2">
                  <PTag classes={"text-dark-blue"} texts={"Charges"} />
                  <div className="bg-white rounded box-shadow p-2 w-110 text-center d-flex px-1 py-2 ">
                    <PTag classes={"text-dark-blue my-auto mx-1"} texts={"₹"} />
                    <InputTag
                      classes={"w-100 me-1"}
                      type={"number"}
                      name={"charge"}
                      onChange={handleChange}
                      value={values.charge}
                    />
                  </div>
                </div>
                {errors.charge && touched.charge ? (
                  <InputError
                    className={"input-error mt-2"}
                    errorTitle={errors.charge}
                  />
                ) : null}
                <div className="d-flex align-items-center justify-content-between mt-2">
                  <PTag
                    classes={"text-dark-blue"}
                    texts={"Advance to be paid"}
                  />
                  <div className="bg-white rounded box-shadow w-110 text-center d-flex px-1 py-2 ">
                    <InputTag
                      classes={"w-100 mx-1"}
                      type={"number"}
                      name={"percentage"}
                      min={0}
                      max={100}
                      onChange={handleChange}
                      value={values.percentage}
                    />
                    <PTag classes={"text-dark-blue my-auto me-1"} texts={"%"} />
                  </div>
                </div>
                {errors.percentage && touched.percentage ? (
                  <InputError
                    className={"input-error mt-2"}
                    errorTitle={errors.percentage}
                  />
                ) : null}
                <div className="d-flex align-items-center justify-content-between mt-2">
                  <PTag classes={"text-dark-blue"} texts={"on Delivery"} />
                  <div className="bg-white rounded box-shadow w-110 text-center d-flex px-1 py-2 ">
                    <InputTag
                      classes={"w-100 mx-1"}
                      type={"number"}
                      name={"deliveryPercentage"}
                      min={0}
                      max={100}
                      onChange={handleChange}
                      value={values.deliveryPercentage}
                    />
                    <PTag classes={"text-dark-blue my-auto me-1"} texts={"%"} />
                  </div>
                </div>
                {errors.deliveryPercentage && touched.deliveryPercentage ? (
                  <InputError
                    className={"input-error mt-2"}
                    errorTitle={errors.deliveryPercentage}
                  />
                ) : null}
                <div className="d-flex align-items-center justify-content-between mt-2">
                  <PTag classes={"text-dark-blue"} texts={"Credit Period"} />
                  <div className="bg-white rounded box-shadow w-110 text-center px-1 py-2 d-flex">
                    <InputTag
                      classes={"w-100 mx-1"}
                      type={"number"}
                      name={"days"}
                      onChange={handleChange}
                      value={values.days}
                    />
                    <PTag
                      classes={"text-dark-blue my-auto me-1"}
                      texts={"Day"}
                    />
                  </div>
                </div>
                {errors.firstName && touched.firstName ? (
                  <InputError
                    className={"input-error mt-2"}
                    errorTitle={errors.days}
                  />
                ) : null}
              </div>
              <div className="mb-5">
                <PTag
                  classes={"text-dark-blue fw-bold fn-18 my-3"}
                  texts={"Payment Mode"}
                />
                <div className="">
                  <ButtonTag
                    classes={"btn-extra-lite-orange semibold w-100"}
                    value={"Recurring Payment"}
                  />
                  <ButtonTag
                    classes={"btn-extra-lite-green semibold w-100 mt-2"}
                    value={"Stage Wise"}
                    // onClick={() => { navigation('/dashboard/stagewish') }}
                  />
                </div>
              </div>
              <ButtonTag
                classes={"btn-orange semibold w-100 mt-5"}
                value={"Submit"}
                type={"submit"}
              />
            </div>
          </form>
        </>
      </div>
    </>
  );
};

export default IsLoadingHOC(Negotiation);
