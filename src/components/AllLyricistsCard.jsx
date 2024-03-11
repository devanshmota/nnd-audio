'use client'
import { getLyricistsApi } from "@/redux/actions/Campaign"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import GetLanguage from "./GetLanguage"
import { ClipLoader } from "react-spinners"
import Link from "next/link"
import Nodataviewall from "./Nodataviewall"
import Pagination from "./ReactPagination.jsx"
import { t } from 'i18next';
import { withTranslation } from "react-i18next";


const AllLyricistsCard = () => {

    const { language } = useSelector((state) => state.language)
    const [lyricists, setLyricists] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    const [total, setTotal] = useState(0);
    const [offsetdata, setOffsetdata] = useState(0);
    const limit = 12;

    useEffect(() => {
        getLyricistsApi({
            limit: limit,
            order: "asc",
            offset: offsetdata,
            onSuccess: (res) => {
                if (res.data) {
                    setLyricists(res.data)
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

    return (
        <div className="container">
            <div className="row mt-5">
                {isLoading &&
                    <div className='d-flex align-items-center justify-content-center py-2'>
                        <ClipLoader color="#ffffff" />
                    </div>
                }
                <h1 className="text-white text-center m-0">{t('Lyricists')}</h1>
                {lyricists.length > 0 && lyricists.map((item) => (
                    <div key={item.id} className="col-xxl-2 col-xl-3 col-lg-4 col-sm-6 d-flex justify-content-center mt-5">
                        <Link href={`/lyricists-all/${item.id}`} className="lyricits-container text-white">
                            <Image src={item.image} alt={item.eng_name} width={200} height={200} />
                            <h6 className="m-0">{GetLanguage(language, item)}</h6>
                        </Link>
                    </div>
                ))
                }
            </div>
            {
                lyricists.length > 0 && (
                    <div className="row mt-5">
                        <div className="col-12">
                            <Pagination pageCount={Math.ceil(total / limit)} onPageChange={handlePageChange} className='reactPagination'/>
                        </div>
                    </div>
                )
            }
            {
                !isLoading && lyricists.length === 0 && <Nodataviewall />
            }
        </div>
    )
}

export default withTranslation()(AllLyricistsCard)