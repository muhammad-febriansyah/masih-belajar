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
import HomeLayout from "@/Layouts/HomeLayout";
import { Link, useForm } from "@inertiajs/react";
import { Loader2 } from "lucide-react";
import { FormEventHandler, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "sonner";
export default function Index() {
    const recaptchaRef = useRef<ReCAPTCHA>(null);
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        "g-recaptcha-response": "",
    });
    const handleSubmit: FormEventHandler = async (e) => {
        e.preventDefault();

        if (!data["g-recaptcha-response"]) {
            toast.error("Harap selesaikan reCAPTCHA.", {
                position: "top-right",
                richColors: true,
            });
            return;
        }

        post(route("checklogin"), {
            onError: () => {
                toast.error("Email atau password yang anda masukkan salah.", {
                    position: "top-right",
                    richColors: true,
                });
            },
        });
    };
    return (
        <HomeLayout>
            <section className="container py-10 mt-16 md:mt-32">
                <div className="grid items-center grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="col-span-1 lg:max-w-[80%] px-6 py-10 bg-white rounded-2xl">
                        <div className="space-y-3 pb-7">
                            <h1 className="text-3xl font-bold text-biruTua">
                                Login
                            </h1>
                            <p className="text-sm text-gray-500">
                                Silahkan login terlebih dahulu untuk melanjutkan
                                ke halaman berikutnya.
                            </p>
                        </div>
                        <form
                            onSubmit={handleSubmit}
                            className=" justify-center flex flex-col gap-2"
                        >
                            <div className="grid items-center w-full gap-2 mb-5">
                                <Label htmlFor="subject">Email</Label>
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
                                    required
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                    placeholder="Masukan Password Anda"
                                    name="password"
                                />
                            </div>
                            <ReCAPTCHA
                                sitekey={
                                    import.meta.env
                                        .VITE_RECAPTCHA_SITE_KEY as string
                                }
                                onChange={(token) =>
                                    setData("g-recaptcha-response", token ?? "")
                                }
                            />

                            {errors["g-recaptcha-response"] && (
                                <p className="text-red-500">
                                    {errors["g-recaptcha-response"]}
                                </p>
                            )}

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
                                        className="w-full bg-maroon"
                                    >
                                        Login
                                    </PulsatingButton>
                                )}
                            </div>
                            <span className="text-sm text-center block md:flex items-center justify-center">
                                Belum punya akun?
                                <Link
                                    href="/daftar"
                                    className="font-bold text-biru ml-1.5"
                                >
                                    Daftar Sekarang
                                </Link>
                            </span>
                        </form>
                    </div>
                    <div className="col-span-1">
                        <img src="/bg-log.png" className="w-full" alt="" />
                    </div>
                </div>
            </section>
        </HomeLayout>
    );
}
