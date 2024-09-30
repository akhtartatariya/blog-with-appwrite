import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import blogService from '../appwrite/blogService'
import { useSelector } from 'react-redux'
import parse from 'html-react-parser'
import storageService from '../appwrite/storageService'
import Button from '../components/Button'
const Post = () => {
    const { slug } = useParams()
    const [post, setPost] = useState(null)

    useEffect(() => {
        blogService.getPost(slug).then((post) => {
            if (post) setPost(post)
        })
    }, [slug])
    const userData = useSelector((state) => state.userData)
    const isAuthor = post && userData ? post.userId === userData?.$id : false
    // console.log(isAuthor)

    const navigate = useNavigate()
    const deletePost = async () => {
        try {
            const response = await blogService.deletePost(post.$id)
            if (response) {
                navigate("/")
            }
        } catch (error) {
            console.log("error", error)
        }
    }
    return post && (
        <>
            <div className='max-w-7xl h-full flex flex-col justify-center items-center text-[#0E1731] mb-10 mt-10'>
                <div className='w-full h-full mb-10 max-w-5xl border border-[#d0d5e4] p-5 rounded relative'>
                    <img src={storageService.getFilePreview(post.featuredImage)} alt={post.title} className='w-full h-auto object-cover' />
                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button className="mr-3 bg-[#0E1731] text-[#fff]">
                                    Edit
                                </Button>
                            </Link>
                            <Button onClick={deletePost} className='bg-[#0E1731] text-[#fff]'>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <h1 className='text-3xl mt-5 mb-5 font-bold text-[#0E1731] '>{post.title}</h1>
                <div className='text-[#0E1731] mb-5 text-lg'>
                    <div>{parse(post.content)}</div>
                </div>
            </div>
        </>
    )
}

export default Post
