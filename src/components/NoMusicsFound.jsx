'use client'
import Image from "next/image"
import Link from "next/link"

const NoMusicsFound = () => {


    return (
        <div className='nodata_container'>
            <Image src='/no_data_found.png' alt='nodatafound' width={220} height={220} />
            <h5 className='text-white m-0'>No music found</h5>
            <Link href='/' className="home_btn">Home</Link>
        </div>
    )
}

export default NoMusicsFound