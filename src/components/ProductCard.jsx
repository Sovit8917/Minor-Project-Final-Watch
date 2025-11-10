import React from 'react';
import { Heart, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatINR } from '../utils/format.js';
import { useStore } from '../context/Store.jsx';
import { Link } from 'react-router-dom';

export default function ProductCard({ item }) {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const wished = wishlist.some(p => p.id === item.id);

  return (
    <motion.div whileHover={{ scale: 1.02 }} className="card">
      <Link to={`/product/${item.id}`}>
        <img src={item.image} alt={item.name} className="w-full h-64 object-cover" loading="lazy" />
      </Link>
      <div className="p-5 space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold">{item.name}</h4>
          <button onClick={() => toggleWishlist(item)} aria-label="Toggle wishlist" className={wished ? 'text-pink-600' : 'text-gray-500 hover:text-pink-600'}>
            <Heart size={20} />
          </button>
        </div>
        <p className="text-gray-500">{item.brand} • {item.year}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-blue-600">{formatINR(item.price)}</span>
          <div className="flex items-center gap-1 text-yellow-500"><Star size={18} /><span>{item.rating}</span></div>
        </div>
        <div className="flex gap-3 pt-2">
          <button className="btn-primary" onClick={() => addToCart(item, 1)}>Add to Cart</button>
          <Link to={`/checkout?buy=${item.id}`} className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-100">Buy Now</Link>
        </div>
      </div>
    </motion.div>
  )
}
