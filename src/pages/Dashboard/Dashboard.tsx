import React from 'react'
import { useAuth } from 'providers/AuthProvider'
import { ADMIN_ROLE } from 'data/constants'
import AdminDashboard from './AdminDashboard'
import UserDashboard from './UserDashboard'

const Dashboard = () => {
  const { user } = useAuth()
  if (!user?.role) {
    return null
  }

  if (user.role === ADMIN_ROLE) {
    return <AdminDashboard />
  } else return <UserDashboard />
}

export default Dashboard
