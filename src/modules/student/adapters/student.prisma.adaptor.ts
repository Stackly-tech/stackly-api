import { Prisma } from "#generated/prisma/client.js";

import { BasePrismaAdapter } from "#common/query/adapters/base-prisma.adapter.js";

import type { InternalQuery } from "#common/interfaces/IInternal-query.js";
//import { StudentRepository } from "../Student.repository.js";
import {StudentRepository} from "../student.repository.js"
export class StudentPrismaAdapter extends BasePrismaAdapter<
  Prisma.studentFindManyArgs,
  Prisma.studentWhereInput,
  Prisma.studentSelect,
  Prisma.studentOrderByWithRelationInput,
  Prisma.studentGroupByArgs
> {
  constructor(private readonly repository: StudentRepository) {
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

  public toFindManyArgs(query: InternalQuery): Prisma.studentFindManyArgs {
    const args: Prisma.studentFindManyArgs = {};

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
      args.distinct = query.distinct as Prisma.StudentScalarFieldEnum[];
    }
    return args;
  }
  public toCountArgs(query: InternalQuery): Prisma.studentCountArgs {
    const args: Prisma.studentCountArgs = {};

    const where = this.buildWhere(query.filters);

    if (where) {
      args.where = where;
    }

    return args;
  }
  public toAggregateArgs(query: InternalQuery): Prisma.StudentAggregateArgs {
    const args: Prisma.StudentAggregateArgs = {};

    const where = this.buildWhere(query.filters);

    if (where) {
      args.where = where;
    }

    if (query.aggregates.length > 0) {
      Object.assign(args, this.buildAggregates(query.aggregates));
    }

    return args;
  }
  public toGroupByArgs(query: InternalQuery): Prisma.studentGroupByArgs {
    const args: Prisma.studentGroupByArgs = {
      by: query.groupBy as Prisma.StudentScalarFieldEnum[],
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
export type TStudentPrismaAdapter = StudentPrismaAdapter;