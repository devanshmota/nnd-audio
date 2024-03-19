import GetAlbumMusic from "@/components/GetAlbumMusic"


const AlbumMusic = ({params}) => {
    return (
        <>
            <GetAlbumMusic albumid={params} />
            <br />
            <br />
        </>
    )
}

export default AlbumMusic