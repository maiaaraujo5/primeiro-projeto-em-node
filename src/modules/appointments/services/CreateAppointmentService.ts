import Appointment from "../infra/typeorm/entities/Appointment";
import {startOfHour} from "date-fns";
import {injectable, inject} from "tsyringe";

import AppError from '@shared/errors/AppError'
import IAppointmentRepository from "@modules/appointments/repositories/IAppointmentRepository";

interface IRequest {
    provider_id: string;
    date: Date;
}
@injectable()
class CreateAppointmentService {

    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentRepository) {
    }

    public async execute({date, provider_id}: IRequest): Promise<Appointment> {


        const appointmentDate = startOfHour(date);

        const findAppointmentsInTheSameDate = await this.appointmentsRepository.findByDate(appointmentDate);

        if (findAppointmentsInTheSameDate) {
            throw new AppError('This Appointment is already booked');
        }

        return await this.appointmentsRepository.create({
            provider_id,
            date: appointmentDate
        })
    }
}

export default CreateAppointmentService
