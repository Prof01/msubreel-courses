import { ForgetPassword } from '@/components/creators/ForgetPassword'
import Footer from '@/components/user/Footer'
import React from 'react'

export default function ForgetPasswordPage({searchParams}) {
  return (
      <div className="min-h-screen flex justify-center items-center">
         <div>
          <ForgetPassword 
            searchParams={searchParams}
          />
            <Footer />
         </div>
      </div>
  )
}
