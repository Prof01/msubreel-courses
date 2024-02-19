'use client'
import Footer from '@/components/user/Footer'
import { ResetUserPasswordForm } from '@/components/user/ResetUserPasswordForm'
import React from 'react'

export default function UpdateForgetPasswordPage({params, searchParams}) {

  return (
      <div className="min-h-screen flex justify-center items-center">
         <div>
          <ResetUserPasswordForm 
          params={params}
          searchParams={searchParams}
           />
            <Footer />
         </div>
      </div>
  )
}
