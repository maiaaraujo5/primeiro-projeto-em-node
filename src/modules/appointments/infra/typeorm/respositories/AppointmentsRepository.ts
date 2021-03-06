import Appointment from "../entities/Appointment";
import IAppointmentRepository from "@modules/appointments/repositories/IAppointmentRepository";
import ICreateAppointmentDTO from "@modules/appointments/dtos/ICreateAppointmentDTO";
import {getRepository, Repository} from 'typeorm'

class AppointmentsRepository implements IAppointmentRepository {
    private ormRepository: Repository<Appointment>

    constructor() {
        this.ormRepository = getRepository(Appointment)
    }

    public async findByDate(date: Date): Promise<Appointment | undefined> {

        return await this.ormRepository.findOne({
            where: {date},
        });
    }

    public async create({provider_id, date}: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = this.ormRepository.create({provider_id, date});

        await this.ormRepository.save(appointment)

        return appointment
    }
}

export default AppointmentsRepository
