"use client";
import { getCountries } from "@/utils/api";
import { store } from "../store/Store";
import { apiCallBegan } from "./apiActions";
import { getTemples } from "@/utils/api";
import { postUser } from "@/utils/api"
import { checkLogin } from "@/utils/api";
import { logout } from "@/utils/api";
import { checkEmail } from "@/utils/api";
import { getUtsav } from "@/utils/api";
import { getLyricists } from "@/utils/api";
import { getArtists } from "@/utils/api";
import { getRadio } from "@/utils/api";
import { getHome } from "@/utils/api";
import { getMusicCategory } from "@/utils/api";
import { globalSearch } from "@/utils/api";
import { getRecentlyPlayedMusic } from "@/utils/api";
import { getPlaylist } from "@/utils/api";
import { createPlaylist } from "@/utils/api";
import { deletePlaylist } from "@/utils/api";
import { updatePlaylist } from "@/utils/api";
import { saveMusicToPlaylist } from "@/utils/api";
import { getYoutubePlaylist } from "@/utils/api";
import { getYoutubeLiveVideos } from "@/utils/api";
import { updateProfile } from "@/utils/api";
import { deleteAccount } from "@/utils/api";
import { deleteMusicPlaylist } from "@/utils/api";
import { fetchSigleArtistData } from "@/utils/api";
import { getAlbum } from "@/utils/api";

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
export const getUtsavApi = ({

    limit = null,
    order = "",
    onSuccess = () => { },
    onError = () => { },
    onStart = () => { } }) => {
    store.dispatch(
        apiCallBegan({
            ...getUtsav(limit, order),
            displayToast: false,
            onStart,
            onSuccess,
            onError,
        })
    );
};
export const getLyricistsApi = ({

    limit = null,
    order = "",
    onSuccess = () => { },
    onError = () => { },
    onStart = () => { } }) => {
    store.dispatch(
        apiCallBegan({
            ...getLyricists(limit, order),
            displayToast: false,
            onStart,
            onSuccess,
            onError,
        })
    );
};
export const fetchSigleArtistDataApi = ({

    artist_id = null,
    lyricist_id = null,
    utsav_id = null,
    is_guest = null,
    onSuccess = () => { },
    onError = () => { },
    onStart = () => { } }) => {
    store.dispatch(
        apiCallBegan({
            ...fetchSigleArtistData(artist_id, lyricist_id, utsav_id, is_guest, ),
            displayToast: false,
            onStart,
            onSuccess,
            onError,
        })
    );
};
export const getAlbumApi = ({
    category_id = null,
    onSuccess = () => { },
    onError = () => { },
    onStart = () => { } }) => {
    store.dispatch(
        apiCallBegan({
            ...getAlbum(category_id),
            displayToast: false,
            onStart,
            onSuccess,
            onError,
        })
    );
};
export const getArtistsApi = ({

    limit = null,
    order = "",
    onSuccess = () => { },
    onError = () => { },
    onStart = () => { } }) => {
    store.dispatch(
        apiCallBegan({
            ...getArtists(limit, order),
            displayToast: false,
            onStart,
            onSuccess,
            onError,
        })
    );
};
export const getRadioApi = ({
    limit = null,
    order = "",
    onSuccess = () => { },
    onError = () => { },
    onStart = () => { } }) => {
    store.dispatch(
        apiCallBegan({
            ...getRadio(limit, order),
            displayToast: false,
            onStart,
            onSuccess,
            onError,
        })
    );
};
export const getHomeApi = ({
    is_guest = null,
    onSuccess = () => { },
    onError = () => { },
    onStart = () => { } }) => {
    store.dispatch(
        apiCallBegan({
            ...getHome(is_guest),
            displayToast: false,
            onStart,
            onSuccess,
            onError,
        })
    );
};
export const globalSearchApi = ({
    search = "",
    is_guest = null,
    onSuccess = () => { },
    onError = () => { },
    onStart = () => { } }) => {
    store.dispatch(
        apiCallBegan({
            ...globalSearch(search, is_guest),
            displayToast: false,
            onStart,
            onSuccess,
            onError,
        })
    );
};

