import React from 'react';

const Footer = () => {
    return (
        <footer className="py-12 px-6 border-t border-white/5 bg-dark-950">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="text-center md:text-left">
                    <span className="font-display font-bold text-2xl tracking-tighter text-white block mb-2">
                        NFS<span className="text-brand">.</span>
                    </span>
                    <p className="text-gray-500 text-sm">© 2025 Need Flex Supply. Todos os direitos reservados.</p>
                </div>

                <div className="flex gap-6 text-sm text-gray-500">
                    <a href="#" className="hover:text-brand transition-colors">Termos</a>
                    <a href="#" className="hover:text-brand transition-colors">Privacidade</a>
                    <a href="#" className="hover:text-brand transition-colors">Contato</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
