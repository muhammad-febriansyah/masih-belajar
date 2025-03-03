import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import HomeLayout from "@/Layouts/HomeLayout";
import { UserAnswerType } from "@/types/user_answer";
import { router } from "@inertiajs/react";
import axios from "axios";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

export default function Index() {
    const [query, setQuery] = useState("");
    const [userAnswers, setUserAnswers] = useState<UserAnswerType[]>([]);
    const [totalPoint, setTotalPoint] = useState(0);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post("/ceksertifikat/search", {
                search: query,
            });
            setUserAnswers(response.data.userAnswers);
            setTotalPoint(response.data.totalPoint);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <HomeLayout>
            <section className="flex items-center justify-center mb-20 h-72 lg:h-80 bg-maroon mt-14">
                <div className="relative px-6 py-5 text-center space-y-7">
                    <h1 className="text-2xl font-bold text-white lg:text-5xl">
                        CEK SERTIFIKAT
                    </h1>
                    <p className="text-sm text-gray-200">
                        Cek sertifikat kelulusan kursus di
                    </p>
                    <form onSubmit={handleSearch} className="mb-4">
                        <div className="flex w-full items-center space-x-2">
                            <Input
                                type="text"
                                className="p-7 rounded-2xl"
                                placeholder="Cari Sertifikat by Nama"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <Button type="submit" className="p-7 rounded-2xl">
                                <Search /> Cari
                            </Button>
                        </div>
                    </form>

                    {/* <Input
                        type="text"
                        placeholder="Cari Kelas"
                        className="absolute transform -translate-x-1/2  p-7 rounded-2xl  -bottom-[7.5rem] left-1/2"
                        // value={search}
                        // onChange={(e) => setSearch(e.target.value)}
                    /> */}
                </div>
            </section>
            <section className="container py-10">
                <div className="bg-white w-full  rounded-2xl p-5">
                    <h1 className="mb-10 text-xl font-semibold lg:text-4xl">
                        List Sertifikat
                    </h1>
                    {loading ? (
                        <p>Loading...</p>
                    ) : userAnswers.length > 0 ? (
                        userAnswers.map((answer, index) => (
                            <div
                                key={index}
                                className="grid grid-cols-2 md:flex items-center overflow-x-scroll justify-between gap-5 "
                            >
                                <div className="flex flex-col gap-2">
                                    <span className="font-semibold">
                                        Nama Kursus
                                    </span>
                                    <span className="line-clamp-3">
                                        {answer.kelas.title}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <span className="font-semibold">
                                        Nomor Sertifikat
                                    </span>
                                    <span>{`AC-999862${
                                        answer.no_sertifikat
                                    }-${new Date().getFullYear()}`}</span>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <span className="font-semibold">Nilai</span>
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
                                            href={`/generateSertifikat/${answer.id}`}
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
            </section>
        </HomeLayout>
    );
}
