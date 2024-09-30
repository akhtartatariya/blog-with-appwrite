import React, { useEffect, useState } from 'react'
import blogService from '../appwrite/blogService'
import PostCard from '../components/PostCard'
const AllPosts = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        blogService.getPosts([]).then((posts) => {
            if (posts) setPosts(posts.documents)
        })
    }, [])
    return (
        <>
            <div className='max-w-7xl h-full flex gap-5 text-[#0E1731] mb-10 mt-10'>
                {posts?.map((post) => (
                    <PostCard key={post.$id} {...post} />
                ))}
            </div>
        </>
    )
}

export default AllPosts
