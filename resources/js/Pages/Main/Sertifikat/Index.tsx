import SideBar from "@/components/main/SideBar";
import MainLayout from "@/Layouts/MainLayout";
import React from "react";

export default function Index() {
    return (
        <MainLayout>
            <section className="container py-10 mt-16 md:mt-22">
                <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
                    <SideBar />
                    <div className="bg-white w-[70%]">
                        <div className="flex flex-col items-center justify-center w-full col-span-2 p-5 bg-white gap-y-10 h-min rounded-2xl">
                            <img
                                src="/nodata.svg"
                                className="object-cover size-32"
                                alt=""
                            />
                            <span className="text-base font-bold text-black transition-all duration-200 md:text-xl hover:text-biru">
                                Tidak ada data.
                            </span>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
