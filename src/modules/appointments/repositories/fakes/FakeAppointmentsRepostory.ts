import Appointment from "@modules/appointments/infra/typeorm/entities/Appointment";
import IAppointmentRepository from "@modules/appointments/repositories/IAppointmentRepository";
import ICreateAppointmentDTO from "@modules/appointments/dtos/ICreateAppointmentDTO";
import {isEqual} from "date-fns";
import {uuid} from "uuidv4";

class AppointmentsRepository implements IAppointmentRepository {

    private appointments: Appointment[] = []

    public async findByDate(date: Date): Promise<Appointment | undefined> {
        return this.appointments.find(appointment => isEqual(appointment.date, date))
    }

    public async create({provider_id, date}: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = new Appointment()

        Object.assign(appointment, {id: uuid(), date, provider_id})

        this.appointments.push(appointment)

        return appointment

    }
}

export default AppointmentsRepository
