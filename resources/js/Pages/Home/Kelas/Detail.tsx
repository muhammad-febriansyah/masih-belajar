import HomeLayout from "@/Layouts/HomeLayout";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import HeroVideoDialog from "@/components/ui/hero-video-dialog";
import { Datum } from "@/types/kelas";
import { SectionType } from "@/types/section";
import { TestimoniType } from "@/types/testimoni";
import { VideoType } from "@/types/video";
import { Link } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    BookUserIcon,
    ChartNoAxesColumnIcon,
    ChartNoAxesColumnIncreasing,
    Check,
    CheckCircle,
    CircleCheckBig,
    LockIcon,
    Star,
} from "lucide-react";
import PulsatingButton from "@/components/ui/pulsating-button";
import { route } from "ziggy-js";

interface Props {
    kelas: Datum;
    sectionData: SectionType[];
    video: VideoType[];
    videoDemo: VideoType[];
    allclass: Datum[];
    testimoni: TestimoniType[];
    studentjoin: number;
    totalvideo: number;
    totalstar: number;
    averageRating: number;
    totalulasan: number;
    totalkelasmentor: number;
    totalsiswa: number;
}
export default function Detail({
    kelas,
    sectionData,
    video,
    allclass,
    testimoni,
    studentjoin,
    totalvideo,
    totalstar,
    averageRating,
    totalulasan,
    totalkelasmentor,
    totalsiswa,
}: Props) {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <HomeLayout>
            <section className="relative h-80 bg-maroon ">
                <div className="flex flex-col items-center justify-center gap-10 px-4 mt-20 text-center pt-14 pb-20">
                    <h1 className="text-2xl w-full font-bold text-white lg:text-4xl max-w-6xl">
                        {kelas.title}
                    </h1>
                    <p className="max-w-xl hidden md:block w-full text-sm text-gray-200">
                        {kelas.description}.
                    </p>
                </div>
                <div className="bg-white  md:hidden flex items-center justify-between z-[88] px-5 rounded-t-2xl left-0 right-0 w-full h-14  bottom-0 fixed">
                    <div className="flex flex-col">
                        {kelas.discount > 0 && (
                            <span className="relative text-base font-medium text-red-600">
                                Rp.{" "}
                                {Number(kelas.price).toLocaleString("id-ID")}
                                <span className="absolute left-0 right-0 bottom-2.5 font-semibold border-b-2 border-red-700"></span>
                            </span>
                        )}
                        <span className="text-base font-semibold text-black">
                            Rp.{" "}
                            {Number(
                                kelas.price - kelas.discount
                            ).toLocaleString("id-ID")}
                        </span>
                    </div>
                    <Link href={route("masuk")}>
                        <PulsatingButton className="w-full bg-maroon">
                            Beli Kelas
                        </PulsatingButton>
                    </Link>
                </div>
            </section>
            <section className="container  py-10 transform -translate-y-[4%] md:-translate-y-[8%] left-0 right-0">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <div className="space-y-5 lg:col-span-2">
                        <iframe
                            src={kelas.link_overview.embed_url}
                            className="w-full h-96 rounded-2xl"
                            allowFullScreen
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        ></iframe>
                        <div className="block px-5 py-5 bg-white md:hidden lg:col-span-1 rounded-2xl max-h-min">
                            <div className="grid order-2 grid-cols-3 gap-y-5">
                                <div className="flex flex-col items-center">
                                    <img
                                        src={`/storage/${kelas.level.image}`}
                                        alt=""
                                        className="object-cover w-12 h-12"
                                    />
                                    <span className="font-semibold ">
                                        {kelas.level.name}
                                    </span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <img
                                        src="/8.svg"
                                        alt=""
                                        className="w-12 h-12"
                                    />
                                    <span className="font-semibold ">
                                        Sertifikat
                                    </span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <img
                                        src="/9.svg"
                                        alt=""
                                        className="w-12 h-12"
                                    />
                                    <span className="font-semibold ">
                                        {studentjoin > 0 ? studentjoin : "0"}{" "}
                                        Siswa
                                    </span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <img
                                        src="/4.svg"
                                        alt=""
                                        className="w-12 h-12"
                                    />
                                    <span className="text-base font-semibold text-center">
                                        Unlimited <br /> access
                                    </span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <img
                                        src="/12.svg"
                                        alt=""
                                        className="w-12 h-12"
                                    />
                                    <span className="font-semibold ">
                                        {totalvideo > 0 ? totalvideo : "0"}{" "}
                                        Video
                                    </span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <Star className="text-red-600 w-11 h-11" />
                                    <span className="font-semibold ">
                                        {Number(totalstar).toFixed(1)}
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center p-3 mt-10 space-x-3 transition-all duration-200 bg-white border border-maroon rounded-2xl group hover:bg-maroon">
                                <img
                                    src={`/storage/${kelas.category.image}`}
                                    alt="User Avatar"
                                    className="object-cover w-12 h-12"
                                />
                                <div className="flex flex-col">
                                    <h1 className="text-2xl font-bold text-black group-hover:text-white">
                                        {kelas.category.name}
                                    </h1>
                                </div>
                            </div>
                            <div className="flex flex-col pt-5">
                                {kelas.discount > 0 && (
                                    <span className="relative text-2xl font-medium text-red-600">
                                        Rp.{" "}
                                        {Number(kelas.price).toLocaleString(
                                            "id-ID"
                                        )}
                                        <span className="absolute left-0 right-[12rem] bottom-4 font-semibold border-b-2 border-red-700"></span>
                                    </span>
                                )}
                                <span className="text-2xl font-bold text-black">
                                    Rp.{" "}
                                    {Number(
                                        kelas.price - kelas.discount
                                    ).toLocaleString("id-ID")}
                                </span>
                            </div>
                            <br />
                            <br />
                            <Link href={route("masuk")} className="mt-5">
                                <PulsatingButton className="w-full bg-maroon">
                                    Beli Kelas
                                </PulsatingButton>
                            </Link>
                        </div>
                        <div className=" lg:px-0 md:order-2">
                            <Tabs
                                defaultValue="about"
                                className="items-start mt-10"
                            >
                                <TabsList className="flex py-10 mb-5 space-x-2 overflow-x-auto overflow-y-hidden bg-transparent">
                                    <TabsTrigger
                                        value="about"
                                        className="rounded-full"
                                    >
                                        Detail
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="pelajaran"
                                        className="rounded-full"
                                    >
                                        Kurikulum
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="mentor"
                                        className="rounded-full"
                                    >
                                        Mentor
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="testimoni"
                                        className="rounded-full"
                                    >
                                        Reviews
                                    </TabsTrigger>
                                </TabsList>
                                <TabsContent
                                    value="about"
                                    className="p-5 bg-white rounded-2xl"
                                >
                                    {/* <div className="w-full mt-5 space-y-5">
                                        <div className="flow-root py-3 border border-gray-100 rounded-lg shadow-sm">
                                            <dl className="-my-3 text-sm divide-y divide-gray-100">
                                                <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                                                    {kelas.discount != 0 ? (
                                                        <dt className="font-medium text-gray-900">
                                                            Harga Potongan Kelas
                                                        </dt>
                                                    ) : (
                                                        <dt className="font-medium text-gray-900">
                                                            Harga Kelas
                                                        </dt>
                                                    )}
                                                    <dd className="text-gray-700 sm:col-span-2">
                                                        Rp.{" "}
                                                        {Number(
                                                            kelas.price -
                                                                kelas.discount
                                                        ).toLocaleString(
                                                            "id-ID"
                                                        )}
                                                    </dd>
                                                </div>
                                                {kelas.discount > 0 && (
                                                    <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                                                        <dt className="font-medium text-gray-900">
                                                            Harga Asli
                                                        </dt>
                                                        <dd className="text-gray-700 sm:col-span-2">
                                                            <span className="relative text-base font-medium text-red-600">
                                                                Rp.{" "}
                                                                {Number(
                                                                    kelas.price
                                                                ).toLocaleString(
                                                                    "id-ID"
                                                                )}
                                                                <span className="absolute left-0 right-0 font-semibold border-b-2 border-red-700 bottom-2.5"></span>
                                                            </span>
                                                        </dd>
                                                    </div>
                                                )}
                                                <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                                                    <dt className="font-medium text-gray-900">
                                                        Tingkatan
                                                    </dt>
                                                    <dd className="text-gray-700 sm:col-span-2">
                                                        {kelas.level.name}
                                                    </dd>
                                                </div>

                                                <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                                                    <dt className="font-medium text-gray-900">
                                                        Tipe Kelas
                                                    </dt>
                                                    <dd className="text-gray-700 sm:col-span-2">
                                                        {kelas.type.name}
                                                    </dd>
                                                </div>

                                                <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                                                    <dt className="font-medium text-gray-900">
                                                        Kategori
                                                    </dt>
                                                    <dd className="text-gray-700 sm:col-span-2">
                                                        {kelas.category.name}
                                                    </dd>
                                                </div>
                                                <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                                                    <dt className="font-medium text-gray-900">
                                                        Views
                                                    </dt>
                                                    <dd className="text-gray-700 sm:col-span-2">
                                                        {kelas.views} Views
                                                    </dd>
                                                </div>
                                                <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                                                    <dt className="font-medium text-gray-900">
                                                        Benefit Kelas
                                                    </dt>
                                                    <dd className="text-gray-700 sm:col-span-2">
                                                        <ul className="space-y-1 font-medium text-black">
                                                            {kelas.benefit.map(
                                                                (
                                                                    benefit,
                                                                    index
                                                                ) => (
                                                                    <li
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        <CheckCircle className="inline mr-2 size-4 text-maroon" />{" "}
                                                                        {
                                                                            benefit
                                                                        }
                                                                    </li>
                                                                )
                                                            )}
                                                        </ul>
                                                    </dd>
                                                </div>
                                            </dl>
                                        </div>
                                    </div> */}
                                    <div
                                        className="mt-5 prose text-gray-700"
                                        dangerouslySetInnerHTML={{
                                            __html: kelas.body,
                                        }}
                                    />
                                </TabsContent>
                                <TabsContent value="pelajaran">
                                    <Accordion
                                        collapsible
                                        type="single"
                                        className="w-full"
                                    >
                                        {sectionData.map((section, index) => (
                                            <AccordionItem
                                                value={index.toString()}
                                                key={section.id}
                                                className="px-6 my-3 mt-5 bg-white rounded-2xl"
                                            >
                                                <AccordionTrigger className="flex items-center text-black">
                                                    <div className="flex flex-row items-center font-semibold gap-x-3">
                                                        <span className="flex items-center justify-center text-white bg-gray-600 rounded-full w-7 h-7">
                                                            {index + 1}
                                                        </span>
                                                        {section.title}
                                                    </div>
                                                </AccordionTrigger>
                                                <AccordionContent>
                                                    <ul>
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
                                                                ) => (
                                                                    <li
                                                                        key={
                                                                            filteredVideo.id
                                                                        }
                                                                    >
                                                                        {index ===
                                                                        0 ? (
                                                                            <Dialog>
                                                                                <DialogTrigger className="flex flex-row items-center w-full px-5 py-3 gap-x-2">
                                                                                    <div className="flex flex-row items-center font-semibold text-black gap-x-2">
                                                                                        <img
                                                                                            src="/play.svg"
                                                                                            alt=""
                                                                                            className="w-6 h-6"
                                                                                        />
                                                                                        <span>
                                                                                            {
                                                                                                filteredVideo.title
                                                                                            }
                                                                                        </span>
                                                                                    </div>
                                                                                    <span className="ml-auto font-semibold text-black">
                                                                                        {
                                                                                            filteredVideo.duration
                                                                                        }
                                                                                    </span>
                                                                                </DialogTrigger>
                                                                                <DialogContent>
                                                                                    <DialogHeader>
                                                                                        <DialogTitle>
                                                                                            {
                                                                                                filteredVideo.title
                                                                                            }
                                                                                        </DialogTitle>
                                                                                        <DialogDescription>
                                                                                            <iframe
                                                                                                width="100%"
                                                                                                height="400px"
                                                                                                className="rounded-lg"
                                                                                                src={
                                                                                                    filteredVideo
                                                                                                        .url
                                                                                                        .embed_url
                                                                                                }
                                                                                                title="YouTube video player"
                                                                                                frameBorder="0"
                                                                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                                                                referrerPolicy="strict-origin-when-cross-origin"
                                                                                                allowFullScreen
                                                                                            ></iframe>
                                                                                        </DialogDescription>
                                                                                    </DialogHeader>
                                                                                </DialogContent>
                                                                            </Dialog>
                                                                        ) : (
                                                                            // Non-clickable videos for other sections
                                                                            <div className="flex flex-row items-center w-full px-5 py-3 text-gray-400 gap-x-2">
                                                                                <div className="flex flex-row items-center font-semibold gap-x-2">
                                                                                    <LockIcon className="w-6 h-6" />
                                                                                    <span>
                                                                                        {
                                                                                            filteredVideo.title
                                                                                        }
                                                                                    </span>
                                                                                </div>
                                                                                <span className="ml-auto font-semibold">
                                                                                    {
                                                                                        filteredVideo.duration
                                                                                    }
                                                                                </span>
                                                                            </div>
                                                                        )}
                                                                    </li>
                                                                )
                                                            )}
                                                    </ul>
                                                </AccordionContent>
                                            </AccordionItem>
                                        ))}
                                    </Accordion>
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
                                                            {averageRating}{" "}
                                                            Rating Mentor
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
                                                            {totalkelasmentor}{" "}
                                                            Kusus
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
                                    <h1 className="mt-10 mb-5 text-xl font-bold lg:text-2xl">
                                        Kelas lainya dari mentor :{" "}
                                        {kelas.user.name}
                                    </h1>
                                    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                                        {allclass.map((kel) => (
                                            <article
                                                key={kel.id}
                                                className="overflow-hidden transition bg-white rounded-2xl grid grid-rows-[auto_1fr_auto]"
                                            >
                                                <Link
                                                    href={`/detailkelas/${kel.slug}`}
                                                    className="relative block"
                                                >
                                                    <span className="absolute px-5 py-2 font-medium tracking-widest text-white uppercase -right-px -top-px rounded-tr-2xl bg-maroon">
                                                        {kel.category.name}
                                                    </span>

                                                    <img
                                                        alt=""
                                                        src={`/storage/${kel.image}`}
                                                        className="object-cover w-full h-56"
                                                    />

                                                    <div className="p-4 space-y-3 bg-white sm:p-6">
                                                        <h3 className="mt-0.5 text-black mb-5 text-xl line-clamp-2 font-bold">
                                                            {kel.title}
                                                        </h3>
                                                        <div className="flex items-center p-2">
                                                            {kel.user.image ? (
                                                                <img
                                                                    src={`/storage/${kel.user.image}`}
                                                                    alt=""
                                                                    className="w-12 h-12 rounded-full"
                                                                />
                                                            ) : (
                                                                <img
                                                                    src="/default-avatar.svg"
                                                                    alt=""
                                                                    className="w-12 h-12 rounded-full"
                                                                />
                                                            )}
                                                            <div className="flex flex-col ml-3">
                                                                <span className="text-base font-medium">
                                                                    {
                                                                        kel.user
                                                                            .name
                                                                    }
                                                                </span>
                                                                <span className="text-sm text-gray-400">
                                                                    {
                                                                        kel.user
                                                                            .role
                                                                    }
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col items-start pt-5 gap-2">
                                                            {kel?.type?.id ===
                                                            1 ? (
                                                                <>
                                                                    {kel?.discount >
                                                                        0 && (
                                                                        <span className="relative text-base font-medium text-red-600">
                                                                            Rp.{" "}
                                                                            {Number(
                                                                                kel.price
                                                                            ).toLocaleString(
                                                                                "id-ID"
                                                                            )}
                                                                            <span className="absolute left-0 right-0 font-semibold border-b-2 border-red-700 bottom-2.5"></span>
                                                                        </span>
                                                                    )}
                                                                    <span className="text-base font-medium text-black">
                                                                        Rp.{" "}
                                                                        {Number(
                                                                            (kel.price ||
                                                                                0) -
                                                                                (kel.discount ||
                                                                                    0)
                                                                        ).toLocaleString(
                                                                            "id-ID"
                                                                        )}
                                                                    </span>
                                                                </>
                                                            ) : (
                                                                <span className="text-base font-medium text-black">
                                                                    Rp.0
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="flex pt-3">
                                                            {Array.from(
                                                                { length: 5 },
                                                                (_, index) => (
                                                                    <svg
                                                                        key={
                                                                            index
                                                                        }
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        viewBox="0 0 576 512"
                                                                        fill="currentColor"
                                                                        className={`w-5 h-5 ${
                                                                            Number(
                                                                                kel.average_rating
                                                                            ) >
                                                                            index
                                                                                ? "text-yellow-400"
                                                                                : "text-gray-300"
                                                                        }`}
                                                                    >
                                                                        <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
                                                                    </svg>
                                                                )
                                                            )}
                                                            <span className="ml-2 font-semibold text-black">
                                                                (
                                                                {Number(
                                                                    kel.average_rating
                                                                )}
                                                                )
                                                            </span>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </article>
                                        ))}
                                    </div>
                                </TabsContent>

                                <TabsContent value="testimoni">
                                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                                        {testimoni.length > 0 ? (
                                            testimoni.map(
                                                (testimoni, index) => (
                                                    <div
                                                        className="p-5 bg-white rounded-2xl"
                                                        key={index}
                                                    >
                                                        <div className="flex items-center space-x-3">
                                                            {testimoni.user
                                                                .image !=
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
                                                                        testimoni
                                                                            .user
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
                                                                        key={
                                                                            index
                                                                        }
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        viewBox="0 0 576 512"
                                                                        fill="currentColor"
                                                                        className={`w-5 h-5 ${
                                                                            Number(
                                                                                testimoni.rating
                                                                            ) >
                                                                            index
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
                                                    Belum ada review...
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                    <div className="hidden px-5 py-5 bg-white md:block lg:col-span-1 rounded-2xl max-h-min">
                        <div className="grid order-2 grid-cols-3 gap-5">
                            <div className="flex flex-col items-center bg-gray-100 hover:shadow-lg hover:shadow-maroon p-3 rounded-2xl hover:-translate-y-2 transition-all duration-200 hover:bg-maroon/50">
                                <img
                                    src={`/storage/${kelas.level.image}`}
                                    alt=""
                                    className="object-cover w-10 h-10"
                                />
                                <span className="font-medium text-sm ">
                                    {kelas.level.name}
                                </span>
                            </div>
                            <div className="flex flex-col items-center bg-gray-100 hover:shadow-lg hover:shadow-maroon p-3 rounded-2xl hover:-translate-y-2 transition-all duration-200 hover:bg-maroon/50">
                                <img
                                    src="/8.svg"
                                    alt=""
                                    className="w-12 h-12"
                                />
                                <span className="font-medium text-sm ">
                                    Sertifikat
                                </span>
                            </div>
                            <div className="flex flex-col items-center bg-gray-100 hover:shadow-lg hover:shadow-maroon p-3 rounded-2xl hover:-translate-y-2 transition-all duration-200 hover:bg-maroon/50">
                                <img
                                    src="/9.svg"
                                    alt=""
                                    className="w-12 h-12"
                                />
                                <span className="font-medium text-sm ">
                                    {studentjoin > 0 ? studentjoin : "0"} Siswa
                                </span>
                            </div>
                            <div className="flex flex-col items-center bg-gray-100 hover:shadow-lg hover:shadow-maroon p-3 rounded-2xl hover:-translate-y-2 transition-all duration-200 hover:bg-maroon/50">
                                <img
                                    src="/4.svg"
                                    alt=""
                                    className="w-12 h-12"
                                />
                                <span className="font-medium text-sm text-center">
                                    Unlimited <br /> access
                                </span>
                            </div>
                            <div className="flex flex-col items-center bg-gray-100 hover:shadow-lg hover:shadow-maroon p-3 rounded-2xl hover:-translate-y-2 transition-all duration-200 hover:bg-maroon/50">
                                <img
                                    src="/12.svg"
                                    alt=""
                                    className="w-12 h-12"
                                />
                                <span className="font-medium text-sm ">
                                    {totalvideo > 0 ? totalvideo : "0"} Video
                                </span>
                            </div>
                            <div className="flex flex-col items-center bg-gray-100 hover:shadow-lg hover:shadow-maroon p-3 rounded-2xl hover:-translate-y-2 transition-all duration-200 hover:bg-maroon/50">
                                <Star className="text-red-600 w-11 h-11" />
                                <span className="font-medium text-sm ">
                                    {Number(totalstar).toFixed(1)}
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center p-3 mt-10 hover:shadow-lg hover:shadow-maroon space-x-3 transition-all duration-200 bg-white border border-maroon rounded-2xl group hover:bg-maroon">
                            <img
                                src={`/storage/${kelas.category.image}`}
                                alt="User Avatar"
                                className="object-cover w-12 h-12"
                            />
                            <div className="flex flex-col">
                                <h1 className="text-2xl font-bold text-black group-hover:text-white">
                                    {kelas.category.name}
                                </h1>
                            </div>
                        </div>
                        <div className="flex flex-col pt-5 bg-gray-100 mt-10 p-5 rounded-2xl">
                            <span className="text-sm mb-3 text-gray-500">
                                Harga Kelas
                            </span>
                            {kelas.type.id === 2 ? (
                                <span className="text-2xl font-bold text-black">
                                    Rp. 0
                                </span>
                            ) : (
                                <>
                                    {kelas.discount > 0 && (
                                        <span className="relative text-2xl font-medium text-red-600">
                                            Rp.{" "}
                                            {Number(kelas.price).toLocaleString(
                                                "id-ID"
                                            )}
                                            <span className="absolute left-0 right-[12rem] bottom-4 font-semibold border-b-2 border-red-700"></span>
                                        </span>
                                    )}
                                    <span className="text-2xl font-bold text-black">
                                        Rp.{" "}
                                        {Number(
                                            kelas.price - kelas.discount
                                        ).toLocaleString("id-ID")}
                                    </span>
                                </>
                            )}
                            <br />
                            <ul className="prose">
                                <li className="flex items-center gap-2">
                                    <Check size={15} /> Akses selamanya
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check size={15} />
                                    Pelatihan Berkelanjutan
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check size={15} />
                                    Fleksibilitas Waktu
                                </li>
                            </ul>
                            <br />
                            {kelas.type.id === 2 ? (
                                <Link href={route("masuk")}>
                                    <PulsatingButton className="w-full bg-maroon">
                                        Gabung Kelas
                                    </PulsatingButton>
                                </Link>
                            ) : (
                                <Link href={route("masuk")}>
                                    <PulsatingButton className="w-full bg-maroon">
                                        Beli Kelas
                                    </PulsatingButton>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </HomeLayout>
    );
}
