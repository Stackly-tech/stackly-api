# Generic Query API Contract

## 1. Purpose

This contract defines a reusable query API for all list/search endpoints in the backend. It is designed for Node.js, Express, TypeScript, Prisma, PostgreSQL, Zod, and OpenAPI/Swagger.

The contract supports:

- Pagination
- Select fields
- Include/relations
- Filtering
- Nested AND/OR filters
- Full-text search
- Multi-column sorting
- Aggregations
- Group By
- Distinct
- Field validation
- Relation filtering

---

## 2. Standard Request Envelope

All list/search endpoints should accept a JSON body using the following shape:

```json
{
  "pagination": {
    "page": 1,
    "limit": 20
  },
  "select": ["id", "name", "email"],
  "include": ["department"],
  "filters": {
    "operator": "and",
    "rules": [
      {
        "field": "status",
        "operator": "eq",
        "value": "active"
      },
      {
        "operator": "or",
        "rules": [
          {
            "field": "departmentId",
            "operator": "eq",
            "value": 3
          },
          {
            "field": "role",
            "operator": "contains",
            "value": "manager"
          }
        ]
      }
    ]
  },
  "search": {
    "value": "john",
    "fields": ["firstName", "lastName", "email"]
  },
  "sort": [
    { "field": "createdAt", "direction": "desc" },
    { "field": "name", "direction": "asc" }
  ],
  "aggregate": [{ "function": "count", "field": "id", "alias": "total" }],
  "groupBy": ["departmentId"],
  "distinct": ["departmentId"]
}
```

---

## 3. Complete QueryDto

```ts
export interface QueryDto {
  readonly pagination?: PaginationDto;
  readonly select?: readonly string[];
  readonly include?: readonly string[];
  readonly filters?: FilterGroupDto;
  readonly search?: SearchDto;
  readonly sort?: readonly SortDto[];
  readonly aggregate?: readonly AggregateDto[];
  readonly groupBy?: readonly string[];
  readonly distinct?: readonly string[];
}
```

### 3.1 PaginationDto

```ts
export interface PaginationDto {
  readonly page: number;
  readonly limit: number;
}
```

### 3.2 SearchDto

```ts
export interface SearchDto {
  readonly value: string;
  readonly fields: readonly string[];
}
```

### 3.3 SortDto

```ts
export interface SortDto {
  readonly field: string;
  readonly direction: "asc" | "desc";
}
```

### 3.4 FilterDto

```ts
export interface FilterRuleDto {
  readonly field: string;
  readonly operator:
    | "eq"
    | "neq"
    | "gt"
    | "gte"
    | "lt"
    | "lte"
    | "between"
    | "in"
    | "notIn"
    | "contains"
    | "startsWith"
    | "endsWith"
    | "like"
    | "isTrue"
    | "isFalse"
    | "isNull"
    | "isNotNull";
  readonly value?: unknown;
}
```

### 3.5 FilterGroupDto

```ts
export interface FilterGroupDto {
  readonly operator: "and" | "or" | "not";
  readonly rules: readonly (FilterRuleDto | FilterGroupDto)[];
}
```

### 3.6 AggregateDto

```ts
export interface AggregateDto {
  readonly function: "count" | "sum" | "avg" | "min" | "max";
  readonly field: string;
  readonly alias: string;
}
```

---

## 4. Standard Endpoint: POST /resource/search

### Purpose

Use one standard endpoint for all list and search flows.

### Request

```http
POST /api/v1/employees/search
Content-Type: application/json
```

### Example request body

```json
{
  "pagination": {
    "page": 1,
    "limit": 20
  },
  "select": ["id", "firstName", "lastName", "email"],
  "include": ["department"],
  "filters": {
    "operator": "and",
    "rules": [
      {
        "field": "status",
        "operator": "eq",
        "value": "active"
      },
      {
        "operator": "or",
        "rules": [
          {
            "field": "departmentId",
            "operator": "eq",
            "value": 3
          },
          {
            "field": "role",
            "operator": "contains",
            "value": "manager"
          }
        ]
      }
    ]
  },
  "search": {
    "value": "john",
    "fields": ["firstName", "lastName", "email"]
  },
  "sort": [{ "field": "createdAt", "direction": "desc" }]
}
```

