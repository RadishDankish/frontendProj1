import config from '../config/config.js';
import { Client, Account, ID} from 'appwrite';


//This only contains the auth service and other services for adding posts are written in different file
export class AuthService {
    client = new Client();
    account;

    constructor()  {
        this.client
            .setEndpoint(config.appwriteUrl) // Your API Endpoint
            .setProject(config.appwriteProjectId); // Your project ID

        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount)
            {
                return this.login({email, password});  
            }
            else
            {
                return userAccount
            }
        } catch (error) {
            console.error('Error creating account:', error);
            throw error;
        }

        
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
            
        } catch (error) {
            console.error('Error logging in:', error);
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.error('Error getting current user:', error);
            
        }

        return null;
    }

    async logout() {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.error('Error logging out:', error);
            throw error;
        }
    }
}

const authService = new AuthService();

export default authService;

