import {userRepository} from "../repositories/user.repository";

class UserService {
    public async getList(): Promise<any[]> {
        return await userRepository.getList();
    }

    public async create(dto:Partial<any>): Promise<any>{
        return await userRepository.create(dto);
    }

    public async getUser(dto: number) {
        return await userRepository.getUser(dto);
    }

    public async find(dto: number) {
        return await userRepository.find(dto);
    }

    public async deletUser(index: number) {
        return await userRepository.delet(index);
    }

    public async apdete(body: any, index: number) {
        return await userRepository.apdete(body, index);
    }
}

export const userService = new UserService();