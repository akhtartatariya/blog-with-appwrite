import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'
import Input from './Input'
import Button from './Button'
const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState('')
    const login = async (data) => {
        setError('')
        try {
            const session = await authService.login(data)
            if (session) {
                console.log("session", session)
                navigate('/')
                const userData = await authService.getCurrentUser()
                if (userData) {
                    console.log("userData", userData)
                    dispatch(authLogin(userData))
                }
            }
        } catch (error) {
            setError(error.message)
        }
    }
    return (
        <form onSubmit={handleSubmit(login)}>
            <div className='max-w-lg mx-auto px-4 sm:px-6 lg:px-8 py-10 mt-10 border border-[#D0D5E4] rounded-xl'>
                <h2 className="text-center text-2xl font-bold leading-tight text-[#0E1731]">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-[#0E1731] mb-5 ">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline "
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className='text-[#0E1731] text-center mb-5 text-sm font-semibold'>{error}</p>}
                <Input label="Email" placeholder="Email" className="mb-5 py-2" {...register("email", { required: true })} />
                <Input type="password" label="Password" placeholder="Password" className="mb-5 py-2" {...register("password", { required: true })} />
                <Button type="submit" bgColor="bg-[#0E1731]" textColor="text-[#fff]" className=' hover:bg-[#d0d5e4] hover:text-[#0E1731] transition-all duration-200 ease-linear py-2'>Login</Button>
            </div>
        </form>
    )
}

export default Login
