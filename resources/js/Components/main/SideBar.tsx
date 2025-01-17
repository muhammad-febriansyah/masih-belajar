import { UserType } from "@/types/user";
import { Link, usePage } from "@inertiajs/react";
import React from "react";
import { route } from "ziggy-js";

interface Props {
    auth: UserType;
}
export default function SideBar() {
    const { auth } = usePage().props as unknown as Props;
    const { url, component } = usePage();

    // Dapatkan URL dari route "dashboard.myprofile"

    // Memeriksa apakah URL saat ini sama dengan route yang aktif
    // Dapatkan URL dari route "dashboard.myprofile"
    const profileRoute = route("dashboard.myprofile");

    // Memeriksa apakah URL saat ini sama dengan route yang aktif
    const isActive = url.startsWith(profileRoute) // Mengecek jika URL saat ini dimulai dengan profileRoute
        ? " active:bg-red-950"
        : "flex flex-row items-center px-3 py-3.5 transition-all duration-200 rounded-2xl gap-x-2 group hover:bg-gray-100 active:bg-gray-200";

    return (
        <div className="bg-white w-full lg:w-[25%] rounded-2xl p-5">
            <div className="flex flex-col gap-y-5">
                {auth.image ? (
                    <div className="relative flex items-center gap-2 cursor-pointer">
                        <img
                            src={`/storage/${auth.image}`}
                            className="rounded-full size-10"
                            alt=""
                        />
                        <span className="text-base font-medium text-black hover:underline hover:text-maroon hover:cursor-pointer hover:font-semibold">
                            {auth.name}
                        </span>
                    </div>
                ) : (
                    <div className="relative flex items-center gap-2 cursor-pointer">
                        <img
                            src="/default-avatar.svg"
                            className="rounded-full size-10"
                            alt=""
                        />
                        <span>{auth.name}</span>
                    </div>
                )}
                <div className="flex flex-col gap-3">
                    <Link
                        href="/dashboard/kelas-saya"
                        className={
                            url.startsWith("/dashboard/kelas-saya")
                                ? "flex flex-row items-center px-3 py-3.5 transition-all duration-200 rounded-2xl gap-x-2 group bg-red-500"
                                : "flex flex-row items-center px-3 py-3.5 transition-all duration-200 rounded-2xl gap-x-2 group hover:bg-red-200"
                        } // Menentukan kelas berdasarkan apakah link aktif
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M13.4499 4.88017H16.5199C20.2099 4.88017 22.0099 6.85017 21.9999 10.8902V15.7602C21.9999 19.6202 19.6199 22.0002 15.7499 22.0002H8.23988C4.38988 22.0002 1.99988 19.6202 1.99988 15.7502V8.24017C1.99988 4.10017 3.83988 2.00017 7.46988 2.00017H9.04988C9.98088 1.99017 10.8499 2.42017 11.4199 3.15017L12.2999 4.32017C12.5799 4.67017 12.9999 4.88017 13.4499 4.88017ZM7.36988 15.2902H16.6299C17.0399 15.2902 17.3699 14.9502 17.3699 14.5402C17.3699 14.1202 17.0399 13.7902 16.6299 13.7902H7.36988C6.94988 13.7902 6.61988 14.1202 6.61988 14.5402C6.61988 14.9502 6.94988 15.2902 7.36988 15.2902Z"
                                className={
                                    url.startsWith("/dashboard/kelas-saya")
                                        ? "fill-white"
                                        : "fill-gray-500 group-hover:fill-white"
                                }
                                fill="#7E8B92" // Warna default dari ikon
                            ></path>
                        </svg>

                        <span
                            className={
                                url.startsWith("/dashboard/kelas-saya")
                                    ? "text-white"
                                    : "text-gray-500 group-hover:text-white"
                            }
                        >
                            Kelas Saya
                        </span>
                    </Link>
                    <Link
                        href="/dashboard/list-sertifikat"
                        className={
                            url.startsWith("/dashboard/list-sertifikat")
                                ? "flex flex-row items-center px-3 py-3.5 transition-all duration-200 rounded-2xl gap-x-2 group bg-red-500"
                                : "flex flex-row items-center px-3 py-3.5 transition-all duration-200 rounded-2xl gap-x-2 group hover:bg-red-200"
                        } // Menentukan kelas berdasarkan apakah link aktif
                    >
                        <svg
                            width="19"
                            height="21"
                            viewBox="0 0 19 21"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10.8046 0.083374C11.0728 0.083374 11.2791 0.302124 11.2791 0.562541V3.91671C11.2791 5.82296 12.8364 7.38546 14.7238 7.39587C15.5076 7.39587 16.1264 7.40629 16.6008 7.40629L16.7766 7.40552C17.0936 7.40311 17.5205 7.39587 17.89 7.39587C18.1479 7.39587 18.3541 7.60421 18.3541 7.86462V16.2396C18.3541 18.823 16.2811 20.9167 13.7234 20.9167H5.5138C2.83228 20.9167 0.645813 18.7188 0.645813 16.0105V4.78129C0.645813 2.19796 2.72915 0.083374 5.29722 0.083374H10.8046ZM11.9082 13.5209H6.29763C5.87477 13.5209 5.52411 13.8646 5.52411 14.2917C5.52411 14.7188 5.87477 15.073 6.29763 15.073H11.9082C12.331 15.073 12.6817 14.7188 12.6817 14.2917C12.6817 13.8646 12.331 13.5209 11.9082 13.5209ZM9.7836 8.31254H6.29763C5.87477 8.31254 5.52411 8.66671 5.52411 9.09379C5.52411 9.52087 5.87477 9.86463 6.29763 9.86463H9.7836C10.2065 9.86463 10.5571 9.52087 10.5571 9.09379C10.5571 8.66671 10.2065 8.31254 9.7836 8.31254ZM12.782 1.02712C12.782 0.578166 13.3214 0.355249 13.6297 0.679207C14.7446 1.85004 16.6928 3.89692 17.782 5.04067C18.0831 5.35629 17.8624 5.88025 17.4282 5.88129C16.5804 5.88442 15.581 5.88129 14.8622 5.874C13.7215 5.874 12.782 4.92504 12.782 3.77296V1.02712Z"
                                className={
                                    url.startsWith("/dashboard/list-sertifikat")
                                        ? "fill-white"
                                        : " group-hover:fill-gray-500"
                                }
                                fill="#7E8B92"
                            ></path>
                        </svg>
                        <span
                            className={
                                url.startsWith("/dashboard/list-sertifikat")
                                    ? "text-white"
                                    : " group-hover:text-gray-500"
                            }
                        >
                            List Sertifikat
                        </span>
                    </Link>
                    <Link
                        href="/dashboard/my-profile"
                        className={
                            url.startsWith("/dashboard/my-profile")
                                ? "flex flex-row items-center px-3 py-3.5 transition-all duration-200 rounded-2xl gap-x-2 group bg-red-500"
                                : "flex flex-row items-center px-3 py-3.5 transition-all duration-200 rounded-2xl gap-x-2 group hover:bg-red-200"
                        } // Menentukan kelas berdasarkan apakah link aktif
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M17.254 7.40036C17.254 10.3829 14.9029 12.8007 12.0026 12.8007C9.10242 12.8007 6.75133 10.3829 6.75133 7.40036C6.75133 4.41782 9.10242 2 12.0026 2C14.9029 2 17.254 4.41782 17.254 7.40036ZM16.5099 15.8434C18.1796 16.1815 19.2697 16.7331 19.7369 17.6228C20.0877 18.3171 20.0877 19.1437 19.7369 19.8381C19.2697 20.7278 18.2229 21.3149 16.4926 21.6174C15.7216 21.7729 14.9412 21.874 14.1568 21.9199C13.4301 22 12.7034 22 11.968 22H10.6444C10.3676 21.9644 10.0994 21.9466 9.83983 21.9466C9.0554 21.9063 8.27478 21.8082 7.50399 21.653C5.8343 21.3327 4.74424 20.7633 4.27707 19.8737C4.09673 19.529 4.00165 19.144 4.00023 18.7527C3.99647 18.3589 4.08868 17.9705 4.26842 17.6228C4.72694 16.7331 5.817 16.1548 7.50399 15.8434C8.27818 15.6915 9.06145 15.5934 9.84848 15.5498C11.2882 15.4338 12.7344 15.4338 14.1741 15.5498C14.9581 15.5955 15.7383 15.6936 16.5099 15.8434Z"
                                className={
                                    url.startsWith("/dashboard/my-profile")
                                        ? "fill-white"
                                        : "group-hover:fill-gray-500"
                                }
                                fill="#7E8B92"
                            ></path>
                        </svg>
                        <span
                            className={
                                url.startsWith("/dashboard/my-profile")
                                    ? "text-white"
                                    : "group-hover:text-gray-500"
                            }
                        >
                            My Profile
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
