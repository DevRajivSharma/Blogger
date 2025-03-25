const env_conf = {
    appwrite_url : String(import.meta.env.VITE_APPWRITE_URL),
    appwrite_project_id : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwrite_database_id : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwrite_collection_id : String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwrite_bucket_id : String(import.meta.env.VITE_APPWRITE_STORAGE_ID),
    TinyMCE_API_KEY : String(import.meta.env.VITE_TinyMCE_API_KEY),
}

export  default env_conf