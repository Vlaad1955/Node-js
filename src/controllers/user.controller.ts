import {NextFunction, Request, Response} from "express";

import {userService} from "../services/user.service";
import {ApiError} from "../errors/api-error";

class UserController {
    static async modern(req:Request, res:Response, next: NextFunction){
        try {
            if (!req.body.name || req.body.name.length < 3){
                throw new ApiError("Name is required and should be minimum 3 symbols", 400);
            }
            if (!req.body.email || !req.body.email.includes("@")){
                throw new ApiError("Email is required", 400);
            }
            if (!req.body.password || req.body.password.length < 8){
                throw new ApiError("Password is required and should be minimum 8 symbols", 400);
            }
            const dto = Number(req.params.userID);
            const index = await userService.find(dto);
            if(index === -1){
                throw new ApiError("User not found", 404);
            }
            const body = req.body;
            const result = await userService.apdete(body, index);
            res.json(result);
        } catch (e){
            next(e);
        }
    }
    static async getList(req:Request, res:Response, next: NextFunction){
        try {
            const result = await userService.getList();
            res.json(result);
        }catch (e){
            next(e);
        }
    }

    static async create(req:Request, res:Response, next: NextFunction){
        try {
            const dto = req.body as any;
            const result = await userService.create(dto);
            res.status(201).json(result);
        }catch (e){
            next(e);
        }
    }

    static async find(req:Request, res:Response, next: NextFunction) {
        try {
            const dto = Number (req.params.userID);
            const result = await userService.getUser(dto);
            if(!result){
                throw new ApiError("User not found", 0);
            }
            res.json(result);
        }catch (e){
            next(e);
        }
    }

    static async delete(req:Request, res:Response, next:NextFunction) {
        try {
            const dto = Number(req.params.userID);
            const index = await userService.find(dto);
            if(index === -1){
                throw new ApiError("User not found", 404);
            }
            const result = await userService.deletUser(index);
            res.json(result);

        }catch (e){
            next(e);
        }
    }


}

export const userController = UserController;