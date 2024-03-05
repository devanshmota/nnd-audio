'use client'
import { useRef, useState, useEffect } from "react";
import ReactHowler from "react-howler";
import { getDecryptedText } from "@/decryption/decryption";
import Image from "next/image";
import { MdSkipPrevious } from "react-icons/md";
import { MdSkipNext } from "react-icons/md";
import { IoIosPause, IoIosPlay } from "react-icons/io";
import { BiSolidVolumeFull, BiSolidVolumeMute } from "react-icons/bi";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import OffCanvas from "./OffCanvas";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentTrack, setIsPlaying, setIsLiked, resetState } from "@/redux/reducer/MusicPlaylistSlice";

const Player = () => {

    const dispatch = useDispatch()
    const { MusicPlaylist, isPlaying, currentTrack, isLiked } = useSelector(state => state.MusicPlaylist);
    const [volume, setVolume] = useState(0.5);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const playerRef = useRef(null);
    const animationRef = useRef();
    const [isMuted, setIsMuted] = useState(false);
    const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false)
    const [selectedMusicId, setSelectedMusicId] = useState(null);

    const handleSeekUpdate = () => {
        setCurrentTime(playerRef?.current?.seek());
        animationRef.current = requestAnimationFrame(handleSeekUpdate);
    };

    useEffect(() => {
        animationRef.current = requestAnimationFrame(handleSeekUpdate);
        return () => cancelAnimationFrame(animationRef.current);
    }, []);


    const playPauseToggle = () => {
        dispatch(setIsPlaying(!isPlaying))
    };

    const playNext = () => {
        if (MusicPlaylist && MusicPlaylist.length > 0) {
            dispatch(setCurrentTrack((currentTrack + 1) % MusicPlaylist.length));
            dispatch(setIsPlaying(true));
        }
    };

    const playPrev = () => {
        if (MusicPlaylist && MusicPlaylist.length > 0) {
            dispatch(setCurrentTrack((currentTrack - 1 + MusicPlaylist.length) % MusicPlaylist.length));
            dispatch(setIsPlaying(true));
        }
    };

    const handleVolumeChange = (value) => {
        setVolume(value);
        playerRef.current.volume(value);
    };

    const handleEnd = () => {
        playNext();
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    const handleSeek = (e) => {
        const seekTime = (e.nativeEvent.offsetX / e.target.offsetWidth) * duration;
        playerRef.current.seek(seekTime);
        setCurrentTime(seekTime);
    };

    const handleLoad = () => {
        setDuration(playerRef.current.duration());
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
        const newVolume = isMuted ? 0.5 : 0; // Adjust the volume accordingly
        setVolume(newVolume);
        playerRef.current.volume(newVolume);
    };

    const handleSave = (musicId) => {
        setSelectedMusicId(musicId);
        setIsOffCanvasOpen(true)
    }

    if (MusicPlaylist.length === 0) {
        return
    }

    return (
        <>
            <div className="d-flex align-items-center justify-content-between w-100 text-white ms_player_wrapper">
                <div className="d-flex gap-2">
                    <Image src={MusicPlaylist && MusicPlaylist[currentTrack]?.album.image} alt="song" className="rounded" width={50} height={50} />
                    <div className="d-flex flex-column gap-1">
                        <h5 className="text-white m-0">{MusicPlaylist && MusicPlaylist[currentTrack]?.eng_title}</h5>
                        <p className="text-rec-pld">{MusicPlaylist && MusicPlaylist[currentTrack]?.category?.eng_name}</p>
                    </div>
                </div>

                <div className="d-flex align-items-center gap-3">

                    <MdSkipPrevious onClick={playPrev} className="music_player_icon" />

                    <div onClick={playPauseToggle} className="d-flex align-items-center">
                        {isPlaying ? <IoIosPause className="music_player_icon" /> : <IoIosPlay className="music_player_icon" />}
                    </div>

                    <MdSkipNext onClick={playNext} className="music_player_icon" />
                </div>

                <div className="d-flex align-items-center gap-1 w-50">
                    <span>{formatTime(currentTime)}</span>
                    <progress
                        value={currentTime}
                        max={duration || 1}
                        onClick={handleSeek}
                        className="w-100"
                    />
                    <span>{formatTime(duration)}</span>
                </div>

                <div className="d-flex align-items-center gap-2">


                    {
                        MusicPlaylist && MusicPlaylist[currentTrack]?.playlist.length > 0 ? (
                            <FaHeart className="icon_recent_plyd liked_rcnt" onClick={() => handleSave(MusicPlaylist && MusicPlaylist[currentTrack]?.id)} />
                        )
                            :
                            (
                                <FaRegHeart className="icon_recent_plyd" onClick={() => handleSave(MusicPlaylist && MusicPlaylist[currentTrack]?.id)} />
                            )
                    }
                    {
                        isMuted ? <BiSolidVolumeMute className="music_player_icon" onClick={toggleMute} /> : <BiSolidVolumeFull className="music_player_icon" onClick={toggleMute} />
                    }
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                    />
                </div>
                {
                    MusicPlaylist.length > 0 && currentTrack !== undefined &&
                    <ReactHowler
                        src={getDecryptedText(MusicPlaylist && MusicPlaylist[currentTrack]?.audio_url)}
                        playing={isPlaying}
                        volume={volume}
                        ref={playerRef}
                        onEnd={handleEnd}
                        onLoad={handleLoad}
                        html5={true}
                    />
                }

            </div>
            <OffCanvas show={isOffCanvasOpen} onHide={() => setIsOffCanvasOpen(false)} handleSave={handleSave} selectedMusicId={selectedMusicId} setIsLiked={setIsLiked} isLiked={isLiked} />
        </>
    );
};

export default Player;
