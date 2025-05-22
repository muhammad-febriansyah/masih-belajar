import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import NumberTicker from "@/components/ui/number-ticker";
import PulsatingButton from "@/components/ui/pulsating-button";
import { RainbowButton } from "@/components/ui/rainbow-button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import TypingAnimation from "@/components/ui/typing-animation";
import HomeLayout from "@/Layouts/HomeLayout";
import { AboutType } from "@/types/about";
import { FaqData } from "@/types/faq";
import { Datum } from "@/types/kelas";
import { SettingType } from "@/types/setting";
import { Link } from "@inertiajs/react";
import "aos/dist/aos.css";
import { ArrowRight, Loader2, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { animate, motion } from "motion/react";
import MainLayout from "@/Layouts/MainLayout";
import { TestimoniType } from "@/types/testimoni";
import { cn } from "@/lib/utils";
import { UserType } from "@/types/user";
import { Marquee } from "@/components/ui/marquee";
interface Props {
    setting: SettingType;
    dataKelas: Datum[];
    about: AboutType[];
    faq: FaqData[];
    kelaspopuler: Datum[];
    totaluser: number;
    totalstar: number;
    totalkelas: number;
    testimoni: TestimoniType[];
}
export default function Index({
    setting,
    dataKelas = [],
    about,
    totaluser,
    totalstar,
    totalkelas,
    faq,
    kelaspopuler,
    testimoni,
}: Props) {
    const [query, setQuery] = useState<string>("");
    const [searchKelas, setSearchKelas] = useState<Datum[]>(dataKelas);
    const [loading, setLoading] = useState<boolean>(false);
    const [searchCompleted, setSearchCompleted] = useState<boolean>(false);
    const firstRow = testimoni.slice(0, testimoni.length / 2);
    const secondRow = testimoni.slice(testimoni.length / 2);

    const ReviewCard = ({
        id,
        user,
        body,
        rating,
    }: {
        id: number;
        user: UserType;
        body: string;
        rating: number;
    }) => {
        return (
            <figure
                className={cn(
                    "relative w-72 cursor-pointer overflow-hidden rounded-2xl border p-5",
                    // light styles
                    "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
                    // dark styles
                    "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
                )}
            >
                <div className="flex flex-row items-center gap-2">
                    <img
                        className="rounded-full"
                        width="32"
                        height="32"
                        alt=""
                        src={`/storage/${user.image}`}
                    />
                    <div className="flex flex-col">
                        <figcaption className="text-sm font-semibold text-maroon">
                            {user.name}
                        </figcaption>
                        <p className="text-xs font-medium">{user.email}</p>
                    </div>
                </div>
                <blockquote className="mt-2 text-sm">{body}</blockquote>
                <span>
                    {Array.from({ length: rating }, (_, index) => (
                        <span key={index} className="text-yellow-500">
                            ★
                        </span>
                    ))}
                    {Array.from({ length: 5 - rating }, (_, index) => (
                        <span key={index} className="text-gray-400">
                            ★
                        </span>
                    ))}
                </span>
            </figure>
        );
    };
    useEffect(() => {
        const fecthKelas = async () => {
            if (query) {
                setLoading(true);
                setSearchCompleted(false);
                try {
                    const response = await fetch(
                        route("dashboard.searchKelas", { query })
                    );
                    const data = await response.json();
                    setSearchKelas(data);
                } catch (error) {
                    console.log(error);
                } finally {
                    setLoading(false);
                    setSearchCompleted(true);
                }
            } else {
                setSearchKelas(dataKelas);
                setSearchCompleted(false);
            }
        };
        const debounceFetch = setTimeout(fecthKelas, 1000);

        return () => {
            clearTimeout(debounceFetch);
        };
    }, [query]);
    return (
        <MainLayout>
            <section className="pt-20 pb-0 lg:pt-10 mt-14 bg-maroon">
                <div className="container grid items-center grid-cols-1 gap-4 px-5 lg:grid-cols-2">
                    <div className="max-w-md mx-auto space-y-5 lg:mx-0 ">
                        <h1 className="text-3xl font-bold text-center text-white lg:text-start md:leading-relaxed md:text-4xl">
                            {setting.heading}
                        </h1>
                        <p className="text-base leading-normal text-center text-gray-300 lg:text-start">
                            {setting.description}
                        </p>
                        <div className="relative w-full lg:w-[400px]">
                            <Search className="absolute right-3.5 top-2.5 size-5 text-muted-foreground" />
                            <Input
                                type="text"
                                placeholder="Cari kelas..."
                                className="pr-8 bg-white rounded-full"
                                onChange={(e) => setQuery(e.target.value)}
                                value={query}
                            />
                            {loading && query && (
                                <p className="absolute flex items-center w-full gap-3 p-4 mt-4 text-base text-black bg-white rounded-2xl">
                                    <Loader2 className="animate-spin" /> Search
                                    data...
                                </p>
                            )}
                            <ul className="absolute w-full mt-2 overflow-auto bg-white shadow-lg rounded-2xl">
                                {searchKelas.map((kelas, index) => (
                                    <li
                                        className="px-4 py-2 border-b"
                                        key={index}
                                    >
                                        <Link
                                            href={route(
                                                "dashboard.detailkelas",
                                                kelas.slug
                                            )}
                                        >
                                            {kelas.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="hidden space-x-2 lg:flex ">
                            <Link href={route("dashboard.kelas")}>
                                <Button className="rounded-2xl">
                                    Lihat Kelas
                                </Button>
                            </Link>
                            {/* <Link href={route("dashboard.kelas")}>
                                <Button className="rounded-2xl ">
                                    Daftar Gratis
                                </Button>
                            </Link> */}
                        </div>
                    </div>
                    <div className="block place-items-center">
                        <img
                            src={`/storage/${setting.thumbnail}`}
                            className="object-cover m-0"
                            alt=""
                        />
                    </div>
                </div>
            </section>
            <section className="py-20 bg-white">
                <div className="container mt-10">
                    <div className="grid items-center justify-center grid-cols-1 gap-x-4 gap-y-7 lg:grid-cols-3">
                        <div className="flex flex-row items-center gap-5">
                            <img src="/1.svg" alt="" />
                            <div className="flex flex-col">
                                <span className="text-3xl font-semibold text-maroon">
                                    <NumberTicker value={totaluser} /> +
                                </span>
                                <span className="text-xl font-medium">
                                    Peserta Kursus
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-row items-center gap-5">
                            <img src="/2.svg" alt="" />
                            <div className="flex flex-col">
                                <span className="text-3xl font-semibold text-orange-400">
                                    <NumberTicker value={totalstar} /> +
                                </span>
                                <span className="text-xl font-medium">
                                    Review bintang
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-row items-center gap-5">
                            <img src="/3.svg" alt="" />
                            <div className="flex flex-col">
                                <span className="text-3xl font-semibold text-maroon">
                                    <NumberTicker value={totalkelas} /> +
                                </span>
                                <span className="text-xl font-medium">
                                    Pilihan kursus
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-20">
                <div className="container">
                    <div className="grid items-center grid-cols-1 gap-5 lg:grid-cols-2">
                        <div className="order-1 mt-10 space-y-5 lg:mt-0 lg:order-1">
                            <h1 className="text-xl font-semibold text-black lg:text-3xl">
                                Menjadi{" "}
                                <span className="text-maroon">Expert</span>
                            </h1>
                            <p className="text-sm leading-relaxed text-gray-500 max-w-xl lg:text-base">
                                Jadikan diri Anda lebih unggul di dunia digital
                                dengan meningkatkan keterampilan IT melalui
                                pelatihan profesional yang dikembangkan sesuai
                                standar industri terkini—dirancang untuk
                                menjawab tantangan nyata di lapangan, dibimbing
                                oleh instruktur berpengalaman, dan ditawarkan
                                dengan harga yang terjangkau agar setiap orang
                                memiliki kesempatan untuk berkembang.
                            </p>
                            <Link href={route("dashboard.kelas")}>
                                <PulsatingButton className="mt-5">
                                    Lihat Kelas
                                </PulsatingButton>
                            </Link>
                        </div>
                        <div className="order-1 lg:order-2">
                            <img
                                src="/about.png"
                                className="object-cover"
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-20">
                <div className="container">
                    <h1 className="pb-5 text-2xl font-semibold text-center text-black lg:text-3xl">
                        Kenapa belajar bersama{" "}
                        <span className="text-maroon">
                            {setting.site_name} ?
                        </span>
                    </h1>
                    <div className="grid grid-cols-2 gap-5 mt-5 lg:mt-10 lg:grid-cols-3">
                        {about.map((about, index) => (
                            <div key={index} className="cursor-pointer group">
                                <div className="flex justify-center p-5 transition-all duration-300 bg-white hover:scale-110 group-hover:bg-maroon rounded-2xl">
                                    <div className="flex flex-col items-center justify-center">
                                        {" "}
                                        <img
                                            src={`/storage/${about.image}`}
                                            alt=""
                                            className="w-20 h-20"
                                        />
                                        <h3 className="font-semibold text-center text-black lg:text-2xl sm:text-sm lg:font-semibold group-hover:text-white">
                                            {about.title}
                                        </h3>
                                        <p className="hidden mt-3 text-sm text-center text-gray-500 lg:block group-hover:text-white">
                                            {about.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className="py-20">
                <div className="container">
                    <h1 className="pb-10 text-2xl font-semibold text-center text-black lg:text-4xl">
                        Kelas <span className="text-maroon">Populer</span>
                    </h1>
                    <div className="grid min-h-full grid-cols-1 gap-y-5 gap-x-3 md:grid-cols-2 lg:grid-cols-3">
                        {kelaspopuler.map((kel) => (
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
                                        <div className="flex flex-row items-center pt-5 space-x-2">
                                            {kel.type.id === 1 ? (
                                                <>
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
                                                </>
                                            ) : (
                                                <span className="text-base font-medium text-black">
                                                    Rp.0
                                                </span>
                                            )}
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
                                                    {Number(kel.average_rating)}
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
                                                                {kel.level.name}
                                                            </p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                </TooltipProvider>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {kel.total_transaksi > 0 && (
                                                <Badge className="transition-all duration-300 bg-maroon hover:scale-110">
                                                    {kel.total_transaksi > 0
                                                        ? "Terlaris"
                                                        : ""}
                                                </Badge>
                                            )}
                                            {kel.type.name === "Premium" ? (
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
                    <div className="flex justify-center">
                        <Link href={route("dashboard.kelas")}>
                            <Button className="mt-10 bg-maroon rounded-2xl">
                                Lihat Kelas Lainnya <ArrowRight />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
            <section className="container py-20">
                <h1 className="mb-10 text-xl font-semibold text-center lg:text-4xl">
                    Testimoni dari Mereka yang Sudah Mencoba
                </h1>
                <Marquee pauseOnHover className="[--duration:20s]">
                    {firstRow.map((review) => (
                        <ReviewCard key={review.id} {...review} />
                    ))}
                </Marquee>
                <Marquee reverse pauseOnHover className="[--duration:20s]">
                    {secondRow.map((review) => (
                        <ReviewCard key={review.id} {...review} />
                    ))}
                </Marquee>
            </section>
            <section className="py-10 bg-maroon">
                <div className="container">
                    <div className="flex flex-col items-center justify-center gap-5 py-20">
                        <h1 className="max-w-xl text-xl font-semibold text-center text-white lg:leading-relaxed lg:text-3xl">
                            Mulai perjalanan belajarmu di dunia IT dengan
                            kurikulum yang dirancang sesuai kebutuhan industri
                            masa kini!
                        </h1>
                        <Link href={route("dashboard.kelas")}>
                            <Button className="text-black bg-white rounded-2xl hover:bg-black hover:text-white">
                                Daftar Gratis
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
            <section className="container py-20">
                <div className="justify-center space-y-10">
                    <div className="flex flex-col items-center ">
                        <h1 className="text-2xl font-bold text-center text-black md:text-4xl">
                            FAQ
                        </h1>
                    </div>
                    <Accordion type="single" collapsible>
                        {faq.map((item) => (
                            <AccordionItem
                                value={item.id}
                                key={item.id}
                                className="w-full px-4 py-2 my-2 bg-white rounded-2xl"
                            >
                                <AccordionTrigger>
                                    {item.question}
                                </AccordionTrigger>
                                <AccordionContent>
                                    <p
                                        className="prose"
                                        dangerouslySetInnerHTML={{
                                            __html: item.answer,
                                        }}
                                    />
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </section>
        </MainLayout>
    );
}
