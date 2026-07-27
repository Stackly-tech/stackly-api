import { IService } from "#common/interfaces/IService.js";
import { IRepository } from "#common/interfaces/IRepository.js";
import { type QueryDto } from "#common/dtos/query.dto.js";
import { employeeQueryMetadata } from "#modules/employee/employee.query.js";
import { type SharedServices } from "#common/app.module.js";
export class EmployeeService implements IService<any> {
  constructor(
    private readonly repository: IRepository<any>,
    private readonly shared: SharedServices,
  ) {}
  async findAll(dto: QueryDto): Promise<any[]> {
    const internalQuery = this.shared.queryService.build(
      dto,
      employeeQueryMetadata,
    );
    const args = this.shared.adaptor.toFindManyArgs(internalQuery);
    return await this.repository.findAll(args);
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
