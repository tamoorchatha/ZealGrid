import conf from "../conf/conf";
import { initializeApp } from "firebase/app";
import {
    getAuth,
    // setPersistence, 
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    updateProfile,
    createUserWithEmailAndPassword,
    // browserSessionPersistence  
} from 'firebase/auth';

const app = initializeApp(conf);
const auth = getAuth(app);

export class AuthService {
    constructor() {
        this.auth = auth;
        
        // Set session persistence to ensure that user is signed out when the browser tab/window is closed
        // setPersistence(this.auth, browserSessionPersistence).catch((error) => {
        //     console.error("Error setting persistence:", error);
        // });
    }

    async createAccount({ email, password, name }) {
        const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
        const user = userCredential.user;

        // Update the user profile with the name
        await updateProfile(user, { displayName: name });

        // Auto-login after account creation
        return this.login({ email, password });
    }

    async login({ email, password }) {
        const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
        return userCredential.user;
    }

    async getCurrentUser() {
        return new Promise((resolve, reject) => {
            const unsubscribe = onAuthStateChanged(this.auth, (user) => {
                unsubscribe(); // Unsubscribe after getting the user
                resolve(user);
            }, (error) => {
                console.error("Firebase service :: getCurrentUser :: error", error);
                reject(null);
            });
        });
    }

    async logout() {
        await signOut(this.auth);
    }
}

const authService = new AuthService();

export default authService;
