"use client";
import { getCountries } from "@/utils/api";
import { store } from "../store/Store";
import { apiCallBegan } from "./apiActions";
import { getTemples } from "@/utils/api";
import { postUser } from "@/utils/api"
import { checkLogin } from "@/utils/api";
import { logout } from "@/utils/api";

// // GET COUNTRIES
export const getCountriesApi = ({
    offset = "",
    sort = "",
    limit = "",
    order = "",
    search = "",
    onSuccess = () => { },
    onError = () => { },
    onStart = () => { } }) => {
    store.dispatch(
        apiCallBegan({
            ...getCountries(offset, sort, limit, order, search),
            displayToast: false,
            onStart,
            onSuccess,
            onError,
        })
    );
};
// // GET TEMPLES
export const getTemplesApi = ({
    offset = "",
    sort = "",
    limit = "",
    order = "",
    search = "",
    countries_id = null,
    onSuccess = () => { },
    onError = () => { },
    onStart = () => { } }) => {
    store.dispatch(
        apiCallBegan({
            ...getTemples(offset, sort, limit, order, search, countries_id),
            displayToast: false,
            onStart,
            onSuccess,
            onError,
        })
    );
};
export const logoutApi = ({
    onSuccess = () => { },
    onError = () => { },
    onStart = () => { } }) => {
    store.dispatch(
        apiCallBegan({
            ...logout(),
            displayToast: false,
            onStart,
            onSuccess,
            onError,
        })
    );
};

export const postUserApi = ({
    first_name = "",
    last_name = "",
    email = "",
    mobile = null,
    gender = "",
    country_id = null,
    temple_id = null,
    uid= null,
    device_type = "",
    fcm_id = "",
    onSuccess = () => { },
    onError = () => { },
    onStart = () => { },
}) => {
    store.dispatch(
        apiCallBegan({
            ...postUser(first_name, last_name, email, mobile, gender, country_id, temple_id, uid, device_type, fcm_id),
            displayToast: false,
            onStart,
            onSuccess,
            onError,
        })
    );
};
export const checkLoginApi = ({
    uid = null,
    onSuccess = () => { },
    onError = () => { },
    onStart = () => { },
}) => {
    store.dispatch(
        apiCallBegan({
            ...checkLogin(uid),
            displayToast: false,
            onStart,
            onSuccess,
            onError,
        })
    );
};