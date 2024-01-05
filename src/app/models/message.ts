import { ThreadInterface } from "../interfaces/thread.interface";
import { MessageTime } from "./message-time";

export class Message {
    userCustomId: string;
    messageId: number;
    message: string;
    createdTime: MessageTime | any;
    emojis: { path: string, amount: number, setByUser: string }[];
    threads: {
        userCustomId: string,
        messageId: number,
        answer: string,
        emojis: { path: string, amount: number, setByUser: string }[],
        createdTime: MessageTime | any
    }[];
    file: any;

    constructor(userCustomId?: string, messageId?: number, message?: string, createdTime?: MessageTime | any, emojis?: { path: string, amount: number, setByUser: string }[], threads?: ThreadInterface | any, file?: any) {
        this.userCustomId = userCustomId || '';
        this.messageId = messageId || 0;
        this.message = message || '';
        this.createdTime = createdTime || '';
        this.emojis = emojis || [{ path: '', amount: 0, setByUser: '' }];
        this.threads = threads || [];
        this.file = file || null;
    }
}