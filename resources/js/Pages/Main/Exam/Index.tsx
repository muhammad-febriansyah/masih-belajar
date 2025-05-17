import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import PulsatingButton from "@/components/ui/pulsating-button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Datum } from "@/types/kelas";
import { QuizType } from "@/types/quiz";
import { QuizAnswer } from "@/types/quiz_answer";
import { SettingType } from "@/types/setting";
import { Inertia } from "@inertiajs/inertia";
import { Head, useForm } from "@inertiajs/react";
import axios from "axios";
import { Loader2, Paperclip, Send, SendHorizonal } from "lucide-react";
import React, { FormEventHandler, useState } from "react";
import { toast } from "sonner";
import { route } from "ziggy-js";

interface Props {
    setting: SettingType;
    kelas: Datum;
    quiz: QuizType[];
    examanswer: QuizAnswer[];
}
interface FormData {
    quiz_id: number;
    quiz_answer_id: number;
    answer: number;
}
export default function Index({ setting, kelas, quiz, examanswer }: Props) {
    const [selectedAnswers, setSelectedAnswers] = useState<{
        [key: number]: number;
    }>({});
    const [processing, setProcessing] = useState(false);

    // Fungsi untuk menangani perubahan jawaban
    const handleAnswerChange = (quizId: number, answerId: number) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [quizId]: answerId,
        });
    };
    const calculatePoints = (answerId: number) => {
        const answer = examanswer.find((a) => a.id === answerId);
        return answer?.point || 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);

        const answers = quiz.map((item) => ({
            quiz_id: item.id,
            kelas_id: item.kelas_id,
            quiz_answer_id: selectedAnswers[item.id] || null,
            point: selectedAnswers[item.id]
                ? calculatePoints(selectedAnswers[item.id])
                : 0,
        }));

        // Mengonversi data ke JSON
        const data = {
            answers: answers,
        };

        try {
            // Mengirimkan data ke server menggunakan Axios
            const response = await axios.post(
                route("dashboard.examanswer"),
                data,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log("Response:", response.data);
            setProcessing(false);
            Inertia.visit(route("dashboard.examEnd", kelas.slug));
        } catch (error: any) {
            setProcessing(false);
            console.error("Error:", error);
            if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                // Ambil pesan error dari server
                const errorMessage = error.response.data.message;
                toast.error(errorMessage, {
                    position: "top-right",
                });
            } else {
                // Jika tidak ada pesan error spesifik, gunakan pesan default
                toast.error("An error occurred. Please try again.", {
                    position: "top-right",
                });
            }
        }
    };

    return (
        <>
            <Head>
                <title>{setting.site_name}</title>
                <meta
                    head-key="description"
                    name="description"
                    content={setting.keyword}
                />
                <link
                    rel="icon"
                    type="image/svg+xml"
                    href={`/storage/${setting.logo}`}
                />
            </Head>
            <section className="container flex flex-col items-center justify-center h-screen gap-5 mt-5">
                <div className="space-y-5">
                    <h1 className="text-xl font-semibold text-center lg:text-5xl text-maroon">
                        Exam {kelas.title}
                    </h1>
                    <p className="text-base font-medium text-center text-maroon/70 lg:font-semibold lg:text-xl">
                        Selesaikan Exam dengan nilai minimum 80 untuk dapatkan
                        Sertifikat Kelas ini.
                    </p>
                </div>
                <img
                    src="/icon-exam/27.svg"
                    alt=""
                    className="object-contain size-[60%]"
                />
                <Button type="button" id="exam-btn" className="bg-maroon">
                    <a href="#exam" className="flex items-center">
                        <img
                            src="/icon-exam/28.svg"
                            alt="Exam Icon"
                            className="size-7"
                        />
                        <span className="">Mulai Exam</span>
                    </a>
                </Button>
            </section>
            <section id="exam" className="py-10 mt-20">
                <div className="container ">
                    <div className="flex flex-col justify-between gap-5 lg:flex-row">
                        <div className="w-full p-5 bg-maroon/20 rounded-2xl">
                            <div className="flex items-center gap-2">
                                <img
                                    src="/icon-exam/29.svg"
                                    className="size-10"
                                    alt=""
                                />
                                <span className="text-2xl font-bold text-maroon/80">
                                    Final Exam
                                </span>
                            </div>
                            <ul
                                className="pl-16"
                                style={{ listStyleType: "circle" }}
                            >
                                <li className="text-sm text-maroon/80">
                                    Kamu diberikan kesempatan untuk mengulang
                                    assignment apabila tidak mencapai nilai
                                    minimal yang ditentukan sebanyak 3 kali
                                    (setiap 24 jam)
                                </li>
                                <li className="text-sm text-maroon/80">
                                    Nilai yang ditampilkan adalah Nilai
                                    tertinggi yang berhasil kamu peroleh dari
                                    semua pengulangan.
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="p-5 mt-5 bg-maroon/20 rounded-2xl">
                        <div className="p-4 bg-white rounded-2xl">
                            <span className="text-sm font-semibold text-maroon/80">
                                Kerjakan soal dengan teliti! Jika soal memiliki
                                gambar, gambar dapat diklik untuk diperbesar dan
                                dibaca dengan lebih jelas.
                            </span>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <ul className="mt-5 space-y-5">
                                {quiz.map((item, index) => (
                                    <li key={index}>
                                        <span className="text-base font-medium text-maroon/80">
                                            {index + 1}. {item.question}
                                        </span>
                                        <ul className="pl-4">
                                            {examanswer
                                                .filter(
                                                    (answer) =>
                                                        answer.quiz_id ===
                                                        item.id
                                                )
                                                .map((filteredAnswer) => (
                                                    <li
                                                        key={filteredAnswer.id}
                                                        className="p-2 mt-2 space-y-2 border border-black rounded-lg"
                                                    >
                                                        <fieldset>
                                                            <legend className="sr-only">
                                                                {
                                                                    filteredAnswer.id
                                                                }
                                                            </legend>
                                                            <div>
                                                                <label
                                                                    htmlFor={filteredAnswer.id.toString()}
                                                                    className="flex items-center justify-start gap-3 text-base cursor-pointer hover:border-gray-200"
                                                                >
                                                                    <input
                                                                        required
                                                                        type="radio"
                                                                        name={`answer-${item.id}`}
                                                                        value={
                                                                            filteredAnswer.id
                                                                        }
                                                                        id={filteredAnswer.id.toString()}
                                                                        className="text-maroon/80 border-gray-300"
                                                                        checked={
                                                                            selectedAnswers[
                                                                                item
                                                                                    .id
                                                                            ] ===
                                                                            filteredAnswer.id
                                                                        }
                                                                        onChange={() =>
                                                                            handleAnswerChange(
                                                                                item.id,
                                                                                filteredAnswer.id
                                                                            )
                                                                        }
                                                                    />
                                                                    <p className="text-maroon">
                                                                        {
                                                                            filteredAnswer.answer
                                                                        }
                                                                    </p>
                                                                </label>
                                                            </div>
                                                        </fieldset>
                                                    </li>
                                                ))}
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                            <div className="flex items-center mt-10 space-x-2">
                                {processing ? (
                                    <Button
                                        disabled
                                        className="rounded-full bg-maroon"
                                    >
                                        Tunggu Sebentar...
                                    </Button>
                                ) : (
                                    <Button type="submit" className="bg-maroon">
                                        Kirim Jawaban
                                    </Button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}
