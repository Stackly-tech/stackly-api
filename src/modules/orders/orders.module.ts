
import { OrdersController } from "./orders.controller.js";
import { OrdersRepositary } from "./orders.repository.js";
import { OrdersServices } from "./orders.service.js";
import { type SharedServices } from "#common/app.module.js";
import { QueryService } from "#common/query/services/query.service.js";
import { OrdersPrismaAdapter } from "./adapters/orders.prisma.adaptor.js";


export function orderModule(
  queryService: QueryService,
  shared: SharedServices,
) {
  const repository = new OrdersRepositary(shared.prisma);
  const adapter = new OrdersPrismaAdapter(repository);
  const service = new OrdersServices(
    repository,
    shared,
    queryService,
    adapter,
  );
  const controller = new OrdersController(service);

  return {
    repository,
    service,
    controller,
  };
}
