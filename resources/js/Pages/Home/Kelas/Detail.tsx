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
    CheckCircle,
    CircleCheckBig,
    LockIcon,
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
}
export default function Detail({
    kelas,
    sectionData,
    video,
    videoDemo,
    allclass,
    testimoni,
}: Props) {
    const [isScrolled, setIsScrolled] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true); // Set to true when scrolled
            } else {
                setIsScrolled(false); // Set to false when at the top
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    return (
        <HomeLayout>
            <section className="flex items-center justify-center h-56 bg-white mt-14">
                <div className="px-6 text-center space-y-7 ">
                    <h1 className="text-3xl font-bold lg:text-5xl">
                        Detail Kelas
                    </h1>
                    <Breadcrumb className="flex flex-row items-center justify-center mx-auto space-x-2">
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href={route("home")}>Home</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Detail Kelas</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </section>
            <section className="container py-10">
                <div className="grid grid-cols-1 gap-6 px-4 lg:px-0 md:grid-cols-2 lg:grid-cols-3">
                    <div className=" lg:col-span-2">
                        <HeroVideoDialog
                            className={`w-full px-4 lg:px-0 md:w-auto rounded-2xl ${
                                isScrolled ? "" : "lg:z-[999]"
                            }`}
                            animationStyle="from-center"
                            videoSrc={kelas.link_overview.embed_url}
                            thumbnailSrc={`/storage/${kelas.image}`}
                            thumbnailAlt="Hero Video"
                        />
                        <div className="px-4 lg:px-0">
                            <Tabs
                                defaultValue="about"
                                className="mt-10 overflow-auto"
                            >
                                <TabsList>
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
                                    <div className="mt-5 space-y-5">
                                        <h1 className="text-xl font-bold text-left text-black lg:text-2xl md:text-3xl">
                                            {kelas.title}
                                        </h1>
                                        <div className="flow-root py-3 border border-gray-100 rounded-lg shadow-sm">
                                            <dl className="-my-3 text-sm divide-y divide-gray-100">
                                                <div className="grid grid-cols-1 gap-1 p-3 sm:grid-cols-3 sm:gap-4">
                                                    <dt className="font-medium text-gray-900">
                                                        Harga Potongan Kelas
                                                    </dt>
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
                                    </div>
                                    <p
                                        className="mt-5 text-sm leading-relaxed text-gray-700"
                                        dangerouslySetInnerHTML={{
                                            __html: kelas.description,
                                        }}
                                    />
                                </TabsContent>
                                <TabsContent value="pelajaran">
                                    <Accordion
                                        type="single"
                                        collapsible
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
                                    <div className="flex items-center p-5 mt-10 space-x-5 bg-white rounded-2xl">
                                        {kelas.user.image ? (
                                            <img
                                                src={`/storage/${kelas.user.image}`}
                                                alt="User Avatar"
                                                className="object-cover w-16 h-16 rounded-full"
                                            />
                                        ) : kelas.user.jk === "Laki-laki" ? (
                                            <img
                                                src="/lk.png"
                                                className="object-cover w-16 h-16 rounded-full"
                                                alt="Laki-laki Avatar"
                                            />
                                        ) : (
                                            <img
                                                src="/cw.png"
                                                alt="Perempuan Avatar"
                                                className="object-cover w-16 h-16 rounded-full"
                                            />
                                        )}
                                        <div className="flex flex-col">
                                            <h1 className="text-2xl font-bold text-black">
                                                {kelas.user.name}
                                            </h1>
                                            <span className="text-base text-black underline">
                                                Mentor
                                            </span>
                                            <p
                                                className="hidden text-sm leading-relaxed text-gray-500 lg:block "
                                                dangerouslySetInnerHTML={{
                                                    __html: kelas.user.bio,
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <h1 className="mt-10 mb-5 text-2xl font-bold">
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
                                                    href={`/student/detailkelas/${kel.slug}`}
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
                                                        <div className="flex flex-row items-center pt-5 space-x-2">
                                                            {kel.discount >
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
                                                                    kel.price -
                                                                        kel.discount
                                                                ).toLocaleString(
                                                                    "id-ID"
                                                                )}
                                                            </span>
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
                                        {testimoni.map((testimoni, index) => (
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
                                        ))}
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                    <div className="px-5 py-10 bg-white lg:col-span-1 rounded-2xl max-h-min">
                        <div className="grid grid-cols-3">
                            <div className="flex flex-col items-center gap-y-2">
                                <ChartNoAxesColumnIncreasing className="w-8 h-8 text-maroon" />
                                <span className="font-semibold ">
                                    {kelas.level.name}
                                </span>
                            </div>
                            <div className="flex flex-col items-center gap-y-2">
                                <BookUserIcon className="w-8 h-8 text-maroon" />
                                <span className="font-semibold ">
                                    Sertifikat
                                </span>
                            </div>
                            <div className="flex flex-col items-center gap-y-2">
                                <CircleCheckBig className="w-8 h-8 text-maroon" />
                                <span className="text-base font-semibold text-center">
                                    Unlimited <br /> access
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center p-5 mt-5 space-x-3 bg-white border border-maroon rounded-2xl">
                            <img
                                src={`/storage/${kelas.category.image}`}
                                alt="User Avatar"
                                className="object-cover w-12 h-12"
                            />
                            <div className="flex flex-col">
                                <h1 className="text-2xl font-bold text-black">
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
                        <Link href={route("home.login")} className="mt-5">
                            <PulsatingButton className="w-full bg-maroon">
                                Gabung Kelas Sekarang
                            </PulsatingButton>
                        </Link>
                    </div>
                </div>
            </section>
        </HomeLayout>
    );
}
