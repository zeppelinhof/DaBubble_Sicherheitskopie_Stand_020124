
import { MessageTime } from './message-time';

export class Thread {
    userCustomId: string;
    answer: string;
    emojis: any[];
    createdTime: MessageTime | any;

    constructor(userCustomId?: string, answer?: string, emojis?: any[], createdTime?: MessageTime | any) {
        this.userCustomId = userCustomId || '';
        this.answer = answer || '';
        this.emojis = emojis || [''];
        this.createdTime = createdTime || ''
    }  
}
