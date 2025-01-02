import {OldPassword} from "../models/oldPassword.model";
import {IPasswordHistory} from "../interfaces/oldPasswords.interface";
import bcrypt from 'bcrypt';

class PasswordHistoryRepository{

    public async create(dto:IPasswordHistory): Promise<IPasswordHistory>{
        return await OldPassword.create(dto);
    }
    public async isPasswordInHistory(userId: string, newPassword: string): Promise<boolean> {
        const passwordHistory = await OldPassword.find({ userId });

        for (const record of passwordHistory) {
            const match = await bcrypt.compare(newPassword, record.oldPassword);
            if (match) {
                return true;
            }
        }

        return false;
    }

    public async deleteBeforeDate(date: Date): Promise<number> {
        const result = await OldPassword.deleteMany({ date: { $lt: date } });
        return result.deletedCount;
    }

}
export const passwordHistoryRepository = new PasswordHistoryRepository();