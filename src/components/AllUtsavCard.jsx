'use client'
import { getUtsavApi } from "@/redux/actions/Campaign"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import GetLanguage from "./GetLanguage"
import { ClipLoader } from "react-spinners"
import Nodataviewall from "./Nodataviewall"
import Pagination from "./ReactPagination"
import { t } from 'i18next';
import { withTranslation } from "react-i18next";
import BreadCrumb from "./BreadCrumb"
import Card from "./Card"


const AllUtsavCard = () => {

    const dispatch = useDispatch()
    const { language } = useSelector((state) => state.language)
    const [utsav, setUtsav] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    const [total, setTotal] = useState(0);
    const [offsetdata, setOffsetdata] = useState(0);
    const limit = 18;

    useEffect(() => {
        getUtsavApi({
            limit: limit,
            order: "asc",
            offset: offsetdata,
            onSuccess: (res) => {
                if (res.data) {
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



    return (
        <div className="container text-white">
            <div className="row mt-5 row_gap">
                {isLoading &&
                    <div className='d-flex align-items-center justify-content-center py-2'>
                        <ClipLoader color="#ffffff" />
                    </div>
                }
                <BreadCrumb title={t('Utsav')} />
                {utsav.length > 0 && utsav.map((item, index) => (
                    <Card key={index} href={`/utsav/${item.id}`} src={item.image} alt={item.eng_name} title={GetLanguage(language, item)} />
                ))
                }

            </div>
            {
                total > 18 && utsav.length > 0 && (
                    <div className="row">
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