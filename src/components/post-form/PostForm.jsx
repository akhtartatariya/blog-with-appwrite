import React, { useCallback, useEffect, useState } from 'react'
import blogService from '../../appwrite/blogService'
import storageService from '../../appwrite/storageService'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import Input from '../Input'
import RTE from '../RTE'
import Button from '../Button'
import Select from '../Select'
const PostForm = ({ post }) => {
    const [error, setError] = useState(null)
    const userData = useSelector((state) => state.userData)
    const navigate = useNavigate()
    const { handleSubmit, register, control, setValue, getValues, watch } = useForm({
        defaultValues:{
            title: post?.title || '',
            slug: post?.$id || '',
            content: post?.content || '',
            status: post?.status || 'active',
        }}
    )

    const onSubmit = async (data) => {
        console.log("data", data)
        setError('')
        try {
            if (post) {
                const image = data.featuredImage[0] ? await storageService.uploadFile(data.featuredImage[0]) : null
                if (image) {
                    await storageService.deleteFile(post.featuredImage)
                }
                const response = await blogService.updatePost(post.$id, { ...data, featuredImage: image ? image.$id : undefined })
                if (response) {
                    navigate(`/post/${post.$id}`)
                }
            }
            else {
                const image = data.featuredImage[0] ? await storageService.uploadFile(data.featuredImage[0]) : null
                if (image) {
                    data.featuredImage = image.$id
                }
                const response = await blogService.createPost({ ...data, userId: userData?.$id })
                if (response) {
                    navigate(`/post/${response.$id}`)
                }
            }
        } catch (error) {
            console.log("error", error)
            setError(error.message)
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string" && value.length > 0) {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");
        }
        return ""
    })
    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue('slug', slugTransform(value?.title), { shouldValidate: true })
            }
        })
        return () => {
            subscription.unsubscribe()
        }
    }, [watch, slugTransform, setValue])
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {error && <div className=' text-[#0E1731] font-bold text-xl mb-10 mt-10'>{error}</div>}
            <div className='max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 mt-10 flex'>
                <div className='w-2/3 text-[#0E1731] font-bold text-xl mb-10 mr-10'>
                    <Input label="Post Title" className='w-full py-2' {...register("title", { required: true })} />
                    <Input label="Post Slug" className='w-full py-2' {...register("slug", { required: true })} onInput={(e) => { setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true }); }} />
                    <RTE control={control} name="content" defaultValue={getValues("content")} label="Post Content" className='w-full' {...register("content")} />
                </div>
                <div className='w-1/3 text-[#0E1731] font-bold text-xl mb-10'>
                    <Select options={["active", "inactive"]} label="Post Status" className='w-full py-2' {...register("status", { required: true })} />
                    <Input type="file" label="Featured Image" className='w-full py-2' {...register("featuredImage", { required: !post })} />
                    {post && (
                        <img src={storageService.getFilePreview(post.featuredImage)} alt={post.title} className='w-full h-auto object-cover mt-5' />)}
                    <Button type="submit" className='w-full mt-10 transition hover:bg-[#d3d3d3] hover:text-[#0E1731] py-2' bgColor={"bg-[#0E1731]"} textColor={"text-[#FFFFFF]"}>{post ? "Update Post" : "Create Post"}</Button>
                </div>
            </div>
        </form>
    )
}

export default PostForm
