import OneUtsav from "@/components/OneUtsav"

const SingleUtsav = ({params}) => {
    return (
        <>
            <OneUtsav utsavid={params} />
            <br />
            <br />
        </>
    )
}

export default SingleUtsav