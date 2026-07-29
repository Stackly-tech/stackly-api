import { type QueryDto } from "#common/dtos/query.dto.js";
import { type QueryMetadata } from "#common/interfaces/IInternal-query.js";
import type { PaginationDto } from "#common/dtos/pagination.dto.js";
import type { FilterGroupDto } from "#common/dtos/filter-group.dto.js";
import type { FilterRuleDto } from "#common/dtos/filter-rule.dto.js";
import type { SortDto } from "#common/dtos/sort.dto.js";
import type { AggregateDto } from "#common/dtos/aggregate.dto.js";
import { createQuerySchema } from "./services/validation.service.js";
import type {
  InternalAggregate,
  InternalFilterGroup,
  InternalFilterRule,
  InternalQuery,
  InternalSort,
  IPaginationResult,
} from "#common/interfaces/IInternal-query.js";
import type { SearchDto } from "#common/dtos/search.dto.js";

export class QueryBuilder {
  constructor() {}

  public build(queryDto: QueryDto, metadata: QueryMetadata): any {
    const schema = createQuerySchema(metadata);
    const query = schema.parse(queryDto);
    const pagination = this.PaginationBuilder(query.pagination);
    const search = this.SearchBuilder(query.search);
    return {
      page: pagination.page,
      limit: pagination.limit,
      offset: pagination.offset,

      select: this.SelectBuilder(query.select),

      filters: this.FilterBuilder(query.filters),

      searchFields: search.fields,

      searchValue: search.value,

      sorts: this.SortBuilder(query.sort),

      aggregates: this.AggregateBuilder(query.aggregates),

      groupBy: this.GroupBuilder(query.groupBy),

      distinct: this.DistinctBuilder(query.distinct),
    };
  }

  private AggregateBuilder(
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

  private DistinctBuilder(fields?: readonly string[]): readonly string[] {
    return fields ?? [];
  }

  private buildFilter(group?: FilterGroupDto): InternalFilterGroup | undefined {
    if (!group) {
      return undefined;
    }

    return {
      operator: group.operator,
      rules: group.rules.map((rule: FilterRuleDto) =>
        this.isFilterGroup(rule)
          ? this.buildFilter(rule)!
          : this.buildRule(rule),
      ),
    };
  }

  private FilterBuilder(
    group?: FilterGroupDto,
  ): InternalFilterGroup | undefined {
    if (!group) {
      return undefined;
    }

    return {
      operator: group.operator,
      rules: group.rules.map((rule: FilterRuleDto) =>
        this.isFilterGroup(rule)
          ? this.buildFilter(rule)!
          : this.buildRule(rule),
      ),
    };
  }

  private buildRule(rule: FilterRuleDto): InternalFilterRule {
    return {
      field: rule.field,
      operator: rule.operator,
      value: rule.value,
    };
  }

  private isFilterGroup(
    value: FilterRuleDto | FilterGroupDto,
  ): value is FilterGroupDto {
    return "rules" in value;
  }

  private GroupBuilder(fields?: readonly string[]): readonly string[] {
    return fields ?? [];
  }
  private PaginationBuilder(pagination?: PaginationDto): IPaginationResult {
    if (
      !pagination ||
      pagination.page === undefined ||
      pagination.limit === undefined
    ) {
      return {};
    }

    return {
      page: pagination.page,
      limit: pagination.limit,
      offset: (pagination.page - 1) * pagination.limit,
    };
  }
  private SearchBuilder(search?: SearchDto): any {
    return {
      value: search?.value,
      fields: search?.fields ?? [],
    };
  }
  private SelectBuilder(fields?: readonly string[]): readonly string[] {
    return fields ?? [];
  }

  private SortBuilder(sorts?: readonly SortDto[]): readonly InternalSort[] {
    if (!sorts?.length) {
      return [];
    }

    return sorts.map((sort) => ({
      field: sort.field,
      direction: sort.direction,
    }));
  }
}

export type TQueryBuilder = QueryBuilder;
