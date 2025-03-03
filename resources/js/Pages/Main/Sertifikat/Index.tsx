import SideBar from "@/components/main/SideBar";
import { Button } from "@/components/ui/button";
import MainLayout from "@/Layouts/MainLayout";
import { UserAnswerType } from "@/types/user_answer";
import { Link } from "@inertiajs/react";

interface Props {
    userAnswers: UserAnswerType[];
    totalPoint: number;
}

export default function Index({ userAnswers, totalPoint }: Props) {
    return (
        <MainLayout>
            <section className="container py-10 mb-72 mt-16 md:mt-22">
                <div className="flex flex-col justify-between gap-5 md:flex-row">
                    <SideBar />
                    <div className="bg-white w-full lg:w-[70%]  rounded-2xl p-5">
                        <h1 className="mb-10 text-xl font-semibold lg:text-4xl">
                            List Sertifikat
                        </h1>
                        {userAnswers.length > 0 ? (
                            userAnswers.map((answer) => (
                                <div
                                    key={answer.id}
                                    className="flex items-center justify-between gap-5 "
                                >
                                    <div className="flex flex-col gap-2">
                                        <span className="font-semibold">
                                            Nomor Sertifikat
                                        </span>
                                        <span>{`AC-999862${
                                            answer.no_sertifikat
                                        }-${new Date().getFullYear()}`}</span>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <span className="font-semibold">
                                            Nilai
                                        </span>
                                        <span>{answer.total_point}</span>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <span className="font-semibold">
                                            Tanggal Lulus
                                        </span>
                                        <span>
                                            {new Date(
                                                answer.created_at
                                            ).toLocaleDateString("id-ID", {
                                                day: "2-digit",
                                                month: "long",
                                                year: "numeric",
                                            })}
                                        </span>
                                    </div>
                                    {answer.total_point >= 80 && (
                                        <div className="flex flex-col gap-2">
                                            <a
                                                target="_blank"
                                                href={`/dashboard/generateSertifikat/${answer.id}`}
                                            >
                                                <Button className="bg-maroon rounded-2xl">
                                                    Download
                                                </Button>
                                            </a>
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="flex flex-col  items-center justify-center w-full col-span-2 p-5 bg-white gap-y-10 h-min rounded-2xl">
                                <img
                                    src="/nodata.svg"
                                    className="object-cover size-32"
                                    alt=""
                                />
                                <span className="text-base font-bold text-black transition-all duration-200 md:text-xl hover:text-biru">
                                    Tidak ada data.
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
