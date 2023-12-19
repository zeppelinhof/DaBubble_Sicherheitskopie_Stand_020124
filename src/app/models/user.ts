import { Message } from './message';

export class User {
  // Achtung: Bei Veränderungen der Member unbedingt alle betroffenen Stellen im Code anpassen und Programmfunktionalitäten prüfen
  id?: string; //Test ID Authentication
  customId: string;
  name: string;
  email: string;
  img?: any;
  chats?: Message[];

  constructor(
    id?: string,
    customId?: string,
    name?: string,
    email?: string,
    img?: any,
    chats?: Message[]
  ) {
    this.id = id || '';
    this.customId = customId || '';
    this.name = name || '';
    this.email = email || '';
    this.img = img || '';
    this.chats = chats || [];
  }
}
