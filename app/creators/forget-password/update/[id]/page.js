'use client'
import { ResetCreatorPasswordForm } from '@/components/creators/ResetCreatorPasswordForm'
import Footer from '@/components/user/Footer'
import React from 'react'

export default function UpdateForgetPasswordPage({params, searchParams}) {

  return (
      <div className="min-h-screen flex justify-center items-center">
         <div>
          <ResetCreatorPasswordForm 
          params={params}
          searchParams={searchParams}
           />
            <Footer />
         </div>
      </div>
  )
}