### Success response

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "department": {
        "id": 3,
        "name": "Engineering"
      }
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 128,
    "totalPages": 7,
    "hasNextPage": true,
    "hasPreviousPage": false
  }
}
```

### Aggregation response example

```json
{
  "success": true,
  "data": [],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 128,
    "totalPages": 7,
    "hasNextPage": true,
    "hasPreviousPage": false,
    "aggregates": {
      "total": 128,
      "avgSalary": 8450.75
    }
  }
}
```

---

## 5. Standard Endpoint: GET /resource/meta

### Purpose

Return metadata about what the frontend can query for a given resource.

### Example

```http
GET /api/v1/employees/meta
```

### Meta response

```json
{
  "success": true,
  "data": {
    "resource": "employees",
    "searchableFields": ["firstName", "lastName", "email"],
    "sortableFields": [
      "id",
      "firstName",
      "lastName",
      "email",
      "createdAt",
      "updatedAt"
    ],
    "selectableFields": [
      "id",
      "firstName",
      "lastName",
      "email",
      "status",
      "departmentId",
      "createdAt",
      "updatedAt"
    ],
    "includableRelations": ["department", "manager"],
    "filterableFields": [
      "id",
      "firstName",
      "lastName",
      "email",
      "status",
      "departmentId",
      "createdAt",
      "updatedAt"
    ],
    "operators": {
      "status": ["eq", "in", "notIn"],
      "departmentId": ["eq", "gt", "gte", "lt", "lte"],
      "createdAt": ["eq", "gt", "gte", "lt", "lte", "between"],
      "email": ["eq", "contains", "startsWith", "endsWith", "like"],
      "isActive": ["isTrue", "isFalse"]
    },
    "enumValues": {
      "status": ["active", "inactive", "pending"]
    },
    "fieldTypes": {
      "id": "number",
      "firstName": "string",
      "lastName": "string",
      "email": "string",
      "status": "string",
      "departmentId": "number",
      "createdAt": "date",
      "updatedAt": "date",
      "isActive": "boolean"
    }
  }
}
```

---

## 6. OpenAPI / Swagger Example

### 6.1 Search endpoint schema

```yaml
openapi: 3.0.3
info:
  title: Generic Query API
  version: 1.0.0
paths:
  /api/v1/employees/search:
    post:
      summary: Search employees
      operationId: searchEmployees
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/QueryDto"
      responses:
        "200":
          description: Successful query response
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/SearchResponse"
  /api/v1/employees/meta:
    get:
      summary: Get employee query metadata
      operationId: getEmployeeMeta
      responses:
        "200":
          description: Metadata response
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/MetaResponse"
components:
  schemas:
    QueryDto:
      type: object
      properties:
        pagination:
          $ref: "#/components/schemas/PaginationDto"
        select:
          type: array
          items:
            type: string
        include:
          type: array
          items:
            type: string
        filters:
          $ref: "#/components/schemas/FilterGroupDto"
        search:
          $ref: "#/components/schemas/SearchDto"
        sort:
          type: array
          items:
            $ref: "#/components/schemas/SortDto"
        aggregate:
          type: array
          items:
            $ref: "#/components/schemas/AggregateDto"
        groupBy:
          type: array
          items:
            type: string
        distinct:
          type: array
          items:
            type: string
    PaginationDto:
      type: object
      required:
        - page
        - limit
      properties:
        page:
          type: integer
          minimum: 1
        limit:
          type: integer
          minimum: 1
          maximum: 100
    SearchDto:
      type: object
      required:
        - value
      properties:
        value:
          type: string
        fields:
          type: array
          items:
            type: string
    SortDto:
      type: object
      required:
        - field
        - direction
      properties:
        field:
          type: string
        direction:
          type: string
          enum: [asc, desc]
    FilterRuleDto:
      type: object
      required:
        - field
        - operator
      properties:
        field:
          type: string
        operator:
          type: string
        value:
          nullable: true
    FilterGroupDto:
      type: object
      required:
        - operator
        - rules
      properties:
        operator:
          type: string
          enum: [and, or, not]
        rules:
          type: array
          items:
            oneOf:
              - $ref: "#/components/schemas/FilterRuleDto"
              - $ref: "#/components/schemas/FilterGroupDto"
    AggregateDto:
      type: object
      required:
        - function
        - field
        - alias
      properties:
        function:
          type: string
          enum: [count, sum, avg, min, max]
        field:
          type: string
        alias:
          type: string
    SearchResponse:
      type: object
      properties:
        success:
          type: boolean
        data:
          type: array
          items:
            type: object
        meta:
          type: object
          properties:
            page:
              type: integer
            limit:
              type: integer
            total:
              type: integer
            totalPages:
              type: integer
            hasNextPage:
              type: boolean
            hasPreviousPage:
              type: boolean
            aggregates:
              type: object
    MetaResponse:
      type: object
      properties:
        success:
          type: boolean
        data:
          type: object
