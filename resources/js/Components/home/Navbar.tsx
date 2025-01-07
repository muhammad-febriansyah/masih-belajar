import { SettingType } from "@/types/setting";
import { usePage } from "@inertiajs/react";
import { RainbowButton } from "../ui/rainbow-button";
import PulsatingButton from "../ui/pulsating-button";
import { Input } from "../ui/input";
import { Menu, Search } from "lucide-react";
import NavMobile from "./NavMobile";

interface SettingProps {
    setting: SettingType;
}
export default function Navbar() {
    const { setting } = usePage().props as unknown as SettingProps;
    return (
        <nav className="fixed h-20 flex items-center inset-0  z-[99] bg-white">
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
                    <PulsatingButton>Daftar</PulsatingButton>
                    <RainbowButton>Masuk</RainbowButton>
                </div>
                <div className="lg:hidden">
                    <NavMobile />
                </div>
            </div>
        </nav>
    );
}
