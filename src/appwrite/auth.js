import { Client, Account ,ID} from "appwrite";
import env_conf from "../env_conf/env_conf.js";

class Auth {
    client = new Client();
    account;
    constructor(){
        try {
            this.client
                .setEndpoint(env_conf.appwrite_url) // Your API Endpoint
                .setProject(env_conf.appwrite_project_id); // Your project ID
            this.account = new Account(this.client);
            console.log('IDS',env_conf.appwrite_project_id);
        }
        catch (e) {
            console.log('Auth.js :: constructor :: Error:', e);
        }
    }

    async createAccount({email, password, name}){
        try {
            this.account.create(
                ID.unique() ,// userId
                email, // email
                password, // password
                name // name (optional)
            )
                .then( (response) => {
                    console.log('Appwrite :: auth :: createAccount :: response :',response)
                    return this.login(email, password); // Success
                }, function (error) {
                    throw error // Failure
                });
        }
        catch(error){
            console.log('Auth.js :: createAccount :: Error:',error);
        }
    }

    async deleteAccount({id}){
        try{
            return await this.account.delete(id);
        }
        catch (e) {
            console.log('Auth.js :: deleteAccount :: Error:',e);
        }
    }

    async login({email, password}){
        try {
            return await this.account.createEmailPasswordSession(email, password);
        }
        catch(error){
            console.log('Auth.js :: login :: Error:',error);
        }
    }

    async logout(){
        try {
            return await this.account.deleteSessions();
        }
        catch(error){
            console.log('Auth.js :: logout :: Error:',error);
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        }
        catch(error){
            console.log('Auth.js :: getCurrentUser :: Error:',error);
            return null;
        }

    }


}

const auth = new Auth();

export default auth;