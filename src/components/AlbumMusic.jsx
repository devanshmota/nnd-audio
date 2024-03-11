'use client'
import { getAlbumApi } from "@/redux/actions/Campaign"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import GetLanguage from "./GetLanguage"
import { ClipLoader } from "react-spinners"
import Nodataviewall from "./Nodataviewall"
import Link from "next/link"
import Pagination from './ReactPagination.jsx'
import { setCurrentAlbum } from "@/redux/reducer/CachedataSlice"

const AlbumMusic = ({ categoryid }) => {

    const dispatch = useDispatch()
    const { language } = useSelector((state) => state.language)
    const [albums, setAlbums] = useState([])
    const [category, setCategory] = useState(null)
    const [isLoading, setIsLoading] = useState(true);

    const [total, setTotal] = useState(0);
    const [offsetdata, setOffsetdata] = useState(0);
    const limit = 12;

    useEffect(() => {
        getAlbumApi({
            category_id: categoryid.slug,
            offset: offsetdata,
            limit: limit,
            onSuccess: (res) => {
                if (res.data) {
                    setAlbums(res.data)
                    setCategory(res.data[0])
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
        const currentAlbum = albums.find((item) => item.id === id)
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
                <h1 className="text-white text-center m-0">{category?.category}</h1>
                {
                    albums.length > 0 && albums.map((item) => (
                        <div key={item.id} className="col-xxl-2 col-xl-3 col-lg-4 col-sm-6 d-flex justify-content-center mt-5">
                            <Link href={`/music-categories-all/${categoryid.slug}/${item.id}`} onClick={() => handleCurrentAlbum(item.id)} className="card-container text-white">
                                <Image src={item.image} alt={item.eng_name} className="rounded-4" width={200} height={200} />
                                <h6 className="m-0 align-self-baseline">{GetLanguage(language, item)}</h6>
                            </Link> 
                        </div>
                    ))
                }
            </div>
            {
                albums.length > 0 && (
                    <div className="row mt-5">
                        <div className="col-12">
                            <Pagination pageCount={Math.ceil(total / limit)} onPageChange={handlePageChange} className='reactPagination'/>
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

export default AlbumMusic