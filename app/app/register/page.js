import Footer from '@/components/user/Footer'
import { UserRegistrationForm } from '@/components/user/UserRegistrationForm'
import React from 'react'

export default function UserRegistrationPage() {
  return (
      <div className="min-h-screen flex justify-center items-center">
        <div>
          <UserRegistrationForm />
            <Footer />
        </div>  
      </div>
  )
}
