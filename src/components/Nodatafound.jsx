import Image from "next/image"


const Nodatafound = () => {
  return (
      <div className='d-flex flex-wrap align-items-center justify-content-center py-3 gap-3'>
          <Image src='/no_data_found.png' alt='nodatafound' width={150} height={150} />
          <p className='text-white'>No data found</p>
      </div>
  )
}

export default Nodatafound