export function sort(elements: { pinned?: boolean | null, sort?: number | null }[]) {
  const pinned = elements
    .filter(e => e.pinned === true)
    .sort((a, b) => internalSortFunction(a.sort, b.sort))
  const rest = elements
    .filter(e => e.pinned !== true)
    .sort((a, b) => internalSortFunction(a.sort, b.sort))
  return [...pinned, ...rest]
}

function internalSortFunction(a: number | null | undefined, b: number | null | undefined) {
  const aVal = a === undefined || a === null ? 0 : a
  const bVal = b === undefined || b === null ? 0 : b
  return bVal - aVal
}
