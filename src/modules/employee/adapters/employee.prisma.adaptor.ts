import { Prisma } from "#generated/prisma/client.js";

import { BasePrismaAdapter } from "#common/query/adapters/base-prisma.adapter.js";

import type { InternalQuery } from "#common/interfaces/IInternal-query.js";

export class EmployeePrismaAdapter extends BasePrismaAdapter<
  Prisma.EmployeeFindManyArgs,
  Prisma.EmployeeWhereInput,
  Prisma.EmployeeSelect,
  Prisma.EmployeeOrderByWithRelationInput
> {
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
}
