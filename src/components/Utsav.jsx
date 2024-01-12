import Image from 'next/image';
import Link from 'next/link'

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
        <div className="div_container py-3 px-5 ">
            <div className="container_arrow container-fluid p-0">
                <div className="row">
                    <div className="col-lg-12 d-flex justify-content-between align-items-center">
                        <h2 className="titles_homepage m-0">Utsav</h2>
                        <Link href="/releases">View all</Link>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-lg-3">
                        <Image src='/r_music1.jpg' className="utshv_img" alt='utsav_img' width={0} height={0} />
                    </div>
                    <div className="col-lg-6">
                        <div className="row">
                            <div className="col-lg-4">
                                <Image src='/utshav_img_1.jpeg' className="utshv_img" alt='utsav_img' width={0} height={0} />
                            </div>
                            <div className="col-lg-8">
                                <Image src='/utshav_img_1.jpeg' className="utshv_img" alt='utsav_img' width={0} height={0} />
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col-lg-8">
                                <Image src='/jula_shree_ghanshyam.jpeg' className="utshv_img" alt='utsav_img' width={0} height={0} />
                            </div>
                            <div className="col-lg-4">
                                <Image src='/jula_shree_ghanshyam.jpeg' className="utshv_img" alt='utsav_img' width={0} height={0} />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <Image src='/jula_shree_ghanshyam.jpeg' className="utshv_img" alt='utsav_img' width={0} height={0} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Utsav