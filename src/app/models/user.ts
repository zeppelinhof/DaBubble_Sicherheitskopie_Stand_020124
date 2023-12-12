import { Message } from "./message";

export class User {
    // Achtung: Bei Veränderungen der Member unbedingt alle betroffenen Stellen im Code anpassen und Programmfunktionalitäten prüfen
    customId: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    img?: any;
    chats?: Message[];

    constructor(customId?: string, firstName?: string, lastName?: string, email?: string, password?: string, img?: any, chats?: Message[]) {
        this.customId = customId || '';
        this.firstName = firstName || '';
        this.lastName = lastName || '';
        this.email = email || '';
        this.password = password || '';
        this.img = img || '';
        this.chats = chats || [];
    }
}