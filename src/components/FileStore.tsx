import { makeAutoObservable } from "mobx";
import { UserFile } from "../types/UserFile";
import axios from "axios";
import userStore from "./userStore";

class FileStore {
    files: UserFile[] = [];
    loading: boolean = false;
    error: string | null = null;
  
    constructor() {
      makeAutoObservable(this);
    }
    url="http://localhost:3000/api/UserFile";
    async uploadFile(file: File, name: string, password: string) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("name", name);
      formData.append("password", password);
  
      try {
        this.loading = true;
        await axios.post(`/upload/${userStore.user.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        await this.fetchFiles();
        alert("Upload successful");
      } catch (error: any) {
        this.error = error.response?.data?.message || "Error uploading file";
        alert("Upload failed");
      } finally {
        this.loading = false;
      }
    }
  
    async fetchFiles() {
      try {
        this.loading = true;
        const response = await axios.get("/api/files");
        this.files = response.data;
      } catch (error: any) {
        this.error = error.response?.data?.message || "Error fetching files";
      } finally {
        this.loading = false;
      }
    }
  }
  
  const fileStore = new FileStore();
  export default fileStore;
  