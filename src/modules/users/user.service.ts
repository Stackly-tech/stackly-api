import { IService } from "#/common/interfaces/IService.js";
import { IRepository } from "#/common/interfaces/IRepository.js";
import { type QueryDto } from "#/common/dtos/query.dto.js";
import { userQueryMetadata } from "./user.query.js";
import { QueryService } from "#/common/query/services/query.service.js";
import { type IPrismaQueryAdapter } from "#/common/query/adapters/base-prisma.adapter.js";
import { randomUUID } from "node:crypto";

export class UserService extends IService<any> {
  constructor(
    private readonly repository: IRepository<any>,
    private readonly queryService: QueryService,
    private readonly adapter: IPrismaQueryAdapter,
  ) {
    super();
  }

  async findAll(dto: QueryDto) {
    const result = await this.queryService.execute({
      dto,
      metadata: userQueryMetadata,
      adapter: this.adapter,
      repository: this.repository,
      operation: "findMany",
    });

    return result;
  }

  async findById(id: string, dto: QueryDto = {} as QueryDto): Promise<any> {
    const result = await this.queryService.execute({
      dto: {
        ...dto,
        filters: {
          ...(dto.filters ?? { operator: "and", rules: [] }),
          rules: [
            ...((dto.filters as any)?.rules ?? []),
            { field: "id", operator: "eq", value: id },
          ],
        },
      },
      metadata: userQueryMetadata,
      adapter: this.adapter,
      repository: this.repository,
      operation: "findUnique",
      unique: { id },
    });

    return result;
  }

  async findFirst(dto: QueryDto): Promise<any> {
    const result = await this.queryService.execute({
      dto,
      metadata: userQueryMetadata,
      adapter: this.adapter,
      repository: this.repository,
      operation: "findFirst",
    });

    return result;
  }

  async query(dto: QueryDto) {
    const operation = this.queryService.detectOperation(dto);
    const result = await this.queryService.execute({
      dto,
      metadata: userQueryMetadata,
      adapter: this.adapter,
      repository: this.repository,
      operation,
    });

    if (Array.isArray(result)) {
      return result;
    }

    if (result && typeof result === "object" && "data" in result) {
      return {
        ...result,
        data: result.data,
      };
    }

    return result;
  }

  async create(dto: any): Promise<any> {
    dto.id = randomUUID();
    dto.name = dto.firstName + dto.lastName;
    const result = await this.repository.create(dto);
    console.log("🚀 ~ UserService ~ create ~ result:", result);
    return result;
  }

  async delete(id: any): Promise<any> {
    const result = await this.repository.delete(id);
    return result;
  }

  async patch(dto: any): Promise<any> {
    const result = await this.repository.update(dto);
    return result;
  }

  async update(dto: any): Promise<any> {
    const result = await this.repository.update(dto);
    return result;
  }
}
