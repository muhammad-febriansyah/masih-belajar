import { Link } from "@inertiajs/react";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { route } from "ziggy-js";

export default function NavMobile() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const toogleDrawer = () => {
        setIsOpen(!isOpen);
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
                            href={route("home")}
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            className="text-lg font-medium text-black transition-all duration-300 hover:text-maroon hover:font-bold"
                            href={route("kelas")}
                        >
                            Kelas
                        </Link>
                    </li>
                    <li>
                        <Link
                            className="text-lg font-medium text-black transition-all duration-300 hover:text-maroon hover:font-bold"
                            href={route("masuk")}
                        >
                            Belajar
                        </Link>
                    </li>
                    <li>
                        <Link
                            className="text-lg font-medium text-black transition-all duration-300 hover:text-maroon hover:font-bold"
                            href={route("daftar")}
                        >
                            Akun
                        </Link>
                    </li>
                    <li>
                        <Link
                            className="text-lg font-medium text-black transition-all duration-300 hover:text-maroon hover:font-bold"
                            href={route("daftar")}
                        >
                            Keluar
                        </Link>
                    </li>
                </ul>
            </motion.div>
        </div>
    );
}
