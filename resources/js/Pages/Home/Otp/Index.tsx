import HomeLayout from "@/Layouts/HomeLayout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import PulsatingButton from "@/components/ui/pulsating-button";
import { SettingType } from "@/types/setting";
import { Link, useForm } from "@inertiajs/react";
import { Loader2, Shield } from "lucide-react";
import { FormEventHandler } from "react";
import { toast } from "sonner";

interface Props {
    setting: SettingType;
    email?: string;
    otp_for_testing?: string;
    whatsapp_error?: string;
}

export default function Index({
    setting,
    email,
    otp_for_testing,
    whatsapp_error,
}: Props) {
    const { data, setData, post, processing, errors } = useForm({
        email: email || "",
        otp: "",
    });

    const handleSubmit: FormEventHandler = async (e) => {
        e.preventDefault();

        if (data.otp.length !== 6) {
            toast.error("OTP harus 6 digit");
            return;
        }

        post(route("verify-otp.post"), {
            onSuccess: () => {
                toast.success("Verifikasi berhasil!");
            },
            onError: (errors) => {
                if (errors.otp) {
                    toast.error(errors.otp);
                } else {
                    toast.error("Verifikasi gagal");
                }
            },
        });
    };

    const handleOtpChange = (value: string) => {
        setData("otp", value);
    };

    return (
        <HomeLayout>
            <section className="container py-10 mt-16 md:mt-32">
                <div className="grid items-center grid-cols-1 gap-4 px-4 md:grid-cols-2">
                    <div className="col-span-1 px-6 py-10 bg-white rounded-2xl">
                        <div className="space-y-3 pb-7">
                            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full">
                                <Shield className="w-8 h-8 text-biruTua" />
                            </div>
                            <h1 className="text-3xl font-bold text-center text-biruTua">
                                Verifikasi OTP
                            </h1>
                            <p className="text-sm text-center text-gray-500">
                                Masukkan kode OTP 6 digit
                            </p>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-4"
                        >
                            <input
                                type="hidden"
                                name="email"
                                value={data.email}
                            />

                            <div className="mb-5 space-y-2">
                                <Label
                                    htmlFor="otp"
                                    className="text-center block"
                                >
                                    Kode OTP
                                </Label>
                                <div className="flex justify-center">
                                    <InputOTP
                                        maxLength={6}
                                        value={data.otp}
                                        onChange={handleOtpChange}
                                    >
                                        <InputOTPGroup>
                                            <InputOTPSlot index={0} />
                                            <InputOTPSlot index={1} />
                                            <InputOTPSlot index={2} />
                                        </InputOTPGroup>
                                        <InputOTPGroup>
                                            <InputOTPSlot index={3} />
                                            <InputOTPSlot index={4} />
                                            <InputOTPSlot index={5} />
                                        </InputOTPGroup>
                                    </InputOTP>
                                </div>
                                {errors.otp && (
                                    <p className="text-sm text-red-600 text-center">
                                        {errors.otp}
                                    </p>
                                )}
                                <p className="text-xs text-gray-500 text-center">
                                    {data.otp.length}/6 digit
                                </p>
                            </div>

                            <div>
                                {processing ? (
                                    <Button disabled className="w-full">
                                        <Loader2 className="animate-spin mr-2" />
                                        Memverifikasi...
                                    </Button>
                                ) : (
                                    <PulsatingButton
                                        type="submit"
                                        className="w-full"
                                        disabled={data.otp.length !== 6}
                                    >
                                        Verifikasi OTP
                                    </PulsatingButton>
                                )}
                            </div>
                        </form>

                        <div className="mt-6 text-center">
                            <Link
                                href="/daftar"
                                className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                            >
                                ← Kembali ke registrasi
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center col-span-1">
                        <img src="/bg-log.png" alt="" />
                    </div>
                </div>
            </section>
        </HomeLayout>
    );
}
