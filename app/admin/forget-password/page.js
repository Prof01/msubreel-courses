import { ForgetPassword } from '@/components/admin/ForgetPassword'
import Footer from '@/components/user/Footer'
import React from 'react'

export default function ForgetPasswordPage() {
  return (
      <div className="min-h-screen flex justify-center items-center">
         <div>
          <ForgetPassword />
            <Footer />
         </div>
      </div>
  )
}
