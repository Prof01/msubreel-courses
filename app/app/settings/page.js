import { EditUserInfoForm } from '@/components/user/EditUserInfoForm'
import UserNavbar from '@/components/user/UserNavbar'
import React from 'react'

export default function UserProfilePage() {
  return (
    <div>
        <UserNavbar />
        <div className="pt-4 flex justify-center items-center" style={{minHeight: '80vh'}}>
            <EditUserInfoForm />
        </div>
    </div>
  )
}
