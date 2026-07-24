import type { SortDto } from "#common/dtos/sort.dto.js";
import type { InternalSort } from "../../interfaces/IInternal-query.js";

export class SortBuilder {
  public build(sorts?: readonly SortDto[]): readonly InternalSort[] {
    if (!sorts?.length) {
      return [];
    }

    return sorts.map((sort) => ({
      field: sort.field,
      direction: sort.direction,
    }));
  }
}
