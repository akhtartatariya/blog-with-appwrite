import React from 'react'
import { Link } from 'react-router-dom'
import storageService from '../appwrite/storageService'
import Button from './Button'
const PostCard = ({ $id, title, featuredImage }) => {
    return (
        <div className='max-w-80 w-full bg-white rounded-xl p-4 text-left mt-10 border border-[#fff] hover:border  hover:border-[#d0d5e4] transition-all duration-300 ease-linear'>
            <div className='w-full rounded overflow-hidden mb-5'>
                <img className='w-full h-[286px] object-cover' src={storageService.getFilePreview(featuredImage)} alt={title} />
            </div>
            <h3 className='text-[#0E1731] text-lg font-semibold mb-2'>{title}</h3>
            <Link to={`/post/${$id}`}>
            <Button bgColor="bg-[#0E1731]" textColor="text-[#fff]" className='mt-5 border-none w-full hover:bg-[#d0d5e4] hover:text-[#0E1731] transition-all duration-200 ease-linear'>Read More</Button>
            </Link>
        </div>
    )
}

export default PostCard
