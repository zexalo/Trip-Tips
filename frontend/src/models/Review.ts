export type Review = {
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
