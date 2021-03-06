import IHashProvider from "@modules/users/providers/HashProvider/models/IHashProvider";
import User from "../infra/typeorm/entities/User";
import AppError from '@shared/errors/AppError'
import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import {inject, injectable} from "tsyringe";

interface IRequest {
    name: string,
    email: string,
    password: string
}

@injectable()
class CreateUserService {

    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('HashProvider')
        private hashProvider: IHashProvider
    ) {
    }

    public async execute({name, email, password}: IRequest): Promise<User> {

        const checkUserExists = await this.usersRepository.findByEmail(email)
        if (checkUserExists) {
            throw new AppError('Email address already use')
        }

        const hashedPassword = await this.hashProvider.generateHash(password)

        return await this.usersRepository.create({
            name,
            email,
            password: hashedPassword
        })
    }
}

export default CreateUserService;
