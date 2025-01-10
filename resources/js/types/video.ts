export interface VideoType {
    id: number;
    section_id: number;
    title: string;
    url: Url;
    duration: string;
    created_at: string;
    updated_at: string;
    section: Section;
}

export interface Url {
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

export interface Section {
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
    link_overview: LinkOverview;
    description: string;
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

export interface LinkOverview {
    url: string;
    embed_url: string;
    width: string;
    height: string;
    responsive: boolean;
    options: Options2;
}

export interface Options2 {
    controls: string;
    nocookie: string;
    start: string;
}

export interface Level {
    id: number;
    name: string;
    slug: string;
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
    image: string;
    created_at: string;
    updated_at: string;
}
