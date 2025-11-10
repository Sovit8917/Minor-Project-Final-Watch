import React, { useMemo, useState } from 'react';
import ProductCard from '../components/ProductCard.jsx';
import products from '../data/products.js';

export default function Collection() {
  const [q, setQ] = useState('');
  const [sort, setSort] = useState('pop');

  const filtered = useMemo(() => {
    const s = q.toLowerCase();
    let arr = products.filter(p => p.name.toLowerCase().includes(s) || p.brand.toLowerCase().includes(s));
    if (sort === 'priceAsc') arr.sort((a,b)=>a.price-b.price);
    if (sort === 'priceDesc') arr.sort((a,b)=>b.price-a.price);
    if (sort === 'new') arr.sort((a,b)=>b.year-a.year);
    return arr;
  }, [q, sort]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <h2 className="text-3xl font-bold">Collection</h2>
        <div className="flex gap-3">
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search watches..." className="px-4 py-2 rounded-xl border border-gray-300 w-64" />
          <select value={sort} onChange={e=>setSort(e.target.value)} className="px-4 py-2 rounded-xl border border-gray-300">
            <option value="pop">Popular</option>
            <option value="new">Newest</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filtered.map(p => <ProductCard key={p.id} item={p} />)}
      </div>
    </div>
  )
}
