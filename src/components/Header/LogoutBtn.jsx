import React from 'react'
import Button from '../Button'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
import { useDispatch } from 'react-redux'
const LogoutBtn = () => {
  const dispatch = useDispatch()
  const logoutHander = () => {
    authService.logout().then(() => {
      dispatch(logout())
    })
  }
  return (
    <Button bgColor="bg-[#0E1731]" textColor="text-[#fff]" onClick={logoutHander} className='border-none'>
      Logout
    </Button>
  )
}

export default LogoutBtn
