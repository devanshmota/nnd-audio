import OneYoutubePlaylist from "@/components/OneYoutubePlaylist"



const SingleYoutubePlaylist = ({ params }) => {
    return (
        <>
            <OneYoutubePlaylist playlistid={params} />
            <br />
            <br />
        </>
    )
}

export default SingleYoutubePlaylist