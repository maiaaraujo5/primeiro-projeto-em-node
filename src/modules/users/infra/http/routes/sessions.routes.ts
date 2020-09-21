import {Router} from 'express'

const sessionsRouter = Router();
import SessionsController from "@modules/users/infra/http/controllers/SessionsController";
const sessionsController = new SessionsController()

sessionsRouter.post('/', sessionsController.create)


export default sessionsRouter
