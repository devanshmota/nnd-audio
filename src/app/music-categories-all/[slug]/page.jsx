import AlbumMusic from "@/components/AlbumMusic"

const MusicAlbum = ({params}) => {
    return (
        <>
            <AlbumMusic categoryid={params} />
            <br />
            <br />
        </>
    )
}

export default MusicAlbum