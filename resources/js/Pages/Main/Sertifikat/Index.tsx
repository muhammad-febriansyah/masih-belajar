import SideBar from "@/components/main/SideBar";
import MainLayout from "@/Layouts/MainLayout";
import React from "react";

export default function Index() {
    return (
        <MainLayout>
            <section className="container py-10 mt-16 md:mt-22">
                <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
                    <SideBar />
                    <div className="bg-blue-500 w-[70%]">asd</div>
                </div>
            </section>
        </MainLayout>
    );
}
