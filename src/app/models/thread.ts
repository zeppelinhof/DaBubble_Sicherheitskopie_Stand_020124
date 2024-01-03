
import { MessageTime } from './message-time';

export class Thread {
    userCustomId: string;
    answer: string;
    emojis: {path: string, amount: number, setByUser: string}[];;
    createdTime: MessageTime | any;

    constructor(userCustomId?: string, answer?: string, emojis?: {path: string, amount: number, setByUser: string}[], createdTime?: MessageTime | any) {
        this.userCustomId = userCustomId || '';
        this.answer = answer || '';
        this.emojis = emojis || [{path: '', amount: 0, setByUser: ''}];
        this.createdTime = createdTime || ''
    }  
}
