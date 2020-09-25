import AppError from "@shared/errors/AppError"
import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import IMailProvider from "@shared/container/providers/MailProvider/models/IMailProvider";
import IUsersTokenRepository from "@modules/users/repositories/IUsersTokenRepository";
import {inject, injectable} from "tsyringe";

interface IRequest {
    token: string,
    password: string;
}

@injectable()
class ResetPasswordService {

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('UserTokensRepository')
        private userTokensRepository: IUsersTokenRepository
    ) {
    }

    public async execute({token, password}: IRequest): Promise<void> {
        const userToken = await this.userTokensRepository.findByToken(token)

        if (!userToken) {
            throw new AppError('User token dos not exists')
        }

        const user = await this.usersRepository.findById(userToken.user_id)

        if (!user){
            throw new AppError('User token dos not exists')
        }

        user.password = password

        await this.usersRepository.save(user)
    }
}

export default ResetPasswordService;
