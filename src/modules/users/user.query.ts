import { type QueryMetadata } from "#/common/interfaces/IInternal-query.js";

export const userQueryMetadata: QueryMetadata = {
  searchableFields: ["id"],

  sortableFields: ["id", "createdAt", "updatedAt"],

  filterableFields: ["id", "createdAt", "updatedAt"],

  selectableFields: ["id", "firstName", "lastName", "username", "name"],

  aggregatableFields: ["id", "createdAt"],
  defaultAggregatableFields: [],
  defaultFilterableFields: [],
  defaultSearchableFields: [],
  defaultSelectableFields: [
    "id",
    "firstName",
    "lastName",
    "username",
    "name",
    "email",
  ],
  defaultSortableFields: ["id", "createdAt"],
};
