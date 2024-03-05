'use client'
import Image from "next/image"
import { MdDelete } from "react-icons/md";

const Download = () => {

    const Downloads = useSelector((state) => state.downloads)

    return (
        <div className="container text-white">
            <div className="row">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="col-lg-6 mt-4">
                        <div className="d-flex align-items-center justify-content-between text-white music_card">
                            <div className="d-flex align-items-center gap-3">
                                <Image src='/person_1.jpeg' alt='person_1' className="rounded" width={80} height={80} />
                                <div className="d-flex flex-column gap-2">
                                    <h5 className="m-0 text-break title_rcnt_plyd">Re Sagapan Harivar Nu Sach</h5>
                                    <p className="text-rec-pld desc_rcnt_plyd">Kirtan</p>
                                </div>
                            </div>
                            <MdDelete className="md-delete" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Download