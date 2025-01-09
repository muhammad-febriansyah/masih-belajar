import { SettingType } from "@/types/setting";
import { Link, usePage } from "@inertiajs/react";
import { RainbowButton } from "../ui/rainbow-button";
import PulsatingButton from "../ui/pulsating-button";
import { Input } from "../ui/input";
import { Menu, Search } from "lucide-react";
import NavMobile from "./NavMobile";
import { useEffect, useState } from "react";
import { route } from "ziggy-js";

interface SettingProps {
    setting: SettingType;
}
export default function Navbar() {
    const { setting } = usePage().props as unknown as SettingProps;
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        // Clean up the event listener
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    return (
        <nav
            className={`fixed h-20 flex items-center inset-0  z-[99] ${
                isScrolled
                    ? "bg-white bg-opacity-30 backdrop-blur-md"
                    : "bg-white"
            }`}
        >
            <div className="container flex items-center justify-between p-3.5">
                <img
                    src={`/storage/${setting.long_logo}`}
                    alt=""
                    className="w-32 h-32"
                />
                <div className="hidden lg:block relative  w-[300px] lg:w-[500px]">
                    <Search className="absolute right-3.5 top-2.5 size-5 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Mau belajar apa hari ini ?"
                        className="pr-8 rounded-full bg-slate-200"
                    />
                </div>
                <div className="hidden space-x-3 lg:flex">
                    <Link href={route("home.register")}>
                        <PulsatingButton>Daftar</PulsatingButton>
                    </Link>
                    <Link href={route("home.login")}>
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
