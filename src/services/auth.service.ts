import { config } from "../configs/config";
import { EmailTypeEnum } from "../enums/email-type.enum";
import { ApiError } from "../errors/api-error";
import {IToken, ITokenPair, ITokenPayload} from "../interfaces/token.interface";
import { ILogin, IUser, IUserCreateDto } from "../interfaces/user.interface";
import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user.repository";
import { emailService } from "./email.service";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";
import { userService } from "./user.service";

class AuthService {
    public async signUp(
        dto: IUserCreateDto,
    ): Promise<{ user: IUser; tokens: ITokenPair }> {
        await userService.isEmailUnique(dto.email);
        const password = await passwordService.hashPassword(dto.password);
        const user = await userRepository.create({ ...dto, password });
        const tokens = tokenService.generateTokens({
            userId: user._id,
            role: user.role,
        });
        await tokenRepository.create({ ...tokens, _userId: user._id });
        await emailService.sendEmail(
            EmailTypeEnum.WELCOME,
            "wylf1312@gmail.com",
            { name: user.name, frontUrl: config.frontUrl },
        );
        return { user, tokens };
    }

    public async signIn(
        dto: ILogin,
    ): Promise<{ user: IUser; tokens: ITokenPair }> {
        const user = await userRepository.getByEmail(dto.email);
        if (!user) {
            throw new ApiError("Incorrect email or password", 401);
        }
        const isPasswordCorrect = await passwordService.comparePassword(
            dto.password,
            user.password,
        );
        if (!isPasswordCorrect) {
            throw new ApiError("Incorrect email or password", 401);
        }
        const tokens = tokenService.generateTokens({
            userId: user._id,
            role: user.role,
        });
        await tokenRepository.create({ ...tokens, _userId: user._id });
        return { user, tokens };
    }

    public async refresh(
        tokenPayload: ITokenPayload,
        refreshToken: string,
    ): Promise<ITokenPair> {
        await tokenRepository.deleteOneByParams({ refreshToken });
        const tokens = tokenService.generateTokens({
            userId: tokenPayload.userId,
            role: tokenPayload.role,
        });
        await tokenRepository.create({ ...tokens, _userId: tokenPayload.userId });
        return tokens;
    }

    public async logOutOne(ref:string):Promise<void>{
        const token:IToken = await tokenRepository.findByRefreshToken(ref);
        if (!token) {
            throw new ApiError("Refresh token not found", 404);
        }
        await tokenRepository.deleteById(token._userId);
    }

    public async  logOut(ref:string):Promise<void>{
        const token:IToken = await tokenRepository.findByRefreshToken(ref);
        if (!token) {
            throw new ApiError("Refresh token not found", 404);
        }
        const user = await userService.getUserById(token._userId);
        await tokenRepository.deleteAlltoken(token._userId);
        await emailService.sendEmail(
            EmailTypeEnum.SEE_YOU_SOON,
            "wylf1312@gmail.com",
            { name: user.name },
        );
    }
}

export const authService = new AuthService();