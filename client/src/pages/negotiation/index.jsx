import React from "react";
import { Route, Routes } from "react-router-dom";
import Negotiation from "./Negotiation";
import NegotiationRequest from "./NegotiationRequest";

export const NegotiationRoute = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Negotiation />} />
        <Route exact path="/request" element={<NegotiationRequest />} />
      </Routes>
    </>
  );
};
export default NegotiationRoute;
