'use client'
import { getMusicCategoryApi } from "@/redux/actions/Campaign"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import GetLanguage from "./GetLanguage"
import { ClipLoader } from "react-spinners"
import Nodataviewall from "./Nodataviewall"
import Link from "next/link"
import BreadCrumb from "./BreadCrumb"
import { t } from 'i18next';
import { withTranslation } from "react-i18next";
import { setBreadcrumbCategory } from "@/redux/reducer/CachedataSlice"
import Pagination from './ReactPagination.jsx'


const MusicCategoryallCard = () => {

    const dispatch = useDispatch()
    const { language } = useSelector((state) => state.language)
    const [musicCategory, setMusicCategory] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    const [total, setTotal] = useState(0);
    const [offsetdata, setOffsetdata] = useState(0);
    const limit = 12;

    useEffect(() => {
        getMusicCategoryApi({
            limit: limit,
            order: "asc",
            offset: offsetdata,
            onSuccess: (res) => {
                if (res.data) {
                    setMusicCategory(res.data)
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

    const handleBreadcrumbCategory = (id) => {
        const currentCategory = musicCategory.find((item) => item.id === id)
        dispatch(setBreadcrumbCategory(currentCategory))
    }

    return (
        <>
            <div className="container">
                <div className="row mt-4">
                    {isLoading &&
                        <div className='d-flex align-items-center justify-content-center py-2'>
                            <ClipLoader color="#ffffff" />
                        </div>
                    }
                    <BreadCrumb title={t('Music Categories')} />
                    {
                        musicCategory.length > 0 && musicCategory.map((item) => (
                            <div key={item.id} className="col-xl-2 col-lg-3 col-sm-4 col-6 d-flex justify-content-center mt-4">
                                <Link href={`/music-categories-all/${item.id}`} onClick={() => handleBreadcrumbCategory(item.id)} className="card-container text-white">
                                    <Image src={item.image} alt={item.eng_name} className="rounded-4 view_all_images" layout="intrinsic" width={200} height={200} />
                                    <h6 className="m-0 align-self-baseline">{GetLanguage(language, item)}</h6>
                                </Link>
                            </div>
                        ))
                    }
                </div>
                {
                    total > 12 && musicCategory.length > 0 && (
                        <div className="row">
                            <div className="col-12">
                                <Pagination pageCount={Math.ceil(total / limit)} onPageChange={handlePageChange} className='reactPagination' />
                            </div>
                        </div>
                    )
                }
                {
                    !isLoading && musicCategory.length === 0 && <Nodataviewall />
                }
            </div>
        </>
    );
}

export default withTranslation()(MusicCategoryallCard)