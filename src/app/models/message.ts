import { MessageTime } from "./message-time";
import { Thread } from "./thread";

export class Message {
    userCustomId: string;
    message: string;
    createdTime: MessageTime | any;
    emojis: any[];
    thread: Thread;

    constructor(userCustomId?: string, message?: string, createdTime?: MessageTime | any, emojis?: any[], thread?: Thread | any){
        this.userCustomId = userCustomId || '';
        this.message = message || '';
        this.createdTime = createdTime || '';
        this.emojis = emojis || [''];
        this.thread = thread || [];
    }
}