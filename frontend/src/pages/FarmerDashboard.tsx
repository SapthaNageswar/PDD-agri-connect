import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer } from
'recharts';
import {
  Sprout,
  TrendingUp,
  CloudSun,
  ArrowRight,
  Package,
  IndianRupee } from
'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Badge } from
'../components/ui';
import { mockPriceHistory, mockWeather, mockMarketPrices } from '../data/mock';
import { auth, db } from '../firebase';
import { doc, getDoc, collection, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export const FarmerDashboard = () => {
  const [userName, setUserName] = useState('User');
  const [userLocation, setUserLocation] = useState('Ludhiana');
  const [activeListings, setActiveListings] = useState<number>(0);
  const [totalSales, setTotalSales] = useState<number>(0);
  const [pendingOrders, setPendingOrders] = useState<number>(0);
  const [aiAdvisories, setAiAdvisories] = useState<number>(0);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [recentAdvisories, setRecentAdvisories] = useState<any[]>([]);

  useEffect(() => {
    let unsubProducts: (() => void) | undefined;
    let unsubOrders: (() => void) | undefined;
    let unsubAdvisories: (() => void) | undefined;

    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            if (data.name) setUserName(data.name);
            if (data.location) setUserLocation(data.location);
          } else if (currentUser.displayName) {
            setUserName(currentUser.displayName);
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }

        // Listen to User Products (Active Listings)
        try {
          unsubProducts = onSnapshot(collection(db, 'products'), (snapshot) => {
            const myProducts = snapshot.docs.filter(d => {
              const data = d.data();
              return data.uid === currentUser.uid || data.sellerUid === currentUser.uid;
            });
            setActiveListings(myProducts.length);
          }, err => console.warn('Products snapshot error:', err));
        } catch (e) {
          console.error('Error setting products listener:', e);
        }

        // Listen to User Orders (Pending Orders & Total Sales)
        try {
          unsubOrders = onSnapshot(collection(db, 'orders'), (snapshot) => {
            const allOrders = snapshot.docs.map(d => ({ ...d.data(), id: d.id })) as any[];
            const myOrders = allOrders.filter(o =>
              o.sellerId === currentUser.uid || o.sellerUid === currentUser.uid
            );
            const pending = myOrders.filter(o => !o.status || o.status.toLowerCase() === 'pending');
            setPendingOrders(pending.length);

            const salesSum = myOrders.reduce((sum, o) => sum + (Number(o.totalPrice) || 0), 0);
            setTotalSales(salesSum);
            
            setRecentOrders(myOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5));
          }, err => console.warn('Orders snapshot error:', err));
        } catch (e) {
          console.error('Error setting orders listener:', e);
        }

        // Listen to User AI Advisories
        try {
          unsubAdvisories = onSnapshot(collection(db, 'advisories'), (snapshot) => {
            const myAdvisories = snapshot.docs.map(d => ({ ...d.data(), id: d.id })).filter(a => a.uid === currentUser.uid) as any[];
            setAiAdvisories(myAdvisories.length);
            
            setRecentAdvisories(myAdvisories.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5));
          }, err => console.warn('Advisories snapshot error:', err));
        } catch (e) {
          console.error('Error setting advisories listener:', e);
        }
      } else {
        setUserName('User');
        setActiveListings(0);
        setTotalSales(0);
        setPendingOrders(0);
        setAiAdvisories(0);
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubProducts) unsubProducts();
      if (unsubOrders) unsubOrders();
      if (unsubAdvisories) unsubAdvisories();
    };
  }, []);

  const formatSales = (val: number) => {
    if (!val || val === 0) return '₹0';
    if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`;
    if (val >= 1000) return `₹${(val / 1000).toFixed(1)}K`;
    return `₹${val}`;
  };

  const stats = [
    {
      title: 'Active Listings',
      value: activeListings.toString(),
      icon: Package,
      color: 'text-blue-600',
      bg: 'bg-blue-100'
    },
    {
      title: 'Total Sales',
      value: formatSales(totalSales),
      icon: IndianRupee,
      color: 'text-green-600',
      bg: 'bg-green-100'
    },
    {
      title: 'Pending Orders',
      value: pendingOrders.toString(),
      icon: TrendingUp,
      color: 'text-amber-600',
      bg: 'bg-amber-100'
    },
    {
      title: 'AI Advisories',
      value: aiAdvisories.toString(),
      icon: Sprout,
      color: 'text-purple-600',
      bg: 'bg-purple-100'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-agri-800 rounded-2xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none">
          <Sprout className="w-64 h-64 -mt-10 -mr-10" />
        </div>
        <div className="relative z-10">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold mb-2">
            Welcome back, {userName}!
          </h2>
          <p className="text-agri-100 max-w-xl">
            Your farm in {userLocation} is currently experiencing{' '}
            {mockWeather.current.temp}°C and {mockWeather.current.condition}.
            It's a good day for harvesting wheat.
          </p>
        </div>
        <div className="relative z-10 flex gap-3">
          <Link to="/advisory">
            <Button variant="secondary" className="whitespace-nowrap">
              Ask AI Expert
            </Button>
          </Link>
          <Link to="/marketplace">
            <Button className="bg-white text-agri-900 hover:bg-agri-50 whitespace-nowrap">
              List Produce
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardContent className="p-6 flex items-center gap-4">
              <div
                className={`h-12 w-12 rounded-full ${stat.bg} flex items-center justify-center`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-earth-500">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-earth-900">
                  {stat.value}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>Market Price Trends (₹/Quintal)</CardTitle>
            <Link
              to="/prices"
              className="text-sm text-agri-600 font-medium hover:underline flex items-center gap-1">
              
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={mockPriceHistory}
                  margin={{
                    top: 5,
                    right: 20,
                    bottom: 5,
                    left: 0
                  }}>
                  
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#e7e5e4" />
                  
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: '#78716c'
                    }} />
                  
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: '#78716c'
                    }} />
                  
                  <Tooltip
                    contentStyle={{
                      borderRadius: '8px',
                      border: 'none',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }} />
                  
                  <Line
                    type="monotone"
                    dataKey="Wheat"
                    stroke="#f59e0b"
                    strokeWidth={3}
                    dot={{
                      r: 4
                    }}
                    activeDot={{
                      r: 6
                    }} />
                  
                  <Line
                    type="monotone"
                    dataKey="Rice"
                    stroke="#22c55e"
                    strokeWidth={3}
                    dot={{
                      r: 4
                    }} />
                  
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Side Widgets */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <CloudSun className="h-5 w-5 text-agri-600" /> Weather Snapshot
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-4xl font-bold text-earth-900">
                    {mockWeather.current.temp}°C
                  </p>
                  <p className="text-earth-500">
                    {mockWeather.current.condition}
                  </p>
                </div>
                <div className="text-right text-sm text-earth-600 space-y-1">
                  <p>Humidity: {mockWeather.current.humidity}%</p>
                  <p>Wind: {mockWeather.current.wind} km/h</p>
                </div>
              </div>
              <div className="p-3 bg-agri-50 rounded-lg border border-agri-100 text-sm text-agri-800 flex items-start gap-2">
                <Sprout className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <p>Optimal conditions for spraying fertilizers today.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Today's Mandi Prices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mt-2">
                {mockMarketPrices.slice(0, 3).map((item, i) =>
                <div key={i} className="flex items-center justify-between">
                    <span className="font-medium text-earth-800">
                      {item.crop}
                    </span>
                    <div className="text-right">
                      <p className="font-bold text-earth-900">
                        ₹{item.current}
                      </p>
                      <p
                      className={`text-xs font-medium ${item.status === 'up' ? 'text-green-600' : 'text-red-500'}`}>
                      
                        {item.trend}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Recent Activity Sections */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders Received</CardTitle>
          </CardHeader>
          <CardContent>
            {recentOrders.length === 0 ? (
              <p className="text-earth-500 text-sm py-4">No recent orders yet.</p>
            ) : (
              <div className="space-y-4">
                {recentOrders.map(order => (
                  <div key={order.id} className="flex items-center justify-between p-3 border border-earth-100 rounded-xl bg-earth-50">
                    <div>
                      <p className="font-bold text-earth-900">{order.productName || 'Product'}</p>
                      <p className="text-xs text-earth-500">Qty: {order.qty}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-earth-900">₹{order.totalPrice}</p>
                      <Badge variant="warning" className="mt-1">
                        {order.status || 'Pending'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent AI Advisories</CardTitle>
          </CardHeader>
          <CardContent>
            {recentAdvisories.length === 0 ? (
              <p className="text-earth-500 text-sm py-4">No recent advisories yet.</p>
            ) : (
              <div className="space-y-4">
                {recentAdvisories.map(adv => {
                  const advDate = adv.createdAt ? new Date(adv.createdAt).toLocaleDateString('en-IN', {
                    month: 'short',
                    day: 'numeric'
                  }) : '';
                  return (
                    <div key={adv.id} className="flex items-center justify-between p-3 border border-earth-100 rounded-xl bg-earth-50">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                          <Sprout className="h-4 w-4 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-bold text-earth-900">{adv.topic}</p>
                          <p className="text-xs text-earth-500">{advDate}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );

};