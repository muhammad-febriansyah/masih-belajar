import HomeLayout from "@/Layouts/HomeLayout";
import { AboutType } from "@/types/about";
import { SettingType } from "@/types/setting";
import { TentangKamiType } from "@/types/tentang_kami";
import { motion } from "framer-motion";

interface Props {
    setting: SettingType;
    data: TentangKamiType;
    about: AboutType[];
}

export default function Index({ setting, data, about }: Props) {
    // Animation variants for better organization
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.9 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.7,
                ease: "easeOut",
                type: "spring",
                stiffness: 100,
            },
        },
    };

    return (
        <HomeLayout>
            <motion.section
                className="container mx-auto py-10 mt-16 md:mt-32 px-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Enhanced Header Section */}
                <motion.div
                    className="text-center mb-20"
                    variants={itemVariants}
                >
                    <motion.div
                        className="inline-block mb-4"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <span className="px-4 py-2 bg-maroon/10 text-maroon rounded-full text-sm font-medium tracking-wide uppercase">
                            Tentang Kami
                        </span>
                    </motion.div>

                    <motion.h1
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-maroon mb-8 leading-tight"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        {data.title}
                    </motion.h1>

                    <motion.div
                        className="max-w-4xl mx-auto"
                        variants={itemVariants}
                    >
                        <div
                            className="text-base md:text-lg text-gray-700 leading-relaxed text-center prose prose-lg max-w-none"
                            dangerouslySetInnerHTML={{
                                __html: data.description,
                            }}
                        />
                    </motion.div>
                </motion.div>

                {/* Hero Image Section */}
                <motion.div className="mb-20" variants={itemVariants}>
                    <motion.div
                        className="relative group cursor-pointer max-w-5xl mx-auto"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                        <div className="relative overflow-hidden rounded-3xl shadow-2xl h-[300px] md:h-[500px]">
                            <motion.img
                                src={`/storage/${data.image}`}
                                alt={data.title}
                                className="w-full h-full object-cover"
                                initial={{ scale: 1.1 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 1.2 }}
                                whileHover={{ scale: 1.05 }}
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                            <div className="absolute inset-0 rounded-3xl ring-1 ring-white/20" />
                        </div>
                    </motion.div>
                </motion.div>

                {about && about.length > 0 && (
                    <motion.div
                        className="bg-gradient-to-r from-maroon/5 to-maroon/10 rounded-3xl p-8 md:p-12 max-w-6xl mx-auto"
                        variants={itemVariants}
                    >
                        <div className="text-center">
                            <h3 className="text-2xl md:text-3xl font-bold text-maroon mb-8">
                                Mengapa Memilih Kami?
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {about.slice(0, 6).map((item, index) => (
                                    <motion.div
                                        key={item.id}
                                        className="text-center group"
                                        whileHover={{ scale: 1.05 }}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            delay: index * 0.1,
                                            duration: 0.5,
                                        }}
                                    >
                                        {/* Image as Icon */}
                                        <div className="relative w-20 h-20 mx-auto mb-4 rounded-2xl overflow-hidden  transition-shadow duration-300">
                                            <img
                                                src={`/storage/${item.image}`}
                                                alt={item.title}
                                                className="w-full h-full  object-contain group-hover:scale-110 transition-transform duration-300"
                                            />
                                        </div>

                                        <h4 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-maroon transition-colors duration-300">
                                            {item.title}
                                        </h4>

                                        <div
                                            className="text-gray-600 text-sm leading-relaxed line-clamp-3"
                                            dangerouslySetInnerHTML={{
                                                __html: item.description,
                                            }}
                                        />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Decorative element */}
                <motion.div
                    className="flex justify-center mt-16"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                >
                    <div className="w-32 h-1 bg-gradient-to-r from-transparent via-maroon to-transparent rounded-full"></div>
                </motion.div>
            </motion.section>
        </HomeLayout>
    );
}
