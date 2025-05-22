import HomeLayout from "@/Layouts/HomeLayout";
import { SettingType } from "@/types/setting";
import { TermConditionType } from "@/types/term";
interface Props {
    setting: SettingType;
    term: TermConditionType;
}
export default function Index({ setting, term }: Props) {
    return (
        <HomeLayout>
            <section className="container py-10 mt-16 md:mt-32">
                <h1 className="text-2xl font-bold text-gray-800 md:text-4xl text-center mb-10">
                    Syarat dan Ketentuan
                </h1>
                <div className="bg-white p-5 rounded-2xl">
                    <p
                        className="prose"
                        dangerouslySetInnerHTML={{ __html: term.body }}
                    />
                </div>
            </section>
        </HomeLayout>
    );
}
