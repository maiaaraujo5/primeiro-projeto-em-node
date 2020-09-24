import {container} from "tsyringe";
import '@modules/users/providers'
import '@shared/container/providers'

import IAppointmentRepository from "@modules/appointments/repositories/IAppointmentRepository";
import AppointmentsRepository from "@modules/appointments/infra/typeorm/respositories/AppointmentsRepository";

import UsersRepository from "@modules/users/infra/typeorm/repositories/UsersRepository";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";


container.registerSingleton<IAppointmentRepository>(
    'AppointmentsRepository',
    AppointmentsRepository)

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository
)
