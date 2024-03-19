'use client'
import { getAlbumApi } from "@/redux/actions/Campaign"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import GetLanguage from "./GetLanguage"
import { ClipLoader } from "react-spinners"
import Nodataviewall from "./Nodataviewall"
import Pagination from './ReactPagination.jsx'
import BreadCrumb from "./BreadCrumb"
import { t } from 'i18next';
import { withTranslation } from "react-i18next";
import Card from "./Card"

const AlbumMusic = ({ categoryid }) => {

    const dispatch = useDispatch()
    const { language } = useSelector((state) => state.language)
    const [albums, setAlbums] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [offsetdata, setOffsetdata] = useState(0);
    const limit = 18;

    useEffect(() => {
        getAlbumApi({
            category_id: categoryid.slug,
            offset: offsetdata,
            limit: limit,
            onSuccess: (res) => {
                if (res.data) {
                    setAlbums(res.data)
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
                <BreadCrumb title={t('Music Categories')} category={t(albums[0]?.category)} link1='/music-categories' />
            </div>
            <div className="row mt-5 row_gap">
                {isLoading &&
                    <div className='d-flex align-items-center justify-content-center py-2'>
                        <ClipLoader color="#ffffff" />
                    </div>
                }

                {
                    albums.length > 0 && albums.map((item, index) => (

                        <Card key={index} href={`/music-categories/${categoryid.slug}/${item.id}`} src={item.image} alt={item.eng_name} title={GetLanguage(language, item)} />
                    ))
                }
            </div>
            {
                total > 18 && albums.length > 0 && (
                    <div className="row">
                        <div className="col-12">
                            <Pagination pageCount={Math.ceil(total / limit)} onPageChange={handlePageChange} className='reactPagination' />
                        </div>
                    </div>
                )
            }

            {
                !isLoading && albums.length === 0 && <Nodataviewall />
            }
        </div>
    )
}

export default withTranslation()(AlbumMusic)