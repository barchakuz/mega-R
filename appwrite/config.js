import { Client, ID, Databases, Storage, Query } from "appwrite";
import conf from "../src/conf/conf";

class Service {
    client = new Client();
    database;
    storage;

    constructor(){
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);

        this.database = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.database.createDocument(
                conf.appwriteDatabaseId, // Using appwriteDatabaseId from conf
                conf.appwriteCollectionId, // Using appwriteCollectionId from conf
                ID.unique(), // Generating a unique ID for the document
                {
                    title,
                    content,
                    featuredImage,
                    userId,
                    status
                }
            );
        } catch (error) {
            console.log("Warning Create Post Failed:", error);
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.database.updateDocument(
                conf.appwriteDatabaseId, // Using appwriteDatabaseId from conf
                conf.appwriteCollectionId, // Using appwriteCollectionId from conf
                slug, 
                {
                    title, content, featuredImage, status
                }
            );
        } catch (error) {
            console.log("Warning Edit Post Failed:", error);
        }
    }

    async deletePost(slug) {
        try {
            return await this.database.deleteDocument(
                conf.appwriteDatabaseId, // Using appwriteDatabaseId from conf
                conf.appwriteCollectionId, // Using appwriteCollectionId from conf
                slug
            );
        } catch (error) {
            console.log("Warning Delete Post Failed:", error);
        }
    }

    async getPost(slug) {
        try {
            return await this.database.getDocument( // Changed to getDocument
                conf.appwriteDatabaseId, // Using appwriteDatabaseId from conf
                conf.appwriteCollectionId, // Using appwriteCollectionId from conf
                slug
            );
        } catch (error) {
            console.log("Warning Post Not Found:", error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal('status', 'active')]) { // Corrected queries default parameter to an array
        try {
            return await this.database.listDocuments(
                conf.appwriteDatabaseId, // Using appwriteDatabaseId from conf
                conf.appwriteCollectionId, // Using appwriteCollectionId from conf
                queries
            );
        } catch (error) {
            console.log("Warning Zero Posts Found:", error); // Fixed typo in the error message
            return false;
        }
    }

    async uploadFile(file) {
        try {
            return await this.storage.createFile(
                conf.appwriteBucketId, // Using appwriteBucketId from conf
                ID.unique(), // Generating a unique ID for the file
                file
            );
        } catch (error) {
            console.log("Create File Failed:", error);
        }
    }

    async deleteFile(fileId) {
        try {
            return await this.storage.deleteFile(
                conf.appwriteBucketId, // Using appwriteBucketId from conf
                fileId
            );
        } catch (error) {
            console.log("File Delete Failed:", error); // Fixed typo in the error message
        }
    }

    async getFilePreview(fileId) {
        try {
            return await this.storage.getFilePreview(
                conf.appwriteBucketId, // Using appwriteBucketId from conf
                fileId
            );
        } catch (error) {
            console.log("Warning No File To Preview:", error); // Fixed typo in the error message
        }
    }
}

const service = new Service();
export default service;
