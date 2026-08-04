// modules/orders/adapters/orders.prisma.adapter.ts

import { Prisma } from "#generated/prisma/client.js";
import { BasePrismaAdapter } from "#common/query/adapters/base-prisma.adapter.js";

import type { InternalQuery } from "#common/interfaces/IInternal-query.js";
import { OrdersRepositary } from "../orders.repository.js";

export class OrdersPrismaAdapter extends BasePrismaAdapter<
  Prisma.OrdersFindManyArgs,
  Prisma.OrdersWhereInput,
  Prisma.OrdersSelect,
  Prisma.OrdersOrderByWithRelationInput,
  Prisma.OrdersGroupByArgs
> {
  constructor(private readonly repository: OrdersRepositary) {
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

  public toFindManyArgs(query: InternalQuery): Prisma.OrdersFindManyArgs {
    const args: Prisma.OrdersFindManyArgs = {};

    if (query.offset !== undefined && query.offset > 0) {
      args.skip = query.offset;
    }

    if (query.limit !== undefined && query.limit > 0) {
      args.take = query.limit;
    }

    const where = this.buildWhere(query.filters);
    if (where) args.where = where;

    const select = this.buildSelect(query.select);
    if (select) args.select = select;

    const orderBy = this.buildOrderBy(query.sorts);
    if (orderBy.length > 0) args.orderBy = orderBy;

    return args;
  }

  public toAggregateArgs(query: InternalQuery): Prisma.OrdersAggregateArgs {
    const args: Prisma.OrdersAggregateArgs = {};

    const where = this.buildWhere(query.filters);
    if (where) args.where = where;

    if (query.aggregates.length > 0) {
      Object.assign(args, this.buildAggregates(query.aggregates));
    }

    return args;
  }

  public toGroupByArgs(query: InternalQuery): Prisma.OrdersGroupByArgs {
    const args: Prisma.OrdersGroupByArgs = {
      by: query.groupBy as Prisma.OrdersScalarFieldEnum[],
    };

    const where = this.buildWhere(query.filters);
    if (where) args.where = where;

    return args;
  }
}

export type TOrdersPrismaAdapter = OrdersPrismaAdapter;