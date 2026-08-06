import { type QueryMetadata } from "#common/interfaces/IInternal-query.js";

export const studentQueryMetadata: QueryMetadata = {
  searchableFields: ["firstName", "lastName", "email", "rollNumber", "course"],

  sortableFields: [
    "email",
    "course",
    "firstName",
    "lastName",
    "rollNumber",
    "year",
    "enrollmentDate",
  ],

  filterableFields: [
    "email",
    "course",
    "firstName",
    "lastName",
    "rollNumber",
    "year",
  ],

  selectableFields: [
    "id",
    "email",
    "course",
    "firstName",
    "lastName",
    "rollNumber",
    "year",
    "phoneNumber",
    "enrollmentDate",
  ],

  aggregatableFields: ["id", "course"],
};
