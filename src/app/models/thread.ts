import { Message } from './message';

export class Thread {
    question: Message;
    answers: Message[];


    constructor(question?: Message, answers?: Message[]) {
        this.question = question || new Message();
        this.answers = answers || [];
    }    
}
