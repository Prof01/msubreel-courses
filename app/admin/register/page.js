import { AdminRegistrationForm } from '@/components/admin/AdminRegistrationForm'
import Footer from '@/components/user/Footer'
import React from 'react'

export default function AdminRegistrationPage() {
  return (
      <div className="min-h-screen flex justify-center items-center">
        <div>
          <AdminRegistrationForm />
            <Footer />
        </div>  
      </div>
  )
}
