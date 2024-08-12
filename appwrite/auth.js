import conf from '../src/conf/conf'
import {ID ,Client, Account} from 'appwrite';
class AuthService {
    client = new Client()
    account;

    constructor(){
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId)
        this.account = new Account(this.client)
    }

    // Login 

    async createUser (email, password, name){
        try {
            const userAccount = await this.account.create(ID.unique(), email , password, name)
            if (user) {
                return this.logIn(email, password)
                
            }else{
                // some fucntion
            }

        } catch (error) {
            console.log("Create Account Failed " , error);
            
        }
    }

    async logIn (email, password){
        try {
           return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.log("User Login Failed", error);     
        }
    }
    async getCurrentuser(){
        try {
            this.account.get()
        } catch (error) {
            throw error
        }
        return null
    }
    async LogOut(){
        try {
            this.account.deleteSessions()
        } catch (error) {
            console.log("Error User Login NOt found", error);
            
        }
    }

}
const authService = new AuthService()

export default authService;