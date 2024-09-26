import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='w-full flex justify-between items-center py-6 px-6 border-b border-[#D0D5E4]'>

            <ul className='flex gap-6 text-[#0E1731]'>
                {/* <li><Link >Home</Link></li> */}
                {/* <li> <Link>All Posts</Link></li> */}
                {/* <li> <Link>Add Post</Link></li> */}
                <li className='cursor-pointer font-semibold'>Home</li>
                <li className='cursor-pointer font-semibold'>all Posts</li>
                <li className='cursor-pointer font-semibold'>piods</li>
            </ul>
            <ul className='flex gap-5'>
                {/* <li><Link>Login</Link></li> */}
                <li className='cursor-pointer border border-[#D0D5E4] px-5 py-1 rounded-3xl text-[#0E1731] text-sm font-semibold'>Log In</li>
                <li className='cursor-pointer border-none px-5 py-1 rounded-3xl bg-[#0E1731] text-[#fff] text-sm font-semibold' >Signup</li>
                {/* <li><Link>Signup</Link></li> */}
            </ul>
        </div>
    )
}

export default Navbar
