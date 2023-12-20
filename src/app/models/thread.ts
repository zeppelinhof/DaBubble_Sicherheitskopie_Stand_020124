import { Message } from './message';

export class Thread {
    customId: string;
    answers: any[];


    constructor(customId?: string, answers?: any[]) {
        this.customId = customId || '';
        this.answers = answers || [''];
    }    
}
