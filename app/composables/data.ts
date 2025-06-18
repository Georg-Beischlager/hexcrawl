const logEntries = ref<Log[] | undefined>()
const dbEntries = ref<Database[] | undefined>()
const tags = ref<Tag[] | undefined>()
const crew = ref<Character[] | undefined>()
const users = ref<{ id: number, short: string }[] | undefined>()
const mapTiles = ref<Maptile[] | undefined>()
let init = false

async function fetchApiData<T>(url: string) {
  const response = await fetch(url)
  const jsonData = await response.json() as { docs: T }
  return jsonData.docs
}

function dbEntriesForCoords(row: number, column: number, db: Database[]) {
  if (!db)
    return []
  return db.filter(db => db.coordinates?.row === row && db.coordinates?.column === column)
}

function logEntriesForCoords(row: number, column: number, logs: Log[]) {
  if (!logs)
    return []
  return logs.filter(db => db.coordinates?.row === row && db.coordinates?.column === column)
}

function shortForUser(user: number | User | undefined | null) {
  if (user === undefined || user === null)
    return '_'

  if (typeof user === 'number') {
    return users.value?.find(u => u.id === user)?.short
  }

  if (user && user.short)
    return user.short
  return '_'
}

export async function useData() {
  if (!init) {
    logEntries.value = await fetchApiData<Log[]>(`${apiUrl()}/logs?limit=999`)
    dbEntries.value = await fetchApiData<Database[]>(`${apiUrl()}/database?limit=999`)
    tags.value = await fetchApiData<Tag[]>(`${apiUrl()}/tags?limit=999`)
    crew.value = await fetchApiData<Character[]>(`${apiUrl()}/characters?limit=999`)
    users.value = await fetchApiData<{ id: number, short: string }[]>(`${apiUrl()}/users/shorts`)
    mapTiles.value = await fetchApiData<Maptile[]>(`${apiUrl()}/maptiles?limit=999`)
    init = true
  }
  return { logEntries, dbEntries, tags, crew, mapTiles, dbEntriesForCoords, logEntriesForCoords, shortForUser }
}
