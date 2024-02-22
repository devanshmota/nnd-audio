import OneLyricist from "@/components/OneLyricist"


const SingleLyricist = ({ params }) => {
    return (
        <>
            <OneLyricist lyricistid={params} />
            <br />
            <br />
        </>
    )
}

export default SingleLyricist