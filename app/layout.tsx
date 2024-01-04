
import './globals.css'
import type { Metadata } from 'next'
import Navbar from '../components/navbar/Navbar'
import ClientOnly from '../components/ClientOnly'
import RegisterModal from '@/components/modals/RegisterModal'
import ToastProvider from './providers/ToastProvider'
import LoginModal from '@/components/modals/LoginModal'
import getCurrentUser from './actions/getCurrentUser'
import { BookModal } from '@/components/modals/BookModal'
import SearchModal from '@/components/modals/SearchModal'


export const metadata: Metadata = {
  title: 'Saudi Life',
  description: 'Senior Project',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body>
        <ClientOnly>
          <ToastProvider/>
          <SearchModal/>
          <BookModal/>
          <LoginModal/>
          <RegisterModal/>
        <Navbar currentUser={currentUser}/>
        </ClientOnly>
        <div className="
        pb-20
        pt-28
        ">
  {children}
        </div>
    
        </body>
    </html>
    
  )
}

