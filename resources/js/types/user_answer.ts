export interface UserAnswerType {
    id: number;
    quiz_id: number;
    quiz_answer_id: number;
    user_id: number;
    point: number;
    created_at: Date;
    updated_at: Date;
    quiz: Quiz;
    quiz_answer: QuizAnswer;
    user: User;
}

export interface Quiz {
    id: number;
    kelas_id: number;
    question: string;
    created_at: Date;
    updated_at: Date;
    kelas: Kelas;
}

export interface Kelas {
    id: number;
    level_id: number;
    type_id: number;
    category_id: number;
    user_id: number;
    title: string;
    slug: string;
    price: number;
    discount: number;
    description: string;
    body: string;
    benefit: string[];
    link_overview: LinkOverview;
    image: string;
    status: string;
    views: number;
    created_at: Date;
    updated_at: Date;
    level: Category;
    type: Category;
    category: Category;
    user: User;
}

export interface Category {
    id: number;
    name: string;
    slug?: string;
    image?: string;
    created_at: Date;
    updated_at: Date;
}

export interface LinkOverview {
    url: string;
    embed_url: string;
    width: string;
    height: string;
    responsive: boolean;
    options: Options;
}

export interface Options {
    controls: string;
    nocookie: string;
    start: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    tempat_lahir: string;
    tanggal_lahir: Date | null;
    umur: number;
    phone: string;
    alamat: string;
    jk: string;
    role: string;
    bio: null | string;
    status: number;
    image: null | string;
    created_at: Date;
    updated_at: Date;
}

export interface QuizAnswer {
    id: number;
    quiz_id: number;
    answer: string;
    point: number;
    created_at: Date;
    updated_at: Date;
    quiz: Quiz;
}
