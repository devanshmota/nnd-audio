import OneArtist from "@/components/OneArtist"

const SingleArtists = ({ params }) => {
    return (
        <>
            <OneArtist artistid={params} />
            <br />
            <br />
        </>
    )
}

export default SingleArtists