```

---

## 7. Example Requests and Responses

### Example 1: Basic list

Request:

```json
{
  "pagination": { "page": 1, "limit": 10 }
}
```

Response:

```json
{
  "success": true,
  "data": [{ "id": 1, "name": "Alice" }],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 45,
    "totalPages": 5,
    "hasNextPage": true,
    "hasPreviousPage": false
  }
}
```

### Example 2: Filter + sort + select

Request:

```json
{
  "select": ["id", "name"],
  "filters": {
    "operator": "and",
    "rules": [{ "field": "status", "operator": "eq", "value": "active" }]
  },
  "sort": [{ "field": "name", "direction": "asc" }]
}
```

Response:

```json
{
  "success": true,
  "data": [{ "id": 1, "name": "Alice" }],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 12,
    "totalPages": 1,
    "hasNextPage": false,
    "hasPreviousPage": false
  }
}
```

---

## 8. Frontend Consumption Guide

Frontend consumers should:

1. Call GET /resource/meta once on page load or when the resource changes.
2. Store the metadata locally in a query builder state.
3. Build UI controls dynamically from the metadata:
   - dropdowns for searchable fields
   - sortable columns from sortableFields
   - select lists for filterable fields
   - operators from operators per field
   - enum-based dropdowns from enumValues
4. Send a POST /resource/search request whenever the user applies filters, sorting, pagination, or search.
5. Update pagination from the response meta object.

### Example frontend flow

```ts
const meta = await fetch("/api/v1/employees/meta").then((r) => r.json());

const query = {
  pagination: { page: 1, limit: 20 },
  search: { value: "john", fields: meta.data.searchableFields.slice(0, 3) },
  sort: [{ field: "createdAt", direction: "desc" }],
};

await fetch("/api/v1/employees/search", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(query),
});
```

---

## 9. Dynamic UI Construction from Meta

### Pagination UI

- Use page and limit from the request.
- Read totalPages and hasNextPage from the response meta.

### Search UI

- Use searchableFields as the list of fields the user can search across.
- Use search.value as the user input.

### Filter UI

- Use filterableFields as the field list.
- Use operators[field] to populate operator dropdowns.
- Use enumValues[field] to show dropdown options.
- Use fieldTypes[field] to render the right input control.

### Sort UI

- Use sortableFields to populate sort columns.

### Select UI

- Use selectableFields so the client knows what columns can be requested.

---

## 10. Backend Validation Strategy

The backend must validate:

1. Unsupported fields
   - If a field is not listed in filterableFields/selectableFields/searchableFields/sortableFields, reject it.

2. Unsupported operators
   - If an operator is not in the allowed set for the field, reject it.

3. Unsupported relations
   - If include contains a relation not present in includableRelations, reject it.

4. Invalid values
   - If a field is typed as number/date/boolean, ensure the incoming values match the expected runtime type.

### Example validation behavior

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Unsupported filter field",
    "details": {
      "field": "unknownField"
    }
  }
}
```

