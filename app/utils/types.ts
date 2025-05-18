export interface BlackMoonLog {
  id: number
  created: Date
  title: string
  content: any
  content_html: string
  author: number
}

export interface BlackMoonDbEntry {
  id: number
  created: Date
  title: string
  content: any
  content_html: string
  author: number
  links: { to: string, name?: string }[]
}
