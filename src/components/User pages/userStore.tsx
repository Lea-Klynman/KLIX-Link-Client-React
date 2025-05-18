import { makeAutoObservable, runInAction } from 'mobx';
import axios from 'axios';
import { User } from '../../types/User';

const url = `${import.meta.env.VITE_API_URL}/api`;

class UserStore {
    user = {} as User;
    token: string | null = sessionStorage.getItem('token');
    loading: boolean = false;
    error: string | null = null;
    navigate: ((path: string) => void) | null = null; 

    constructor() {
        makeAutoObservable(this);
        this.setupInterceptor();
    }
    setNavigator(navigate: (path: string) => void) {
        this.navigate = navigate;
      }
    
      private handleHttpError(error: any, defaultMessage: string) {
        const status = error.response?.status;
        if (status === 401 && this.navigate) {
          this.navigate("/unauthorized");
        } else if (status === 418 && this.navigate) {
          this.navigate("/netfree-error");
        } else {
          return error.response?.data?.message || defaultMessage;
        }
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
            sessionStorage.setItem("token", token); 
            sessionStorage.setItem('userId', this.user.id.toString());
            sessionStorage.setItem("loginTime", Date.now().toString());
            this.fetchUser(parseInt(sessionStorage.getItem('userId') as string));
        } else {
            sessionStorage.removeItem("token"); 
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
            });
        } catch (error: any) {
            runInAction(() => {
                this.error = this.handleHttpError(error, "Failed to load files");
            });

        }
        finally {
            runInAction(() => {
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
            });
        } catch (error: any) {
            runInAction(() => {
                this.error = this.handleHttpError(error, "Failed to load files");
            });

        }
        finally {
            runInAction(() => {
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
            });
        } catch (error: any) {
            runInAction(() => {
                this.error = this.handleHttpError(error, "Failed to load files");
            });

        }
        finally {
            runInAction(() => {
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
            });
        } catch (error: any) {
            runInAction(() => {
                this.error = this.handleHttpError(error, "Failed to load files");
            });

        }
        finally {
            runInAction(() => {
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
            });
        } catch (error: any) {
            runInAction(() => {
                this.error = this.handleHttpError(error, "Failed to load files");
            });

        }
        finally {
            runInAction(() => {
                this.loading = false;
            });
        }
    }


    async sendEmail(to: string, subject: string, body: string) {
        this.loading = true;
        this.error = null;
        try {
            await axios.post(`${url}/Email/send`, { to, subject, body });
            runInAction(() => {
            });
        } catch (error: any) {
            runInAction(() => {
                this.error = this.handleHttpError(error, "Failed to load files");
            });

        }
        finally {
            runInAction(() => {
                this.loading = false;
            });
        }
    }
}

const userStore = new UserStore();
export default userStore;
