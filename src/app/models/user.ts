import { Message } from './message';

export class User {
  // Achtung: Bei Veränderungen der Member unbedingt alle betroffenen Stellen im Code anpassen und Programmfunktionalitäten prüfen
  id?: string; //Test ID Authentication
  customId: string;
  name: string; //Test Authentication
  firstName: string;
  lastName: string;
  email: string;
  password: string; // kann gelöscht werden
  img?: any;
  chats?: Message[];

  constructor(
    id?: string,
    customId?: string,
    name?: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    password?: string, // kann gelöscht werden
    img?: any,
    chats?: Message[]
  ) {
    this.id = id || '';
    this.customId = customId || '';
    this.name = name || '';
    this.firstName = firstName || '';
    this.lastName = lastName || '';
    this.email = email || '';
    this.password = password || ''; // kann gelöscht werden
    this.img = img || '';
    this.chats = chats || [];
  }
}
