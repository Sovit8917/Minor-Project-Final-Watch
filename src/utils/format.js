export const formatINR = (n) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(n);
export const uid = () => Math.random().toString(36).slice(2,9).toUpperCase();
