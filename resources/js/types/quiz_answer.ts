export interface QuizAnswer {
    id: number;
    quiz_id: number;
    answer: string;
    point: number;
    created_at: Date;
    updated_at: Date;
}
