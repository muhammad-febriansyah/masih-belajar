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
import { Link } from "@inertiajs/react";
import { CheckCircleIcon } from "lucide-react";
import React, { useState } from "react";

interface Props {
    auth: UserType;
    kelas: Datum[];
}
export default function KelasSaya({ auth, kelas }: Props) {
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
                <div className="flex flex-col items-start justify-between gap-5 lg:flex-row">
                    <SideBar />
                    <div className="w-full lg:w-[75%]">
                        <Input
                            type="text"
                            placeholder="Cari Kelas"
                            value={search}
                            className="max-w-md mb-10 rounded-2xl"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        {filteredKelas.length > 0 ? (
                            <div className="grid min-h-full grid-cols-1 gap-3 lg:grid-cols-3">
                                {filteredKelas.map((kel) => (
                                    <div
                                        key={kel.id}
                                        className="flex flex-col overflow-hidden bg-white rounded-2xl"
                                    >
                                        <Link
                                            href={route(
                                                "dashboard.belajar",
                                                kel.slug
                                            )}
                                            className="relative"
                                        >
                                            <span className="absolute px-5 z-[9] py-2 font-medium tracking-widest text-white uppercase -right-px -top-px rounded-tr-2xl bg-maroon">
                                                {kel.category.name}
                                            </span>

                                            <img
                                                alt=""
                                                src={`/storage/${kel.image}`}
                                                className="object-cover w-full transition-all duration-300 h-60 rounded-t-2xl hover:scale-110"
                                            />

                                            <div className="p-4 space-y-3 sm:p-6">
                                                <h3 className="mb-5 text-xl font-bold text-black line-clamp-2">
                                                    {kel.title}
                                                </h3>
                                                <div className="flex items-center">
                                                    {kel.user.image ? (
                                                        <img
                                                            src={`/storage/${kel.user.image}`}
                                                            alt=""
                                                            className="w-12 h-12 rounded-full"
                                                        />
                                                    ) : (
                                                        <img
                                                            src="/default-avatar.svg"
                                                            alt=""
                                                            className="w-12 h-12 rounded-full"
                                                        />
                                                    )}
                                                    <div className="flex flex-col ml-3">
                                                        <span className="text-base font-medium">
                                                            {kel.user.name}
                                                        </span>
                                                        <span className="text-sm text-gray-400">
                                                            {kel.user.role}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between pt-3">
                                                    <div className="flex items-center">
                                                        {Array.from(
                                                            {
                                                                length: 5,
                                                            },
                                                            (_, index) => (
                                                                <svg
                                                                    key={index}
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 576 512"
                                                                    fill="currentColor"
                                                                    className={`w-5 h-5 ${
                                                                        Number(
                                                                            kel.average_rating
                                                                        ) >
                                                                        index
                                                                            ? "text-yellow-400"
                                                                            : "text-gray-300"
                                                                    }`}
                                                                >
                                                                    <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
                                                                </svg>
                                                            )
                                                        )}
                                                        <span className="ml-2 font-semibold text-black">
                                                            (
                                                            {Number(
                                                                kel.average_rating
                                                            )}
                                                            )
                                                        </span>
                                                    </div>

                                                    <div>
                                                        <TooltipProvider>
                                                            <Tooltip>
                                                                <TooltipTrigger>
                                                                    <img
                                                                        src={`/storage/${kel.level.image}`}
                                                                        alt=""
                                                                        className="object-cover w-8 h-8 rounded-full"
                                                                    />
                                                                </TooltipTrigger>
                                                                <TooltipContent>
                                                                    <p>
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
                                                </div>
                                                <div className="flex items-center gap-2 ">
                                                    {kel.total_transaksi >
                                                        0 && (
                                                        <Badge className="transition-all duration-300 bg-maroon hover:scale-110">
                                                            {kel.total_transaksi >
                                                            0
                                                                ? "Terlaris"
                                                                : ""}
                                                        </Badge>
                                                    )}
                                                    {kel.type.name ===
                                                    "Premium" ? (
                                                        <Badge className="transition-all duration-300 bg-blue-600 hover:scale-110">
                                                            {kel.type.name}
                                                        </Badge>
                                                    ) : (
                                                        <Badge className="transition-all duration-300 bg-orange-600 hover:scale-110">
                                                            {kel.type.name}
                                                        </Badge>
                                                    )}
                                                </div>
                                            </div>
                                        </Link>
                                        {/* Rating di bawah */}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center w-full col-span-2 p-5 bg-white gap-y-10 h-min rounded-2xl">
                                <img
                                    src="/nodata.svg"
                                    className="object-cover"
                                    alt=""
                                />
                                <span className="text-base font-bold text-black transition-all duration-200 md:text-xl hover:text-biru">
                                    Kelas Tidak Ditemukan
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
