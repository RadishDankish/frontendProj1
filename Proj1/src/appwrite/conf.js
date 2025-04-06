import config from '../config/config.js';
import { Client, ID, Databases, Storage, Query,Permission,Role} from 'appwrite';

//this contains appwrite services database and storage

export class Service{

    Client = new Client();
    databases;
    bucket;

    constructor(){
        this.Client
            .setEndpoint(config.appwriteUrl) // Your API Endpoint
            .setProject(config.appwriteProjectId); // Your project ID

        this.databases = new Databases(this.Client);
        this.bucket = new Storage(this.Client);
    }

    async createPost({title, slug, content, featuredImage, status , userId}) {
        try {
            const post = await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            );
            return post;
        } catch (error) {
            console.error('Error creating post:', error);
            throw error;
        }
    }

    async updatePost(slug , {title, content, featuredImage, status}) {
        try {
            const post = await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            );
            return post;
        } catch (error) {
            console.error('Error updating post:', error);
            throw error;
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            );
            return true;
            
        } catch (error) {
            console.log('Error deleting post:', error);
            return false;
            
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            
            )
        } catch (error) {
            console.log("Appwrite error", error);
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries,
                

            )
        } catch (error) {
            console.log("Appwrite error", error);
            return false
        }
    }

    // file upload service

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file,
                [Permission.read(Role.any())]
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    async getFilePreview(fileId){
        try {
            let Url_new =  this.bucket.getFileView(
                config.appwriteBucketId,
                fileId
            )
            
            return Url_new;
            
        } catch (error) {
            console.log("Appwrite serive :: getFilePreview :: error", error);
            return null
        }
        
    }

    getFile(fileId){
        try {
            let Url_new =  this.bucket.getFileView(
                config.appwriteBucketId,
                fileId
            )
            console.log(Url_new);
            return Url_new;
            
        } catch (error) {
            console.log("Appwrite serive :: getFilePreview :: error", error);
            return null
        }
        
    }
}

const service = new Service();

export default service;