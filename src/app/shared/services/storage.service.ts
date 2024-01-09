import { Injectable } from '@angular/core';
import { getDownloadURL, getStorage, listAll, ref } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  imageUrls: string[] = [];
  channelCurrentUrl!: string;
  constructor() {
   
    
  }

  

  async getFileUrl(fileName: string): Promise<string | null> {
    const storage = getStorage();
    const storageRef = ref(storage);
    const files = await listAll(storageRef);

    for (const file of files.items) {
      if (file.name === fileName) {
        const url = await getDownloadURL(file);
       
        let url_to_string= url.toString();
        this.channelCurrentUrl = url_to_string;
        console.log("current url",this.channelCurrentUrl);
        
        
      }
    }
    return null;

  }
}
