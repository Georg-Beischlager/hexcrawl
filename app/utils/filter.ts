import type { IFuseOptions } from 'fuse.js'
import Fuse from 'fuse.js'

export function filterDB(items: Database[], filter?: string) {
  if (filter === undefined || filter.length < 2)
    return items

  const options: IFuseOptions<Database> = {
    isCaseSensitive: false,
    ignoreDiacritics: true,
    includeScore: true,
    findAllMatches: true,
    shouldSort: true,
    keys: ['content_html', 'title', 'author'],
  }

  const fuse = new Fuse(items, options)
  return fuse.search(filter).filter(i => i.score && i.score < 1).map(i => i.item)
}
