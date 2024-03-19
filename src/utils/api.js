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
const GLOBAL_SEARCH = "global_search"
const RECENTLY_PLAYED_MUSIC = "get_recently_played_music"
const GET_PLAYLIST = "playlist/get_playlist"
const CREATE_PLAYLIST = 'playlist/create'
const DELETE_PLAYLIST = 'playlist/delete'
const UPDATE_PLAYLIST = 'playlist/update'
const GET_YOUTUBE_PLAYLIST = 'get_youtube_playlist'
const GET_YOUTUBE_LIVE = 'get_youtube_live'
const UPDATE_PROFILE = 'user/update'
const GET_USER_DETAILS = 'user/get_details'
const DELETE_ACCOUNT = 'user/delete'
const DELETE_MUSIC_PLAYLIST = 'playlist/delete'
const GET_SINGLE_ARTIST = 'get_music'
const GET_ALBUM = 'get_album'
const GET_NOTIFICATION = 'get_notification'
const GET_ALBUM_WITH_MUSIC = 'get_album_with_music'
const GET_SYSTEM_SETTINGS = "get_system_settings"

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
export const getSystemSettings = (type) => {
    return {
        url: `${GET_SYSTEM_SETTINGS}`,
        method: "GET",
        params: {
            type: type,
        },
        authorizationHeader: false,

    }
}
export const getAlbumWithMusic = (category_id) => {
    return {
        url: `${GET_ALBUM_WITH_MUSIC}`,
        method: "GET",
        params: {
            category_id: category_id,
        },
        authorizationHeader: false,

    }
}
export const getUserDetails = () => {
    return {
        url: `${GET_USER_DETAILS}`,
        method: "GET",
        params: {

        },
        authorizationHeader: true,
    }
}
export const deleteAccount = () => {
    return {
        url: `${DELETE_ACCOUNT}`,
        method: "DELETE",
        params: {

        },
        authorizationHeader: true,
    }
}
export const getNotification = () => {
    return {
        url: `${GET_NOTIFICATION}`,
        method: "GET",
        params: {

        },
        authorizationHeader: false,
    }
}
export const globalSearch = (search, is_guest) => {
    return {
        url: `${GLOBAL_SEARCH}`,
        method: "GET",
        params: {
            search: search,
            is_guest: is_guest
        },
        authorizationHeader: true,

    }
}
export const getPlaylist = () => {
    return {
        url: `${GET_PLAYLIST}`,
        method: "GET",
        params: {

        },
        authorizationHeader: true,

    }
}
export const getYoutubePlaylist = () => {
    return {
        url: `${GET_YOUTUBE_PLAYLIST}`,
        method: "GET",
        params: {

        },
        authorizationHeader: false,

    }
}
export const getYoutubeLiveVideos = () => {
    return {
        url: `${GET_YOUTUBE_LIVE}`,
        method: "GET",
        params: {
        },
        authorizationHeader: false,
    }
}
export const createPlaylist = (title) => {
    let data = new FormData();
    data.append('title', title);
    return {
        url: `${CREATE_PLAYLIST}`,
        method: "POST",
        data,
        authorizationHeader: true,

    }
}
// export const postFcmId = (fcm_id, device_type) => {
//     return {
//         url: `${POST_FCM_ID}`,
//         method: "POST",
//         params: {
//             fcm_id: fcm_id,
//             device_type: device_type
//         },
//         authorizationHeader: false,
//     }
// }
export const deletePlaylist = (id) => {
    return {
        url: `${DELETE_PLAYLIST}`,
        method: "DELETE",
        params: {
            id: id
        },
        authorizationHeader: true,
    }
}
export const deleteMusicPlaylist = (id, music_id) => {
    return {
        url: `${DELETE_MUSIC_PLAYLIST}`,
        method: "DELETE",
        params: {
            id: id,
            music_id
        },
        authorizationHeader: true,
    }
}
export const updatePlaylist = (title, id) => {
    let data = new FormData();
    data.append('title', title);
    data.append('id', id);
    return {
        url: `${UPDATE_PLAYLIST}`,
        method: "POST",
        data,
        authorizationHeader: true,
    }
}
export const fetchSigleArtistData = (artist_id, lyricist_id, utsav_id, album_id, category_id, is_guest, offset, limit) => {
    return {
        url: `${GET_SINGLE_ARTIST}`,
        method: "GET",
        params: {
            artist_id: artist_id,
            lyricist_id: lyricist_id,
            utsav_id: utsav_id,
            album_id: album_id,
            category_id: category_id,
            is_guest: is_guest,
            offset: offset,
            limit: limit
        },
        authorizationHeader: true,
    }
}
export const getAlbum = (category_id, offset, limit) => {
    return {
        url: `${GET_ALBUM}`,
        method: "GET",
        params: {
            category_id: category_id,
            offset: offset,
            limit: limit
        },
        authorizationHeader: false,
    }
}
export const saveMusicToPlaylist = (id, music_id) => {
    let data = new FormData();
    data.append('id', id);
    data.append('music_id', music_id);
    return {
        url: `${UPDATE_PLAYLIST}`,
        method: "POST",
        data,
        authorizationHeader: true,
    }
}
export const getRecentlyPlayedMusic = (offset, limit) => {
    return {
        url: `${RECENTLY_PLAYED_MUSIC}`,
        method: "GET",
        params: {
            offset: offset,
            limit:limit
        },
        authorizationHeader: true,

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
export const getUtsav = (limit, order, offset) => {
    return {
        url: `${UTSAV}`,
        method: "GET",
        params: {
            order: order,
            limit: limit,
            offset: offset
        },
        authorizationHeader: false,
    }
}
export const getMusicCategory = (limit, order, offset) => {
    return {
        url: `${MUSIC_CATEGORY}`,
        method: "GET",
        params: {
            order: order,
            limit: limit,
            offset: offset
        },
        authorizationHeader: false,
    }
}
export const getLyricists = (limit, order, offset) => {
    return {
        url: `${LYRICISTS}`,
        method: "GET",
        params: {
            order: order,
            limit: limit,
            offset: offset
        },
        authorizationHeader: false,
    }
}
export const getRadio = (limit, order, offset) => {
    return {
        url: `${RADIO}`,
        method: "GET",
        params: {
            order: order,
            limit: limit,
            offset: offset
        },
        authorizationHeader: false,
    }
}
export const getArtists = (limit, order, offset) => {
    return {
        url: `${ARTISTS}`,
        method: "GET",
        params: {
            order: order,
            limit: limit,
            offset: offset,
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
export const updateProfile = (first_name, last_name, mobile, gender, country_id, temple_id, uid, fcm_id) => {
    let data = new FormData();
    data.append('first_name', first_name);
    data.append('last_name', last_name);
    data.append('mobile', mobile);
    data.append('gender', gender);
    data.append('country_id', country_id);
    data.append('temple_id', temple_id);
    data.append('uid', uid);
    data.append('fcm_id', fcm_id);
    return {
        url: `${UPDATE_PROFILE}`,
        method: "POST",
        data,
        authorizationHeader: true,
    }
}
export const updateFcmId = (fcm_id) => {
    let data = new FormData();
    data.append('fcm_id', fcm_id);
    return {
        url: `${UPDATE_PROFILE}`,
        method: "POST",
        data,
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

