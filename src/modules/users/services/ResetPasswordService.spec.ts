import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository";
import ResetPasswordService from "@modules/users/services/ResetPasswordService";
import FakeMailProvider from "@shared/container/providers/MailProvider/fakes/FakeMailProvider";
import FakeUsersTokenRepository from "@modules/users/repositories/fakes/FakeUserTokenRepository";

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUsersTokenRepository
let resetPasswordService: ResetPasswordService


describe('ResetPassword', () => {

    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository()
        fakeUserTokensRepository = new FakeUsersTokenRepository()

        resetPasswordService = new ResetPasswordService(
            fakeUsersRepository,
            fakeUserTokensRepository)
    })


    it('should be able to reset the password', async () => {

        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456'
        })

        const {token} = await fakeUserTokensRepository.generate(user.id)

        await resetPasswordService.execute({
            password: '123123',
            token
        })

        const updatedUser = await fakeUsersRepository.findById(user.id)

        expect(updatedUser?.password).toBe('123123')
    })
})
