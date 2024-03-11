'use client'
import { getUtsavApi } from "@/redux/actions/Campaign"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import GetLanguage from "./GetLanguage"
import { ClipLoader } from "react-spinners"
import Link from "next/link"
import Nodataviewall from "./Nodataviewall"
import Pagination from "./ReactPagination"
import { t } from 'i18next';
import { withTranslation } from "react-i18next";
import { setCurrentAlbum } from "@/redux/reducer/CachedataSlice"


const AllUtsavCard = () => {

    const dispatch = useDispatch()
    const { language } = useSelector((state) => state.language)
    const [utsav, setUtsav] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    const [total, setTotal] = useState(0);
    const [offsetdata, setOffsetdata] = useState(0);
    const limit = 12;

    useEffect(() => {
        getUtsavApi({
            limit: limit,
            order: "asc",
            offset: offsetdata,
            onSuccess: (res) => {
                if(res.data){   
                    setUtsav(res.data)
                }
                setTotal(res.total)
                setIsLoading(false)
            },
            onError: (e) => {
                console.log(e)
                setIsLoading(false)
            }
        })
    }, [offsetdata])

    const handlePageChange = (selectedPage) => {
        const newOffset = selectedPage.selected * limit;
        setOffsetdata(newOffset);
        window.scrollTo(0, 0);
    };

    const handleCurrentAlbum = (id) => {
        const currentAlbum = utsav.find((item) => item.id === id)
        dispatch(setCurrentAlbum(currentAlbum))
    }

    return (
        <div className="container">
            <div className="row mt-5">
                {isLoading &&
                    <div className='d-flex align-items-center justify-content-center py-2'>
                        <ClipLoader color="#ffffff" />
                    </div>
                }
                <h1 className="text-white text-center m-0">{t('Utsav')}</h1>
                {utsav.length > 0 && utsav.map((item) => (
                    <div key={item.id} className="col-xxl-2 col-xl-3 col-lg-4 col-sm-6 d-flex justify-content-center align-items-center mt-5">
                        <Link href={`/utsav-all/${item.id}`} onClick={() => handleCurrentAlbum(item.id)} className="card-container text-white">
                            <Image src={item.image} alt={item.eng_name} className="rounded-4" width={200} height={200} />
                            <h6 className="m-0 align-self-baseline">{GetLanguage(language, item)}</h6>
                        </Link>
                    </div>
                ))
                }

            </div>
            {
                utsav.length > 0 && (
                    <div className="row mt-5">
                        <div className="col-12">
                            <Pagination pageCount={Math.ceil(total / limit)} onPageChange={handlePageChange} className='reactPagination' />
                        </div>
                    </div>
                )
            }
            {
                !isLoading && utsav.length === 0 && <Nodataviewall />
            }
        </div>
    )
}

export default withTranslation()(AllUtsavCard)