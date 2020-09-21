import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import AutheticateService from "@modules/users/services/AutheticateService";
import CreateUserService from "@modules/users/services/CreateUserService";
import FakeHashProvider from "@modules/users/providers/HashProvider/fakes/FakeHashProvider";
import AppError from '@shared/errors/AppError'

describe('AuthenticateUser', () => {
    it('should be able to authenticate', async () => {
        const fakeUsersRepository = new FakeUsersRepository()
        const fakeHashProvider = new FakeHashProvider()
        const authenticateUser = new AutheticateService(fakeUsersRepository, fakeHashProvider)
        const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider)


        const user = await createUser.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456'
        })

        const response = await authenticateUser.execute({
            email: 'johndoe@example.com',
            password: '123456'
        })

        expect(response).toHaveProperty('token')
        expect(response.user).toEqual(user)
    })

    it('should not be able to authenticate with none existing user', async () => {
        const fakeUsersRepository = new FakeUsersRepository()
        const fakeHashProvider = new FakeHashProvider()
        const authenticateUser = new AutheticateService(fakeUsersRepository, fakeHashProvider)

        expect(authenticateUser.execute({
            email: 'johndoe@example.com',
            password: '123456'
        })).rejects.toBeInstanceOf(AppError)
    })

    it('should not be able to authenticate with wrong password', async () => {
        const fakeUsersRepository = new FakeUsersRepository()
        const fakeHashProvider = new FakeHashProvider()
        const authenticateUser = new AutheticateService(fakeUsersRepository, fakeHashProvider)
        const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider)


        const user = await createUser.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456'
        })

        expect(authenticateUser.execute({
            email: 'johndoe@example.com',
            password: 'anotherpassword'
        })).rejects.toBeInstanceOf(AppError)
    })
})