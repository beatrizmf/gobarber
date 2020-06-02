import { getRepository, Repository } from 'typeorm';

import IAppointmentRepository from '@modules/appointments/infra/repositories/IAppointmentRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

class AppointmentsRepository implements IAppointmentRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ provider_id, date });

    await this.ormRepository.save(appointment);

    return appointment;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const appointment = await this.ormRepository.findOne({
      where: { date },
    });

    return appointment;
  }
}

export default AppointmentsRepository;
