import React from 'react';

const Marquee = () => {
    return (
        <div className="bg-brand py-3 overflow-hidden border-y border-black/10 relative z-20">
            <div className="flex animate-marquee whitespace-nowrap">
                {[...Array(10)].map((_, i) => (
                    <span key={i} className="text-black font-bold text-sm md:text-base tracking-widest mx-4 flex items-center gap-4">
                        FRETE GRÁTIS BRASIL <span className="w-1.5 h-1.5 bg-black rounded-full" />
                        ENVIO IMEDIATO <span className="w-1.5 h-1.5 bg-black rounded-full" />
                        QUALIDADE PREMIUM <span className="w-1.5 h-1.5 bg-black rounded-full" />
                        NFS SUPPLY <span className="w-1.5 h-1.5 bg-black rounded-full" />
                    </span>
                ))}
            </div>
        </div>
    );
};

export default Marquee;
