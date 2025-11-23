import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Plus, Minus, ShoppingBag, AlertCircle } from 'lucide-react';

import { trackPixel } from '../utils/pixel';

const SizeSelection = ({ onCheckout, onBack }) => {
    const sizes = ['03RL', '05RL', '07RL', '09RL', '11RL', '07RM', '09RM'];
    const [cart, setCart] = useState({});
    const [lowStock, setLowStock] = useState({});

    useEffect(() => {
        // Randomly assign low stock to some items for urgency
        const stock = {};
        sizes.forEach(size => {
            if (Math.random() > 0.6) {
                stock[size] = Math.floor(Math.random() * 5) + 4; // Minimum 4 items
            }
        });
        setLowStock(stock);
    }, []);

    const updateQuantity = (size, delta) => {
        setCart(prev => {
            const current = prev[size] || 0;
            const next = Math.max(0, current + delta);

            if (delta > 0) {
                trackPixel('AddToCart', {
                    content_name: `Caixa ${size}`,
                    content_ids: [size],
                    content_type: 'product',
                    value: 89.99,
                    currency: 'BRL'
                });
            }

            if (next === 0) {
                const { [size]: _, ...rest } = prev;
                return rest;
            }
            return { ...prev, [size]: next };
        });
    };

    const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);
    const totalPrice = totalItems * 89.99;

    return (
        <div className="min-h-screen bg-dark-950 pt-24 pb-32 px-4 md:px-6 flex flex-col items-center">
            <div className="max-w-5xl w-full">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Voltar
                </button>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h2 className="font-display font-bold text-4xl md:text-5xl mb-4">MONTE SEU KIT</h2>
                    <p className="text-gray-400">Selecione a quantidade de caixas por medida (20un/caixa).</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {sizes.map((size, i) => {
                        const qty = cart[size] || 0;
                        return (
                            <motion.div
                                key={size}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.05 }}
                                className={`
                  relative p-6 rounded-xl border transition-all duration-300
                  ${qty > 0
                                        ? 'bg-brand/5 border-brand shadow-[0_0_20px_rgba(57,255,20,0.1)]'
                                        : 'bg-white/5 border-white/10 hover:border-brand/30'}
                `}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <span className={`font-display font-bold text-3xl ${qty > 0 ? 'text-brand' : 'text-white'}`}>
                                            {size}
                                        </span>
                                        <p className="text-xs text-gray-500 mt-1">Caixa c/ 20un</p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <span className="text-sm text-gray-500 line-through">R$ 140,00</span>
                                            <span className="text-sm font-bold text-white">R$ 89,99</span>
                                        </div>
                                    </div>
                                    {lowStock[size] && (
                                        <div className="flex items-center gap-1 text-[10px] font-bold text-orange-500 bg-orange-500/10 px-2 py-1 rounded-full animate-pulse">
                                            <AlertCircle className="w-3 h-3" />
                                            RESTAM {lowStock[size]}
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center justify-between bg-black/20 rounded-lg p-2">
                                    <button
                                        onClick={() => updateQuantity(size, -1)}
                                        disabled={qty === 0}
                                        className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors text-white"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="font-mono font-bold text-xl w-12 text-center text-white">
                                        {qty}
                                    </span>
                                    <button
                                        onClick={() => updateQuantity(size, 1)}
                                        className="w-10 h-10 flex items-center justify-center rounded-md bg-white/10 hover:bg-white/20 transition-colors text-white"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Floating Cart Bar */}
            <AnimatePresence>
                {totalItems > 0 && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        className="fixed bottom-4 left-4 right-4 z-40"
                    >
                        <div className="max-w-3xl mx-auto bg-dark-900/95 backdrop-blur-xl border border-brand/30 p-4 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
                                <div className="flex items-center gap-4">
                                    <div className="bg-brand text-black w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl shrink-0">
                                        {totalItems}
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 uppercase tracking-wider">Total do Pedido</p>
                                        <div className="flex items-baseline gap-2">
                                            <span className="font-bold text-xl md:text-2xl text-white">
                                                R$ {totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                            </span>
                                            <span className="text-xs md:text-sm text-gray-500 line-through">
                                                R$ {(totalItems * 140).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => onCheckout(cart)}
                                className="w-full md:w-auto btn-primary py-3 px-6 md:px-12 flex items-center justify-center gap-2 text-sm md:text-base whitespace-nowrap"
                            >
                                FINALIZAR
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SizeSelection;
