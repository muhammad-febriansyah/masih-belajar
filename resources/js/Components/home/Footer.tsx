import { SettingType } from "@/types/setting";
import { Link, usePage } from "@inertiajs/react";
import {
    ArrowBigUpDashIcon,
    Mail,
    MapPin,
    PhoneCall,
    Youtube,
    ExternalLink,
} from "lucide-react";
import { route } from "ziggy-js";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { FaWhatsapp, FaFacebookF, FaInstagram } from "react-icons/fa";

interface SettingProps {
    setting: SettingType;
}

export default function Footer() {
    const { setting } = usePage().props as unknown as SettingProps;
    const [isVisible, setIsVisible] = useState<boolean>(true);
    const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

    useEffect(() => {
        const currentURL = window.location.href;
        if (currentURL.includes("/detailkelas")) {
            setIsVisible(false);
        }

        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 300);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
            {/* Enhanced Wave Background */}
            <div className="absolute inset-0 overflow-hidden">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute z-0 w-full h-full"
                    viewBox="0 0 1440 320"
                    preserveAspectRatio="none"
                >
                    <defs>
                        <linearGradient
                            id="waveGradient"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                        >
                            <stop
                                offset="0%"
                                stopColor="#e2eaf7"
                                stopOpacity="0.8"
                            />
                            <stop
                                offset="50%"
                                stopColor="#dbeafe"
                                stopOpacity="0.6"
                            />
                            <stop
                                offset="100%"
                                stopColor="#f1f5f9"
                                stopOpacity="0.4"
                            />
                        </linearGradient>
                    </defs>
                    <path
                        fill="url(#waveGradient)"
                        d="M0,128L48,133.3C96,139,192,149,288,165.3C384,181,480,203,576,186.7C672,171,768,117,864,106.7C960,96,1056,128,1152,154.7C1248,181,1344,203,1392,213.3L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
                        className="animate-pulse"
                    />
                </svg>

                {/* Floating particles */}
                <div className="absolute inset-0 opacity-20">
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-2 h-2 bg-maroon rounded-full animate-float"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${i * 0.5}s`,
                                animationDuration: `${3 + Math.random() * 2}s`,
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Enhanced Scroll to Top Button */}
            {isVisible && showScrollTop && (
                <div className="fixed bottom-20 z-[88] left-4 group">
                    <Button
                        onClick={scrollToTop}
                        className="bg-gradient-to-r from-maroon to-red-600 hover:from-red-600 hover:to-maroon rounded-full w-12 h-12 p-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                    >
                        <ArrowBigUpDashIcon
                            size={20}
                            className="text-white transition-transform duration-300 group-hover:animate-bounce"
                        />
                    </Button>
                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                        Kembali ke atas
                    </div>
                </div>
            )}

            {/* Enhanced WhatsApp Button */}
            {isVisible && (
                <div className="fixed bottom-4 z-[88] right-4 group">
                    <a
                        href={`https://wa.me/${setting.phone}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-full px-4 py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 flex items-center gap-2">
                            <FaWhatsapp className="text-xl animate-pulse" />
                            <span className="font-medium">
                                Konsultasi Kelas
                            </span>
                        </Button>
                    </a>
                    <div className="absolute -top-12 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                        Chat sekarang!
                    </div>
                </div>
            )}

            {/* Main Footer Content */}
            <div className="container relative z-10 px-4 py-16 mx-auto space-y-12 sm:px-6 lg:space-y-16 lg:px-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Company Info Section */}
                    <div className="space-y-6">
                        <div className="group">
                            <img
                                src={`/storage/${setting.long_logo}`}
                                className="w-44 transition-all duration-500 hover:scale-110 filter hover:brightness-110"
                                alt={setting.site_name}
                            />
                        </div>
                        <div className="bg-white/60 backdrop-blur-sm p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-white/20">
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {setting.description}
                            </p>
                        </div>

                        {/* Trust indicators */}
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <span>Terpercaya</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                                <span>Profesional</span>
                            </div>
                        </div>
                    </div>

                    {/* Links and Contact Section */}
                    <div className="col-span-1 lg:col-span-2 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {/* Office Contact */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-bold text-maroon relative">
                                Kontak Kami
                                <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-maroon rounded-full"></div>
                            </h3>
                            <ul className="space-y-4">
                                {[
                                    {
                                        icon: MapPin,
                                        text: setting.address,
                                        type: "address",
                                    },
                                    {
                                        icon: Mail,
                                        text: setting.email,
                                        type: "email",
                                    },
                                    {
                                        icon: FaWhatsapp,
                                        text: setting.phone,
                                        type: "phone",
                                    },
                                ].map((item, index) => (
                                    <li key={index} className="group">
                                        <div className="flex items-start gap-4 p-3 rounded-lg bg-white/40 backdrop-blur-sm hover:bg-white/60 transition-all duration-300 hover:shadow-sm">
                                            <div className="p-2 bg-gradient-to-r from-maroon to-red-600 rounded-xl shadow-sm group-hover:shadow-md transition-all duration-300">
                                                {item.type === "phone" ? (
                                                    <FaWhatsapp className="w-4 h-4 text-white" />
                                                ) : (
                                                    <item.icon className="w-4 h-4 text-white" />
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-700 group-hover:text-maroon transition-colors duration-300 break-words">
                                                    {item.text}
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Useful Links */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-bold text-maroon relative">
                                Menu Utama
                                <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-maroon rounded-full"></div>
                            </h3>
                            <ul className="space-y-3">
                                {[
                                    {
                                        href: route("ceksertifikat"),
                                        label: "Cek Sertifikat",
                                    },
                                    { href: route("masuk"), label: "Masuk" },
                                    { href: route("daftar"), label: "Daftar" },
                                    {
                                        href: route("event"),
                                        label: "Event/Acara",
                                    },
                                ].map((item, i) => (
                                    <li key={i}>
                                        <Link
                                            href={item.href}
                                            className="group flex items-center gap-2 p-2 rounded-lg bg-white/30 hover:bg-white/50 transition-all duration-300 hover:shadow-sm"
                                        >
                                            <span className="w-1.5 h-1.5 bg-maroon rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:animate-pulse"></span>
                                            <span className="text-sm font-medium text-gray-700 group-hover:text-maroon transition-colors duration-300">
                                                {item.label}
                                            </span>
                                            <ExternalLink className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-all duration-300 ml-auto" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Social Media */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-bold text-maroon relative">
                                Ikuti Kami
                                <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-maroon rounded-full"></div>
                            </h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Tetap terhubung untuk mendapatkan pembaruan dan
                                pengumuman menarik.
                            </p>

                            <div className="grid grid-cols-3 gap-3">
                                {[
                                    {
                                        href: setting.fb,
                                        icon: FaFacebookF,
                                        name: "Facebook",
                                        color: "hover:bg-blue-600",
                                    },
                                    {
                                        href: setting.ig,
                                        icon: FaInstagram,
                                        name: "Instagram",
                                        color: "hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500",
                                    },
                                    {
                                        href: setting.yt,
                                        icon: Youtube,
                                        name: "YouTube",
                                        color: "hover:bg-red-600",
                                    },
                                ].map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.href}
                                        rel="noopener noreferrer"
                                        target="_blank"
                                        className={`group relative flex items-center justify-center p-3 bg-white border-2 border-maroon/20 rounded-xl transition-all duration-300 hover:border-transparent hover:shadow-lg hover:-translate-y-1 ${social.color}`}
                                    >
                                        <social.icon className="w-5 h-5 text-maroon group-hover:text-white transition-colors duration-300" />
                                        <span className="sr-only">
                                            {social.name}
                                        </span>

                                        {/* Tooltip */}
                                        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                                            {social.name}
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Enhanced Divider */}
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gradient-to-r from-transparent via-maroon/20 to-transparent"></div>
                    </div>
                    <div className="relative flex justify-center">
                        <div className="bg-white px-4 py-1 rounded-full border border-maroon/10">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-maroon rounded-full animate-pulse"></div>
                                <div
                                    className="w-1 h-1 bg-maroon/60 rounded-full animate-pulse"
                                    style={{ animationDelay: "0.5s" }}
                                ></div>
                                <div
                                    className="w-2 h-2 bg-maroon rounded-full animate-pulse"
                                    style={{ animationDelay: "1s" }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Enhanced Copyright */}
                <div className="text-center">
                    <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-white/30">
                        <p className="text-sm font-medium text-gray-600">
                            &copy; {new Date().getFullYear()}{" "}
                            {setting.site_name}.
                            <span className="text-maroon font-semibold">
                                {" "}
                                Seluruh hak cipta dilindungi
                            </span>
                        </p>
                        <div className="mt-2 flex items-center justify-center gap-4 text-xs text-gray-500">
                            <span>Dibuat dengan ❤️ di Indonesia</span>
                            <span>•</span>
                            <span>Versi 2.0</span>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes float {
                    0%,
                    100% {
                        transform: translateY(0px) rotate(0deg);
                    }
                    33% {
                        transform: translateY(-10px) rotate(1deg);
                    }
                    66% {
                        transform: translateY(5px) rotate(-1deg);
                    }
                }
                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }
            `}</style>
        </footer>
    );
}
