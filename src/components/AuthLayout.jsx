import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AuthLayout = ({ children, authentication = true }) => {
    // console.log("children",children)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const authStatus = useSelector((state) => state.status)
    useEffect(() => {
        
        if (authStatus && authentication !== authStatus) {
            navigate('/login')
        }
        else if (!authentication && authStatus !== authentication) {
            navigate('/')
        }
        setLoading(false)
    }, [authStatus, authentication, navigate])
    return !loading ?  <>{children}</> : <div>Loading</div>
    
    
}
export default AuthLayout