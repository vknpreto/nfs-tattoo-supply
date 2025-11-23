import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Features from './components/Features';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import Checkout from './components/Checkout';
import SizeSelection from './components/SizeSelection';

import { trackPixel } from './utils/pixel';

function App() {
  const [view, setView] = useState('landing'); // 'landing' | 'size-selection' | 'checkout'
  const [cart, setCart] = useState({}); // { '03RL': 2, '09RM': 1 }

  const handleBuyClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setView('size-selection');
    trackPixel('ViewContent', { content_name: 'Cartuchos Prime' });
  };

  const handleCheckout = (newCart) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCart(newCart);
    setView('checkout');
    trackPixel('InitiateCheckout', {
      content_ids: Object.keys(newCart),
      num_items: Object.values(newCart).reduce((a, b) => a + b, 0),
      value: Object.values(newCart).reduce((a, b) => a + b, 0) * 89.99,
      currency: 'BRL'
    });
  };

  const handleBackToStore = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setView('landing');
    setCart({});
  };

  const handleBackToSize = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setView('size-selection');
  };

  const cartTotalItems = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <div className="bg-dark-950 min-h-screen text-white selection:bg-brand selection:text-black">
      <AnimatePresence mode="wait">
        {view === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <Header onCartClick={handleBuyClick} cartCount={cartTotalItems} />
            <main>
              <Hero onBuyClick={handleBuyClick} />
              <Marquee />
              <Features />
              <Pricing onBuyClick={handleBuyClick} />
            </main>
            <Footer />
          </motion.div>
        )}

        {view === 'size-selection' && (
          <motion.div
            key="size-selection"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <SizeSelection
              onCheckout={handleCheckout}
              onBack={handleBackToStore}
            />
          </motion.div>
        )}

        {view === 'checkout' && (
          <motion.div
            key="checkout"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Checkout
              onBack={handleBackToSize}
              cart={cart}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
