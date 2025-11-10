import React, { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import products from '../data/products.js';
import { useStore } from '../context/Store.jsx';
import { formatINR, uid } from '../utils/format.js';

export default function Checkout() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const buyId = Number(params.get('buy'));
  const single = products.find(p => p.id === buyId);

  const { cart, addToCart, totals, applyCoupon, coupon, removeCoupon, clearCart } = useStore();
  const navigate = useNavigate();

  // If direct buy, ensure item in cart (1 qty) only for summary
  const items = useMemo(() => {
    if (single) return [{ ...single, qty: 1 }];
    return cart;
  }, [single, cart]);

  const [address, setAddress] = useState({ name: '', phone: '', line1: '', city: '', pincode: '' });
  const [payment, setPayment] = useState('UPI');
  const [upi, setUpi] = useState('');
  const [card, setCard] = useState({ number: '', name: '', expiry: '', cvv: '' });

  const placeOrder = (e) => {
    e.preventDefault();
    if (!address.name || !address.phone || !address.line1 || !address.city || !address.pincode) {
      alert('Please fill all address fields'); return;
    }
    if (payment === 'UPI' && !upi) { alert('Enter UPI ID'); return; }
    if (payment === 'CARD' && (!card.number || !card.name || !card.expiry || !card.cvv)) { alert('Enter full card details'); return; }

    const orderId = uid();
    if (!single) clearCart();
    navigate(`/success?order=${orderId}`);
  };

  const handleCoupon = () => {
    const code = prompt('Enter coupon code (SAVE10 / WELCOME100 / DIWALI300)');
    if (!code) return;
    const res = applyCoupon(code);
    alert(res.message);
  };

  // Ensure direct-buy item is in cart visually if user navigates elsewhere
  if (single && !cart.find(i => i.id === single.id)) {
    // Add but not strictly necessary; keeping UX minimal
    // addToCart(single, 1);
  }

  const subtotal = items.reduce((s,i)=>s+i.price*i.qty,0);
  let discount = 0;
  if (coupon) {
    if (subtotal >= coupon.min) {
      discount = coupon.type === 'PCT' ? Math.round(subtotal*coupon.value/100) : coupon.value;
    }
  }
  const shipping = subtotal > 1499 ? 0 : (subtotal ? 79 : 0);
  const total = Math.max(0, subtotal - discount) + shipping;

  return (
    <form onSubmit={placeOrder} className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2 space-y-6">
        <h2 className="text-3xl font-bold">Checkout</h2>

        <section className="bg-white p-5 rounded-2xl shadow-soft space-y-3">
          <h3 className="font-semibold">Delivery Address</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            <input placeholder="Full Name" className="border rounded-xl px-4 py-2" value={address.name} onChange={e=>setAddress({...address, name:e.target.value})} />
            <input placeholder="Phone" className="border rounded-xl px-4 py-2" value={address.phone} onChange={e=>setAddress({...address, phone:e.target.value})} />
          </div>
          <input placeholder="Address Line" className="border rounded-xl px-4 py-2 w-full" value={address.line1} onChange={e=>setAddress({...address, line1:e.target.value})} />
          <div className="grid sm:grid-cols-2 gap-3">
            <input placeholder="City" className="border rounded-xl px-4 py-2" value={address.city} onChange={e=>setAddress({...address, city:e.target.value})} />
            <input placeholder="PIN Code" className="border rounded-xl px-4 py-2" value={address.pincode} onChange={e=>setAddress({...address, pincode:e.target.value})} />
          </div>
        </section>

        <section className="bg-white p-5 rounded-2xl shadow-soft space-y-4">
          <h3 className="font-semibold">Payment</h3>
          <div className="flex gap-4">
            <label className="flex items-center gap-2"><input type="radio" name="pay" checked={payment==='UPI'} onChange={()=>setPayment('UPI')} /> UPI</label>
            <label className="flex items-center gap-2"><input type="radio" name="pay" checked={payment==='CARD'} onChange={()=>setPayment('CARD')} /> Card</label>
            <label className="flex items-center gap-2"><input type="radio" name="pay" checked={payment==='COD'} onChange={()=>setPayment('COD')} /> Cash on Delivery</label>
          </div>
          {payment === 'UPI' && <input placeholder="yourname@bank" className="border rounded-xl px-4 py-2 w-full" value={upi} onChange={e=>setUpi(e.target.value)} />}
          {payment === 'CARD' && (
            <div className="grid sm:grid-cols-2 gap-3">
              <input placeholder="Card Number" className="border rounded-xl px-4 py-2" value={card.number} onChange={e=>setCard({...card, number:e.target.value})} />
              <input placeholder="Name on Card" className="border rounded-xl px-4 py-2" value={card.name} onChange={e=>setCard({...card, name:e.target.value})} />
              <input placeholder="MM/YY" className="border rounded-xl px-4 py-2" value={card.expiry} onChange={e=>setCard({...card, expiry:e.target.value})} />
              <input placeholder="CVV" className="border rounded-xl px-4 py-2" value={card.cvv} onChange={e=>setCard({...card, cvv:e.target.value})} />
            </div>
          )}
        </section>
      </div>

      <aside className="space-y-4">
        <div className="bg-white p-5 rounded-2xl shadow-soft">
          <h4 className="font-semibold mb-3">Order Summary</h4>
          <div className="space-y-3 max-h-64 overflow-auto pr-2">
            {items.map(i => (
              <div key={i.id} className="flex items-center gap-3">
                <img src={i.image} className="w-14 h-14 object-cover rounded-lg" />
                <div className="flex-1">
                  <div className="text-sm font-medium">{i.name}</div>
                  <div className="text-xs text-gray-500">{i.brand}</div>
                </div>
                <div className="text-sm">{i.qty} × {formatINR(i.price)}</div>
              </div>
            ))}
          </div>
          <div className="mt-3 text-sm space-y-1">
            <div className="flex justify-between"><span>Subtotal</span><span>{formatINR(subtotal)}</span></div>
            <div className="flex justify-between"><span>Discount</span><span>-{formatINR(discount)}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>{shipping ? formatINR(shipping) : 'Free'}</span></div>
          </div>
          <div className="flex justify-between mt-3 font-bold text-lg"><span>Total</span><span>{formatINR(total)}</span></div>
          <div className="flex gap-2 mt-3">
            {!coupon ? <button type="button" className="px-3 py-2 rounded-xl border" onClick={handleCoupon}>Apply Coupon</button>
                     : <button type="button" className="px-3 py-2 rounded-xl border" onClick={removeCoupon}>Remove {coupon.code}</button>}
          </div>
          <button type="submit" className="btn-primary w-full mt-4">Place Order</button>
        </div>
      </aside>
    </form>
  )
}
