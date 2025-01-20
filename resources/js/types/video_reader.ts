export interface VideoUrl {
    url: string;
    embed_url: string;
    width: string;
    height: string;
    responsive: boolean;
    options: {
        controls: string;
        nocookie: string;
        start: string;
    };
}

export interface VideoSection {
    id: number;
    kelas_id: number;
    title: string;
    total_video: number;
    total_duration: string;
    created_at: string;
    updated_at: string;
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
    link_overview: VideoUrl;
    image: string;
    status: string;
    views: number;
    created_at: string;
    updated_at: string;
    level: Level;
    type: Type;
    category: Category;
    user: User;
}

export interface Level {
    id: number;
    name: string;
    image: string;
    created_at: string;
    updated_at: string;
}

export interface Type {
    id: number;
    name: string;
    slug: string;
    created_at: string;
    updated_at: string;
}

export interface Category {
    id: number;
    name: string;
    slug: string;
    image: string;
    created_at: string;
    updated_at: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    tempat_lahir: string;
    tanggal_lahir: string;
    umur: number;
    phone: string;
    alamat: string;
    jk: string;
    role: string;
    bio: string;
    status: number;
    image: string | null;
    created_at: string;
    updated_at: string;
}

export interface Video {
    id: number;
    section_id: number;
    title: string;
    url: VideoUrl;
    duration: string;
    status: number;
    created_at: string;
    updated_at: string;
    section: VideoSection;
}

export interface VideoReaderType {
    id: number;
    user_id: number;
    video_id: number;
    status: number;
    created_at: string;
    updated_at: string;
    section_id: number;
    video: Video;
    section: VideoSection;
}
