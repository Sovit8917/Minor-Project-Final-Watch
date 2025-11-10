import React from 'react';
import { useStore } from '../context/Store.jsx';
import ProductCard from '../components/ProductCard.jsx';

export default function Wishlist() {
  const { wishlist } = useStore();
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-6">Your Wishlist</h2>
      {wishlist.length === 0 ? <p className="text-gray-600">No items yet.</p> :
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {wishlist.map(p => <ProductCard key={p.id} item={p} />)}
        </div>
      }
    </div>
  )
}
