'use client'
import Image from "next/image"
import Link from "next/link"
import noImg from '../../public/noImageFound.svg'

const MusicCatAndArtists = ({ href, src, alt, title }) => {
    return (
        <Link href={href} className="w-100 d-flex flex-column gap-2 align-items-center justify-content-between">
            <Image
                src={src || noImg}
                className='rounded-4 w-100 object-fit-cover aspctRatio_music'
                alt={alt}
                layout='intrinsic'
                width={200}
                height={200}

            />
            <h5 className='m-0 text-center text-white title_rcnt_plyd'>
                {title}
            </h5>
        </Link>
    )
}

export default MusicCatAndArtists