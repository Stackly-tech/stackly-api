import { type BaseServiceInterface } from "./base.service.interface.js";
import { type BaseRepositoryInterface } from "../repositories/base.repository.interface.js";
export class EmployeeService implements BaseServiceInterface<any> {
  constructor(private employeeRepository: BaseRepositoryInterface<any>) {}
  async findAll(): Promise<any[]> {
    return await this.employeeRepository.findAll();
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
