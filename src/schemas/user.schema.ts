import Joi from "joi";

export const createShema = Joi.object({
    name: Joi.string().min(3).required().messages({
        "string.min": "Name should be minimum 3 symbols"
    }),
    email: Joi.string().email().required().messages({
        "any.required": "Email is required"
    }),
    password: Joi.string().min(8).required().messages({
        "string.min": "Password should be minimum 8 symbols"
    })
});

export const updateShema = Joi.object({
    name: Joi.string().min(3).optional().messages({
        "string.min": "Name should be minimum 3 symbols"
    }),
    email: Joi.string().email().optional().messages({
        "any.required": "Email is required"
    }),
    password: Joi.forbidden().messages({
        "any.unknown": "Password field is not allowed",
    }),
});