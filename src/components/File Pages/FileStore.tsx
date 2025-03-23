import { makeAutoObservable, runInAction } from "mobx";
import { UserFile } from "../../types/UserFile";
import axios from "axios";
import userStore from "../User pages/userStore";

class FileStore {
  files: UserFile[] = [];
  fileShare: UserFile[] = [];
  loading: boolean = false;
  error: string | null = null;
  url: string = "http://localhost:3000/api/UserFile";

  constructor() {
    makeAutoObservable(this);
  }



  async fetchFiles() {
    try {
      runInAction(() => {
        this.loading = true;
      });

      const response = await axios.get(`${this.url}/user/${userStore.user.id ?? sessionStorage.getItem('userId')}`);

      runInAction(() => {
        this.files = response.data;
        this.error = null; // מאפסים שגיאות ישנות אם הקריאה הצליחה
      });
    } catch (error: any) {
      runInAction(() => {
        this.error = error.response?.data?.message || "Error fetching files";
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }


  async fetchFileShare(){
    try {
      runInAction(() => {
        this.loading = true;
      });
if(userStore.user.id == null){
  userStore.user.id = parseInt(sessionStorage.getItem('userId') ?? '');
  userStore.fetchUser(userStore.user.id);
}
      const response = await axios.get(`${this.url}/filesShared/${userStore.user.email}`);

      runInAction(() => {
        this.fileShare = response.data;
        this.error = null; // מאפסים שגיאות ישנות אם הקריאה הצליחה
      });
    } catch (error: any) {
      runInAction(() => {
        this.error = error.response?.data?.message || "Error fetching files";
      });
    } finally {
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

    console.log(formData);
    if (userStore.user.id == null) {
      userStore.user.id = parseInt(sessionStorage.getItem('userId') ?? '');
    }
    try {
      runInAction(() => {
        this.loading = true;
      });

      console.log(userStore.user.id + "user id=" + userStore.user);

      const response = await axios.post(
        `${this.url}/upload/${userStore.user.id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log(response.data);

      await this.fetchFiles();
      alert("Upload successful");
    } catch (error: any) {
      runInAction(() => {
        this.error = error.response?.data?.message || "Error uploading file";
      });
      alert("Upload failed");
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }


  async deleteFile(fileId: number){
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
        this.error = error.response?.data?.message || "Error deleting file";
      });
    } finally {
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
       newName,{headers: {
        "Content-Type": "application/json"
      }
    }
      );
      runInAction(() => {
        this.error = null;
      }
      );
      await this.fetchFiles();
      alert("File edited successfully");
    }
    catch (error: any) {
      runInAction(() => {
        this.error = error.response?.data?.message || "Error editing file";
      });
      alert("File editing failed");
    }
     }
  async shareFile(file: UserFile, email: string) {
    console.log(email);
    
    try {
      runInAction(() => {
        
        this.loading = true;
      });
      const response = await axios.post(`${this.url}/Sharing/${file.id}`, email, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      runInAction(() => {
        this.error = null;
        this.loading = false;
        console.log(response.data);
        userStore.sendEmail(email, "File Shared", `${file.name} shared with you\npassword: ${response.data.password}`);
        
      });

    }
    catch (error: any) {
      runInAction(() => {
        this.error = error.response?.data?.message || "Error sharing file";
      });
    }
  }
  async downloadFile(file: UserFile) {
    try {
      runInAction(() => {
        this.loading = true;
      });
      const response = await axios.get(`${this.url}/download/${file.id}`, {
        responseType: "blob",
      });
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

      // TODO: Add functionality to save file to device
    } catch (error: any) {
      runInAction(() => {
        this.error = error.response?.data?.message || "Error downloading file";
      });
    }
  }
}




const fileStore = new FileStore();
export default fileStore;
