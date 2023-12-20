import { MessageTime } from "./message-time";

export class Message {
    userCustomId: string;
    message: string;
    createdTime: MessageTime | any;
    emojis: any[];

    constructor(userCustomId?: string, message?: string, createdTime?: MessageTime | any, emojis?: any[]){
        this.userCustomId = userCustomId || '';
        this.message = message || '';
        this.createdTime = createdTime || '';
        this.emojis = emojis || [''];
    }
}