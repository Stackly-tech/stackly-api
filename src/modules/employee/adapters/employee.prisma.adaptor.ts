import { Prisma } from "#generated/prisma/client.js";

import { BasePrismaAdapter } from "#common/query/adapters/base-prisma.adapter.js";

import type { InternalQuery } from "#common/interfaces/IInternal-query.js";
import { EmployeeRepository } from "../employee.repository.js";
export class EmployeePrismaAdapter extends BasePrismaAdapter<
  Prisma.EmployeeFindManyArgs,
  Prisma.EmployeeWhereInput,
  Prisma.EmployeeSelect,
  Prisma.EmployeeOrderByWithRelationInput,
  Prisma.EmployeeGroupByArgs
> {
  constructor(private readonly repository: EmployeeRepository) {
    super();
  }
  async findMany(query: InternalQuery) {
    const args = this.toFindManyArgs(query);

    return this.repository.findAll(args);
  }

  async aggregate(query: InternalQuery) {
    const args = this.toAggregateArgs(query);

    return this.repository.aggregate(args);
  }

  async groupBy(query: InternalQuery) {
    const args = this.toGroupByArgs(query);

    return this.repository.groupBy(args);
  }

  public toFindManyArgs(query: InternalQuery): Prisma.EmployeeFindManyArgs {
    const args: Prisma.EmployeeFindManyArgs = {};

    if (query.offset !== undefined && query.offset > 0) {
      args.skip = query.offset;
    }

    if (query.limit !== undefined && query.limit > 0) {
      args.take = query.limit;
    }

    const where = this.buildWhere(query.filters);

    if (where) {
      args.where = where;
    }

    const select = this.buildSelect(query.select);

    if (select) {
      args.select = select;
    }

    const orderBy = this.buildOrderBy(query.sorts);

    if (orderBy.length > 0) {
      args.orderBy = orderBy;
    }

    if (query.distinct.length > 0) {
      args.distinct = query.distinct as Prisma.EmployeeScalarFieldEnum[];
    }
    return args;
  }
  public toCountArgs(query: InternalQuery): Prisma.EmployeeCountArgs {
    const args: Prisma.EmployeeCountArgs = {};

    const where = this.buildWhere(query.filters);

    if (where) {
      args.where = where;
    }

    return args;
  }
  public toAggregateArgs(query: InternalQuery): Prisma.EmployeeAggregateArgs {
    const args: Prisma.EmployeeAggregateArgs = {};

    const where = this.buildWhere(query.filters);

    if (where) {
      args.where = where;
    }

    if (query.aggregates.length > 0) {
      Object.assign(args, this.buildAggregates(query.aggregates));
    }

    return args;
  }
  public toGroupByArgs(query: InternalQuery): Prisma.EmployeeGroupByArgs {
    const args: Prisma.EmployeeGroupByArgs = {
      by: query.groupBy as Prisma.EmployeeScalarFieldEnum[],
    };

    const where = this.buildWhere(query.filters);

    if (where) {
      args.where = where;
    }

    const orderBy = this.buildOrderBy(query.sorts);

    if (orderBy.length > 0) {
      args.orderBy = orderBy;
    }

    if (query.aggregates.length > 0) {
      Object.assign(args, this.buildAggregates(query.aggregates));
    }

    return args;
  }
}
export type TEmployeePrismaAdapter = EmployeePrismaAdapter;
