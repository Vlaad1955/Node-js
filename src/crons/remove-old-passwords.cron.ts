import moment from 'moment';
import {passwordHistoryRepository} from "../repositories/oldPassword.repository";
import {CronJob} from "cron";

const handler = async () =>{
    try {
        const oneMonthAgo = moment().subtract(1, 'month').toDate();
        const count = await passwordHistoryRepository.deleteBeforeDate(oneMonthAgo);
        console.log(`Deleted ${count} old passwords`);

    }catch (e){
        console.error(e.message);
    }
}

export const removeOldPasswords = new CronJob("*/10 * * * * *", handler);