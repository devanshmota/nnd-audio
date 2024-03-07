'use client'
import Link from 'next/link'
import GetFirstWord from './GetFirstWord';
import GetLanguage from './GetLanguage';
import { useSelector } from 'react-redux';
import { t } from 'i18next';
import { withTranslation } from "react-i18next";

const Utsav = ({ utsav }) => {

    const { language } = useSelector((state) => state.language)

    return (
        <div className="container">
            <div className="container_arrow container-fluid p-0">
                <div className="row my-4">
                    <div className="col-sm-12 d-flex justify-content-between align-items-center">
                        <h2 className="titles_homepage m-0">{t('Utsav')}</h2>
                        <Link href="/utsav-all" className='view_all'>{t('View all')}</Link>
                    </div>
                </div>
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

export default withTranslation()(Utsav)