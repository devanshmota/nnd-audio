"use client";

import { getCountries } from "@/utils/api";
import { store } from "../store/Store";
import { apiCallBegan } from "./apiActions";
import { getTemples } from "@/utils/api";

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