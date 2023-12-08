export class User {
    customId: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    img?: any;
    chats?: [
        {
            user: any[],
            messages: any[],
        }
    ];

    constructor(customId?: string, firstName?: string, lastName?: string, email?: string, password?: string, img?: any, chats?: [{ user: any[], messages: any[] }]) {
        this.customId = customId || '';
        this.firstName = firstName || '';
        this.lastName = lastName || '';
        this.email = email || '';
        this.password = password || '';
        this.img = img || '';
        this.chats = chats || [
            {
                user: [''],
                messages: ['']
            }
        ];
    }
}