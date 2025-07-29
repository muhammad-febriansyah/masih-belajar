import HomeLayout from "@/Layouts/HomeLayout";
import { EventType } from "@/types/event";
import { SettingType } from "@/types/setting";
import { Link } from "@inertiajs/react";
import { CalendarDays, Eye, User, Clock, MapPin } from "lucide-react";

interface Props {
    setting: SettingType;
    data: EventType[];
}

export default function Index({ setting, data }: Props) {
    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
            weekday: "long",
        }).format(new Date(date));
    };

    const formatTime = (date: Date) => {
        return new Intl.DateTimeFormat("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
            timeZone: "Asia/Jakarta",
        }).format(new Date(date));
    };

    const truncateText = (text: string, maxLength: number) => {
        if (text.length <= maxLength) return text;
        return text.substr(0, maxLength) + "...";
    };

    return (
        <HomeLayout>
            <section className="container py-10 mt-16 md:mt-32">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
                        <CalendarDays className="w-4 h-4" />
                        Event & Agenda
                    </div>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        Jangan Lewatkan Event Terbaru
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Temukan berbagai event menarik dan agenda penting yang
                        telah kami siapkan untuk Anda
                    </p>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-blue-100 text-sm font-medium">
                                    Total Event
                                </p>
                                <p className="text-3xl font-bold">
                                    {data.length}
                                </p>
                            </div>
                            <CalendarDays className="w-8 h-8 text-blue-200" />
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-green-100 text-sm font-medium">
                                    Event Aktif
                                </p>
                                <p className="text-3xl font-bold">
                                    {
                                        data.filter(
                                            (event) =>
                                                new Date(event.tgl) >=
                                                new Date()
                                        ).length
                                    }
                                </p>
                            </div>
                            <Clock className="w-8 h-8 text-green-200" />
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-purple-100 text-sm font-medium">
                                    Total Views
                                </p>
                                <p className="text-3xl font-bold">
                                    {data.reduce(
                                        (sum, event) => sum + event.views,
                                        0
                                    )}
                                </p>
                            </div>
                            <Eye className="w-8 h-8 text-purple-200" />
                        </div>
                    </div>
                </div>

                {/* Events Grid */}
                {data.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {data.map((event) => (
                            <div
                                key={event.id}
                                className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-gray-200"
                            >
                                {/* Event Image */}
                                <div className="relative overflow-hidden h-48">
                                    <img
                                        src={
                                            `/storage/${event.image}` ||
                                            "/placeholder-event.jpg"
                                        }
                                        alt={event.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                                    {/* Date Badge */}
                                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-xl shadow-lg">
                                        <div className="text-center">
                                            <div className="text-xs font-medium text-gray-600 uppercase">
                                                {new Intl.DateTimeFormat(
                                                    "id-ID",
                                                    { month: "short" }
                                                ).format(new Date(event.tgl))}
                                            </div>
                                            <div className="text-lg font-bold text-gray-900">
                                                {new Date(event.tgl).getDate()}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Views Counter */}
                                    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                                        <Eye className="w-3 h-3" />
                                        {event.views}
                                    </div>
                                </div>

                                {/* Event Content */}
                                <div className="p-6">
                                    {/* Event Title */}
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                                        {event.title}
                                    </h3>

                                    {/* Event Description */}
                                    <p
                                        className="text-gray-600 text-sm leading-relaxed mb-4"
                                        dangerouslySetInnerHTML={{
                                            __html: truncateText(
                                                event.desc,
                                                120
                                            ),
                                        }}
                                    />

                                    {/* Event Meta */}
                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <CalendarDays className="w-4 h-4 text-blue-500" />
                                            <span>{formatDate(event.tgl)}</span>
                                        </div>

                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <Clock className="w-4 h-4 text-green-500" />
                                            <span>{formatTime(event.tgl)}</span>
                                        </div>

                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <User className="w-4 h-4 text-purple-500" />
                                            <span>Oleh {event.user.name}</span>
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <div className="flex items-center justify-between">
                                        <Link
                                            href={`/detailevent/${event.slug}`}
                                            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-2.5 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                        >
                                            Lihat Detail
                                        </Link>

                                        {/* Event Status */}
                                        <div
                                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                new Date(event.tgl) >=
                                                new Date()
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-gray-100 text-gray-600"
                                            }`}
                                        >
                                            {new Date(event.tgl) >= new Date()
                                                ? "Upcoming"
                                                : "Selesai"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Empty State */
                    <div className="text-center py-16">
                        <div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CalendarDays className="w-12 h-12 text-gray-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            Belum Ada Event
                        </h3>
                        <p className="text-gray-600 max-w-md mx-auto">
                            Saat ini belum ada event atau agenda yang tersedia.
                            Silakan kembali lagi nanti untuk melihat update
                            terbaru.
                        </p>
                    </div>
                )}

                {/* Load More Button (if needed) */}
                {data.length > 6 && (
                    <div className="text-center mt-12">
                        <button className="bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200 hover:border-gray-300 px-8 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl">
                            Muat Lebih Banyak Event
                        </button>
                    </div>
                )}
            </section>
        </HomeLayout>
    );
}
