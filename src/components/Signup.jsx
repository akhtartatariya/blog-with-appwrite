import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'
import Input from './Input'
import Button from './Button'
const Signup = () => {
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState('')
    const signup = async (data) => {
        setError('')
        try {
            console.log(data)
            const session = await authService.signUp(data)
            if (session) {
                navigate('/login')
                const userData = await authService.getCurrentUser()
            }
        } catch (error) {
            setError(error.message)
        }
    }
    return (
        <form onSubmit={handleSubmit(signup)}>
            <div className='max-w-lg mx-auto px-4 sm:px-6 lg:px-8 py-10 mt-10 border border-[#D0D5E4] rounded-xl'>
            <h2 className="text-center text-2xl font-bold leading-tight text-[#0E1731]">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-[#0E1731] mb-5">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className='text-red-500 text-center mb-5 text-sm font-semibold'>{error}</p>}
                <Input label="Name" placeholder="Name" className="mb-5 py-2" {...register("name",{required: true})}/>
                <Input type="email" label="Email" placeholder="Email" className="mb-5 py-2" {...register("email",{required: true})}/>
                <Input type="password" label="Password" placeholder="Password" className="mb-5 py-2" {...register("password",{required: true})}/>
                <Button type="submit" bgColor="bg-[#0E1731]" textColor="text-[#fff]" className=' hover:bg-[#d0d5e4] hover:text-[#0E1731] transition-all duration-200 ease-linear py-2'>Sign Up</Button>
            </div>
        </form>
    )
}

export default Signup


