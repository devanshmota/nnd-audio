import { Inter } from 'next/font/google'
import '../../public/css/style.css'
import '../../public/css/responsive.css'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Providers from '@/redux/store/Providers';
import PersistentDrawerLeft from '@/components/PersistentDrawerLeft';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <PersistentDrawerLeft>
            {children}
          </PersistentDrawerLeft>
        </Providers>
      </body>
    </html>
  )
}
