import Appointment from "../infra/typeorm/entities/Appointment";
import {getCustomRepository} from "typeorm";
import {startOfHour} from "date-fns";
import AppointmentsRepository from "../infra/typeorm/respositories/AppointmentsRepository";

import AppError from '@shared/errors/AppError'

interface Request {
    provider_id: string;
    date: Date;
}

class CreateAppointmentService {
    public async execute({date, provider_id}: Request): Promise<Appointment> {

        const appointmentsRepository = getCustomRepository(AppointmentsRepository)

        const appointmentDate = startOfHour(date);

        const findAppointmentsInTheSameDate = await appointmentsRepository.findByDate(appointmentDate);

        if (findAppointmentsInTheSameDate) {
            throw new AppError('This Appointment is already booked');
        }

        const appointment = appointmentsRepository.create({
            provider_id,
            date: appointmentDate
        });

        await appointmentsRepository.save(appointment)

        return appointment
    }
}

export default CreateAppointmentService
