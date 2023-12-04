import { User } from './user';

export interface Thread {
    question: string;
    createdBy: string;
    createdTime: any;
    answers: [
        {
            user: User,
            answer: string,
            createdTime: any,
            emoji?: any,
        }
    ];
}
