import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Button from '../Button'
import LogoutBtn from './LogoutBtn'

const Header = () => {
    const authStatus = useSelector((state) => state.status)
    const navItems = [
        {
            name: "Home",
            slug: "/",
            active: true
        },
        {
            name: "All Posts",
            slug: '/all-posts',
            active: authStatus
        },
        {
            name: "Add Post",
            slug: '/add-post',
            active: authStatus
        },

    ]

    const authItems = [
        {
            name: "Login",
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
        }
    ]
    return (
        <div className='w-full flex justify-between items-center py-6 px-6 border-b border-[#D0D5E4]'>

            <ul className='flex gap-6 text-[#0E1731]'>
                {navItems.map((item) => (
                    item.active && (<li key={item.name} className='cursor-pointer font-semibold'><Link to={item.slug}>{item.name}</Link></li>)
                ))}
            </ul>
            <ul className='flex gap-5'>
                {authItems.map((item) => (
                    item.active && (<Button key={item.name} className=' border border-[#D0D5E4]'><Link to={item.slug}>{item.name}</Link></Button>)
                ))}
                
                {authStatus && <LogoutBtn />}
            </ul>
        </div>
    )
}

export default Header
