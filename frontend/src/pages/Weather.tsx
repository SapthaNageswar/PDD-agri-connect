import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer } from
'recharts';
import {
  CloudSun,
  CloudRain,
  Wind,
  Droplets,
  AlertTriangle } from
'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui';
import { mockWeather } from '../data/mock';
export const Weather = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-heading font-bold text-earth-900">
          Weather Dashboard
        </h1>
        <p className="text-earth-600">
          Real-time hyper-local weather and farming alerts.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Current Weather Hero */}
        <div className="lg:col-span-2 bg-gradient-to-br from-blue-500 to-blue-700 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-20 pointer-events-none">
            <CloudSun className="w-64 h-64 -mt-10 -mr-10" />
          </div>
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              <p className="text-blue-100 font-medium mb-1">Current Location</p>
              <h2 className="text-3xl font-bold">Ludhiana, Punjab</h2>
            </div>
            <div className="mt-12 flex items-end gap-6">
              <div className="text-8xl font-bold tracking-tighter">
                {mockWeather.current.temp}°
              </div>
              <div className="pb-3">
                <p className="text-2xl font-medium">
                  {mockWeather.current.condition}
                </p>
                <p className="text-blue-100">
                  Feels like {mockWeather.current.temp + 2}°C
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-12 bg-white/10 backdrop-blur-md rounded-2xl p-4">
              <div className="flex items-center gap-3">
                <Droplets className="h-6 w-6 text-blue-200" />
                <div>
                  <p className="text-xs text-blue-200">Humidity</p>
                  <p className="font-bold">{mockWeather.current.humidity}%</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Wind className="h-6 w-6 text-blue-200" />
                <div>
                  <p className="text-xs text-blue-200">Wind</p>
                  <p className="font-bold">{mockWeather.current.wind} km/h</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CloudRain className="h-6 w-6 text-blue-200" />
                <div>
                  <p className="text-xs text-blue-200">Rainfall</p>
                  <p className="font-bold">{mockWeather.current.rainfall} mm</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Alerts */}
        <div className="space-y-6">
          <Card className="border-red-200 bg-red-50">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-red-800">
                <AlertTriangle className="h-5 w-5" /> Farming Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-white rounded-lg border border-red-100 shadow-sm">
                  <p className="font-bold text-red-900 text-sm mb-1">
                    Heavy Rain Expected
                  </p>
                  <p className="text-xs text-red-700">
                    Delay pesticide spraying for the next 48 hours due to
                    expected washout.
                  </p>
                </div>
                <div className="p-3 bg-white rounded-lg border border-amber-100 shadow-sm">
                  <p className="font-bold text-amber-900 text-sm mb-1">
                    High Humidity Alert
                  </p>
                  <p className="text-xs text-amber-700">
                    Conditions favorable for fungal diseases. Monitor crops
                    closely.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Forecast Chart */}
      <Card>
        <CardHeader>
          <CardTitle>5-Day Rainfall Forecast (mm)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={mockWeather.forecast}
                margin={{
                  top: 20,
                  right: 20,
                  bottom: 5,
                  left: 0
                }}>
                
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e7e5e4" />
                
                <XAxis
                  dataKey="day"
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
                  cursor={{
                    fill: '#f0fdf4'
                  }}
                  contentStyle={{
                    borderRadius: '8px',
                    border: 'none',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }} />
                
                <Bar dataKey="rainfall" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>);

};