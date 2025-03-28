import { makeAutoObservable, runInAction } from 'mobx';
import axios from 'axios';
import { User } from '../../types/User';

const url = `${import.meta.env.VITE_API_URL}/api`;

class UserStore {
    user = {} as User;
    token: string | null = sessionStorage.getItem('token');
    loading: boolean = false;
    error: string | null = null;

    constructor() {
        makeAutoObservable(this);
        this.setupInterceptor();
    }

    private setupInterceptor() {
        axios.interceptors.request.use((config) => {
            const token = sessionStorage.getItem('token');
            if (!config.headers["Content-Type"]){

            config.headers.set("Content-Type", "application/json");
            }
            if (token) {
                config.headers.set("Authorization", `Bearer ${token}`);
            }
            return config;
        }, (error) => {
            return Promise.reject(error);
        });
    }
    
    getUserId() {
        return parseInt(sessionStorage.getItem('userId') as string);
    }


    setSessionStorage(token: string | null) {
        this.token = token;
        if (token) {
            sessionStorage.setItem("token", token); // שמירה לאחר התחברות
            sessionStorage.setItem('userId', this.user.id.toString());
            sessionStorage.setItem("loginTime", Date.now().toString());
            this.fetchUser(parseInt(sessionStorage.getItem('userId') as string));
        } else {
            sessionStorage.removeItem("token"); // ניקוי לאחר יציאה
            sessionStorage.removeItem('userId');
            sessionStorage.removeItem("loginTime");
        }
    }


    logout() {
        sessionStorage.clear(); 
        this.user = {} as User;
        this.token = null; 
        
     }


   

    async fetchUser(userId: number) {
        this.loading = true;
        this.error = null;
        try {
            const response = await axios.get(`${url}/User/${userId}`);
            runInAction(() => {
                this.user = response.data;
                this.loading = false;
            });
        } catch (error: any) {
            runInAction(() => {
                this.error = error.message || "Failed to load user";
                this.loading = false;
            });
        }
    }


    async getUserByEmail(email: string) {
        this.loading = true;
        this.error = null;
        try {
            const response = await axios.get(`${url}/User/${email}`);
            runInAction(() => {
                this.user = response.data;
                this.loading = false;
            });
        } catch (error: any) {
            runInAction(() => {
                this.error = error.message || "Failed to get user by email";
                this.loading = false;
            });
        }
    }
 

    async updateName(id: number, name: string) {
        this.loading = true;
        this.error = null;
        try {
            const response = await axios.put(`${url}/name/${id}`, { name });
            runInAction(() => {
                this.user.name = response.data.name;
                this.loading = false;
            });
        } catch (error: any) {
            runInAction(() => {
                this.error = error.message || "Failed to update name";
                this.loading = false;
            });
        }
    }


    async updatePassword(id: number, password: string) {
        this.loading = true;
        this.error = null;
        try {
            await axios.put(`${url}/password/${id}`, { password });
            runInAction(() => {
                this.loading = false;
            });
        } catch (error: any) {
            runInAction(() => {
                this.error = error.message || "Failed to update password";
                this.loading = false;
            });
        }
    }


    async deleteUser(userId: number) {
        this.loading = true;
        this.error = null;
        try {
            await axios.delete(`${url}/User/${userId}`);
            runInAction(() => {
                this.user = {} as User;
                this.token = null;
                this.loading = false;
            });
        } catch (error: any) {
            runInAction(() => {
                this.error = error.message || "Failed to delete user";
                this.loading = false;
            });
        }
    }


    async sendEmail(to: string, subject: string, body: string) {
        this.loading = true;
        this.error = null;
        try {
            console.log(to, subject, body);

            await axios.post(`${url}/Email/send`, { to, subject, body });
            runInAction(() => {
                this.loading = false;
            });
        } catch (error: any) {
            runInAction(() => {
                this.error = error.message || "Failed to send email";
                this.loading = false;
            });
        }
    }
}

const userStore = new UserStore();
export default userStore;
