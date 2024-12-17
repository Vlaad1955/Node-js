import {NextFunction, Request, Response} from "express";
import {isObjectIdOrHexString} from "mongoose"

import {ApiError} from "../errors/api-error";
import Joi from "joi";

class CommonMiddleware {
public isIdvalid(key:string){
    return(req:Request, res:Response, next:NextFunction) =>{
        try {
            const id = req.params[key];
            if (!isObjectIdOrHexString(id)) {
                throw new ApiError(`Invalid id [${key}]`, 400);
            }
            next();
        } catch (e) {
            next(e);
        }
    };
};

public validateBody = (validator: Joi.ObjectSchema) =>{
    return(req:Request, res:Response, next:NextFunction) =>{
        const {error, value} = validator.validate(req.body, {abortEarly:false});

        if(error){
            const errorMessage = error.details.map((err) => err.message).join(", ");
            next(new ApiError(`Validation Error: ${errorMessage}`, 400));
        }else {
            req.body = value;
            next();
        }
    }
}


}

export const commonMiddleware = new CommonMiddleware();