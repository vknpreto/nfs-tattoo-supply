import React from 'react';
import { ShoppingCart, Menu } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = ({ onCartClick }) => {
    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
        >
            <div className="max-w-7xl mx-auto glass-panel rounded-full px-6 py-3 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <span className="font-display font-bold text-2xl tracking-tighter text-white">
                        NFS<span className="text-brand">.</span>
                    </span>
                </div>

                {/* Desktop Menu */}
                <nav className="hidden md:flex items-center gap-8">
                    {['TECNOLOGIA', 'REVIEWS', 'FAQ'].map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="text-sm font-medium text-gray-400 hover:text-brand transition-colors tracking-widest"
                        >
                            {item}
                        </a>
                    ))}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={onCartClick}
                        className="relative p-2 hover:bg-white/5 rounded-full transition-colors group"
                    >
                        <ShoppingCart className="w-5 h-5 text-white group-hover:text-brand transition-colors" />
                        <span className="absolute top-0 right-0 w-4 h-4 bg-brand text-black text-[10px] font-bold flex items-center justify-center rounded-full">
                            1
                        </span>
                    </button>

                    <button className="md:hidden p-2 hover:bg-white/5 rounded-full transition-colors">
                        <Menu className="w-5 h-5 text-white" />
                    </button>
                </div>
            </div>
        </motion.header>
    );
};

export default Header;
