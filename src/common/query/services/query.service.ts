import { type QueryDto } from "#/common/dtos/query.dto.js";
import { type SharedServices } from "#/common/app.module.js";
import type { InternalAggregate } from "#/common/interfaces/IInternal-query.js";
import { type ExecuteOptions } from "#/common/types/execute.types.js";
import { type QueryMetadata } from "#/common/interfaces/IInternal-query.js";
import { type InternalQuery } from "#/common/interfaces/IInternal-query.js";
export class QueryService {
  constructor(private readonly shared: SharedServices) {}
  async execute(options: ExecuteOptions<any>) {
    const internalQuery = this.shared.queryBuilder.build(
      options.dto,
      options.metadata,
    );
    console.log("🚀 ~ QueryService ~ execute ~ internalQuery:", internalQuery);
    const finalQuery = this.applyDefaults(internalQuery, options.metadata);
    console.log("🚀 ~ QueryService ~ execute ~ finalQuery:", finalQuery);
    switch (options.operation) {
      case "findMany":
        const args = options.adapter.toFindManyArgs(finalQuery);
        const { rows, total } = await options.repository.findAll(args);
        return {
          data: rows,
          total,
          page: finalQuery.page,
          limit: finalQuery.limit,
        };

      case "aggregate": {
        const args = options.adapter.toAggregateArgs(finalQuery);
        const result = await options.repository.aggregate(args);
        return this.mapAggregateAliases(result, finalQuery.aggregates);
      }
      case "groupBy": {
        const args = options.adapter.toGroupByArgs(finalQuery);
        const result = await options.repository.groupBy(args);
        return result.map((r: any) =>
          this.mapAggregateAliases(r, finalQuery.aggregates),
        );
      }
      case "findUnique": {
        const args = options.adapter.toFindUniqueArgs(
          finalQuery,
          options.unique,
        );
        const result = await options.repository.findUnique(args);
        return result;
      }
      case "findFirst": {
        const args = options.adapter.toFindFirstArgs(finalQuery);
        const result = await options.repository.findFirst(args);
        return result;
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
  private applyDefaults(
    query: InternalQuery,
    metadata: QueryMetadata,
  ): InternalQuery {
    return {
      ...query,
      select:
        query.select.length > 0
          ? query.select
          : (metadata.defaultSelectableFields ?? query.select),
    };
  }
  detectOperation(dto: QueryDto) {
    if (dto.groupBy?.length) {
      return "groupBy";
    }

    if (dto.aggregates?.length) {
      return "aggregate";
    }

    return "findMany";
  }
}
