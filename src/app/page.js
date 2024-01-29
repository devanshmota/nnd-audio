import dynamic from 'next/dynamic';
import Header from '@/components/Header'
// import HomePage from '@/components/HomePage'
const HomePage = dynamic(() => import('@/components/HomePage'))
export default function Home() {
  return (
    <>
      <div>
        <HomePage />
      </div>

    </>


  )
}
