import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area } from
'recharts';
import { TrendingUp, TrendingDown, Info } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge } from
'../components/ui';
import { mockPriceHistory, mockMarketPrices } from '../data/mock';
export const PriceIntelligence = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-heading font-bold text-earth-900">
          Price Intelligence
        </h1>
        <p className="text-earth-600">
          AI-powered market trends and demand forecasting.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Commodity Price Trends (6 Months)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={mockPriceHistory}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0
                  }}>
                  
                  <defs>
                    <linearGradient id="colorWheat" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorRice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#e7e5e4" />
                  
                  <XAxis dataKey="month" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: '8px',
                      border: 'none',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }} />
                  
                  <Area
                    type="monotone"
                    dataKey="Wheat"
                    stroke="#f59e0b"
                    fillOpacity={1}
                    fill="url(#colorWheat)" />
                  
                  <Area
                    type="monotone"
                    dataKey="Rice"
                    stroke="#22c55e"
                    fillOpacity={1}
                    fill="url(#colorRice)" />
                  
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>AI Market Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-agri-50 rounded-xl border border-agri-100">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-agri-600" />
                  <h4 className="font-bold text-agri-900">Hold Wheat</h4>
                </div>
                <p className="text-sm text-agri-800">
                  Prices are expected to rise by 4-5% in the next 3 weeks due to
                  export demand.
                </p>
              </div>
              <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingDown className="h-5 w-5 text-red-600" />
                  <h4 className="font-bold text-red-900">Sell Mustard</h4>
                </div>
                <p className="text-sm text-red-800">
                  Upcoming harvest in neighboring states will likely drop prices
                  soon.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daily Mandi Prices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-earth-500 uppercase bg-earth-50">
                <tr>
                  <th className="px-6 py-3 rounded-tl-lg">Commodity</th>
                  <th className="px-6 py-3">Current Price (₹/Q)</th>
                  <th className="px-6 py-3">24h Change</th>
                  <th className="px-6 py-3 rounded-tr-lg">Recommendation</th>
                </tr>
              </thead>
              <tbody>
                {mockMarketPrices.map((item, i) =>
                <tr
                  key={i}
                  className="border-b border-earth-100 last:border-0">
                  
                    <td className="px-6 py-4 font-bold text-earth-900">
                      {item.crop}
                    </td>
                    <td className="px-6 py-4 text-earth-700">
                      ₹{item.current}
                    </td>
                    <td className="px-6 py-4">
                      <span
                      className={`flex items-center gap-1 font-medium ${item.status === 'up' ? 'text-green-600' : 'text-red-500'}`}>
                      
                        {item.status === 'up' ?
                      <TrendingUp className="h-4 w-4" /> :

                      <TrendingDown className="h-4 w-4" />
                      }
                        {item.trend}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                      variant={item.status === 'up' ? 'success' : 'danger'}>
                      
                        {item.status === 'up' ? 'Hold' : 'Sell'}
                      </Badge>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>);

};