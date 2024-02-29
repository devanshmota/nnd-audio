import Image from 'next/image';
import Link from 'next/link';

const CategoryHeader = ({ title, onPrev, onNext, isBeginning, isEnd, link }) => {
    return (
        <div className="container_arrow d-flex justify-content-between align-items-center my-4">
            <h2 className="titles_homepage m-0">{title}</h2>
            <Link href={link} className='view_all'>View all</Link>
        </div>
    );
}

export default CategoryHeader