import { createSlice } from "@reduxjs/toolkit";

const initialMusicPlaylistState = {
    MusicPlaylist: [],
    isPlaying: false,
    currentTrack: 0 ,
    isLiked: false,
};


const MusicPlaylistSlice = createSlice({
    name: 'MusicPlaylist',
    initialState: initialMusicPlaylistState,

    reducers: {
        setMusicPlaylist: (state, action) => {
            state.MusicPlaylist = action.payload;
        },
        setIsPlaying: (state, action) => {
            state.isPlaying = action.payload;
        },
        setCurrentTrack: (state, action) => {
            state.currentTrack = action.payload;
            
        },
        setIsLiked: (state, action) => {
            state.isLiked = action.payload;
        },
       
        resetState: (state) => {
            // Reset all states to their initial values
            Object.assign(state, initialMusicPlaylistState);
        },
    }
})

export default MusicPlaylistSlice;
export const { setMusicPlaylist, setIsPlaying, setCurrentTrack, setIsLiked, resetState } = MusicPlaylistSlice.actions;
