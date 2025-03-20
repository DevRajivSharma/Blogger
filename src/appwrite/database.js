import {Client, Databases, Storage, ID, Query} from "appwrite";
import env_conf from "../env_conf/env_conf.js";

class DB {
    client = new Client();
    databases;
    storage;
    constructor(){
        try {
            this.client
                .setEndpoint(env_conf.appwrite_url) // Your API Endpoint
                .setProject(env_conf.appwrite_project_id); // Your project ID
            this.databases = new Databases(this.client);
            this.storage = new Storage(this.client);
        }
        catch (e) {
            throw e;
        }
    }

    async createPost({p_title, slug, p_post, status, user_id, p_images}){
        try {
            return await this.databases.createDocument(
                env_conf.appwrite_database_id, // databaseId
                env_conf.appwrite_collection_id, // collectionId
                slug, // documentId
                {
                    p_title,
                    p_post,
                    status,
                    user_id,
                    p_images
                }, // data
            );
        }
        catch (e) {
            console.log('database :: createPost :: error :', e);
        }

    }

    async updatePost(slug,{p_title,p_post,status,p_images}){
        try {
            return await this.databases.updateDocument(
                env_conf.appwrite_database_id, // databaseId
                env_conf.appwrite_collection_id, // collectionId
                slug, // documentId
                {
                    p_title,
                    p_post,
                    status,
                    p_images
                }, // data
            );
        }
        catch (e) {
            throw e;
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                env_conf.appwrite_database_id, // databaseId
                env_conf.appwrite_collection_id, // collectionId
                slug // documentId
            );
            return true;
        }
        catch (e) {
            throw e;
        }

    }

    async listPost(query=[Query.equal("status","active")]) {
        try {
            // console.log('Inside Listpost')
            return await this.databases.listDocuments(
                env_conf.appwrite_database_id, // databaseId
                env_conf.appwrite_collection_id, // collectionId
                query // queries (optional)
            );
        }
        catch (e){
            throw e;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                env_conf.appwrite_database_id, // databaseId
                env_conf.appwrite_collection_id, // collectionId
                slug, // documentId
                [] // queries (optional)
            );
        }
        catch (e){
            throw e;
        }
    }

    async uploadFile(file){
        try {
            return  await this.storage.createFile(
                env_conf.appwrite_bucket_id, // bucketId
                ID.unique(), // fileId
                file // file
            );
        }
        catch (e){
            throw e;
        }

    }

    async deleteFile(file_id){
        try {
            await this.storage.deleteFile(
                env_conf.appwrite_bucket_id, // bucketId
                file_id, // fileId
            );
            return true;
        }
        catch (e){
            throw e;
        }

    }

    getFilePreview(file_id){
        return this.storage.getFilePreview(
            env_conf.appwrite_bucket_id, // bucketId
            file_id, // fileId
        );
    }



}

const db = new DB()
export default db;