'use client'
import { getAlbumApi } from "@/redux/actions/Campaign"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import GetLanguage from "./GetLanguage"
import { ClipLoader } from "react-spinners"
import Nodataviewall from "./Nodataviewall"
import Link from "next/link"
import Pagination from './ReactPagination.jsx'

const AlbumMusic = ({ categoryid }) => {

    const { language } = useSelector((state) => state.language)
    const [albums, setAlbums] = useState([])
    const [category, setCategory] = useState(null)
    const [isLoading, setIsLoading] = useState(true);

    const [total, setTotal] = useState(0);
    const [offsetdata, setOffsetdata] = useState(0);
    const [scroll, setScroll] = useState(0);
    const limit = 8;

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

    return (
        <div className="container">
            <div className="row">
                {isLoading &&
                    <div className='d-flex align-items-center justify-content-center py-2'>
                        <ClipLoader color="#ffffff" />
                    </div>
                }
                <h1 className="text-white my-4 text-center">{category?.category}</h1>
                {
                    albums.length > 0 && albums.map((item) => (
                        <div key={item.id} className="col-xl-3 col-lg-4 col-sm-6 d-flex justify-content-center mt-4">
                            <Link href={`/music-categories-all/${categoryid.slug}/${item.id}`} className="card-container text-white">
                                <Image src={item.image} alt={item.eng_name} className="rounded" width={200} height={200} />
                                <h6 className="m-0 align-self-baseline">{GetLanguage(language, item)}</h6>
                            </Link> 
                        </div>
                    ))
                }
            </div>
            {
                albums.length > 0 && (
                    <div className="row my-4">
                        <div className="col-12">
                            <Pagination pageCount={Math.ceil(total / limit)} onPageChange={handlePageChange}/>
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