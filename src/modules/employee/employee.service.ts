import { type BaseService } from "#common/services/base.service.js";
import { BaseRepository } from "#common/repositories/base.repository.js";
import { ListEmployeeDto } from "#modules/employee/dtos/list-employees.dto.js";
export class EmployeeService implements BaseService<any> {
  constructor(private employeeRepository: BaseRepository<any>) {}
  async findAll(dto: ListEmployeeDto): Promise<any[]> {
    return await this.employeeRepository.findAll(dto);
  }
  async findById(id: string): Promise<any> {
    return await this.employeeRepository.findById(id);
  }
  async create(dto: any): Promise<any> {
    return await this.employeeRepository.create(dto);
  }
  async delete(id: any): Promise<any> {
    return await this.employeeRepository.delete(id);
  }
  async patch(dto: any): Promise<any> {
    return await this.employeeRepository.update(dto);
  }
  async update(dto: any): Promise<any> {
    return await this.employeeRepository.update(dto);
  }
}
