import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';

const Pricing = ({ onBuyClick }) => {
    return (
        <section className="py-24 px-6 bg-dark-900 relative overflow-hidden">
            {/* Background Noise/Texture */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            <div className="max-w-4xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h2 className="font-display font-bold text-4xl md:text-6xl mb-6">O SEGREDO DO PREÇO</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        A NFS cortou os distribuidores. Você paga pelo material e tecnologia, não pela marca.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-center">
                    {/* Competitor */}
                    <div className="p-8 rounded-2xl border border-white/5 opacity-50 grayscale">
                        <h3 className="font-display font-bold text-xl mb-2">Concorrência</h3>
                        <p className="text-sm text-gray-500 mb-6">Marcas tradicionais com intermediários</p>
                        <div className="text-3xl font-bold text-gray-400 line-through decoration-red-500 decoration-2">
                            R$ 140,00
                        </div>
                    </div>

                    {/* NFS */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="p-10 rounded-2xl bg-white/5 border border-brand/20 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 bg-brand text-black text-xs font-bold px-3 py-1 rounded-bl-lg">
                            DIRETO DA FÁBRICA
                        </div>

                        <h3 className="font-display font-bold text-2xl mb-2 text-white">NFS Supply</h3>
                        <p className="text-sm text-gray-400 mb-6">Venda direta sem atravessadores</p>

                        <div className="text-5xl font-bold text-brand text-glow mb-8">
                            R$ 89,99
                        </div>

                        <ul className="space-y-4 mb-8">
                            {['Caixa com 20 unidades', 'Envio em 24h', 'Garantia de Qualidade'].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                                    <div className="w-5 h-5 rounded-full bg-brand/20 flex items-center justify-center">
                                        <Check className="w-3 h-3 text-brand" />
                                    </div>
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <button
                            onClick={onBuyClick}
                            className="w-full py-4 bg-brand text-black font-bold text-lg tracking-wider hover:bg-white transition-colors flex items-center justify-center gap-2 group"
                        >
                            COMPRAR AGORA <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Pricing;
