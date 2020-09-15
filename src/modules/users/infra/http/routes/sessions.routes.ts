import {Router} from 'express'
import AutheticateService from "@modules/users/services/AutheticateService";

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
    const {email, password} = request.body

    const authenticateUser = new AutheticateService()

    const {user, token} = await authenticateUser.execute({
        email,
        password,
    })

    delete user.password

    return response.json({user, token})

});


export default sessionsRouter
