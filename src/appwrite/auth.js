import { Client, Account ,ID , AuthenticationFactor} from "appwrite";
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
        }
        catch (e) {
            console.log('Auth.js :: constructor :: Error:', e);
        }
    }

    async createAccount({email, password, name}){
        try {
            console.log("Creating account");
            this.account.create(
                ID.unique() ,// userId
                email, // email
                password, // password
                name // name (optional)
            )
            .then( () => {
                this.login({email, password})
                    .then(() => {
                        this.createEmailVerification()
                            .then((response) => {
                                return response;
                            })
                    },(error) =>{
                        console.log('createAccount :: login :: Error:', error);
                    })
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

    async sendOTP({email}){
        try {
            return await this.account.createEmailToken(
                ID.unique(),
                email
            );
        }
        catch(error){
            console.log('Auth.js :: sendOTP :: Error:',error);
        }
    }

    async verifyOTP({id,otp}){
        try {
            return await this.account.createSession(
                id,
                otp
            );
        }
        catch(error){
            console.log('Auth.js :: verifyOTP :: Error:',error);
        }
    }

    async createEmailVerification(){
        this.account.createVerification(
            'http://localhost:5173/verify'
        )
        .then((result) => {
            return result
        })
    }

    async updateVerification({userId,secret}){
        try {
            console.log(userId);
            console.log(secret);
            this.account.updateVerification(userId, secret)
                .then( (response) => {
                    return response; // Success
                }, function (error) {
                    console.log(error); // Failure
                });
        }
        catch(error){
            console.log('Auth.js :: createSession :: Error:',error);
        }
    }

}

const auth = new Auth();

export default auth;