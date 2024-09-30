import React, { useEffect, useState } from 'react'
import blogService from '../appwrite/blogService'
import PostCard from '../components/PostCard'
import { useSelector } from 'react-redux'
import { Query } from 'appwrite'

const Home = () => {
    const [posts, setPosts] = useState([])
    const userData = useSelector((state) => state.userData)
    useEffect(() => {
        if (!userData?.$id) return
        blogService.getPosts([Query.equal("userId", userData?.$id), Query.equal("status", "active")]).then((posts) => {
            if (!posts) return
            setPosts(posts.documents)
        })
    }, [])
    return (
        <>
            <div className='text-center text-[#0E1731] text-2xl font-semibold mt-10 '>Your Posts</div>
            {posts.length > 0 ? posts.map((post) => (
                <PostCard key={post.$id} {...post} />
            )) : null}
        </>
    )
}

export default Home
