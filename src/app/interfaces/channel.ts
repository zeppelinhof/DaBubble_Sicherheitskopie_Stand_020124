import { Thread } from "./thread";
import { User } from "./user";

export interface Channel {
    customId?: string;
    createdDate: any;
    name: string;
    description: string;
    createdBy?: User;
    members?: User[];
    threads?: Thread[];
}
