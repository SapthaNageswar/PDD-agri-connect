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
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export const FarmerDashboard = () => {
  const [userName, setUserName] = useState('Ramesh');
  const [userLocation, setUserLocation] = useState('Ludhiana');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            if (data.name) setUserName(data.name);
            if (data.location) setUserLocation(data.location);
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      }
    });
    return () => unsubscribe();
  }, []);

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
        {[
        {
          title: 'Active Listings',
          value: '4',
          icon: Package,
          color: 'text-blue-600',
          bg: 'bg-blue-100'
        },
        {
          title: 'Total Sales',
          value: '₹1.2L',
          icon: IndianRupee,
          color: 'text-green-600',
          bg: 'bg-green-100'
        },
        {
          title: 'Pending Orders',
          value: '2',
          icon: TrendingUp,
          color: 'text-amber-600',
          bg: 'bg-amber-100'
        },
        {
          title: 'AI Advisories',
          value: '12',
          icon: Sprout,
          color: 'text-purple-600',
          bg: 'bg-purple-100'
        }].
        map((stat, i) =>
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
        )}
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
    </div>);

};