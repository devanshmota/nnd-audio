import 'swiper/css';
import 'swiper/css/navigation';
import MusicCategories from './MusicCategories';
import Utsav from './Utsav';
import Artists from './Artists';
import Lyricists from './Lyricists';
import Radio from './Radio';
import RecentlyPlayed from "./RecentlyPlayed";
import LiveKathaStream from "./LiveKathaStream";
import LatestAlbums from "./LatestAlbums";




const HomePage = () => {



  return (
    <>
        <LiveKathaStream />
        <MusicCategories />
        <LatestAlbums />
        <Utsav />
        <Artists />
        <Lyricists />
        <Radio />
        <RecentlyPlayed />
    </>
  )
}
export default HomePage
