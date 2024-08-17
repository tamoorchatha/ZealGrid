import conf from "../conf/conf";
import { initializeApp } from "firebase/app";
import {
    getAuth,
    setPersistence,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    updateProfile,
    createUserWithEmailAndPassword,
    browserSessionPersistence,
    browserLocalPersistence, // Add local persistence for the "Remember Me" functionality
} from 'firebase/auth';

const app = initializeApp(conf);
const auth = getAuth(app);

export class AuthService {
    constructor() {
        this.auth = auth;

        // Default session persistence can be set here if needed,
        // but we'll handle persistence based on user choice in the login method.
    }

    async setPersistence(type) {
        let persistenceType;
        if (type === 'local') {
            persistenceType = browserLocalPersistence; // User stays logged in even after closing the browser
        } else if (type === 'session') {
            persistenceType = browserSessionPersistence; // User is logged out when the browser tab is closed
        } else {
            throw new Error("Invalid persistence type");
        }

        try {
            await setPersistence(this.auth, persistenceType);
        } catch (error) {
            console.error("Error setting persistence:", error);
            throw error;
        }
    }

    async createAccount({ email, password, name }) {
        const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
        const user = userCredential.user;

        // Update the user profile with the name
        await updateProfile(user, { displayName: name });

        // Auto-login after account creation
        return this.login({ email, password });
    }

    async login({ email, password, persistence }) {
        // Set the persistence type before logging in
        await this.setPersistence(persistence);

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
