import { IService } from "#common/interfaces/IService.js";
import { IRepository } from "#common/interfaces/IRepository.js";
import { ListEmployeeDto } from "#modules/employee/dtos/list-employees.dto.js";
export class EmployeeService implements IService<any> {
  constructor(private employeeRepository: IRepository<any>) {}
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
