
import { makeAutoObservable, runInAction } from 'mobx';
import axios from 'axios';
import { User } from '../../types/User';
import { Roles } from '../../types/Roles';
import userStore from './userStore';

const url = "http://localhost:3000/api";

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
            const subject = "Welcome to KLIX-Link!";
            const body = `Hello ${user.name},\n\nWelcome to KLIX-Link! Your account has been successfully created.\n\nBest regards,\nKLIX-Link Team`;
            userStore.sendEmail(user.email!, subject, body);

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
