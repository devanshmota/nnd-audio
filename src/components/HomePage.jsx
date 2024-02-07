import Sidebar from "./Sidebar"
import 'swiper/css';
import 'swiper/css/navigation';
import MusicCategories from './MusicCategories';
import LatestRelease from './LatestRelease';
import Utsav from './Utsav';
import Artists from './Artists';
import Lyricists from './Lyricists';
import Radio from './Radio';
import RecentlyPlayed from "./RecentlyPlayed";




const HomePage = () => {



  return (
    <>
      <MusicCategories />
      <LatestRelease />
      <Utsav />
      <Artists />
      <Lyricists />
      <Radio />
      <RecentlyPlayed />
    </>
  )
}
export default HomePage
