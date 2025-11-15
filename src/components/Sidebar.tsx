import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import properties from "../assets/images/properties-icon.svg"
import card from "../assets/images/card-icon.svg"
import menu from "../assets/images/menu-icon.svg"
import tv from "../assets/images/tv-icon.svg"
import setting from "../assets/images/setting-icon.svg"
import profile from "../assets/images/profile-icon.svg"
import user from "../assets/images/user-icon.svg"

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { id: 'menu', path: '/menu', icon: menu, label: 'Menu' },
    { id: 'properties', path: '/properties', icon: properties, label: 'Properties' },
    { id: 'tv', path: '/tv', icon: tv, label: 'TV' },
    { id: 'settings', path: '/settings', icon: setting, label: 'Settings' },
    { id: 'cards', path: '/cards', icon: card, label: 'Cards' },
    { id: 'profile', path: '/profile', icon: profile, label: 'Profile' },
    { id: 'users', path: '/', icon: user, label: 'Users' },
  ];

  return (
    <div className="w-[72px] bg-white border-r border-[#CAD2D8] flex flex-col items-center py-3">
      <div className='flex items-center pb-3 border-b border-[#CAD2D8] w-full justify-center'>
        <div className="w-8 h-8 text-white bg-[#939393] rounded-full flex items-center justify-center text-sm font-semibold">
          JL
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down-icon lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg>
      </div>
      
      <nav className="flex flex-col items-center space-y-1 flex-1 w-full">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.id}
              to={item.path}
              className={`flex flex-col items-center justify-center w-full py-2 px-2 rounded-lg relative transition-colors ${
                isActive 
                  ? 'text-[#15191E]' 
                  : 'text-[#566676] hover:text-[#566676]'
              }`}
            >
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-black"></div>
              )}
              <img src={item.icon} alt={item.label} className="w-5 h-5 mb-1" />
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar