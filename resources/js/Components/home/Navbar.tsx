import { SettingType } from "@/types/setting";
import { Link, usePage } from "@inertiajs/react";
import { RainbowButton } from "../ui/rainbow-button";
import PulsatingButton from "../ui/pulsating-button";
import { Input } from "../ui/input";
import { Loader2, Menu, Search } from "lucide-react";
import NavMobile from "./NavMobile";
import { useEffect, useState } from "react";
import { route } from "ziggy-js";
import { Datum } from "@/types/kelas";

interface Props {
    setting: SettingType;
    dataKelas: Datum[];
}
export default function Navbar({ dataKelas = [] }: Props) {
    const [query, setQuery] = useState<string>("");
    const [searchKelas, setSearchKelas] = useState<Datum[]>(dataKelas);
    const [loading, setLoading] = useState<boolean>(false);
    const [searchCompleted, setSearchCompleted] = useState<boolean>(false);
    const { setting } = usePage().props as unknown as Props;
    const [isScrolled, setIsScrolled] = useState<boolean>(false);

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

        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        const debounceFetch = setTimeout(fecthKelas, 1000);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            clearTimeout(debounceFetch);
        };
    }, [query]);
    return (
        <nav
            className={`fixed h-20 flex items-center inset-0  z-[999] ${
                isScrolled
                    ? "bg-white bg-opacity-30 backdrop-blur-md"
                    : "bg-white"
            }`}
        >
            <div className="container flex items-center justify-between p-3.5">
                <Link href={route("home")}>
                    <img
                        src={`/storage/${setting.long_logo}`}
                        alt=""
                        className="size-32 md:size-48"
                    />
                </Link>
                <div className="hidden lg:block relative  w-[300px] lg:w-[500px]">
                    <Search className="absolute right-3.5 top-2.5 size-5 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Mau belajar apa hari ini ?"
                        className="pr-8 rounded-full bg-slate-200"
                        onChange={(e) => setQuery(e.target.value)}
                        value={query}
                    />
                    {loading && query && (
                        <p className="absolute flex items-center w-full gap-3 p-4 mt-4 text-base text-black bg-white rounded-2xl">
                            <Loader2 className="animate-spin" /> Search data...
                        </p>
                    )}
                    <ul className="absolute w-full mt-2 overflow-auto bg-white shadow-lg rounded-2xl">
                        {searchKelas.map((kelas, index) => (
                            <li className="px-4 py-2 border-b" key={index}>
                                <Link href={route("detailkelas", kelas.slug)}>
                                    {kelas.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="items-center hidden space-x-3 lg:flex">
                    <Link
                        href={route("kelas")}
                        className="text-xl font-semibold "
                    >
                        Kelas
                    </Link>
                    <span className="hidden text-3xl lg:block">|</span>
                    <Link href={route("daftar")}>
                        <PulsatingButton>Daftar</PulsatingButton>
                    </Link>
                    <Link href={route("masuk")}>
                        <RainbowButton>Masuk</RainbowButton>
                    </Link>
                </div>
                <div className="lg:hidden">
                    <NavMobile />
                </div>
            </div>
        </nav>
    );
}
