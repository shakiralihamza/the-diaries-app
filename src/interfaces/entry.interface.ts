export interface Entry {
    id: string
    title: string
    description: string
    createdAt: string
    updatedAt?: string
    diaryId: string
    isPinned: boolean
}
