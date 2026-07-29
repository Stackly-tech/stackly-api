import { IService } from "#common/interfaces/IService.js";
import { IRepository } from "#common/interfaces/IRepository.js";
import { QueryDtoSchema, type QueryDto } from "#common/dtos/query.dto.js";
import { employeeQueryMetadata } from "#modules/employee/employee.query.js";
import { type SharedServices } from "#common/app.module.js";
import { QueryService } from "#common/query/services/query.service.js";
import { type TEmployeePrismaAdapter } from "./adapters/employee.prisma.adaptor.js";
export class EmployeeService implements IService<any> {
  constructor(
    private readonly repository: IRepository<any>,
    private readonly shared: SharedServices,
    private readonly queryService: QueryService,
    private readonly adapter: TEmployeePrismaAdapter,
  ) {}
  async findAll(dto: QueryDto) {
    return await this.queryService.execute({
      dto,
      metadata: employeeQueryMetadata,
      adapter: this.adapter,
      repository: this.repository,
    });
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
