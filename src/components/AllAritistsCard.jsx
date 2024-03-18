'use client'
import { getArtistsApi } from "@/redux/actions/Campaign"
import Image from "next/image"
import { useEffect, useState } from "react"
import GetLanguage from "./GetLanguage"
import { useDispatch, useSelector } from "react-redux"
import { ClipLoader } from "react-spinners"
import Link from "next/link"
import Nodataviewall from "./Nodataviewall"
import Pagination from "./ReactPagination"
import { t } from 'i18next';
import { withTranslation } from "react-i18next";
import { setCurrentAlbum } from "@/redux/reducer/CachedataSlice"
import BreadCrumb from "./BreadCrumb"
import noImg from '../../public/noImageFound.svg'
import Card from "./Card"


const AllAritistsCard = () => {
    const dispatch = useDispatch()
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
    const handleCurrentAlbum = (id) => {
        const currentAlbum = artists.find((item) => item.id === id)
        dispatch(setCurrentAlbum(currentAlbum))
    }


    return (
        <div className="container">
            <div className="row mt-5 row_gap">
                {isLoading &&
                    <div className='d-flex align-items-center justify-content-center py-2'>
                        <ClipLoader color="#ffffff" />
                    </div>
                }
                <BreadCrumb title={t('Artists')} />
                {artists.length > 0 && artists.map((item, index) => (
                    <Card key={index} href={`/artists-all/${item.id}`} src={item.image} alt={item.eng_name} title={GetLanguage(language, item)} />
                ))

                }
            </div>
            {
                total > 18 && artists.length > 0 && (
                    <div className="row">
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