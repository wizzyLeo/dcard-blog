export type BlogListItemType = {
    id: number
    title: string
    editTime: string
    hero: string | "default-hero.jpg"
    content: string
    description?: string
    owner: string
}

export type BlogType = {
    id: string
    title: string
    editTime: string
    hero: string | "default-hero.jpg"
    content: string
    labels: string[]
}

export type CommentType = {
    id: string
    title?: string
    editTime: string
    content: string
}

export type UserType = {
    id: string
    name: string
}

