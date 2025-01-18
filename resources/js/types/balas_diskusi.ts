import { DiskusiType } from "./diskusi";

export interface BalasDiskusiType {
    id: number;
    body?: string;
    created_at: Date;
    updated_at: Date;
    user: User;
    diskusi: DiskusiType;
    user_id?: number;
    diskusi_id?: number;
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
