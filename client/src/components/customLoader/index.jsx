import React from "react";
import { Spinner } from "react-bootstrap";
import { LoaderSvg } from "../AllSvgs";

const CustomLoader = ({ message }) => {
    return (
        <div className="LoadingContainer">
            <div className="LoadingBox">
                <LoaderSvg width={200} height={200} />
                <span>{message}</span>
            </div>
        </div>
    );
};
export default CustomLoader;
