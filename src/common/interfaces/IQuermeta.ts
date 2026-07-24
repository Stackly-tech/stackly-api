export interface QueryMetadata {
  readonly searchableFields: readonly string[];
  readonly sortableFields: readonly string[];
  readonly filterableFields: readonly string[];
  readonly selectableFields: readonly string[];
  readonly aggregatableFields: readonly string[];
}
