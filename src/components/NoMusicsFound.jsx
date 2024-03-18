'use client'
import Image from "next/image"

const NoMusicsFound = () => {
    return (
        <div className='nodata_container'>
            <Image src='/no_data_found.png' alt='nodatafound' width={220} height={220} />
            <h5 className='text-white m-0'>No music found</h5>
        </div>
    )
}

export default NoMusicsFound