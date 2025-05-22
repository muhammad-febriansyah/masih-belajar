import HomeLayout from "@/Layouts/HomeLayout";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PulsatingButton from "@/components/ui/pulsating-button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { SettingType } from "@/types/setting";
import { Link, useForm } from "@inertiajs/react";
import { Loader2 } from "lucide-react";
import { FormEventHandler, useRef } from "react";
import { toast } from "sonner";
import ReCAPTCHA from "react-google-recaptcha";
import Checkbox from "@/components/Checkbox";

interface Props {
    setting: SettingType;
}
export default function Index({ setting }: Props) {
    const recaptchaRef = useRef<ReCAPTCHA>(null);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        tempat_lahir: "",
        tanggal_lahir: "",
        jk: "",
        phone: "",
        "g-recaptcha-response": "",
    });

    const handleSubmit: FormEventHandler = async (e) => {
        e.preventDefault();
        try {
            if (!data["g-recaptcha-response"]) {
                toast.error("Harap selesaikan reCAPTCHA.", {
                    position: "top-right",
                    richColors: true,
                });
                return;
            }
            post(route("saveregister"), {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success("Pendaftaran anda berhasil disimpan.", {
                        position: "top-right",
                        richColors: true,
                    });
                },
                onError: (errors) => {
                    if (errors.email) {
                        toast.error(errors.email, {
                            position: "top-right",
                            richColors: true,
                        });
                    } else if (errors.password) {
                        toast.error(errors.password, {
                            position: "top-right",
                            richColors: true,
                        });
                    } else if (errors.password_confirmation) {
                        toast.error(errors.password_confirmation, {
                            position: "top-right",
                            richColors: true,
                        });
                    } else {
                        toast.error("Ada kesalahan dalam data yang dikirim.", {
                            position: "top-right",
                            richColors: true,
                        });
                    }
                },
            });
        } catch (error) {
            toast.error("Ada kesalahan saat mengirim pesan. Coba lagi nanti.");
        }
    };
    return (
        <HomeLayout>
            <section className="container py-10 mt-16 md:mt-32">
                <div className="grid items-center grid-cols-1 gap-4 px-4 md:grid-cols-2">
                    <div className="col-span-1 px-6 py-10 bg-white rounded-2xl">
                        <div className="space-y-3 pb-7">
                            <h1 className="text-3xl font-bold text-biruTua">
                                Registrasi
                            </h1>
                            <p className="text-sm text-gray-500">
                                Silahkan isi form ini dengan benar dan lengkap
                                untuk mendaftar ke {setting.site_name}.
                            </p>
                        </div>
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-2 lg:gap-3"
                        >
                            <div className="grid items-center w-full gap-2 mb-5">
                                <Label htmlFor="name">Nama</Label>
                                <Input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    required
                                    placeholder="Nama Lengkap"
                                />
                            </div>
                            <div className="grid items-center w-full gap-2 mb-5">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    placeholder="Masukan Email Anda"
                                />
                                {errors.email && (
                                    <span className="text-sm text-red-600">
                                        {errors.email}
                                    </span>
                                )}
                            </div>
                            <div className="grid items-center w-full gap-2 mb-5">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    type="password"
                                    id="password"
                                    placeholder="Masukan Password Anda"
                                    required
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    name="password"
                                />
                            </div>
                            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                                <div className="grid items-center w-full gap-2 mb-5">
                                    <Label htmlFor="tempat_lahir">
                                        Tempat Lahir
                                    </Label>
                                    <Input
                                        type="text"
                                        id="tempat_lahir"
                                        name="tempat_lahir"
                                        required
                                        value={data.tempat_lahir}
                                        onChange={(e) =>
                                            setData(
                                                "tempat_lahir",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Tempat Lahir"
                                    />
                                </div>
                                <div className="grid items-center w-full gap-2 mb-5">
                                    <Label
                                        htmlFor="email"
                                        className="text-sm font-medium text-gray-700"
                                    >
                                        Tgl Lahir
                                    </Label>
                                    <input
                                        type="date"
                                        name="tanggal_lahir"
                                        value={data.tanggal_lahir}
                                        onChange={(e) =>
                                            setData(
                                                "tanggal_lahir",
                                                e.target.value
                                            )
                                        }
                                        id="tanggal_lahir"
                                        className="px-4 py-2 text-sm text-gray-800 placeholder-gray-500 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                                <div className="grid items-center w-full gap-2 mb-5">
                                    <Label htmlFor="jk">Jenis Kelamin</Label>
                                    <Select
                                        name="jk"
                                        value={data.jk}
                                        onValueChange={(e) => setData("jk", e)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Laki-Laki">
                                                Laki-Laki
                                            </SelectItem>
                                            <SelectItem value="Perempuan">
                                                Perempuan
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid items-center w-full gap-2 mb-5">
                                    <Label htmlFor="phone">No Telepon</Label>
                                    <Input
                                        type="number"
                                        id="phone"
                                        name="phone"
                                        required
                                        value={data.phone}
                                        onChange={(e) =>
                                            setData("phone", e.target.value)
                                        }
                                        placeholder="Nomor telepon"
                                    />
                                </div>
                            </div>
                            <ReCAPTCHA
                                sitekey={
                                    import.meta.env
                                        .VITE_RECAPTCHA_SITE_KEY as string
                                }
                                className="overflow-auto"
                                onChange={(token) =>
                                    setData("g-recaptcha-response", token ?? "")
                                }
                            />

                            {errors["g-recaptcha-response"] && (
                                <p className="text-red-500">
                                    {errors["g-recaptcha-response"]}
                                </p>
                            )}
                            <div className="flex items-center space-x-3">
                                <Checkbox id="terms" required />
                                <Link href="/term-condition">
                                    <label
                                        htmlFor="terms"
                                        className="text-xs md:text-sm cursor-pointer leading-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Dengan mendaftar, kamu setuju dengan
                                        Syarat dan Ketentuan yang ada di{" "}
                                        <strong className="text-biru">
                                            {setting.site_name}
                                        </strong>
                                    </label>
                                </Link>
                            </div>
                            <div className="flex items-center space-x-2">
                                {processing ? (
                                    <Button
                                        disabled
                                        className="w-full rounded-full bg-maroon"
                                    >
                                        <Loader2 className="animate-spin" />
                                        Tunggu Sebentar...
                                    </Button>
                                ) : (
                                    <PulsatingButton
                                        type="submit"
                                        className="w-full"
                                    >
                                        Registrasi
                                    </PulsatingButton>
                                )}
                            </div>
                            <span className="text-sm text-center">
                                Sudah punya akun?
                                <Link
                                    href="/masuk"
                                    className="font-bold text-biru ml-1.5"
                                >
                                    Masuk
                                </Link>
                            </span>
                        </form>
                    </div>
                    <div className="flex items-center col-span-1">
                        <img src="/bg-log.png" alt="" />
                    </div>
                </div>
            </section>
        </HomeLayout>
    );
}
