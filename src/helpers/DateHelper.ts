import dayjs from "dayjs";

export class DateHelper {

    public static getTimeNow(format?: string){
        return dayjs().format(format ?? 'HH:mm:ss')
    }

    public static getTimeNowMinusHours(hours: number, format?: string){
        return dayjs().subtract(hours, "hours").format(format ?? 'HH:mm:ss')
    }

    public static getDateNow(format?: string){
        return dayjs().format(format ?? 'DD.MM.YYYY')
    }
}