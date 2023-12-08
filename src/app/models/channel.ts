import { User } from './user';

export class Channel {

    customId: string;
    name: string;
    description:  string;
    members: User[];
    createdDate: string;
    createdBy: User;


    constructor(customId?: string, name?: string, description?: string, members?: User[], createdDate?: string, createdBy?: User) {
        this.customId = customId || '';
        this.name = name || '';
        this.description = description || '';
        this.members = members || [];
        this.createdDate = createdDate || '';
        this.createdBy = createdBy || {
            custId: '',
            img: '',
            firstName: 'Frederick',
            lastName: 'Beck',
            email: '',
            password: '',
        };
    }    

    //   setChannelObject(obj: any, id: string): Channel {
    //     return new Channel(id, obj.name, obj.description, obj.members,obj.createdDate, obj.createdBy);
    //   }
}