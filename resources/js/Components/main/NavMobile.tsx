import { Link } from "@inertiajs/react";
import { LogOut, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { route } from "ziggy-js";
import { Inertia } from "@inertiajs/inertia";

export default function NavMobile() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const toogleDrawer = () => {
        setIsOpen(!isOpen);
    };
    const handleLogout = () => {
        Inertia.post(route("logout"));
    };
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto"; // Kembalikan scroll ke body
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);
    return (
        <div className="z-[999]">
            <button onClick={toogleDrawer} className="z-[999] relative">
                <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="size-7"
                >
                    {isOpen ? (
                        <X className="size-7" />
                    ) : (
                        <Menu className="size-7" />
                    )}
                </motion.div>
            </button>

            <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: isOpen ? 0 : "-100%" }}
                className="fixed left-0 right-0 min-h-screen p-6 pt-20 overflow-y-auto bg-white backdrop-blur"
            >
                <ul className="flex flex-col items-center space-y-3">
                    <li>
                        <Link
                            className="text-lg font-medium text-black transition-all duration-300 hover:text-maroon hover:font-bold"
                            href={route("dashboard.home")}
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            className="text-lg font-medium text-black transition-all duration-300 hover:text-maroon hover:font-bold"
                            href={route("dashboard.kelas")}
                        >
                            Kelas
                        </Link>
                    </li>
                    <li>
                        <Link
                            className="text-lg font-medium text-black transition-all duration-300 hover:text-maroon hover:font-bold"
                            href={route("dashboard.kelassaya")}
                        >
                            Belajar
                        </Link>
                    </li>
                    <li>
                        <Link
                            className="text-lg font-medium text-black transition-all duration-300 hover:text-maroon hover:font-bold"
                            href={route("dashboard.myprofile")}
                        >
                            Akun
                        </Link>
                    </li>
                    <li>
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="inline-block transition-all duration-300  border border-maroon bg-maroon px-12 py-2 rounded-full text-base font-medium text-white hover:bg-transparent hover:text-maroon focus:ring-3 focus:outline-hidden"
                        >
                            Keluar
                        </button>
                    </li>
                </ul>
            </motion.div>
        </div>
    );
}
