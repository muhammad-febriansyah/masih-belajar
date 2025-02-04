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
    const [activeTab, setActiveTab] = useState("all"); // Tab default adalah "Semua"

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
                                            className="overflow-hidden bg-white rounded-2xl flex flex-col min-h-[100px]"
                                        >
                                            <Link
                                                href={route(
                                                    "dashboard.detailkelas",
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
                                                    {kel.type.name ===
                                                    "Premium" ? (
                                                        <div className="flex flex-row items-center pt-5 space-x-2">
                                                            {kel.discount >
                                                                0 && (
                                                                <span className="relative text-base font-medium text-red-600">
                                                                    Rp.{" "}
                                                                    {Number(
                                                                        kel.price
                                                                    ).toLocaleString(
                                                                        "id-ID"
                                                                    )}
                                                                    <span className="absolute left-0 right-0 font-semibold border-b-2 border-red-700 bottom-2.5"></span>
                                                                </span>
                                                            )}
                                                            <span className="text-base font-medium text-black">
                                                                Rp.{" "}
                                                                {Number(
                                                                    kel.price -
                                                                        kel.discount
                                                                ).toLocaleString(
                                                                    "id-ID"
                                                                )}
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <div className="flex flex-row items-center pt-5 space-x-2">
                                                            <span className="text-base font-medium text-black">
                                                                Rp. 0
                                                            </span>
                                                        </div>
                                                    )}
                                                    <div className="flex items-center justify-between pt-3">
                                                        <div className="flex items-center">
                                                            {Array.from(
                                                                {
                                                                    length: 5,
                                                                },
                                                                (_, index) => (
                                                                    <svg
                                                                        key={
                                                                            index
                                                                        }
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
                                                        {kel.total_bergabung >
                                                        0 ? (
                                                            <Badge className="transition-all duration-300 bg-green-600 hover:scale-110">
                                                                <CheckCircleIcon className="w-4 h-4 mr-1" />{" "}
                                                                Bergabung
                                                            </Badge>
                                                        ) : (
                                                            <>
                                                                {kel.total_transaksi >
                                                                    0 && (
                                                                    <Badge className="transition-all duration-300 bg-maroon hover:scale-110">
                                                                        {kel.total_transaksi >
                                                                        0
                                                                            ? "Terlaris"
                                                                            : ""}
                                                                    </Badge>
                                                                )}
                                                                {kel.type
                                                                    .name ===
                                                                "Premium" ? (
                                                                    <Badge className="transition-all duration-300 bg-blue-600 hover:scale-110">
                                                                        {
                                                                            kel
                                                                                .type
                                                                                .name
                                                                        }
                                                                    </Badge>
                                                                ) : (
                                                                    <Badge className="transition-all duration-300 bg-orange-600 hover:scale-110">
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
                        </TabsContent>

                        {/* Konten Tab: Untuk tab lainnya berdasarkan tipe */}
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
                                                className="overflow-hidden bg-white rounded-2xl flex flex-col min-h-[100px]"
                                            >
                                                <Link
                                                    href={route(
                                                        "dashboard.detailkelas",
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
                                                                    {
                                                                        kel.user
                                                                            .name
                                                                    }
                                                                </span>
                                                                <span className="text-sm text-gray-400">
                                                                    {
                                                                        kel.user
                                                                            .role
                                                                    }
                                                                </span>
                                                            </div>
                                                        </div>
                                                        {kel.type.name ===
                                                        "Premium" ? (
                                                            <div className="flex flex-row items-center pt-5 space-x-2">
                                                                {kel.discount >
                                                                    0 && (
                                                                    <span className="relative text-base font-medium text-red-600">
                                                                        Rp.{" "}
                                                                        {Number(
                                                                            kel.price
                                                                        ).toLocaleString(
                                                                            "id-ID"
                                                                        )}
                                                                        <span className="absolute left-0 right-0 font-semibold border-b-2 border-red-700 bottom-2.5"></span>
                                                                    </span>
                                                                )}
                                                                <span className="text-base font-medium text-black">
                                                                    Rp.{" "}
                                                                    {Number(
                                                                        kel.price -
                                                                            kel.discount
                                                                    ).toLocaleString(
                                                                        "id-ID"
                                                                    )}
                                                                </span>
                                                            </div>
                                                        ) : (
                                                            <div className="flex flex-row items-center pt-5 space-x-2">
                                                                <span className="text-base font-medium text-black">
                                                                    Rp. 0
                                                                </span>
                                                            </div>
                                                        )}
                                                        <div className="flex items-center justify-between pt-3">
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
                                                        <div className="flex items-center gap-2">
                                                            {kel.total_bergabung >
                                                            0 ? (
                                                                <Badge className="transition-all duration-300 bg-green-600 hover:scale-110">
                                                                    <CheckCircleIcon className="w-4 h-4 mr-1" />{" "}
                                                                    Bergabung
                                                                </Badge>
                                                            ) : (
                                                                <>
                                                                    {kel.total_transaksi >
                                                                        0 && (
                                                                        <Badge className="transition-all duration-300 bg-maroon hover:scale-110">
                                                                            {kel.total_transaksi >
                                                                            0
                                                                                ? "Terlaris"
                                                                                : ""}
                                                                        </Badge>
                                                                    )}
                                                                    {kel.type
                                                                        .name ===
                                                                    "Premium" ? (
                                                                        <Badge className="transition-all duration-300 bg-blue-600 hover:scale-110">
                                                                            {
                                                                                kel
                                                                                    .type
                                                                                    .name
                                                                            }
                                                                        </Badge>
                                                                    ) : (
                                                                        <Badge className="transition-all duration-300 bg-orange-600 hover:scale-110">
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
                            </TabsContent>
                        ))}
                    </Tabs>
                </div>
            </section>
        </MainLayout>
    );
}