export const getPlaylistApi = ({
    onSuccess = () => { },
    onError = () => { },
    onStart = () => { } }) => {
    store.dispatch(
        apiCallBegan({
            ...getPlaylist(),
            displayToast: false,
            onStart,
            onSuccess,
            onError,
        })
    );
};
export const getYoutubePlaylistApi = ({
    onSuccess = () => { },
    onError = () => { },
    onStart = () => { } }) => {
    store.dispatch(
        apiCallBegan({
            ...getYoutubePlaylist(),
            displayToast: false,
            onStart,
            onSuccess,
            onError,
        })
    );
};
export const getYoutubeLiveVideosApi = ({
    onSuccess = () => { },
    onError = () => { },
    onStart = () => { } }) => {
    store.dispatch(
        apiCallBegan({
            ...getYoutubeLiveVideos(),
            displayToast: false,
            onStart,
            onSuccess,
            onError,
        })
    );
};
export const createPlaylistApi = ({
    title = '',
    onSuccess = () => { },
    onError = () => { },
    onStart = () => { } }) => {
    store.dispatch(
        apiCallBegan({
            ...createPlaylist(title),
            displayToast: false,
            onStart,
            onSuccess,
            onError,
        })
    );
};
export const deletePlaylistApi = ({
    id = null,
    onSuccess = () => { },
    onError = () => { },
    onStart = () => { } }) => {
    store.dispatch(
        apiCallBegan({
            ...deletePlaylist(id),
            displayToast: false,
            onStart,
            onSuccess,
            onError,
        })
    );
};
export const updatePlaylistApi = ({
    title = '',
    id = null,
    onSuccess = () => { },
    onError = () => { },
    onStart = () => { } }) => {
    store.dispatch(
        apiCallBegan({
            ...updatePlaylist(title, id),
            displayToast: false,
            onStart,
            onSuccess,
            onError,
        })
    );
};
export const updateProfileApi = ({
    first_name = '',
    last_name = '',
    mobile = null,
    gender = '',
    country_id = null,
    temple_id = null,
    uid = '',
    onSuccess = () => { },
    onError = () => { },
    onStart = () => { } }) => {
    store.dispatch(
        apiCallBegan({
            ...updateProfile(first_name, last_name, mobile, gender, country_id, temple_id, uid),
            displayToast: false,
            onStart,
            onSuccess,
            onError,
        })
    );
};
export const deleteAccountApi = ({
    onSuccess = () => { },
    onError = () => { },
    onStart = () => { } }) => {
    store.dispatch(
        apiCallBegan({
            ...deleteAccount(),
            displayToast: false,
            onStart,
            onSuccess,
            onError,
        })
    );
};
export const deleteMusicPlaylistApi = ({
    id = null,
    music_id = null,
    onSuccess = () => { },
    onError = () => { },
    onStart = () => { } }) => {
    store.dispatch(
        apiCallBegan({
            ...deleteMusicPlaylist(id, music_id),
            displayToast: false,
            onStart,
            onSuccess,
            onError,
        })
    );
};
export const saveMusicToPlaylistApi = ({
    id = null,
    music_id = null,
    onSuccess = () => { },
    onError = () => { },
    onStart = () => { } }) => {
    store.dispatch(
        apiCallBegan({
            ...saveMusicToPlaylist(id, music_id),
            displayToast: false,
            onStart,
            onSuccess,
            onError,
        })
    );
};

export const getMusicCategoryApi = ({
    limit = null,
    order = "",
    onSuccess = () => { },
    onError = () => { },
    onStart = () => { } }) => {
    store.dispatch(
        apiCallBegan({
            ...getMusicCategory(limit, order),
            displayToast: false,
            onStart,
            onSuccess,
            onError,
        })
    );
};
// // GET TEMPLES
export const getTemplesApi = async ({
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
export const logoutApi = async ({
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
export const getRecentlyPlayedMusicApi = ({
    onSuccess = () => { },
    onError = () => { },
    onStart = () => { } }) => {
    store.dispatch(
        apiCallBegan({
            ...getRecentlyPlayedMusic(),
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
    uid = null,
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
export const checkEmailApi = ({
    email = "",

    onSuccess = () => { },
    onError = () => { },
    onStart = () => { },
}) => {
    store.dispatch(
        apiCallBegan({
            ...checkEmail(email),
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