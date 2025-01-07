import { NextFunction, Request, Response } from "express";
import {ApiError} from "../errors/api-error";
import {avatarConfig} from "../configs/file.config";

class FileMiddleware {
    public isFileValid() {
        return (req: Request, res: Response, next: NextFunction) => {
            try {
                if(Array.isArray(req.files.avatar)){
                    throw new ApiError("Avatar can be only single file", 400);
                }

                const {mimetype, size} = req.files.avatar;

                if (!avatarConfig. MIMETYPES.includes(mimetype)){
                    throw new ApiError("Avatar has invalid format", 400);
                }

                if(size > avatarConfig.MAX_SIZE) {
                    throw new ApiError("Avatar is too big", 400)
                }
                next();
            } catch (e) {
                next(e);
            }
        };
    }
}

export const fileMiddleware = new FileMiddleware();