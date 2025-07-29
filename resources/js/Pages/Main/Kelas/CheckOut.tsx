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
import {
    CheckCircle,
    X,
    Tag,
    CreditCard,
    Shield,
    Users,
    Award,
    Download,
    Loader2,
    Star,
    Clock,
    Gift,
} from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface Props {
    kelas: Datum;
    auth: UserType;
}

export default function CheckOut({ kelas, auth }: Props) {
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const [kodePromo, setKodePromo] = useState<string>("");
    const [diskonPromo, setDiskonPromo] = useState<number>(0);
    const [isPromoValid, setIsPromoValid] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
    const [promoLoading, setPromoLoading] = useState<boolean>(false);

    const amount = kelas.price - diskonPromo + 5000;
    const csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        ?.getAttribute("content");

    const handlePayment = async () => {
        if (!termsAccepted) {
            toast.error("Harap setujui syarat dan ketentuan terlebih dahulu");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(
                route("dashboard.createTransaction"),
                {
                    kelas_id: kelas.id,
                    amount,
                }
            );
            const redirectUrl = response.data.data.redirect_url;
            if (redirectUrl) {
                window.location.href = redirectUrl;
            }
        } catch (error) {
            toast.error(
                "Terjadi kesalahan saat memproses pembayaran. Silakan coba lagi."
            );
        } finally {
            setLoading(false);
        }
    };

    const handlePromoCheck = async () => {
        if (!kodePromo.trim()) {
            toast.error("Masukkan kode promo terlebih dahulu");
            return;
        }

        setPromoLoading(true);
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
                toast.success("🎉 Kode promo berhasil diterapkan!", {
                    position: "top-right",
                });
                setIsOpen(false);
            } else {
                toast.error("Kode promo tidak valid atau sudah kadaluarsa", {
                    position: "top-right",
                });
                setIsPromoValid(false);
            }
        } catch (error) {
            console.error("Fetch error:", error);
            toast.error("Gagal memverifikasi kode promo");
        } finally {
            setPromoLoading(false);
        }
    };

    const hargaSetelahDiskon = kelas.price - diskonPromo;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const benefits = [
        {
            icon: Users,
            title: "Forum & Grup Privat",
            description: "Akses eksklusif ke komunitas premium",
            color: "bg-gradient-to-br from-blue-500 to-blue-600",
        },
        {
            icon: Award,
            title: "Sertifikat Resmi",
            description: "Diakui nasional dan perusahaan",
            color: "bg-gradient-to-br from-green-500 to-green-600",
        },
        {
            icon: Download,
            title: "Aset Belajar Premium",
            description: "Bonus materi dan template eksklusif",
            color: "bg-gradient-to-br from-purple-500 to-purple-600",
        },
    ];

    return (
        <MainLayout>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
                <section className="container py-10 mt-16 md:mt-32">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
                            <Gift className="w-4 h-4" />
                            Checkout Premium
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-4">
                            Selesaikan Pembayaran
                        </h1>
                        <p className="max-w-2xl mx-auto text-gray-600 text-lg">
                            Bergabung dengan ribuan siswa lainnya dan mulai
                            perjalanan belajar Anda sekarang
                        </p>
                    </div>

                    <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
                        {/* Course Preview Card */}
                        <div className="lg:col-span-1">
                            <Card className="overflow-hidden shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                                <div className="relative">
                                    <HeroVideoDialog
                                        className={`w-full ${
                                            isScrolled ? "" : "lg:z-[999]"
                                        }`}
                                        animationStyle="from-center"
                                        videoSrc={kelas.link_overview.embed_url}
                                        thumbnailSrc={`/storage/${kelas.image}`}
                                        thumbnailAlt="Course Preview"
                                    />
                                    <div className="absolute top-4 left-4">
                                        {kelas.total_transaksi > 0 && (
                                            <Badge className="bg-red-500 hover:bg-red-600 text-white shadow-lg">
                                                🔥 Terlaris
                                            </Badge>
                                        )}
                                    </div>
                                </div>

                                <CardContent className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4 line-clamp-2">
                                        {kelas.title}
                                    </h3>

                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-1">
                                            {Array.from(
                                                { length: 5 },
                                                (_, index) => (
                                                    <Star
                                                        key={index}
                                                        className={`w-4 h-4 ${
                                                            Number(
                                                                kelas.average_rating
                                                            ) > index
                                                                ? "text-yellow-400 fill-current"
                                                                : "text-gray-300"
                                                        }`}
                                                    />
                                                )
                                            )}
                                            <span className="ml-2 text-sm font-semibold text-gray-700">
                                                ({Number(kelas.average_rating)})
                                            </span>
                                        </div>

                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <img
                                                        src={`/storage/${kelas.level.image}`}
                                                        alt={kelas.level.name}
                                                        className="w-8 h-8 rounded-full ring-2 ring-orange-200"
                                                    />
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>{kelas.level.name}</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>

                                    <div className="flex gap-2">
                                        <Badge
                                            className={`${
                                                kelas.type.name === "Premium"
                                                    ? "bg-gradient-to-r from-blue-600 to-blue-700"
                                                    : "bg-gradient-to-r from-orange-500 to-orange-600"
                                            } text-white shadow-md`}
                                        >
                                            {kelas.type.name}
                                        </Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Benefits Card */}
                            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                                <CardHeader>
                                    <CardTitle className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                                        ✨ Benefit Eksklusif Premium
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {benefits.map((benefit, index) => (
                                        <div
                                            key={index}
                                            className="group hover:scale-[1.02] transition-all duration-300"
                                        >
                                            <div
                                                className={`${benefit.color} rounded-2xl p-4 text-white shadow-lg`}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                                                        <benefit.icon className="w-6 h-6" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="font-semibold text-lg">
                                                            {benefit.title}
                                                        </h3>
                                                        <p className="text-sm opacity-90">
                                                            {
                                                                benefit.description
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>

                            {/* Payment Card */}
                            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent flex items-center gap-2">
                                            <CreditCard className="w-6 h-6 text-orange-600" />
                                            Detail Pembayaran
                                        </CardTitle>
                                        <Badge className="bg-green-100 text-green-700 border border-green-200">
                                            <Shield className="w-3 h-3 mr-1" />
                                            Aman & Otomatis
                                        </Badge>
                                    </div>
                                </CardHeader>

                                <CardContent className="space-y-6">
                                    {/* Promo Section */}
                                    <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border border-yellow-200">
                                        <Dialog
                                            open={isOpen}
                                            onOpenChange={setIsOpen}
                                        >
                                            <DialogTrigger asChild>
                                                <Button className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-white font-semibold rounded-xl h-12 transition-all duration-300 transform hover:scale-[1.02] shadow-lg">
                                                    <Tag className="w-5 h-5 mr-2" />
                                                    {isPromoValid
                                                        ? "Promo Diterapkan ✅"
                                                        : "Punya Kode Promo? Gunakan Sekarang"}
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-sm">
                                                <DialogHeader>
                                                    <DialogTitle className="text-xl font-bold flex items-center gap-2">
                                                        <Gift className="w-5 h-5 text-orange-500" />
                                                        Masukkan Kode Promo
                                                    </DialogTitle>
                                                    <DialogDescription>
                                                        Dapatkan diskon spesial
                                                        dengan memasukkan kode
                                                        promo Anda
                                                    </DialogDescription>
                                                </DialogHeader>

                                                <div className="space-y-4">
                                                    <Input
                                                        type="text"
                                                        placeholder="Contoh: BELAJAR50"
                                                        value={kodePromo}
                                                        onChange={(e) =>
                                                            setKodePromo(
                                                                e.target.value.toUpperCase()
                                                            )
                                                        }
                                                        className="h-12 text-center font-mono text-lg tracking-wider"
                                                    />
                                                    <Button
                                                        onClick={
                                                            handlePromoCheck
                                                        }
                                                        disabled={
                                                            promoLoading ||
                                                            !kodePromo.trim()
                                                        }
                                                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 h-12 rounded-xl"
                                                    >
                                                        {promoLoading ? (
                                                            <>
                                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                                Memverifikasi...
                                                            </>
                                                        ) : (
                                                            <>
                                                                <CheckCircle className="w-4 h-4 mr-2" />
                                                                Terapkan Promo
                                                            </>
                                                        )}
                                                    </Button>
                                                </div>

                                                <DialogFooter>
                                                    <DialogClose asChild>
                                                        <Button
                                                            variant="outline"
                                                            className="w-full"
                                                        >
                                                            <X className="w-4 h-4 mr-2" />
                                                            Tutup
                                                        </Button>
                                                    </DialogClose>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    </div>

                                    {/* Price Breakdown */}
                                    <div className="space-y-4">
                                        {kelas.discount > 0 || isPromoValid ? (
                                            <>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-600">
                                                        Harga Normal
                                                    </span>
                                                    <span className="text-gray-400 line-through font-medium">
                                                        Rp{" "}
                                                        {Number(
                                                            kelas.price
                                                        ).toLocaleString(
                                                            "id-ID"
                                                        )}
                                                    </span>
                                                </div>
                                                {isPromoValid && (
                                                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                                                        <span className="text-green-700 font-medium flex items-center gap-2">
                                                            <Gift className="w-4 h-4" />
                                                            Diskon Promo
                                                        </span>
                                                        <span className="text-green-700 font-bold">
                                                            -Rp{" "}
                                                            {diskonPromo.toLocaleString(
                                                                "id-ID"
                                                            )}
                                                        </span>
                                                    </div>
                                                )}
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-900 font-medium flex items-center gap-2">
                                                        Harga Kelas
                                                        <Badge className="bg-green-100 text-green-700 text-xs">
                                                            Hemat!
                                                        </Badge>
                                                    </span>
                                                    <span className="text-gray-900 font-bold">
                                                        Rp{" "}
                                                        {Number(
                                                            hargaSetelahDiskon
                                                        ).toLocaleString(
                                                            "id-ID"
                                                        )}
                                                    </span>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-900 font-medium">
                                                    Harga Kelas
                                                </span>
                                                <span className="text-gray-900 font-bold">
                                                    Rp{" "}
                                                    {Number(
                                                        kelas.price
                                                    ).toLocaleString("id-ID")}
                                                </span>
                                            </div>
                                        )}

                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600">
                                                Biaya Layanan
                                            </span>
                                            <span className="text-orange-600 font-medium">
                                                Rp 5.000
                                            </span>
                                        </div>

                                        <Separator />

                                        <div className="flex justify-between items-center p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-200">
                                            <span className="text-xl font-bold text-gray-900">
                                                Total Pembayaran
                                            </span>
                                            <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                                                Rp{" "}
                                                {Number(
                                                    isPromoValid
                                                        ? hargaSetelahDiskon +
                                                              5000
                                                        : kelas.price + 5000
                                                ).toLocaleString("id-ID")}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Terms and Conditions */}
                                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                                        <div className="flex items-start gap-3">
                                            <Checkbox
                                                id="terms"
                                                checked={termsAccepted}
                                                onChange={(e) =>
                                                    setTermsAccepted(
                                                        e.target.checked
                                                    )
                                                }
                                                className="mt-0.5"
                                            />
                                            <Label
                                                htmlFor="terms"
                                                className="text-sm text-gray-700 leading-relaxed"
                                            >
                                                Saya setuju dengan{" "}
                                                <a
                                                    href="#"
                                                    className="text-orange-600 hover:text-orange-700 font-medium underline"
                                                >
                                                    Syarat & Ketentuan
                                                </a>{" "}
                                                dan{" "}
                                                <a
                                                    href="#"
                                                    className="text-orange-600 hover:text-orange-700 font-medium underline"
                                                >
                                                    Kebijakan Privasi
                                                </a>
                                            </Label>
                                        </div>
                                    </div>

                                    {/* Payment Button */}
                                    <Button
                                        type="button"
                                        onClick={handlePayment}
                                        disabled={loading || !termsAccepted}
                                        className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold text-lg h-14 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                                                Memproses Pembayaran...
                                            </>
                                        ) : (
                                            <>
                                                <CreditCard className="w-5 h-5 mr-3" />
                                                Bayar & Mulai Belajar Sekarang
                                            </>
                                        )}
                                    </Button>

                                    {/* Security Notice */}
                                    <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                                        <Shield className="w-4 h-4" />
                                        <span>
                                            Pembayaran aman dan terenkripsi
                                            dengan Midtrans
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>
            </div>
        </MainLayout>
    );
}
