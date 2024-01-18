const GET_COUNTRIES = "get_country"
const GET_TEMPLES = "get_temple"
const REGISTRATION = "registration"

// GET COUNTRIES
export const getCountries = (offset, sort, limit, order, search) => {
    return {
        url: `${GET_COUNTRIES}`,
        method: "GET",
        params: {
            offset: offset,
            sort: sort,
            limit: limit,
            order: order,
            search: search,
        },
        authorizationHeader: false,

    }
}
// GET TEMPLES
export const getTemples = (offset, sort, limit, order, search, countries_id) => {
    return {
        url: `${GET_TEMPLES}`,
        method: "GET",
        params: {
            offset: offset,
            sort: sort,
            limit: limit,
            order: order,
            search: search,
            countries_id: countries_id
        },
        authorizationHeader: false,

    }
}

// export const postUser = (offset, sort, limit, order, search) => {
//     return {
//         url: `${GET_COUNTRIES}`,
//         method: "GET",
//         params: {
//             offset: offset,
//             sort: sort,
//             limit: limit,
//             order: order,
//             search: search,
//         },
//         authorizationHeader: false,

//     }
// }