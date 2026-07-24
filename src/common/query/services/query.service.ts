import { type QueryDto } from "#common/dtos/query.dto.js";
import { type QueryMetadata } from "#common/interfaces/IQuermeta.js";
import type { PaginationDto } from "#common/dtos/pagination.dto.js";
import type { FilterGroupDto } from "#common/dtos/filter-group.dto.js";
import type { FilterRuleDto } from "#common/dtos/filter-rule.dto.js";
import type { SortDto } from "#common/dtos/sort.dto.js";
import type { AggregateDto } from "#common/dtos/aggregate.dto.js";
import type {
  InternalAggregate,
  InternalFilterGroup,
  InternalFilterRule,
  InternalQuery,
  InternalSort,
} from "#common/interfaces/IInternal-query.js";
import type { SearchDto } from "#common/dtos/search.dto.js";
import { type IPaginationResult } from "#common/interfaces/IPaginationResult.js";
import { type ISearchResult } from "#common/interfaces/ISearchResult.js";
import { type TValidationService } from "./validation.service.js";

export class QueryService {
  constructor(private readonly validationService: TValidationService) {}

  public build(query: QueryDto, metadata: QueryMetadata): any {
    this.validationService.validate(query, metadata);
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

      aggregates: this.AggregateBuilder(query.aggregate),

      groupBy: this.GroupBuilder(query.groupBy),

      distinct: this.DistinctBuilder(query.distinct),
    };
  }

  public AggregateBuilder(
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

  public DistinctBuilder(fields?: readonly string[]): readonly string[] {
    return fields ?? [];
  }

  public buildFilter(group?: FilterGroupDto): InternalFilterGroup | undefined {
    if (!group) {
      return undefined;
    }

    return {
      operator: group.operator,
      rules: group.rules.map((rule) =>
        this.isFilterGroup(rule)
          ? this.buildFilter(rule)!
          : this.buildRule(rule),
      ),
    };
  }

  public FilterBuilder(
    group?: FilterGroupDto,
  ): InternalFilterGroup | undefined {
    if (!group) {
      return undefined;
    }

    return {
      operator: group.operator,
      rules: group.rules.map((rule) =>
        this.isFilterGroup(rule)
          ? this.buildFilter(rule)!
          : this.buildRule(rule),
      ),
    };
  }

  public buildRule(rule: FilterRuleDto): InternalFilterRule {
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

  public GroupBuilder(fields?: readonly string[]): readonly string[] {
    return fields ?? [];
  }
  public PaginationBuilder(pagination?: PaginationDto): IPaginationResult {
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
  public SearchBuilder(search?: SearchDto): any {
    return {
      value: search?.value,
      fields: search?.fields ?? [],
    };
  }
  public SelectBuilder(fields?: readonly string[]): readonly string[] {
    return fields ?? [];
  }

  public SortBuilder(sorts?: readonly SortDto[]): readonly InternalSort[] {
    if (!sorts?.length) {
      return [];
    }

    return sorts.map((sort) => ({
      field: sort.field,
      direction: sort.direction,
    }));
  }
}

export type TQueryService = QueryService;
