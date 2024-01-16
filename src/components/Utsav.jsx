import Image from 'next/image';
import Link from 'next/link'
import img1 from '../../public/utshav_img_1.jpeg'

const utshav = [
    { id: 1, img: '/jula_shree_ghanshyam.jpeg', title: 'Hindola Kirtan' },
    { id: 2, img: '/r_music1.jpg', title: 'Hindola Kirtan' },
    { id: 3, img: '/r_music1.jpg', title: 'Hindola Kirtan' },
    { id: 4, img: '/r_music1.jpg', title: 'Hindola Kirtan' },
    { id: 5, img: '/r_music1.jpg', title: 'Hindola Kirtan' },
    { id: 6, img: '/r_music1.jpg', title: 'Hindola Kirtan' },
    { id: 7, img: '/r_music1.jpg', title: 'Hindola Kirtan' },
]

const Utsav = () => {
    return (
        <div className="div_container">
            <div className="container_arrow container-fluid p-0">
                <div className="row my-4">
                    <div className="col-sm-12 d-flex justify-content-between align-items-center">
                        <h2 className="titles_homepage m-0">Utsav</h2>
                        <Link href="/releases" className='view_all'>View all</Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-3 col-3">
                        <Image src={img1} className="utshv_img" alt='utsav_img' width={0} height={0} />
                    </div>
                    <div className="col-sm-6 col-6">
                        <div className="row">
                            <div className="col-sm-4 col-4">
                                <Image src={img1} className="utshv_img" alt='utsav_img' width={0} height={0} />
                            </div>
                            <div className="col-sm-8 col-8">
                                <Image src={img1} className="utshv_img" alt='utsav_img' width={0} height={0} />
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col-sm-8 col-8">
                                <Image src={img1} className="utshv_img" alt='utsav_img' width={0} height={0} />
                            </div>
                            <div className="col-sm-4 col-4">
                                <Image src={img1} className="utshv_img" alt='utsav_img' width={0} height={0} />
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3 col-3">
                        <Image src={img1} className="utshv_img" alt='utsav_img' width={0} height={0} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Utsav