/**
 * Superseded by `FilteredGrid`.
 *
 * The old grid hard-coded one fixed set of filters (occasion + budget +
 * sort). Filters are now defined per occasion in lib/occasions.ts and
 * rendered by FilteredGrid, so this file only forwards to it and can be
 * deleted once nothing references it.
 */
export { default } from "./FilteredGrid";
