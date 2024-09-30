import { Client, Account, ID } from "appwrite";
import { conf } from "../conf/conf";
class AuthService {
    client = new Client()
    account;
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client)
    }

    async signUp({email, password, name}) {
        try {
            const account = await this.account.create(ID.unique(),email,password,name)
            if(!account){
                throw new Error('Account not created')
            }
            return account
        } catch (error) {
            console.log("signUp error",error)
            throw error;
        }
    }

    async login({email,password}){
        try {
            return await this.account.createEmailPasswordSession(email,password)
        } catch (error) {
            console.log("login error",error)
        }
        return null;
    }
    async logout(){
        try {
            const account = await this.account.deleteSessions()
            if(!account){
                return false;
            }
            return true
        } catch (error) {
            return false
            console.log("logout error",error)
            throw error;
        }
    }
    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            // console.log("getCurrentUser error",error)
        }
        return null
    }
}

const authService = new AuthService()
export default authService;