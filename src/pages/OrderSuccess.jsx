import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function OrderSuccess() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const order = params.get('order');
  return (
    <div className="min-h-[60vh] grid place-items-center px-6 py-16 text-center">
      <div className="bg-white p-10 rounded-2xl shadow-soft max-w-md">
        <h2 className="text-3xl font-bold mb-2">Order Confirmed 🎉</h2>
        <p className="text-gray-600">Thank you for shopping with S&S! Your order ID is <span className="font-mono font-semibold">{order}</span>.</p>
        <Link to="/collection" className="btn-primary inline-block mt-6">Continue Shopping</Link>
      </div>
    </div>
  )
}
