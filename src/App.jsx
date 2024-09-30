import { useEffect, useState } from 'react'
import './App.css'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import { useDispatch } from 'react-redux'
// import Navbar from './components/Navbar'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  useEffect(() => {
    authService.getCurrentUser().then((userData) => {
      if (userData) {
        dispatch(login(userData))
      }
      else {
        dispatch(logout())
      }
    }).catch((error) => {
      console.log(" getCurrentUser error", error)
    }).finally(() => setLoading(false))
  }, [])
  return (
    <>
      {!loading ? (
        <>
          <Header />
          <Outlet />
          <Footer />
        </>) : null
      }
    </>
  )
}

export default App
