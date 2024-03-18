'use client'
import Image from "next/image"
import Link from "next/link"
import noImg from '../../public/noImageFound.svg'

const Card = ({ href, src, alt, title }) => {
    return (
        <div className="col-xl-2 col-lg-3 col-sm-4 col-6 d-flex justify-content-center align-items-center">
            <Link href={href} className="card-container text-white">
                <Image src={src || noImg} alt={alt} className="rounded-4 view_all_images" layout="intrinsic" width={200} height={200} />
                <h6 className="m-0 align-self-baseline">{title}</h6>
            </Link>
        </div>
    )
}

export default Card