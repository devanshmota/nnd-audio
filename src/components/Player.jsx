'use client'
import { useRef, useState, useEffect } from "react";
import ReactHowler from "react-howler";
import { getDecryptedText } from "@/decryption/decryption";
import Image from "next/image";
import OffCanvas from "./OffCanvas";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentTrack, setIsPlaying, setIsLiked, resetState } from "@/redux/reducer/MusicPlaylistSlice";
import GetLanguage from "./GetLanguage";
import lyricsIcon from '../../public/lyrics.svg'
import { setLyricsLanguage } from "@/redux/reducer/CachedataSlice";
import heartFilled from '../../public/heart_fill.svg'
import heartIcon from '../../public/nnd/Heart_stork.svg'
import prevSongIcon from '../../public/nnd/Backword_Line_30px.svg'
import pauseIcon from '../../public/nnd/Puash_Line_30px.svg'
import playIcon from '../../public/nnd/Play_Line_30px.svg'
import nextIcon from '../../public/nnd/Forword_Line_30px.svg'
import volumeIcon from '../../public/nnd/volume on.svg'
import volumeMute from '../../public/nnd/0ff.svg'
import shareIcon from '../../public/nnd/song_Share.svg'
import toast from "react-hot-toast";
import { t } from 'i18next';
import { withTranslation } from "react-i18next";
import { Slider } from "antd";
import Link from "next/link";


const Player = () => {

    const dispatch = useDispatch()
    const { LyricsLanguage } = useSelector(state => state.cachedata);
    const { language } = useSelector((state) => state.language)
    const { MusicPlaylist, isPlaying, currentTrack, isLiked } = useSelector(state => state.MusicPlaylist)
    const [issLiked, setIssLiked] = useState(false)
    const [volume, setVolume] = useState(0.5)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const playerRef = useRef(null)
    const animationRef = useRef()
    const [isMuted, setIsMuted] = useState(false);
    const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false)
    const [selectedMusicId, setSelectedMusicId] = useState(null)

    const [IsLyricsOpen, setIsLyricsOpen] = useState(false)
    const [FontSize, setFontSize] = useState(16)
    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setIsLyricsOpen(false)
            }
        };

        document.body.addEventListener('click', handleClickOutside);

        return () => {
            document.body.removeEventListener('click', handleClickOutside);
        };
    }, [IsLyricsOpen]);

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
        setIsLyricsOpen(true)
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

    const copyToClip = async () => {
        await navigator.clipboard.writeText(location.href)
        toast.success(t('Link copied to clipboard'))
    }

    const marks = {
        12: '12',
        14: '14',
        16: '16',
        18: '18',
        20: '20',
        22: '22'
    };

    return (
        <>

            <div className="music_player_container ms_player_wrapper">
                <div className="d-flex flex-column justify-content-center song_detail">
                    <div className="d-flex align-items-center gap-2">
                        <Image src={MusicPlaylist && MusicPlaylist[currentTrack]?.album?.image || MusicPlaylist[currentTrack]?.image || MusicPlaylist[currentTrack]?.img} alt="song" className="rounded" width={50} height={50} />
                        <div className="d-flex flex-column gap-1">
                            <h5 className="text-white m-0 title_rcnt_plyd">{MusicPlaylist && GetLanguage(language, MusicPlaylist[currentTrack])}</h5>
                            <p className="text-rec-pld">{MusicPlaylist && GetLanguage(language, MusicPlaylist[currentTrack]?.category)}</p>
                        </div>
                    </div>
                    {
                        MusicPlaylist[currentTrack]?.tags?.length > 0 && <div className="song_tags">
                            {
                                MusicPlaylist[currentTrack]?.tags?.map(item =>
                                    <Link href={`/music/${item.id}`} key={item.id}>{GetLanguage(language, item)}</Link>
                                )
                            }
                        </div>
                    }
                </div>

                <div className="d-flex align-items-center gap-3">
                    <Image src={prevSongIcon} width={24} height={24} onClick={playPrev} className="music_player_icon" />
                    <div onClick={playPauseToggle} className="d-flex align-items-center">
                        {isPlaying ? <Image src={pauseIcon} width={24} height={24} className="music_player_icon" /> : <Image src={playIcon} width={24} height={24} className="music_player_icon" />}
                    </div>

                    <Image src={nextIcon} width={24} height={24} onClick={playNext} className="music_player_icon" />
                </div>

                <div className="progress_container">
                    <span>{formatTime(currentTime)}</span>
                    <progress
                        value={currentTime}
                        max={duration || 1}
                        onClick={handleSeek}
                        className="w-100"
                    />
                    <span>{formatTime(duration)}</span>
                </div>

                <div className="icons_player">

                    {MusicPlaylist[currentTrack]?.eng_lyrics ? (
                        <Image
                            src={lyricsIcon}
                            alt=""
                            width={22}
                            height={22}
                            className="music_player_icon"
                            onClick={handleLyrics}
                            title="Lyrics"
                        />
                    ) : (
                        IsLyricsOpen && setIsLyricsOpen(false) // Check if IsLyricsOpen is true before setting it to false
                    )}

                    {
                        IsLyricsOpen && (
                            <div className="lyricsContainer d-flex flex-column gap-3" ref={modalRef}>
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


                                        <Slider marks={marks} step={null} min={12} max={22} defaultValue={16} onChange={handleFontChange} dots={false} />
                                    </center>
                                </div>
                            </div>
                        )
                    }
                    <Image src={shareIcon} width={24} height={24} alt="shareIcon" onClick={copyToClip} className="cursor-pointer" />
                    {
                        MusicPlaylist && MusicPlaylist[currentTrack]?.playlist?.length > 0 ? (
                            <Image src={heartFilled} alt="heart" width={25} height={25} className="icon_recent_plyd liked_rcnt music_player_icon" onClick={() => handleSave(MusicPlaylist && MusicPlaylist[currentTrack]?.id)} />
                        )
                            :
                            (
                                <Image src={heartIcon} className="icon_recent_plyd music_player_icon" onClick={() => handleSave(MusicPlaylist && MusicPlaylist[currentTrack]?.id)} width={25} height={25} />
                            )
                    }
                    <div className="d-flex align-items-center gap-2">
                        {
                            isMuted ? <Image src={volumeMute} width={24} height={24} className="music_player_icon" onClick={toggleMute} /> : <Image src={volumeIcon} width={24} height={24} className="music_player_icon" onClick={toggleMute} />
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
            <OffCanvas show={isOffCanvasOpen} onHide={() => setIsOffCanvasOpen(false)} handleSave={handleSave} selectedMusicId={selectedMusicId} setIsLiked={setIssLiked} isLiked={issLiked} />
        </>
    );
};

export default withTranslation()(Player);
