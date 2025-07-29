import HomeLayout from "@/Layouts/HomeLayout";
import { EventType } from "@/types/event";
import { SettingType } from "@/types/setting";
import {
    CalendarDays,
    Eye,
    User,
    Clock,
    MapPin,
    Share2,
    Calendar,
    ArrowLeft,
} from "lucide-react";
import { Link } from "@inertiajs/react";

interface Props {
    setting: SettingType;
    data: EventType;
}

export default function Detail({ setting, data }: Props) {
    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat("id-ID", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }).format(new Date(date));
    };

    const formatDateShort = (date: Date) => {
        return new Intl.DateTimeFormat("id-ID", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }).format(new Date(date));
    };

    const shareEvent = () => {
        if (navigator.share) {
            navigator.share({
                title: data.title,
                text: data.desc,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert("Link berhasil disalin!");
        }
    };

    return (
        <HomeLayout>
            <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
                {/* Hero Section */}
                <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10"></div>
                    <img
                        src={`/storage/${data.image}`}
                        alt={data.title}
                        className="w-full h-full object-cover"
                    />

                    {/* Navigation */}
                    <div className="absolute top-0 left-0 right-0 z-20 p-4 md:p-6">
                        <div className="container mx-auto">
                            <Link
                                href="/events"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-black/20 backdrop-blur-sm text-white rounded-full hover:bg-black/30 transition-all duration-300"
                            >
                                <ArrowLeft size={18} />
                                <span className="hidden sm:inline">
                                    Kembali ke Events
                                </span>
                                <span className="sm:hidden">Kembali</span>
                            </Link>
                        </div>
                    </div>

                    {/* Hero Content */}
                    <div className="absolute bottom-0 left-0 right-0 z-20 p-4 md:p-6">
                        <div className="container mx-auto">
                            <div className="max-w-4xl">
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/90 backdrop-blur-sm text-white text-sm rounded-full mb-4">
                                    <Calendar size={14} />
                                    <span>{formatDateShort(data.tgl)}</span>
                                </div>

                                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                                    {data.title}
                                </h1>

                                <div className="flex flex-wrap items-center gap-4 text-white/90">
                                    <div className="flex items-center gap-2">
                                        <User size={18} />
                                        <span>{data.user.name}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Eye size={18} />
                                        <span>
                                            {data.views.toLocaleString()} views
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="container mx-auto px-4 py-8 md:py-16">
                    <div className="max-w-4xl mx-auto">
                        <div className="grid lg:grid-cols-3 gap-8">
                            {/* Content Column */}
                            <div className="lg:col-span-2">
                                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                                    <div className="p-6 md:p-8">
                                        <div className="flex items-center justify-between mb-6">
                                            <h2 className="text-2xl font-bold text-gray-900">
                                                Detail Event
                                            </h2>
                                        </div>

                                        <div className="prose prose-lg max-w-none">
                                            <div
                                                className="text-gray-700 text-sm leading-relaxed"
                                                dangerouslySetInnerHTML={{
                                                    __html: data.desc.replace(
                                                        /\n/g,
                                                        "<br>"
                                                    ),
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Organizer Info */}
                                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mt-8">
                                    <div className="p-6 md:p-8">
                                        <h3 className="text-xl font-bold text-gray-900 mb-6">
                                            Tentang Penyelenggara
                                        </h3>
                                        <div className="flex items-start gap-4">
                                            <img
                                                src={
                                                    `/storage/${data.user.image}` ||
                                                    "/default-avatar.png"
                                                }
                                                alt={data.user.name}
                                                className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                                            />
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-gray-900 text-lg">
                                                    {data.user.name}
                                                </h4>
                                                <p className="text-gray-600 mb-2">
                                                    {data.user.email}
                                                </p>
                                                {data.user.bio && (
                                                    <p className="text-gray-700 text-sm leading-relaxed">
                                                        {data.user.bio}
                                                    </p>
                                                )}
                                                <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                                                    <span className="px-2 py-1 bg-gray-100 rounded-full capitalize">
                                                        {data.user.role}
                                                    </span>
                                                    <span>
                                                        Bergabung{" "}
                                                        {new Date(
                                                            data.user.created_at
                                                        ).getFullYear()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar */}
                            <div className="lg:col-span-1">
                                <div className="sticky top-8">
                                    {/* Event Info Card */}
                                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-6">
                                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
                                            <h3 className="font-bold text-lg mb-2">
                                                Informasi Event
                                            </h3>
                                            <p className="text-blue-100 text-sm">
                                                Jangan sampai terlewat!
                                            </p>
                                        </div>

                                        <div className="p-6 space-y-4">
                                            <div className="flex items-start gap-3">
                                                <div className="p-2 bg-blue-50 rounded-lg">
                                                    <CalendarDays
                                                        className="text-blue-600"
                                                        size={20}
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-semibold text-gray-900 text-sm">
                                                        Tanggal & Waktu
                                                    </h4>
                                                    <p className="text-gray-600 text-sm mt-1">
                                                        {formatDate(data.tgl)}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-3">
                                                <div className="p-2 bg-green-50 rounded-lg">
                                                    <Eye
                                                        className="text-green-600"
                                                        size={20}
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-semibold text-gray-900 text-sm">
                                                        Total Views
                                                    </h4>
                                                    <p className="text-gray-600 text-sm mt-1">
                                                        {data.views.toLocaleString()}{" "}
                                                        orang telah melihat
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-3">
                                                <div className="p-2 bg-purple-50 rounded-lg">
                                                    <Clock
                                                        className="text-purple-600"
                                                        size={20}
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-semibold text-gray-900 text-sm">
                                                        Dibuat
                                                    </h4>
                                                    <p className="text-gray-600 text-sm mt-1">
                                                        {new Intl.DateTimeFormat(
                                                            "id-ID",
                                                            {
                                                                day: "numeric",
                                                                month: "long",
                                                                year: "numeric",
                                                            }
                                                        ).format(
                                                            new Date(
                                                                data.created_at
                                                            )
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </HomeLayout>
    );
}
