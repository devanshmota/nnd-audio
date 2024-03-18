import Image from "next/image"


const Nodataviewall = () => {
    return (
        <div className='nodata_container'>
            <Image src='/no_data_found.png' alt='nodatafound' width={220} height={220} />
            <h5 className='text-white m-0'>No data found</h5>
        </div>
    )
}

export default Nodataviewall