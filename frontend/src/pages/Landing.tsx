import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sprout,
  BrainCircuit,
  ShoppingBag,
  CloudSun,
  TrendingUp,
  ArrowRight,
  CheckCircle2 } from
'lucide-react';
import { Button } from '../components/ui';
export const Landing = () => {
  return (
    <div className="min-h-screen bg-earth-50 font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-earth-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-2xl font-heading font-bold text-agri-800">
            <Sprout className="h-8 w-8 text-agri-600" />
            AgriConnect
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-earth-600">
            <a
              href="#features"
              className="hover:text-agri-700 transition-colors">
              
              Features
            </a>
            <a
              href="#how-it-works"
              className="hover:text-agri-700 transition-colors">
              
              How it Works
            </a>
            <a href="#market" className="hover:text-agri-700 transition-colors">
              Marketplace
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="text-sm font-medium text-earth-600 hover:text-agri-700">
              
              Log in
            </Link>
            <Link to="/register">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{
              opacity: 0,
              x: -20
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
            transition={{
              duration: 0.5
            }}>
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-agri-100 text-agri-800 text-sm font-medium mb-6">
              <BrainCircuit className="h-4 w-4" /> AI-Driven Agriculture
            </div>
            <h1 className="text-5xl lg:text-6xl font-heading font-bold text-earth-900 leading-tight mb-6">
              Empowering Farmers with{' '}
              <span className="text-agri-600">Smart Tech</span> & Direct Markets
            </h1>
            <p className="text-lg text-earth-600 mb-8 max-w-lg">
              Join the ecosystem connecting farmers, buyers, and experts. Get AI
              crop advisory, real-time weather, and sell directly at the best
              prices.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/register">
                <Button size="lg" className="gap-2">
                  Join as Farmer <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/register">
                <Button size="lg" variant="outline">
                  Browse Marketplace
                </Button>
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-4 text-sm text-earth-500 font-medium">
              <div className="flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-agri-500" /> Free
                Registration
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-agri-500" /> Multilingual
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-agri-500" /> Secure
                Payments
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95
            }}
            animate={{
              opacity: 1,
              scale: 1
            }}
            transition={{
              duration: 0.5,
              delay: 0.2
            }}
            className="relative">
            
            <div className="absolute inset-0 bg-gradient-to-tr from-agri-200 to-harvest-200 rounded-3xl transform rotate-3 scale-105 opacity-50"></div>
            <img
              src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=1000"
              alt="Farmer using tablet in field"
              className="relative rounded-3xl shadow-2xl object-cover h-[500px] w-full" />
            
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-earth-100 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-agri-100 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-agri-600" />
              </div>
              <div>
                <p className="text-sm text-earth-500 font-medium">
                  Wheat Price
                </p>
                <p className="text-lg font-bold text-earth-900">
                  ₹2,450 <span className="text-sm text-agri-600">+2.4%</span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-heading font-bold text-earth-900 mb-4">
              Everything you need to grow and sell
            </h2>
            <p className="text-earth-600">
              A complete digital transformation for your agricultural business.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
            {
              icon: BrainCircuit,
              title: 'AI Smart Advisory',
              desc: 'Get personalized crop recommendations, disease detection from photos, and fertilizer advice.'
            },
            {
              icon: ShoppingBag,
              title: 'Direct Marketplace',
              desc: 'List your produce directly to buyers. No middlemen, better margins, transparent pricing.'
            },
            {
              icon: CloudSun,
              title: 'Weather & Alerts',
              desc: 'Real-time hyper-local weather forecasts and critical alerts to protect your harvest.'
            }].
            map((feature, i) =>
            <div
              key={i}
              className="p-6 rounded-2xl border border-earth-100 bg-earth-50 hover:shadow-md transition-shadow">
              
                <div className="h-12 w-12 rounded-xl bg-agri-100 flex items-center justify-center mb-6">
                  <feature.icon className="h-6 w-6 text-agri-700" />
                </div>
                <h3 className="text-xl font-bold text-earth-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-earth-600 leading-relaxed">{feature.desc}</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>);

};