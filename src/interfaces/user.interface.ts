import { RoleEnum } from "../enums/role.enum";

export interface IUser {
    _id: string;
    name: string;
    email: string;
    pendingEmail?: string;
    age: number;
    password: string;
    role: RoleEnum;
    phone?: string;
    isDeleted: boolean;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export type IUserCreateDto = Pick<
    IUser,
    "name" | "email" | "age" | "password" | "phone" | "pendingEmail"
>;


export type IUserUpdateDto = Pick<IUser, "name" | "age" | "phone">;

export type ILogin = Pick<IUser, "email" | "password">;

export type IForgotPassword = Pick<IUser, "email">;
export type IForgotPasswordSet = Pick<IUser, "password"> & { token: string };

export type ISignUpSet = Pick<IUser, any> & { token: string };