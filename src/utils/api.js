const GET_COUNTRIES = "get_country"
const GET_TEMPLES = "get_temple"
const REGISTRATION = "registration"
const CHECK_LOGIN = "check_login"
const LOGOUT = "user/logout"
const CHECK_EMAIL = "check_email"
const UTSAV = "get_utsav"
const LYRICISTS = "get_lyricist"
const ARTISTS = "get_artist"
const RADIO = "get_radio"
const HOME = "get_home"
const MUSIC_CATEGORY = "get_category"

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

export const logout = () => {
    return {
        url: `${LOGOUT}`,
        method: "GET",
        params: {

        },
        authorizationHeader: true,
    }
}
export const getUtsav = (limit, order) => {
    return {
        url: `${UTSAV}`,
        method: "GET",
        params: {
            order: order,
            limit: limit,
           
        },
        authorizationHeader: false,
    }
}
export const getMusicCategory = (limit, order) => {
    return {
        url: `${MUSIC_CATEGORY}`,
        method: "GET",
        params: {
            order: order,
            limit: limit,
        },
        authorizationHeader: false,
    }
}
export const getLyricists = (limit, order) => {
    return {
        url: `${LYRICISTS}`,
        method: "GET",
        params: {
            order: order,
            limit: limit,
        },
        authorizationHeader: false,
    }
}
export const getRadio = (limit, order) => {
    return {
        url: `${RADIO}`,
        method: "GET",
        params: {
            order: order,
            limit: limit,
        },
        authorizationHeader: false,
    }
}
export const getArtists = (limit, order) => {
    return {
        url: `${ARTISTS}`,
        method: "GET",
        params: {
            order: order,
            limit: limit,
        },
        authorizationHeader: false,
    }
}
export const getHome = (is_guest) => {
    return {
        url: `${HOME}`,
        method: "GET",
        params: {
            is_guest: is_guest
        },
        authorizationHeader: true,
    }
}



export const postUser = (first_name, last_name, email, mobile, gender, country_id, temple_id, uid, device_type, fcm_id) => {
    let data = new FormData();
    data.append('first_name', first_name);
    data.append('last_name', last_name);
    data.append('email', email);
    data.append('mobile', mobile);
    data.append('gender', gender);
    data.append('country_id', country_id);
    data.append('temple_id', temple_id);
    data.append('uid', uid);
    data.append('device_type', device_type);
    data.append('fcm_id', fcm_id);
    return {
        url: `${REGISTRATION}`,
        method: "POST",
        data,
        authorizationHeader: false,
    }
}
export const checkEmail = (email) => {
    let data = new FormData();
    data.append('email', email);

    return {
        url: `${CHECK_EMAIL}`,
        method: "POST",
        data,
        authorizationHeader: false,
    }
}


export const checkLogin = (uid) => {
    let data = new FormData();
    data.append('uid', uid);
    return {
        url: `${CHECK_LOGIN}`,
        method: "POST",
        data,
        authorizationHeader: false,
    }
}

