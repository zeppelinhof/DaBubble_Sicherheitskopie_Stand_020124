export class MessageTime {
    day: number;
    fullDay: string;
    time: string;
    unixId: number;

    constructor(day?: number, fullDay?: string, time?: string, unixId?: number) {
        this.day = day || 0;
        this.fullDay = fullDay || '';
        this.time = time || '';
        this.unixId = unixId || 0;
    }
}
