import CreatorNavbar from '@/components/creators/CreatorNavbar'
import { EditCreatorInfoForm } from '@/components/creators/EditCreatorInfoForm'
import React from 'react'

export default function CreatorProfilePage() {
  return (
    <div>
        <CreatorNavbar />
        <div className="pt-4 flex justify-center items-center" style={{minHeight: '80vh'}}>
            <EditCreatorInfoForm />
        </div>
    </div>
  )
}
