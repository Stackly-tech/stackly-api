import { IService } from "#common/interfaces/IService.js";
import { IRepository } from "#common/interfaces/IRepository.js";
import { ListEmployeeDto } from "#modules/employee/dtos/list-employees.dto.js";
import { type ISharedServices } from "#common/types/ISharedService.js";
export class EmployeeService implements IService<any> {
  constructor(
    private readonly repository: IRepository<any>,
    private readonly shared: ISharedServices,
  ) {}
  async findAll(dto: ListEmployeeDto): Promise<any[]> {
    return await this.repository.findAll(dto);
  }
  async findById(id: string): Promise<any> {
    return await this.repository.findById(id);
  }
  async create(dto: any): Promise<any> {
    return await this.repository.create(dto);
  }
  async delete(id: any): Promise<any> {
    return await this.repository.delete(id);
  }
  async patch(dto: any): Promise<any> {
    return await this.repository.update(dto);
  }
  async update(dto: any): Promise<any> {
    return await this.repository.update(dto);
  }
}
