import type {
  InternalFilterGroup,
  InternalFilterRule,
  InternalQuery,
  InternalAggregate,
  InternalSort,
} from "#common/interfaces/IInternal-query.js";

export abstract class BasePrismaAdapter<
  TFindManyArgs,
  TWhereInput,
  TSelect,
  TOrderBy,
  TGroupBy,
> {
  public abstract toFindManyArgs(query: InternalQuery): TFindManyArgs;

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
