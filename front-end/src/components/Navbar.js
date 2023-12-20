import React from 'react';
import { Link } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import logoImg from "../assets/logo.png";
import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';

<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Vina Sans:400,700&display=swap" />


const navigation = [
  { name: 'Home', path: '/' },
  { name: 'Dashboard', path: '/Account' },
  { name: 'Camera', path: '/Camera' },
  { name: 'About', path: '/About' },
  // Add more items as needed
];


const Navbar = () => {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logOut } = UserAuth();

  const handleSignOut = async () => {
      try {
          await logOut();
      } catch (error) {
          console.log(error);
      }
  }

  return (
    <div className="bg-white">
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="flex justify-between items-center bg-yellow-200 sticky top-0 p-4">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img
              className="p-4"
              src={logoImg}
              width="120"
              alt="logo"
            />
            <span className="text-black text-lg no-underline font-mono font-bold text-2xl">PiPaws</span>
          </Link>
        </div>
        <div className="flex items-center lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center text-2xl rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">{mobileMenuOpen ? 'Close menu' : 'Open main menu'}</span>
            {mobileMenuOpen ? <HiOutlineX className="h-6 w-6" /> : <HiOutlineMenu className="h-6 w-6" />}
          </button>
        </div>
        <div className="items-center justify-center hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="text-lg font-semibold font-mono leading-6 text-gray-900"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-3 lg:justify-end items-center justify-center text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium font-mono rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900">
          {user ? (
            <button onClick={handleSignOut} className="text-sm font-semibold leading-6 text-gray-900">
              Sign Out <span aria-hidden="true">&rarr;</span>
            </button>
          ) : (
            <Link to="/signin" className="text-sm font-semibold leading-6 text-gray-900">
              Sign In <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
        </div>
      </nav>
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  </div>
    );
  };
    
      /* </div> <nav className="flex justify-between items-center bg-yellow-200 sticky top-0">
      //     <a href = "/" className="flex justify-between items-center">
      //         <img */
      /* //             className="p-4"
      //             src={logoImg}
      //             width = "120"                    
      //             alt="logo"
      //         />
      //     <Link to = "/" class="text-black text-lg no-underline font-mono font-bold text-2xl">PiPaws</Link>
      //     </a> */
      /* //     <ul className= "flex">
      //         <li className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium font-mono rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900">
      //             <Link to = "/About">About</Link>
      //         </li>
      //         <li className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium font-mono rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900">
      //         <Link to = "/Account">Dashboard</Link>
      //         </li>
      //         <li className="text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium font-mono rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-yellow-900">
      //             {user?.displayName ? (<button onClick={handleSignOut}>Log out</button>) : (<Link to="/signin">Login</Link>)}
      //         </li>
          
      //     </ul>
          
      // </nav> */
  

export default Navbar;