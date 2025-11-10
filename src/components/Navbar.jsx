import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import Logo from './Logo.jsx';
import { useStore } from '../context/Store.jsx';

export default function Navbar() {
  const { cart, wishlist } = useStore();
  const active = ({ isActive }) => isActive ? 'text-black' : 'text-gray-600 hover:text-black';

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <header className="bg-white sticky top-0 z-50 border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <Logo className="w-9 h-9 text-blue-600" />
          <span>S&S Watches</span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <NavLink to="/" className={active}>Home</NavLink>
          <NavLink to="/collection" className={active}>Collection</NavLink>
          <NavLink to="/wishlist" className={active}>Wishlist</NavLink>
          <NavLink to="/cart" className={active}>Cart</NavLink>
        </div>
        <div className="flex items-center gap-4">
          <NavLink to="/wishlist" className="relative text-gray-700 hover:text-black">
            <Heart />
            {wishlist.length > 0 && <span className="absolute -top-2 -right-2 text-xs bg-pink-600 text-white w-5 h-5 grid place-items-center rounded-full">{wishlist.length}</span>}
          </NavLink>
          <NavLink to="/cart" className="relative text-gray-700 hover:text-black">
            <ShoppingCart />
            {cartCount > 0 && <span className="absolute -top-2 -right-2 text-xs bg-blue-600 text-white w-5 h-5 grid place-items-center rounded-full">{cartCount}</span>}
          </NavLink>
        </div>
      </nav>
    </header>
  )
}
