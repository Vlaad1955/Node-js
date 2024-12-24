import joi from "joi";

import { regexConstant } from "../constants/regex.constant";

export class UserValidator {
    private static userName = joi.string().min(3).max(50).trim(); // Перейменовано з "name"
    private static age = joi.number().min(18).max(200);
    private static email = joi.string().regex(regexConstant.EMAIL).trim();
    private static password = joi.string().regex(regexConstant.PASSWORD).trim();
    private static phone = joi.string().regex(regexConstant.PHONE).trim();

    public static create = joi.object({
        name: this.userName.required(), // Змінено на "userName"
        age: this.age.required(),
        email: this.email.required(),
        password: this.password.required(),
        phone: this.phone.optional(),
    });

    public static update = joi.object({
        name: this.userName, // Змінено на "userName"
        age: this.age,
        phone: this.phone,
    });

    public static login = joi.object({
        email: this.email.required(),
        password: this.password.required(),
    });
}