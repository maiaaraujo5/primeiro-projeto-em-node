import Appointment from "../entities/Appointment";
import IAppointmentRepository from "@modules/appointments/repositories/IAppointmentRepository";
import {EntityRepository, Repository} from 'typeorm'

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> implements IAppointmentRepository{
    public async findByDate(date: Date): Promise<Appointment | undefined> {

        return await this.findOne({
            where: {date},
        });
    }
}

export default AppointmentsRepository
