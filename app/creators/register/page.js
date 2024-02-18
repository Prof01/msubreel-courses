import { CreatorRegistrationForm } from '@/components/creators/CreatorRegistrationForm'
import Footer from '@/components/user/Footer'
import React from 'react'

export default function CreatorRegistrationPage() {
  return (
      <div className="min-h-screen flex justify-center items-center">
        <div>
          <CreatorRegistrationForm />
            <Footer />
        </div>  
      </div>
  )
}
