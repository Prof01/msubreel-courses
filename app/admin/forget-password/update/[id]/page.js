'use client'
import { ResetAdminPasswordForm } from '@/components/admin/ResetAdminPasswordForm'
import Footer from '@/components/user/Footer'
import React from 'react'

export default function UpdateForgetPasswordPage({params, searchParams}) {

  return (
      <div className="min-h-screen flex justify-center items-center">
         <div>
          <ResetAdminPasswordForm
          params={params}
          searchParams={searchParams}
           />
            <Footer />
         </div>
      </div>
  )
}
