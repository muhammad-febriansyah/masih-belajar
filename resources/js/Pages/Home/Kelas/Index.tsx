import HomeLayout from "@/Layouts/HomeLayout";
import Checkbox from "@/components/Checkbox";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CategoryTypes } from "@/types/category";
import { KelasType } from "@/types/kelas";
import { LevelType } from "@/types/level";
import { TipeKelasTypes } from "@/types/typecplass";
import { Link } from "@inertiajs/react";
import { AlertTriangle } from "lucide-react";
import { useState } from "react";
import { route } from "ziggy-js";
interface Props {
    kelas: KelasType;
    category: CategoryTypes[];
    tipekelas: TipeKelasTypes[];
    level: LevelType[];
}
export default function Index({ kelas, category, tipekelas, level }: Props) {
    const [search, setSearch] = useState<string>("");
    const [selectedTipeKelas, setSelectedTipeKelas] = useState<string[]>([]);
    const [selectedLevel, setSelectedLevel] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
    const filteredKelas = kelas.data.filter((kel) => {
        const matchesSearch = kel.title
            .toLowerCase()
            .includes(search.toLowerCase());
        const matchesTipeKelas =
            selectedTipeKelas.length === 0 ||
            selectedTipeKelas.includes(kel.type.name);
        const matchesLevel =
            selectedLevel.length === 0 ||
            selectedLevel.includes(kel.level.name);
        const matchesCategory =
            selectedCategory.length === 0 ||
            selectedCategory.includes(kel.category.name);

        return (
            matchesSearch && matchesTipeKelas && matchesLevel && matchesCategory
        );
    });

    const handleTipeKelasChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSelectedTipeKelas((prevSelected) =>
            e.target.checked
                ? [...prevSelected, value]
                : prevSelected.filter((tipeklas) => tipeklas !== value)
        );
    };

    const handleLevelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSelectedLevel((prevSelected) =>
            e.target.checked
                ? [...prevSelected, value]
                : prevSelected.filter((level) => level !== value)
        );
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSelectedCategory((prevSelected) =>
            e.target.checked
                ? [...prevSelected, value]
                : prevSelected.filter((category) => category !== value)
        );
    };

    return (
        <HomeLayout>
            <section className="flex items-center justify-center h-56 bg-white mt-14">
                <div className="px-6 text-center space-y-7 ">
                    <h1 className="text-3xl font-bold lg:text-5xl">
                        Mau Belajar apa nih?
                    </h1>
                    <Breadcrumb className="flex flex-row items-center justify-center mx-auto space-x-2">
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href={route("home")}>Home</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Kelas</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </section>
            <section className="container py-10">
                <div className="flex flex-col justify-between gap-4 px-4 lg:flex-row lg:px-2">
                    <div className="overflow-auto p-5 space-y-10 bg-white rounded-2xl max-h-[700px] lg:w-[350px]">
                        <Input
                            type="text"
                            placeholder="Cari Kelas"
                            className="rounded-full"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <div className="space-y-3">
                            <h5 className="text-xl font-semibold text-black">
                                Tipe Kelas
                            </h5>
                            {tipekelas.map((tipekelas) => {
                                return (
                                    <div
                                        className="flex items-center space-x-2"
                                        key={tipekelas.id}
                                    >
                                        <Checkbox
                                            id={`tipekelas-${tipekelas.id}`}
                                            value={tipekelas.name}
                                            onChange={handleTipeKelasChange}
                                            checked={selectedTipeKelas.includes(
                                                tipekelas.name
                                            )}
                                        />
                                        <label
                                            className="text-lg "
                                            htmlFor={`tipekelas-${tipekelas.id}`}
                                        >
                                            {tipekelas.name}
                                        </label>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="space-y-3">
                            <h5 className="text-xl font-semibold text-black">
                                Level Kelas
                            </h5>
                            {level.map((level) => {
                                return (
                                    <div
                                        className="flex items-center space-x-2"
                                        key={level.id}
                                    >
                                        <Checkbox
                                            id={`level-${level.id}`}
                                            value={level.name}
                                            onChange={handleLevelChange}
                                            checked={selectedLevel.includes(
                                                level.name
                                            )}
                                        />
                                        <label
                                            htmlFor={`level-${level.id}`}
                                            className="text-lg "
                                        >
                                            {level.name}
                                        </label>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="space-y-3">
                            <h5 className="text-xl font-semibold text-black">
                                Kategori Kelas
                            </h5>
                            {category.map((category) => {
                                return (
                                    <div
                                        className="flex items-center space-x-2"
                                        key={category.id}
                                    >
                                        <Checkbox
                                            id={`category-${category.id}`}
                                            value={category.name}
                                            onChange={handleCategoryChange}
                                            checked={selectedCategory.includes(
                                                category.name
                                            )}
                                        />
                                        <label
                                            htmlFor={`category-${category.id}`}
                                            className="text-lg "
                                        >
                                            {category.name}
                                        </label>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="w-full rounded-2xl">
                        {filteredKelas.length > 0 ? (
                            <div className="grid grid-cols-1 gap-5 mt-5 md:grid-cols-2 lg:grid-cols-3">
                                {filteredKelas.map((kel) => (
                                    <article
                                        key={kel.id}
                                        className="overflow-hidden transition bg-white rounded-2xl grid grid-rows-[auto_1fr_auto]"
                                    >
                                        <Link
                                            href={route(
                                                "home.detailkelas",
                                                kel.slug
                                            )}
                                            className="relative block"
                                        >
                                            <span className="absolute px-5 py-2 font-medium tracking-widest text-white uppercase -right-px -top-px rounded-tr-2xl bg-maroon">
                                                {kel.category.name}
                                            </span>

                                            <img
                                                alt=""
                                                src={`/storage/${kel.image}`}
                                                className="object-cover w-full h-56"
                                            />

                                            <div className="p-4 space-y-3 bg-white sm:p-6">
                                                <h3 className="mt-0.5 text-biruTua mb-5 text-xl line-clamp-2 font-bold">
                                                    {kel.title}
                                                </h3>
                                                <div className="flex items-center p-2">
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
                                                <div className="flex flex-row items-center pt-5 space-x-2">
                                                    {kel.discount > 0 && (
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
                                                <div className="flex pt-3">
                                                    {Array.from(
                                                        { length: 5 },
                                                        (_, index) => (
                                                            <svg
                                                                key={index}
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 576 512"
                                                                fill="currentColor"
                                                                className={`w-5 h-5 ${
                                                                    Number(
                                                                        kel.average_rating
                                                                    ) > index
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
                                            </div>
                                        </Link>
                                        {/* Rating di bawah */}
                                    </article>
                                ))}
                            </div>
                        ) : (
                            <div className="flex items-center w-full h-20 col-span-2 px-6 mt-10 space-x-3 bg-white rounded-2xl">
                                <AlertTriangle className="w-6 h-6 hover:text-biru" />
                                <span className="text-base font-bold transition-all duration-200 md:text-xl text-biruTua hover:text-biru">
                                    Data tidak ditemukan.
                                </span>
                            </div>
                        )}
                        {kelas.last_page > 1 && (
                            <nav className="flex items-center mt-10 justify-start p-3 overflow-auto bg-white w-[280px] rounded-2xl">
                                {kelas.links.map((link, index) => {
                                    let customLabel = link.label; // Default to the original label

                                    return (
                                        <Link
                                            key={index}
                                            href={link.url}
                                            preserveScroll
                                            dangerouslySetInnerHTML={{
                                                __html: customLabel, // Use the custom label
                                            }}
                                            className={`px-3 py-2 mx-1 text-sm  bg-gray-300 rounded-xl hover:bg-maroon hover:text-white transition-all duration-200 ${
                                                link.active
                                                    ? "bg-maroon text-white"
                                                    : "bg-gray-300 text-white"
                                            }`}
                                        />
                                    );
                                })}
                            </nav>
                        )}
                    </div>
                </div>
            </section>
        </HomeLayout>
    );
}
