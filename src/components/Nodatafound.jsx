import Image from "next/image"


const Nodatafound = () => {
  return (
      <div className='nodata_container'>
          <Image src='/no_data_found.png' alt='nodatafound' width={150} height={150} />
          <p className='text-white'>No data found</p>
      </div>
  )
}

export default Nodatafound