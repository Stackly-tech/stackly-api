import { type QueryMetadata } from "#common/interfaces/IInternal-query.js";

export const employeeQueryMetadata: QueryMetadata = {
  searchableFields: [
    "firstName",
    "lastName",
    "email",
    "jobTitle",
    "department",
  ],

  sortableFields: ["email", "department", "firstName", "jobTitle", "lastName"],

  filterableFields: [
    "email",
    "department",
    "firstName",
    "jobTitle",
    "lastName",
  ],

  selectableFields: [
    "id",
    "email",
    "department",
    "firstName",
    "jobTitle",
    "lastName",
  ],

  aggregatableFields: ["id", "department"],
};
