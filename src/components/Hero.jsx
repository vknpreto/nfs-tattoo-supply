import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Hero = ({ onBuyClick }) => {
    return (
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(57,255,20,0.05),transparent_50%)]" />

            <div className="container mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-brand text-xs font-bold tracking-[0.2em] mb-6">
                        NOVA GERAÇÃO • 2025
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="font-display font-bold text-5xl md:text-7xl lg:text-9xl tracking-tighter leading-[0.9] mb-8"
                >
                    PRECISÃO.<br />
                    <span className="text-gray-400">ESTABILIDADE.</span><br />
                    FLUIDEZ<span className="text-brand">.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="max-w-xl mx-auto text-gray-400 text-lg md:text-xl mb-12 leading-relaxed"
                >
                    O Cartucho Prime redefine o padrão industrial. Aço 316L. Membrana de Segurança.
                    <span className="text-white block mt-2">Preço de Fábrica.</span>
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                >
                    <button
                        onClick={onBuyClick}
                        className="group relative px-8 py-4 bg-brand text-black font-bold text-lg tracking-wider hover:bg-white transition-all duration-300 overflow-hidden clip-path-slant"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            APROVEITAR PROMOÇÃO <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </button>
                </motion.div>
            </div>

            {/* Decorative Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)] pointer-events-none" />
        </section>
    );
};

export default Hero;
