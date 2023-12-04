import { User } from "./user";

export interface Channel {
    customId?: string;
    name: string;
    description: string;
    createdBy?: User;
    members?: User[];
}