---

## 11. Standard Error Responses

### Validation error

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Unsupported filter field",
    "details": {
      "field": "unknownField"
    }
  }
}
```

### Not found

```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Resource not found"
  }
}
```

### Unauthorized

```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Authentication required"
  }
}
```

### Internal server error

```json
{
  "success": false,
  "error": {
    "code": "INTERNAL_SERVER_ERROR",
    "message": "Unexpected server error"
  }
}
```

---

## 12. Versioning and Backward Compatibility

### Recommended strategy

- Version the API under /api/v1/.
- Keep the query contract backward compatible by adding new optional fields rather than changing existing semantics.
- If a new operator or field is introduced, expose it in meta first, then support it in the runtime.
- Avoid breaking changes in the existing DTOs.

### Compatibility rules

- New optional fields are safe.
- New operators should be additive.
- Existing required fields should remain required.

---

## 13. Reuse Across Resources

This contract can be reused for:

- Employees
- Departments
- Products
- Orders
- Customers
- Payments

The only thing that changes per resource is the metadata returned by GET /resource/meta.

### Example resource-specific metadata

For employees:

- searchableFields: ["firstName", "lastName", "email"]

For products:

- searchableFields: ["name", "sku", "description"]

For orders:

- searchableFields: ["orderNumber", "customerName"]

---

## 14. Best Practices and Comparison

### Best practices

- Keep one standard contract for all list/search endpoints.
- Make metadata discoverable through /meta.
- Validate everything server-side.
- Support pagination defaults and maximum limits.
- Prefer explicit allow-lists over free-form field access.
- Use relation-safe filtering and include rules.
- Separate query building from controller logic.

### Compared to other systems

#### OData

Pros:

- Powerful and standards-based
- Rich query grammar

Cons:

- Verbose and harder for frontend teams to build manually
- More complex than most REST teams need

#### Hasura

Pros:

- Excellent for GraphQL-style data access
- Strong filtering and permissions model

Cons:

- Heavier platform dependency
- Less natural for traditional REST APIs

#### Directus

Pros:

- Great admin UI and field metadata model
- Easy to expose collections

Cons:

- More opinionated and less flexible for custom enterprise apps

#### JSON:API

Pros:

- Strong standard for pagination and relationships
- Familiar to many frontend teams

Cons:

- Less expressive for advanced filtering and nested logical groups
- Requires more custom extension for enterprise query needs

### Recommendation

This contract is a strong middle ground:

- simpler than OData,
- more flexible than JSON:API,
- easier to implement than Hasura,
- and consistent with enterprise REST API practices.

---

## 15. Suggested Improvements

If you want to make this even stronger, the following additions are recommended:

1. Add support for `includeDepth` for nested relations.
2. Add `context` or `locale` for localized data queries.
3. Add `permission` or `tenant` filters for multi-tenant systems.
4. Add `cursor` pagination for very large datasets.
5. Add `softDelete` filtering support.
6. Add `fullText` as a first-class operator separate from generic search.
7. Add `fieldAliases` for user-friendly UI labels.
8. Add `defaultSort` metadata in /meta.
9. Add a `requestId` field for tracing and observability.
10. Add `explain` or `debug` mode for query performance inspection.

---

## 16. Recommended Contract Summary

For enterprise use, the best standard is:

- POST /resource/search for retrieval
- GET /resource/meta for dynamic UI metadata
- One shared QueryDto for all resources
- Strict validation and allow-listing
- A consistent envelope shape for success and error

This gives frontend teams a stable contract while keeping backend logic reusable and extensible.
