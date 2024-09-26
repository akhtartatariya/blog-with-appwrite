import { useEffect, useState } from 'react'
import './App.css'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import { useDispatch } from 'react-redux'
import Navbar from './components/Navbar'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  useEffect(() => {
    authService.getCurrentUser().then((userData) => {
      if (userData) {
        console.log(userData)
        dispatch(login({ userData }))
      }
      else {
        dispatch(logout())
      }
    }).catch((error) => {
      console.log(" getCurrentUser error", error)
    }).finally(() => {
      setLoading(false)
    })
  }, [])
  return (
    <>
      <Navbar/>
      
    </>
  )
}

export default App
