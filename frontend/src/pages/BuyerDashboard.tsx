import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Clock, Star, ArrowRight } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Badge } from
'../components/ui';
import { mockProducts } from '../data/mock';
import { auth, db } from '../firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export const BuyerDashboard = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Fetch products from Firestore and merge with mockProducts
    const unsubProducts = onSnapshot(
      collection(db, 'products'),
      (snapshot) => {
        const dbProds = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setProducts(dbProds);
      },
      (error) => {
        console.warn('Firestore products unavailable:', error.message);
        setProducts([]);
      }
    );

    let unsubOrders: (() => void) | undefined;

    // 2. Listen to Auth State Changes
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const q = query(collection(db, 'orders'), where('uid', '==', user.uid));
        unsubOrders = onSnapshot(q, (snapshot) => {
          const orderData = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
          // Sort by createdAt descending
          orderData.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          setOrders(orderData);
          setLoading(false);
        }, (err) => {
          console.error('Error fetching orders:', err);
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    });

    return () => {
      unsubProducts();
      unsubAuth();
      if (unsubOrders) unsubOrders();
    };
  }, []);

  if (loading) {
    return <div className="text-center py-20 text-earth-600">Loading Dashboard...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-earth-900">
            Buyer Dashboard
          </h1>
          <p className="text-earth-600">
            Manage your orders and discover fresh produce.
          </p>
        </div>
        <Link to="/marketplace">
          <Button>Browse Marketplace</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
              <ShoppingBag className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-earth-500">Total Orders</p>
              <p className="text-2xl font-bold text-earth-900">{orders.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
              <Clock className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-earth-500">
                Confirmed Orders
              </p>
              <p className="text-2xl font-bold text-earth-900">
                {orders.filter(o => o.status === 'accepted').length}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
              <Star className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-earth-500">Awaiting Farmer</p>
              <p className="text-2xl font-bold text-earth-900">
                {orders.filter(o => !o.status || o.status === 'pending').length}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>Recent Orders</CardTitle>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mt-2">
              {orders.slice(0, 10).map((order) => {
                const prod = products.find(p => p.id === order.productId) || mockProducts[0];
                const displayName = order.productName || prod.name;
                const displayImage = order.productImage || prod.image;
                const orderDate = order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-IN', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                }) : 'Unknown Date';
                return (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 border border-earth-100 rounded-xl bg-earth-50">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 bg-white rounded-lg border border-earth-200 overflow-hidden flex-shrink-0">
                        <img
                          src={displayImage}
                          alt={displayName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-bold text-earth-900">
                          {displayName}
                        </p>
                        <p className="text-xs text-earth-500">
                          Qty: {order.qty} • Ordered on {orderDate}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-earth-900">
                        ₹{order.totalPrice}
                      </p>
                      <Badge
                        variant={
                          order.status === 'accepted' ? 'success' :
                          order.status === 'rejected' ? 'danger' : 'warning'
                        }
                        className="mt-1">
                        {order.status === 'accepted' ? '✓ Confirmed by Farmer' :
                         order.status === 'rejected' ? '✗ Rejected by Farmer' : '⏳ Awaiting Farmer'}
                      </Badge>
                    </div>
                  </div>
                );
              })}
              {orders.length === 0 && (
                <div className="text-center py-10 text-earth-500">
                  No orders placed yet.
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>Produce Available from Farmers</CardTitle>
            <Link to="/marketplace" className="text-xs text-agri-600 font-semibold hover:underline">
              View All
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mt-2">
              {products.length === 0 ? (
                <div className="text-center py-8 text-earth-500">
                  <p className="text-sm">No produce listed by farmers yet.</p>
                  <p className="text-xs text-earth-400 mt-1">Check back soon or browse the marketplace!</p>
                </div>
              ) : (
                products.slice(0, 5).map((product) => (
                  <Link
                    key={product.id}
                    to={`/marketplace/${product.id}`}
                    className="flex items-center justify-between p-3 hover:bg-earth-50 rounded-xl transition-colors group border border-earth-100">
                    <div className="flex items-center gap-4">
                      <img
                        src={product.image || 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=800'}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                      />
                      <div>
                        <p className="font-bold text-earth-900 group-hover:text-agri-700 transition-colors">
                          {product.name}
                        </p>
                        <p className="text-sm text-earth-500">
                          {product.seller || 'Farmer'} • ₹{product.price}/{product.unit || 'Unit'}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-earth-300 group-hover:text-agri-600 transition-colors" />
                  </Link>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};