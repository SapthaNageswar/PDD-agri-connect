import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
// Layouts & Pages
import { Layout } from './components/Layout';
import { Landing } from './pages/Landing';
import { Auth } from './pages/Auth';
import { FarmerDashboard } from './pages/FarmerDashboard';
import { BuyerDashboard } from './pages/BuyerDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { Advisory } from './pages/Advisory';
import { Marketplace } from './pages/Marketplace';
import { ProductDetail } from './pages/ProductDetail';
import { Weather } from './pages/Weather';
import { Experts } from './pages/Experts';
import { Notifications } from './pages/Notifications';
import { PriceIntelligence } from './pages/PriceIntelligence';
import { AuthProvider } from './lib/auth';
export function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Toaster position="top-center" richColors />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Auth type="login" />} />
          <Route path="/register" element={<Auth type="register" />} />

          {/* Farmer Routes */}
          <Route
            path="/farmer"
            element={
            <Layout>
                <FarmerDashboard />
              </Layout>
            } />
          
          <Route
            path="/advisory"
            element={
            <Layout>
                <Advisory />
              </Layout>
            } />
          
          <Route
            path="/weather"
            element={
            <Layout>
                <Weather />
              </Layout>
            } />
          
          <Route
            path="/experts"
            element={
            <Layout>
                <Experts />
              </Layout>
            } />
          

          {/* Buyer Routes */}
          <Route
            path="/buyer"
            element={
            <Layout>
                <BuyerDashboard />
              </Layout>
            } />
          

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
            <Layout>
                <AdminDashboard />
              </Layout>
            } />
          

          {/* Shared Authenticated Routes */}
          <Route
            path="/marketplace"
            element={
            <Layout>
                <Marketplace />
              </Layout>
            } />
          
          <Route
            path="/marketplace/:id"
            element={
            <Layout>
                <ProductDetail />
              </Layout>
            } />
          
          <Route
            path="/notifications"
            element={
            <Layout>
                <Notifications />
              </Layout>
            } />
          
          <Route
            path="/prices"
            element={
            <Layout>
                <PriceIntelligence />
              </Layout>
            } />
          

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </AuthProvider>);

}