export interface feedbackType {
    id: string
    shared_recording_id: string
    given_by_user_id: string
    comment: string
    rating: number | undefined
    created_at: Date
}