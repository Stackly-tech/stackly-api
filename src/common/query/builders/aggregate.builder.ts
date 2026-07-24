import type { AggregateDto } from "#common/dtos/aggregate.dto.js";
import type { InternalAggregate } from "../../interfaces/IInternal-query.js";

export class AggregateBuilder {
  public build(
    aggregates?: readonly AggregateDto[],
  ): readonly InternalAggregate[] {
    if (!aggregates?.length) {
      return [];
    }

    return aggregates.map((aggregate) => ({
      function: aggregate.function,
      field: aggregate.field,
      alias: aggregate.alias,
    }));
  }
}
