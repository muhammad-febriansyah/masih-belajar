export interface KelasType {
    current_page: number;
    data: Datum[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Link[];
    next_page_url: null;
    path: string;
    per_page: number;
    prev_page_url: null;
    to: number;
    total: number;
}

export interface Datum {
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
    body: null;
    benefit: string[];
    link_overview: LinkOverview;
    image: string;
    status: string;
    views: number;
    created_at: Date;
    updated_at: Date;
    average_rating: null | string;
    level: Level;
    type: Category;
    category: Category;
    user: User;
}

export interface Category {
    id: number;
    name: string;
    slug: string;
    image?: string;
    created_at: Date;
    updated_at: Date;
}

export interface Level {
    id: number;
    name: string;
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
    tanggal_lahir: Date;
    umur: number;
    phone: string;
    alamat: string;
    jk: string;
    role: string;
    bio: string;
    status: number;
    image: null;
    created_at: Date;
    updated_at: Date;
}

export interface Link {
    url: string;
    label: string;
    active: boolean;
}
