export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_ROWS_PER_PAGE: 20,
  MAX_ROWS_PER_PAGE: 100,
} as const;
export const searchableFields = {
  user: ['name', 'email'],
  tournament: ['name'],
};
export const detailViewIncludes = {
  user: { enterprise: true },
  tournament: { organizer: true },
};