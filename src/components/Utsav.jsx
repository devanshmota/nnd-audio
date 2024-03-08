'use client'
import Link from 'next/link'
import GetFirstWord from './GetFirstWord';
import GetLanguage from './GetLanguage';
import { useSelector } from 'react-redux';
import CategoryHeader from './CategoryHeader';

const Utsav = ({ utsav }) => {
    const { language } = useSelector((state) => state.language)
    return (
        <div className="container">
            <div className="container_arrow container-fluid p-0">
                <CategoryHeader
                    title="Utsav"
                    link="/utsav-all"
                    isShow={true}
                />
                <div className="row utsav_gap" id='utsav_images' >
                    {
                        utsav.slice(0, 6).map((item, index) => (
                            <Link href={`/utsav-all/${item.id}`} key={index} className="col-12 col-md-4">
                                <div className="d-flex flex-column gap-2 align-items-center justify-content-between">
                                    <img src={item.image} className="utshv_img" alt={`utsav_img_${index}`} />
                                    <h5 className='m-0 text-center'>
                                        {GetFirstWord(GetLanguage(language, item))}
                                    </h5>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Utsav