import SideBar from "@/components/main/SideBar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import MainLayout from "@/Layouts/MainLayout";
import { Datum } from "@/types/kelas";
import { UserType } from "@/types/user";
import { VideoType } from "@/types/video";
import { VideoReaderType } from "@/types/video_reader";
import { Link } from "@inertiajs/react";
import {
    CheckCircleIcon,
    SearchIcon,
    StarIcon,
    TrendingUpIcon,
} from "lucide-react";
import React, { useState } from "react";

interface Props {
    auth: UserType;
    kelas: Datum[];
    progress: number;
    videoread: VideoType[];
}

export default function KelasSaya({ auth, kelas, progress, videoread }: Props) {
    const [search, setSearch] = useState<string>("");
    const filteredKelas = kelas.filter((kel) => {
        const matchesSearch = kel.title
            .toLowerCase()
            .includes(search.toLowerCase());
        return matchesSearch;
    });

    return (
        <MainLayout>
            <section className="container py-10 mt-16 lg:mt-22">
                <div className="flex flex-col items-start justify-start gap-8 lg:flex-row">
                    <SideBar />
                    <div className="w-full lg:w-[75%]">
                        <div className="mb-8">
                            <h1 className="mb-2 text-3xl font-bold text-gray-900">
                                Kelas Saya
                            </h1>
                            <p className="text-gray-600">
                                Lanjutkan pembelajaran dan capai tujuan Anda
                            </p>
                        </div>

                        <div className="relative mb-8">
                            <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <Input
                                type="text"
                                placeholder="Cari kelas yang sedang dipelajari..."
                                value={search}
                                className="pl-12 pr-4 py-3 max-w-md rounded-xl border-gray-200 focus:border-maroon focus:ring-maroon shadow-sm"
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        {filteredKelas.length > 0 ? (
                            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
                                {filteredKelas.map((kel) => (
                                    <div
                                        key={kel.id}
                                        className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden"
                                    >
                                        <Link
                                            href={route(
                                                "dashboard.belajar",
                                                kel.slug
                                            )}
                                            className="block"
                                        >
                                            <div className="relative overflow-hidden">
                                                <div className="absolute top-3 right-3 z-10">
                                                    <Badge className="bg-maroon/90 backdrop-blur-sm text-white text-xs font-medium px-3 py-1">
                                                        {kel.category.name}
                                                    </Badge>
                                                </div>

                                                <img
                                                    alt={kel.title}
                                                    src={`/storage/${kel.image}`}
                                                    className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-105"
                                                />

                                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            </div>

                                            <div className="p-5">
                                                <h3 className="mb-3 text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-maroon transition-colors duration-200">
                                                    {kel.title}
                                                </h3>

                                                <div className="flex items-center mb-4">
                                                    {kel.user.image ? (
                                                        <img
                                                            src={`/storage/${kel.user.image}`}
                                                            alt={kel.user.name}
                                                            className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100"
                                                        />
                                                    ) : (
                                                        <img
                                                            src="/default-avatar.svg"
                                                            alt={kel.user.name}
                                                            className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100"
                                                        />
                                                    )}
                                                    <div className="ml-3">
                                                        <p className="text-sm font-medium text-gray-900">
                                                            {kel.user.name}
                                                        </p>
                                                        <p className="text-xs text-gray-500 capitalize">
                                                            {kel.user.role}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="mb-4">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="text-sm font-medium text-gray-700">
                                                            Progress
                                                        </span>
                                                        <span className="text-sm font-semibold text-maroon">
                                                            {kel.progress}%
                                                        </span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                                                        <div
                                                            className="bg-gradient-to-r from-maroon to-red-600 h-2.5 rounded-full transition-all duration-500 ease-out"
                                                            style={{
                                                                width: `${kel.progress}%`,
                                                            }}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between mb-4">
                                                    <div className="flex items-center space-x-1">
                                                        {Array.from(
                                                            { length: 5 },
                                                            (_, index) => (
                                                                <StarIcon
                                                                    key={index}
                                                                    className={`w-4 h-4 ${
                                                                        Number(
                                                                            kel.average_rating
                                                                        ) >
                                                                        index
                                                                            ? "text-yellow-400 fill-current"
                                                                            : "text-gray-300"
                                                                    }`}
                                                                />
                                                            )
                                                        )}
                                                        <span className="ml-2 text-sm font-medium text-gray-700">
                                                            (
                                                            {Number(
                                                                kel.average_rating
                                                            ).toFixed(1)}
                                                            )
                                                        </span>
                                                    </div>

                                                    <TooltipProvider>
                                                        <Tooltip>
                                                            <TooltipTrigger>
                                                                <img
                                                                    src={`/storage/${kel.level.image}`}
                                                                    alt={
                                                                        kel
                                                                            .level
                                                                            .name
                                                                    }
                                                                    className="w-7 h-7 rounded-full object-cover ring-2 ring-gray-100"
                                                                />
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                <p className="text-xs">
                                                                    {
                                                                        kel
                                                                            .level
                                                                            .name
                                                                    }
                                                                </p>
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>
                                                </div>

                                                <div className="flex items-center gap-2 flex-wrap">
                                                    {kel.total_transaksi >
                                                        0 && (
                                                        <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-2 py-1 hover:scale-105 transition-transform duration-200">
                                                            <TrendingUpIcon className="w-3 h-3 mr-1" />
                                                            Terlaris
                                                        </Badge>
                                                    )}
                                                    <Badge
                                                        className={`text-xs px-2 py-1 hover:scale-105 transition-transform duration-200 ${
                                                            kel.type.name ===
                                                            "Premium"
                                                                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                                                                : "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                                                        }`}
                                                    >
                                                        {kel.type.name}
                                                    </Badge>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center w-full p-12 bg-white rounded-2xl shadow-sm border border-gray-100">
                                <div className="mb-6">
                                    <img
                                        src="/nodata.svg"
                                        className="w-32 h-32 object-cover opacity-60"
                                        alt="No data"
                                    />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    Kelas Tidak Ditemukan
                                </h3>
                                <p className="text-gray-500 text-center max-w-md">
                                    Tidak ada kelas yang sesuai dengan pencarian
                                    "{search}". Coba kata kunci lain atau hapus
                                    filter pencarian.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
