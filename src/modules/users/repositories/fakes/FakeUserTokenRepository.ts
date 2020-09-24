import User from "@modules/users/infra/typeorm/entities/User";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import ICreateUserDTO from "@modules/users/dtos/ICreateUserDTO";
import {uuid} from "uuidv4";
import IUsersTokenRepository from "@modules/users/repositories/IUsersTokenRepository";
import UserToken from "@modules/users/infra/typeorm/entities/UserToken";

class FakeUsersTokenRepository implements IUsersTokenRepository {

    private usersTokens: UserToken[] = []

    public async generate(user_id: string): Promise<UserToken> {
        const userToken = new UserToken();

        Object.assign(userToken, {
            id: uuid(),
            token: uuid(),
            user_id,
        })

        this.usersTokens.push(userToken)

        return Promise.resolve(userToken)
    }
}

export default FakeUsersTokenRepository
