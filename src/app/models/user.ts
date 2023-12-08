export class User {
    custId: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    img?: any;
    chats?: [
        {
            user: User,
            messages: any[],
        }
    ];

    constructor() {
        this.custId = '';
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.password = '';
        this.img = '';
        this.chats = [
            {
                user: new User(),
                messages: ['']
            }
        ];
    }    
}