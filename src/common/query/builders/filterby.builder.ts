import type { FilterGroupDto } from "#common/dtos/filter-group.dto.js";
import type { FilterRuleDto } from "#common/dtos/filter-rule.dto.js";
import type {
  InternalFilterGroup,
  InternalFilterRule,
} from "../../interfaces/IInternal-query.js";

export class FilterBuilder {
  public build(group?: FilterGroupDto): InternalFilterGroup | undefined {
    if (!group) {
      return undefined;
    }

    return {
      operator: group.operator,
      rules: group.rules.map((rule) =>
        this.isFilterGroup(rule) ? this.build(rule)! : this.buildRule(rule),
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
}
