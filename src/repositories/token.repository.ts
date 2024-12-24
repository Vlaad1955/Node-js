import { IToken } from "../interfaces/token.interface";
import { Token } from "../models/token.model";

class TokenRepository {
    public async create(dto: any): Promise<IToken> {
        return await Token.create(dto);
    }

    public async findByParams(params: Partial<IToken>): Promise<IToken> {
        return await Token.findOne(params);
    }

    public async deleteOneByParams(params: Partial<IToken>): Promise<void> {
        await Token.deleteOne(params);
    }

    public async findByRefreshToken(ref:string):Promise<IToken>{
        return Token.findOne({refreshToken:ref});
    }

    public async deleteById(userId:string){
        return Token.findByIdAndDelete({ _userId: userId});
    }

    public async deleteAlltoken(userId:string){
        return Token.deleteMany({ _userId: userId});
    }
}

export const tokenRepository = new TokenRepository();