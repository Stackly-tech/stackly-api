# Query System Architecture

## Overview

This is a **layered, reusable query system** that supports complex filtering, searching, aggregation, and grouping across all feature modules.

```
┌─────────────────────────────────────────────────────┐
│                 Request (DTO)                        │
│  { filters, search, aggregates, groupBy, ... }      │
└────────────────────┬────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────┐
│         QueryDtoSchema (Zod Validation)             │
│  Validates: type, enums, required fields           │
└────────────────────┬────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────┐
│    QueryService.execute()                           │
│  - Calls queryBuilder.build()                      │
│  - Transforms DTO → InternalQuery                  │
└────────────────────┬────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────┐
│    Adapter.toFindManyArgs() / toGroupByArgs()       │
│  - Converts InternalQuery → Prisma Arguments       │
└────────────────────┬────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────┐
│    Repository.findAll() / groupBy()                 │
│  - Executes Prisma query                           │
└────────────────────┬────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────┐
│              Database Result                        │
└─────────────────────────────────────────────────────┘
```

## Data Flow

### Example: Employee Query with Filters + Aggregates

**Input DTO:**
```json
{
  "pagination": { "page": 1, "limit": 50 },
  "filters": { "operator": "and", "rules": [...] },
  "search": { "value": "John", "fields": ["firstName", "lastName"] },
  "aggregate": [{ "function": "count", "field": "id", "alias": "total" }],
  "groupBy": ["department"]
}
```

**Step 1: Validation (Zod)**
```typescript
const validated = QueryDtoSchema.parse(dto);
```

**Step 2: Build Query (QueryService)**
```typescript
const internalQuery = queryBuilder.build(validated, employeeQueryMetadata);
// Result: InternalQuery with structured filters, search params, etc.
```

**Step 3: Adapter Conversion (EmployeePrismaAdapter)**
```typescript
// Detects groupBy → uses toGroupByArgs()
const args = adapter.toGroupByArgs(internalQuery);
// Result: Prisma.EmployeeGroupByArgs with WHERE, ORDER BY, AGGREGATES
```

**Step 4: Execute (Repository)**
```typescript
const result = repository.groupBy(args);
// SQL: SELECT ... GROUP BY department WITH aggregates
```

## Architecture Patterns

### 1. Layered Architecture
- **DTO Layer**: Input validation
- **Query Service**: Business logic (transform DTOs)
- **Adapter Layer**: Database abstraction
- **Repository Layer**: Direct DB access

### 2. Dependency Injection
```typescript
// app.module.ts
const shared = { prisma, logger, queryBuilder, adapter };
const queryService = new QueryService(shared);
const employee = employeeModule(queryService, shared);
```

### 3. Single Responsibility
- `QueryDtoSchema` → Validation only
- `QueryService` → DTO transformation only
- `PrismaAdapter` → SQL generation only
- `Repository` → DB execution only

## Reusability Across Modules

### Add a New Module (e.g., Course)

**1. Create adapter:**
```typescript
// src/modules/course/adapters/course.prisma.adaptor.ts
export class CoursePrismaAdapter extends BasePrismaAdapter<...> {
  public toFindManyArgs(query: InternalQuery): Prisma.CourseFindManyArgs { ... }
  public toGroupByArgs(query: InternalQuery): Prisma.CourseGroupByArgs { ... }
}
```

**2. Create module:**
```typescript
// src/modules/course/course.module.ts
export function courseModule(queryService: QueryService, shared: SharedServices) {
  const repository = new CourseRepository(shared.prisma);
  const service = new CourseService(repository, shared, queryService);
  const controller = new CourseController(service);
  return { repository, service, controller };
}
```

**3. Update app.module.ts:**
```typescript
import { courseModule } from "#modules/course/course.module.js";
import { CoursePrismaAdapter } from "#modules/course/adapters/course.prisma.adaptor.js";

const courseAdapter = new CoursePrismaAdapter();
const course = courseModule(queryService, { ...shared, adapter: courseAdapter });
export { course };
```

**4. Implement service (same pattern for all modules):**
```typescript
export class CourseService implements IService<any> {
  constructor(
    private readonly repository: IRepository<any>,
    private readonly shared: SharedServices,
    private readonly queryService: QueryService,
  ) {}

  async findAll(dto: unknown): Promise<any[]> {
    const validated = QueryDtoSchema.parse(dto);
    return await this.queryService.execute({
      dto: validated,
      metadata: courseQueryMetadata,
      repository: this.repository,
      adapter: this.shared.adapter,
      operation: "findMany",
    });
  }
  // ... other methods
}
```

## Key Features Supported

✅ **Filtering**: Complex nested filters with AND/OR/NOT  
✅ **Search**: Full-text search across multiple fields  
✅ **Sorting**: Multi-field sorting with asc/desc  
✅ **Pagination**: Offset-based with page/limit  
✅ **Aggregation**: count, sum, avg, min, max with aliases  
✅ **GroupBy**: Group results by fields  
✅ **Distinct**: Remove duplicates  
✅ **Select**: Choose specific fields  

## Supported Operators

**Comparison**: `eq`, `neq`, `gt`, `gte`, `lt`, `lte`, `between`  
**Text**: `contains`, `startsWith`, `endsWith`, `like`  
**Collection**: `in`, `notIn`  
**Null**: `isNull`, `isNotNull`  
**Logic**: `and`, `or`, `not`  

## Testing Example

```typescript
const service = new EmployeeService(repo, shared, queryService);

const result = await service.findAll({
  pagination: { page: 1, limit: 10 },
  filters: {
    operator: "and",
    rules: [
      { field: "department", operator: "eq", value: "Sales" },
      { field: "jobTitle", operator: "contains", value: "Manager" }
    ]
  },
  search: { value: "John", fields: ["firstName", "lastName"] },
  sort: [{ field: "firstName", direction: "asc" }],
  aggregate: [{ function: "count", field: "id", alias: "total" }],
  groupBy: ["department"]
});
```

## Performance Considerations

- ✅ Validation happens once (Zod)
- ✅ Query building is stateless
- ✅ Adapters are lightweight
- ✅ Repositories cache connections
- ✅ All operations are async-safe

## Troubleshooting

**Problem**: Query not executing aggregates  
**Solution**: Ensure `groupBy` is provided, use `toGroupByArgs()` instead of `toFindManyArgs()`

**Problem**: Search not working  
**Solution**: Verify `searchFields` match entity fields in metadata

**Problem**: Filters not applied  
**Solution**: Check filter structure, use `operator: "and"` or `"or"` at root level

---

For template examples, see:
- `/src/common/templates/module.template.ts`
- `/src/common/templates/app.module.pattern.ts`
