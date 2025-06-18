export interface BlackMoonLog {
  docs: {
    id: number
    created: Date
    title: string
    content: any
    content_html: string
    author: number
  }
}

export interface BlackMoonDbEntry {
  docs: {
    id: number
    created: Date
    title: string
    content: any
    content_html: string
    author: number
    links: { to: string, name?: string }[]
  }

}
