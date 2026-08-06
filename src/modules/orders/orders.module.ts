import { OrdersController } from "./orders.controller.js";
import { OrdersRepositary } from "./orders.repository.js";
import { OrdersServices } from "./orders.service.js";
import { type SharedServices } from "#common/app.module.js";
import { QueryService } from "#common/query/services/query.service.js";
import { BasePrismaAdapter } from "#common/query/adapters/base-prisma.adapter.js";
import type { Prisma } from "#generated/prisma/client.js";

export function orderModule(
  queryService: QueryService,
  shared: SharedServices,
) {
  const repository = new OrdersRepositary(shared.prisma);
  const adapter = new BasePrismaAdapter<
    Prisma.OrdersFindManyArgs,
    Prisma.OrdersWhereInput,
    Prisma.OrdersSelect,
    Prisma.OrdersOrderByWithRelationInput,
    Prisma.OrdersGroupByArgs,
    Prisma.OrdersAggregateArgs,
    Prisma.OrdersSelect,
    Prisma.OrdersScalarFieldEnum
  >();
  const service = new OrdersServices(repository, shared, queryService, adapter);
  const controller = new OrdersController(service);

  return {
    repository,
    service,
    controller,
  };
}
