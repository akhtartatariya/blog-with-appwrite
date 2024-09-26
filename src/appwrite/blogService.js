import { Client, Databases, ID, Query } from "appwrite";
import { conf } from "../conf/conf";

class BlogService {
    client = new Client();
    databases;
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client)
    }
    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId,
                slug,
                { title, content, featuredImage, status, userId }
            )
        } catch (error) {
            console.log("createPost error", error)
            throw error;
        }
    }
    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug, { title, content, featuredImage, status })
        } catch (error) {
            console.log("updatePost error", error)
            throw error;
        }
    }
    async deletePost(slug) {
        try {
            const response = await this.databases.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug)
            if (!response) {
                throw new Error('Post not deleted')
            }
            return true;
        } catch (error) {
            return false
            console.log("deletePost error", error)
            throw error;
        }

    }
    async getPost(slug) {
        try {
            return await this.databases.getDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug)
        } catch (error) {
            return false
            console.log("getPost error", error)
            throw error;
        }
    }
    async getPosts(queries= [Query.equal("status","active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
        } catch (error) {
            return false
            console.log("getPosts error", error)
            throw error;
        }
    }
}

const blogService = new BlogService()

export default blogService;