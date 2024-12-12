import {IUser} from "../interfaces/user.interface";
import { read, write } from "../services/fs.service";

class UserRepository {
    public async getList(): Promise<IUser[]> {
        return await read();
    };

    public async create(dto: Partial<IUser>): Promise<IUser> {
        const users = await read();
        const newUser = {
            id: users.length ? users[users.length - 1].id + 1 : 1,
            name: dto.name,
            email: dto.email,
            password: dto.password,
        };
        users.push(newUser);
        await write(users);
        return newUser;
    }

    public async getUser(dto: number): Promise<IUser> {
        const users = await read();
        const user = users.find(user=> user.id === dto);
        return user;
    }

    public async find(dto: number) {
        const users = await read();
        const index = users.findIndex((user) => user.id === dto);
        return index
    }

    async delet(index: number) {
        const users = await read();
        users.slice(index,1);
        await write(users);
        return(users);
    }

    async apdete(body: any, index: number) {
        const users = await read();
        const user = users[index];
        user.name = body.name;
        user.email = body.email;
        user.password = body.password;
        await write(users);
        return(users);
    }
}

export const userRepository = new UserRepository();