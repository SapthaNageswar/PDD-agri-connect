import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Sprout,
  ShoppingBag,
  CloudSun,
  Users,
  Bell,
  TrendingUp,
  Menu,
  X,
  Globe,
  LogOut,
  ShieldCheck
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Badge } from './ui';
import { useAuth } from '../lib/auth';
import { getAuth, signOut } from 'firebase/auth';
import { firebaseApp } from '../firebase';

interface LayoutProps {
  children: React.ReactNode;
}

const translations: Record<string, Record<string, string>> = {
  EN: {
    dashboard: 'Dashboard',
    advisory: 'AI Advisory',
    marketplace: 'Marketplace',
    weather: 'Weather',
    priceIntel: 'Price Intel',
    experts: 'Experts',
    profile: 'Profile',
    logout: 'Logout'
  },
  HI: {
    dashboard: 'डैशबोर्ड',
    advisory: 'एआई सलाह',
    marketplace: 'बाजार',
    weather: 'मौसम',
    priceIntel: 'मूल्य इंटेल',
    experts: 'विशेषज्ञ',
    profile: 'प्रोफ़ाइल',
    logout: 'लॉगआउट'
  },
  TA: {
    dashboard: 'டைஷ்போர்ட்',
    advisory: 'ஏஐ ஆலோசனை',
    marketplace: 'சந்தை',
    weather: 'வானிலை',
    priceIntel: 'விலை அறிவுசார்',
    experts: 'நிபுணர்கள்',
    profile: 'சுயவிவரம்',
    logout: 'வெளியேறு'
  },
  TE: {
    dashboard: 'డాష్‌బోర్డ్',
    advisory: 'AI సలహా',
    marketplace: 'మార్కెట్‌ప్లేస్',
    weather: 'వాతావరణం',
    priceIntel: 'ధర ఇంటెలిజెన్స్',
    experts: 'నిపుణులు',
    profile: 'ప్రొఫైల్',
    logout: 'లాగ్ అవుట్'
  }
};

export const Layout = ({ children }: LayoutProps) => {
  const { role, setRole, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [lang, setLang] = useState('EN');
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = {
    farmer: [
      {
        name: 'dashboard',
        path: '/farmer',
        icon: LayoutDashboard
      },
      {
        name: 'advisory',
        path: '/advisory',
        icon: Sprout
      },
      {
        name: 'marketplace',
        path: '/marketplace',
        icon: ShoppingBag
      },
      {
        name: 'weather',
        path: '/weather',
        icon: CloudSun
      },
      {
        name: 'priceIntel',
        path: '/prices',
        icon: TrendingUp
      },
      {
        name: 'experts',
        path: '/experts',
        icon: Users
      }
    ],
    buyer: [
      {
        name: 'dashboard',
        path: '/buyer',
        icon: LayoutDashboard
      },
      {
        name: 'marketplace',
        path: '/marketplace',
        icon: ShoppingBag
      },
      {
        name: 'priceIntel',
        path: '/prices',
        icon: TrendingUp
      }
    ],
    admin: [
      {
        name: 'dashboard',
        path: '/admin',
        icon: LayoutDashboard
      },
      {
        name: 'marketplace',
        path: '/marketplace',
        icon: TrendingUp
      },
      {
        name: 'verifyExperts',
        path: '/admin/experts',
        icon: ShieldCheck
      }
    ]
  };

  const currentNav = navItems[role];
  const toggleLang = () => setLang(prev => (prev === 'EN' ? 'HI' : prev === 'HI' ? 'TA' : prev === 'TA' ? 'TE' : 'EN'));

  const t = translations[lang];

  const handleLogout = async () => {
    try {
      const auth = getAuth(firebaseApp);
      await signOut(auth);
    } catch (e) {
      console.error('Logout error', e);
    }
    setRole('farmer');
    if (logout) logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-earth-50 flex">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-agri-900 text-white shadow-xl transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-agri-800">
          <Link to="/" className="flex items-center gap-2 text-xl font-heading font-bold text-agri-100">
            <Sprout className="h-6 w-6 text-agri-400" />
            AgriConnect
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-agri-200 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-4">
          <div className="mb-6 px-2">
            <p className="text-xs font-semibold text-agri-400 uppercase tracking-wider">
              {role.toUpperCase()} PORTAL
            </p>
          </div>
          <nav className="space-y-1">
            {currentNav.map((item) => {
              const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
              const label = t[item.name as keyof typeof t] || item.name;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                    isActive ? 'bg-agri-800 text-white' : 'text-agri-200 hover:bg-agri-800/50 hover:text-white'
                  )}
                >
                  <item.icon
                    className={cn('h-5 w-5', isActive ? 'text-agri-400' : 'text-agri-400/70')}
                  />
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-earth-200 flex items-center justify-between px-4 sm:px-6 z-30 sticky top-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-earth-500 hover:text-earth-900">
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-lg font-heading font-semibold text-earth-900 hidden sm:block">
              {currentNav.find((n) => n.path === location.pathname)?.name || 'AgriConnect'}
            </h1>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <button onClick={toggleLang} className="flex items-center gap-1.5 text-sm font-medium text-earth-600 hover:text-agri-700 transition-colors px-2 py-1 rounded-md hover:bg-earth-100">
              <Globe className="h-4 w-4" />
              {lang}
            </button>
            <Link to="/notifications" className="relative p-2 text-earth-500 hover:text-agri-700 transition-colors rounded-full hover:bg-earth-100">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 border-2 border-white" />
            </Link>
            <div className="h-8 w-px bg-earth-200 mx-1" />
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-agri-100 flex items-center justify-center text-agri-700 font-bold text-sm">
                {role === 'farmer' ? 'F' : role === 'buyer' ? 'B' : 'A'}
              </div>

              <button onClick={handleLogout} className="text-earth-500 hover:text-red-600 p-2 rounded-full hover:bg-earth-100 transition-colors" title={t.logout}>
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-7xl mx-auto"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};