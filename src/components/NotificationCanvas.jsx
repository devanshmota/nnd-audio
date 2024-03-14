'use client'
import Image from 'next/image';
import Link from 'next/link';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { t } from 'i18next';
import { withTranslation } from "react-i18next";


const NotificationCanvas = ({ show, onHide, notifications, ...props }) => {

    return (
        <Offcanvas placement="end" show={show} onHide={onHide} {...props}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>{t('Notifications')}</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {notifications?.length > 0 &&
                    notifications?.map((item) => (
                        Object.keys(item.category).length > 0 ? (
                            <Link href={`/music-categories-all/${item.category.id}`}
                                className='d-flex align-items-center gap-2 ntfc_card mb-4' key={item.id}>
                                <Image
                                    src={item.type === 'category' ? item.category.image : item.type === 'album' ? item.album.image : item.type === 'artist' ? item.artist.image : item.type === 'utsav' ? item.utsav.image : "/images/nnd_logo.png"}
                                    alt='person'
                                    width={50}
                                    height={50}
                                    className='rounded'
                                />
                                <div className='d-flex flex-column gap-1'>
                                    <h6 className='m-0'>{item.title}</h6>
                                    <p className='ntfc_desc'>{item.message}</p>
                                </div>
                            </Link>
                        ) : (
                            <div key={item.id} className='d-flex align-items-center gap-2 ntfc_card mb-4'>
                                <Image
                                    src="/images/nnd_logo.png"
                                    alt='person'
                                    width={50}
                                    height={50}
                                    className='rounded'
                                />
                                <div className='d-flex flex-column gap-1'>
                                    <h6 className='m-0'>{item.title}</h6>
                                    <p className='ntfc_desc'>{item.message}</p>
                                </div>
                            </div>
                        )
                    ))}
            </Offcanvas.Body>
        </Offcanvas>

    )
}

export default withTranslation()(NotificationCanvas)