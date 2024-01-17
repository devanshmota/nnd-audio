"use client";

import { getCountries } from "@/utils/api";
import { store } from "../store/Store";
import { apiCallBegan } from "./apiActions";

// // GET SETTINGS
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