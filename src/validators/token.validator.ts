import joi from "joi";

export class TokenValidator {

    public static logout = joi.object({
        refreshToken: joi.string().required().messages({
            "any.required": "Refresh token is required",
            "string.empty": "Refresh token cannot be empty",
        }),
    })
}