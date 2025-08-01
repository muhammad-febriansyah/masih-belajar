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
    Eye,
    File,
    Loader2,
    Pencil,
    PlayCircleIcon,
    Plus,
    Star,
    Users,
    BookOpen,
    Trophy,
    MessageCircle,
    User,
    ChevronDown,
    ChevronUp,
    Award,
    Calendar,
} from "lucide-react";
import React, {
    useEffect,
    useRef,
    useState,
    useCallback,
    useMemo,
} from "react";
import { toast } from "sonner";
import { route } from "ziggy-js";
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
import { VideoReaderType } from "@/types/video_reader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Props {
    setting: SettingType;
    kelas: Datum;
    sectionData: SectionType[];
    video: VideoType[];
    videoRead: VideoReaderType[];
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
    videoRead,
}: Props) {
    const [selectedVideo, setSelectedVideo] = useState<VideoType | null>(null);
    const [selectedVideoId, setSelectedVideoId] = useState<{
        sectionId: number;
        videoId: number;
    } | null>(null);
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [rating, setRating] = useState<number>(0);
    const [isLastVideo, setIsLastVideo] = useState<boolean>(false);
    const [watchedVideos, setWatchedVideos] = useState<Set<number>>(new Set());
    const [progress, setProgress] = useState<number>(0);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [subject, setSubject] = useState<string | null>(null);
    const [image, setImage] = useState<File | null>(null);
    const [title, setTitle] = useState<string | null>(null);
    const [body, setBody] = useState<string>("");
    const [balas, setBalas] = useState<string>("");
    const [expandedSections, setExpandedSections] = useState<Set<number>>(
        new Set()
    );
    const diskusiIdRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const kelasId = kelas.id;

    const { data, setData, post, processing, errors, reset } = useForm({
        rating: rating,
        kelasId: kelasId,
        testimonial: "",
    });

    const toggleSection = (sectionId: number) => {
        const newExpanded = new Set(expandedSections);
        if (newExpanded.has(sectionId)) {
            newExpanded.delete(sectionId);
        } else {
            newExpanded.add(sectionId);
        }
        setExpandedSections(newExpanded);
    };

    const calculateProgress = useCallback(() => {
        if (video.length === 0) return 0;
        return Math.round((watchedVideos.size / video.length) * 100);
    }, [video.length, watchedVideos.size]);

    const markVideoAsWatched = async (videoId: number, sectionId: number) => {
        if (watchedVideos.has(videoId)) {
            return { success: true, alreadyWatched: true };
        }

        setIsProcessing(true);
        try {
            const response = await axios.post(route("dashboard.videoRead"), {
                section_id: sectionId,
                video_id: videoId,
            });

            if (response.data.success) {
                setWatchedVideos((prev) => {
                    const newWatched = new Set(prev);
                    newWatched.add(videoId);
                    return newWatched;
                });

                const newProgress = Math.round(
                    ((watchedVideos.size + 1) / video.length) * 100
                );
                setProgress(newProgress);

                if (!response.data.already_watched) {
                    toast.success("Video ditandai selesai!", {
                        position: "top-right",
                        duration: 2000,
                    });
                }

                return {
                    success: true,
                    alreadyWatched: response.data.already_watched,
                };
            }
            return { success: false, message: response.data.message };
        } catch (error) {
            console.error("Error marking video as watched:", error);
            return { success: false, message: "Network error" };
        } finally {
            setIsProcessing(false);
        }
    };

    const handleVideoClick = async (clickedVideo: VideoType) => {
        setSelectedVideo(clickedVideo);
        setSelectedVideoId({
            sectionId: clickedVideo.section_id,
            videoId: clickedVideo.id,
        });

        setExpandedSections((prev) => {
            const newExpanded = new Set(prev);
            newExpanded.add(clickedVideo.section_id);
            return newExpanded;
        });

        const lastVideoInList = video[video.length - 1];
        setIsLastVideo(clickedVideo.id === lastVideoInList?.id);

        await markVideoAsWatched(clickedVideo.id, clickedVideo.section_id);
    };

    const handleNextVideo = async () => {
        if (!selectedVideo) return;

        const currentIndex = video.findIndex((v) => v.id === selectedVideo.id);
        if (currentIndex < video.length - 1) {
            const nextVideo = video[currentIndex + 1];
            await handleVideoClick(nextVideo);
        }
    };

    const handlePreviousVideo = async () => {
        if (!selectedVideo) return;

        const currentIndex = video.findIndex((v) => v.id === selectedVideo.id);
        if (currentIndex > 0) {
            const prevVideo = video[currentIndex - 1];
            await handleVideoClick(prevVideo);
        }
    };

    const allVideosWatched = useMemo(() => {
        return (
            video.length > 0 &&
            video.every((videoItem) => watchedVideos.has(videoItem.id))
        );
    }, [video, watchedVideos]);

    useEffect(() => {
        const initialWatchedVideos = new Set(
            videoRead.map((read) => Number(read.video_id))
        );
        setWatchedVideos(initialWatchedVideos);

        const initialProgress =
            video.length > 0
                ? Math.round((initialWatchedVideos.size / video.length) * 100)
                : 0;
        setProgress(initialProgress);

        if (video.length > 0 && !selectedVideo) {
            const firstVideo = video[0];
            setSelectedVideo(firstVideo);
            setSelectedVideoId({
                sectionId: firstVideo.section_id,
                videoId: firstVideo.id,
            });

            if (!initialWatchedVideos.has(firstVideo.id)) {
                markVideoAsWatched(firstVideo.id, firstVideo.section_id);
            }
        }

        if (sectionData.length > 0) {
            const sectionsToExpand = new Set<number>();
            if (video.length > 0) {
                const firstVideo = video[0];
                sectionsToExpand.add(firstVideo.section_id);
            }
            sectionData.forEach((section) => {
                sectionsToExpand.add(section.id);
            });
            setExpandedSections(sectionsToExpand);
        }
    }, [video, videoRead, sectionData]);

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
        if (image) formData.append("image", image);
        formData.append("subject", subject || "");
        formData.append("title", title || "");
        formData.append("body", body);
        formData.append("kelasId", kelas.id.toString());

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
            setLoading(false);
        }
    };

    const sendBalasdiskusi = async (e: React.FormEvent) => {
        e.preventDefault();
        const diskusiId = diskusiIdRef.current?.value;
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
            setLoading(false);
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

            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
                <div className="flex h-screen">
                    <div className="hidden lg:block w-80 bg-white shadow-xl border-r border-gray-200 fixed left-0 top-0 h-full">
                        <div className="p-6 border-b border-gray-100">
                            <Link
                                href={route("dashboard.kelassaya")}
                                className="flex items-center text-gray-600 hover:text-maroon transition-colors group"
                            >
                                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                                <span className="ml-2 font-medium">
                                    Kembali ke Kelas
                                </span>
                            </Link>
                        </div>

                        <div className="p-6 bg-gradient-to-r from-maroon to-red-600 text-white">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="font-semibold">
                                    Progress Belajar
                                </h3>
                                <Badge
                                    variant="secondary"
                                    className="bg-white/20 text-white"
                                >
                                    {progress}%
                                </Badge>
                            </div>
                            <Progress
                                value={progress}
                                className="h-2 bg-white/20"
                            />
                            <p className="text-sm mt-2 text-white/90">
                                {watchedVideos.size} dari {video.length} video
                                selesai
                            </p>
                            {isProcessing && (
                                <p className="text-xs mt-1 text-white/80 flex items-center">
                                    <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                                    Menyimpan progress...
                                </p>
                            )}
                        </div>

                        <ScrollArea className="h-[calc(100vh-280px)] px-4 py-4">
                            <div className="space-y-4">
                                {sectionData.map((section, index) => (
                                    <Card
                                        key={section.id}
                                        className="border border-gray-200 shadow-sm"
                                    >
                                        <CardHeader
                                            className="pb-3 cursor-pointer hover:bg-gray-50 transition-colors"
                                            onClick={() =>
                                                toggleSection(section.id)
                                            }
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-8 h-8 bg-maroon text-white rounded-lg flex items-center justify-center text-sm font-semibold">
                                                        {index + 1}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold text-gray-900 text-sm">
                                                            {section.title}
                                                        </h4>
                                                        <p className="text-xs text-gray-500">
                                                            {
                                                                section.videos_count
                                                            }{" "}
                                                            video
                                                        </p>
                                                    </div>
                                                </div>
                                                {expandedSections.has(
                                                    section.id
                                                ) ? (
                                                    <ChevronUp className="w-4 h-4 text-gray-400" />
                                                ) : (
                                                    <ChevronDown className="w-4 h-4 text-gray-400" />
                                                )}
                                            </div>
                                        </CardHeader>

                                        {expandedSections.has(section.id) && (
                                            <CardContent className="pt-0 space-y-2">
                                                {video
                                                    .filter(
                                                        (vid) =>
                                                            vid.section_id ===
                                                            section.id
                                                    )
                                                    .map(
                                                        (
                                                            filteredVideo,
                                                            videoIndex
                                                        ) => {
                                                            const isWatched =
                                                                watchedVideos.has(
                                                                    filteredVideo.id
                                                                );
                                                            const isActive =
                                                                selectedVideoId?.sectionId ===
                                                                    filteredVideo.section_id &&
                                                                selectedVideoId?.videoId ===
                                                                    filteredVideo.id;

                                                            return (
                                                                <div
                                                                    key={
                                                                        filteredVideo.id
                                                                    }
                                                                    onClick={() =>
                                                                        handleVideoClick(
                                                                            filteredVideo
                                                                        )
                                                                    }
                                                                    className={`p-3 rounded-lg cursor-pointer transition-all duration-200 group ${
                                                                        isActive
                                                                            ? "bg-maroon text-white shadow-md"
                                                                            : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                                                                    }`}
                                                                >
                                                                    <div className="flex items-center justify-between">
                                                                        <div className="flex-1 min-w-0">
                                                                            <h5
                                                                                className={`text-sm font-medium truncate ${
                                                                                    isActive
                                                                                        ? "text-white"
                                                                                        : "text-gray-900"
                                                                                }`}
                                                                            >
                                                                                {videoIndex +
                                                                                    1}
                                                                                .{" "}
                                                                                {
                                                                                    filteredVideo.title
                                                                                }
                                                                            </h5>
                                                                            <div
                                                                                className={`flex items-center mt-1 text-xs ${
                                                                                    isActive
                                                                                        ? "text-white/80"
                                                                                        : "text-gray-500"
                                                                                }`}
                                                                            >
                                                                                <Clock className="w-3 h-3 mr-1" />
                                                                                {
                                                                                    filteredVideo.duration
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                        {isWatched && (
                                                                            <div
                                                                                className={`ml-2 p-1 rounded-full ${
                                                                                    isActive
                                                                                        ? "bg-white/20"
                                                                                        : "bg-green-100"
                                                                                }`}
                                                                            >
                                                                                <CheckCheck
                                                                                    className={`w-4 h-4 ${
                                                                                        isActive
                                                                                            ? "text-white"
                                                                                            : "text-green-600"
                                                                                    }`}
                                                                                />
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                            </CardContent>
                                        )}
                                    </Card>
                                ))}

                                {allVideosWatched && (
                                    <Link
                                        href={route(
                                            "dashboard.exam",
                                            kelas.slug
                                        )}
                                    >
                                        <Card className="border-2 border-maroon bg-gradient-to-r from-maroon to-red-600 text-white cursor-pointer hover:shadow-lg transition-all duration-200">
                                            <CardContent className="p-4">
                                                <div className="flex items-center space-x-3">
                                                    <Award className="w-6 h-6" />
                                                    <div>
                                                        <h4 className="font-semibold">
                                                            Ujian Final
                                                        </h4>
                                                        <p className="text-sm text-white/80">
                                                            Kerjakan ujian untuk
                                                            menyelesaikan kursus
                                                        </p>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                )}
                            </div>
                        </ScrollArea>
                    </div>

                    <div className="flex-1 lg:ml-80 p-6">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 bg-white rounded-2xl p-6 shadow-sm">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                    {kelas.title}
                                </h1>
                                <div className="flex items-center space-x-4 text-sm text-gray-600">
                                    <div className="flex items-center">
                                        <Users className="w-4 h-4 mr-1" />
                                        {totalsiswa} siswa
                                    </div>
                                    <div className="flex items-center">
                                        <Star className="w-4 h-4 mr-1 text-yellow-500" />
                                        {averageRating} rating
                                    </div>
                                    <div className="flex items-center">
                                        <BookOpen className="w-4 h-4 mr-1" />
                                        {video.length} video
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-3 mt-4 lg:mt-0">
                                <Dialog
                                    open={isDialogOpen}
                                    onOpenChange={setIsDialogOpen}
                                >
                                    <DialogTrigger asChild>
                                        <Button className="bg-gradient-to-r from-maroon to-red-600 hover:from-red-600 hover:to-maroon text-white shadow-lg">
                                            <Star className="w-4 h-4 mr-2" />
                                            Beri Ulasan
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[500px]">
                                        <DialogHeader>
                                            <DialogTitle className="flex items-center">
                                                <Star className="w-5 h-5 mr-2 text-yellow-500" />
                                                Berikan Rating & Ulasan
                                            </DialogTitle>
                                            <DialogDescription>
                                                Bagikan pengalaman belajar Anda
                                                dengan memberikan rating dan
                                                ulasan
                                            </DialogDescription>
                                        </DialogHeader>
                                        <form
                                            onSubmit={handleSubmit}
                                            className="space-y-6"
                                        >
                                            <div>
                                                <Label className="text-sm font-semibold text-gray-700 mb-3 block">
                                                    Rating Kursus
                                                </Label>
                                                <div className="flex gap-2">
                                                    {[1, 2, 3, 4, 5].map(
                                                        (star) => (
                                                            <Star
                                                                key={star}
                                                                className={`w-8 h-8 cursor-pointer transition-colors ${
                                                                    rating >=
                                                                    star
                                                                        ? "text-yellow-400 fill-yellow-400"
                                                                        : "text-gray-300 hover:text-yellow-300"
                                                                }`}
                                                                onClick={() =>
                                                                    handleRatingClick(
                                                                        star
                                                                    )
                                                                }
                                                            />
                                                        )
                                                    )}
                                                </div>
                                            </div>

                                            <div>
                                                <Label
                                                    htmlFor="testimonial"
                                                    className="text-sm font-semibold text-gray-700"
                                                >
                                                    Ulasan Anda
                                                </Label>
                                                <Textarea
                                                    id="testimonial"
                                                    value={data.testimonial}
                                                    onChange={(e) =>
                                                        setData(
                                                            "testimonial",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="mt-2 min-h-[120px]"
                                                    placeholder="Ceritakan pengalaman belajar Anda di kursus ini..."
                                                />
                                            </div>

                                            <div className="flex justify-end gap-3 pt-4">
                                                <DialogClose asChild>
                                                    <Button
                                                        variant="outline"
                                                        type="button"
                                                    >
                                                        Batal
                                                    </Button>
                                                </DialogClose>
                                                <Button
                                                    type="submit"
                                                    disabled={processing}
                                                    className="bg-gradient-to-r from-maroon to-red-600"
                                                >
                                                    {processing ? (
                                                        <>
                                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                            Mengirim...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Star className="w-4 h-4 mr-2" />
                                                            Kirim Ulasan
                                                        </>
                                                    )}
                                                </Button>
                                            </div>
                                        </form>
                                    </DialogContent>
                                </Dialog>

                                {allVideosWatched && (
                                    <Link
                                        href={route(
                                            "dashboard.exam",
                                            kelas.slug
                                        )}
                                    >
                                        <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-emerald-600 hover:to-green-600 text-white shadow-lg">
                                            <Trophy className="w-4 h-4 mr-2" />
                                            Mulai Ujian
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        </div>

                        <Card className="mb-8 shadow-lg overflow-hidden">
                            <CardContent className="p-0">
                                {selectedVideo ? (
                                    <>
                                        <div className="relative w-full h-[400px] lg:h-[500px] bg-black rounded-t-xl overflow-hidden">
                                            {selectedVideo.type === "youtube" &&
                                                selectedVideo.url
                                                    ?.embed_url && (
                                                    <iframe
                                                        width="100%"
                                                        height="100%"
                                                        src={
                                                            selectedVideo.url
                                                                .embed_url
                                                        }
                                                        title="YouTube video player"
                                                        frameBorder="0"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                        referrerPolicy="strict-origin-when-cross-origin"
                                                        allowFullScreen
                                                    />
                                                )}
                                            {selectedVideo.type ===
                                                "google_drive" &&
                                                selectedVideo.url_drive && (
                                                    <div className="flex items-center justify-center h-full">
                                                        <a
                                                            href={
                                                                selectedVideo.url_drive
                                                            }
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="group"
                                                        >
                                                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center group-hover:bg-white/20 transition-all">
                                                                <Eye className="w-12 h-12 text-white mx-auto mb-4" />
                                                                <h3 className="text-white text-xl font-semibold mb-2">
                                                                    Buka Materi
                                                                </h3>
                                                                <p className="text-white/80">
                                                                    Klik untuk
                                                                    membuka di
                                                                    Google Drive
                                                                </p>
                                                            </div>
                                                        </a>
                                                    </div>
                                                )}
                                            {selectedVideo.type === "file" &&
                                                selectedVideo.file && (
                                                    <iframe
                                                        width="100%"
                                                        height="100%"
                                                        src={`/storage/${selectedVideo.file}`}
                                                        title="PDF preview"
                                                    />
                                                )}
                                        </div>

                                        <div className="p-6 bg-white">
                                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                                <div>
                                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                                        {selectedVideo.title}
                                                    </h2>
                                                    <div className="flex items-center text-sm text-gray-600">
                                                        <Clock className="w-4 h-4 mr-1" />
                                                        {selectedVideo.duration}
                                                        <span className="mx-2">
                                                            •
                                                        </span>
                                                        <BookOpen className="w-4 h-4 mr-1" />
                                                        {kelas.title}
                                                        {watchedVideos.has(
                                                            selectedVideo.id
                                                        ) && (
                                                            <>
                                                                <span className="mx-2">
                                                                    •
                                                                </span>
                                                                <CheckCheck className="w-4 h-4 mr-1 text-green-600" />
                                                                <span className="text-green-600 font-medium">
                                                                    Selesai
                                                                </span>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="flex gap-3">
                                                    <Button
                                                        onClick={
                                                            handlePreviousVideo
                                                        }
                                                        variant="outline"
                                                        disabled={
                                                            video.findIndex(
                                                                (v) =>
                                                                    v.id ===
                                                                    selectedVideo.id
                                                            ) === 0
                                                        }
                                                        className="flex items-center"
                                                    >
                                                        <ArrowLeft className="w-4 h-4 mr-2" />
                                                        Sebelumnya
                                                    </Button>
                                                    {!isLastVideo && (
                                                        <Button
                                                            onClick={
                                                                handleNextVideo
                                                            }
                                                            className="bg-gradient-to-r from-maroon to-red-600 hover:from-red-600 hover:to-maroon"
                                                        >
                                                            Lanjut
                                                            <ArrowRight className="w-4 h-4 ml-2" />
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-[500px] text-gray-500">
                                        <PlayCircleIcon className="w-24 h-24 mb-4 text-gray-300" />
                                        <h3 className="text-xl font-semibold mb-2">
                                            Pilih Video untuk Mulai Belajar
                                        </h3>
                                        <p>
                                            Klik pada daftar materi di sidebar
                                            untuk memulai pembelajaran
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        <Tabs defaultValue="about" className="space-y-6">
                            <TabsList className="space-x-2 rounded-xl ">
                                <TabsTrigger
                                    value="about"
                                    className="flex items-center gap-2 data-[state=active]:bg-maroon data-[state=active]:text-white"
                                >
                                    <BookOpen className="w-4 h-4" />
                                    Tentang
                                </TabsTrigger>
                                <TabsTrigger
                                    value="diskusi"
                                    className="flex items-center gap-2 data-[state=active]:bg-maroon data-[state=active]:text-white"
                                >
                                    <MessageCircle className="w-4 h-4" />
                                    Diskusi
                                </TabsTrigger>
                                <TabsTrigger
                                    value="mentor"
                                    className="flex items-center gap-2 data-[state=active]:bg-maroon data-[state=active]:text-white"
                                >
                                    <User className="w-4 h-4" />
                                    Mentor
                                </TabsTrigger>
                                <TabsTrigger
                                    value="ulasan"
                                    className="flex items-center gap-2 data-[state=active]:bg-maroon data-[state=active]:text-white"
                                >
                                    <Star className="w-4 h-4" />
                                    Ulasan
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="about">
                                <Card className="shadow-lg">
                                    <CardHeader>
                                        <CardTitle className="flex items-center">
                                            <BookOpen className="w-5 h-5 mr-2 text-maroon" />
                                            Tentang Kursus
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div
                                            className="prose prose-gray max-w-none"
                                            dangerouslySetInnerHTML={{
                                                __html: kelas.body,
                                            }}
                                        />
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="diskusi" className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900">
                                            Forum Diskusi
                                        </h3>
                                        <p className="text-gray-600 mt-1">
                                            Ajukan pertanyaan dan diskusikan
                                            materi dengan mentor dan siswa lain
                                        </p>
                                    </div>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button className="bg-gradient-to-r from-maroon to-red-600 hover:from-red-600 hover:to-maroon shadow-lg">
                                                <Plus className="w-4 h-4 mr-2" />
                                                Buat Diskusi
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                                            <DialogHeader>
                                                <DialogTitle className="flex items-center">
                                                    <MessageCircle className="w-5 h-5 mr-2 text-maroon" />
                                                    Buat Diskusi Baru
                                                </DialogTitle>
                                                <DialogDescription>
                                                    Ajukan pertanyaan atau mulai
                                                    diskusi tentang materi
                                                    kursus
                                                </DialogDescription>
                                            </DialogHeader>
                                            <form
                                                onSubmit={sendDiskusi}
                                                className="space-y-6"
                                            >
                                                <div>
                                                    <Label
                                                        htmlFor="title"
                                                        className="text-sm font-semibold text-gray-700"
                                                    >
                                                        Judul Diskusi
                                                    </Label>
                                                    <Input
                                                        id="title"
                                                        value={title || ""}
                                                        onChange={(e) =>
                                                            setTitle(
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="Masukkan judul diskusi yang menarik"
                                                        className="mt-2"
                                                        required
                                                    />
                                                </div>

                                                <div>
                                                    <Label
                                                        htmlFor="subject"
                                                        className="text-sm font-semibold text-gray-700"
                                                    >
                                                        Subjek
                                                    </Label>
                                                    <Input
                                                        id="subject"
                                                        value={subject || ""}
                                                        onChange={(e) =>
                                                            setSubject(
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="Kategori atau topik diskusi"
                                                        className="mt-2"
                                                        required
                                                    />
                                                </div>

                                                <div>
                                                    <Label
                                                        htmlFor="body"
                                                        className="text-sm font-semibold text-gray-700"
                                                    >
                                                        Deskripsi
                                                    </Label>
                                                    <Textarea
                                                        id="body"
                                                        value={body}
                                                        onChange={(e) =>
                                                            setBody(
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="Jelaskan pertanyaan atau topik diskusi Anda dengan detail"
                                                        className="mt-2 min-h-[120px]"
                                                        required
                                                    />
                                                </div>

                                                <div>
                                                    <Label className="text-sm font-semibold text-gray-700 block mb-3">
                                                        Lampiran Gambar
                                                        (Opsional)
                                                    </Label>
                                                    {imagePreview && (
                                                        <div className="mb-4">
                                                            <img
                                                                src={
                                                                    imagePreview
                                                                }
                                                                alt="Preview"
                                                                className="w-full max-w-md h-48 object-cover rounded-xl border border-gray-200"
                                                            />
                                                        </div>
                                                    )}
                                                    <Input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={
                                                            handleFileChange
                                                        }
                                                        className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-maroon file:text-white hover:file:bg-red-600"
                                                    />
                                                </div>

                                                <div className="flex justify-end gap-3 pt-4">
                                                    <DialogClose asChild>
                                                        <Button
                                                            variant="outline"
                                                            type="button"
                                                        >
                                                            Batal
                                                        </Button>
                                                    </DialogClose>
                                                    <Button
                                                        type="submit"
                                                        disabled={loading}
                                                        className="bg-gradient-to-r from-maroon to-red-600"
                                                    >
                                                        {loading ? (
                                                            <>
                                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                                Mengirim...
                                                            </>
                                                        ) : (
                                                            <>
                                                                <MessageCircle className="w-4 h-4 mr-2" />
                                                                Kirim Diskusi
                                                            </>
                                                        )}
                                                    </Button>
                                                </div>
                                            </form>
                                        </DialogContent>
                                    </Dialog>
                                </div>

                                {diskusi.length > 0 ? (
                                    <div className="space-y-6">
                                        {diskusi.map((disk) => (
                                            <Card
                                                key={disk.id}
                                                className="shadow-lg hover:shadow-xl transition-shadow"
                                            >
                                                <CardContent className="p-6">
                                                    {disk.image && (
                                                        <Dialog>
                                                            <DialogTrigger
                                                                asChild
                                                            >
                                                                <img
                                                                    src={`/storage/${disk.image}`}
                                                                    alt="Diskusi attachment"
                                                                    className="w-full max-w-md h-48 object-cover rounded-xl mb-4 cursor-pointer hover:opacity-90 transition-opacity"
                                                                />
                                                            </DialogTrigger>
                                                            <DialogContent className="max-w-4xl">
                                                                <img
                                                                    src={`/storage/${disk.image}`}
                                                                    alt="Diskusi attachment"
                                                                    className="w-full h-auto rounded-xl"
                                                                />
                                                            </DialogContent>
                                                        </Dialog>
                                                    )}

                                                    <h4 className="text-xl font-bold text-gray-900 mb-3">
                                                        {disk.title}
                                                    </h4>
                                                    <p className="text-gray-700 leading-relaxed mb-6">
                                                        {disk.body}
                                                    </p>

                                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-gray-100">
                                                        <div className="flex items-center space-x-3">
                                                            <Avatar className="h-10 w-10">
                                                                <AvatarImage
                                                                    src={
                                                                        disk
                                                                            .user
                                                                            .image
                                                                            ? `/storage/${disk.user.image}`
                                                                            : undefined
                                                                    }
                                                                />
                                                                <AvatarFallback className="bg-maroon text-white">
                                                                    {disk.user.name
                                                                        .charAt(
                                                                            0
                                                                        )
                                                                        .toUpperCase()}
                                                                </AvatarFallback>
                                                            </Avatar>
                                                            <div>
                                                                <p className="font-semibold text-gray-900">
                                                                    {
                                                                        disk
                                                                            .user
                                                                            .name
                                                                    }
                                                                </p>
                                                                <p className="text-sm text-gray-500">
                                                                    Siswa
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div className="flex gap-3">
                                                            <Dialog>
                                                                <DialogTrigger
                                                                    asChild
                                                                >
                                                                    <Button
                                                                        variant="outline"
                                                                        size="sm"
                                                                    >
                                                                        <MessageCircle className="w-4 h-4 mr-2" />
                                                                        Balas
                                                                    </Button>
                                                                </DialogTrigger>
                                                                <DialogContent>
                                                                    <DialogHeader>
                                                                        <DialogTitle>
                                                                            Balas
                                                                            Diskusi
                                                                        </DialogTitle>
                                                                        <DialogDescription>
                                                                            Berikan
                                                                            tanggapan
                                                                            atau
                                                                            jawaban
                                                                            untuk
                                                                            diskusi
                                                                            ini
                                                                        </DialogDescription>
                                                                    </DialogHeader>
                                                                    <form
                                                                        onSubmit={
                                                                            sendBalasdiskusi
                                                                        }
                                                                        className="space-y-4"
                                                                    >
                                                                        <input
                                                                            type="hidden"
                                                                            ref={
                                                                                diskusiIdRef
                                                                            }
                                                                            value={
                                                                                disk.id
                                                                            }
                                                                        />
                                                                        <div>
                                                                            <Label htmlFor="balas">
                                                                                Balasan
                                                                                Anda
                                                                            </Label>
                                                                            <Textarea
                                                                                id="balas"
                                                                                value={
                                                                                    balas
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
                                                                                placeholder="Tulis balasan Anda di sini..."
                                                                                className="mt-2 min-h-[100px]"
                                                                                required
                                                                            />
                                                                        </div>
                                                                        <div className="flex justify-end gap-3">
                                                                            <DialogClose
                                                                                asChild
                                                                            >
                                                                                <Button
                                                                                    variant="outline"
                                                                                    type="button"
                                                                                >
                                                                                    Batal
                                                                                </Button>
                                                                            </DialogClose>
                                                                            <Button
                                                                                type="submit"
                                                                                disabled={
                                                                                    loading
                                                                                }
                                                                                className="bg-maroon hover:bg-red-600"
                                                                            >
                                                                                {loading ? (
                                                                                    <>
                                                                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                                                        Mengirim...
                                                                                    </>
                                                                                ) : (
                                                                                    "Kirim Balasan"
                                                                                )}
                                                                            </Button>
                                                                        </div>
                                                                    </form>
                                                                </DialogContent>
                                                            </Dialog>

                                                            <Dialog>
                                                                <DialogTrigger
                                                                    asChild
                                                                >
                                                                    <Button
                                                                        variant="outline"
                                                                        size="sm"
                                                                    >
                                                                        <Eye className="w-4 h-4 mr-2" />
                                                                        Lihat
                                                                        Balasan
                                                                    </Button>
                                                                </DialogTrigger>
                                                                <DialogContent className="max-w-3xl">
                                                                    <DialogHeader>
                                                                        <DialogTitle>
                                                                            Balasan
                                                                            Diskusi
                                                                        </DialogTitle>
                                                                        <DialogDescription>
                                                                            Semua
                                                                            tanggapan
                                                                            untuk:
                                                                            "
                                                                            {
                                                                                disk.title
                                                                            }
                                                                            "
                                                                        </DialogDescription>
                                                                    </DialogHeader>
                                                                    <ScrollArea className="max-h-96 pr-4">
                                                                        {balasDiskusi.filter(
                                                                            (
                                                                                balasan
                                                                            ) =>
                                                                                balasan.diskusi_id ===
                                                                                disk.id
                                                                        )
                                                                            .length >
                                                                        0 ? (
                                                                            <div className="space-y-4">
                                                                                {balasDiskusi
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
                                                                                            <Card
                                                                                                key={
                                                                                                    index
                                                                                                }
                                                                                                className="border border-maroon/20"
                                                                                            >
                                                                                                <CardContent className="p-4">
                                                                                                    <div className="flex items-start space-x-3 mb-3">
                                                                                                        <Avatar className="h-8 w-8">
                                                                                                            <AvatarImage
                                                                                                                src={
                                                                                                                    balasan
                                                                                                                        .user
                                                                                                                        .image
                                                                                                                        ? `/storage/${balasan.user.image}`
                                                                                                                        : undefined
                                                                                                                }
                                                                                                            />
                                                                                                            <AvatarFallback className="bg-maroon text-white text-sm">
                                                                                                                {balasan.user.name
                                                                                                                    .charAt(
                                                                                                                        0
                                                                                                                    )
                                                                                                                    .toUpperCase()}
                                                                                                            </AvatarFallback>
                                                                                                        </Avatar>
                                                                                                        <div className="flex-1">
                                                                                                            <div className="flex items-center gap-2 mb-1">
                                                                                                                <p className="font-semibold text-gray-900 text-sm">
                                                                                                                    {
                                                                                                                        balasan
                                                                                                                            .user
                                                                                                                            .name
                                                                                                                    }
                                                                                                                </p>
                                                                                                                <Badge
                                                                                                                    variant="secondary"
                                                                                                                    className="bg-maroon text-white text-xs"
                                                                                                                >
                                                                                                                    {
                                                                                                                        balasan
                                                                                                                            .user
                                                                                                                            .role
                                                                                                                    }
                                                                                                                </Badge>
                                                                                                            </div>
                                                                                                            <p className="text-gray-700 text-sm leading-relaxed">
                                                                                                                {
                                                                                                                    balasan.body
                                                                                                                }
                                                                                                            </p>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </CardContent>
                                                                                            </Card>
                                                                                        )
                                                                                    )}
                                                                            </div>
                                                                        ) : (
                                                                            <div className="text-center py-8">
                                                                                <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                                                                <p className="text-gray-500">
                                                                                    Belum
                                                                                    ada
                                                                                    balasan
                                                                                    untuk
                                                                                    diskusi
                                                                                    ini
                                                                                </p>
                                                                            </div>
                                                                        )}
                                                                    </ScrollArea>
                                                                </DialogContent>
                                                            </Dialog>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                ) : (
                                    <Card className="shadow-lg">
                                        <CardContent className="text-center py-16">
                                            <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                                Belum Ada Diskusi
                                            </h3>
                                            <p className="text-gray-600 mb-6">
                                                Jadilah yang pertama memulai
                                                diskusi di kursus ini
                                            </p>
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button className="bg-gradient-to-r from-maroon to-red-600">
                                                        <Plus className="w-4 h-4 mr-2" />
                                                        Mulai Diskusi
                                                    </Button>
                                                </DialogTrigger>
                                            </Dialog>
                                        </CardContent>
                                    </Card>
                                )}
                            </TabsContent>

                            <TabsContent value="mentor">
                                <Card className="shadow-lg">
                                    <CardContent className="p-8">
                                        <div className="flex flex-col md:flex-row gap-8">
                                            <div className="flex-shrink-0">
                                                <Avatar className="h-24 w-24">
                                                    <AvatarImage
                                                        src={
                                                            kelas.user.image
                                                                ? `/storage/${kelas.user.image}`
                                                                : undefined
                                                        }
                                                    />
                                                    <AvatarFallback className="bg-maroon text-white text-2xl">
                                                        {kelas.user.name
                                                            .charAt(0)
                                                            .toUpperCase()}
                                                    </AvatarFallback>
                                                </Avatar>
                                            </div>

                                            <div className="flex-1">
                                                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                                    {kelas.user.name}
                                                </h2>

                                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                                                    <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-4 rounded-xl text-center">
                                                        <Star className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                                                        <p className="text-2xl font-bold text-yellow-700">
                                                            {averageRating}
                                                        </p>
                                                        <p className="text-sm text-yellow-600">
                                                            Rating
                                                        </p>
                                                    </div>

                                                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl text-center">
                                                        <MessageCircle className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                                                        <p className="text-2xl font-bold text-blue-700">
                                                            {totalulasan}
                                                        </p>
                                                        <p className="text-sm text-blue-600">
                                                            Ulasan
                                                        </p>
                                                    </div>

                                                    <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl text-center">
                                                        <Users className="w-6 h-6 text-green-500 mx-auto mb-2" />
                                                        <p className="text-2xl font-bold text-green-700">
                                                            {totalsiswa}
                                                        </p>
                                                        <p className="text-sm text-green-600">
                                                            Siswa
                                                        </p>
                                                    </div>

                                                    <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-xl text-center">
                                                        <BookOpen className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                                                        <p className="text-2xl font-bold text-purple-700">
                                                            {totalkelasmentor}
                                                        </p>
                                                        <p className="text-sm text-purple-600">
                                                            Kursus
                                                        </p>
                                                    </div>
                                                </div>

                                                {kelas.user.bio && (
                                                    <div className="prose prose-gray max-w-none">
                                                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                                            Tentang Mentor
                                                        </h3>
                                                        <div
                                                            dangerouslySetInnerHTML={{
                                                                __html: kelas
                                                                    .user.bio,
                                                            }}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="ulasan">
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-900">
                                                Ulasan Siswa
                                            </h3>
                                            <p className="text-gray-600 mt-1">
                                                Apa kata siswa tentang kursus
                                                ini
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <div className="flex items-center justify-end gap-2 mb-1">
                                                <Star className="w-5 h-5 text-yellow-500" />
                                                <span className="text-2xl font-bold text-gray-900">
                                                    {averageRating}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600">
                                                {totalulasan} ulasan
                                            </p>
                                        </div>
                                    </div>

                                    {testimoni.length > 0 ? (
                                        <div className="grid gap-6 md:grid-cols-2">
                                            {testimoni.map((review, index) => (
                                                <Card
                                                    key={index}
                                                    className="shadow-lg hover:shadow-xl transition-shadow"
                                                >
                                                    <CardContent className="p-6">
                                                        <div className="flex items-start space-x-4 mb-4">
                                                            <Avatar className="h-12 w-12">
                                                                <AvatarImage
                                                                    src={
                                                                        review
                                                                            .user
                                                                            .image
                                                                            ? `/storage/${review.user.image}`
                                                                            : undefined
                                                                    }
                                                                />
                                                                <AvatarFallback className="bg-maroon text-white">
                                                                    {review.user.name
                                                                        .charAt(
                                                                            0
                                                                        )
                                                                        .toUpperCase()}
                                                                </AvatarFallback>
                                                            </Avatar>
                                                            <div className="flex-1">
                                                                <h4 className="font-semibold text-gray-900">
                                                                    {
                                                                        review
                                                                            .user
                                                                            .name
                                                                    }
                                                                </h4>
                                                                <Badge
                                                                    variant="secondary"
                                                                    className="mt-1"
                                                                >
                                                                    Siswa
                                                                </Badge>
                                                                <div className="flex items-center mt-2">
                                                                    {Array.from(
                                                                        {
                                                                            length: 5,
                                                                        },
                                                                        (
                                                                            _,
                                                                            starIndex
                                                                        ) => (
                                                                            <Star
                                                                                key={
                                                                                    starIndex
                                                                                }
                                                                                className={`w-4 h-4 ${
                                                                                    Number(
                                                                                        review.rating
                                                                                    ) >
                                                                                    starIndex
                                                                                        ? "text-yellow-400 fill-yellow-400"
                                                                                        : "text-gray-300"
                                                                                }`}
                                                                            />
                                                                        )
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <p className="text-gray-700 leading-relaxed">
                                                            {review.body}
                                                        </p>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    ) : (
                                        <Card className="shadow-lg">
                                            <CardContent className="text-center py-16">
                                                <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                                    Belum Ada Ulasan
                                                </h3>
                                                <p className="text-gray-600 mb-6">
                                                    Jadilah yang pertama
                                                    memberikan ulasan untuk
                                                    kursus ini
                                                </p>
                                                <Dialog
                                                    open={isDialogOpen}
                                                    onOpenChange={
                                                        setIsDialogOpen
                                                    }
                                                >
                                                    <DialogTrigger asChild>
                                                        <Button className="bg-gradient-to-r from-maroon to-red-600">
                                                            <Star className="w-4 h-4 mr-2" />
                                                            Tulis Ulasan
                                                        </Button>
                                                    </DialogTrigger>
                                                </Dialog>
                                            </CardContent>
                                        </Card>
                                    )}
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </>
    );
}
