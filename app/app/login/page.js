import Footer from '@/components/user/Footer'
import { LoginForm } from '@/components/user/Login'
import React from 'react'

export default function LoginPage() {
  return (
      <div className="min-h-screen flex justify-center items-center">
        <div>
          <LoginForm />
          <Footer />
        </div>
      </div>
  )
}
