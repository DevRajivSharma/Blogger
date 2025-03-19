// Can be used for separate storage configuration when required



/*
import {Client, Storage,ID} from "appwrite";
import env_conf from "../env_conf/env_conf.js";

class bucket {
    client = new Client();
    storage;
    constructor(){
        try {
            this.client
                .setEndpoint(env_conf.appwrite_url) // Your API Endpoint
                .setProject(env_conf.appwrite_project_id); // Your project ID
            this.storage = new Storage(this.client);
        }
        catch (e) {
            throw e;
        }
    }

    async uploadFile(file){
        return  await storage.createFile(
            env_conf.appwrite_bucket_id, // bucketId
            ID.unique(), // fileId
            file // file
        );
    }

}

const storage = new bucket();
*/
