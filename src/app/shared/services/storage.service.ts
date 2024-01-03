import { Injectable } from '@angular/core';
import { getDownloadURL, getStorage, listAll, ref } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  imageUrls: string[] = [];
  channelCurrentUrl!: string;
  constructor() {
    // this.downloadFromStorage();
  }

  downloadFromStorage(): void {
    const storage = getStorage();
    const storageRef = ref(storage);

    listAll(storageRef)
      .then((res) => {
        res.items.forEach((itemRef) => {
          // Hier wird jede Datei heruntergeladen
          getDownloadURL(itemRef).then((url) => {
            // Verarbeite die URL der heruntergeladenen Datei hier, z.B. füge sie zu einer Liste hinzu

            this.imageUrls.push(url);
            console.log(url);



          });
        });
      })
      .catch((error) => {
        // Handle Fehler beim Abrufen der Dateien
        console.error('Fehler beim Abrufen der Dateien:', error);
      });
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
        console.log(this.channelCurrentUrl);
      }
    }
    return null;

  }
}
