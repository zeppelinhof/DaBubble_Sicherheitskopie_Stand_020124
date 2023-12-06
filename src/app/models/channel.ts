import { User } from '../interfaces/user';

export class Channel {

    customId: string;
    name: string;
    description:  string;
    members: User[];
    createdDate: string;
    createdBy: User;


constructor(){
        this.customId = '';
        this.name = '';
        this.description = '';
        this.members = [];
        this.createdDate = '';
        this.createdBy = {
            custId: '',
            img: '',
            firstName: 'Frederick',
            lastName: 'Beck',
            email: '',
            password: '',
          };
    }
}