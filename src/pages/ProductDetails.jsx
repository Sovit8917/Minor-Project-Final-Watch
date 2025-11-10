import React from 'react';
import { useParams, Link } from 'react-router-dom';
import products from '../data/products.js';
import { formatINR } from '../utils/format.js';
import { useStore } from '../context/Store.jsx';

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const item = products.find(p => p.id === Number(id));
  if (!item) return <div className="max-w-5xl mx-auto px-6 py-16">Product not found.</div>;
  const wished = wishlist.some(p => p.id === item.id);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-10">
      <img src={item.image} alt={item.name} className="w-full rounded-2xl shadow-soft" />
      <div className="space-y-4">
        <h2 className="text-3xl font-bold">{item.name}</h2>
        <p className="text-gray-500">{item.brand} • {item.year}</p>
        <div className="text-2xl font-extrabold text-blue-600">{formatINR(item.price)}</div>
        <p className="text-gray-600">Premium stainless steel body, sapphire crystal glass, 5ATM water resistance, and precision quartz movement.</p>
        <div className="flex gap-3 pt-2">
          <button className="btn-primary" onClick={()=>addToCart(item, 1)}>Add to Cart</button>
          <Link to={`/checkout?buy=${item.id}`} className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-100">Buy Now</Link>
          <button onClick={()=>toggleWishlist(item)} className={wished ? 'px-4 py-2 rounded-xl bg-pink-600 text-white' : 'px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-100'}>{wished?'Wishlisted':'Add to Wishlist'}</button>
        </div>
      </div>
    </div>
  )
}
