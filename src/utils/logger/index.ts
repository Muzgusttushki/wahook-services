import { Logger } from "@nestjs/common";
import { writeFile } from 'fs'

export class LoggerService extends Logger {
    constructor(context?: string) {
        super(context);
    }

    error(message?: any, trace?: string) {
        super.error(message, trace)
        this.db({ message, trace }, 'error')
    }

    warn(message?: any, trace?: string) {
        super.warn(message, trace)
        this.db({ message, trace }, 'warn')
    }

    private db(message: any, status: string) {
        writeFile(`logs/${new Date().toDateString()}.txt`, `${status}[${Date.now()}->${JSON.stringify(message)}]\n`,
            { encoding: 'utf8', flag: 'a' }, function (err) {
                if (err)
                    console.log('ошибка записи лога', err)
            });
    }
}