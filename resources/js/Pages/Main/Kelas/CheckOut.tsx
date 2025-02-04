import { Badge } from "@/components/ui/badge";
import HeroVideoDialog from "@/components/ui/hero-video-dialog";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import MainLayout from "@/Layouts/MainLayout";
import { Datum } from "@/types/kelas";
import { UserType } from "@/types/user";
import { CheckCircle, CheckCircleIcon, X } from "lucide-react";
import { useEffect, useState } from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Checkbox from "@/components/Checkbox";
import PulsatingButton from "@/components/ui/pulsating-button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import axios from "axios";

interface Props {
    kelas: Datum;
    auth: UserType;
}

export default function CheckOut({ kelas, auth }: Props) {
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const [kodePromo, setKodePromo] = useState<string>("");
    const [diskonPromo, setDiskonPromo] = useState<number>(0); // Untuk menyimpan diskon yang diterima dari kode promo
    const [isPromoValid, setIsPromoValid] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const amount = kelas.price - diskonPromo + 5000;
    const csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        ?.getAttribute("content");

    const handlePayment = async () => {
        setLoading(true); // Menandakan bahwa proses pembayaran dimulai
        try {
            const response = await axios.post(
                route("dashboard.createTransaction"),
                {
                    kelas_id: kelas.id,
                    amount,
                }
            );
            const redirectUrl = response.data.redirect_url; // Dapatkan URL dari response
            if (redirectUrl) {
                window.location.href = redirectUrl; // Redirect ke URL pembayaran
            }
        } catch (error) {
            toast.error("Ada kesalahan saat mengirim pesan. Coba lagi nanti.");
        } finally {
            setLoading(false);
        }
    };

    const handlePromoCheck = async () => {
        try {
            const response = await fetch(route("dashboard.checkPromoCode"), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": csrfToken || "",
                },
                body: JSON.stringify({
                    kode: kodePromo,
                }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            if (data.status === "success" && data.discount > 0) {
                setDiskonPromo(data.discount);
                setIsPromoValid(true);
                toast.success("Kode promo berhasil diterima.", {
                    position: "top-right", // Posisi toast di layar
                });
                setIsOpen(false);
            } else {
                toast.error("Kode promo tidak valid", {
                    position: "top-right",
                });
                setIsPromoValid(false);
            }
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    const hargaSetelahDiskon = kelas.price - diskonPromo;
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true); // Set to true when scrolled
            } else {
                setIsScrolled(false); // Set to false when at the top
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    return (
        <MainLayout>
            <section className="container py-10 mt-16 md:mt-32">
                <div className="flex flex-col items-center justify-center gap-5">
                    <h1 className="text-2xl font-semibold text-center text-black lg:text-4xl">
                        Checkout Kelas
                    </h1>
                    <p className="max-w-lg text-sm text-center text-gray-500">
                        Bergabung dengan kami di kelas premium untuk
                        mengembangkan skill dan kami akan membantu kamu anti
                        gaptek
                    </p>
                </div>
                <div className="flex flex-col justify-center mt-16 gap-y-5 gap-x-10 md:flex-row">
                    <div className="md:max-w-[30%] max-h-min">
                        <div
                            key={kelas.id}
                            className="overflow-hidden bg-white rounded-2xl flex flex-col min-h-[100px]"
                        >
                            <div className="">
                                <HeroVideoDialog
                                    className={`w-full  ${
                                        isScrolled ? "" : "lg:z-[999]"
                                    }`}
                                    animationStyle="from-center"
                                    videoSrc={kelas.link_overview.embed_url}
                                    thumbnailSrc={`/storage/${kelas.image}`}
                                    thumbnailAlt="Hero Video"
                                />

                                <div className="p-4 space-y-3 sm:p-6">
                                    <h3 className="mb-5 text-xl font-bold text-black line-clamp-2">
                                        {kelas.title}
                                    </h3>

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
                                                                kelas.average_rating
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
                                                ({Number(kelas.average_rating)})
                                            </span>
                                        </div>

                                        <div>
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger>
                                                        <img
                                                            src={`/storage/${kelas.level.image}`}
                                                            alt=""
                                                            className="object-cover w-8 h-8 rounded-full"
                                                        />
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>
                                                            {kelas.level.name}
                                                        </p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {kelas.total_transaksi > 0 && (
                                            <Badge className="transition-all duration-300 bg-maroon hover:scale-110">
                                                {kelas.total_transaksi > 0
                                                    ? "Terlaris"
                                                    : ""}
                                            </Badge>
                                        )}
                                        {kelas.type.name === "Premium" ? (
                                            <Badge className="transition-all duration-300 bg-blue-600 hover:scale-110">
                                                {kelas.type.name}
                                            </Badge>
                                        ) : (
                                            <Badge className="transition-all duration-300 bg-orange-600 hover:scale-110">
                                                {kelas.type.name}
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            </div>
                            {/* Rating di bawah */}
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-5">
                        <div className="p-5 space-y-3 bg-white max-h-min md:col-span-2 rounded-2xl">
                            <h1 className="text-2xl font-bold text-maroon">
                                Spesial Benefit Untuk Kamu
                            </h1>
                            <div className="flex items-center justify-between px-3 py-6 bg-red-600 rounded-2xl">
                                <div className="flex flex-row items-center gap-3">
                                    <img
                                        src="/p2.svg"
                                        alt=""
                                        className="object-cover size-12"
                                    />
                                    <div className="flex-col">
                                        <h3 className="text-base font-semibold text-white md:text-xl">
                                            Forum & grup privat
                                        </h3>
                                        <p className="hidden text-sm text-white md:block ">
                                            Bonus pembelian kelas premium
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between px-3 py-6 bg-red-600 rounded-2xl">
                                <div className="flex flex-row items-center gap-3">
                                    <img
                                        src="/p3.svg"
                                        alt=""
                                        className="object-cover size-12"
                                    />
                                    <div className="flex-col">
                                        <h3 className="text-base font-semibold text-white md:text-xl">
                                            Sertifikat Resmi
                                        </h3>
                                        <p className="hidden text-sm text-white md:block ">
                                            Diakui nasional dan perusahaan
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between px-3 py-6 bg-red-600 rounded-2xl">
                                <div className="flex flex-row items-center gap-3">
                                    <img
                                        src="/p4.svg"
                                        alt=""
                                        className="object-cover size-12"
                                    />
                                    <div className="flex-col">
                                        <h3 className="text-base font-semibold text-white md:text-xl">
                                            Aset Belajar
                                        </h3>
                                        <p className="hidden text-sm text-white md:block">
                                            Bonus asset belajar yang <br />{" "}
                                            digunakan saat belajar
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-5 space-y-3 bg-white max-h-min md:col-span-2 rounded-2xl">
                            <div className="space-y-3">
                                <h1 className="text-lg font-bold md:text-2xl text-maroon">
                                    Metode Pembayaran
                                </h1>
                                <Badge className="bg-yellow-500">
                                    Otomatis
                                </Badge>
                            </div>
                            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                                <DialogTrigger asChild>
                                    <Button className="w-full text-red-600 bg-yellow-500 rounded-2xl hover:text-white">
                                        <img
                                            src="/g2.svg"
                                            alt=""
                                            className="size-7 md:size-10"
                                        />
                                        <span className="text-base font-semibold md:text-lg">
                                            Masukkan kode promo
                                        </span>
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle className="mb-5 text-xl">
                                            Pilih Promo
                                        </DialogTitle>
                                        <DialogDescription>
                                            <div className="flex flex-col">
                                                <Input
                                                    type="text"
                                                    required
                                                    placeholder="Masukkan kode promo"
                                                    value={kodePromo}
                                                    onChange={(e) =>
                                                        setKodePromo(
                                                            e.target.value
                                                        )
                                                    }
                                                    className="input"
                                                />
                                                <Button
                                                    onClick={handlePromoCheck}
                                                    className="mt-4 bg-blue-700 rounded-2xl"
                                                >
                                                    Cek Kode Promo
                                                </Button>
                                            </div>
                                        </DialogDescription>
                                    </DialogHeader>

                                    <DialogFooter>
                                        <DialogClose asChild>
                                            <Button
                                                type="button"
                                                className="bg-red-600 rounded-2xl"
                                            >
                                                <X className="" /> Tutup
                                            </Button>
                                        </DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                            {kelas.discount > 0 || isPromoValid ? (
                                <>
                                    <div className="flex flex-row justify-between">
                                        <span className="text-sm text-red-600 md:text-base">
                                            Harga normal
                                        </span>
                                        <span>
                                            <span className="relative text-sm font-medium text-yellow-400 md:text-base">
                                                Rp.{" "}
                                                {Number(
                                                    kelas.price
                                                ).toLocaleString("id-ID")}
                                                <span className="absolute left-0 right-0 font-semibold border-b-2 border-yellow-400 bottom-2.5"></span>
                                            </span>
                                        </span>
                                    </div>
                                    <div className="flex flex-row justify-between">
                                        <span className="text-sm text-red-600 md:text-base">
                                            Diskon kode promo
                                        </span>
                                        <span>
                                            <span className="text-sm font-semibold text-yellow-400 md:text-base">
                                                Rp.{" "}
                                                {diskonPromo.toLocaleString(
                                                    "id-ID"
                                                )}
                                            </span>
                                        </span>
                                    </div>
                                    <div className="flex flex-row justify-between">
                                        <span className="space-x-2 text-sm text-red-600 md:text-base">
                                            Harga kelas
                                            <span className="whitespace-nowrap ml-1 rounded-full bg-yellow-400 px-1.5 py-0.5 text-sm text-white">
                                                Discount
                                            </span>
                                        </span>
                                        <span>
                                            <span className="text-sm font-semibold text-black md:text-base">
                                                Rp.{" "}
                                                {Number(
                                                    hargaSetelahDiskon
                                                ).toLocaleString("id-ID")}
                                            </span>
                                        </span>
                                    </div>
                                </>
                            ) : (
                                <div className="flex flex-row justify-between">
                                    <span className="space-x-2 text-sm text-red-600 md:text-base">
                                        Harga kelas
                                    </span>
                                    <span>
                                        <span className="text-sm font-semibold text-black md:text-base">
                                            Rp.{" "}
                                            {Number(kelas.price).toLocaleString(
                                                "id-ID"
                                            )}
                                        </span>
                                    </span>
                                </div>
                            )}

                            <div className="flex flex-row justify-between">
                                <span className="text-sm text-red-600 md:text-base">
                                    Service fee per student
                                </span>
                                <span>
                                    <span className="text-sm font-semibold text-yellow-400 md:text-base">
                                        Rp. 5.000
                                    </span>
                                </span>
                            </div>

                            <div className="flex flex-row justify-between">
                                <span className="text-sm text-red-600 md:text-base">
                                    Total transfer
                                </span>
                                <span>
                                    <span className="text-sm font-semibold text-black md:text-base">
                                        {isPromoValid
                                            ? Number(
                                                  hargaSetelahDiskon + 5000
                                              ).toLocaleString("id-ID")
                                            : Number(
                                                  kelas.price + 5000
                                              ).toLocaleString("id-ID")}
                                    </span>
                                </span>
                            </div>

                            <div className="flex items-center pt-3 pb-5 space-x-2">
                                <Checkbox id="terms" />
                                <Label htmlFor="terms" className="text-red-600">
                                    Saya setuju dengan Terms & Conditions
                                </Label>
                            </div>

                            <Button
                                type="button"
                                onClick={handlePayment}
                                className="justify-center w-full text-base bg-red-600 md:text-lg rounded-2xl"
                            >
                                <img
                                    src="/g3.svg"
                                    alt=""
                                    className="size-7 md:size-8"
                                />{" "}
                                Bayar & gabung kelas
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
