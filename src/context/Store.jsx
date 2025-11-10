import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import productsData from '../data/products.js';

const StoreContext = createContext(null);

const getLS = (k, v) => {
  try { return JSON.parse(localStorage.getItem(k)) ?? v; } catch { return v; }
}
const setLS = (k, v) => localStorage.setItem(k, JSON.stringify(v));

export function StoreProvider({ children }) {
  const [products] = useState(productsData);
  const [cart, setCart] = useState(getLS('cart', []));
  const [wishlist, setWishlist] = useState(getLS('wishlist', []));
  const [coupon, setCoupon] = useState(getLS('coupon', null));

  useEffect(() => setLS('cart', cart), [cart]);
  useEffect(() => setLS('wishlist', wishlist), [wishlist]);
  useEffect(() => setLS('coupon', coupon), [coupon]);

  const addToCart = (item, qty = 1) => {
    setCart(prev => {
      const idx = prev.findIndex(p => p.id === item.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx].qty += qty;
        return next;
      }
      return [...prev, { ...item, qty }];
    });
  };
  const removeFromCart = (id) => setCart(prev => prev.filter(p => p.id !== id));
  const updateQty = (id, qty) => setCart(prev => prev.map(p => p.id === id ? { ...p, qty: Math.max(1, qty) } : p));
  const clearCart = () => setCart([]);

  const toggleWishlist = (item) => {
    setWishlist(prev => prev.some(p => p.id === item.id) ? prev.filter(p => p.id !== item.id) : [...prev, item]);
  };

  const applyCoupon = (code) => {
    const normalized = code.trim().toUpperCase();
    const coupons = {
      'SAVE10': { type: 'PCT', value: 10, min: 0, desc: '10% off' },
      'WELCOME100': { type: 'FLAT', value: 100, min: 999, desc: '₹100 off on ₹999+' },
      'DIWALI300': { type: 'FLAT', value: 300, min: 1999, desc: '₹300 off on ₹1999+' }
    };
    const c = coupons[normalized];
    if (!c) return { ok: false, message: 'Invalid coupon' };
    setCoupon({ code: normalized, ...c });
    return { ok: true, message: `${c.desc} applied` };
  };
  const removeCoupon = () => setCoupon(null);

  const totals = useMemo(() => {
    const subtotal = cart.reduce((s, p) => s + p.price * p.qty, 0);
    let discount = 0;
    if (coupon) {
      if (subtotal >= coupon.min) {
        discount = coupon.type === 'PCT' ? Math.round(subtotal * coupon.value / 100) : coupon.value;
      }
    }
    const shipping = subtotal > 1499 ? 0 : (subtotal ? 79 : 0);
    const total = Math.max(0, subtotal - discount) + shipping;
    return { subtotal, discount, shipping, total };
  }, [cart, coupon]);

  const value = { products, cart, wishlist, coupon, totals, addToCart, removeFromCart, updateQty, clearCart, toggleWishlist, applyCoupon, removeCoupon };
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export const useStore = () => useContext(StoreContext);
