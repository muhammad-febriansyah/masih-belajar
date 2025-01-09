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
import { FormEventHandler } from "react";
import { toast } from "sonner";
export default function Index() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
    });
    const handleSubmit: FormEventHandler = async (e) => {
        e.preventDefault();
        post(route("home.checklogin"), {
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
            <section className="flex items-center justify-center h-56 bg-white mt-14">
                <div className="px-6 text-center space-y-7 ">
                    <h1 className="text-3xl font-bold lg:text-5xl">Login</h1>
                    <Breadcrumb className="flex flex-row items-center justify-center mx-auto space-x-2">
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href={route("home")}>Home</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Login</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </section>
            <section className="container py-10">
                <div className="grid grid-cols-1 gap-4 px-4 md:grid-cols-2">
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
                        <form onSubmit={handleSubmit}>
                            <div className="grid items-center w-full gap-2 mb-5">
                                <Label htmlFor="subject" className="mb-3">
                                    Email
                                </Label>
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
                                <Label htmlFor="password" className="mb-3">
                                    Password
                                </Label>
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

                            <p className="mb-3 text-sm text-gray-500 sm:mt-0">
                                Belum punya akun?{" "}
                                <Link
                                    href={route("home.register")}
                                    className="text-gray-700 underline"
                                >
                                    Daftar Sekarang
                                </Link>
                                .
                            </p>
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
