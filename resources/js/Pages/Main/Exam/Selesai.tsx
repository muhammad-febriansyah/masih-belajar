import { Button } from "@/components/ui/button";
import { Datum } from "@/types/kelas";
import { QuizType } from "@/types/quiz";
import { QuizAnswer } from "@/types/quiz_answer";
import { SettingType } from "@/types/setting";
import { UserAnswerType } from "@/types/user_answer";
import { Head, Link } from "@inertiajs/react";
import React, { useState } from "react";
import { route } from "ziggy-js";

interface Props {
    setting: SettingType;
    data: UserAnswerType[];
    totalPoint: number;
    quiz: QuizType[];
    kelas: Datum;
    examanswer: QuizAnswer[];
}
export default function Selesai({
    setting,
    data,
    totalPoint,
    quiz,
    examanswer,
    kelas,
}: Props) {
    const userAnswers = data.reduce(
        (acc: { [key: number]: number }, answer) => {
            acc[answer.quiz_id] = answer.quiz_answer_id;
            return acc;
        },
        {}
    );
    const [selectedAnswers, setSelectedAnswers] = useState<{
        [key: number]: number;
    }>(userAnswers);

    const handleAnswerChange = (quizId: number, answerId: number) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [quizId]: answerId,
        });
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
            <section className="container pt-10">
                <div className="flex flex-col justify-between gap-5 lg:flex-row">
                    <div className="bg-red-200 w-full lg:w-[70%] p-5 rounded-2xl">
                        <div className="flex items-center gap-2">
                            <img
                                src="/icon-exam/29.svg"
                                className="size-10"
                                alt=""
                            />
                            <span className="text-lg font-bold text-red-700 lg:text-2xl">
                                Final Exam
                            </span>
                        </div>
                        <ul
                            className="pl-16"
                            style={{ listStyleType: "circle" }}
                        >
                            <li className="text-xs text-red-700 lg:text-sm">
                                Kamu diberikan kesempatan untuk mengulang
                                assignment apabila tidak mencapai nilai minimal
                                yang ditentukan sebanyak 3 kali (setiap 24 jam)
                            </li>
                            <li className="text-xs text-red-700 lg:text-sm">
                                Nilai yang ditampilkan adalah Nilai tertinggi
                                yang berhasil kamu peroleh dari semua
                                pengulangan.
                            </li>
                        </ul>
                    </div>
                    <div className="bg-red-200 p-5 w-full lg:w-[30%] rounded-2xl flex flex-col items-center justify-center gap-5">
                        <h1 className="text-4xl font-bold text-red-600">
                            Nilai Kamu
                        </h1>
                        <h1 className="text-3xl font-bold text-red-600">
                            {totalPoint}
                        </h1>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-between gap-5 p-5 my-10 bg-red-400 lg:flex-row rounded-2xl">
                    <div className="flex items-center gap-5">
                        <img
                            src="/icon-exam/30.svg"
                            alt=""
                            className="size-12"
                        />
                        <div className="flex flex-col gap-1">
                            <h3 className="text-base font-semibold text-white lg:text-xl">
                                Selamat, kamu telah menyelesaikan kuis
                            </h3>
                            <p className="text-xs text-red-700 lg:text-sm">
                                untuk lulus, minimal mendapatkan nilai 80 dari
                                100
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <h3 className="text-2xl font-semibold text-red-700">
                            Nilai Kamu
                        </h3>
                        <span className="text-2xl font-bold text-white">
                            {totalPoint}/100
                        </span>
                    </div>
                    <div className="flex gap-2 flow-row lg:flex-col">
                        <Link href={route("dashboard.sertifikat")}>
                            <Button
                                type="button"
                                className="bg-orange-300 rounded-2xl"
                            >
                                Selanjutnya
                            </Button>
                        </Link>
                        <Link href={route("dashboard.exam", kelas.slug)}>
                            <Button
                                type="button"
                                className="bg-red-700 rounded-2xl"
                            >
                                Ulangi Exam
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
            <section id="exam" className="pb-10">
                <div className="container ">
                    <div className="p-5 mt-5 bg-red-200 rounded-2xl">
                        <div className="p-4 bg-red-300 rounded-2xl">
                            <span className="text-sm font-semibold text-red-700">
                                Kerjakan soal dengan teliti! Jika soal memiliki
                                gambar, gambar dapat diklik untuk diperbesar dan
                                dibaca dengan lebih jelas.
                            </span>
                        </div>

                        <div>
                            <ul className="mt-5 space-y-5">
                                {quiz.map((item, index) => (
                                    <li key={index}>
                                        <span className="text-base font-medium text-red-700">
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
                                                                        disabled
                                                                        type="radio"
                                                                        name={`answer-${item.id}`}
                                                                        value={
                                                                            filteredAnswer.id
                                                                        }
                                                                        id={filteredAnswer.id.toString()}
                                                                        className="text-red-700 border-gray-300"
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
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
