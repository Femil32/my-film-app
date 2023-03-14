import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import filmreelimg from "../../assets/img/base/film-reel.png";
import Sawo from "sawo";
import { useDispatch, useSelector } from "react-redux";
import { authentication, loginUser, OTPUser, registerUser, setAuth } from "../../store/auth/slice";
import { toast } from "react-toastify";
import { Formik, Form } from "formik";
import {
  ButtonTag,
  DefaultPhoneInput,
  H1Tag,
  InputTag,
  LabelTag,
  PTag,
} from "./../../components/designComponents/MicroComponents";
import * as Yup from "yup";
import InputError from "./../../components/common/InputError";
import { parsePhoneNumber } from "react-phone-number-input";
import { isValidPhoneNumber } from "react-phone-number-input";
import { commonMsg } from "../../components/common/ValidationConstants";

const LogIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginResponse = useSelector((state) => state.auth);

  const [payload, setPayload] = useState({});
  const [isSubmitDisable, setIsSubmitDisable] = useState(false);

  useEffect(() => {
    if (
      loginResponse.status === "succeed" &&
      loginResponse.type === "LOGIN_API"
    ) {
      toast.success('Login Success.')
      navigate("/dashboard");
      // dispatch(setAuth());
    }
  }, [loginResponse]);

  return (
    <>
      <div className="filmdashborad">
        <div className="row g-0 ">
          <div className="col-lg-8 col-12">
            <div className="text-center  bgimg d-flex justify-content-center align-items-center flex-column">
              <div className="max-w-450  mx-auto mb-5">
                <img src={filmreelimg} alt="" />
              </div>
              <div>
                <H1Tag
                  classes={
                    "text-dark-blue fn-md-20 fn-36 fw-bold border-bottom border-1 border-success  max-w-310 mx-auto d-inline"
                  }
                  title={`Don't Let Your talent`}
                />
              </div>
              <div>
                <H1Tag
                  classes={
                    "text-dark-blue fn-md-20 fn-36 fw-bold border-bottom border-1 border-success  max-w-310 mx-auto d-inline "
                  }
                  title={`Get Wasted`}
                />
              </div>
              <div>
                <PTag
                  classes={
                    "text-dark-blue fn-10 line-height-1 mt-sm-2 max-w-260  mx-auto py-2 mb-5"
                  }
                  texts={
                    "Work With top rated clients from the industry on amazing projects"
                  }
                />
              </div>
            </div>
          </div>

          <div
            className="col-lg-4 col-12 d-flex justify-content-center align-items-center p-5"
            id="LogIn"
          >
            <div className="col-12">
              <div className="sign-head-text">
                <H1Tag
                  classes="sign-head fw-bold text-dark-blue mt-2"
                  title="Log in"
                />
                <PTag
                  classes="sign-text text-dark-gray mt-3"
                  texts="All Your Resources To Make A Film"
                />
              </div>

              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                validationSchema={Yup.object().shape({
                  email: Yup.string()
                    .email("Invalid email address")
                    .required("Email is required."),
                  password: Yup.string()
                    .required("Password is required.")
                    .matches(
                      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
                      "Must contain one digit, one lowercase, one uppercase, one special character, and it must be 8-16 characters long."
                    ),
                })}
                onSubmit={(values) => {
                  console.log(values);
                  dispatch(loginUser(values))
                  // if (isValidPhoneNumber(values.mobile)) {
                  //   const { nationalNumber, countryCallingCode } =
                  //     parsePhoneNumber(values.mobile);
                  //   const jsonObject = {
                  //     ["isd_code"]: "+" + countryCallingCode,
                  //     ["username"]: nationalNumber,
                  //   };
                  //   setPayload(jsonObject);
                  //   setIsSubmitDisable(true);
                  //   dispatch(OTPUser(jsonObject));
                  // } else {
                  //   toast.error(commonMsg.mobileNotvalid);
                  // }
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  setFieldValue,
                }) => (
                  <>
                    <Form
                      onSubmit={handleSubmit}
                      className="d-flex flex-column mt-2"
                    >
                      <div
                        className={`sign-input ${
                          errors.mobile && touched.mobile ? `error-inputs ` : ``
                        }mb-3`}
                      >
                        {/* <div className="col-12 w-100 align-middle mb-2 mt-2">
                          <DefaultPhoneInput
                            autoFocus
                            className={"form-control p-3"}
                            value={values.mobile}
                            onChange={(value) => {
                              value !== undefined
                                ? setFieldValue("mobile", value)
                                : setFieldValue("mobile", "");
                            }}
                          />
                          {errors.mobile && touched.mobile ? (
                            <InputError
                              className="input-error mt-2"
                              errorTitle={errors.mobile}
                            />
                          ) : null}
                        </div> */}
                        <div className="col-12 w-100 align-middle mb-2 mt-2">
                          <div
                            className={`sign-input ${
                              errors.email && touched.email
                                ? `error-inputs `
                                : ``
                            }mb-3`}
                          >
                            <LabelTag
                              classes={"text-gray fn-12 mb-2"}
                              text={"Your Email"}
                            />
                            <InputTag
                              type={"email"}
                              placeholder={"Enter Email"}
                              value={values.email}
                              classes={"form-control"}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              name={"email"}
                            />
                            {errors.email && touched.email ? (
                              <InputError
                                className={"input-error mt-2"}
                                errorTitle={errors.email}
                              />
                            ) : null}
                          </div>
                        </div>
                        <div className="col-12 w-100 align-middle mb-2 mt-2">
                          <div
                            className={`sign-input ${
                              errors.password && touched.password
                                ? `error-inputs `
                                : ``
                            }mb-3`}
                          >
                            <LabelTag
                              classes={"text-gray fn-12 mb-2"}
                              text={"Your Password"}
                            />
                            <InputTag
                              type={"text"}
                              placeholder={"Enter Password"}
                              value={values.password}
                              classes={"form-control"}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              name={"password"}
                            />
                            {errors.password && touched.password ? (
                              <InputError
                                className={"input-error mt-2"}
                                errorTitle={errors.password}
                              />
                            ) : null}
                          </div>
                        </div>
                      </div>
                      <ButtonTag
                        disabled={isSubmitDisable}
                        classes={"btn-orange fw-normal mb-5 mt-1 px-5"}
                        value={"Continue"}
                        type={"submit"}
                      />
                    </Form>
                  </>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogIn;
