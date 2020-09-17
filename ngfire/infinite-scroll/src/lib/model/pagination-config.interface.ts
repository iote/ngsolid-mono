export interface PaginationConfig
{
  /** Path to collection */
  path: string,
  /** Field to orderBy */
  field: string,
  /** Limit per query */
  limit: number, //
  /** Reverse order? */
  reverse: boolean,
   /** Prepend to source? */
  prepend: boolean
}
