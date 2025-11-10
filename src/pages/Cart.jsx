import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/Store.jsx';
import { formatINR } from '../utils/format.js';

export default function Cart() {
  const { cart, updateQty, removeFromCart, totals } = useStore();
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-6">Your Cart</h2>
      {cart.length === 0 ? <p className="text-gray-600">Your cart is empty.</p> : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {cart.map(item => (
              <div key={item.id} className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-soft">
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
                <div className="flex-1">
                  <div className="font-semibold">{item.name}</div>
                  <div className="text-gray-500 text-sm">{item.brand}</div>
                  <div className="text-blue-600 font-bold mt-1">{formatINR(item.price)}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1 rounded-lg border" onClick={()=>updateQty(item.id, item.qty-1)}>-</button>
                  <span>{item.qty}</span>
                  <button className="px-3 py-1 rounded-lg border" onClick={()=>updateQty(item.id, item.qty+1)}>+</button>
                </div>
                <button className="px-3 py-2 rounded-lg border text-red-600" onClick={()=>removeFromCart(item.id)}>Remove</button>
              </div>
            ))}
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-soft h-fit">
            <h4 className="font-semibold mb-3">Order Summary</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between"><span>Subtotal</span><span>{formatINR(totals.subtotal)}</span></div>
              <div className="flex justify-between"><span>Discount</span><span>-{formatINR(totals.discount)}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>{totals.shipping ? formatINR(totals.shipping) : 'Free'}</span></div>
            </div>
            <div className="flex justify-between mt-3 font-bold text-lg"><span>Total</span><span>{formatINR(totals.total)}</span></div>
            <Link to="/checkout" className="btn-primary w-full inline-block text-center mt-4">Proceed to Checkout</Link>
          </div>
        </div>
      )}
    </div>
  )
}
