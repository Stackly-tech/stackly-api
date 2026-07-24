import { Prisma } from "#generated/prisma/client.js";
import type {
  InternalFilterGroup,
  InternalFilterRule,
  InternalQuery,
} from "../../interfaces/IInternal-query.js";

export class PrismaAdapter {
  public toFindManyArgs(query: InternalQuery): Prisma.EmployeeFindManyArgs {
    const args: Prisma.EmployeeFindManyArgs = {};

    if (
      query.offset !== undefined &&
      Number.isFinite(query.offset) &&
      query.offset > 0
    ) {
      args.skip = query.offset;
    }

    if (
      query.limit !== undefined &&
      Number.isFinite(query.limit) &&
      query.limit > 0
    ) {
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

    if (query.distinct.length > 0) {
      args.distinct = query.distinct as Prisma.EmployeeScalarFieldEnum[];
    }

    return args;
  }
  private buildWhereGroup(
    group: InternalFilterGroup,
  ): Prisma.EmployeeWhereInput {
    const conditions = group.rules.map((rule) => {
      if ("rules" in rule) {
        return this.buildWhereGroup(rule);
      }

      return this.buildRule(rule);
    });

    switch (group.operator) {
      case "and":
        return { AND: conditions };

      case "or":
        return { OR: conditions };

      case "not":
        return { NOT: conditions };

      default:
        throw new Error(`Unsupported operator: ${group.operator}`);
    }
  }
  private buildWhere(
    group?: InternalFilterGroup,
  ): Prisma.EmployeeWhereInput | undefined {
    if (!group) {
      return undefined;
    }
    return this.buildWhereGroup(group);
  }
  private buildRule(rule: InternalFilterRule): Prisma.EmployeeWhereInput {
    switch (rule.operator) {
      case "eq":
        return {
          [rule.field]: {
            equals: rule.value,
          },
        };

      case "neq":
        return {
          [rule.field]: {
            not: rule.value,
          },
        };

      case "gt":
        return {
          [rule.field]: {
            gt: rule.value,
          },
        };

      case "gte":
        return {
          [rule.field]: {
            gte: rule.value,
          },
        };

      case "lt":
        return {
          [rule.field]: {
            lt: rule.value,
          },
        };

      case "lte":
        return {
          [rule.field]: {
            lte: rule.value,
          },
        };

      default:
        return {};
    }
  }

  private buildSelect(
    fields: readonly string[],
  ): Prisma.EmployeeSelect | undefined {
    if (!fields.length) {
      return undefined;
    }

    const select: Record<string, unknown> = {};

    for (const field of fields) {
      this.assignSelectPath(select, field.split("."));
    }

    return select as Prisma.EmployeeSelect;
  }

  private assignSelectPath(
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

  private buildOrderBy(
    sorts: readonly {
      field: string;
      direction: "asc" | "desc";
    }[],
  ): Prisma.EmployeeOrderByWithRelationInput[] {
    return sorts.map((sort) => ({
      [sort.field]: sort.direction,
    })) as Prisma.EmployeeOrderByWithRelationInput[];
  }
}
export type IPrismaAdaptor = PrismaAdapter;
