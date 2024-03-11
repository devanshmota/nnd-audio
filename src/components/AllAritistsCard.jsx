'use client'
import { getArtistsApi } from "@/redux/actions/Campaign"
import Image from "next/image"
import { useEffect, useState } from "react"
import GetLanguage from "./GetLanguage"
import { useSelector } from "react-redux"
import { ClipLoader } from "react-spinners"
import Link from "next/link"
import Nodataviewall from "./Nodataviewall"
import Pagination from "./ReactPagination"
import { t } from 'i18next';
import { withTranslation } from "react-i18next";


const AllAritistsCard = () => {
    const { language } = useSelector((state) => state.language)
    const [artists, setArtists] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    const [total, setTotal] = useState(0);
    const [offsetdata, setOffsetdata] = useState(0);
    const limit = 12;

    useEffect(() => {
        getArtistsApi({
            limit: limit,
            order: "asc",
            offset: offsetdata,
            onSuccess: (res) => {
                if (res.data) {
                    setArtists(res.data)

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
                <h1 className="text-white text-center m-0">{t('Artists')}</h1>
                {artists.length > 0 && artists.map((item) => (
                    <Link href={`/artists-all/${item.id}`} key={item.id} className="col-xxl-2 col-xl-3 col-lg-4 col-sm-6 d-flex justify-content-center mt-5">
                        <div className="card-container text-white">
                            <Image src={item.image} alt={item.eng_name} className="rounded-4" width={200} height={200} />
                            <h6 className="m-0 align-self-baseline">{GetLanguage(language, item)}</h6>
                        </div>
                    </Link>
                ))

                }
            </div>
            {
                artists.length > 0 && (
                    <div className="row mt-5">
                        <div className="col-12">
                            <Pagination pageCount={Math.ceil(total / limit)} onPageChange={handlePageChange} className='reactPagination' />
                        </div>
                    </div>
                )
            }
            {
                !isLoading && artists.length === 0 && <Nodataviewall />
            }
        </div>
    )
}

export default withTranslation()(AllAritistsCard)