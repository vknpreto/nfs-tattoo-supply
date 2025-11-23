export const trackPixel = (event, data = {}) => {
    if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', event, data);
    }
};
