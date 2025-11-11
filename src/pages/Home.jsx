import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import products from '../data/products.js';
import ProductCard from '../components/ProductCard.jsx';

export default function Home() {
  const top = products.slice(0, 4);
  return (
    <div>
      <section className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-10">
        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
          <h1 className="text-5xl font-extrabold leading-tight text-gray-900">
            Redefine <span className="text-blue-600">Time</span> with Elegance
          </h1>
          <p className="text-gray-600 text-lg max-w-xl">Discover luxury watches crafted with precision and passion. Designed by S&S for those who value timeless style.</p>
          <Link to="/collection" className="btn-primary inline-block">Explore Collection</Link>
        </motion.div>
        <motion.img initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} src="/images/gemini-watch.png" alt="hero watch" className="w-[420px] rounded-2xl shadow-soft" />
      </section>

      <section className="max-w-7xl mx-auto px-6 py-8">
        <h3 className="text-2xl font-semibold mb-6">Featured Watches</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {top.map(p => <ProductCard key={p.id} item={p} />)}
        </div>
      </section>
    </div>
  )
}
