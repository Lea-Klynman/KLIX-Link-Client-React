
import { makeAutoObservable, runInAction } from 'mobx';
import axios from 'axios';
import { User } from '../../types/User';
import { Roles } from '../../types/Roles';
import userStore from './userStore';

const url = `${import.meta.env.VITE_API_URL}/api`;

class AuthStore {
    loading: boolean = false;
    error: string | null = null;
    constructor(){
        makeAutoObservable(this);
    }
async registerUser(user: Partial<User>, roles: Roles[]) {
    this.loading = true;
    this.error = null;
    try {
        console.log(JSON.stringify({ user: user, roles: roles }, null, 2));
        const response = await axios.post(`${url}/Auth/register`, { user: user, roles: roles }, {
            headers: { "Content-Type": "application/json" }
        });
        runInAction(() => {
            userStore.user = response.data.user;
            userStore.token = response.data.token;
            if (userStore.token) {
                sessionStorage.setItem('token', userStore.token);
                sessionStorage.setItem('userId', userStore.user.id.toString());
                sessionStorage.setItem("loginTime", Date.now().toString());
            }
            const subject = "Get started with KLIX-Link!";
            const message = `✅ Welcome to KLIX-Link! ✅\n\nDear ${userStore.user.name},\n\nThank you for registering with KLIX-Link! 🎉\n\nKLIX-Link is designed to provide **secure document storage and sharing**, ensuring your files remain protected at all times. Here’s what you can expect:\n\n🔒 **Advanced Encryption** – Your documents are encrypted before being stored, ensuring maximum security.\n📂 **Secure File Sharing** – Share files with confidence, knowing only authorized recipients can access them.\n🛡 **Privacy Protection** – Your sensitive data stays confidential, accessible only with your unique credentials.\n\nStart using KLIX-Link today and enjoy a **safe and seamless** document management experience.\n\nBest regards,\nThe KLIX-Link Security Team`;
            userStore.sendEmail(user.email!, subject, message);

            this.loading = false;
        });
    } catch (error: any) {
        runInAction(() => {
            this.error = error.message || "Failed to register user";
            this.loading = false;
        });
    }
}


async loginUser(email: string, password: string, roles: Roles[]) {
    this.loading = true;
    this.error = null;
    try {
        const response = await axios.post(`${url}/Auth/login`, { email, password, roles }, {
            headers: { "Content-Type": "application/json" }
        });
        runInAction(() => {
            userStore.user = response.data.user;
            userStore.token = response.data.token;
            this.loading = false;
            console.log(response.data.user, response.data.token);
            if (userStore.token) {
                sessionStorage.setItem('token', userStore.token);
                sessionStorage.setItem('userId', userStore.user.id.toString());
                sessionStorage.setItem("loginTime", Date.now().toString());
            }
        });
    } catch (error: any) {
        runInAction(() => {
            this.error = error.message || "Failed to login";
            this.loading = false;
        });
    }
}
}

const authStore = new AuthStore();
export default authStore;
