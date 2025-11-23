import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check, Copy, ShieldCheck, Truck, Loader2, Lock, Award, Factory } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { PixPayload } from '../utils/pix';

import { trackPixel } from '../utils/pixel';

const Checkout = ({ onBack, cart }) => {
    const [step, setStep] = useState(1);
    const [loadingCep, setLoadingCep] = useState(false);
    const [pixCode, setPixCode] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        cpf: '',
        email: '',
        phone: '',
        cep: '',
        address: '',
        number: '',
        neighborhood: '',
        city: ''
    });

    const cartItems = Object.entries(cart);
    const totalQuantity = Object.values(cart).reduce((a, b) => a + b, 0);
    const totalPrice = totalQuantity * 89.99;
    const originalPrice = totalQuantity * 140.00;

    // PIX CONFIGURATION
    const PIX_KEY = '+5542998468340';
    const MERCHANT_NAME = 'Renato Dezvnka Junior';
    const MERCHANT_CITY = 'Guarapuava';

    const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [step]);

    useEffect(() => {
        if (step === 2 && timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [step, timeLeft]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        if (step === 2) {
            const payload = new PixPayload({
                key: PIX_KEY,
                name: MERCHANT_NAME,
                city: MERCHANT_CITY,
                transactionId: `NFS${Date.now().toString().slice(-8)}`,
                amount: totalPrice
            });
            setPixCode(payload.generate());
        }
    }, [step, totalPrice]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (name === 'cep' && value.length === 8) {
            fetchAddress(value);
        }
    };

    const fetchAddress = async (cep) => {
        setLoadingCep(true);
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();
            if (!data.erro) {
                setFormData(prev => ({
                    ...prev,
                    address: data.logradouro,
                    neighborhood: data.bairro,
                    city: `${data.localidade}/${data.uf}`
                }));
            }
        } catch (error) {
            console.error('Erro ao buscar CEP', error);
        } finally {
            setLoadingCep(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStep(2);
        trackPixel('AddPaymentInfo', {
            content_ids: cartItems.map(([size]) => size),
            value: totalPrice,
            currency: 'BRL'
        });
    };

    const handleCopyPix = () => {
        navigator.clipboard.writeText(pixCode);
        alert('Código Pix copiado!');
    };

    const handleWhatsApp = () => {
        trackPixel('Purchase', {
            content_ids: cartItems.map(([size]) => size),
            value: totalPrice,
            currency: 'BRL',
            num_items: totalQuantity
        });

        const itemsList = cartItems.map(([size, qty]) => `- ${qty}x Caixa ${size}`).join('\n');

        const message = `*NOVO PEDIDO NFS SUPPLY* 🚀\n\n*Resumo do Pedido:*\n${itemsList}\n\n*Total:* R$ ${totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}\n\n*Dados de Envio:*\nNome: ${formData.name}\nCPF: ${formData.cpf}\nEndereço: ${formData.address}, ${formData.number}\nBairro: ${formData.neighborhood}\nCidade: ${formData.city}\nCEP: ${formData.cep}\n\n*Pagamento:* PIX Realizado\n\nAguardo confirmação e código de rastreio!`;

        const url = `https://wa.me/5542998468340?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    return (
        <div className="min-h-screen bg-dark-950 pt-24 pb-12 px-6">
            <div className="max-w-6xl mx-auto">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Voltar
                </button>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Order Summary (Left) */}
                    <div className="order-2 lg:order-1">
                        <div className="glass-panel p-8 rounded-2xl sticky top-24">
                            <h3 className="font-display font-bold text-xl mb-6">Resumo do Pedido</h3>

                            <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                                {cartItems.map(([size, qty]) => (
                                    <div key={size} className="flex gap-4 bg-white/5 p-3 rounded-lg">
                                        <div className="w-16 h-16 bg-black/20 rounded-md flex items-center justify-center shrink-0">
                                            <img
                                                src="/box-prime.png"
                                                alt="Cartuchos"
                                                className="w-full h-full object-cover rounded-md opacity-80"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <h4 className="font-bold text-white text-sm">Cartuchos PRIME (20un)</h4>
                                                <span className="text-xs font-bold bg-brand text-black px-2 py-0.5 rounded-full">
                                                    {size}
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-400 mt-1">Quantidade: {qty}x</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-xs text-gray-500 line-through">
                                                    R$ {(qty * 140).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                                </span>
                                                <p className="text-brand font-bold text-sm">
                                                    R$ {(qty * 89.99).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-3 border-t border-white/10 pt-6 mb-6">
                                <div className="flex justify-between text-sm text-gray-400">
                                    <span>Subtotal</span>
                                    <span className="line-through">R$ {originalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                </div>
                                <div className="flex justify-between text-sm text-brand">
                                    <span className="flex items-center gap-2"><Truck className="w-4 h-4" /> Frete</span>
                                    <span>GRÁTIS</span>
                                </div>
                                <div className="flex justify-between text-sm text-brand">
                                    <span>Desconto NFS</span>
                                    <span>- R$ {(originalPrice - totalPrice).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-end border-t border-white/10 pt-6 mb-8">
                                <span className="text-xl font-bold text-white">Total</span>
                                <div className="text-right">
                                    <span className="block text-sm text-gray-500 line-through mb-1">
                                        De R$ {originalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                    </span>
                                    <span className="block text-3xl font-bold text-brand text-glow">
                                        R$ {totalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                    </span>
                                </div>
                            </div>

                            {/* Trust Badges */}
                            <div className="grid grid-cols-3 gap-2">
                                <div className="bg-white/5 p-3 rounded-lg flex flex-col items-center text-center gap-2">
                                    <Lock className="w-5 h-5 text-brand" />
                                    <span className="text-[10px] text-gray-400 uppercase font-bold">Compra Segura</span>
                                </div>
                                <div className="bg-white/5 p-3 rounded-lg flex flex-col items-center text-center gap-2">
                                    <Award className="w-5 h-5 text-brand" />
                                    <span className="text-[10px] text-gray-400 uppercase font-bold">Garantia 7 Dias</span>
                                </div>
                                <div className="bg-white/5 p-3 rounded-lg flex flex-col items-center text-center gap-2">
                                    <Factory className="w-5 h-5 text-brand" />
                                    <span className="text-[10px] text-gray-400 uppercase font-bold">Direto Fábrica</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Steps (Right) */}
                    <div className="order-1 lg:order-2">
                        {/* Progress Bar */}
                        <div className="flex items-center gap-4 mb-8">
                            <div className={`flex-1 h-1 rounded-full ${step >= 1 ? 'bg-brand' : 'bg-white/10'}`} />
                            <div className={`flex-1 h-1 rounded-full ${step >= 2 ? 'bg-brand' : 'bg-white/10'}`} />
                        </div>

                        <AnimatePresence mode="wait">
                            {step === 1 ? (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                >
                                    <h2 className="font-display font-bold text-3xl mb-6">Dados de Envio</h2>
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        {/* Personal Data */}
                                        <div className="space-y-4">
                                            <h3 className="text-sm font-bold text-brand uppercase tracking-wider">Pessoal</h3>
                                            <div>
                                                <input
                                                    required
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-transparent border-b border-white/20 py-3 focus:border-brand focus:outline-none transition-colors text-white placeholder-gray-600"
                                                    placeholder="Nome Completo"
                                                />
                                            </div>

                                            <div className="grid grid-cols-2 gap-6">
                                                <input
                                                    required
                                                    type="text"
                                                    name="cpf"
                                                    value={formData.cpf}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-transparent border-b border-white/20 py-3 focus:border-brand focus:outline-none transition-colors text-white placeholder-gray-600"
                                                    placeholder="CPF"
                                                />
                                                <input
                                                    required
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-transparent border-b border-white/20 py-3 focus:border-brand focus:outline-none transition-colors text-white placeholder-gray-600"
                                                    placeholder="WhatsApp"
                                                />
                                            </div>
                                            <input
                                                required
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full bg-transparent border-b border-white/20 py-3 focus:border-brand focus:outline-none transition-colors text-white placeholder-gray-600"
                                                placeholder="E-mail"
                                            />
                                        </div>

                                        {/* Address Data */}
                                        <div className="space-y-4 pt-4">
                                            <h3 className="text-sm font-bold text-brand uppercase tracking-wider flex items-center gap-2">
                                                Endereço
                                                {loadingCep && <Loader2 className="w-3 h-3 animate-spin" />}
                                            </h3>

                                            <input
                                                required
                                                type="text"
                                                name="cep"
                                                maxLength={8}
                                                value={formData.cep}
                                                onChange={handleInputChange}
                                                className="w-full bg-transparent border-b border-white/20 py-3 focus:border-brand focus:outline-none transition-colors text-white placeholder-gray-600"
                                                placeholder="CEP (somente números)"
                                            />

                                            <div className="grid grid-cols-3 gap-6">
                                                <div className="col-span-2">
                                                    <input
                                                        required
                                                        type="text"
                                                        name="address"
                                                        value={formData.address}
                                                        onChange={handleInputChange}
                                                        className="w-full bg-transparent border-b border-white/20 py-3 focus:border-brand focus:outline-none transition-colors text-white placeholder-gray-600"
                                                        placeholder="Rua / Avenida"
                                                    />
                                                </div>
                                                <input
                                                    required
                                                    type="text"
                                                    name="number"
                                                    value={formData.number}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-transparent border-b border-white/20 py-3 focus:border-brand focus:outline-none transition-colors text-white placeholder-gray-600"
                                                    placeholder="Número"
                                                />
                                            </div>

                                            <div className="grid grid-cols-2 gap-6">
                                                <input
                                                    required
                                                    type="text"
                                                    name="neighborhood"
                                                    value={formData.neighborhood}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-transparent border-b border-white/20 py-3 focus:border-brand focus:outline-none transition-colors text-white placeholder-gray-600"
                                                    placeholder="Bairro"
                                                />
                                                <input
                                                    required
                                                    type="text"
                                                    name="city"
                                                    value={formData.city}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-transparent border-b border-white/20 py-3 focus:border-brand focus:outline-none transition-colors text-white placeholder-gray-600"
                                                    placeholder="Cidade/UF"
                                                />
                                            </div>
                                        </div>

                                        <button type="submit" className="w-full btn-primary mt-8">
                                            IR PARA PAGAMENTO
                                        </button>
                                    </form>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                >
                                    <h2 className="font-display font-bold text-3xl mb-2">Pagamento via Pix</h2>
                                    <div className="bg-brand/10 text-brand text-sm px-4 py-2 rounded mb-8 inline-block font-mono">
                                        ⚡ Estoque reservado por {formatTime(timeLeft)}
                                    </div>

                                    <div className="bg-white p-6 rounded-xl mb-8 flex flex-col items-center">
                                        <div className="bg-white p-2 rounded mb-4">
                                            {pixCode && (
                                                <QRCodeSVG value={pixCode} size={200} />
                                            )}
                                        </div>
                                        <p className="text-black font-medium text-sm mb-4">Escaneie o QR Code acima</p>

                                        <div className="w-full flex gap-2">
                                            <input
                                                readOnly
                                                value={pixCode}
                                                className="flex-1 bg-gray-100 border border-gray-300 rounded px-3 py-2 text-sm text-gray-600 outline-none truncate"
                                            />
                                            <button
                                                onClick={handleCopyPix}
                                                className="p-2 bg-gray-900 text-white rounded hover:bg-gray-700 transition-colors"
                                            >
                                                <Copy className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleWhatsApp}
                                        className="w-full btn-primary flex items-center justify-center gap-2"
                                    >
                                        <Check className="w-5 h-5" />
                                        JÁ PAGUEI - ENVIAR COMPROVANTE
                                    </button>

                                    <p className="text-center text-gray-500 text-xs mt-4">
                                        Ao clicar, você será redirecionado para o WhatsApp para confirmar seu pedido.
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
