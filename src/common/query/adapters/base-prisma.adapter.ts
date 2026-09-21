import type {
  InternalFilterGroup,
  InternalFilterRule,
  InternalQuery,
  InternalAggregate,
  InternalSort,
} from "#/common/interfaces/IInternal-query.js";

export interface IPrismaQueryAdapter {
  toFindManyArgs(query: InternalQuery): unknown;
  toFindUniqueArgs(query: InternalQuery, unique: Record<string, any>): unknown;
  toFindFirstArgs(query: InternalQuery): unknown;
  toCountArgs(query: InternalQuery): unknown;
  toAggregateArgs(query: InternalQuery): unknown;
  toGroupByArgs(query: InternalQuery): unknown;
}

export class BasePrismaAdapter<
  TFindManyArgs,
  TFindUniqueArgs,
  TFindFirstArgs,
  TCountArgs,
  TAggregateArgs,
  TWhereInput,
  TSelect,
  TOrderBy,
  TGroupBy,
  TGroupByArgs,
> implements IPrismaQueryAdapter {
  public toFindManyArgs(query: InternalQuery): TFindManyArgs {
    const args = {} as TFindManyArgs & {
      skip?: number;
      take?: number;
      where?: TWhereInput;
      select?: TSelect;
      orderBy?: TOrderBy[];
    };
    return this.applyCommonFindManyArgs(query, args) as TFindManyArgs;
  }

  public toFindUniqueArgs(
    query: InternalQuery,
    unique: Record<string, any>,
  ): TFindUniqueArgs {
    const args = {} as TFindUniqueArgs & {
      where?: TWhereInput;
      select?: TSelect;
    };

    args.where = unique as TWhereInput;

    return this.applyCommonFindUniqueArgs(query, args);
  }

  public toFindFirstArgs(query: InternalQuery): TFindFirstArgs {
    const args = {} as TFindFirstArgs & {
      skip?: number;
      take?: number;
      where?: TWhereInput;
      select?: TSelect;
      orderBy?: TOrderBy[];
    };
    return this.applyCommonFindFirstArgs(query, args) as TFindFirstArgs;
  }

  public toCountArgs(query: InternalQuery): TCountArgs {
    const args = {} as TCountArgs & { where?: TWhereInput };
    return this.applyCommonCountArgs(query, args) as TCountArgs;
  }

  public toAggregateArgs(query: InternalQuery): TAggregateArgs {
    const args = {} as TAggregateArgs & { where?: TWhereInput };
    return this.applyCommonAggregateArgs(query, args) as TAggregateArgs;
  }

  public toGroupByArgs(query: InternalQuery): TGroupByArgs {
    const args = {
      by: query.groupBy as TGroupBy[],
    } as unknown as TGroupByArgs & {
      where?: TWhereInput;
      orderBy?: TOrderBy[];
    };

    return this.applyCommonGroupByArgs(query, args) as TGroupByArgs;
  }

  protected buildWhere(group?: InternalFilterGroup): TWhereInput | undefined {
    if (!group) {
      return undefined;
    }

    return this.buildWhereGroup(group);
  }

  protected buildWhereGroup(group: InternalFilterGroup): TWhereInput {
    const conditions = group.rules.map((rule) => {
      if ("rules" in rule) {
        return this.buildWhereGroup(rule);
      }

      return this.buildRule(rule);
    });

    switch (group.operator) {
      case "and":
        return {
          AND: conditions,
        } as TWhereInput;

      case "or":
        return {
          OR: conditions,
        } as TWhereInput;

      case "not":
        return {
          NOT: conditions,
        } as TWhereInput;

      default:
        throw new Error(`Unsupported operator: ${group.operator}`);
    }
  }

  protected buildRule(rule: InternalFilterRule): TWhereInput {
    switch (rule.operator) {
      case "eq":
        return {
          [rule.field]: {
            equals: rule.value,
          },
        } as TWhereInput;

      case "neq":
        return {
          [rule.field]: {
            not: rule.value,
          },
        } as TWhereInput;

      case "gt":
        return {
          [rule.field]: {
            gt: rule.value,
          },
        } as TWhereInput;

      case "gte":
        return {
          [rule.field]: {
            gte: rule.value,
          },
        } as TWhereInput;

      case "lt":
        return {
          [rule.field]: {
            lt: rule.value,
          },
        } as TWhereInput;

      case "lte":
        return {
          [rule.field]: {
            lte: rule.value,
          },
        } as TWhereInput;

      case "contains":
        return {
          [rule.field]: {
            contains: rule.value,
            mode: "insensitive",
          },
        } as TWhereInput;

      case "startsWith":
        return {
          [rule.field]: {
            startsWith: rule.value,
            mode: "insensitive",
          },
        } as TWhereInput;

      case "endsWith":
        return {
          [rule.field]: {
            endsWith: rule.value,
            mode: "insensitive",
          },
        } as TWhereInput;

      case "in":
        return {
          [rule.field]: {
            in: Array.isArray(rule.value) ? rule.value : [rule.value],
          },
        } as TWhereInput;

      case "notIn":
        return {
          [rule.field]: {
            notIn: Array.isArray(rule.value) ? rule.value : [rule.value],
          },
        } as TWhereInput;

      case "isNull":
        return {
          [rule.field]: {
            equals: null,
          },
        } as TWhereInput;

      case "isNotNull":
        return {
          [rule.field]: {
            not: null,
          },
        } as TWhereInput;

      case "between":
        if (Array.isArray(rule.value) && rule.value.length === 2) {
          return {
            AND: [
              {
                [rule.field]: {
                  gte: rule.value[0],
                },
              },
              {
                [rule.field]: {
                  lte: rule.value[1],
                },
              },
            ],
          } as TWhereInput;
        }
        return {} as TWhereInput;

      default:
        return {} as TWhereInput;
    }
  }

  protected applyCommonFindUniqueArgs<
    TArgs extends {
      where?: TWhereInput;
      select?: TSelect;
    },
  >(query: InternalQuery, args: TArgs): TArgs {
    const select = this.buildSelect(query.select);

    if (select) {
      args.select = select;
    }

    return args;
  }

  protected applyCommonFindFirstArgs<
    TArgs extends {
      skip?: number;
      take?: number;
      where?: TWhereInput;
      select?: TSelect;
      orderBy?: TOrderBy[];
    },
  >(query: InternalQuery, args: TArgs): TArgs {
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

    return args;
  }

  protected applyCommonFindManyArgs<
    TArgs extends {
      skip?: number;
      take?: number;
      where?: TWhereInput;
      select?: TSelect;
      orderBy?: TOrderBy[];
    },
  >(query: InternalQuery, args: TArgs): TArgs {
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

    return args;
  }

  protected applyCommonCountArgs<TArgs extends { where?: TWhereInput }>(
    query: InternalQuery,
    args: TArgs,
  ): TArgs {
    const where = this.buildWhere(query.filters);

    if (where) {
      args.where = where;
    }

    return args;
  }

  protected applyCommonAggregateArgs<TArgs extends { where?: TWhereInput }>(
    query: InternalQuery,
    args: TArgs,
  ): TArgs {
    const where = this.buildWhere(query.filters);

    if (where) {
      args.where = where;
    }

    if (query.aggregates.length > 0) {
      Object.assign(args, this.buildAggregates(query.aggregates));
    }

    return args;
  }

  protected applyCommonGroupByArgs<
    TArgs extends {
      where?: TWhereInput;
      orderBy?: TOrderBy[];
    },
  >(query: InternalQuery, args: TArgs): TArgs {
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

  protected buildSelect(fields: readonly string[]): TSelect | undefined {
    if (!fields.length) {
      return undefined;
    }

    const select: Record<string, unknown> = {};

    for (const field of fields) {
      this.assignSelectPath(select, field.split("."));
    }

    return select as TSelect;
  }

  protected assignSelectPath(
    target: Record<string, unknown>,
    paths: readonly string[],
  ): void {
    const [head, ...tail] = paths;

    if (!head) {
      return;
    }

    if (tail.length === 0) {
      target[head] = true;
      return;
    }

    if (!(head in target)) {
      target[head] = {
        select: {},
      };
    }

    const nested = target[head] as {
      select: Record<string, unknown>;
    };

    this.assignSelectPath(nested.select, tail);
  }

  protected buildOrderBy(sorts: readonly InternalSort[]): TOrderBy[] {
    return sorts.map((sort) => ({
      [sort.field]: sort.direction,
    })) as TOrderBy[];
  }

  protected buildGroupBy(fields: readonly string[]): TGroupBy[] {
    return fields as TGroupBy[];
  }

  protected buildAggregates(
    aggregates: readonly InternalAggregate[],
  ): Record<string, any> {
    const result: Record<string, any> = {};

    for (const agg of aggregates) {
      const key = `_${agg.function}`;

      result[key] ??= {};
      result[key][agg.field] = true;
    }

    return result;
  }

  protected buildSearchWhere(
    searchValue?: string,
    searchFields?: readonly string[],
  ): TWhereInput | undefined {
    if (!searchValue || !searchFields?.length) {
      return undefined;
    }

    const conditions = searchFields.map((field) => ({
      [field]: {
        contains: searchValue,
        mode: "insensitive",
      },
    }));

    return {
      OR: conditions,
    } as TWhereInput;
  }
}
export type TBasePrismaAdapter = typeof BasePrismaAdapter;
