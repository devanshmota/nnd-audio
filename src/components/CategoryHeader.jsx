import Image from 'next/image';
import Link from 'next/link';

const CategoryHeader = ({ title, onPrev, onNext, isBeginning, isEnd, link }) => {
    return (
        <div className="container_arrow d-flex justify-content-between align-items-center my-4">
            <h2 className="titles_homepage m-0">{title}</h2>

            {/* <div className="d-flex align-items-center justify-content-center">
                <Image
                    src="/images/svg/left_arrow.svg"
                    alt="arrow"
                    className={`arrow left_arrow ${isBeginning ? 'disabled' : ''}`}
                    width={10}
                    height={10}
                    onClick={onPrev}
                />
                <Image
                    src="/images/svg/right_arrow.svg"
                    alt="arrow"
                    className={`arrow right_arrow ${isEnd ? 'disabled' : ''}`}
                    width={10}
                    height={10}
                    onClick={onNext}
                />
            </div> */}

            <Link href={link} className='view_all'>View all</Link>
        </div>
    );
}

export default CategoryHeader