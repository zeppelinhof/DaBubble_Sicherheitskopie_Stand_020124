import { User } from "./user";

export interface Channel {
    name: string;
    description: string;
    createdBy: User;
    members: User[];
}
