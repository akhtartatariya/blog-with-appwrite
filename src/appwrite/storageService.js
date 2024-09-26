import { Client, ID, Storage, } from "appwrite";
import { conf } from "../conf/conf";

class StorageService {
    client = new Client();
    storage;
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.storage = new Storage(this.client)
    }
    async uploadFile(file) {
        try {
            return await this.storage.createFile(conf.appwriteBucketId, ID.unique(), file)
        } catch (error) {
            console.log('error uploading file', error);
            throw error
        }
    }
    async deleteFile(fileId) {
        try {
            const response = await this.storage.deleteFile(conf.appwriteBucketId, fileId)
            if (!response) {
                throw new Error('File not deleted')
            }
            return true;
        } catch (error) {
            console.log('error deleting file', error);
            return false
        }
    }
    getFilePreview(fileId) {
        try {
            return this.storage.getFilePreview(conf.appwriteBucketId, fileId)
        } catch (error) {
            console.log('error getting file preview', error)
            return false
        }
    }
}


const storageService = new StorageService()

export default storageService