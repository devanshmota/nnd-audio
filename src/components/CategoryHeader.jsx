import Link from 'next/link';
import { t } from 'i18next';
import { withTranslation } from "react-i18next";

const CategoryHeader = ({ title, onPrev, onNext, isBeginning, isEnd, link, isShow }) => {
    return (
        <div className="container_arrow d-flex justify-content-between align-items-center my-4">
            <h2 className="titles_homepage m-0">{t(title)}</h2>

            {
                isShow && <Link href={link} className='view_all'>{t('View all')}</Link>
            }
            
        </div>
    );
}

export default withTranslation()(CategoryHeader)