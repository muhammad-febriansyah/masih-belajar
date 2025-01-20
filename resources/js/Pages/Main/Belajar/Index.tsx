import { Datum, KelasType } from "@/types/kelas";
import { SectionType } from "@/types/section";
import { SettingType } from "@/types/setting";
import { VideoType } from "@/types/video";
import { Inertia } from "@inertiajs/inertia";
import { Head, Link, useForm } from "@inertiajs/react";
import {
    ArrowLeft,
    ArrowRight,
    Check,
    CheckCheck,
    Clock,
    File,
    Loader2,
    Pencil,
    PlayCircleIcon,
    Plus,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { route } from "ziggy-js";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { TestimoniType } from "@/types/testimoni";
import { Input } from "@/components/ui/input";
import { DiskusiType } from "@/types/diskusi";
import { BalasDiskusiType } from "@/types/balas_diskusi";

interface Props {
    setting: SettingType;
    kelas: Datum;
    sectionData: SectionType[];
    video: VideoType[];
    testimoni: TestimoniType[];
    diskusi: DiskusiType[];
    balasDiskusi: BalasDiskusiType[];
    averageRating: number;
    totalulasan: number;
    totalkelasmentor: number;
    totalsiswa: number;
}
export default function Index({
    setting,
    kelas,
    sectionData,
    video,
    testimoni,
    diskusi,
    balasDiskusi,
    averageRating,
    totalulasan,
    totalkelasmentor,
    totalsiswa,
}: Props) {
    const [selectedVideoUrl, setSelectedVideoUrl] = useState<string | null>(
        null
    );
    const [selectedVideoId, setSelectedVideoId] = useState<{
        sectionId: number;
        videoId: number;
    } | null>(null); // State untuk video aktif
    const [selectedVideoTitle, setSelectedVideoTitle] = useState<string | null>(
        null
    );
    const [activeSection, setActiveSection] = useState<string | null>(null); // State untuk menentukan section yang aktif
    const [sectionTitle, setSectionTitle] = useState<string | null>(null); // State untuk judul section
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false); // Dialog open state
    const [rating, setRating] = useState<number>(0); // To store the rating value (1 to 5)
    const [testimonial, setTestimonial] = useState<string>(""); // To store the testimonial text
    const [isLastVideo, setIsLastVideo] = useState<boolean>(false);
    const [readVideos, setReadVideos] = useState<
        { section_id: number; video_id: number }[]
    >([]);
    const [progress, setProgress] = useState<number>(0);
    const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [subject, setSubject] = useState<string | null>(null);
    const [image, setImage] = useState<File | null>(null);
    const [title, setTitle] = useState<string | null>(null);
    const [body, setBody] = useState<string>("");
    const [balas, setBalas] = useState<string>("");
    const diskusiIdRef = useRef<HTMLInputElement>(null); // Membuat ref untuk input hidden
    const [loading, setLoading] = useState<boolean>(false);
    const kelasId = kelas.id;
    const [selectedItem, setSelectedItem] = useState<Number | null>(null); // Menyimpan ID item yang sedang terbuka

    const { data, setData, post, processing, errors, reset } = useForm({
        rating: rating,
        kelasId: kelasId, // Misalnya kelasId adalah 1
        testimonial: "",
    });

    const handleVideoClick = (
        videoUrl: string,
        videoTitle: string,
        sectionId: number,
        videoId: number,
        sectionTitle: string
    ) => {
        setSelectedVideoUrl(videoUrl);
        setSelectedVideoTitle(videoTitle);
        setSelectedVideoId({ sectionId, videoId });
        setSectionTitle(sectionTitle);
        const lastVideo = video.reduce(
            (prev, current) => (current.id > prev.id ? current : prev),
            video[0]
        );
        if (videoId === lastVideo.id) {
            setIsLastVideo(true);
        } else {
            setIsLastVideo(false);
        }
    };

    const handleRatingClick = (value: number) => {
        setRating(value);
        setData("rating", value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            post(route("dashboard.sendTestimonial"), {
                onSuccess: () => {
                    toast.success("Testimonial berhasil dikirim!", {
                        position: "top-right",
                    });
                    setIsDialogOpen(false);
                },
                onError: () => {
                    toast.error(
                        "Terjadi kesalahan saat mengirim testimonial.",
                        {
                            position: "top-right",
                        }
                    );
                },
            });
        } catch (error) {
            toast.error("Terjadi kesalahan saat mengirim testimonial.", {
                position: "top-right",
            });
        }
    };

    const handleNextVideo = () => {
        if (selectedVideoId) {
            const currentSectionId = selectedVideoId.sectionId;
            const currentVideoId = selectedVideoId.videoId;
            const nextVideoIndex = video.findIndex(
                (vid) =>
                    (vid.section_id === currentSectionId &&
                        vid.id === currentVideoId + 1) ||
                    vid.section_id > currentSectionId // If it's the next section
            );

            if (nextVideoIndex !== -1) {
                const nextVideo = video[nextVideoIndex];
                setSelectedVideoUrl(nextVideo.url.embed_url);
                setSelectedVideoTitle(nextVideo.title);
                setSelectedVideoId({
                    sectionId: nextVideo.section_id,
                    videoId: nextVideo.id,
                });
                setActiveSection(nextVideo.section_id.toString()); // Update active section

                // Update status to "read" in the database if not already marked as read
                axios
                    .post(route("dashboard.videoRead"), {
                        section_id: nextVideo.section_id,
                        video_id: nextVideo.id,
                    })
                    .then((response) => {
                        // Pastikan video hanya ditambahkan ke `readVideos` jika belum ada
                        setReadVideos((prevReadVideos) => {
                            const videoAlreadyRead = prevReadVideos.some(
                                (video) =>
                                    video.section_id === nextVideo.section_id &&
                                    video.video_id === nextVideo.id
                            );
                            if (!videoAlreadyRead) {
                                return [
                                    ...prevReadVideos,
                                    {
                                        section_id: nextVideo.section_id,
                                        video_id: nextVideo.id,
                                    },
                                ];
                            }
                            return prevReadVideos;
                        });
                    })
                    .catch((error) => {
                        console.error(
                            "Error updating video read status:",
                            error
                        );
                    });

                // Check if the next video is the last video
                const lastVideo = video.reduce(
                    (prev, current) => (current.id > prev.id ? current : prev),
                    video[0]
                );

                if (nextVideo.id === lastVideo.id) {
                    setIsLastVideo(true); // If next video is the last video
                } else {
                    setIsLastVideo(false); // Not the last video
                }
            }
        }
    };

    const handlePreviousVideo = () => {
        if (selectedVideoId) {
            const currentSectionId = selectedVideoId.sectionId;
            const currentVideoId = selectedVideoId.videoId;

            // Cari video sebelumnya dalam section yang sama
            const previousVideoInSameSection = video
                .filter((vid) => vid.section_id === currentSectionId)
                .sort((a, b) => a.id - b.id) // Urutkan video berdasarkan ID (ascending)
                .reverse() // Balik urutan (descending) untuk mencari video sebelumnya
                .find((vid) => vid.id < currentVideoId); // Temukan video dengan ID lebih kecil

            // Jika video sebelumnya ditemukan, perbarui video yang diputar
            if (previousVideoInSameSection) {
                setSelectedVideoUrl(previousVideoInSameSection.url.embed_url);
                setSelectedVideoTitle(previousVideoInSameSection.title);
                setSelectedVideoId({
                    sectionId: previousVideoInSameSection.section_id,
                    videoId: previousVideoInSameSection.id,
                });
                setActiveSection(
                    previousVideoInSameSection.section_id.toString()
                );

                // Update status video yang dibaca di server
                axios
                    .post(route("dashboard.videoRead"), {
                        section_id: previousVideoInSameSection.section_id,
                        video_id: previousVideoInSameSection.id,
                    })
                    .then(() => {
                        setReadVideos((prevReadVideos) => {
                            const videoAlreadyRead = prevReadVideos.some(
                                (video) =>
                                    video.section_id ===
                                        previousVideoInSameSection.section_id &&
                                    video.video_id ===
                                        previousVideoInSameSection.id
                            );
                            if (!videoAlreadyRead) {
                                return [
                                    ...prevReadVideos,
                                    {
                                        section_id:
                                            previousVideoInSameSection.section_id,
                                        video_id: previousVideoInSameSection.id,
                                    },
                                ];
                            }
                            return prevReadVideos;
                        });
                    })
                    .catch((error) => {
                        console.error(
                            "Error updating video read status:",
                            error
                        );
                    });

                // Cek apakah video sebelumnya adalah video terakhir
                const lastVideoInSection = video
                    .filter(
                        (vid) =>
                            vid.section_id ===
                            previousVideoInSameSection.section_id
                    )
                    .sort((a, b) => a.id - b.id)
                    .pop(); // Ambil video terakhir dari section yang sama

                // Pastikan lastVideoInSection tidak undefined sebelum mengakses id-nya
                if (
                    lastVideoInSection &&
                    previousVideoInSameSection.id === lastVideoInSection.id
                ) {
                    setIsLastVideo(true); // Jika video sebelumnya adalah video terakhir
                } else {
                    setIsLastVideo(false);
                }
            } else {
                // Jika tidak ada video sebelumnya di section yang sama, cari video pertama di section sebelumnya
                const previousSectionVideo = video
                    .filter((vid) => vid.section_id < currentSectionId)
                    .sort((a, b) => a.section_id - b.section_id) // Urutkan berdasarkan section_id
                    .reverse() // Balik urutan section untuk mencari section sebelumnya
                    .find((vid) => vid.section_id < currentSectionId);

                if (previousSectionVideo) {
                    setSelectedVideoUrl(previousSectionVideo.url.embed_url);
                    setSelectedVideoTitle(previousSectionVideo.title);
                    setSelectedVideoId({
                        sectionId: previousSectionVideo.section_id,
                        videoId: previousSectionVideo.id,
                    });
                    setActiveSection(
                        previousSectionVideo.section_id.toString()
                    );

                    // Update status video yang dibaca di server
                    axios
                        .post(route("dashboard.videoRead"), {
                            section_id: previousSectionVideo.section_id,
                            video_id: previousSectionVideo.id,
                        })
                        .then(() => {
                            setReadVideos((prevReadVideos) => {
                                const videoAlreadyRead = prevReadVideos.some(
                                    (video) =>
                                        video.section_id ===
                                            previousSectionVideo.section_id &&
                                        video.video_id ===
                                            previousSectionVideo.id
                                );
                                if (!videoAlreadyRead) {
                                    return [
                                        ...prevReadVideos,
                                        {
                                            section_id:
                                                previousSectionVideo.section_id,
                                            video_id: previousSectionVideo.id,
                                        },
                                    ];
                                }
                                return prevReadVideos;
                            });
                        })
                        .catch((error) => {
                            console.error(
                                "Error updating video read status:",
                                error
                            );
                        });

                    // Cek apakah video sebelumnya adalah video terakhir di section yang lebih rendah
                    const lastVideoInPreviousSection = video
                        .filter(
                            (vid) =>
                                vid.section_id ===
                                previousSectionVideo.section_id
                        )
                        .sort((a, b) => a.id - b.id)
                        .pop(); // Ambil video terakhir di section yang lebih rendah

                    // Pastikan lastVideoInPreviousSection tidak undefined sebelum mengakses id-nya
                    if (
                        lastVideoInPreviousSection &&
                        previousSectionVideo.id ===
                            lastVideoInPreviousSection.id
                    ) {
                        setIsLastVideo(true); // Jika video sebelumnya adalah video terakhir
                    } else {
                        setIsLastVideo(false);
                    }
                }
            }
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const sendDiskusi = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        if (image) formData.append("image", image); // Kirim file image
        formData.append("subject", subject || "");
        formData.append("title", title || "");
        formData.append("body", body);
        formData.append("kelasId", kelas.id.toString()); // Ganti dengan id kelas yang sesuai

        try {
            await Inertia.post(route("dashboard.sendDiskusi"), formData, {
                onFinish: () => {
                    setLoading(false);
                    setIsDialogOpen(false);
                    toast.success("Pertanyaan berhasil dikirim!", {
                        position: "top-right",
                    });
                },
            });
        } catch (error) {
            console.error("Error sending diskusi:", error);
            setLoading(false);
        }
    };
    const sendBalasdiskusi = async (e: React.FormEvent) => {
        e.preventDefault();
        const diskusiId = diskusiIdRef.current?.value; // Mengambil nilai dari ref
        if (!diskusiId) {
            return;
        }
        const formData = new FormData();
        formData.append("diskusiId", diskusiId);
        formData.append("balas", balas);

        try {
            Inertia.post(route("dashboard.balasDiskusi"), formData, {
                onFinish: () => {
                    setLoading(false);
                    setIsDialogOpen(false);
                    toast.success("Balasan berhasil dikirim!", {
                        position: "top-right",
                    });
                },
            });
        } catch (error) {
            console.error("Error sending response:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        axios
            .get(route("dashboard.getReadVideos"))
            .then((response) => {
                const readVideosFromServer = response.data; // asumsikan response.data berisi video yang sudah dibaca
                setReadVideos(readVideosFromServer); // Update state `readVideos`
            })
            .catch((error) => {
                console.error("Error fetching read videos:", error);
            });
    }, []); // Hanya dijalankan sekali ketika halaman pertama kali dimuat

    // Update video yang dipilih berdasarkan indeks
    const currentVideo = video[currentVideoIndex];

    useEffect(() => {
        if (currentVideo) {
            setSelectedVideoUrl(currentVideo.url.embed_url);
            setSelectedVideoTitle(currentVideo.title);
            setSectionTitle(currentVideo.section.title);
            setSelectedVideoId({
                sectionId: currentVideo.section_id,
                videoId: currentVideo.id,
            });
            setActiveSection(currentVideo.section_id.toString());

            // Update status video yang diputar ke server
            axios
                .post(route("dashboard.videoRead"), {
                    section_id: currentVideo.section_id,
                    video_id: currentVideo.id,
                })
                .then((response) => {
                    setReadVideos((prevReadVideos) => {
                        const videoAlreadyRead = prevReadVideos.some(
                            (video) =>
                                video.section_id === currentVideo.section_id &&
                                video.video_id === currentVideo.id
                        );
                        if (!videoAlreadyRead) {
                            return [
                                ...prevReadVideos,
                                {
                                    section_id: currentVideo.section_id,
                                    video_id: currentVideo.id,
                                },
                            ];
                        }
                        return prevReadVideos;
                    });
                })
                .catch((error) => {
                    console.error("Error updating video read status:", error);
                });
        }
    }, [currentVideo]); // Update saat video yang dipilih berubah

    // Menghitung progress berdasarkan `readVideos`
    useEffect(() => {
        const totalVideos = video.length;
        const completedVideos = readVideos.length; // Video yang sudah dibaca
        const newProgress = (completedVideos / totalVideos) * 100;
        setProgress(newProgress);
    }, [readVideos, video.length]);

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
            <section className="">
                <div className="flex flex-col justify-between h-screen gap-5 lg:flex-row">
                    <div className="w-full hidden lg:block lg:w-[25%] px-2 py-5 bg-white rounded-2xl fixed top-0 left-0  ">
                        <Link
                            href={route("dashboard.kelassaya")}
                            className="flex items-center ml-2"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span className="ml-2">Kembali</span>
                        </Link>

                        <ScrollArea className="overflow-y-auto h-screen pt-5 pb-24 px-2.5">
                            {sectionData.map((section, index) => (
                                <div key={index} className="mt-5">
                                    <h3 className="font-medium">
                                        {section.title} ({section.videos_count})
                                    </h3>
                                    <ul>
                                        {video
                                            .filter(
                                                (vid) =>
                                                    vid.section_id ===
                                                    section.id
                                            ) // Filter video berdasarkan section
                                            .map(
                                                (filteredVideo, videoIndex) => (
                                                    <li
                                                        key={videoIndex}
                                                        className="flex flex-row items-center w-full px-2 py-3 gap-x-2"
                                                    >
                                                        <div
                                                            onClick={() =>
                                                                handleVideoClick(
                                                                    filteredVideo
                                                                        .url
                                                                        .embed_url,
                                                                    filteredVideo.title,
                                                                    filteredVideo.section_id,
                                                                    filteredVideo.id,
                                                                    filteredVideo
                                                                        .section
                                                                        .title
                                                                )
                                                            }
                                                            className={`flex flex-col md:flex-row group items-center justify-between w-full px-5 py-3 font-medium text-white transition-all duration-200 rounded-2xl cursor-pointer ${
                                                                selectedVideoId?.sectionId ===
                                                                    filteredVideo.section_id &&
                                                                selectedVideoId?.videoId ===
                                                                    filteredVideo.id
                                                                    ? "bg-maroon"
                                                                    : "bg-gray-200 hover:bg-maroon"
                                                            } gap-x-2`}
                                                        >
                                                            <div className="flex flex-col items-start gap-1.5 text-black group-hover:text-white">
                                                                <span
                                                                    className={`${
                                                                        selectedVideoId?.sectionId ===
                                                                            filteredVideo.section_id &&
                                                                        selectedVideoId?.videoId ===
                                                                            filteredVideo.id
                                                                            ? "text-white"
                                                                            : "text-gray-500 group-hover:text-white"
                                                                    }`}
                                                                >
                                                                    {videoIndex +
                                                                        1}
                                                                    .{" "}
                                                                    {
                                                                        filteredVideo.title
                                                                    }
                                                                </span>
                                                                <span
                                                                    className={`flex flex-row items-center gap-1  text-sm text-black ${
                                                                        selectedVideoId?.sectionId ===
                                                                            filteredVideo.section_id &&
                                                                        selectedVideoId?.videoId ===
                                                                            filteredVideo.id
                                                                            ? "text-white"
                                                                            : "text-gray-500 group-hover:text-white"
                                                                    }`}
                                                                >
                                                                    <Clock className="w-3.5 h-3.5" />{" "}
                                                                    {
                                                                        filteredVideo.duration
                                                                    }
                                                                </span>
                                                            </div>

                                                            {/* Display Check Icon if Status is 1 or if the video is in readVideos */}
                                                            {(filteredVideo.status ===
                                                                1 ||
                                                                readVideos.some(
                                                                    (video) =>
                                                                        video.section_id ===
                                                                            filteredVideo.section_id &&
                                                                        video.video_id ===
                                                                            filteredVideo.id
                                                                )) && (
                                                                <Check
                                                                    className={`w-5 h-5 ${
                                                                        selectedVideoId?.sectionId ===
                                                                            filteredVideo.section_id &&
                                                                        selectedVideoId?.videoId ===
                                                                            filteredVideo.id
                                                                            ? "bg-white text-maroon p-1"
                                                                            : "bg-maroon text-white p-1"
                                                                    } rounded-full`}
                                                                />
                                                            )}
                                                        </div>
                                                    </li>
                                                )
                                            )}
                                    </ul>
                                </div>
                            ))}
                        </ScrollArea>
                    </div>

                    {/* Konten utama */}
                    <div className="w-full lg:w-[75%] px-4 py-2 lg:px-8 lg:py-5  lg:ml-[26%]">
                        <div className="flex flex-col items-start gap-3 mt-10 mb-5 lg:justify-between lg:items-center lg:flex-row">
                            <h1 className="text-xl font-bold text-black lg:text-3xl">
                                {kelas.title}
                            </h1>
                            <div className="flex items-center gap-2">
                                <Dialog
                                    open={isDialogOpen}
                                    onOpenChange={(open) =>
                                        setIsDialogOpen(open)
                                    }
                                >
                                    <DialogTrigger>
                                        <Button
                                            type="button"
                                            className="rounded-full bg-maroon"
                                        >
                                            <Pencil /> Beri Ulasan
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>
                                                Berikan Rating seberapa bagus
                                                kelas ini 😊
                                            </DialogTitle>
                                            <DialogDescription>
                                                <form onSubmit={handleSubmit}>
                                                    <div className="my-5 space-y-5">
                                                        <div className="grid flex-1 gap-2">
                                                            <Label
                                                                htmlFor="link"
                                                                className="text-black"
                                                            >
                                                                Rating
                                                            </Label>
                                                            <div className="flex gap-2">
                                                                {[
                                                                    1, 2, 3, 4,
                                                                    5,
                                                                ].map(
                                                                    (star) => (
                                                                        <svg
                                                                            key={
                                                                                star
                                                                            }
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            viewBox="0 0 576 512"
                                                                            className={`w-5 h-5 cursor-pointer ${
                                                                                rating >=
                                                                                star
                                                                                    ? "text-yellow-400"
                                                                                    : "text-gray-300"
                                                                            }`}
                                                                            fill="currentColor"
                                                                            onClick={() =>
                                                                                handleRatingClick(
                                                                                    star
                                                                                )
                                                                            }
                                                                        >
                                                                            <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
                                                                        </svg>
                                                                    )
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="mb-4">
                                                            <label
                                                                htmlFor="testimonial"
                                                                className="block text-sm font-semibold text-gray-700"
                                                            >
                                                                Review
                                                            </label>
                                                            <Textarea
                                                                id="testimonial"
                                                                value={
                                                                    data.testimonial
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "testimonial",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                                                                placeholder="Write your testimonial here..."
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Submit Button */}
                                                    <div className="flex justify-end gap-2">
                                                        {processing ? (
                                                            <Button
                                                                disabled
                                                                className="rounded-full bg-maroon"
                                                            >
                                                                <Loader2 className="animate-spin" />
                                                                Tunggu
                                                                Sebentar...
                                                            </Button>
                                                        ) : (
                                                            <Button
                                                                type="submit"
                                                                className="rounded-full bg-maroon"
                                                            >
                                                                Kirim Review
                                                            </Button>
                                                        )}
                                                        <Button
                                                            onClick={() =>
                                                                setIsDialogOpen(
                                                                    false
                                                                )
                                                            } // Close the dialog
                                                            className="text-white bg-gray-500 rounded-full"
                                                        >
                                                            Batal
                                                        </Button>
                                                    </div>
                                                </form>
                                            </DialogDescription>
                                        </DialogHeader>
                                    </DialogContent>
                                </Dialog>
                                <Link
                                    href={route("dashboard.exam", kelas.slug)}
                                >
                                    <Button
                                        type="button"
                                        className="rounded-full bg-maroon"
                                    >
                                        <File /> Exam
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        {/* <span className="text-lg font-semibold text-black">
                            Progress Kelas
                        </span> */}
                        {/* <div className="mt-5 mb-10">
                            <span id="ProgressLabel" className="sr-only">
                                Loading
                            </span>

                            <span
                                role="progressbar"
                                aria-labelledby="ProgressLabel"
                                aria-valuenow={progress} // Gunakan progress sebagai nilai
                                className="relative block bg-gray-200 rounded-full"
                            >
                                <span className="absolute inset-0 flex items-center justify-center text-base">
                                    <span className="font-bold text-white">
                                        {Math.min(progress, 100)}%{" "}
                                    </span>
                                </span>

                                <span
                                    className="block text-center rounded-full bg-maroon h-7"
                                    style={{
                                        width: `${Math.min(progress, 100)}%`,
                                    }}
                                />
                            </span>
                        </div> */}

                        <div className="w-full p-5 bg-white rounded-2xl">
                            {selectedVideoUrl ? (
                                <>
                                    <div className="overflow-y-auto max-h-[500px]">
                                        <iframe
                                            className="w-full h-[300px] lg:h-[500px]  rounded-2xl"
                                            src={selectedVideoUrl}
                                            title="YouTube video player"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            referrerPolicy="strict-origin-when-cross-origin"
                                            allowFullScreen
                                        ></iframe>
                                    </div>

                                    {/* Konten di bawah iframe */}
                                    <div className="flex flex-col items-start justify-between gap-5 mt-5 lg:items-center lg:flex-row">
                                        <div className="flex flex-col gap-3">
                                            <h1 className="text-2xl font-semibold text-black">
                                                {selectedVideoTitle}
                                            </h1>
                                            <p className="text-sm text-gray-400">
                                                {kelas.title}
                                            </p>
                                        </div>
                                        <div className="flex gap-3">
                                            <Button
                                                onClick={handlePreviousVideo}
                                                className="rounded-full bg-maroon"
                                            >
                                                <ArrowLeft /> Sebelumnya
                                            </Button>
                                            {!isLastVideo && (
                                                <Button
                                                    onClick={handleNextVideo}
                                                    className="rounded-full bg-maroon"
                                                >
                                                    Lanjut <ArrowRight />
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <p>Pilih video untuk menampilkan di sini.</p>
                            )}
                        </div>
                        <Tabs
                            defaultValue="about"
                            className="items-start py-10"
                        >
                            <TabsList className="flex py-10 mb-5 space-x-2 overflow-x-auto overflow-y-hidden bg-transparent">
                                <TabsTrigger value="about">Tentang</TabsTrigger>
                                <TabsTrigger value="diskusi">
                                    Diskusi
                                </TabsTrigger>
                                <TabsTrigger value="mentor">Mentor</TabsTrigger>
                                <TabsTrigger value="ulasan">Ulasan</TabsTrigger>
                            </TabsList>
                            <TabsContent
                                value="about"
                                className="p-5 bg-white rounded-2xl"
                            >
                                <p
                                    className="text-sm text-black"
                                    dangerouslySetInnerHTML={{
                                        __html: kelas.body,
                                    }}
                                />
                            </TabsContent>
                            <TabsContent value="diskusi">
                                <h3 className="text-xl font-bold">Diskusi</h3>
                                <Dialog>
                                    <DialogTrigger>
                                        <Button className="mt-5 mb-5 rounded-full bg-maroon">
                                            <Plus /> Form Diskusi
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-h-[90vh] overflow-y-auto">
                                        <DialogHeader>
                                            <DialogTitle>
                                                Form Diskusi
                                            </DialogTitle>
                                            <DialogDescription className="overflow-y-auto">
                                                <form onSubmit={sendDiskusi}>
                                                    <div className="my-5 space-y-5">
                                                        <div className="grid items-center w-full gap-3">
                                                            <label
                                                                htmlFor="judul"
                                                                className="block text-sm font-semibold text-gray-700"
                                                            >
                                                                Judul
                                                            </label>
                                                            <Input
                                                                value={
                                                                    title || ""
                                                                }
                                                                onChange={(e) =>
                                                                    setTitle(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                required
                                                                placeholder="Masukkan judul diskusi"
                                                            />
                                                        </div>
                                                        <div className="mb-4">
                                                            <label
                                                                htmlFor="subject"
                                                                className="block text-sm font-semibold text-gray-700"
                                                            >
                                                                Subject
                                                            </label>
                                                            <Input
                                                                required
                                                                value={
                                                                    subject ||
                                                                    ""
                                                                }
                                                                onChange={(e) =>
                                                                    setSubject(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                                                                placeholder="Masukkan subject diskusi"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label
                                                                htmlFor="body"
                                                                className="block text-sm font-semibold text-gray-700"
                                                            >
                                                                Keterangan
                                                            </label>
                                                            <Textarea
                                                                id="testimonial"
                                                                value={
                                                                    body || ""
                                                                }
                                                                onChange={(e) =>
                                                                    setBody(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                                                                placeholder="Masukkan keterangan diskusi"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label
                                                                htmlFor="image"
                                                                className="block mb-5 text-sm font-semibold text-gray-700"
                                                            >
                                                                Upload
                                                                Foto/Gambar
                                                                (Optional)
                                                            </label>
                                                            {imagePreview && (
                                                                <div className="flex justify-center mt-3 mb-5">
                                                                    <img
                                                                        src={
                                                                            imagePreview
                                                                        }
                                                                        alt="Image Preview"
                                                                        className="object-cover w-72 h-52 rounded-2xl" // Customize the size and styling as needed
                                                                    />
                                                                </div>
                                                            )}
                                                            <div className="flex justify-center">
                                                                <Input
                                                                    type="file"
                                                                    id="image"
                                                                    accept="image/*"
                                                                    onChange={
                                                                        handleFileChange
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Submit Button */}
                                                    <div className="flex justify-end gap-2">
                                                        {loading ? (
                                                            <Button
                                                                disabled
                                                                className="rounded-full bg-maroon"
                                                            >
                                                                <Loader2 className="animate-spin" />
                                                                Tunggu
                                                                Sebentar...
                                                            </Button>
                                                        ) : (
                                                            <Button
                                                                type="submit"
                                                                className="rounded-full bg-maroon"
                                                            >
                                                                Kirim Pertanyaan
                                                            </Button>
                                                        )}
                                                        <Button
                                                            type="button"
                                                            onClick={() =>
                                                                setIsDialogOpen(
                                                                    false
                                                                )
                                                            } // Close the dialog
                                                            className="text-white bg-gray-500 rounded-full"
                                                        >
                                                            Batal
                                                        </Button>
                                                    </div>
                                                </form>
                                            </DialogDescription>
                                        </DialogHeader>
                                    </DialogContent>
                                </Dialog>
                                {diskusi.length > 0 ? (
                                    <div className="flex flex-col gap-5 mt-10">
                                        {diskusi.map((disk) => (
                                            <div
                                                key={disk.id}
                                                className="flex flex-col items-start gap-5 p-8 bg-white rounded-2xl"
                                            >
                                                {disk.image && (
                                                    <Dialog>
                                                        <DialogTrigger>
                                                            <img
                                                                src={`/storage/${disk.image}`}
                                                                alt=""
                                                                className="object-cover w-64 h-40 rounded-2xl"
                                                            />
                                                        </DialogTrigger>
                                                        <DialogContent>
                                                            <DialogHeader>
                                                                <DialogDescription>
                                                                    <img
                                                                        src={`/storage/${disk.image}`}
                                                                        alt=""
                                                                        className="object-cover size-full rounded-2xl"
                                                                    />
                                                                </DialogDescription>
                                                            </DialogHeader>
                                                        </DialogContent>
                                                    </Dialog>
                                                )}
                                                <h5 className="text-xl font-medium text-black">
                                                    {disk.title}
                                                </h5>
                                                <p className="text-sm leading-relaxed text-gray-500 ">
                                                    {disk.body}
                                                </p>
                                                <div className="flex flex-col items-center justify-between w-full gap-5 md:flex-row">
                                                    {disk.user.image ? (
                                                        <div className="relative flex items-center gap-2 cursor-pointer group">
                                                            <img
                                                                src={`/storage/${disk.user.image}`}
                                                                className="rounded-full size-10"
                                                                alt=""
                                                            />
                                                            <span className="text-sm font-medium text-black ">
                                                                {disk.user.name}
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <div className="relative flex items-center gap-2 cursor-pointer group">
                                                            <img
                                                                src="/default-avatar.svg"
                                                                className="rounded-full size-10"
                                                                alt=""
                                                            />
                                                            <span className="text-sm font-medium text-black ">
                                                                {disk.user.name}
                                                            </span>
                                                        </div>
                                                    )}
                                                    <div className="flex flex-row items-center gap-5">
                                                        <Dialog>
                                                            <DialogTrigger>
                                                                <span className="text-base font-semibold cursor-pointer text-maroon hover:underline">
                                                                    Balas
                                                                </span>
                                                            </DialogTrigger>
                                                            <DialogContent>
                                                                <DialogHeader>
                                                                    <DialogTitle>
                                                                        Balas
                                                                        Pertanyaan
                                                                    </DialogTitle>
                                                                    <DialogDescription>
                                                                        <form
                                                                            onSubmit={
                                                                                sendBalasdiskusi
                                                                            }
                                                                        >
                                                                            <div className="my-10">
                                                                                <label
                                                                                    htmlFor="balasan"
                                                                                    className="block text-sm font-semibold text-gray-700"
                                                                                >
                                                                                    Balasan
                                                                                </label>
                                                                                <input
                                                                                    type="hidden"
                                                                                    ref={
                                                                                        diskusiIdRef
                                                                                    }
                                                                                    value={
                                                                                        disk.id
                                                                                    } // Memastikan nilai disk.id
                                                                                />

                                                                                <Textarea
                                                                                    id="balasan"
                                                                                    value={
                                                                                        balas ||
                                                                                        ""
                                                                                    }
                                                                                    onChange={(
                                                                                        e
                                                                                    ) =>
                                                                                        setBalas(
                                                                                            e
                                                                                                .target
                                                                                                .value
                                                                                        )
                                                                                    }
                                                                                    className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                                                                                    placeholder="Ketikkan balasan disini..."
                                                                                />
                                                                            </div>
                                                                            <div className="flex justify-end gap-2">
                                                                                {loading ? (
                                                                                    <Button
                                                                                        disabled
                                                                                        className="rounded-full bg-maroon"
                                                                                    >
                                                                                        <Loader2 className="animate-spin" />
                                                                                        Tunggu
                                                                                        Sebentar...
                                                                                    </Button>
                                                                                ) : (
                                                                                    <Button
                                                                                        type="submit"
                                                                                        className="rounded-full bg-maroon"
                                                                                    >
                                                                                        Kirim
                                                                                        Pertanyaan
                                                                                    </Button>
                                                                                )}
                                                                                <Button
                                                                                    type="button"
                                                                                    onClick={() =>
                                                                                        setIsDialogOpen(
                                                                                            false
                                                                                        )
                                                                                    } // Close the dialog
                                                                                    className="text-white bg-gray-500 rounded-full"
                                                                                >
                                                                                    Batal
                                                                                </Button>
                                                                            </div>
                                                                        </form>
                                                                    </DialogDescription>
                                                                </DialogHeader>
                                                            </DialogContent>
                                                        </Dialog>

                                                        <Dialog>
                                                            <DialogTrigger>
                                                                <span className="text-base font-semibold cursor-pointer text-maroon hover:underline">
                                                                    Lihat
                                                                    Balasan
                                                                </span>
                                                            </DialogTrigger>
                                                            <DialogContent>
                                                                <DialogHeader>
                                                                    <DialogTitle>
                                                                        Jawaban
                                                                    </DialogTitle>
                                                                    <DialogDescription
                                                                        className="space-y-5 overflow-y-auto max-h-96" // Menambahkan scroll pada konten
                                                                    >
                                                                        {balasDiskusi.filter(
                                                                            (
                                                                                balasan
                                                                            ) =>
                                                                                balasan.diskusi_id ===
                                                                                disk.id
                                                                        )
                                                                            .length >
                                                                        0 ? (
                                                                            balasDiskusi
                                                                                .filter(
                                                                                    (
                                                                                        balasan
                                                                                    ) =>
                                                                                        balasan.diskusi_id ===
                                                                                        disk.id
                                                                                )
                                                                                .map(
                                                                                    (
                                                                                        balasan,
                                                                                        index
                                                                                    ) => (
                                                                                        <div
                                                                                            key={
                                                                                                index
                                                                                            }
                                                                                            className="p-5 mx-3 mt-5 bg-white border-2 border-maroon rounded-2xl"
                                                                                        >
                                                                                            {disk
                                                                                                .user
                                                                                                .image ? (
                                                                                                <div className="flex items-center gap-2 mb-5 cursor-pointer group">
                                                                                                    <img
                                                                                                        src={`/storage/${balasan.user.image}`}
                                                                                                        className="rounded-full size-10"
                                                                                                        alt=""
                                                                                                    />
                                                                                                    <span className="text-sm font-medium text-black">
                                                                                                        {
                                                                                                            balasan
                                                                                                                .user
                                                                                                                .name
                                                                                                        }
                                                                                                    </span>
                                                                                                </div>
                                                                                            ) : (
                                                                                                <div className="flex items-center gap-2 mb-5 cursor-pointer group">
                                                                                                    <img
                                                                                                        src="/default-avatar.svg"
                                                                                                        className="rounded-full size-10"
                                                                                                        alt=""
                                                                                                    />
                                                                                                    <span className="text-sm font-medium text-black">
                                                                                                        {
                                                                                                            balasan
                                                                                                                .user
                                                                                                                .name
                                                                                                        }
                                                                                                    </span>
                                                                                                </div>
                                                                                            )}
                                                                                            <p className="text-sm leading-relaxed text-black">
                                                                                                {
                                                                                                    balasan.body
                                                                                                }
                                                                                            </p>
                                                                                        </div>
                                                                                    )
                                                                                )
                                                                        ) : (
                                                                            <div className="flex flex-col items-center justify-center w-full col-span-2 p-5 bg-white gap-y-10 h-min rounded-2xl">
                                                                                <img
                                                                                    src="/nodata.svg"
                                                                                    className="object-cover size-32"
                                                                                    alt=""
                                                                                />
                                                                                <span className="text-base font-bold text-black transition-all duration-200 md:text-xl hover:text-biru">
                                                                                    Belum
                                                                                    ada
                                                                                    jawaban.
                                                                                </span>
                                                                            </div>
                                                                        )}
                                                                    </DialogDescription>
                                                                </DialogHeader>
                                                            </DialogContent>
                                                        </Dialog>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center w-full col-span-2 p-5 bg-white gap-y-10 h-min rounded-2xl">
                                        <img
                                            src="/nodata.svg"
                                            className="object-cover size-32"
                                            alt=""
                                        />
                                        <span className="text-base font-bold text-black transition-all duration-200 md:text-xl hover:text-biru">
                                            Belum ada diskusi...
                                        </span>
                                    </div>
                                )}
                            </TabsContent>
                            <TabsContent value="mentor">
                                <div className="p-5 mt-10 space-y-5 bg-white rounded-2xl">
                                    <div className="flex flex-col items-center justify-center gap-5 md:justify-start md:items-start md:flex-row">
                                        {kelas.user.image ? (
                                            <img
                                                src={`/storage/${kelas.user.image}`}
                                                alt="User Avatar"
                                                className="object-cover w-16 h-16 rounded-full"
                                            />
                                        ) : (
                                            <img
                                                src="/default-avatar.svg"
                                                className="object-cover w-20 h-20 rounded-full"
                                                alt="Laki-laki Avatar"
                                            />
                                        )}
                                        <div className="flex flex-col">
                                            <h1 className="text-xl font-bold text-black lg:text-2xl">
                                                {kelas.user.name}
                                            </h1>
                                            <div className="flex flex-col mt-3">
                                                <div className="flex items-center gap-2">
                                                    <img
                                                        src="/icon-mentor/23.svg"
                                                        alt=""
                                                        className="w-5 h-5"
                                                    />
                                                    <span className="text-base font-medium text-black">
                                                        {averageRating} Rating
                                                        Mentor
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <img
                                                        src="/icon-mentor/24.svg"
                                                        alt=""
                                                        className="w-5 h-5"
                                                    />
                                                    <span className="text-base font-medium text-black">
                                                        {totalulasan} Ulasan
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <img
                                                        src="/icon-mentor/25.svg"
                                                        alt=""
                                                        className="w-5 h-5"
                                                    />
                                                    <span className="text-base font-medium text-black">
                                                        {totalsiswa} Siswa
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <img
                                                        src="/icon-mentor/26.svg"
                                                        alt=""
                                                        className="w-5 h-5"
                                                    />
                                                    <span className="text-base font-medium text-black">
                                                        {totalkelasmentor} Kusus
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <p
                                        className="hidden text-sm leading-relaxed text-gray-500 md:block "
                                        dangerouslySetInnerHTML={{
                                            __html: kelas.user.bio,
                                        }}
                                    />
                                </div>
                            </TabsContent>
                            <TabsContent value="ulasan">
                                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                                    {testimoni.length > 0 ? (
                                        testimoni.map((testimoni, index) => (
                                            <div
                                                className="p-5 bg-white rounded-2xl"
                                                key={index}
                                            >
                                                <div className="flex items-center space-x-3">
                                                    {testimoni.user.image !=
                                                    null ? (
                                                        <img
                                                            src={`/storage/${testimoni.user.image}`}
                                                            className="object-cover w-16 h-16 rounded-full"
                                                            alt=""
                                                        />
                                                    ) : (
                                                        <img
                                                            src="/default-avatar.svg"
                                                            className="object-cover w-16 h-16 rounded-full"
                                                            alt=""
                                                        />
                                                    )}
                                                    <div className="flex flex-col mt-2 gap-y-1">
                                                        <h1 className="text-lg font-semibold text-black line-clamp-2">
                                                            {
                                                                testimoni.user
                                                                    .name
                                                            }
                                                        </h1>
                                                        <span className="text-sm text-gray-500 underline">
                                                            Student
                                                        </span>
                                                    </div>
                                                </div>
                                                <p className="mt-5 text-base text-black">
                                                    {testimoni.body}
                                                </p>
                                                <div className="flex items-center justify-start mt-10 bg-white">
                                                    {Array.from(
                                                        { length: 5 },
                                                        (_, index) => (
                                                            <svg
                                                                key={index}
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 576 512"
                                                                fill="currentColor"
                                                                className={`w-5 h-5 ${
                                                                    Number(
                                                                        testimoni.rating
                                                                    ) > index
                                                                        ? "text-yellow-400"
                                                                        : "text-gray-300"
                                                                }`}
                                                            >
                                                                <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
                                                            </svg>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="flex flex-col items-center justify-center w-full col-span-2 p-5 bg-white gap-y-10 h-min rounded-2xl">
                                            <img
                                                src="/nodata.svg"
                                                className="object-cover size-32"
                                                alt=""
                                            />
                                            <span className="text-base font-bold text-black transition-all duration-200 md:text-xl hover:text-biru">
                                                Belum ada review...
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </section>
        </>
    );
}
