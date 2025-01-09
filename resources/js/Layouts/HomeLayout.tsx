import Footer from "@/components/home/Footer";
import Navbar from "@/components/home/Navbar";
import ScrollProgress from "@/components/ui/scroll-progress";
import { SettingType } from "@/types/setting";
import { Head, usePage } from "@inertiajs/react";

type Props = {
    children: React.ReactNode;
};
interface SettingProps {
    setting: SettingType;
}
export default function HomeLayout({ children }: Props) {
    const { setting } = usePage().props as unknown as SettingProps;
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
            <div className="overflow-x-hidden">
                <ScrollProgress />
                <Navbar />
                {children}
                <Footer />
            </div>
        </>
    );
}
