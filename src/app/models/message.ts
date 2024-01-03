import { MessageTime } from "./message-time";
import { Thread } from "./thread";

export class Message {
    userCustomId: string;
    messageId: number;
    message: string;
    createdTime: MessageTime | any;
    emojis: {path: string, amount: number}[];
    threads: Thread[]; // antworten 
    file:any;

    constructor(userCustomId?: string, messageId?: number, message?: string, createdTime?: MessageTime | any, emojis?: {path: string, amount: number}[], threads?: Thread | any, file?: any) { 
        this.userCustomId = userCustomId || '';
        this.messageId = messageId || 0;
        this.message = message || '';
        this.createdTime = createdTime || '';
        this.emojis = emojis || [{path: '', amount: 0}];
        this.threads = threads || [{path: '', amount: 0}];
        this.file = file || null;
    }
}