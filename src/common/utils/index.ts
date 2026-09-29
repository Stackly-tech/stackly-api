export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_ROWS_PER_PAGE: 20,
  MAX_ROWS_PER_PAGE: 100,
} as const;

export function getPaginationOffset(page = 1, pageSize = 20) {
  const take = Math.min(pageSize, PAGINATION.MAX_ROWS_PER_PAGE);
  const skip = (page > 1 ? page - 1 : 0) * take;
  return { skip, take };
}

export * from "./swagger.js";
