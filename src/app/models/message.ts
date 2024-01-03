import { MessageTime } from "./message-time";
import { Thread } from "./thread";

export class Message {
    userCustomId: string;
    messageId: number;
    message: string;
    createdTime: MessageTime | any;
    emojis: {path: string, amount: number, setByUser: string}[];
    threads: Thread[]; // antworten 
    file:any;

    constructor(userCustomId?: string, messageId?: number, message?: string, createdTime?: MessageTime | any, emojis?: {path: string, amount: number, setByUser: string}[], threads?: Thread | any, file?: any) { 
        this.userCustomId = userCustomId || '';
        this.messageId = messageId || 0;
        this.message = message || '';
        this.createdTime = createdTime || '';
        this.emojis = emojis || [{path: '', amount: 0, setByUser: ''}];
        this.threads = threads || [];
        this.file = file || null;
    }
}