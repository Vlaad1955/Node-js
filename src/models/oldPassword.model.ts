import { model, Schema } from "mongoose";
import {IPasswordHistory} from "../interfaces/oldPasswords.interface";

const oldPasswordSchema = new Schema(
    {
        userId:{type:String, required: true},
        oldPassword:{type:String, required: true},
        date:{type:Date,required: true}
    }
)

export const OldPassword = model<IPasswordHistory>("passwords", oldPasswordSchema);