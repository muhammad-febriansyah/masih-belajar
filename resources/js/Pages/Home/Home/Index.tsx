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
import {
    ArrowRight,
    Loader2,
    Search,
    Star,
    Users,
    BookOpen,
    Award,
    Clock,
    Play,
    Gift,
    X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { animate, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/marquee";
import { TestimoniType } from "@/types/testimoni";
import { UserType } from "@/types/user";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { PromoCodeType } from "@/types/promo_code";

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
    promo: PromoCodeType;
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
    promo,
    testimoni,
}: Props) {
    const [query, setQuery] = useState<string>("");
    const [searchKelas, setSearchKelas] = useState<Datum[]>(dataKelas);
    const [loading, setLoading] = useState<boolean>(false);
    const [searchCompleted, setSearchCompleted] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);

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
            <motion.figure
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
                className={cn(
                    "relative w-80 cursor-pointer overflow-hidden rounded-3xl border p-6 shadow-lg backdrop-blur-sm",
                    "border-gray-200/50 bg-white/90 hover:bg-white hover:shadow-xl",
                    "dark:border-gray-700/50 dark:bg-gray-900/80 dark:hover:bg-gray-900/90"
                )}
            >
                <div className="flex flex-row items-center gap-3 mb-4">
                    <div className="relative">
                        <img
                            className="rounded-full ring-2 ring-maroon/20"
                            width="40"
                            height="40"
                            alt=""
                            src={`/storage/${user.image}`}
                        />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="flex flex-col">
                        <figcaption className="text-sm font-semibold text-maroon">
                            {user.name}
                        </figcaption>
                        <p className="text-xs font-medium text-gray-500">
                            {user.email}
                        </p>
                    </div>
                </div>
                <blockquote className="mt-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                    "{body}"
                </blockquote>
                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center">
                        {Array.from({ length: rating }, (_, index) => (
                            <Star
                                key={index}
                                className="w-4 h-4 text-yellow-500 fill-current"
                            />
                        ))}
                        {Array.from({ length: 5 - rating }, (_, index) => (
                            <Star
                                key={index}
                                className="w-4 h-4 text-gray-300"
                            />
                        ))}
                    </div>
                    <span className="text-xs text-gray-500 font-medium">
                        {rating}.0
                    </span>
                </div>
            </motion.figure>
        );
    };

    useEffect(() => {
        // Delay untuk menampilkan promo modal
        if (promo) {
            const timer = setTimeout(() => {
                setOpen(true);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [promo]);

    useEffect(() => {
        const fecthKelas = async () => {
            if (query) {
                setLoading(true);
                setSearchCompleted(false);
                try {
                    const response = await fetch(
                        route("searchKelas", { query })
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
        <HomeLayout>
            {/* Hero Section - Enhanced */}
            <section className="relative pt-20 pb-16 lg:pt-10 mt-14 bg-gradient-to-br from-maroon via-maroon to-red-900 overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
                <div className="container relative z-10 grid items-center grid-cols-1 gap-8 px-5 lg:grid-cols-2">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-lg mx-auto space-y-8 lg:mx-0"
                    >
                        <h1 className="text-4xl font-bold text-center text-white lg:text-start md:leading-relaxed">
                            {setting.heading}
                        </h1>
                        <p className="text-lg leading-relaxed text-center text-gray-200 lg:text-start">
                            {setting.description}
                        </p>

                        {/* Enhanced Search Bar */}
                        <div className="relative w-full lg:w-[450px]">
                            <div className="relative">
                                <Search className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                                <Input
                                    type="text"
                                    placeholder="Cari kelas yang kamu inginkan..."
                                    className="pl-12 pr-4 py-3 bg-white/95 backdrop-blur-sm rounded-2xl border-0 shadow-lg text-base focus:ring-2 focus:ring-white/50"
                                    onChange={(e) => setQuery(e.target.value)}
                                    value={query}
                                />
                            </div>

                            {loading && query && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="absolute flex items-center w-full gap-3 p-4 mt-2 text-base text-gray-700 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg z-50"
                                >
                                    <Loader2 className="animate-spin w-5 h-5" />
                                    Mencari kelas...
                                </motion.div>
                            )}

                            {searchKelas.length > 0 && query && !loading && (
                                <motion.ul
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="absolute w-full mt-2 overflow-auto bg-white/95 backdrop-blur-sm shadow-xl rounded-2xl max-h-64 z-50"
                                >
                                    {searchKelas.map((kelas, index) => (
                                        <motion.li
                                            key={index}
                                            whileHover={{
                                                backgroundColor:
                                                    "rgba(139, 69, 19, 0.1)",
                                            }}
                                            className="px-5 py-3 border-b border-gray-100 last:border-b-0"
                                        >
                                            <Link
                                                href={route(
                                                    "detailkelas",
                                                    kelas.slug
                                                )}
                                                className="block hover:text-maroon transition-colors"
                                            >
                                                {kelas.title}
                                            </Link>
                                        </motion.li>
                                    ))}
                                </motion.ul>
                            )}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href={route("kelas")}>
                                <Button className="w-full sm:w-auto px-8 py-3 bg-white text-maroon hover:bg-gray-100 rounded-2xl font-semibold shadow-lg transition-all duration-300 hover:scale-105">
                                    Lihat Semua Kelas
                                </Button>
                            </Link>
                            <Link href={route("daftar")}>
                                <Button
                                    variant="outline"
                                    className="w-full bg-maroon sm:w-auto px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-maroon rounded-2xl font-semibold transition-all duration-300 hover:scale-105"
                                >
                                    Daftar Gratis
                                </Button>
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-3xl"></div>
                        <img
                            src={`/storage/${setting.thumbnail}`}
                            className="relative object-cover rounded-3xl shadow-2xl"
                            alt=""
                        />
                    </motion.div>
                </div>
            </section>

            {/* Stats Section - Enhanced */}
            <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
                <div className="container">
                    <div className="grid items-center justify-center grid-cols-1 gap-8 lg:grid-cols-3">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="flex flex-row items-center gap-6 p-6 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            <div className="p-4 bg-maroon/10 rounded-2xl">
                                <Users className="w-8 h-8 text-maroon" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-3xl font-bold text-maroon">
                                    <NumberTicker value={totaluser} /> +
                                </span>
                                <span className="text-lg font-medium text-gray-700">
                                    Peserta Kursus
                                </span>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="flex flex-row items-center gap-6 p-6 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            <div className="p-4 bg-orange-100 rounded-2xl">
                                <Star className="w-8 h-8 text-orange-500" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-3xl font-bold text-orange-500">
                                    <NumberTicker value={totalstar} /> +
                                </span>
                                <span className="text-lg font-medium text-gray-700">
                                    Review Bintang
                                </span>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="flex flex-row items-center gap-6 p-6 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            <div className="p-4 bg-blue-100 rounded-2xl">
                                <BookOpen className="w-8 h-8 text-blue-600" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-3xl font-bold text-blue-600">
                                    <NumberTicker value={totalkelas} /> +
                                </span>
                                <span className="text-lg font-medium text-gray-700">
                                    Pilihan Kursus
                                </span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* About Section - Enhanced */}
            <section className="py-20 bg-white">
                <div className="container">
                    <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="space-y-6"
                        >
                            <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl">
                                Menjadi{" "}
                                <span className="text-maroon bg-gradient-to-r from-maroon to-red-600 bg-clip-text text-transparent">
                                    Expert
                                </span>{" "}
                                di Bidang IT
                            </h2>
                            <p className="text-lg leading-relaxed text-gray-600">
                                Jadikan diri Anda lebih unggul di dunia digital
                                dengan meningkatkan keterampilan IT melalui
                                pelatihan profesional yang dikembangkan sesuai
                                standar industri terkini—dirancang untuk
                                menjawab tantangan nyata di lapangan, dibimbing
                                oleh instruktur berpengalaman, dan ditawarkan
                                dengan harga yang terjangkau agar setiap orang
                                memiliki kesempatan untuk berkembang.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href={route("kelas")}>
                                    <PulsatingButton className="px-8 py-3 bg-maroon hover:bg-maroon/90 rounded-2xl">
                                        Mulai Belajar Sekarang
                                    </PulsatingButton>
                                </Link>
                                <Button
                                    variant="outline"
                                    className="px-8 py-3 border-2 border-maroon text-maroon hover:bg-maroon hover:text-white rounded-2xl"
                                >
                                    Pelajari Lebih Lanjut
                                </Button>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-maroon/20 to-transparent rounded-3xl transform rotate-3"></div>
                            <img
                                src="/about.png"
                                className="relative object-cover rounded-3xl shadow-2xl transform -rotate-1 hover:rotate-0 transition-transform duration-500"
                                alt=""
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Section - Enhanced */}
            <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl mb-4">
                            Kenapa Belajar Bersama{" "}
                            <span className="text-maroon bg-gradient-to-r from-maroon to-red-600 bg-clip-text text-transparent">
                                {setting.site_name}
                            </span>
                            ?
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Bergabunglah dengan ribuan pembelajar yang telah
                            merasakan pengalaman belajar terbaik
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {about.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.6,
                                    delay: index * 0.1,
                                }}
                                whileHover={{ y: -10, scale: 1.02 }}
                                className="group cursor-pointer"
                            >
                                <div className="relative p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:bg-gradient-to-br group-hover:from-maroon group-hover:to-red-700 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5 group-hover:from-transparent group-hover:to-white/10"></div>
                                    <div className="relative flex flex-col items-center text-center space-y-4">
                                        <div className="p-4 bg-maroon/10 group-hover:bg-white/20 rounded-2xl transition-colors duration-300">
                                            <img
                                                src={`/storage/${item.image}`}
                                                alt=""
                                                className="w-12 h-12"
                                            />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-white transition-colors duration-300">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-600 group-hover:text-gray-200 transition-colors duration-300 leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Popular Classes Section - Enhanced */}
            <section className="py-20 bg-white">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl mb-4">
                            Kelas{" "}
                            <span className="text-maroon bg-gradient-to-r from-maroon to-red-600 bg-clip-text text-transparent">
                                Populer
                            </span>
                        </h2>
                        <p className="text-lg text-gray-600">
                            Kelas-kelas pilihan yang paling diminati oleh para
                            peserta
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {kelaspopuler.map((kel, index) => (
                            <motion.div
                                key={kel.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.6,
                                    delay: index * 0.1,
                                }}
                                whileHover={{ y: -10 }}
                                className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
                            >
                                <Link href={route("detailkelas", kel.slug)}>
                                    <div className="relative overflow-hidden">
                                        <Badge className="absolute top-4 right-4 z-10 bg-maroon hover:bg-maroon/90 text-white px-3 py-1 rounded-full font-medium">
                                            {kel.category.name}
                                        </Badge>
                                        <div className="relative overflow-hidden rounded-t-3xl">
                                            <img
                                                alt=""
                                                src={`/storage/${kel.image}`}
                                                className="object-cover w-full h-56 transition-all duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            <Button
                                                size="sm"
                                                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/90 text-maroon hover:bg-white rounded-full"
                                            >
                                                <Play className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="p-6 space-y-4">
                                        <h3 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-maroon transition-colors duration-300">
                                            {kel.title}
                                        </h3>

                                        <div className="flex items-center gap-3">
                                            <div className="relative">
                                                <img
                                                    src={
                                                        kel.user.image
                                                            ? `/storage/${kel.user.image}`
                                                            : "/default-avatar.svg"
                                                    }
                                                    alt=""
                                                    className="w-10 h-10 rounded-full ring-2 ring-gray-200"
                                                />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-semibold text-gray-900">
                                                    {kel.user.name}
                                                </span>
                                                <span className="text-xs text-gray-500">
                                                    {kel.user.role}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex flex-col">
                                                {kel.type.id === 1 ? (
                                                    <div className="flex items-center gap-2">
                                                        {kel.discount > 0 && (
                                                            <span className="text-sm text-gray-400 line-through">
                                                                Rp{" "}
                                                                {Number(
                                                                    kel.price
                                                                ).toLocaleString(
                                                                    "id-ID"
                                                                )}
                                                            </span>
                                                        )}
                                                        <span className="text-lg font-bold text-maroon">
                                                            Rp{" "}
                                                            {Number(
                                                                kel.price -
                                                                    kel.discount
                                                            ).toLocaleString(
                                                                "id-ID"
                                                            )}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <span className="text-lg font-bold text-green-600">
                                                        Gratis
                                                    </span>
                                                )}
                                            </div>

                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger>
                                                        <img
                                                            src={`/storage/${kel.level.image}`}
                                                            alt=""
                                                            className="w-8 h-8 rounded-full ring-2 ring-gray-200"
                                                        />
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>{kel.level.name}</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </div>

                                        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                                            <div className="flex items-center gap-1">
                                                {Array.from(
                                                    { length: 5 },
                                                    (_, index) => (
                                                        <Star
                                                            key={index}
                                                            className={`w-4 h-4 ${
                                                                Number(
                                                                    kel.average_rating
                                                                ) > index
                                                                    ? "text-yellow-400 fill-current"
                                                                    : "text-gray-300"
                                                            }`}
                                                        />
                                                    )
                                                )}
                                                <span className="ml-1 text-sm font-medium text-gray-600">
                                                    (
                                                    {Number(kel.average_rating)}
                                                    )
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                {kel.total_transaksi > 0 && (
                                                    <Badge className="bg-red-100 text-red-700 hover:bg-red-200 text-xs">
                                                        Terlaris
                                                    </Badge>
                                                )}
                                                <Badge
                                                    className={`text-xs ${
                                                        kel.type.name ===
                                                        "Premium"
                                                            ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                                                            : "bg-orange-100 text-orange-700 hover:bg-orange-200"
                                                    }`}
                                                >
                                                    {kel.type.name}
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex justify-center mt-12"
                    >
                        <Link href={route("kelas")}>
                            <Button className="px-8 py-3 bg-maroon hover:bg-maroon/90 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                                Lihat Semua Kelas{" "}
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Testimonials Section - Enhanced */}
            <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl mb-4">
                            Testimoni dari Mereka yang Sudah Mencoba
                        </h2>
                        <p className="text-lg text-gray-600">
                            Dengarkan pengalaman nyata dari para alumni yang
                            telah berhasil
                        </p>
                    </motion.div>

                    <div className="space-y-6">
                        <Marquee pauseOnHover className="[--duration:25s]">
                            {firstRow.map((review) => (
                                <ReviewCard key={review.id} {...review} />
                            ))}
                        </Marquee>
                        <Marquee
                            reverse
                            pauseOnHover
                            className="[--duration:25s]"
                        >
                            {secondRow.map((review) => (
                                <ReviewCard key={review.id} {...review} />
                            ))}
                        </Marquee>
                    </div>
                </div>
            </section>

            {/* CTA Section - Enhanced */}
            <section className="py-20 bg-gradient-to-br from-maroon via-red-700 to-red-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
                <div className="container relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col items-center justify-center gap-8 py-16 text-center"
                    >
                        <div className="max-w-4xl space-y-6">
                            <h2 className="text-3xl font-bold text-white lg:text-5xl leading-tight">
                                Mulai Belajar IT yang Sesuai dengan Kebutuhan
                                Industri
                            </h2>
                            <p className="text-xl text-gray-200 leading-relaxed">
                                Bergabunglah sekarang dan dapatkan akses ke
                                pembelajaran berkualitas tinggi yang akan
                                mengubah karir Anda di dunia teknologi
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href={route("daftar")}>
                                <Button className="px-10 py-4 bg-white text-maroon hover:bg-gray-100 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                                    Daftar Gratis Sekarang
                                </Button>
                            </Link>
                            <a
                                href={`https://wa.me/` + setting.phone}
                                target="_blank"
                            >
                                <Button
                                    variant="outline"
                                    className="px-10 py-4 bg-maroon border-2 border-white text-white hover:bg-white hover:text-maroon rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105"
                                >
                                    Konsultasi Gratis
                                </Button>
                            </a>
                        </div>

                        <div className="flex flex-wrap justify-center items-center gap-8 mt-8">
                            <div className="flex items-center gap-2 text-white/80">
                                <Clock className="w-5 h-5" />
                                <span className="text-sm">Akses Selamanya</span>
                            </div>
                            <div className="flex items-center gap-2 text-white/80">
                                <Award className="w-5 h-5" />
                                <span className="text-sm">
                                    Sertifikat Resmi
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-white/80">
                                <Users className="w-5 h-5" />
                                <span className="text-sm">
                                    Komunitas Eksklusif
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* FAQ Section - Enhanced */}
            <section className="py-20 bg-white">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl mb-4">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-lg text-gray-600">
                            Jawaban untuk pertanyaan yang sering ditanyakan
                        </p>
                    </motion.div>

                    <div className="max-w-4xl mx-auto">
                        <Accordion
                            type="single"
                            collapsible
                            className="space-y-4"
                        >
                            {faq.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.1,
                                    }}
                                >
                                    <AccordionItem
                                        value={item.id}
                                        className="bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-2xl px-6 py-2 shadow-sm hover:shadow-md transition-all duration-300"
                                    >
                                        <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-maroon transition-colors duration-200 text-base lg:text-lg">
                                            {item.question}
                                        </AccordionTrigger>
                                        <AccordionContent className="pt-4 pb-2">
                                            <div
                                                className="prose prose-gray max-w-none text-gray-600 leading-relaxed"
                                                dangerouslySetInnerHTML={{
                                                    __html: item.answer,
                                                }}
                                            />
                                        </AccordionContent>
                                    </AccordionItem>
                                </motion.div>
                            ))}
                        </Accordion>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center mt-12 p-8 bg-gradient-to-r from-maroon/5 to-red-50 rounded-3xl"
                        >
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                Masih ada pertanyaan lain?
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Tim support kami siap membantu Anda 24/7
                            </p>
                            <a
                                href={`https://wa.me/` + setting.phone}
                                target="_blank"
                            >
                                <Button className="px-8 py-3 bg-maroon hover:bg-maroon/90 rounded-2xl font-semibold">
                                    Hubungi Support
                                </Button>
                            </a>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Enhanced Promo Modal */}
            {promo && (
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent className="rounded-3xl p-0 sm:max-w-lg w-[90%] sm:w-auto mx-auto overflow-hidden border-0 shadow-2xl">
                        <div className="relative">
                            {/* Close Button */}
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setOpen(false)}
                                className="absolute top-4 right-4 z-20 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg"
                            >
                                <X className="w-4 h-4" />
                            </Button>

                            {/* Promo Badge */}
                            <div className="absolute top-4 left-4 z-20">
                                <Badge className="bg-red-600 text-white px-3 py-1 rounded-full font-semibold shadow-lg animate-pulse">
                                    <Gift className="w-4 h-4 mr-1" />
                                    Promo Spesial
                                </Badge>
                            </div>

                            <DialogHeader className="p-6 pb-0">
                                <DialogTitle className="text-2xl font-bold text-center text-gray-900 mb-2">
                                    🔥 Diskon Terbatas!
                                </DialogTitle>
                                <DialogDescription className="text-center text-gray-600 mb-4">
                                    Jangan lewatkan kesempatan emas ini untuk
                                    upgrade skill kamu
                                </DialogDescription>
                            </DialogHeader>

                            <div className="px-6 pb-6">
                                <motion.div
                                    initial={{ scale: 0.95, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className="relative group cursor-pointer"
                                >
                                    <a
                                        href={`https://wa.me/${setting.phone}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block"
                                    >
                                        <div className="relative overflow-hidden rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                                            <img
                                                src={`/storage/${promo.image}`}
                                                className="object-cover w-full max-h-80 group-hover:scale-105 transition-transform duration-500"
                                                alt="Promo Special"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                            {/* WhatsApp CTA overlay */}
                                            <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <div className="bg-green-600 text-white px-4 py-2 rounded-xl shadow-lg text-center font-semibold">
                                                    💬 Chat WhatsApp untuk Info
                                                    Lebih Lanjut
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </motion.div>

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                                    <a
                                        href={`https://wa.me/${setting.phone}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1"
                                    >
                                        <Button className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                                            💬 Hubungi WhatsApp
                                        </Button>
                                    </a>
                                    <Button
                                        variant="outline"
                                        onClick={() => setOpen(false)}
                                        className="flex-1 border-2 border-gray-300 hover:bg-gray-50 rounded-xl py-3 font-semibold"
                                    >
                                        Nanti Saja
                                    </Button>
                                </div>

                                {/* Trust indicators */}
                                <div className="flex justify-center items-center gap-4 mt-4 text-xs text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        <span>Promo Terbatas</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Users className="w-3 h-3" />
                                        <span>Respon Cepat</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Award className="w-3 h-3" />
                                        <span>Terpercaya</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </HomeLayout>
    );
}
