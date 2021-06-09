export type Review = {
    id: number,
    content: string,
    rating?: number,
    recomandation: {
        id: number
    },
    user: {
        id: number,
        login: string
    },
    createdAt: string
}
