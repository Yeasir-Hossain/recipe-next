import { Inter } from 'next/font/google'
import './globals.css'
import Context from '@/context/Context'
import Modal from '@/components/shared/modal/Modal'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Recipe',
  description: 'List of recipes',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} container`}>
        <Context>
          {children}
          <Modal />
        </Context>
      </body>
    </html >
  )
}
