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

    public static stringDateToDayjs(stringDate: string) {
        /**
         * БЕЗ учета временного сдвига. Тупо по времени KZ
         */
        const dateAndTime = stringDate.split(' ')
        const dateObjArray = dateAndTime[0].split('.')
        const isoDate = dateObjArray.reverse().join('-')
        return dayjs(new Date(isoDate + 'T' + dateAndTime[1]))
    }
}