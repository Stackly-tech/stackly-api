import { IService } from "#common/interfaces/IService.js";
import { IRepository } from "#common/interfaces/IRepository.js";
import { type QueryDto } from "#common/dtos/query.dto.js";
import { ordersQueryMetadata } from "./orders.query.js";
import { type SharedServices } from "#common/app.module.js";
import { QueryService } from "#common/query/services/query.service.js";
import { type TOrdersPrismaAdapter } from "./adapters/orders.prisma.adaptor.js";
export class OrdersServices implements IService<any> {
  constructor(
    private readonly repository: IRepository<any>,
    private readonly shared: SharedServices,
    private readonly queryService: QueryService,
    private readonly adapter: TOrdersPrismaAdapter,
  ) {}
  async findAll(dto: QueryDto) {
    return await this.queryService.execute({
      dto,
      metadata: ordersQueryMetadata,
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
