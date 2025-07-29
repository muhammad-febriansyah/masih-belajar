import HomeLayout from "@/Layouts/HomeLayout";
import Checkbox from "@/components/Checkbox";
import { Badge } from "@/components/ui/badge";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { CategoryTypes } from "@/types/category";
import { KelasType } from "@/types/kelas";
import { LevelType } from "@/types/level";
import { TipeKelasTypes } from "@/types/typecplass";
import { Link } from "@inertiajs/react";
import { AlertTriangle, CheckCircle, CheckCircleIcon } from "lucide-react";
import { useState } from "react";
import { route } from "ziggy-js";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { SettingType } from "@/types/setting";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MainLayout from "@/Layouts/MainLayout";

interface Props {
    kelas: KelasType;
    category: CategoryTypes[];
    tipekelas: TipeKelasTypes[];
    level: LevelType[];
    setting: SettingType;
}
export default function Index({
    kelas,
    category,
    tipekelas,
    level,
    setting,
}: Props) {
    const [search, setSearch] = useState<string>("");
    const [activeTab, setActiveTab] = useState("all");

    const filteredKelas = kelas.data.filter((kel) => {
        const matchesSearch = kel.title
            .toLowerCase()
            .includes(search.toLowerCase());
        if (activeTab === "all") {
            return matchesSearch;
        }
        const matchesTab = kel.type.id.toString() === activeTab.split("-")[1];
        return matchesSearch && matchesTab;
    });

    return (
        <MainLayout>
            <section className="flex items-center justify-center mb-20 h-72 lg:h-80 bg-maroon mt-14">
                <div className="relative px-6 py-5 text-center space-y-7">
                    <h1 className="text-2xl font-bold text-white lg:text-5xl">
                        Mau Belajar apa nih?
                    </h1>
                    <p className="text-sm text-gray-200">
                        Ayo tingkatkan skillmu bersama {setting.site_name}.
                    </p>
                    <Input
                        type="text"
                        placeholder="Cari Kelas"
                        className="absolute transform -translate-x-1/2  p-7 rounded-2xl  -bottom-[7.5rem] left-1/2"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </section>

            <section className="container py-5">
                <div className="w-full px-4">
                    <Tabs
                        defaultValue="account"
                        className="justify-center w-full mx-auto"
                        value={activeTab}
                        onValueChange={setActiveTab}
                    >
                        <TabsList className="flex justify-center w-full pb-20 space-x-2">
                            <TabsTrigger
                                value="all"
                                className="flex items-center gap-1"
                                key="all"
                            >
                                <img src="/k31.svg" className="size-7" alt="" />{" "}
                                <span>Semua</span>
                            </TabsTrigger>

                            {tipekelas.map((tipe) => (
                                <TabsTrigger
                                    value={`type-${tipe.id}`}
                                    key={tipe.id}
                                >
                                    {tipe.name === "Premium" ? (
                                        <>
                                            <img
                                                src="/k32.svg"
                                                className="size-7"
                                                alt=""
                                            />{" "}
                                            <span>{tipe.name}</span>
                                        </>
                                    ) : (
                                        <>
                                            <img
                                                src="/k33.svg"
                                                className="size-7"
                                                alt=""
                                            />{" "}
                                            <span>{tipe.name}</span>
                                        </>
                                    )}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                        <TabsContent value="all">
                            {filteredKelas.length > 0 ? (
                                <div className="grid min-h-full grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                                    {filteredKelas.map((kel) => (
                                        <div
                                            key={kel.id}
                                            className="group overflow-hidden bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col min-h-[100px] border border-gray-100"
                                        >
                                            <Link
                                                href={route(
                                                    "dashboard.detailkelas",
                                                    kel.slug
                                                )}
                                                className="relative block"
                                            >
                                                <span className="absolute px-4 z-[9] py-2 font-semibold text-xs tracking-wider text-white uppercase -right-px -top-px rounded-tr-3xl rounded-bl-2xl bg-gradient-to-r from-maroon to-red-600 shadow-lg">
                                                    {kel.category.name}
                                                </span>

                                                <div className="relative overflow-hidden rounded-t-3xl">
                                                    <img
                                                        alt=""
                                                        src={`/storage/${kel.image}`}
                                                        className="object-cover w-full transition-all duration-500 h-48 group-hover:scale-105"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                </div>

                                                <div className="p-5 space-y-4">
                                                    <h3 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-maroon transition-colors duration-300">
                                                        {kel.title}
                                                    </h3>

                                                    <div className="flex items-center space-x-3">
                                                        <div className="relative">
                                                            {kel.user.image ? (
                                                                <img
                                                                    src={`/storage/${kel.user.image}`}
                                                                    alt=""
                                                                    className="w-10 h-10 rounded-full border-2 border-gray-100"
                                                                />
                                                            ) : (
                                                                <img
                                                                    src="/default-avatar.svg"
                                                                    alt=""
                                                                    className="w-10 h-10 rounded-full border-2 border-gray-100"
                                                                />
                                                            )}
                                                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="text-sm font-semibold text-gray-800">
                                                                {kel.user.name}
                                                            </span>
                                                            <span className="text-xs text-gray-500">
                                                                {kel.user.role}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {kel.type.name ===
                                                        "Premium" && (
                                                        <div className="flex items-center space-x-2 py-2">
                                                            {kel.discount >
                                                                0 && (
                                                                <span className="text-sm font-medium text-gray-400 line-through">
                                                                    Rp.{" "}
                                                                    {Number(
                                                                        kel.price
                                                                    ).toLocaleString(
                                                                        "id-ID"
                                                                    )}
                                                                </span>
                                                            )}
                                                            <span className="text-xl font-bold text-maroon">
                                                                Rp.{" "}
                                                                {Number(
                                                                    kel.price -
                                                                        kel.discount
                                                                ).toLocaleString(
                                                                    "id-ID"
                                                                )}
                                                            </span>
                                                            {kel.discount >
                                                                0 && (
                                                                <span className="px-2 py-1 text-xs font-semibold text-white bg-red-500 rounded-full">
                                                                    -
                                                                    {Math.round(
                                                                        (kel.discount /
                                                                            kel.price) *
                                                                            100
                                                                    )}
                                                                    %
                                                                </span>
                                                            )}
                                                        </div>
                                                    )}

                                                    <div className="flex items-center justify-between py-2">
                                                        <div className="flex items-center space-x-1">
                                                            <div className="flex items-center">
                                                                {Array.from(
                                                                    {
                                                                        length: 5,
                                                                    },
                                                                    (
                                                                        _,
                                                                        index
                                                                    ) => (
                                                                        <svg
                                                                            key={
                                                                                index
                                                                            }
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            viewBox="0 0 20 20"
                                                                            fill="currentColor"
                                                                            className={`w-4 h-4 ${
                                                                                Number(
                                                                                    kel.average_rating
                                                                                ) >
                                                                                index
                                                                                    ? "text-yellow-400"
                                                                                    : "text-gray-200"
                                                                            }`}
                                                                        >
                                                                            <path
                                                                                fillRule="evenodd"
                                                                                d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                                                                clipRule="evenodd"
                                                                            />
                                                                        </svg>
                                                                    )
                                                                )}
                                                            </div>
                                                            <span className="text-sm font-medium text-gray-700">
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
                                                                    <div className="relative">
                                                                        <img
                                                                            src={`/storage/${kel.level.image}`}
                                                                            alt=""
                                                                            className="object-cover w-8 h-8 rounded-full border-2 border-white shadow-sm"
                                                                        />
                                                                    </div>
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

                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        {kel.total_bergabung >
                                                        0 ? (
                                                            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-emerald-200">
                                                                <CheckCircleIcon className="w-3 h-3 mr-1" />
                                                                Bergabung
                                                            </Badge>
                                                        ) : (
                                                            <>
                                                                {kel.total_transaksi >
                                                                    0 && (
                                                                    <Badge className="bg-rose-100 text-rose-700 hover:bg-rose-200 border-rose-200">
                                                                        🔥
                                                                        Terlaris
                                                                    </Badge>
                                                                )}
                                                                {kel.type
                                                                    .name ===
                                                                "Premium" ? (
                                                                    <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200">
                                                                        ⭐{" "}
                                                                        {
                                                                            kel
                                                                                .type
                                                                                .name
                                                                        }
                                                                    </Badge>
                                                                ) : (
                                                                    <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200 border-orange-200">
                                                                        🆓{" "}
                                                                        {
                                                                            kel
                                                                                .type
                                                                                .name
                                                                        }
                                                                    </Badge>
                                                                )}
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </Link>
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
                        </TabsContent>

                        {tipekelas.map((tipe) => (
                            <TabsContent
                                value={`type-${tipe.id}`}
                                key={tipe.id}
                            >
                                {filteredKelas.length > 0 ? (
                                    <div className="grid min-h-full grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                                        {filteredKelas.map((kel) => (
                                            <div
                                                key={kel.id}
                                                className="group overflow-hidden bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col min-h-[100px] border border-gray-100"
                                            >
                                                <Link
                                                    href={route(
                                                        "dashboard.detailkelas",
                                                        kel.slug
                                                    )}
                                                    className="relative block"
                                                >
                                                    <span className="absolute px-4 z-[9] py-2 font-semibold text-xs tracking-wider text-white uppercase -right-px -top-px rounded-tr-3xl rounded-bl-2xl bg-gradient-to-r from-maroon to-red-600 shadow-lg">
                                                        {kel.category.name}
                                                    </span>

                                                    <div className="relative overflow-hidden rounded-t-3xl">
                                                        <img
                                                            alt=""
                                                            src={`/storage/${kel.image}`}
                                                            className="object-cover w-full transition-all duration-500 h-48 group-hover:scale-105"
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                    </div>

                                                    <div className="p-5 space-y-4">
                                                        <h3 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-maroon transition-colors duration-300">
                                                            {kel.title}
                                                        </h3>

                                                        <div className="flex items-center space-x-3">
                                                            <div className="relative">
                                                                {kel.user
                                                                    .image ? (
                                                                    <img
                                                                        src={`/storage/${kel.user.image}`}
                                                                        alt=""
                                                                        className="w-10 h-10 rounded-full border-2 border-gray-100"
                                                                    />
                                                                ) : (
                                                                    <img
                                                                        src="/default-avatar.svg"
                                                                        alt=""
                                                                        className="w-10 h-10 rounded-full border-2 border-gray-100"
                                                                    />
                                                                )}
                                                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <span className="text-sm font-semibold text-gray-800">
                                                                    {
                                                                        kel.user
                                                                            .name
                                                                    }
                                                                </span>
                                                                <span className="text-xs text-gray-500">
                                                                    {
                                                                        kel.user
                                                                            .role
                                                                    }
                                                                </span>
                                                            </div>
                                                        </div>

                                                        {kel.type.name ===
                                                            "Premium" && (
                                                            <div className="flex items-center space-x-2 py-2">
                                                                {kel.discount >
                                                                    0 && (
                                                                    <span className="text-sm font-medium text-gray-400 line-through">
                                                                        Rp.{" "}
                                                                        {Number(
                                                                            kel.price
                                                                        ).toLocaleString(
                                                                            "id-ID"
                                                                        )}
                                                                    </span>
                                                                )}
                                                                <span className="text-xl font-bold text-maroon">
                                                                    Rp.{" "}
                                                                    {Number(
                                                                        kel.price -
                                                                            kel.discount
                                                                    ).toLocaleString(
                                                                        "id-ID"
                                                                    )}
                                                                </span>
                                                                {kel.discount >
                                                                    0 && (
                                                                    <span className="px-2 py-1 text-xs font-semibold text-white bg-red-500 rounded-full">
                                                                        -
                                                                        {Math.round(
                                                                            (kel.discount /
                                                                                kel.price) *
                                                                                100
                                                                        )}
                                                                        %
                                                                    </span>
                                                                )}
                                                            </div>
                                                        )}

                                                        <div className="flex items-center justify-between py-2">
                                                            <div className="flex items-center space-x-1">
                                                                <div className="flex items-center">
                                                                    {Array.from(
                                                                        {
                                                                            length: 5,
                                                                        },
                                                                        (
                                                                            _,
                                                                            index
                                                                        ) => (
                                                                            <svg
                                                                                key={
                                                                                    index
                                                                                }
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                viewBox="0 0 20 20"
                                                                                fill="currentColor"
                                                                                className={`w-4 h-4 ${
                                                                                    Number(
                                                                                        kel.average_rating
                                                                                    ) >
                                                                                    index
                                                                                        ? "text-yellow-400"
                                                                                        : "text-gray-200"
                                                                                }`}
                                                                            >
                                                                                <path
                                                                                    fillRule="evenodd"
                                                                                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                                                                    clipRule="evenodd"
                                                                                />
                                                                            </svg>
                                                                        )
                                                                    )}
                                                                </div>
                                                                <span className="text-sm font-medium text-gray-700">
                                                                    (
                                                                    {Number(
                                                                        kel.average_rating
                                                                    ).toFixed(
                                                                        1
                                                                    )}
                                                                    )
                                                                </span>
                                                            </div>

                                                            <TooltipProvider>
                                                                <Tooltip>
                                                                    <TooltipTrigger>
                                                                        <div className="relative">
                                                                            <img
                                                                                src={`/storage/${kel.level.image}`}
                                                                                alt=""
                                                                                className="object-cover w-8 h-8 rounded-full border-2 border-white shadow-sm"
                                                                            />
                                                                        </div>
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

                                                        <div className="flex items-center gap-2 flex-wrap">
                                                            {kel.total_bergabung >
                                                            0 ? (
                                                                <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-emerald-200">
                                                                    <CheckCircleIcon className="w-3 h-3 mr-1" />
                                                                    Bergabung
                                                                </Badge>
                                                            ) : (
                                                                <>
                                                                    {kel.total_transaksi >
                                                                        0 && (
                                                                        <Badge className="bg-rose-100 text-rose-700 hover:bg-rose-200 border-rose-200">
                                                                            🔥
                                                                            Terlaris
                                                                        </Badge>
                                                                    )}
                                                                    {kel.type
                                                                        .name ===
                                                                    "Premium" ? (
                                                                        <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200">
                                                                            ⭐{" "}
                                                                            {
                                                                                kel
                                                                                    .type
                                                                                    .name
                                                                            }
                                                                        </Badge>
                                                                    ) : (
                                                                        <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200 border-orange-200">
                                                                            🆓{" "}
                                                                            {
                                                                                kel
                                                                                    .type
                                                                                    .name
                                                                            }
                                                                        </Badge>
                                                                    )}
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                </Link>
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
                            </TabsContent>
                        ))}
                    </Tabs>
                </div>
            </section>
        </MainLayout>
    );
}
