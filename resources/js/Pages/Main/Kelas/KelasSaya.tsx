import SideBar from "@/components/main/SideBar";
import MainLayout from "@/Layouts/MainLayout";
import { UserType } from "@/types/user";
import { Link } from "@inertiajs/react";
import React from "react";

interface Props {
    auth: UserType;
}
export default function KelasSaya({ auth }: Props) {
    return (
        <MainLayout>
            <section className="container py-10 mt-16 lg:mt-22">
                <div className="flex flex-col items-center justify-between gap-5 lg:flex-row">
                    <SideBar />
                    <div className="bg-blue-500 w-full lg:w-[70%]">asd</div>
                </div>
            </section>
        </MainLayout>
    );
}
