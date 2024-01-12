import { MessageTime } from "../models/message-time";

export interface ThreadInterface {
    userCustomId: string,
    messageId: number,
    answer: string,
    emojis: {
        path: string,
        amount: number,
        setByUser: string[]
    }[],
    createdTime: MessageTime | any,
    file?: any;
}
