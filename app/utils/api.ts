export function apiUrl() {
  const conf = useRuntimeConfig()
  return conf.public.apiUrl
}
