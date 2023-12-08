import { User } from './user';

export class Thread {
    question: string;
    createdBy: User;
    createdTime:  any;
    answers: any[];


    constructor(question?: string, createdBy?: User, createdTime?: any, answers?: any[]) {
        this.question = question || '';
        this.createdBy = createdBy || new User();
        this.createdTime = createdTime || '';
        this.answers = answers || [{
            user: new User(),
            answer: '',
            createdTime: '',
            emoji: '',
        }];
    }    
}
