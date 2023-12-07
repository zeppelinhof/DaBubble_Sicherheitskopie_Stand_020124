export interface User {
    custId:string;
    firstName:string;
    lastName:string;
    email:string;
    password:string; 
    img?:any;
    chats?:[
        {
            user: User,
            messages: any[],
        }
    ];
}

