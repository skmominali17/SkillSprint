import { Client, Account, ID, Databases } from "appwrite";

const client = new Client()
    .setEndpoint(import.meta.env.VITE_API) // Your API Endpoint
    .setProject(import.meta.env.VITE_PROJECT_ID); // Your project ID

export const account = new Account(client);
export const databases = new Databases(client);