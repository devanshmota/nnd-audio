'use client'
import Image from 'next/image';
import Offcanvas from 'react-bootstrap/Offcanvas';

const NotificationCanvas = ({ show, onHide,notifications, ...props }) => {


    return (
        <Offcanvas placement="end" show={show} onHide={onHide} {...props}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Notifications</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>

                {
                    notifications?.length > 0 && notifications?.map((item) => (
                        <div key={item.id} className='d-flex align-items-center gap-2 ntfc_card mt-4'>



                            <Image
                                src={
                                    item.type === 'category'
                                        ? item.category.image
                                        : item.type === 'album'
                                            ? item.album.image
                                            : item.type === 'artist'
                                                ? item.artist.image
                                                : item.type === 'utsav'
                                                    ? item.utsav.image
                                                    : "/images/nnd_logo.png" 
                                }
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
                    ))
                }

            </Offcanvas.Body>
        </Offcanvas>
    )
}

export default NotificationCanvas