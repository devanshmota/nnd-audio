'use client'
import Image from "next/image"

const NoMusicsFound = () => {
    return (
        <div className='d-flex flex-column align-items-center justify-content-center py-3 gap-3 nomusic_height'>
            <Image src='/no_data_found.png' alt='nodatafound' width={150} height={150} />
            <p className='text-white'>No music found</p>
        </div>
    )
}

export default NoMusicsFound