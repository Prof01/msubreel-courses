'use client'
import AdminNavbar from '@/components/admin/AdminNavbar'
import { EditAdminInfoForm } from '@/components/admin/EditAdminInfoForm'
import React from 'react'

export default function AdminProfilePage() {
  return (
    <div>
        <AdminNavbar />
        <div className="pt-4 flex justify-center items-center" style={{minHeight: '80vh'}}>
            <EditAdminInfoForm />
        </div>
    </div>
  )
}
