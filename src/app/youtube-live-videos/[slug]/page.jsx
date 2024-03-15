'use client'
import GetYoutubeLIveVideos from "@/components/GetYoutubeLIveVideos"


const YoutubeLive = ({params}) => {
  return (
    <GetYoutubeLIveVideos youtubeLiveid={params} />
  )
}

export default YoutubeLive