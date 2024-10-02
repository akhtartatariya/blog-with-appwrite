import React from 'react'
import Button from '../Button'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const LogoutBtn = () => {
  const dispatch = useDispatch()
  const navigate=useNavigate()
  const logoutHander = () => {
    authService.logout().then(() => {
      navigate('/login')
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
