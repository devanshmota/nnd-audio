'use client'
import Image from 'next/image'
import noImg from '../../public/noImageFound.svg'
import toast from 'react-hot-toast'
import { t } from 'i18next';
import { withTranslation } from "react-i18next";
import { setCurrentTrack, setIsPlaying, setMusicPlaylist } from '@/redux/reducer/MusicPlaylistSlice';
import { useDispatch } from 'react-redux';

const SongPageHeader = ({ src, title, playlist }) => {

  const dispatch = useDispatch()
  const handlePlayAll = () => {
    dispatch(setMusicPlaylist(playlist))
    dispatch(setCurrentTrack(0))
    dispatch(setIsPlaying(true))
    toast.success(t('Playing All'))
  }

  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="d-flex flex-column flex-lg-row align-items-center gap-4 pb-4 py-5 brdr_btm">
          <Image src={src || noImg} alt="profile" width={180} height={180} className="prfl_img" />
          <div className="d-flex flex-column gap-4">
            <h2 className="m-0">{title} </h2>
            <button className="dwnl_ply_btn" onClick={handlePlayAll}>{t('Play All')}</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withTranslation()(SongPageHeader)