export class MessageTime {
    day: number;
    fullDay: string;
    time: string;

    constructor(day?: number, fullDay?: string, time?: string) {
        this.day = day || 0;
        this.fullDay = fullDay || '';
        this.time = time || '';
    }
}
