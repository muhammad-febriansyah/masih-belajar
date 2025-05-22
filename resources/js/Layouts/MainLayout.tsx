import Footer from "@/components/main/Footer";
import Navbar from "@/components/main/Navbar";
import ScrollProgress from "@/components/ui/scroll-progress";
import { SettingType } from "@/types/setting";
import { UserType } from "@/types/user";
import { Head, usePage } from "@inertiajs/react";

type Props = {
    children: React.ReactNode;
};
interface SettingProps {
    setting: SettingType;
    auth: UserType;
}
export default function MainLayout({ children }: Props) {
    const { setting } = usePage().props as unknown as SettingProps;
    const { auth } = usePage().props as unknown as SettingProps;
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
            <div className="overflow-x-hidden" id="home">
                <ScrollProgress />
                <Navbar setting={setting} auth={auth} dataKelas={[]} />
                {children}
                <Footer />
            </div>
        </>
    );
}
