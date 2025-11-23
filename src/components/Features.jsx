import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Crosshair, Zap } from 'lucide-react';

const Features = () => {
    const features = [
        {
            title: "Aço Cirúrgico 316L",
            desc: "Agulhas afiadas a laser para penetração suave e cicatrização rápida.",
            icon: <Zap className="w-8 h-8 text-brand" />,
            image: "/sharpening.jpg",
            colSpan: "md:col-span-2",
            rowSpan: "md:row-span-2"
        },
        {
            title: "Membrana de Segurança",
            desc: "Sistema elástico de alta tensão. Zero contaminação cruzada.",
            icon: <Shield className="w-6 h-6 text-brand" />,
            image: "/safety.png",
            colSpan: "md:col-span-1",
            rowSpan: "md:row-span-1"
        },
        {
            title: "Estabilidade Absoluta",
            desc: "Chassi interno reforçado impede vibração lateral da agulha.",
            icon: <Crosshair className="w-6 h-6 text-brand" />,
            image: "/stability.png",
            colSpan: "md:col-span-1",
            rowSpan: "md:row-span-1"
        }
    ];

    return (
        <section id="tecnologia" className="py-24 px-6 relative">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="font-display font-bold text-4xl md:text-5xl mb-4">ENGENHARIA <span className="text-gray-600">INDUSTRIAL</span></h2>
                    <div className="h-1 w-20 bg-brand" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className={`glass-panel rounded-2xl p-8 relative overflow-hidden group hover:border-brand/30 transition-colors ${feature.colSpan} ${feature.rowSpan}`}
                        >
                            <div className="relative z-10 h-full flex flex-col justify-between">
                                <div className="bg-white/5 w-fit p-3 rounded-xl backdrop-blur-sm">
                                    {feature.icon}
                                </div>

                                <div>
                                    <h3 className="font-display font-bold text-2xl mb-2">{feature.title}</h3>
                                    <p className="text-gray-400 text-sm md:text-base">{feature.desc}</p>
                                </div>
                            </div>

                            {feature.image && (
                                <>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-0" />
                                    <img
                                        src={feature.image}
                                        alt={feature.title}
                                        className="absolute inset-0 w-full h-full object-cover -z-10 opacity-50 group-hover:scale-105 transition-transform duration-700"
                                    />
                                </>
                            )}

                            {/* Hover Glow */}
                            <div className="absolute inset-0 bg-brand/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
