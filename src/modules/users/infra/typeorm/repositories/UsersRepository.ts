import User from "../entities/User";
import {getRepository, Repository} from 'typeorm'
import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import ICreateUserDTO from "@modules/users/dtos/ICreateUserDTO";

class UsersRepository implements IUsersRepository {
    private ormRepository: Repository<User>

    constructor() {
        this.ormRepository = getRepository(User)
    }

    public async findById(id: string): Promise<User | undefined> {
        return await this.ormRepository.findOne(id)
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        return await this.ormRepository.findOne({
            where: {email}
        })

    }


    public async create({name, email, password}: ICreateUserDTO): Promise<User> {
        const appointment = this.ormRepository.create({name, email, password});

        await this.ormRepository.save(appointment)

        return appointment
    }

    public async save(user: User): Promise<User> {
        return this.ormRepository.save(user);
    }
}

export default UsersRepository
