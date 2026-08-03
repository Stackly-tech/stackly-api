import { type QueryDto } from "#common/dtos/query.dto.js";
import { type SharedServices } from "#common/app.module.js";
import type { InternalAggregate } from "#common/interfaces/IInternal-query.js";
export class QueryService {
  constructor(private readonly shared: SharedServices) {}
  async execute(options: any) {
    const internalQuery = this.shared.queryBuilder.build(
      options.dto,
      options.metadata,
    );
    console.log("🚀 ~ QueryService ~ execute ~ internalQuery:", internalQuery);
    const operation = this.detectOperation(internalQuery);
    console.log("🚀 ~ QueryService ~ execute ~ operation:", operation);
    switch (operation) {
      case "findMany":
        const args = options.adapter.toFindManyArgs(internalQuery);
        return options.repository.findAll(args);

      case "aggregates": {
        const args = options.adapter.toAggregateArgs(internalQuery);
        const result = await options.repository.aggregate(args);
        return this.mapAggregateAliases(result, internalQuery.aggregates);
      }
      case "groupBy": {
        const args = options.adapter.toGroupByArgs(internalQuery);
        const result = await options.repository.groupBy(args);
        return result.map((r: any) =>
          this.mapAggregateAliases(r, internalQuery.aggregates),
        );
      }
    }
  }
  public mapAggregateAliases(
    prismaResult: any,
    aggregates: readonly InternalAggregate[],
  ) {
    const result: Record<string, any> = {};

    for (const agg of aggregates) {
      result[agg.alias] = prismaResult[`_${agg.function}`]?.[agg.field];
    }
    return result;
  }
  private detectOperation(dto: QueryDto) {
    if (dto.groupBy?.length) {
      return "groupBy";
    }

    if (dto.aggregates?.length) {
      return "aggregates";
    }

    return "findMany";
  }
}
