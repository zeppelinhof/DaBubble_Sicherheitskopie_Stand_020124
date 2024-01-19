import { Message } from './message';
import { User } from './user';

export class Channel {
  // Achtung: Bei Veränderungen der Member unbedingt alle betroffenen Stellen im Code anpassen und Programmfunktionalitäten prüfen
  customId: string;
  name: string;
  description: string;
  members: User[];
  createdDate: string;
  createdBy: User;
  allMessages: Message[];

    constructor(customId?: string, name?: string, description?: string, members?: User[], createdDate?: string, createdBy?: User, allMessages?: Message[]) {
        this.customId = customId || '';
        this.name = name || '';
        this.description = description || '';
        this.members = members || [];
        this.createdDate = createdDate || '';
        this.createdBy = createdBy || new User();
        this.allMessages = allMessages || [];
    }

}
