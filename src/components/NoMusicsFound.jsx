'use client'
import Image from "next/image"

const NoMusicsFound = () => {
    return (
        <div className='d-flex flex-column align-items-center justify-content-center py-3 gap-3 nomusic_height'>
            <Image src='/no_data_found.png' alt='nodatafound' width={220} height={220} />
            <h5 className='text-white m-0'>No music found</h5>
        </div>
    )
}

export default NoMusicsFound