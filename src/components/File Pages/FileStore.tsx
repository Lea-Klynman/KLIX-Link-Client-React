import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";
import { UserFile } from "../../types/UserFile";
import userStore from "../User pages/userStore";


class FileStore {
  files: UserFile[] = [];
  fileShare: UserFile[] = [];
  loading: boolean = false;
  error: string | null = null;
  url: string = `${import.meta.env.VITE_API_URL}/api/UserFile`;

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
        config.headers.set("Content-Type", "application/json") ;
      }
      if (token) {
        config.headers.set("Authorization", `Bearer ${token}`);
      }
      console.log(config.headers);  
      
      return config;
    }, (error) => {
      return Promise.reject(error);
    });
  }


 
  async fetchFiles() {
    try {
      runInAction(() => {
        this.loading = true;
      });

      if(userStore.user.id == null) {
        userStore.user.id =userStore.getUserId();
      }
      const response = await axios.get(`${this.url}/user/${userStore.user.id }`);

      runInAction(() => {
        this.files = response.data;
        this.error = null; 
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


  async fetchFileShare() {
    try {
      runInAction(() => {
        this.loading = true;
      });
      if (userStore.user.id == null) {
        userStore.user.id = parseInt(sessionStorage.getItem('userId') ?? '');
        userStore.fetchUser(userStore.user.id);
      }
      const response = await axios.get(`${this.url}/filesShared/${userStore.user.email}`);

      runInAction(() => {
        this.fileShare = response.data;
        this.error = null; 
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


  async uploadFile(file: File, name: string, password: string, type: string) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", name);
    formData.append("password", password);
    formData.append("fileType", type);

    console.log(formData.get("fileName"));
    if (userStore.user.id == null) {
      userStore.user.id = parseInt(sessionStorage.getItem('userId') ?? '');
    }
    try {
      runInAction(() => {
        this.loading = true;
      });


     await axios.post(
        `${this.url}/upload/${userStore.user.id}`,
        formData
        ,{ headers: { "Content-Type": "multipart/form-data" 
        } }
      );


      await this.fetchFiles();
      return true;
    } catch (error: any) {
      runInAction(() => {
          this.error = this.handleHttpError(error, "Failed to load files");
      });
      return false;

  }
  finally {
      runInAction(() => {
          this.loading = false;
      });
  }
  }


  async deleteFile(fileId: number) {
    try {
      runInAction(() => {
        this.loading = true;
      });
      await axios.delete(`${this.url}/${fileId}`);
      runInAction(() => {
        this.error = null;
      });
      await this.fetchFiles();
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


  async editFile(fileId: number, newName: string) {
    try {
      runInAction(() => {

        this.loading = true;
      }
      );
      await axios.put(`${this.url}/${fileId}`,
        newName

      );
      runInAction(() => {
        this.error = null;
      }
      );
      await this.fetchFiles();
    }
    catch (error: any) {
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


  async shareFile(file: UserFile, email: string) {
    console.log(email);

    try {
      runInAction(() => {

        this.loading = true;
      });
      userStore.fetchUser(userStore.getUserId());
      const response = await axios.put(`${this.url}/Sharing/${file.id}`, email);
      runInAction(() => {
        this.error = null;
        this.loading = false;
        const message = `Dear User,\n\n${userStore.user.name?? "Your Friend"} has securely shared a file with you via KLIX-Link.\n\nFile Name: ${file.name}\n\nTo access the file, please use the encrypted password provided below:\n\nEncrypted Password: ${response.data.password}\n\nFor your security, do not share this password with anyone.\n\nBest regards,\nKLIX-Link Security Team`;
        const subject=`KLIX-Link: Secure File Shared with You by ${userStore.user.name}`
        userStore.sendEmail(email, subject, message);

      });

    }
    catch (error: any) {
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


  async getPresignedDownloadUrl(): Promise<string | null> {
    try {
      const response = await axios.get(`${this.url}/generate/presigned/url?fileName=KLIXLinkDesktop%20Setup%201.0.0.exe`);
      return response.data.url; 
    } catch (error) {
      console.error("Failed to fetch presigned URL", error);
      return null;
    }
  }

  async downloadFile(file: UserFile,urlreqest: string) {
    try {
      runInAction(() => {
        this.loading = true;
      });
      const response = await axios.post(`${this.url}/${urlreqest}`,
        { Id: file.id,Password: file.filePassword },
        { responseType: "blob" }
      );
      const blob = new Blob([response.data], { type: file.fileType });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = file.name;
      a.click();
      window.URL.revokeObjectURL(url);
      runInAction(() => {
        this.loading = false;
      });

    } 
    catch (error: any) {
      runInAction(() => {
          this.error = this.handleHttpError(error,"Error downloading file");
      });

  }
  finally {
      runInAction(() => {
          this.loading = false;
      });
  }
  }


  async getSharedfile(email: string, id: number, password: string): Promise<Blob | undefined> {
    try {
        runInAction(() => {
            this.loading = true;
        });
        
        const response = await axios.post(
            `${this.url}/CheckingIsAllowedView/${email}`,
            { Id: id, password },
            { responseType: "blob" }
        );

        if (response.status !== 200) throw new Error("Failed to fetch file");

        return new Blob([response.data], { type: response.headers["content-type"] });
    } catch (error: any) {
      runInAction(() => {
          this.error = this.handleHttpError(error, "Failed to load filesError fetching shared file");
      });

  }
  finally {
      runInAction(() => {
          this.loading = false;
      });
  }
}
}




const fileStore = new FileStore();
export default fileStore;
