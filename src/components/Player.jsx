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
import GetLanguage from "./GetLanguage";
import lyricsIcon from '../../public/lyrics.svg'
import { setLyricsLanguage } from "@/redux/reducer/CachedataSlice";

const Player = () => {

    const dispatch = useDispatch()
    const { LyricsLanguage } = useSelector(state => state.cachedata);
    const { language } = useSelector((state) => state.language)
    const { MusicPlaylist, isPlaying, currentTrack, isLiked } = useSelector(state => state.MusicPlaylist)
    const [volume, setVolume] = useState(0.5)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const playerRef = useRef(null)
    const animationRef = useRef()
    const [isMuted, setIsMuted] = useState(false);
    const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false)
    const [selectedMusicId, setSelectedMusicId] = useState(null)

    const [IsLyricsOpen, setIsLyricsOpen] = useState(false)
    const [FontSize, setFontSize] = useState(14)

    // useEffect(() => {
    //     dispatch(resetState())
    // }, [])

    useEffect(() => {
        dispatch(setIsPlaying(false))
    }, [])

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
        if (MusicPlaylist && MusicPlaylist?.length > 0) {
            dispatch(setCurrentTrack((currentTrack + 1) % MusicPlaylist?.length));
            dispatch(setIsPlaying(true));
        }
    };

    const playPrev = () => {
        if (MusicPlaylist && MusicPlaylist?.length > 0) {
            dispatch(setCurrentTrack((currentTrack - 1 + MusicPlaylist?.length) % MusicPlaylist?.length));
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

    if (MusicPlaylist?.length === 0) {
        return null
    }

    const handleLyrics = () => {
        setIsLyricsOpen(!IsLyricsOpen)
    }

    const handleFontChange = (value) => {
        setFontSize(value)
    }

    const setEng = () => {
        dispatch(setLyricsLanguage('English'))
    }
    const setGuj = () => {
        dispatch(setLyricsLanguage('Gujarati'))
    }

    return (
        <>
            <div className="d-flex align-items-center justify-content-between w-100 text-white ms_player_wrapper">
                <div className="d-flex gap-2">
                    <Image src={MusicPlaylist && MusicPlaylist[currentTrack]?.album?.image || MusicPlaylist[currentTrack]?.image} alt="song" className="rounded" width={50} height={50} />
                    <div className="d-flex flex-column gap-1">
                        <h5 className="text-white m-0 title_rcnt_plyd">{MusicPlaylist && GetLanguage(language, MusicPlaylist[currentTrack])}</h5>
                        <p className="text-rec-pld">{MusicPlaylist && GetLanguage(language, MusicPlaylist[currentTrack]?.category)}</p>
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

                <div className="position-relative d-flex align-items-center gap-3">

                    {MusicPlaylist[currentTrack]?.eng_lyrics ? (
                        <Image
                            src={lyricsIcon}
                            alt=""
                            width={25}
                            height={25}
                            className="music_player_icon"
                            onClick={handleLyrics}
                        />
                    ) : (
                        IsLyricsOpen && setIsLyricsOpen(false) // Check if IsLyricsOpen is true before setting it to false
                    )}

                    {
                        IsLyricsOpen && (
                            <div className="lyricsContainer d-flex flex-column gap-3">
                                <div className="d-flex align-items-center justify-content-between">
                                    <p className="lyrics_title">Lyrics</p>
                                    <div className="toggle">
                                        <span className={`toggle_item ${LyricsLanguage === 'English' ? "active_toggle" : ""}`} onClick={setEng}>en</span>
                                        <span className={`toggle_item ${LyricsLanguage === 'Gujarati' ? "active_toggle" : ""}`} onClick={setGuj}>ગુજ</span>
                                    </div>
                                </div>

                                <p className="lyricContent" style={{ fontSize: `${FontSize}px` }}>
                                    {LyricsLanguage === 'English' ? MusicPlaylist[currentTrack]?.eng_lyrics : MusicPlaylist[currentTrack]?.guj_lyrics}
                                </p>

                                <div className="d-flex flex-column gap-1">
                                    <center className="fontSize">Font Size ({FontSize}px)</center>
                                    <center>
                                        <input
                                            type="range"
                                            min="12"
                                            max="22"
                                            step="2"
                                            value={FontSize}
                                            className="w-100"
                                            onChange={(e) => handleFontChange(e.target.value)}
                                        />
                                    </center>
                                </div>
                            </div>
                        )
                    }


                    {
                        MusicPlaylist && MusicPlaylist[currentTrack]?.playlist?.length > 0 ? (
                            <FaHeart className="icon_recent_plyd liked_rcnt music_player_icon" onClick={() => handleSave(MusicPlaylist && MusicPlaylist[currentTrack]?.id)} />
                        )
                            :
                            (
                                <FaRegHeart className="icon_recent_plyd music_player_icon" onClick={() => handleSave(MusicPlaylist && MusicPlaylist[currentTrack]?.id)} />
                            )
                    }
                    <div className="d-flex align-items-center gap-1">
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

                </div>
            </div>
            {
                MusicPlaylist?.length > 0 && currentTrack !== undefined &&
                <ReactHowler
                    src={getDecryptedText(MusicPlaylist && MusicPlaylist[currentTrack]?.audio_url) || getDecryptedText(MusicPlaylist && MusicPlaylist[currentTrack]?.url)}
                    playing={isPlaying}
                    volume={volume}
                    ref={playerRef}
                    onEnd={handleEnd}
                    onLoad={handleLoad}
                    html5={true}
                />
            }
            <OffCanvas show={isOffCanvasOpen} onHide={() => setIsOffCanvasOpen(false)} handleSave={handleSave} selectedMusicId={selectedMusicId} setIsLiked={setIsLiked} isLiked={isLiked} />
        </>
    );
};

export default Player;
