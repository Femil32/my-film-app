import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import CustomLoader from "../components/customLoader";
import MiniLoader from "../components/customLoader/MiniLoader";
import { guestUserToken } from "../store/auth/slice";
import { ACCESS_TOKEN } from "../utils/constants";

const GuestRoute = () => {
    const dispatch = useDispatch()
    const auth = useSelector(store => store.auth)

    useEffect(() => {
        if (!auth.guestUserToken && !localStorage.getItem(ACCESS_TOKEN)) {
            dispatch(guestUserToken())
        }
    }, [])

    return auth.guestUserToken || localStorage.getItem(ACCESS_TOKEN) ? <Outlet /> : <CustomLoader message={'We are loading your data!'} />;
};

export default GuestRoute