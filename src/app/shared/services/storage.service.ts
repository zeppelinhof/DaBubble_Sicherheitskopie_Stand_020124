import { Injectable, OnInit } from '@angular/core';
import {
  getDownloadURL,
  getStorage,
  listAll,
  ref,
  uploadBytes,
  deleteObject,
} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class StorageService   {
  imageUrls: string[] = [];
  channelCurrentUrl!: string;
  hideloader:boolean = true;
  

  

  // calling function with Parameter (file)
  async uploadToStorage(file: any): Promise<string | null> {    
    if (file) {
      const storage = getStorage();
      const storageRef = ref(storage, file.name);
      await uploadBytes(storageRef, file);
      await this.getFileUrl(file.name);
      return this.channelCurrentUrl;
    }
    return null;
  }

  getUrlFromStorage(): string | null {
    if (this.channelCurrentUrl) {
      return this.channelCurrentUrl;
    } else {
      return null;
    }
  }

 

  async getFileUrl(fileName: string): Promise<void> {
    const storage = getStorage();
    const storageRef = ref(storage);
    const files = await listAll(storageRef);

    for (const file of files.items) {
      if (file.name === fileName) {
        const url = await getDownloadURL(file);
        let urlToString = url.toString();
        this.channelCurrentUrl = urlToString;
        console.log('Aktuelle URL', this.channelCurrentUrl);
      }
    }
  }

  // deleteFile() {
  //   const storage = getStorage();
  //   const desertRef = ref(storage, this.channelCurrentUrl);
  //   deleteObject(desertRef)
  //     .then(() => {
  //       // File deleted successfully
  //     })
  //     .catch((error) => {
  //       // Uh-oh, an error occurred!
  //     });
  // }
}
