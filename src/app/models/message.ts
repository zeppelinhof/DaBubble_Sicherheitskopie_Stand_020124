export class Message {
    userCustomId: string;
    message: string;
    createdTime: any;
    emojis: any[];

    constructor(userCustomId?: string, message?: string, createdTime?: any, emojis?: any[]){
        this.userCustomId = userCustomId || '';
        this.message = message || '';
        this.createdTime = createdTime || '';
        this.emojis = emojis || [''];
    }
}