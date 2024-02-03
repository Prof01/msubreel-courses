import { LoginForm } from '@/components/admin/AdminLogin'
import Footer from '@/components/user/Footer'
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
