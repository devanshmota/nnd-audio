'use client'
import { Dropdown } from "antd"
import Image from "next/image"
import { DownOutlined } from '@ant-design/icons';

const AllPlaylist = () => {

    const items = [
        {
            label: 'Delete',
            key: '1',
        },
        {
            label: 'Rename',
            key: '2',
        },
    ];


    return (
        <div className="container text-white">
            {/* <div className="row">
                <div className="col-xl-3 col-xxl-2 col-lg-4 col-sm-6 d-flex justify-content-center mus_cat_container">
                    <div className="playlist_container text-white">
                        <Image src='/playlist_icon.svg' alt='playlist-icon' width={51} height={37} />
                        
                        <h5 className="m-0">Create Playlist</h5>

                    </div>
                </div>
            </div> */}

            <div className="row">
                <div className="col-xl-3 col-xxl-2 col-lg-4 col-sm-6 d-flex justify-content-center mus_cat_container">
                    <div className="playlist_container text-white">
                        <Image src='/playlist_icon.svg' alt='playlist-icon' width={51} height={37} />

                        <h5 className="m-0">Create Playlist</h5>

                    </div>
                </div>
                {
                    Array.from({ length: 6 }).map((item, index) => (
                        <div key={index} className="col-xl-3 col-xxl-2 col-lg-4 col-sm-6 d-flex justify-content-center mus_cat_container">
                            <div className="card-container text-white">
                                <Image src='/utshav_img_1.jpeg' alt='utshav_img_1' className="rounded" width={200} height={200} />
                                <div className="d-flex align-items-center justify-content-between w-100">

                                    <div className="d-flex flex-column">
                                        <h5 className="m-0">Morning Kirtan</h5>
                                        <p className="text-rec-pld">20 Songs</p>
                                    </div>
                                    <div>
                                        <Dropdown.Button
                                            icon={<DownOutlined />}
                                            
                                            menu={{
                                                items,
                                            }}
                            
                                        >
                            
                                        </Dropdown.Button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default AllPlaylist