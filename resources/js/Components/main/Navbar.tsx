import { SettingType } from "@/types/setting";
import { Link, usePage } from "@inertiajs/react";
import { RainbowButton } from "../ui/rainbow-button";
import PulsatingButton from "../ui/pulsating-button";
import { Input } from "../ui/input";
import { Inertia } from "@inertiajs/inertia";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    Bell,
    BookMarkedIcon,
    ChevronDown,
    Loader2,
    LogOut,
    Menu,
    Search,
    User,
} from "lucide-react";
import NavMobile from "./NavMobile";
import { useEffect, useState } from "react";
import { route } from "ziggy-js";
import { Datum } from "@/types/kelas";
import { UserType } from "@/types/user";
import { Button } from "../ui/button";

interface Props {
    setting: SettingType;
    dataKelas: Datum[];
    auth: UserType;
}
export default function Navbar({ dataKelas = [] }: Props) {
    const [query, setQuery] = useState<string>("");
    const [searchKelas, setSearchKelas] = useState<Datum[]>(dataKelas);
    const [loading, setLoading] = useState<boolean>(false);
    const [searchCompleted, setSearchCompleted] = useState<boolean>(false);
    const { setting } = usePage().props as unknown as Props;
    const { auth } = usePage().props as unknown as Props;
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const handleLogout = () => {
        Inertia.post(route("logout"));
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
                <Link href={route("dashboard.home")}>
                    <img
                        src={`/storage/${setting.long_logo}`}
                        alt=""
                        className="w-32 h-32"
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
                <div className="items-center hidden gap-x-8 lg:flex">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Bell className="size-6 text-maroon" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-[200px] flex flex-col justify-center gap-5">
                            <img src="/nodata.svg" alt="" />
                            <span className="text-sm text-center text-gray-400">
                                Belum ada notifikasi.
                            </span>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            {auth.image ? (
                                <div className="relative flex items-center gap-2 cursor-pointer group">
                                    <img
                                        src={`/storage/${auth.image}`}
                                        className="rounded-full size-10"
                                        alt=""
                                    />
                                    <ChevronDown className="transition-all duration-200 group-hover:rotate-180" />
                                </div>
                            ) : (
                                <div className="relative flex items-center gap-2 cursor-pointer group">
                                    <img
                                        src="/default-avatar.svg"
                                        className="rounded-full size-10"
                                        alt=""
                                    />
                                    <ChevronDown className="transition-all duration-200 group-hover:rotate-180" />
                                </div>
                            )}
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="mt-5">
                            <DropdownMenuItem>
                                <Link
                                    href={route("dashboard.kelassaya")}
                                    className="flex items-center gap-3 px-3 py-1.5 font-medium transition-all duration-200 rounded-lg hover:text-white hover:bg-maroon"
                                >
                                    <BookMarkedIcon className="size-5" />
                                    Kelas Saya
                                </Link>
                            </DropdownMenuItem>

                            <DropdownMenuItem>
                                <Link
                                    href={route("dashboard.myprofile")}
                                    className="flex items-center gap-3 px-3 py-1.5 font-medium transition-all duration-200 rounded-lg hover:text-white hover:bg-maroon"
                                >
                                    <User className="size-5" />
                                    My Profile
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="flex items-center w-full gap-3 px-3 py-1.5 font-medium transition-all duration-200 rounded-lg hover:text-white hover:bg-maroon"
                                >
                                    <LogOut className="size-5" />
                                    Keluar
                                </button>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="lg:hidden">
                    <NavMobile />
                </div>
            </div>
        </nav>
    );
}
