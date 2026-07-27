import type {
  InternalFilterGroup,
  InternalFilterRule,
  InternalQuery,
} from "#common/interfaces/IInternal-query.js";

export abstract class BasePrismaAdapter<
  TFindManyArgs,
  TWhereInput,
  TSelect,
  TOrderBy,
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

  protected buildOrderBy(
    sorts: readonly {
      field: string;
      direction: "asc" | "desc";
    }[],
  ): TOrderBy[] {
    return sorts.map((sort) => ({
      [sort.field]: sort.direction,
    })) as TOrderBy[];
  }
}
