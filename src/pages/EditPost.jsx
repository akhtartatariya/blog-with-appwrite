import React, { useEffect, useState } from 'react'
import blogService from '../appwrite/blogService'
import PostForm from '../components/post-form/PostForm'
import { useParams } from 'react-router-dom'
const EditPost = () => {
    const [post, setPost] = useState(null)
    const { slug } = useParams()
    useEffect(() => {
        if (slug) {
            blogService.getPost(slug).then((post) => {
                if (post) setPost(post)
            })
        }
    }, [slug])
    return post && (
        <PostForm post={post} />
    )
}

export default EditPost
