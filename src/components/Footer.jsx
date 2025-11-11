import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
        <div>
          <h4 className="font-semibold text-white mb-2">S&S Watch Company</h4>
          <p className="text-sm opacity-80">Premium watches designed for timeless elegance and everyday performance.</p>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-2">Support</h4>
          <ul className="space-y-1 text-sm opacity-90">
            <li>Warranty & Care</li>
            <li>Service Centers</li>
            <li>Shipping & Returns</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-2">Contact Us</h4>
          <p className="text-sm opacity-90">support@S&SWatches.com</p>
          <p className="text-sm opacity-90" >+91-9337012814</p>
          <p className="text-sm opacity-90" >+91-9938640175</p>
          <p className="text-sm opacity-90" >Bhubaneswar</p>
        </div>
      </div>
      <div className="text-center text-xs py-3 bg-black/40">© {new Date().getFullYear()} S&S Watch Company. All rights reserved.</div>
    </footer>
  )
}
