import { Message } from './message';

export class User {
  // Achtung: Bei Veränderungen der Member unbedingt alle betroffenen Stellen im Code anpassen und Programmfunktionalitäten prüfen
  customId: string;
  name: string;
  email: string;
  img?: any;
  chats?: Message[];

  constructor(
    customId?: string,
    name?: string,
    email?: string,
    img?: any,
    chats?: Message[]
  ) {
    this.customId = customId || '';
    this.name = name || '';
    this.email = email || '';
    this.img = img || '';
    this.chats = chats || [];
  }
}



