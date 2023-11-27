import React from 'react'
import Login from '../components/Login'

const AdminLogin = () => {
  return (
    <Login path="adminlogin" signup = "/adminsignup" home = "/adminprofile"/>
  )
}

export default AdminLogin